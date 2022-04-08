import { authRequest, authUpload } from "./network/request";

const USER_URL = 'isdu/infra/user/info';

export const userData = {
  name: "未登录",
  nickname: "",
  avatar320: "",
  motto: "",
  major: "",
  depart: "",
  time: Date.now(),
  userStatus: '',
  modifyStatus: '',
  userError: '',
  modifyError: '',
};
function user_success(response) {
  if (response.code === 0) {
    userData.userStatus = 'success';
    Object.keys(response.data).map(key => userData[key] = response.data[key])
    userData.time = Date.now();
  } else {
    userData.userStatus = 'fail'
    userData.userError = response.message;
  }
};
function noModifyDataSuccess() {
  userData.modifyStatus = 'success';
}

export async function modifyUserInfo (nickname, motto, avatar) {
  userData.modifyStatus = 'fetching'
  const params = {
    url: USER_URL,
    filePath: avatar,
    name: "avatar",
    method: "post",
    header: {
      "content-type": "multipart/form-data",
    },
    data: {
      nickname,
      motto,
      avatar: null,
    },
    formData: {
      nickname,
      motto,
    },
  };
  if (avatar) {
    let res = await authUpload(params);
    if(res.code===0){
      noModifyDataSuccess();
    }
      
  } else {
    let res = await authRequest(params);
    if(res.code===0){
      noModifyDataSuccess();
    }
  }
  let response=await authRequest({
    url: USER_URL,
  });
  user_success(response);
  
  return response;
};
export async function getUserInfo() {
  userData.userStatus = 'fetching'

  let response = await authRequest({
    url: USER_URL,
  });
  user_success(response);
  console.log('out', userData.userStatus)
  return response;
};
