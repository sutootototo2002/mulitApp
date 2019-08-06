import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../config/index.js'; 

import cax, { html, SVG } from '../../cax/cax'

import './index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
interface IState {
  orderid:string
}

class Orderdetail extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
   config = {
     navigationBarTitleText:'订单详情'
   }
   constructor (props: {} | undefined) {
    super(props)
    this.state = {
      orderid:''
    }
   }

  componentWillMount(){
    console.log(this.$router.params)

  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <View className='smain'>
        <View className='shopDiv'>
          {/* <Image className='shopImg' src={this.state.state1}/> */}
          <View className='shoptitle'>购物中</View>
          <View className='shopInfo'>购物中1111</View>
          {/* <View className='toRight'>
          <Button className='toSever'>联系客服</Button>
          </View> */}
          
        
        </View>
        <View className='addr'>
              {/* <Image className='addricon' src={this.state.icon1}/> */}
              <View className='addr1'>地址1</View>
              <View className='addr2'>地址2</View>
              <Button className='toSever1'>联系客服</Button>
        </View> 
        <View className='seDiv'>
           <View className='selectDiv'>
             <View className='seltitle'>所选商品</View>
             <View className='seltotal'>合计：￥100</View>
           </View>
           <View className='goodslist'>
             
           </View>
        </View>
        <View className='orderdetail'>
          <View className='selectDiv'>
          <View className='seltitle'>订单信息</View>
             <Button className='selBtn'>问题反馈</Button>
          </View>
          <View className='seltInfo'>
            <View>微信免密支付：￥19.62</View>
            <View>优惠总额：￥19.62</View>
            <View>订单编号：BC288487123658445</View>
            <View>交易流水：84461211631356231321354544FEE</View>
            <View>交易日期：2018-12-25 16:16:00</View>
          </View>
        </View>
      </View>
  )
  }
}


