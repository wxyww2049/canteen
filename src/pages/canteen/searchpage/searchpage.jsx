import { View  ,Swiper, Image ,Text} from "../../../fake-tarojs/components";
import React, { Component } from 'react';
import Food from "../food/food"
import Taro from "../../../fake-tarojs/taro";
import Author from "../token"
import logo from "../../../images/sear.png"
import "./searchpage.scss"
export default class Home extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            foodlist:[],
            key:'',
            displaycon:false
        }
    }

    gettime(isb,isl,isd) {
        var ret=''
        if(isb) ret = ret + '早'
        if(isl) ret = ret + '中'
        if(isd) ret = ret + '晚'
        return ret
    }
   
    inputChange(){
      let val=this.refs.box.value;
      this.setState({
        key:val
      })
    }
    getfood = ()=> {
      // return (e) => {
        Taro.request({
          method:'GET',
          url: 'http://121.250.210.65:8080/menu/search',
          header: {
              'Authorization': Author.token,
              'Access-Control-Allow-Origin': '*',
      
            },
          data: {
            key:this.state.key
          }
      }).then((res) => {
          this.setState({foodlist:res.data.data})
          // console.log(res.data.data[0].collectedStatus)
      })
        this.setState({displaycon:true});
        // console.log(this.state.key);
        // Author.flag=1
      // }
    }
    render() {
        return (
          <View className="myseabody">
            <View className="wide">
            <View className='searchthings'>
              <input ref='box' className='searchbox' onChange={()=>this.inputChange()}/>
              <Image className='sealogo' src={logo} onClick={()=>this.getfood()} ></Image>
              {/* <button onClick={()=>this.getfood()}>搜索</button> */}
            </View>
            
            </View>
            <View className="dishes" style={{display:this.state.displaycon ? 'block' : 'none'}}>
               {
                this.state.foodlist.map(foodid => {
                  return(
                    <Food changestar={()=> this.getfood()} place = {foodid.food.place} id={foodid.food.fid}star={foodid.collectedStatus} name={foodid.food.fname} price={foodid.food.price} window={foodid.food.window} time={this.gettime(foodid.food.isbreakf,foodid.food.islunch,foodid.food.isdinner)}></Food>
                  )
                })
              }
            </View>
            
          </View>
        )
    }
}