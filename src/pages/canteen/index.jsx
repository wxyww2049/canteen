import { View } from "../../fake-tarojs/components";
import { AtTabBar } from "../../fake-tarojs/taro-ui";
import React, { Component } from 'react';
import reactDOM from 'react-dom';
import zhongxin from "../../images/icon/school/zhongxin_select.png";
import ruanjianyuan from "../../images/icon/school/ruanjianyuan_select.png";
import baotuquan from "../../images/icon/school/baotuquan_select.png";
import qianfoshan from "../../images/icon/school/qianfoshan_select.png";
import hongjialou from "../../images/icon/school/hongjialou_select.png";
import xinglongshan from "../../images/icon/school/xinglongshan_select.png";
import List from "./list/list";
import Taro from "../../fake-tarojs/taro";
import Circlebutton from "./circlebutton/circlebutton.jsx"
import searchicon from "../../images/icon/search.png"
import staricon from "../../images/icon/star.png"
import Author from "./token"
export default class Home extends Component {

    componentDidMount() {
        let token = window.localStorage.getItem('caitoken');
        // console.log(token);
        if(token == null) {

    
            Taro.request({
                method: 'POST',
                url: 'http://localhost:9090/api/auth/signup',
                header: {
                    // "Content-Type": "application/json;charset=UTF-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                    'Content-type': 'application/json',
                    // 'Authorization': 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwIiwiY3JlYXRlZCI6MTY0MzgxNTkyMzQ3MywiZXhwIjoxNzMwMjE1OTIzfQ.L-NrInQMT4hzaSHyd1ws9xCW9VrfNAAlRcyAo5q6-Ft9y1c4rMtAb13ccWy-5QjlRzA0heb9bJ8T1Klmxkhzbw',
                    'Access-Control-Allow-Origin': '*',
                    // "Accept": "*/*"
                
                  },
                data: {
                    username:'usertest',
                    password:'123456',
                    role:''
                }
            }).then((res) => {
                // Author.token=res.data.data.tokenHead+res.data.data.token;
                // window.localStorage.setItem("caitoken",res.data.data.tokenHead+res.data.data.token);
                console.log('test')
            })
            // Author.token="BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDIxMDAzMDAyNjEiLCJjcmVhdGVkIjoxNjQ2MzYwMjA0MDgzLCJleHAiOjE3MzI3NjAyMDR9.CClTPPcre8WFkszBnnVNMsve9ETAykMyXjfIjoEkOFaGy8BPhLeR43bgyzyX2hcMA1NiHenCTWji8aAdVgLMFg"
        
        }
        else {
            Author.token=token;
        }
    }

    render() {
        return (
          



            <View className="mybody">
                <List pic={ruanjianyuan} area="软件园校区" sid="4"/>
                <List pic={zhongxin} area="中心校区" sid="1"/>
                <List pic={qianfoshan} area="千佛山校区" sid="6"/>
                <List pic={xinglongshan} area="兴隆山校区" sid="5"/>
                <List pic={baotuquan} area="趵突泉校区" sid="3"/>
                <List pic={hongjialou} area="洪家楼校区" sid="2"/>     
                <Circlebutton icon1={searchicon} icon2={staricon}/>     
            </View>
        )
    }
}