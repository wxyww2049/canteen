import Taro from '../../../fake-tarojs/taro';
import { View } from '../../../fake-tarojs/components';
import { AtAvatar, AtList, AtListItem, AtActivityIndicator, AtButton } from '../../../fake-tarojs/taro-ui';

import { removeUser } from '../../../apis/data/user';
import { useEffect, useCallback, useState }  from 'react';
import { logout, loginData } from '../../../apis/login';
import { getUserInfo, userData } from '../../../apis/user';

export default function User() {
  const [invoker, setInvoker] = useState(0);
  useEffect(() => {
    // 这里不要学，存在内存泄漏问题，这是为了模拟mobx控制数据的，实际项目是用mobx注入实现的
    userData.userStatus = 'fetching'
    setInvoker(1)
    getUserInfo().then(() => setInvoker(2)).catch(() => setInvoker(2))
  }, []);

  const onNavToLoginPage = useCallback(() => {
    Taro.redirectTo({
      url: '/pages/login/login'
    });
  }, []);
  const onLogin = () => {
    if (loginData.status === 'fail') {
      onNavToLoginPage();
      return true;
    }
    return false;
  };

  const onNavToModifyPage = () => {
    if (!onLogin()) {
      Taro.navigateTo({
        url: '/pages/user/modify'
      });
    }
  };

  const onNavToAboutPage = useCallback(() => {
    Taro.navigateTo({
      url: '/pages/about/about'
    });
  }, []);

  const onLogout = useCallback(() => {
    Taro.showModal({
      title: '警告',
      content: '确定退出吗？',
      success: ({ confirm }) => {
        if (confirm) {
          logout();
          removeUser();
          Taro.reLaunch({
            url: '/pages/index/index'
          });
        }
      }
    });
  }, []);
  console.log('in', userData.userStatus)
  return (
    <View className='user-cntr'>
      {userData.userStatus === 'fetching' ? (
        <AtActivityIndicator mode='center' content='加载中...' />
      ) : (
        <View>
          <View className='at-row avatar-cntr at-row__align--center' onClick={onLogin}>
            <AtAvatar
              circle
              image={userData.avatar320 ? userData.avatar320 + '?t=' + userData.time : null}
            />
            <View className='info-cntr'>
              <View className='nickname'>{userData.nickname || userData.name || '未登录'}</View>
              <View className='note'>{userData.motto || '我还没有个性签名'}</View>
            </View>
          </View>
          <AtList className='func-list'>
            <AtListItem
              hasBorder={false}
              title='资料'
              arrow='right'
              iconInfo={{ size: Taro.pxTransform(16), color: '#00B696', value: 'edit' }}
              onClick={onNavToModifyPage}
            />
            <AtListItem
              hasBorder={false}
              title='学院'
              extraText={userData.depart}
              iconInfo={{ size: Taro.pxTransform(16), color: '#00B696', value: 'home' }}
            />
            <AtListItem
              hasBorder={false}
              title='专业'
              extraText={userData.major}
              iconInfo={{ size: Taro.pxTransform(16), color: '#00B696', value: 'bookmark' }}
            />
          </AtList>
          <AtList className='func-list'>
            <AtListItem
              hasBorder={false}
              title='关于'
              arrow='right'
              iconInfo={{ size: Taro.pxTransform(16), color: '#00B696', value: 'alert-circle' }}
              onClick={onNavToAboutPage}
            />
          </AtList>
          {loginData.status === 'success' ? (
            <View className='danger-btn'>
              <AtButton type='secondary' onClick={onLogout}>
                退出登录
              </AtButton>
            </View>
          ) : (
            <AtButton type='secondary' onClick={onNavToLoginPage}>
              登录
            </AtButton>
          )}
        </View>
      )}
    </View>
  );
}
