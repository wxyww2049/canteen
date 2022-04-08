
import { Component } from 'react';
import { View } from '../../../fake-tarojs/components';
import { AtList, AtListItem } from '../../../fake-tarojs/taro-ui';

// 写成类组件形式啦，供大家修改
export default class CourseTabs extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <View className='panel course-tabs-cntr'>
        {/* 标题栏 */}
        <View className='at-row at-row__justify--between'>
          <View className='panel-title'>课程安排</View>
          {/* 今日明日选择 */}
          <View className='course-tabs'>
            <View
              className='tabs tab-current'
            >
              今日
            </View>
            <View
              className='tabs'
            >
              明日
            </View>
          </View>
        </View>
        {/* 课表区域 */}
        <View className='panel-view'>
          <AtList>
            {[
              {
                title: '摸鱼',
                time: '寒假',
                position: '家',
              },
            ].map(v => (
              <AtListItem
                key={v.title + v.time}
                title={v.title}
                extraText={v.time}
                note={v.position}
              />
            ))}
          </AtList>
        </View>
      </View>
    )
  }
}
