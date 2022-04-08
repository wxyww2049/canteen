import { View, Swiper, Image, Text } from '../../../fake-tarojs/components';
import React, { Component } from 'react';
// import reactDOM from 'react-dom';
import "./food.scss";
// import Taro from '../../fake-tarojs/taro';
import col0 from '../../../images/icon/canteen/col0.png';
import col1 from '../../../images/icon/canteen/col1.png';
import Author from "../token"
import Taro from "../../../fake-tarojs/taro";
import moment from 'moment'
import { useEffect, useCallback, useState }  from 'react';
import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.change = this.change.bind(this)
    }
    restar = ()=> {
        
        var x = this.props.star?0:1;
        Taro.request({
            
            method:'POST',
            url: 'http://121.250.210.65:8080/collected/update',
            header: {
                "Content-Type":"application/json",
                'Authorization': Author.token,
                'Access-Control-Allow-Origin': '*',
            
              },
            data: {

                    "fid": this.props.id,
                    "status": x,
                    "uid": "202100300261",
                    "updateTime": moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + "Z"

            }
        }).then((res) => {
            this.props.changestar?.()
    
        })
    }
    change = ()=> {
        return () => {
            if(this.props.star==1) {
                Taro.showModal({
                    title: '警告',
                    content: '确定取消收藏'+this.props.name+'吗？',
                    success: ({ confirm }) => {
                      if (confirm) {
                        this.restar();
                      }
                    }
                  });
            }
            else {
                this.restar();
            }
            
            // setTimeout("this.props.changestar?.()","2000");
        }
    }
    render() {
        return (
            
            <View className="cai">   
              <View className="message">
                <View className="name">{this.props.name}</View>
                <View className="detail">
                    <View className="price">{this.props.price}元/份</View>
                    <View className="window">窗口{this.props.window}</View>
                     <View className="time">{this.props.time}</View>{this.props.place}
                </View>
              </View>
                <Image src={this.props.star ? col1 : col0} className="pic1" onClick={this.change()}/>
            </View>
            )
            
    }
}
export default Food