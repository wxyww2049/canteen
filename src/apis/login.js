import { request } from "./network/request";
import { getToken, saveUser } from "./data/user";

const LOGIN_URL = 'isdu/api/auth/login/system'

export const loginData = {
  stuId: "",
  token: getToken(),
  status: getToken() ? 'success' : 'logout',
};

function login_success(stuId, token, refreshToken) {
  // 保存登录信息到本地
  saveUser(token, refreshToken);
  loginData.stuId = stuId;
  loginData.token = token;
  loginData.status = 'success';
};
function login_fail() {
  loginData.stuId = "";
  loginData.token = "";
  loginData.status = 'fail';
};
export async function login(stuId, password, force = false) {
  if (force || loginData.status !== 'fetching') {
    loginData.status = 'fetching';
    let resp = await request({
      url: LOGIN_URL,
      method: "post",
      data: {
        u: stuId,
        p: password,
      },
    });
    // 登录成功
    if (resp.code === 0) {
      login_success(stuId, ...resp.data);
      return;
    } else {
      login_fail(resp.message);
      throw new Error(resp.message);
    }
  }
};
export function logout() {
  loginData.stuId = ''
  loginData.token = ''
};