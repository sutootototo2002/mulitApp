// var socketOpen = false;
// var shoudReconnet = false;
// var socketMsgQueue = [];

var intervalRefresh;
var intervalOrder;
var intervalOrderStatus;
var timer = 0;
var timerList = [];
var count = 0; 

var this_;

import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,HOST_WEBSOCKET,HOST_URL,systemUser} from '../../../config/index.js'; 

var order = require("../../../utils/order.js");

import './index.scss'

interface IState {
    formid:string,
    lockid:string,
    orderno:string,
    machineid:string,
    finishImg:string,
    isfinish:boolean,
    orderid:string,
    openfailed:boolean,
    state1:string,
    icon1:string,
    machine:object,
    shelfs:object,
    socketMsgQueue:Array<object>,
    socketOpen:boolean,
    totalfee:number,
    cartgoods:Array<object>,
    promotions:number,
    cartTips1:string,
    cartTips2:string,
    shopping:string,
    needRequestOrder:boolean,
    isRefreshingOrder:boolean,
    unpayorder:Array<object>
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && poprocess.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Index extends Component<{}, IState>{

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
        machine:{},
        shelfs:{},
        orderno:'',
        orderid:'',
        openfailed:false,
        state1:PATH + '/mImages/shopping1.png', 
        shopping:PATH + '/mImages/shopping1.png',
        icon1:PATH + '/mImages/fkz.png',
        socketMsgQueue:[],
        socketOpen:false,
        totalfee:0,
        cartgoods:[],
        promotions:0,
        cartTips1:'正在购物中',
        cartTips2:'小主,拿到满意商品后,要关门哦！',
        needRequestOrder:false,
        isRefreshingOrder:false,
        unpayorder:[],
        finishImg:PATH + '/mImages/finishImg.png',
        isfinish:true


    }
}


  componentWillMount(){
    this_ = this;
    Taro.setNavigationBarTitle({
      title:globalData.sysTitle
    })
    console.log('视频柜数据')
    console.log(this.$router.params)
    const machineid = this.$router.params.machineid;
    const orderid = this.$router.params.orderid;
    const orderno = this.$router.params.orderno;
    var that = this;
    this.setState({
      machineid: machineid,
      orderid: orderid,
      orderno: orderno
    })
    Taro.setStorageSync("routerinfo", this.$router.params);
    const routerinfo= Taro.getStorageSync('routerinfo'); 
    //机柜详细信息
    this.getMachineDetail();
    this.getPromotions(routerinfo.machineid);
 //
 console.log("*******onLoad*******");
 var that = this;
 //查询订单状态
 if (routerinfo.orderid == null || routerinfo.orderid == 'undefined') {
   console.log("options.orderid为空");
   var orderid_ = Taro.getStorageSync('orderid');
   that.setState({
     orderid: orderid,
   })
 }
 console.log("*******orderid*******" + routerinfo.orderid);
 var orderid_ = routerinfo.orderid;

         order.startqueryorderstatus(orderid, function succeeded(res) {
            console.log('-----orderstatus-----');
            console.log(res);
            var orderstatus = res.data.data.orderstatus;
            var doorstatus = res.data.data.doorstatus;
            if (res.data.code == 200) {
              if(doorstatus=='4' && (orderstatus !== "6"||orderstatus !== "3"||orderstatus !== "5"||orderstatus !== "8")){
                console.log('----doorstatus---floweryan----')
                this_.setState({
                  isfinish:false,
                  state1:this_.state.finishImg,
                  cartTips1:'完成购物',
                  cartTips2:'小主,柜门已关,购物已完成。',
                  cartTips3:'您可放心离开,稍后为您推送购物单。'
                })
              }
              if (orderstatus == "5" || orderstatus == "3" || orderstatus == "7" || orderstatus == "8" || orderstatus == "9") { //5已付款 3已取消 8已完成 9 错误
                  console.log('---走这里---')
                  
                  order.stopInterval();
                    setTimeout(() => {
                      Taro.redirectTo({
                        url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderid + '&whereis=cgshop'
                      })
                    },3000)
                 
                } else if (orderstatus == "6") { //6已欠费
                  
                

                  this_.getUnpayOrder();
                  
                } 
                // else {
                //   that.setState({
                //     cartTips1: '正在购物中',
                //     cartTips2:'小主,'+systemUser+'正在快速核算订单,请耐心等候哦！'
                //   });
                // }
              
            } 
          });
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {
    order.stopInterval();
  }
  componentWillUnmount() {
    
    order.stopInterval();

  }


  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  //获取促销商品
  tapRefresh() {
    order.stopInterval();
    Taro.redirectTo({
      url: '/pages/index/index',
    })
  }
  

      //付支付订单
      getUnpayOrder() {
        var that = this;
        Taro.request({
          url: BASE_URL + 'order/unpayorder',
          data: {},
          header: {
            'content-type': 'application/json', // 默认值
            'token': globalData.token
          },
          success: function (res) {
            console.log('购物订单3333：');
            console.log(res);
            if (res.data.code == 200) {
              
              Taro.setStorageSync("orderid", res.data.data.orderid);
              if(res.data.data.score == '0'){
              //自动发起支付
              this_.setState({
                isfinish:false,
                state1:this_.state.finishImg,
                cartTips1:'购物完成',
                cartTips2:'您已完成购物,请及时支付',
                cartTips3:'提示：长时间不支付将影响您的信用'
              })
              order.stopInterval();
              that.payOrder();
              }else{
                //order.stopInterval();
                this_.setState({
                  isfinish:false,
                  state1:this_.state.finishImg,
                  cartTips1:'购物完成',
                  cartTips2:'您已完成购物,请及时支付',
                  cartTips3:'稍后可留意微信支付分发送的支付推送'
                })
              }
              this_.setState({
                unpayorder: res.data.data 
              });
              
              
            } else {
               console.log('您没有未支付订单！')
            }
    
          }
        })
      }
      payOrder(){
        var orderid = Taro.getStorageSync("orderid");
        //var orderid = this.data.unpayorder.orderid;
        this.setState({
          orderid: orderid
        });
        this.requestPay(orderid);
    
      }
  getPromotions(machineid){
    //console.log('aaa')
    var that = this;
    Taro.request({
      url: BASE_URL + 'promotion/machine',
      data: {
        machineid: machineid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        Taro.hideLoading();
        //检测是否可以开门
        if (res.data.code == 200) {
          var promotions = res.data.data;
          console.log("promotions:success");
          console.log(promotions);
          that.setState({
            promotions: promotions.length
          });
        } else {
          console.log("promotions:fail")
          console.log(res.data.code)
          console.log(res)
        }

      },
      fail: function (e) {
        Taro.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }
  // 请勿修改此函数
  getMachineDetail() {
    const routerinfo= Taro.getStorageSync('routerinfo'); 
    var that = this;
    Taro.request({
      url: BASE_URL + 'machine/machinedetail',
      data: {
        machineid: routerinfo.machineid
      },
      header: {
        'content-type': 'application/json',
        'token':globalData.token
      },
      success: function (res) {
        console.log('machine:')
        console.log(res.data.data)
        that.setState({
          machine: res.data.data
        });
      }
    })
  }
    //转到客服
    goKefu(){
      console.log('微信客服')
      Taro.navigateTo({
        url: '/pages/service/service'
      })
    }
  //获取机柜货台布局
  getShelfs() {
    var that = this;
    const routerinfo= Taro.getStorageSync('routerinfo'); 
    Taro.request({
      url: BASE_URL + 'machine/shelfs',
      data: {
        machineid: routerinfo.machineid
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data)
        that.setState({
          shelfs: res.data.data
        });
      }
    })
  }
  //
  requestPay(orderid) {
    const routerinfo= Taro.getStorageSync('routerinfo'); 
    var that = this;
    Taro.showLoading({
      title: '请求支付',
    })
    Taro.request({
      method: 'POST',
      data: {
        'orderid': orderid
      },

      url: BASE_URL + 'pay/getPreGoodsOrder',
      header: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'token':globalData.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          Taro.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
            'success': function (res) {
              console.log('success', res);
              Taro.hideLoading();
              Taro.showModal({
                title: '提示',
                content: '支付成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    Taro.redirectTo({
                      url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=cgshop'
                    })
                  }
                }
              });

            },
            'fail': function (res) {
              
              Taro.hideLoading();
              console.log('---弹出失败 fail---', res);
              console.log('fail', res);
              Taro.showModal({
                title: '提示',
                content: '支付失败，请重新支付',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    Taro.redirectTo({
                      url: '/pages/orders/orderdetail/orderdetail?orderid=' +routerinfo.orderid + '&whereis=cgshop'
                    })
                  }
                }
              })
            }
          })
        } else {
          if (res.data.msg = '该订单已支付'){
           
            Taro.hideLoading();
            Taro.redirectTo({
              url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=cgshop'
            })
          }else{
            
            Taro.hideLoading();
            Taro.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          }
          
        }


      }
    })
  }
  //获取购物筐
  open() {
    //取消
    Taro.navigateTo({
      url: '/pages/contact/contact'
    })
  }
  phonecall() {
    Taro.makePhoneCall({
      phoneNumber: '400889959'
    })
  }
  
    // 轮询订单支付状态
    queryPayStatus(orderid){
      const routerinfo= Taro.getStorageSync('routerinfo'); 
      var that = this;
      Taro.showLoading({
        title: '等待支付结果...',
      });
      //查询订单状态
      intervalOrderStatus = setInterval(function() {
        Taro.request({
          method: 'POST',
          data: {
            'orderid': orderid
          },
  
          url:BASE_URL + 'order/paystatus',
          header: {
            'Accept': 'application/json',
            'token': globalData.token
          },
          success: function(res) {
            console.log(res.data.data);
            if (res.data.data.orderstatus == "5" ||res.data.data.orderstatus == "3" || res.data.data.orderstatus == "8"|| res.data.data.orderstatus == "9") {
              console.log('----payed---');
              clearInterval(intervalOrderStatus)
              clearInterval(intervalRefresh);
              Taro.redirectTo({
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=cgshop'
              })
            } else {
  
            }
          }
        })
  
      }, 2000); //循环时间2秒
    }

    syncRfidOrder() {
      var that = this;
      const routerinfo= Taro.getStorageSync('routerinfo'); 
      Taro.request({
        url: BASE_URL + 'device/syncRfidOrder',
        data: {
          orderno: routerinfo.orderno,
          machineid:routerinfo.machineid
        },
        header: {
          'content-type': 'application/json', // 默认值
          'token': globalData.token
        },
        method: "POST",
        success: function(res) {
          console.log(res);
          if (res.data.code == 224) { // 交易不存在
            Taro.showToast({
              title: '交易不存在',
            })
            Taro.redirectTo({
              url: '/pages/index/index'
            })
          } else if (res.data.code == 223) { // 机柜离线
            Taro.hideLoading();
            Taro.showToast({
              title: '机柜离线',
            })
          } else if (res.data.code == 222) { // 交易中
            Taro.hideLoading();
            Taro.showToast({
              title: '交易中',
            })
          } else {
            Taro.hideLoading();
            that.orderStatus();
          }
        },
        fail: function(e) {
          Taro.hideLoading();
          that.setState({
            needRequestOrder: true,
            isRefreshingOrder: false
          });
        }
      })
    }
    gotoBack() {
      //回到首页
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }
  render () {
    const { cartgoods } = this.state;
    const goodsitem =  cartgoods.map((item) => {
          return (
            <View className='glist'>
                  <Image className='goodsImg' src={item.picurl}/>
                  <View ></View>
                  <View className='goodsInfo'>
                  <View className='goodsName'>商品:{item.goodsname}</View>
                   <View className='line1'>
                  
                  <View className='goodsPrice'>价格：{item.salefee/100}元</View>
                  <View className='acount'>数量：{item.count}</View>
                   </View>
                   <View className='line1'>
                   <View className='goodsge'>规格:{item.spec}</View>
                   <View className='total'>总价：{item.salefee*item.count/100}元</View>
                   </View>
                  </View>
            </View>
          )
    })
    return (
        <View className='smain'>
         {this.state.isfinish?

            <View className='shopDiv'>
              <Image className='shopImg1' src={this.state.state1}/>
              <View className='shoptitle'>{this.state.cartTips1}</View>
              <View className='shopInfo'>{this.state.cartTips2}</View>
            </View>
            :
            <View className='shopDiv'>
            <Image className='shopImg1' src={this.state.state1}/>
            <View className='shoptitle'>{this.state.cartTips1}</View>
            <View className='shopInfo'>{this.state.cartTips2}</View>
            <View className='shopInfo'>{this.state.cartTips3}</View>
            </View>
            }
                      <View className='addr'>
                <Image className='addricon1' src={this.state.icon1}/>
                <View className='addr1'>{this.state.machine.machinename}</View>
                <View className='addr2'>{this.state.machine.location}{this.state.machine.dailaddress}</View>
                <Button className='toSever1' onClick={this.goKefu}>联系客服</Button>
          </View>
          {this.state.promotions>0?
          <View className='promotionInfo'>本次购物会在结算时享受优惠活动，请关门后查看</View>
          :
          <View></View>
          }
          <View>
          {this.state.unpayorder.score == "0"?
          <Button type="default" className='btn' onClick={this.payOrder}> 支付 </Button>
          :
          <Button type="default" className='btn' onClick={this.gotoBack}> 关闭 </Button>
          }
          </View>
          
          <View className='seDiv' hidden={true}>
             <View className='selectDiv'>
               <View className='seltitle'>所选商品</View>
               <View className='seltotal'>合计：{this.state.totalfee/100}元</View>
             </View>
             <View className='goodslist'>
               {goodsitem}
             </View>
          </View>
          <View className='orderdetail' hidden={true}>
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


