import Taro from "../../fake-tarojs/taro";
import { View, Text, Image } from "../../fake-tarojs/components";
import zhongxin from "../../images/icon/school/zhongxin.png";
import zhongxin_select from "../../images/icon/school/zhongxin_select.png";
import ruanjianyuan from "../../images/icon/school/ruanjianyuan.png";
import ruanjianyuan_select from "../../images/icon/school/ruanjianyuan_select.png";
import baotuquan from "../../images/icon/school/baotuquan.png";
import baotuquan_select from "../../images/icon/school/baotuquan_select.png";
import qianfoshan from "../../images/icon/school/qianfoshan.png";
import qianfoshan_select from "../../images/icon/school/qianfoshan_select.png";
import hongjialou from "../../images/icon/school/hongjialou.png";
import hongjialou_select from "../../images/icon/school/hongjialou_select.png";
import xinglongshan from "../../images/icon/school/xinglongshan.png";
import xinglongshan_select from "../../images/icon/school/xinglongshan_select.png";
import { AtButton } from "../../fake-tarojs/taro-ui";
import "./bus.scss";
// eslint-disable-next-line import/first
import { useState, useCallback, useRef } from "react";

export default function Bus() {
  const schools = useRef([
    {
      name: "中心校区",
      icon: zhongxin,
      selectIcon: zhongxin_select,
    },
    {
      name: "洪家楼校区",
      icon: hongjialou,
      selectIcon: hongjialou_select,
    },
    {
      name: "趵突泉校区",
      icon: baotuquan,
      selectIcon: baotuquan_select,
    },
    {
      name: "软件园校区",
      icon: ruanjianyuan,
      selectIcon: ruanjianyuan_select,
    },
    {
      name: "兴隆山校区",
      icon: xinglongshan,
      selectIcon: xinglongshan_select,
    },
    {
      name: "千佛山校区",
      icon: qianfoshan,
      selectIcon: qianfoshan_select,
    },
  ]);
  const [firstSchool, setFirstSchool] = useState(-1);
  const [secondSchool, setSecondSchool] = useState(-1);
  const onClickSchool = useCallback(
    (index) => {
      if (firstSchool === -1) setFirstSchool(index);
      else if (firstSchool === index) {
        if (secondSchool !== -1) {
          setFirstSchool(secondSchool);
          setSecondSchool(-1);
        } else {
          setFirstSchool(-1);
        }
      } else if (secondSchool === -1) setSecondSchool(index);
      else if (secondSchool === index) setSecondSchool(-1);
      else {
        setFirstSchool(index);
        setSecondSchool(-1);
      }
    },
    [firstSchool, secondSchool]
  );
  const queryBus = useCallback(() => {
    Taro.navigateTo({
      url: "/pages/bus/result",
    });
  }, []);
  return (
    <View className='bus-cntr'>
      <View className='school-cntr at-row at-row__justify--center at-row--wrap'>
        {/* 中心校区 */}
        {schools.current.map((v, i) => {
          const isSelect = firstSchool === i || secondSchool === i;
          return (
            <View
              key={v.name}
              // eslint-disable-next-line jsx-quotes
              className="school"
              onClick={() => onClickSchool(i)}
            >
              <Image
                src={isSelect ? v.selectIcon : v.icon}
                className='school-icon'
              />
              <View>
                {firstSchool === i && <Text>从</Text>}
                {secondSchool === i && <Text>至</Text>}
                <Text className={isSelect ? 'mark' : ''}>{v.name}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <AtButton type='primary' className='query-btn btn-brand' onClick={queryBus}>
        查询
      </AtButton>
      <View className='bus-tips'>
        1、<Text className='bold'>寒、暑假</Text>运行时刻表以学校办公室通知为准，请勿依赖本查询功能，避免班车误点。<View />
        2、<Text className='bold'>法定节假日</Text>按双休日运行时刻表执行。<View />
        3、每学期<Text className='bold'>期末考试</Text>期间，教师上课专用车（发车时间中备注“教师”的车辆）停运。<View />
        4、服务咨询、监督电话：88395114，88395999，88392365
      </View>
    </View>
  );
}
