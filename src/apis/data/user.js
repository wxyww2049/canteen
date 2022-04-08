import Taro from '../../fake-tarojs/taro';

/**
 * 存储用户Token
 * @param {String} token
 */
export const saveToken = token => Taro.setStorageSync("TOKEN", token);
/**
 * 获取用户Token
 */
export const getToken = () => Taro.getStorageSync("TOKEN");

/**
 * 存储用户RefreshToken
 * @param {String} token
 */
export const saveRefreshToken = refreshToken => Taro.setStorageSync("REFRESH_TOKEN", refreshToken);
/**
 * 获取用户RefreshToken
 */
export const getRefreshToken = () => Taro.getStorageSync("REFRESH_TOKEN");

/**
 * 保存用户信息到本地
 * @param {String} stuId
 * @param {String} password
 */
export const saveUser = (token, refreshToken) => {
  saveToken(token);
  saveRefreshToken(refreshToken);
};

export const removeUser = () => {
  Taro.removeStorageSync("TOKEN");
  Taro.removeStorageSync("REFRESH_TOKEN");
};
/**
 * 从本地获取用户信息
 */
export const getUser = () => [getToken(), getRefreshToken()];
