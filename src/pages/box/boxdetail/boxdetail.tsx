var machineid;
var curPage=0;
var lat;
var lon;
import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../../config/index.js'; 

import './boxdetail.scss'

interface IState {
    loginImg:string,
    machineid:object,
    goods:Array<object>,
    salesort:string,
    total:number,
    hasnext:boolean,
    addr:string,
    machine:Array<object>
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Boxdetail extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText:'机柜详情页'
  }
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
        machineid:'',
        machine:{},
        goods:[],
        addr: PATH + '/mImages/tytb-4.png',
        total:0,
        salesort:'0',
        hasnext:false,
        loginImg:PATH+'/mImages/loginImg.png'
    }
}


  componentWillMount(){
    console.log('-----------onLoad---------')
    console.log(this.$router.params)
    console.log(this.$router.params.machineid)
    machineid = this.$router.params.machineid;
    this.getDetail();
    this.getGoods();
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}
  getDetail() {
    var that = this;
    Taro.request({
      url: BASE_URL + 'machine/machinedetail',
      data: {
        machineid: machineid
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: function (res) {
        console.log("详细信息：")
        console.log(res.data.data)
        lat = res.data.data.lat;
        lon = res.data.data.lon;
        that.setState({
          machine: res.data.data
        });
      }
    })
  }
  getGoods() {
    var that = this;
    var page = curPage + 1;
    Taro.request({
      url: BASE_URL + 'machine/goods',
      data: {
        machineid: machineid,
        salesort: that.state.salesort,
        page: curPage,
        rows:10
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: function (res) {
        console.log(res);
        var page = res.data.data.page;
        var total = res.data.data.total;
        var hasnext = res.data.data.hasnext;
        var goods = res.data.data.data;
      
        that.setState({
          goods: goods,
          total: total,
          hasnext: hasnext
        })
      },
      fail: function (e) {
        Taro.hideLoading();
      }
    })

  }
  viewlocation(){
    Taro.openLocation({
      latitude: Number(lat),
      longitude: Number(lon),
      scale: 28
    })
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    const { machine,goods} = this.state;
    console.log("machine.pics:");
    // console.log(machine);
    console.log(machine.pics);
    if(machine.pics){
        console.log('1111111111111')
        const $pics = machine.pics.map((item,index)=>{
            return(
            <Image className='imgDiv' src={item.url?item.url:''}/>
            )
        })
    }
   
    const glist = goods.map((item,index)=>{
        return (
            <View className='gdul'>
                    <View className='gli'>
                        <Image className='gliName' src={item.picurl}/>
                        <View className='gliInfo'>
                            <View className='gName'>{item.name}</View>
                            <View className='gName1'>{item.goodsname}</View>
                            <View className='ginfo'>
                                <View className='price'>￥<Text className='pric'>{item.salefee/100}</Text>/{item.spec}</View>
                                <View className='kcun'>库存{item.amount}</View>
                            </View>
                        </View>
                    </View>
             </View>
        )
    })
    return (
        <View>
           <View className='boxdetail'>
               
              <View className='boxTitle'>{this.state.machine.machinename?this.state.machine.machinename:'知码开门智能机柜'}</View>
              
               <View className='imagesDiv'>
               {$pics}
               </View>
            
              <View className='addr'>地址：<Image className='addr1' src={this.state.addr}/> {this.state.machine.location}-{this.state.machine.dailaddress}| 距您555km</View>
              <Image className='addr2' onTouchStart={this.viewlocation} src={this.state.addr}/>
            </View>
            <View>
                <View className='goodsName'>当前商品</View>
                {glist}
                <View className='moregoods'>更多商品</View>
            </View>
        </View>
    )
  }
}


