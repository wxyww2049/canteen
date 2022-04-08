/* eslint-disable import/first */
import Taro from '../../fake-tarojs/taro';
import { View } from '../../fake-tarojs/components';
import { AtImagePicker, AtInput, AtButton } from '../../fake-tarojs/taro-ui';
import './modify.scss';
import  { useState, useRef, useCallback, useEffect } from 'react';
import { userData } from '../../apis/user';

export default function ModifyUserData() {
  const [avatar, setAvatar] = useState(
    userData.avatar320 ? [{ url: userData.avatar320 + '?t=' + userData.time }] : []
  );
  const [nickname, setNickname] = useState(userData.nickname);
  const [motto, setMotto] = useState(userData.motto);
  const isModify = useRef(false);
  const onUpdate = useCallback(async() => {
    if (isModify.current) return;
    console.log("资料修改中")
    if (nickname.length === 0) {
      Taro.showModal({
        title: '错误',
        content: '请输入昵称'
      });
      return;
    }
    isModify.current = true;
    Taro.showLoading({ title: '修改中...' });
    const path = avatar.length > 0 && avatar[0].file ? avatar[0].file.path : '';
    await userData.modifyUserInfo(nickname, motto, path).then(() => {
      isModify.current = false;
      Taro.hideLoading();
      if (userData.modifyStatus === 'success') {
        Taro.showToast({
          title: '修改成功！'
        });
        Taro.navigateBack();
      } else {
        Taro.showToast({
          title: '修改失败：' + userData.modifyError,
          icon: 'none'
        });
      }
    });
  }, [avatar, motto, nickname]);

  const onChangeAvatar = useCallback(img => {
    if (img.length > 0 && img[0].file.size >= 10 * 1024 * 1024) {
      Taro.showModal({
        title: '提示',
        content: '选择的图片体积过大',
        showCancel: false
      });
      return;
    }
       setAvatar(img);
    
   
  }, []);
  return (
    <View className='user-modify-cntr'>
      <View className='info-cntr'>
        <View className='at-article__h2 strong'>信息</View>
        <AtInput
          name='nickname'
          title='昵称'
          type='text'
          placeholder=' '
          maxLength={20}
          value={nickname}
          onChange={v => setNickname(v)}
        />
        <AtInput
          name='motto'
          title='签名'
          type='text'
          placeholder='请输入个性签名'
          value={motto}
          onChange={v => setMotto(v)}
          maxLength={100}
        />
        <View className='mb-1' />
        <View className='at-article__h2 strong mb-1'>头像</View>
        <AtImagePicker
          files={avatar}
          onChange={onChangeAvatar}
          multiple={false}
          showAddBtn={avatar.length === 0}
          count={1}
          className='mb-1'
        />
        <AtButton type='primary' onClick={onUpdate}>
          更新
        </AtButton>
      </View>
    </View>
  );
}
