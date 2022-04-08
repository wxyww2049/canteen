import { View, Swiper, Image ,Text } from '../../../fake-tarojs/components';
import display1Icon from '../../../images/icon/canteen/display1.png'
import display2Icon from '../../../images/icon/canteen/display2.png'
import React, { Component } from 'react';
import "./list.scss"
import { AtButton } from "../../../fake-tarojs/taro-ui";
import Taro from '../../../fake-tarojs/taro' 
import Author from '../token.js'
import Expanse from "react-expanse"
class list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false
        }
        this.change = this.change.bind(this)
        this.gotolist=this.gotolist.bind(this)
    }
    change() {
        // console.log(2)
        this.setState({flag:this.state.flag ? false : true})
    }
    gotolist = (typeid)=> {
        return (e) => {
            Author.type=typeid
        
            // console.log(Author.type)
            
            if(typeid===1) {
                Author.typename='固定菜品'
            }
            if(typeid===2) {
                Author.typename='特色菜品'
            }
            if(typeid===3) {
                Author.typename='当日新菜'
            }
            Author.place=this.props.sid
            Author.placename=this.props.area
            Taro.navigateTo({
                url:'../menudisplay/menu',
            });
        }
        
    }
    render() {
        
        return(
            <View>
                <View className = "Head" onClick={this.change}>  
                    <Image className="fapic"  src={this.props.pic}/>
                    <View className="title"   style={{color:this.state.flag ?  '#00b696': 'black'}}>{this.props.area}</View>
                    <View className='displayButton' ><Image src={this.state.flag ? display2Icon : display1Icon} /></View>
                </View>
                <Expanse show={this.state.flag}>
                <View className={this.props.area} >
                    <View className="son">
                        <View className="sonlist">
                            <AtButton type="primary" className='button1' onClick={this.gotolist(1)} >当日菜品（固定）</AtButton>
                        </View>
                        <View className="sonlist">
                            <AtButton type="primary" className='button1'  onClick={this.gotolist(2)}>特色菜品</AtButton>
                        </View>
                        <View className="sonlist">
                            <AtButton type="primary" className='button1'  onClick={this.gotolist(3)}>当日新菜</AtButton>
                        </View>
                    </View>
                </View>
                </Expanse>
            </View>

        )
    }
}
export default list