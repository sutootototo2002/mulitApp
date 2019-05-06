import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../config/index.js'; 

import './login.scss'

interface IState {
    loginImg:string
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Login extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText:'会员注册'
  }
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
        loginImg:PATH+'/mImages/loginImg.png'
    }
}


  componentWillMount(){
    
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <View>
           <View className='loginDiv'>

             <Image className='loginImg' src={this.state.loginImg}/>
             <View className='loginWord'>不用记，不怕忘，快速登录直接点击!</View>
             <Button type='default' className='Btn loginBtn'>微信用户快速登录</Button>
             <View className='logintk'>
                 点击登录，及表示已阅读并同意
                 <View className='tk'>《机柜服务条款》</View>
             </View>
           </View>
        </View>
    )
  }
}


