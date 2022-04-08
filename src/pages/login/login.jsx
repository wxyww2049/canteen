import { useState, useCallback } from "react";
import Taro from "../../fake-tarojs/taro";
import { View, Image } from "../../fake-tarojs/components";
import visibleImg from "../../images/icon/login/visible.svg";
import visibleOffImg from "../../images/icon/login/visible_off.svg";
import backgroundImg from "../../images/background/mountain.png";
import logoImg from "../../images/logo.png";
import { AtInput, AtButton } from "../../fake-tarojs/taro-ui";
import "./login.scss";
import { login } from "../../apis/login";

export default function Login() {
  const [stuID, setStuID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const onLogin = useCallback(() => {
    if (loginLoading) return;
    if (!stuID.length || !password.length) {
      Taro.showModal({
        title: "错误",
        content: "请输入学号或密码",
        showCancel: false,
      });
      return;
    }
    login(stuID, password).then(() => {
      Taro.showToast({
        title: "登录成功",
        icon: "success",
        duration: 1000,
        success: () =>
          Taro.redirectTo({
            url: "/pages/index/index",
          }),
      });
    }).catch(e => {
      Taro.showModal({
        title: "错误",
        content: e.message,
        showCancel: false,
      });
      setLoginLoading(false);
    })
    setLoginLoading(true);
  }, [loginLoading, password, stuID]);

  return (
    <View
      className='login-view'
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <View className='cntr'>
        <Image src={logoImg} className='logo' />
        <AtInput
          name='stuIDvalue'
          type='text'
          placeholder='学号'
          className='input mb-2'
          value={stuID}
          onChange={(stuIDvalue) => setStuID(stuIDvalue)}
        />
        {passwordVisible ? (
          <AtInput
            name='passwordvalue'
            type='text'
            placeholder='统一认证密码'
            className='input mb-2'
            value={password}
            onChange={(passwordvalue) => setPassword(passwordvalue)}
            onConfirm={onLogin}
          >
            <Image
              src={visibleImg}
              className='eye'
              onClick={() => {
                setPasswordVisible((sta) => !sta);
              }}
            />
          </AtInput>
        ) : (
          <AtInput
            name='value'
            type='password'
            placeholder='统一认证密码'
            className='input mb-2'
            value={password}
            onChange={(value) => setPassword(value)}
            onConfirm={onLogin}
          >
            <Image
              src={visibleOffImg}
              className='eye'
              onClick={() => {
                setPasswordVisible((sta) => !sta);
              }}
            />
          </AtInput>
        )}
        <AtButton
          type='secondary'
          className='button'
          loading={loginLoading}
          onClick={onLogin}
        >
          登录
        </AtButton>
      </View>
    </View>
  );
}
