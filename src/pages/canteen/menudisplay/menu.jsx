import { View } from "../../../fake-tarojs/components";
import React, { Component } from 'react';
import Food from "../food/food"
import Taro from "../../../fake-tarojs/taro";
import Author from '../token'
export default class Home extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            foodlist:[]
        }
        
    }

    componentDidMount() {
        Taro.setNavigationBarTitle({
            title: Author.placename+" "+Author.typename
          })
        Taro.request({
            method:'GET',
            url: 'http://121.250.210.65:8080/menu/query',
            header: {
                'Authorization': Author.token,
                'Access-Control-Allow-Origin': '*',
        
              },
            data: {
                sid:Author.place,
                type:Author.type,
                place:Author.placename
            }
        }).then((res) => {
            this.setState({foodlist:res.data.data})
        })

    }
    getfood = ()=> {
        Taro.setNavigationBarTitle({
            title: Author.placename+" "+Author.typename
          })
        Taro.request({
            method:'GET',
            url: 'http://121.250.210.65:8080/menu/query',
            header: {
                'Authorization': Author.token,
                'Access-Control-Allow-Origin': '*',
        
              },
            data: {
                sid:Author.place,
                type:Author.type,
                place:Author.placename
            }
        }).then((res) => {
            this.setState({foodlist:res.data.data})
        })
    }
    gettime(isb,isl,isd) {
        var ret=''
        if(isb) ret = ret + '早'
        if(isl) ret = ret + '中'
        if(isd) ret = ret + '晚'
        return ret
    }
    render() {
        return (
          <View className="dishes">
           {
            this.state.foodlist.map(foodid => {
              return(
                
                <Food changestar={()=>this.getfood()} place={foodid.food.place}id={foodid.food.fid}star={foodid.collectedStatus} name={foodid.food.fname} price={foodid.food.price} window={foodid.food.window} time={this.gettime(foodid.food.isbreakf,foodid.food.islunch,foodid.food.isdinner)}></Food>
              )
            })
          }
            </View>
        )
    }
}