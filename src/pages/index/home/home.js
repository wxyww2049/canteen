import Taro from '../../../fake-tarojs/taro';
import { View, Swiper, SwiperItem, Image } from '../../../fake-tarojs/components';
import  { useCallback } from 'react';

import swiper1Img from '../../../images/carousel/swiper1.png';
import swiper2Img from '../../../images/carousel/swiper2.png';
import swiper3Img from '../../../images/carousel/swiper3.png';
// 图标
import busIcon from '../../../images/icon/home/bus.png';
import calendarIcon from '../../../images/icon/home/calendar.png';
import pediaIcon from '../../../images/icon/home/pedia.svg';
import demandIcon from '../../../images/icon/home/demand.svg';
import examIcon from '../../../images/icon/home/exam.png';
import libraryIcon from '../../../images/icon/home/library.png';
import scoreIcon from '../../../images/icon/home/score.png';
import classroomIcon from '../../../images/icon/home/classroom.png';
import canteenIcon from '../../../images/icon/home/canteen.png'
import CourseTabs from './course-tabs';
import NewsTabs from './news-tabs-pane';
import AtGrid from '../../../fake-tarojs/AtGrid';

export default function Home() {
  const onClickGrid = useCallback(
    (_item, index) => {
      switch (index) {
        case 0:
          Taro.navigateTo({
            url: '/pages/library/library',
          });
          break;
        case 1:
          Taro.navigateTo({
            url: '/pages/exam/exam',
          });
          break;
        case 2:
          Taro.navigateTo({
            url: '/pages/room/query',
          });
          break;
        case 3:
          Taro.navigateTo({
            url: '/pages/score/score',
          });
          break;
        case 4:
          Taro.navigateTo({
            url: '/pages/bus/bus',
          });
          break;
        case 6:
          Taro.navigateTo({
            url: '/pages/calendar/calendar',
          });
          break;
        case 7:
          Taro.showModal({
            title: '提示',
            content: '请关注i山大公众号留言反馈',
            showCancel: false,
          });
          break;
        case 8:
          Taro.navigateTo({
            url: '/pages/canteen/index'
          });
          break;
        default:
          Taro.navigateTo({
            url: '/pages/free-class/free-class',
          });
      }
    },
    []
  );

  return (
    <View>
      {/* 轮播图 */}
      <Swiper
        className='swiper'
        indicatorColor='#9F9F9F'
        indicatorActiveColor='#272727'
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <Image src={swiper1Img} className='swiper-item' />
        </SwiperItem>
        <SwiperItem>
          <Image src={swiper2Img} className='swiper-item' />
        </SwiperItem>
        <SwiperItem>
          <Image src={swiper3Img} className='swiper-item' />
        </SwiperItem>
      </Swiper>
      {/* 功能区 */}
      <AtGrid
        columnNum={4}
        data={[
          {
            image: libraryIcon,
            value: '图书馆',
          },
          {
            image: examIcon,
            value: '考试安排',
          },
          {
            image: classroomIcon,
            value: '自习室',
          },
          {
            image: scoreIcon,
            value: '成绩查询',
          },
          {
            image: busIcon,
            value: '校车查询',
          },
          {
            image: pediaIcon,
            value: '蹭课助手',
          },
          {
            image: calendarIcon,
            value: '校历',
          },
          {
            image: demandIcon,
            value: '建议反馈',
          },
          {
            image: canteenIcon,
            value: '食堂菜谱',
          }
        ]}
        onClick={onClickGrid}
      />
      <CourseTabs />
      <NewsTabs />
    </View>
  );
}
