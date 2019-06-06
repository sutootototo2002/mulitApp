var socketOpen = false;
var shoudReconnet = false;
var socketMsgQueue = [];
var timer = 0;

import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,HOST_WEBSOCKET,HOST_URL,systemUser} from '../../../config/index.js'; 

//import {} from '../../../utils/util.js';
import {orderstatus,stopInterval,requestorderstatus} from '../../../utils/order.js';

import './index.scss'
import { number } from 'prop-types';

interface IState {
    formid:string,
    lockid:string,
    orderno:string,
    machineid:string,
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
    cartTips2:string
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
    navigationBarTitleText:'知码开门购物柜'
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
        state1:PATH + '/mImages/shopping.png',
        icon1:PATH + '/mImages/fkz.png',
        socketMsgQueue:[],
        socketOpen:false,
        totalfee:0,
        cartgoods:[],
        promotions:0,
        cartTips1:'正在购物中',
        cartTips2:'小主,拿到满意商品后,要关门哦！'

    }
}


  componentWillMount(){
    console.log('重力柜数据')
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
    //得到
    this.getShelfs();
    this.getPromotions(routerinfo.machineid);
    this.cartitems();
    //获取订单状态
    //var orderid = that.data.orderid;
    timer= setInterval(()=>{
        
      requestorderstatus(orderid, function succeeded(res) {
         console.log('-----orderstatus-----');
         console.log(res);
         if (res.data.code == 200) {
           var orderstatus = res.data.data.orderstatus;
           var doorstatus = res.data.data.doorstatus;
           if (doorstatus == 4) { //已关柜
             if (orderstatus == 5 || orderstatus == 3 || orderstatus == 8 || orderstatus == 9) { //5已付款 3已取消 8已完成 9 错误
               clearInterval(timer)
               Taro.redirectTo({
                 url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderid + '&whereis=cgshop'
               })
             } else if (orderstatus == 6) { //6已欠费
              clearInterval(timer)
               //拉起支付
               that.requestPay(routerinfo.orderid);
             } else {
               that.setState({
                 cartTips1: '柜门已关闭，订单正在结算中',
                 cartTips2: '稍后给您推送结算账单'
               });
             }
           } else {

           }
         } else {
           var doorstatus = res.data.data.doorstatus;
           if (doorstatus == 3 || doorstatus == 4) {
            //clearInterval(timer)
             that.setState({
               cartTips1: '柜门已关闭，订单正在结算中',
               cartTips2: '稍后给您推送结算账单'
             });
           }
         }
       });
        
   },1000)


  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {
    clearInterval(timer)
  }

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  //获取促销商品
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
    console.log("orderid:")
    console.log(orderid)
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
                      url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=weight'
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
                      url: '/pages/orders/orderdetail/orderdetail?orderid=' +routerinfo.orderid + '&whereis=weight'
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
              url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=weight'
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
  //转到客服
  goKefu(){
    console.log('微信客服')
    Taro.navigateTo({
      url: '/pages/service/service'
    })
  }
  //获取购物筐
  cartitems(){
    
    const routerinfo= Taro.getStorageSync('routerinfo'); 
    console.log(routerinfo.orderno)
    var that = this;
    Taro.request({
      url: BASE_URL + 'order/cartitems',
      data: {
        orderno: routerinfo.orderno,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log('购物商品')
        console.log(res);
        if (res.data.code == 200) {
          var result = res.data.data;
          console.log('---cartitems---');
          console.log(result);
          var goods = result.data;
          console.log('商品：');
          console.log(goods);
          var weights = result.weights;
          var totalfee = result.totalfee;
          that.setState({
            totalfee: totalfee,
            cartgoods: goods
          });
          that.connectServer();

        } else {

        }

      }
    })
  }
  
  connectServer() {
    const routerinfo= Taro.getStorageSync('routerinfo'); 
    
    var that = this;
    Taro.connectSocket({
      url: HOST_WEBSOCKET
    }).then((res)=>{
      console.log('---success---');
      console.log(res);

    }).catch((error)=>{
      console.log('---fail---');
      console.log(error);

    })
    Taro.onSocketOpen((res)=>{
      console.log("WebSocket连接已打开！");
      //  Taro.showToast({
      //   title: '',
      // })
      var data = {
        "orderno": routerinfo.orderno,
        "message": "connect"
      };
      console.log("连接已打开数据");
      console.log(JSON.stringify(data));
    })

    Taro.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
      // wx.showToast({
      //   title: '连接打开失败',
      // })
      console.log(res);
      if (shoudReconnet) {
        Taro.connectSocket({
          url: HOST_WEBSOCKET
        });
      }
    });

    Taro.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
      if (shoudReconnet) {
        Taro.connectSocket({
          url: HOST_WEBSOCKET
        });
      }

    });

    Taro.onSocketMessage(function (res) {
      console.log('===onSocketMessage===')
      console.log(res);
      var data = JSON.parse(res.data);
      // json数据转换成js对象
      // var data = eval("(" + res.data + ")");
      var type = data.type || '';
      switch (type) {
        // Events.php中返回的init类型的消息，将client_id发给后台进行uid绑定
        case 'ping':
          break;
        case 'init':
          // 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
          // wx.showToast({
          //   title: 'start',
          // })
          Taro.request({
            method: 'POST',
            data: {
              'orderno': routerinfo.orderno,
              'client_id': data.client_id
            },
            url: HOST_URL + 'callbackapi/bind/bind',
            header: {
              'Accept': 'application/json',
              'token': globalData.token
            },
            success: function (res) {
              console.log(res.data);
              if (!res.data){
                Taro.showToast({
                  title: 'websocket绑定失败',
                })
              }
            }
          })
          // $.post('./bind.php', { client_id: data.client_id }, function (data) { }, 'json');
          break;
        // 当mvc框架调用GatewayClient发消息时直接alert出来
        default:
          console.log('收到服务器内容：');
          var result = res;
          var par = JSON.parse(result.data);
          console.log(par);
          if (par.op == 'cart') {
            console.log('收到购物车信息');
            var goods = par.data;
            var weights = par.weights;
            var totalfee = par.totalfee;
            that.setState({
              totalfee: totalfee,
              cartgoods: goods
            });

          } else if (par.op == 'order') {
            console.log('收到关门订单');
            var orderstatus = par.orderstatus;
            if (orderstatus == 5 || orderstatus == 3 || orderstatus == 8) {//5已付款 3已取消 8已完成
              stopInterval();
              socketOpen = false;
              shoudReconnet = false;
              Taro.closeSocket();
              Taro.redirectTo({
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=weight'
              })
            } else if (orderstatus == 4) {//4待支付 说明免密接口请求成功 等待回调
              Taro.showLoading({
                title: '结算中...',
              })
              socketOpen = false;
              shoudReconnet = false;
              Taro.closeSocket();
              
            } else if (orderstatus == 6) {//6已欠费
              stopInterval();
              socketOpen = false;
              shoudReconnet = false;
              Taro.closeSocket();
              //拉起支付
              that.requestPay(routerinfo.orderid);
            } else {
              console.log("未知状态");
              console.log(result);
            }
          }
      }

    });
    
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
          <View className='shopDiv'>
            <Image className='shopImg' src={this.state.state1}/>
            <View className='shoptitle'>{this.state.cartTips1}</View>
            <View className='shopInfo'>小主！{systemUser}{this.state.cartTips2}</View>
            {/* <View className='toRight'>
            <Button className='toSever'>联系客服</Button>
            </View> */}
            
          
          </View>
          <View className='addr'>
                <Image className='addricon' src={this.state.icon1}/>
                <View className='addr1'>{this.state.machine.machinename}</View>
                <View className='addr2'>{this.state.machine.location}{this.state.machine.dailaddress}</View>
                <Button className='toSever1' onClick={this.goKefu}>联系客服</Button>
          </View>
          {this.state.promotions>0?
          <View className='promotionInfo'>本次购物会在结算时享受优惠活动，请关门后查看</View>
          :
          <View></View>
          }
          
          <View className='seDiv'>
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


