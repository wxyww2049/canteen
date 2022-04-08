import { View, Swiper, Image ,Text } from '../../../fake-tarojs/components';
import display1Icon from '../../../images/icon/canteen/display1.png'
import display2Icon from '../../../images/icon/canteen/display2.png'
import React, { Component } from 'react';
import "./circlebutton.scss"
import { AtButton } from "../../../fake-tarojs/taro-ui";
import Taro from '../../../fake-tarojs/taro' 


class circlebutton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return(
            <View className="starAndSearch">
                
                <Image className="tubiao" src={this.props.icon1} onClick={() => Taro.navigateTo({ url:"/pages/canteen/searchpage/searchpage"})} ></Image>
                <Image className="tubiao" src={this.props.icon2} onClick={() => Taro.navigateTo({ url:"/pages/canteen/starpage/starpage"})}></Image>
            </View>
        )
    }
}
export default circlebutton