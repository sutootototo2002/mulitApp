var requestfailed = true;

var iNow = 0;

var orderid =''


import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text,Navigator } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../../config/index.js'; 



import './open.scss'

interface IState {
    formid:string,
    lockid:string,
    machineid:string,
    orderid:string,
    openfailed:boolean,
    num:number,
    tag:number,
    requestfailed:boolean
    loadImg:string,
    isfind:boolean,
    dw:string,
    infine:string,
    markBoolean:boolean
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && poprocess.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Open extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText:''
  }
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
        formid:'',
        lockid:'',
        machineid:'',
        orderid:'',
        openfailed:false,
        requestfailed:true,
        markBoolean:false,
        num:0,
        tag:0,
        infine:'设备故障',
        isfind:false,
        dw: PATH + '/mImages/dw.png',
        loadImg:PATH+'/mImages/open.png'

    }
}


  componentWillMount(){
    Taro.setNavigationBarTitle({
      title:globalData.sysTitle
    })
    console.log(this.$router.params)
    this.setState({
        formid:this.$router.params.formid,
        lockid:this.$router.params.lockid,
        machineid:this.$router.params.machineid
    })
    this.open();
    this.deviceOpen(this.$router.params.machineid, this.$router.params.lockid);
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  deviceOpen(machineid, lockid) {
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/open',
      data: {
        machineid: machineid,
        lockid: lockid,
        formid: that.state.formid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        Taro.hideLoading();
        var code = res.data.code;
        if (code == 200) {
          orderid = res.data.data.orderid;
          var orderno = res.data.data.orderno;
          var recogmode = res.data.data.recogmode;
          that.setState({
            orderid: orderid
          });
          Taro.setStorageSync("orderid", orderid);
          if (recogmode == 3) {//重力柜
            Taro.setStorageSync("orderid", orderid);

            // wx.setStorage({
            //   key: "orderid",
            //   data: orderid
            // });
            Taro.redirectTo({
              url: '../../index/shopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno + '&from=open'
            })
          } else {
            Taro.setStorageSync("orderid", orderid);
            // wx.setStorage({
            //   key: "orderid",
            //   data: orderid
            // });
            Taro.redirectTo({
              url: '../../index/cgshopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno
            })
          }
        } else {
          that.setState({
            openfailed: true,
            isfind:true,
            markBoolean:true
          });
          // Taro.showModal({
          //   title: '提示111',
          //   content: res.data.msg,
          //   showCancel: false,
          //   success: function (res) {
          //     if (res.confirm) {
          //       Taro.reLaunch({
          //         url: '../../index/index'
          //       })
          //     }
          //   }
          // })
        }

      },
      fail: function (e) {
        Taro.showModal({
          title: '提示',
          content: '请求失败，请稍后再试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: '../../index/index'
              })
            }
          }
        })
      }
    })
  }
  tryagain(){
      Taro.redirectTo({
        url: '/pages/index/index'
      })
  }
  open() {
    var that = this;
    var interval = setInterval(function () {
      var newtag = iNow +1;
      that.setState({
        tag: newtag,
      });

      //循环执行代码 
      if (requestfailed) {
        console.log('---循环执行代码 ---');
        //that.openStatus();
      } else {
        console.log('---停止循环执行代码 ---');
        that.setState({
          tag: 100,
        });
        clearInterval(interval)
      }

    },800); //循环时间1秒 
    setTimeout(function () {
      if (requestfailed) {
        clearInterval(interval);
        that.requestOpenStatus();
      }
    }.bind(this), 60000);
  }
  openStatus() {
    var that = this;
    orderid = Taro.getStorageSync("orderid");
    console.log("orderid:")
    console.log(orderid)
    Taro.request({
      url: BASE_URL + 'device/openstatus',
      data: {
        orderid: orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 200) {
          that.setState({
            requestfailed: false
          });
          requestfailed = false
          console.log("orderid:1111111111111111111111")
          console.log(orderid)
          //Taro.setStorageSync("orderid", orderid);
          // wx.setStorage({
          //   key: "orderid",
          //   data: that.data.orderid
          // });
          // Taro.reLaunch({
          //   url: '../../index/index'
          // })
        } else if (res.data.code == 211) {
          that.setState({
            isfind: true,
            infine:res.data.msg
          });
          Taro.showToast({
            title: res.data.msg,
            icon: 'fail',
            duration: 2000
          })
          requestfailed = false
          // Taro.showModal({
          //   title: '提示',
          //   content: res.data.msg,
          //   showCancel: false,
          //   success: function (res) {
          //     if (res.confirm) {
          //       Taro.navigateBack({

          //       })
          //     }
          //   }
          // })
        } else {
          that.setState({
            requestfailed: true
          });
          Taro.showToast({
            title: res.data.msg,
            icon: 'fail',
            duration: 2000
          })
          requestfailed = false
          that.setState({
            isfind: true,
            infine:res.data.msg
          });
        }
      },
      fail: function (e) {
        that.setState({
          openfailed: true
        });
      }
    })
  }
  requestOpenStatus() {//主动请求机柜状态
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/requestopenstatus',
      data: {
        orderid: orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token':globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 200) {
          that.setState({
            requestfailed: false
          });
          requestfailed = false;
          var orderstatus = res.data.data.orderstatus;
          var doorstatus = res.data.data.doorstatus;
          
          if (orderstatus == "5" || orderstatus == "3" || orderstatus == "7"||orderstatus == "8" || orderstatus == "9") { //5已付款 3已取消 8已完成 9 错误
           
              Taro.redirectTo({
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderid + '&whereis=all'
              })
            
           } else {

            Taro.redirectTo({

            url: '../../index/index'

            })

           }



          //Taro.setStorageSync("orderid", that.state.orderid);
          // wx.setStorage({
          //   key: "orderid",
          //   data: orderid
          // });
          // Taro.redirectTo({
          //   url: '../../index/index'
          // })
        } else {
          that.setState({
            openfailed: true
          });
        }
      },
      fail: function (e) {
        that.setState({
          openfailed: true
        });
      }
    })
  }
  onClosePos(){
    Taro.redirectTo({
      url: '/pages/service/service'
    })
  }
  render () {
    return (
        <View>
           {/* 遮罩层 */}
        {this.state.markBoolean ?
          <CoverView className='mark'></CoverView>
          :
          <CoverView></CoverView>}

          {!this.state.openfailed?
          <View>
         <View className="loader">{this.state.tag}%</View>
           <Image className='loadImg' src={this.state.loadImg}/>
          <View className='openlock'>开锁中，听到开锁声就可以购物啦！</View>
          </View>
          :
          <View>
          <Image className='loadImg' src={this.state.loadImg}/>
          <Button type="primary" onTouchStart='tryagain' className='btns' onClick={this.tryagain}> 重试 </Button>
          <View className='fail'>开柜失败</View>
          <View className='bottominfo'>取出商品后请手动关门结算</View>
          <Navigator className='navigator' url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover" >反馈异常</Navigator>
          </View>
          }

         {this.state.isfind?
          <CoverView className='boxInfo'>
            <CoverImage className='posImg' src={this.state.dw} />
            <CoverView className='info'>设备睡着了,请联系客服({this.state.infine})</CoverView>
            <CoverView className='btnOpen' onClick={this.onClosePos}>确定</CoverView>
            
          </CoverView>
          :
          <CoverView></CoverView>}    
           
        </View>
    )
  }
}


