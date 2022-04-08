import { View } from "../../fake-tarojs/components";
import { AtTabBar } from "../../fake-tarojs/taro-ui";
import homeIcon from "../../images/icon/home.svg";
import homeSelectedIcon from "../../images/icon/home_selected.svg";
import courseIcon from "../../images/icon/course.svg";
import courseSelectedIcon from "../../images/icon/course_selected.svg";
import newsIcon from "../../images/icon/news.svg";
import newsSelectedIcon from "../../images/icon/news_selected.svg";
import userIcon from "../../images/icon/user.svg";
import userSelectedIcon from "../../images/icon/user_selected.svg";

import Course from "./course/course";
import "./index.scss";
import Home from "./home/home";
import News from "./news/news";
import User from "./user/user";
// eslint-disable-next-line import/first
import { useState, useEffect } from "react";

function ToggleVisible(props) {
  return (
    <View
      style={{ width: '100%', height: '100%', display: props.visible ? 'block' : 'none' }}
      className={props.className}
    >
      {props.children}
    </View>
  );
}

export default function Index() {
  const [currentTab, setCurrentTab] = useState(0);
  const [mountCourse, setMountCourse] = useState(false);
  const [mountNews, setMountNews] = useState(false);
  const [mountUser, setMountUser] = useState(false);

  return (
    <View className="app-cntr">
      <View className="content">
        <ToggleVisible visible={currentTab === 0}>
          <Home />
        </ToggleVisible>
        {mountCourse && (
          <ToggleVisible visible={currentTab === 1}>
            <Course />
          </ToggleVisible>
        )}
        {mountNews && (
          <ToggleVisible visible={currentTab === 2}>
            <News />
          </ToggleVisible>
        )}
        {mountUser && (
          <ToggleVisible visible={currentTab === 3}>
            <User />
          </ToggleVisible>
        )}
      </View>

      <AtTabBar
        fixed
        tabList={[
          {
            title: "主页",
            image: homeIcon,
            selectedImage: homeSelectedIcon,
          },
          {
            title: "课表",
            image: courseIcon,
            selectedImage: courseSelectedIcon,
          },
          {
            title: "资讯",
            image: newsIcon,
            selectedImage: newsSelectedIcon,
          },
          {
            title: "用户",
            image: userIcon,
            selectedImage: userSelectedIcon,
          },
        ]}
        current={currentTab}
        onClick={(current) => {
          // 性能优化
          switch (current) {
            case 1:
              if (!mountCourse) {
                setMountCourse(true);
              }
              break;
            case 2:
              if (!mountNews) {
                setMountNews(true);
              }
              break;
            case 3:
              if (!mountUser) {
                setMountUser(true);
              }
              break;
          }
          setCurrentTab(current);
        }}
        className="tab-bar"
      />
    </View>
  );
}
