import { getToken, getRefreshToken, saveToken, saveRefreshToken } from '../data/user';

import Taro from '../../fake-tarojs/taro';

// 占位符，传入request函数时会被动态替换为可用base url
const REFRESH_TOKEN_URL = 'isdu/api/auth/refresh/system'
export const TOKEN_EXPIRED_CODE = 40101;
export const TOKEN_ERROR_CODE = 40102;

const [getBaseURL, changeBaseURL] = (() => {
  const baseURLs = ['https://inner.sduonline.cn/isduapi', 'https://sduonline.cn/isduapi', 'https://isdu.swsdu.online/isduapi'];
  let using = 1;
  let lastChangeChannelTime = null;
  let networkChecked = false;
  return [
    () => {
      return new Promise(resolve => {
        const genResolve = () => resolve([baseURLs[using], new Date().valueOf()]);
        if (networkChecked) return genResolve();
        try {
          let start = new Date().valueOf();
          Taro.request({
            url: 'https://inner.sduonline.cn/isduapi/api/common/news',
            method: 'GET'
          }).then(() => {
            console.log(new Date().valueOf() - start);
            if (networkChecked) return genResolve();
            networkChecked = true;
            using = 0;
            genResolve();
          });
          setTimeout(() => {
            if (networkChecked) return genResolve();
            networkChecked = true;
            using = 1;
            genResolve();
          }, 600);
        }
        catch (e) {}
      });
    },
    timeStamp => {
      if (lastChangeChannelTime && timeStamp < lastChangeChannelTime) return true;
      using = (using + 1) % 2;
      lastChangeChannelTime = new Date().valueOf();
      return true;
    }
  ];
})();

/**
 * 发送网络请求简写方法，使用同Taro.request
 * @param {*} params
 */
export const request = async (params, retryCount = 0) => {
  const [baseURL, timeStamp] = await getBaseURL();
  try {
    const response = await Taro.request({
      ...params,
      url: params.url.replace(/^isdu/, baseURL),
      header: {
        ...params.header,
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    if (response.statusCode >= 500) throw new Error('服务器错误');
    else if (response.statusCode === 404) throw new Error('资源已被移除');
    else if (response.statusCode >= 400 && response.statusCode !== 401) throw new Error('资源请求错误');
    return response.data;
  }
  catch (e) {
    console.log(e.errMsg);
    if (e.errMsg === 'request:fail ') {
      // 连不上，尝试切换线路
      if (retryCount < 3 && changeBaseURL(timeStamp)) {
        return await request(params, retryCount + 1);
      }
      return {
        code: -1,
        message: '网络错误，请检查网络',
        data: null,
      };
    }
    return {
      code: -1,
      message: e.errMsg,
      data: null,
    };
  }
};

const authFailNavToLogin = () => {
  Taro.redirectTo({
    url: '/pages/login/login',
    success: () =>
      Taro.showToast({
        title: '身份认证失败，请重新登录',
        icon: 'none',
        duration: 1000
      })
  });
};
/**
 * 防止Token失效的网络请求
 * @param {*} params request params
 */
export const authRequest = async (params, autoNavToLoginPage = true, count = 0) => {
  const token = getToken();
  const data = await request({
    ...params,
    header: {
      ...params.header,
      Token: token
    }
  });
  return await authPostProcess(data, count, () => authRequest(params, autoNavToLoginPage, count + 1));
};

/**
 * 防止Token失效的网络请求
 * @param {*} params request params
 */
export const authUpload = async (params, autoNavToLoginPage = true, count = 0) => {
  //const { dispatch, getState } = store;
  const token = getToken();
  const [baseURL, timeStamp] = await getBaseURL();
  try {
    const tmpRes = await Taro.uploadFile({
      ...params,
      url: params.url.replace(/^isdu/, baseURL),
      header: {
        ...params.header,
        Token: token
      }
    });
    if (tmpRes.statusCode >= 500) throw new Error('服务器错误');
    else if (tmpRes.statusCode === 404) throw new Error('资源已被移除');
    else if (tmpRes.statusCode === 413) throw new Error('请求资源体积过大');
    else if (tmpRes.statusCode >= 400 && tmpRes.statusCode !== 401) throw new Error('资源请求错误');

    return await authPostProcess(JSON.parse(tmpRes.data), count, () => authUpload(params, autoNavToLoginPage, count + 1));
  }
  catch(e) {
    if (e.errMsg === 'request:fail ') {
      // 连不上，尝试切换线路
      if (count < 3 && changeBaseURL(timeStamp)) {
        return await request(params, count + 1);
      }
      throw new Error('网络错误，请检查网络');
    }
  }
};

const authPostProcess = async (data, count, retryFunction) => {
  // 若重复过错误，则直接返回
  if (count > 1) return data;

  if (data.code === TOKEN_EXPIRED_CODE) {
    let refresh_token = getRefreshToken()
    if (!refresh_token) {
      authFailNavToLogin();
      throw new Error('401: 身份认证失败');
    }
    const data_refresh = await request({
      url: REFRESH_TOKEN_URL,
      method: 'POST',
      data: {
        refresh_token
      }
    });
    if (data_refresh.code === TOKEN_ERROR_CODE) {
      // Token 出错，重新登录
      authFailNavToLogin();
      throw new Error('401: 身份认证失败');
    }

    // 刷新Token成功
    saveToken(data_refresh.data[0]);
    saveRefreshToken(data_refresh.data[1]);
    console.log("refresh: " + data_refresh.data[1]);
    return await retryFunction();
  }
  return data;
}
