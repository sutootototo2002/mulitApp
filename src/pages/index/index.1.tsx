
import Taro, { Component, Config, MapContext } from '@tarojs/taro'
import { Map, CoverView,View,Image, CoverImage,Button,Text} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"


import locationImg from '../../assets/images/location.png'
import positionerrorImg from '../../assets/images/dw.png'

import './index.scss'

// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
interface IState {
  latitude: number,
  longitude:number,
  scale:number,
  controls:Array<object>,
  location:string,
  isOpened:boolean,
  mapObj:object,
  mapKey:string,
  showLocation:boolean
  
}
export default class Index extends Component<{}, IState>{
  mapObj: Taro.MapContext;

  constructor (props) {
    super(props)
    this.state = {
      mapKey:'CFOBZ-IOJKX-TGG4T-ZZM75-EXWF2-OHFAP',
      latitude: 39.908823,
      longitude: 116.397470,
      scale:16,
      location:'/assets/images/location.png',
      controls: [],
      isOpened:true,
      mapObj:{},
      showLocation:true
      
    }
  }

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillMount(){
    console.log('---onLaunch---项目运行时触发')
    console.log('获取用户信息:')
    this.mapObj = Taro.createMapContext("mymap")
    
    var that = this;

    Taro.getSystemInfo({
      success: res => {
          console.log('获取用户的手机信息（屏幕宽高等）')
          console.log(JSON.stringify(res));
          console.log('存储用户信息到缓存store中')
          
          let store = Taro.setStorageSync("userInfo",res);
          const data = Taro.getStorageSync('userInfo');
          console.log("data中是否有用户信息：");
          console.log(data);
          that.setState({
             controls:[{
              id: 4,
              iconPath: locationImg,
              position: {
                width: 55,
                height:55,
                left: (res.windowWidth-55)/2,
                top: (res.windowHeight-115)/2
              },
              clickable: false
            }]
          })
      }
    })

    Taro.getLocation({
      type: 'gcj02',
      success:(res)=>{
        console.log("获取用户定位：")

        const data = Taro.getStorageSync('userInfo');
        console.log(res)
        console.log(res.city)
       
        console.log(data);
        that.setState({
          isOpened:false,
          latitude: res.latitude,
          longitude: res.longitude,
          controls:[{
            id: 4,
            iconPath: locationImg,
            position: {
              width: 55,
              height:55,
              left: (data.windowWidth-55)/2,
              top: (data.windowHeight-115)/2
            },
            clickable: false
          }]
        });
        console.log(that.mapObj);
        that.mapObj.moveToLocation();
      },
      fail:(res)=>{
        console.log("获取用户定位失败111：")
        console.log(res) //请确定定位相关权限已开启
        //console.log(res.errCode)
        if(res.errCode){ //ios和android 开发错误码不一致
          that.setState({
            isOpened:true
          })
          return;
        }
        if(res.error){ //ios和android 开发错误码不一致
          that.setState({
            isOpened:true
          })
          return
        }
       
      }

    })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //设置定位关闭
  oncancel(){
    const data = Taro.getStorageSync('userInfo');
    this.setState({
      controls:[{
        id: 4,
        iconPath: locationImg,
        position: {
          width: 55,
          height:55,
          left: (data.windowWidth-55)/2,
          top: (data.windowHeight-115)/2
        },
        clickable: false
      }]
    })
  }
  onsubmit(){
    var that = this;
    Taro.openSetting({
      //重新请求获取定位
      success: (res) => {
        console.log('重新获取定位!');
        console.log(res);
        if (res.authSetting["scope.userLocation"]) {
          // that.moveToCenter();
          // that.getNearbyMachines();
         
        }
      }
    })
  }
  render () {
    return (
        <View>
        <Map className='mb-map' id='mymap' subkey={this.state.mapKey} latitude={this.state.latitude} longitude={this.state.longitude} scale={this.state.scale} controls={this.state.controls} />
       </View>
        )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

// export default Index as ComponentClass<PageOwnProps, PageState>
