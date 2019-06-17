import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index/index'
import './app.scss'
import './custom-variables.scss'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  config: Config = {
    pages: [
     
      'pages/index/index',
      'pages/personal/index',
      'pages/recharge/recharge',
      'pages/wish/likes/myheart',
      'pages/login/login',
      'pages/service/service',
      'pages/box/open/open',
      'pages/index/shopping/index',
      'pages/index/cgshopping/index',
      'pages/orders/orderdetail/orderdetail',
      'pages/orders/orderlist/orderlist',
      'pages/box/boxdetail/boxdetail',
      'pages/card/bindcard',
      'pages/box/qropen/qropen',
      'pages/refund/refund'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ff9409',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "navigateToMiniProgramAppIdList": [
      "wxbd687630cd02ce1d",
      "wx9b0e57d73efd4ba1"
    ],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于帮您寻找附近的机柜"
      }
    }
  }
  componentWillMount(){}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}



  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
