import { View } from "../../../fake-tarojs/components";
import React, { Component } from 'react';
import Food from "../food/food"
import Taro from "../../../fake-tarojs/taro";
import Author from '../token'
export default class Home extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            foodlist:[],
            starflag:1
        }
    }

    componentDidMount() {
        
        Taro.request({
            method:'GET',
            url: 'http://121.250.210.65:8080/collected/show',
            header: {
                'Authorization': Author.token,
                'Access-Control-Allow-Origin': '*',
        
              },
            data: {
            }
        }).then((res) => {
            // this.setState({foodlist:res.data.data})
            console.log(res)

            this.setState({foodlist:res.data.data})
        })

    }
    getfood = ()=> {
      // return (e) => {
        Taro.request({
          method:'GET',
          url: 'http://121.250.210.65:8080/collected/show',
          header: {
              'Authorization': Author.token,
              'Access-Control-Allow-Origin': '*',
      
            },
          data: {
          }
      }).then((res) => {
          // this.setState({foodlist:res.data.data})
          console.log(res)

          this.setState({foodlist:res.data.data})
      })
        // this.setState({displaycon:true});
        // console.log(this.state.key);
        // Author.flag=1
      // }
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
              this.state.foodlist == null ? '':this.state.foodlist.map(foodid => {
                return(
                  <Food changestar={()=>this.getfood()} id={foodid.fid} place = {foodid.place} star={this.state.starflag} name={foodid.fname} price={foodid.price} window={foodid.window} time={this.gettime(foodid.isbreakf,foodid.islunch,foodid.isdinner)}></Food>
                )
              })
          }
            </View>
        )
    }
}