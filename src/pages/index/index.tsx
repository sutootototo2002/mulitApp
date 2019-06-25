
var intervalPapayTemp = 0;
var intervalOrderStatus;
var tsFeedback = '2099-12-31'; //时间界限
var tsWish = '2099-12-31'; //时间界限
var feedbacks = [];
var thumbups_;
var hasMore= false;
var machineid=''
var data = [];
var count = 0;
var timer = 0;
var timerList = [];
var intervalPapayTempArr = [];



import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView, Canvas, View, Image, CoverImage, Button, Text } from '@tarojs/components'

import { BASE_URL, globalData, PATH, systemUser } from '../../config/index.js';

import {login} from '../../utils/util.js';

var order = require("../../utils/order.js");

import location from '../../assets/images/location.png'

import wishImg from '../../assets/images/syxytb.png'

import juan from '../../assets/images/juan.png'

import flag from '../../assets/images/jgtb.png'

import './index.scss'

interface IState {
  showModalStatus: boolean,
  showopen: boolean,
  papayPressed: boolean,
  qrurl:string,
  showlogin:boolean,
  showpapay: boolean,
  isnopasspay:number,
  havearrears:number,
  formid:string,
  isweapp:boolean,
  latitude: number,
  longitude: number,
  scale: number,
  controls: Array<object>,
  isOpened: boolean,
  mapObj_: object,
  mapKey: string,
  showLocation: boolean,
  markers: Array<object>,
  allMarkers: Array<object>,
  menus: string,
  bool: boolean,
  booladdr:boolean,
  menuright: Array<object>
  screen: string,
  user: string,
  person: string,
  zm: string,
  dw: string,
  searchImg: string,
  token: string,
  commonCode: string,
  checkPapay: boolean,//是否开通免密
  posBoolean: boolean,
  markBoolean: boolean,
  unpayBoolean: boolean,
  machineBoolean: boolean,
  unpayImg: string,
  unpriceImg: string,
  payName: number,
  unpayList: Array<object>,
  tempImg: string,
  del: string,
  pos_: string,
  open: string,
  addr: string,
  mach: string,
  DensityFree: boolean,
  mm: string,
  HearBoolean: boolean,
  HearlistBoolean: boolean,
  HearHead: string,
  closebtn: string,
  heardImg: string,
  yyzh: string,
  dyzh: string,
  xydd: string,
  singinBoolean:boolean,
  singinImg:string,
  wzc10:string,
  wzc11:string,
  wzc20:string,
  wzc22:string,
  wzc30:string,
  wzc33:string,
  setp1:boolean,
  setp2:boolean,
  setp3:boolean,
  fee:boolean,
  befee:number,
  haslogin:boolean,
  zmdefault:string,
  thumbups:number,
  intervalPapay:object,
  unpayorder:Array<object>,
  cartTips:string,
  orderid:string,
  machineid:string,
  orderno:string
  recogmode:string,
  haveShopping:boolean,
  Carting:boolean,
  feedbackslist:Array<object>,
  markerDetail:Array<object>,
  avatar:string,
  clear:string,
  timerTem:string
}

export default class Index extends Component<{}, IState>{

  mapObj: Taro.MapContext;
  
  constructor(props: {} | undefined) {

    super(props)
    
    this.state = {
      showModalStatus: false,
      showopen: false,
      papayPressed: false,
      qrurl:"",
      showlogin:false,
      showpapay: false,
      isnopasspay: 0,
      havearrears: 0,
      formid:'',
      isweapp:false,
      mapKey: 'CFOBZ-IOJKX-TGG4T-ZZM75-EXWF2-OHFAP',
      latitude: 39.908823,
      longitude: 116.397470,
      scale: 16,
      menus: PATH + '/mImages/menus.png',
      screen: PATH + '/mImages/tytb-3.png',
      user: PATH + '/mImages/tytb-6.png',
      person: PATH + '/mImages/tytb-22.png',
      zm: PATH + '/mImages/zm2.png',
      avatar:'',
      zmdefault:PATH+'/mImages/zm2.png',
      searchImg: PATH + '/mImages/searchImg.png',
      dw: PATH + '/mImages/dw.png',
      unpayImg: PATH + '/mImages/wfk-11.png',
      unpriceImg: PATH + '/mImages/wfk.png',
      pos_: PATH + '/mImages/bg_0.png',
      tempImg: 'http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg',
      del: PATH + '/mImages/clear.png',
      open: PATH + '/mImages/yyz.png',
      addr: PATH + '/mImages/tytb-4.png',
      mach: PATH + '/mImages/tytb-1.png',
      mm: PATH + '/mImages/mm.png',
      HearHead: PATH + '/mImages/ysjtb1.png',
      closebtn: PATH + '/mImages/gban1.png',
      heardImg: PATH + '/mImages/fkz.png',
      yyzh: PATH + '/mImages/yyz_f.png',
      dyzh: PATH + '/mImages/dyz_f.png',
      xydd: PATH + '/mImages/xyd_img.png',
      singinImg:PATH+'/mImages/gban.png',
      wzc10:PATH+'/mImages/wzc-10.png',
      wzc11:PATH+'/mImages/wzc-11.png',
      wzc20:PATH+'/mImages/wzc-20.png',
      wzc22:PATH+'/mImages/wzc-22.png',
      wzc30:PATH+'/mImages/wzc-30.png',
      wzc33:PATH+'/mImages/wzc-33.png',
      clear:PATH+'/mImages/clear.png',
      setp1:true,
      setp2:false,
      setp3:false,
      controls: [],
      isOpened: false,
      mapObj_: {},
      showLocation: true,
      markers: [],
      allMarkers: [],
      bool: false, //menus是否显示
      booladdr:false,
      menuright: [],
      token: '',
      checkPapay: false, //是否开通免密
      commonCode: '', //公共授权临时code
      markBoolean: false,
      posBoolean: false,
      unpayBoolean: false,
      machineBoolean: false,
      DensityFree: false,
      HearBoolean: false,
      HearlistBoolean: false,
      singinBoolean:false,
      thumbups:0,//心愿列表
      fee:true,
      befee:0,
      payName: 0.00,
      unpayList: [],
      haslogin:false,
      intervalPapay:{},
      unpayorder:[],
      cartTips:'', //提示
      orderid:'',
      machineid:'',
      orderno:'',
      recogmode:'',
      haveShopping:false,
      Carting:false,
      feedbackslist:[],
      markerDetail:[],
      timerTem:"0"
    }
  }

  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(this.props, nextProps)
  }
  componentWillMount() {
    console.log('---onLoad---')
     if (Taro.getEnv() == "ALIPAY") {
        globalData.isweapp=false;
        //console.log('**支付宝端(isweapp为false)**'+globalData.isweapp)
        }
    if (Taro.getEnv() == "WEAPP") {
        globalData.isweapp=true;
        //console.log('**微信端(isweapp为true)**'+globalData.isweapp)
    }
    this.mapObj = Taro.createMapContext("mymap"); //获取地图控件
    var that = this;
    Taro.getSystemInfo({
    }).then((res: { windowWidth: number; windowHeight: number; }) => {
        Taro.setStorageSync("userInfo", res);
        data = Taro.getStorageSync('userInfo');
      }).catch((error)=>{
        console.log('请检查网络！'+error);
      })
    //请求授权位置
    this.ongetPost();
    //检查用户情况
    
  }
  componentDidHide () {
    order.stopInterval();
  }
  componentWillUnmount() {
    order.stopInterval();
  }
  
  componentDidShow() {
    console.log('---onshow---')
    var that = this;
    if(this.state.singinBoolean== true && this.state.setp1==false && this.state.setp2==true){
      Taro.showLoading({
        title: '免密开通中',
      })
      if (intervalPapayTemp) {
        clearInterval(intervalPapayTemp);
      }
      intervalPapayTemp = setInterval(function () {
        console.log('---循环执行代码 ---');
        that.checkPapay();
      }, 2000);
      intervalPapayTempArr.push(intervalPapayTemp);
      setTimeout(function () {
        Taro.hideLoading();
        Taro.reLaunch({
          url: '/pages/index/index',
        })
      }.bind(this), 6000);

    }else{
      setTimeout(() => {
        this.checkToken();
      }, 2000);
    }
  }

  //setp1 点击获取手机号码授权
  getPhoneNumber(e){
    console.log(e.detail.errMsg)
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      var that = this;
      Taro.login().then((res)=>{
         console.log(res)
         var code = res.code;  //获取code
         console.log('开始登录:' + code);
         function succeeded(res) {
          Taro.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 500
          })
          that.setState({
            showlogin: false, //登录
            showpapay: true,  //支付
            showopen: false,  //打开
            setp1:true,
            setp2:true
          });
          // that.gotoPapay();
        };
        function failed(res) {
          Taro.showToast({
            title: '登陆失败,请再按一下',
            icon: 'fail',
            duration: 500
          })
        };
         login(code, e.detail.encryptedData, e.detail.iv, succeeded, failed);

      }).catch((error)=>{
         console.log(error);
      })
    }

  }
  checkPapay() {
    var that = this;
    let data1 = Taro.getStorageSync('userInfo');
  
    Taro.request({
      url: BASE_URL + 'user/detail',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          var isnopasspay = res.data.data.isnopasspay;
          if (isnopasspay == "0") {
            that.setState({
              setp2:true
            })
          } else {
            that.setState({
              setp1:true,
              setp2:false,
              singinBoolean:false,
              bool:true,
              controls:[{
                id: 2,
                iconPath: wishImg,
                position: {
                  width: 100,
                  height:100,
                  left: data.windowWidth-90,
                  top: (data.windowHeight-115)/2
                },
                clickable: true
              }
              // {
              //   id: 3,
              //   iconPath:juan,
              //   position: {
              //     width: 80,
              //     height:80,
              //     left: data.windowWidth-80,
              //     top: (data.windowHeight-115)/2 +90
              //   },
              //   clickable: true
              // }
            ]

             
            })
            clearInterval(intervalPapayTemp)
            Taro.hideLoading();
          }
        }
      }
    })
  }
  //setp2 开通免密
  gotoPapay(){
    var that = this;
    Taro.request({
      method: 'POST',
      url: BASE_URL + 'pay/getPapayExtraData',
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token':globalData.token
      }
    }).then((res)=>{
       Taro.navigateToMiniProgram({
         appId:'wxbd687630cd02ce1d',
         path:'pages/index/index',
         extraData:{
          appid: res.data.appid,
          contract_code: res.data.contract_code,
          contract_display_account: res.data.contract_display_account,
          mch_id: res.data.mch_id,
          notify_url: res.data.notify_url,
          plan_id: res.data.plan_id,
          request_serial: res.data.request_serial,
          timestamp: res.data.timestamp,
          sign: res.data.sign
         }
       }).then((res)=>{
         that.getUserDetail();
        
       }).catch((error)=>{
         console.log(error);
        
       })
    }).catch((error)=>{
      console.log(error)
    })
  }

    //得到用户信心
    getUserDetail(){
      var that = this;
      Taro.showLoading({
        'title':''
      });
      Taro.request({
         url:BASE_URL+'user/detail',
         data: {},
         header: {
           'content-type': 'application/json',
           'token':globalData.token
         }
      }).then((res)=>{
         Taro.hideLoading();
         Taro.setStorageSync("userDetail", res);
         let data1 = Taro.getStorageSync('userInfo');
         if(res.data.code==200){
           globalData.haslogin = true;
           var $setp1 = true;
           var $setp2 = true;
           var $singinBoolean = true;
           var $fee = 0;
           var $markBoolean = true;
           var $avatarUrl = res.data.data.avatar;
           globalData.avatar = $avatarUrl;
           globalData.fee = res.data.data.fee;
           globalData.nickname = res.data.data.nickname;
           if(res.data.data.isnopasspay=="1"){
                  $singinBoolean = false;
                  $markBoolean = false;
                  var userid = res.data.data.userid;
                  if(userid){
                   that.fetchWishCount();
                  }
           }else{ 
                 $singinBoolean = true;
                 $markBoolean = true;
           }

           if(res.data.data.havearrears=="1"){
              that.getUnpayOrder()
           }else{
             console.log('没有未结订单！')
           }
          
           if(res.data.data.fee){
               $fee = res.data.data.fee;
           }
        
           this.setState({
             setp1:$setp1,
             setp2:$setp2,
             singinBoolean:$singinBoolean,
             markBoolean:$markBoolean,
             befee:$fee,
             bool:true,
             controls:[{
              id: 2,
              iconPath: wishImg,
              position: {
                width: 100,
                height:100,
                left: data.windowWidth-90,
                top: (data.windowHeight-115)/2
              },
              clickable: true
            }
            //,
            // {
            //   id: 3,
            //   iconPath:juan,
            //   position: {
            //     width: 80,
            //     height:80,
            //     left: data.windowWidth-80,
            //     top: (data.windowHeight-115)/2 +90
            //   },
            //   clickable: true
            // }
          ],
          zm:$avatarUrl!==null?$avatarUrl:this.state.zmdefault
           })
         }else{
           Taro.removeStorageSync('token');
           globalData.haslogin = false;
         }
         
      }).catch((error)=>{
        console.log(error)
      });
 
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
        if (res.data.code == 200) {
          
          Taro.setStorageSync("orderid", res.data.data.orderid);
          that.setState({
            unpayorder: res.data.data,
            singinBoolean:false,
            unpayBoolean:true,
            markBoolean:true       
          });
        } else {
           console.log('没有未支付订单！')
        }

      }
    })
  }
     // 提取心愿回复数
  fetchWishCount() {
    Taro.request({
      url: BASE_URL + 'wishlist/n',
      data: {
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: (res) => {
        console.log('thumbups:')
        console.log(res)
        this.setState({
          thumbups: res.data.data
        })
        thumbups_ =  res.data.data;
      },
      fail: (err) => {
        this.setState({
          thumbups: 0
        })
        thumbups_ = 0;
      }
    })
  }
  //setp3 去购物
  goshoping(){
    this.getUserDetail();
    let data = Taro.getStorageSync("userDetail");
    let data1 = Taro.getStorageSync('userInfo');
    var that = this;
    
    if(data.data.data.havearrears==0){
      that.setState({
        singinBoolean:false,
        markBoolean:false,
        bool:true,
        befee:data.data.data.fee,
        controls:[{
          id: 2,
          iconPath: wishImg,
          position: {
            width: 100,
            height:100,
            left: data.windowWidth-90,
            top: (data.windowHeight-115)/2
          },
          clickable: true
        }
        // ,
        // {
        //   id: 3,
        //   iconPath:juan,
        //   position: {
        //     width: 80,
        //     height:80,
        //     left: data.windowWidth-80,
        //     top: (data.windowHeight-115)/2 +90
        //   },
        //   clickable: true
        // }
      ]
      })
    }
    if(data.data.data.havearrears==1){
      that.setState({
        singinBoolean:false,
        markBoolean:false
      })
    }
  }

  onStored(){
    //储值
    Taro.navigateTo({
      url: '/pages/recharge/recharge?avatar=' + globalData.avatar + '&nickname=' + globalData.nickname+'&fee='+globalData.fee
    })
  }

  closeSingin(){
    this.setState({
      singinBoolean:false,
      markBoolean:false
    })
  }

  ongetUserInfo(){
    Taro.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          Taro.getUserInfo().then((res)=>{
            console.log('获取用户信息')
          }).catch((error)=>{
            console.log("用户没有授权");
            console.log(error);
          })
        }else{
          console.log('用户未授权')
            Taro.authorize({
              scope: 'scope.userInfo'
            }).then((res)=>{
              console.log('用户授权信息：');
              console.log(res);
            }).catch((error)=>{
              console.log('error')
            })
          
        }
      }
    })
  }
  setPost(){
    this.setState({
      markBoolean: true,
      posBoolean: true
    })
  }
  ongetPost() {
    let that = this;
    Taro.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            that.setPost();
        } else if (res.authSetting['scope.userLocation'] == undefined) {

          that.ongetLocation();

        }
        else {
          
          that.ongetLocation();
         
        }
      }
    })
  }
  //定位到中心点
  moveToCenter() {
    Taro.createMapContext("mymap").moveToLocation();
  }

  ongetLocation(){
    var that = this;
    Taro.getLocation({
      type: 'gcj02'    //wgs84 gcj02
     }).then((res)=>{
        console.log("获取用户定位：")
        console.log(res)
        const data = Taro.getStorageSync('userInfo');
        console.log(data);
        globalData.lastLon = res.latitude;
        globalData.longitude = res.longitude;
        console.log("latitude:"+globalData.lastLon)
        console.log("longitude:"+globalData.longitude)
        that.setState({
          latitude: res.latitude,
          longitude: res.longitude
         
        });
        console.log(that.mapObj);
        that.mapObj.moveToLocation();
        console.log("res.latitude,res.longitude");
        console.log(res.latitude,res.longitude);
        console.log('添加地图周围机柜信息')
        that.getNearbyMachines(res.latitude, res.longitude);
        //that.getNearbyMachines(res.latitude,res.longitude);
       
    }).catch((res)=>{
      console.log("获取用户定位失败111：")
      console.log(res) //请确定定位相关权限已开启
      //console.log(res.errCode)
      
      
      if(globalData.isweapp==true){
        that.setState({
          posBoolean: true,
          markBoolean:true
      })
      }else{
        Taro.showModal({
        title:'提示',
        content:'系统找不到您的位置！',
        cancelText: '取消',
        success:(res)=>{
          console.log(res);
          if (res.confirm) {
            console.log('用户点击确定时候：');

            that.onsub()
            
            } else {
            console.log('用户点击取消')
            return;
            }
        }
      })
      }
     
  })
}

  //设置定位关闭
  oncancel() {
    //调用用户信息
    const data = Taro.getStorageSync('userInfo');
    this.setState({
      controls: [
      {
        id: 2,
        iconPath: wishImg,
        position: {
          width: 100,
          height: 100,
          left: data.windowWidth - 90,
          top: (data.windowHeight - 115) / 2
        },
        clickable: true
      }
      // ,
      // {
      //   id: 3,
      //   iconPath: juan,
      //   position: {
      //     width: 80,
      //     height: 80,
      //     left: data.windowWidth - 80,
      //     top: (data.windowHeight - 115) / 2 + 90
      //   },
      //   clickable: true
      // }
      ]
    })
  }

  //验证token是否有效
  verifyToken() {
    console.log("********token是否有效********")
    Taro.request({
      url: BASE_URL + 'token/verifyToken',
      data: {
        'token': globalData.token
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res => console.log(res.data))
  }
  //1支付宝获取授权code临时码
  myGetAuthCode() {
    var that = this;
    my.getAuthCode({
      scopes: ['auth_user'],
      success: (res) => {
        console.log("支付宝code临时码")
        console.log(res)
        console.log(res.authCode)
        that.setState({
          commonCode: res.authCode
        })
        //console.log(that.state.commonCode)
      }
    });
  }
  //2微信获取授权code临时码
  wxGetAuthCode() {
    var that = this;
    Taro.login().then(res => {
      console.log("小程序code临时码")
      console.log(res.code)
      that.setState({
        commonCode: res.code
      })
      //console.log(that.state.commonCode)
    })
  }
  //检查用户是否登录
  checkLogin() {

    //判断端（支付宝/微信）
    if (Taro.getEnv() == "ALIPAY") {
      this.myGetAuthCode();
      return;
    }
    if (Taro.getEnv() == "WEAPP") {
      this.wxGetAuthCode();
      return;
    }


  }
  //获取小程序token值
  checkToken() {
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.getStorage({
      key: 'token'
    }).then((res)=>{
      console.log(res);
      Taro.hideLoading();
      var token = res.data;
      console.log('token');
      console.log(token);
      if (token == null || token == '' || token == 'undefined') {
        console.log('*********不存在token*尝试自动登录**********')
        that.checkUser();
      } else {
        console.log('*********存在token:检查登录是否有效***********');
        Taro.request({
          url:BASE_URL + 'token/verifyToken',
          data: {
            'token': token
          },
          header: {
            'content-type': 'application/json',
            'token': token
          }
        }).then((res)=>{
         
          //判断token是否有效
          if (res.data.code == 200) {
            console.log('-----token 有效----');
            globalData.token = token;
            that.getUserDetail();
            that.checkShopping();
          }else if(res.data.code == 215){
            console.log('-----token 无效----');
            Taro.removeStorageSync('token');
            Taro.removeStorageSync('userInfo');
            that.checkUser();
          }
        }).catch((err)=>{
          console.log('*********不存在token***********2')
          that.checkUser();
        })
      }
    }).catch((error)=>{
      Taro.hideLoading();
      console.log('*********不存在token***********清除')
      console.log(error);
      that.checkUser();
    })
  }

  //更新用户心思
  updateuserinfo(){
    //更新用户信息
  }
  //检查是否购买过商品
  checkShopping(){
    var that = this;
    order.shoppingorder(function successed(result) {
      // 如果有购物中订单，设置页面状态，并开启轮询
      var orderid = result.orderid;
      var machineid = result.machineid;
      var orderno = result.orderno;
      var recogmode = result.recogmode;

      Taro.setStorageSync('goodsResult',result)
      that.setState({
        cartTips: '您有一张订单正在购物中',
        orderid: orderid,
        machineid: machineid,
        orderno: orderno,
        recogmode: recogmode,
        haveShopping: true
      });
      order.startqueryorderstatus(orderid, function succeeded(res) {
          console.log('res:订单数据');
          console.log(res);
          var orderstatus = res.data.data.orderstatus;
          var doorstatus = res.data.data.doorstatus;

          if(res.data.code == 200){
            
            if (orderstatus == "5" || orderstatus == "3" || orderstatus == "7"|| orderstatus == "8" || orderstatus == "9") { //5已付款 3已取消 8已完成 9 错误
                console.log('------执行这里-----------')  
                order.stopInterval();
                 setTimeout(() => {
                    Taro.redirectTo({
                    url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderid+"&whereis=all"
                  })
                 }, 3000);
                
              }else if(orderstatus == "6"){
                  order.stopInterval();
                  that.requestPay(orderid);
              }else{
                console.log('------苏晓燕1111111您有一张订单正在结算中-----')
                that.setState({
                  cartTips: '您有一张订单正在结算中',
                  Carting:true,
                  bool:false,
                  markBoolean:true,
                  haveShopping: true
                });
              }
          
          }
        });
    });
  }

  //购物中订单
  gotoCart(e){
    console.log("e.currentTarget.dataset:");
    console.log(e.currentTarget.dataset);
    var that = this;
    var orderid = e.currentTarget.dataset.orderid;
    var machineid = e.currentTarget.dataset.machineid;
    var orderno = e.currentTarget.dataset.orderno;
    var recogmode = e.currentTarget.dataset.recogmode;
    console.log("orderid: "+ orderid)
    if (recogmode == 3) { //重力柜
      Taro.setStorageSync("orderid", orderid);
      Taro.redirectTo({
        url: '/pages/index/shopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno + '&from=index'
      })
    } else {
      Taro.setStorageSync("orderid", orderid);
      Taro.redirectTo({
        url: '/pages/index/cgshopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno
      })
    }
  }
  //发起支付
  requestPay(orderid){
    var that = this;
    Taro.showLoading({
      title: '',
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
        'token': globalData.token
      },
      success: function (res) {
        Taro.hideLoading();
        if (res.data.code == 200) {
          Taro.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
            'success': function (res) {
              console.log('success', res);
              that.queryPayStatus(orderid);
            },
            'fail': function (res) {
              console.log('fail', res);
              //edit at 0606
              Taro.showModal({
                title: '提示',
                content: '支付失败，请重新支付',
                showCancel: false,
                success: function (res) {
                  // if (res.confirm) {
                  //   that.updatePayStatus(0, orderid);
                  //   that.getUnpayOrder();
                  // }
                }
              })
            }
          })
        } else {
          Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }


      }
    })
  }
  //支付接口
  queryPayStatus(orderid) {
    var that = this;
    Taro.showLoading({
      title: '等待支付结果...',
    });
    //查询订单状态
    intervalOrderStatus = setInterval(function () {
      Taro.request({
        method: 'POST',
        data: {
          'orderid': orderid
        },

        url: BASE_URL + 'order/paystatus',
        header: {
          'Accept': 'application/json',
          'token': globalData.token
        },
        success: function (res) {
          console.log(res.data.data);
          if (res.data.data.orderstatus == 5) {
            console.log('----payed---');
            clearInterval(intervalOrderStatus)
            Taro.hideLoading();
            that.setState({
              unpayBoolean:false,
              singinBoolean:true,
              markBoolean:true,
            });
            that.getUserDetail();
            
          } else {

          }
        }
      })

    }, 2000); //循环时间2秒
  }
  //检查用户是否登录
  checkUser(){
     var that = this;
     Taro.login().then((res)=>{
       console.log('得到code');
       var code = res.code;
       console.log(code);
       Taro.request({
         url:BASE_URL+'token/checkUser',
         data:{
            'code':code
         },
         header: {
          'content-type': 'application/json',
          'token': globalData.token
        },
        method:'GET'
       }).then((res)=>{
          
          console.log(res);
          if(res.data.code==200){
            console.log('服务器登录成功');
            Taro.setStorage({
              key: "token",
              data: res.data.data
            })
            globalData.token = res.data.data;
            globalData.haslogin = true;
            that.setState({
              setp1:true,
              setp2:true
            })
            console.log('globalData.token');
            console.log(globalData.token);
            console.log('检查用户是否已经注册过：用户存在')
            that.getUserDetail();

          }else if(res.data.code == 216){
            console.log('检查用户是否已经注册过：用户不存在')
            console.log('页面停留在登录界面第一步');
            that.setState({
              singinBoolean:true,
              markBoolean:true,
              setp1:true,
              setp2:false
              
            })
          }
          

       }).catch((error)=>{
        console.log("得到code错误信息");
          console.log(error);
       })
     })
  }
  //获取机柜的经纬度坐标，必须获取token才可以拿到
 
getNearbyMachines(latitude: Number, longitude: Number) {
    //throw new Error("Method not implemented.");
    if (latitude == 0 && longitude == 0) {
      return;
    }
    var that = this;
    Taro.request({
      url: BASE_URL + 'machine/nearbymachines',
      data: {
        lon: longitude,
        lat: latitude,
        distance: 1000
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token':globalData.token
      },
      success: function (res) {
        console.log('附近获取机柜信息：');
        console.log(res.data);
        let data1 = Taro.getStorageSync('userInfo');
        var markers = [];

        const temps =res.data.data;

        markers = temps.map((item,index)=>{
          item.iconPath = flag;
          item.width = 50;
          item.height= 50;
          item.latitude = res.data.data[index].lat;
          item.longitude = res.data.data[index].lon;
          item.id = res.data.data[index].machineid;
          return item;
        })

        console.log('markers:')
        console.log(markers);
        // for (var i = 0; i < res.data.data.length; i++) {
        //   var marker:object = {};
        //   marker.iconPath = "../../assets/images/jgtb.png";
        //   marker.id = res.data.data[i].machineid;
        //   marker.width = 40;
        //   marker.height = 40;
        //   marker.latitude = res.data.data[i].lat;
        //   marker.longitude = res.data.data[i].lon;
        //   markers.push(marker);
        // }
        that.setState({
          markers: markers,
          allMarkers: res.data.data
        });
      }
    })
  }
  //确定按钮
  onsub() {
    //选择定位地点
    console.log('选择定位地点');
    var that = this;
    Taro.openSetting({
      success:(data)=>{
        console.log(data);
        if (data.authSetting["scope.userLocation"] == true) {
          Taro.showToast({
            title: '授权成功',
            icon: 'success',
            duration: 5000
          })
          //再次授权，调用getLocationt的API
          that.ongetLocation();
        }else{
          Taro.showToast({
            title: '授权失败',
            icon: 'success',
            duration: 5000
          })
        }
      }
    })
  }
 
  onconcel() {
    console.log('取消操作')
  }
  onControlTap(e: { controlId: any; }) {
    //点击地图菜单项，点击那个就返回哪个的controlId
    console.log(e.controlId)
    if (e.controlId == 2) {
      //开启心愿单
      
      this.onHeard();
    }


  }
  onHeard = () => {
    console.log('心愿单开启');
    
    this.wishBranch();

  }
  //心愿单页面跳转
  myWishList() {
    this.hideFeedbackAndThumbups();
    console.log("latitude:"+globalData.lastLon)
    console.log("longitude:"+globalData.longitude)
    Taro.navigateTo({
      url: `../wish/likes/myheart?avatar=${globalData.avatarUrl}&lon=${globalData.lastLon}&lat=${globalData.longitude}`,
    })
  }
  //重置
  resetWishParam() {
    tsFeedback = '2099-12-31';
    tsWish = '2099-12-31';
    feedbacks = [];
  }
  //隐藏心愿面板
  hideFeedbackAndThumbups() {
    this.setState({
      HearlistBoolean: false
    })
  }
  //判断是否有回复，如果没有就跳入心愿单页面
  wishBranch() {
    if (thumbups_== 0) {
      this.myWishList();
    } else if (thumbups_ > 0) {
      this.resetWishParam();
      this.showFeedbackAndThumbups();
    } else {
      // TODO
      this.resetWishParam();
      this.showFeedbackAndThumbups();
    }
  }

  //得到心愿回复
  showFeedbackAndThumbups() {
    Taro.showLoading({
      title: '',
    });

    Taro.request({
      url: BASE_URL + 'wishlist/getWishAndFeedBack',
      data: {
        // userid: this.data.userid,
        pageSize: 10,
        tsFeedback: tsFeedback,
        tsWish: tsWish,
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: (res) => {
        console.log('getWishAndFeedBack:')
        console.log(res.data.rows)
        var rows = res.data.rows;
        this.updateWishTimeStamp(rows);
        this.addRows(rows);
        Taro.hideLoading();
        this.setState({
          machineBoolean:false,
          HearlistBoolean: true,
          feedbackslist:feedbacks 
        })
        //feedbacks = this.data.feedbacks
        hasMore = res.data.hasMore
        
      },
      fail: (err) => {
        Taro.hideLoading();
        Taro.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      }
    });
  }
  addRows(rows) {
    for(var i=0; i<rows.length; i++) {
      if(rows[i].type=='f') {
        feedbacks.splice(0, 0, rows[i]);
      } else {
        feedbacks.push(rows[i]);
      }
    }
    console.log("feedbacks:")
    console.log(feedbacks)
  }
  updateWishTimeStamp(rows) {
    
    tsFeedback = rows.map((item,index)=>{
      if(item.type == 'f'){
        return item.ts
      }
    })
    tsWish = rows.map((item,index)=>{
      if(item.type !== 'f'){
        return item.ts
      }
    })

    console.log('tsFeedback:'+tsFeedback)
    console.log('tsWish:'+tsWish)
  }

  onInfo = (e) => {
    e.stopPropagation();
    console.log('onInfo')
  }
  //关闭定位
  onClosePos = (e) => {
    //关闭
    e.stopPropagation();
    console.log(e);
    console.log('onInfo1111')
    this.setState({
      markBoolean: false,
      posBoolean: false
    })
    this.onsub();
  }
  onRight() {
    console.log('微信客服')
    Taro.navigateTo({
      url: '/pages/service/service'
    })
  }
  gohome() {
    console.log('首页')
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  ongotopersonal(){
    Taro.navigateTo({
      url: '/pages/personal/index'
    })
  }
  //去登陆
  ongotologin(){
    Taro.navigateTo({
      url: '/pages/personal/index'
    })
  }
  onLeft() {
    console.log('个人中心')
    this.ongotologin();
  }
  paytipsmodal(currentStatu) {
    //关闭  
    // if (currentStatu == "close") {
    //   this.setData({
    //     showPayModalStatus: false
    //   });
    // }

    // 显示  
    // if (currentStatu == "open") {
    //   this.setData({
    //     showPayModalStatus: true
    //   });
    // }
  }
  requestOpen(qrurl){
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/requestopen',
      data: {
        qrurl: qrurl
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        Taro.hideLoading();
        //检测是否可以开门
        console.log("检测是否可以开门")
        console.log(res)

        if (res.data.code == 200) {
          var machineid = res.data.data.machineid;
          var lockid = res.data.data.lockid;

          Taro.reLaunch({
            url: '../box/open/open?machineid=' + machineid + '&lockid=' + lockid + '&formid='
          })

        } else {
          Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.gohome();
              }
            }
          })
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
  onScreen() {
    console.log('扫码开门')
    //未支付订单判断还没有写
    var that = this;
    Taro.showLoading({
      title: '',
    });
    
    Taro.request({
      url: BASE_URL + 'device/checkscan',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'token':globalData.token
      },
      method: "POST"
    }).then((res)=>{
       console.log("扫码是否成功：")
       console.log(res)
       Taro.hideLoading();
       if(res.data.code==200){
         //扫码二维码
          Taro.scanCode().then((res)=>{
              //扫码二维码结果
              console.log(res)
              console.log(res.result)
              that.requestOpen(res.result);
          }).catch((res)=>{
             console.log(res);
          })
       }
       if(res.data.code==201){ 
          console.log('您有未结订单')
          Taro.showToast({
            title: '您有未结订单',
            icon: 'fail',
            duration: 2000
          })
          that.setState({
            cartTips: '您有一张订单正在结算中',
            Carting:true,
            bool:false,
            markBoolean:true,
            haveShopping: true
          });
          that.gohome();
       }
       if(res.data.code==202){ 
        console.log('您的帐号异常，请与客服联系！')
        Taro.showToast({
          title: '您的帐号异常！',
          icon: 'fail',
          duration: 2000
        })
        

      }
      if(res.data.code==205){ 
        console.log('用户未登录')
        Taro.showToast({
          title: '用户未登录',
          icon: 'fail',
          duration: 2000
        })
        //that.gohome();
      }
      if(res.data.code==206){ 
         
        console.log('请开通免密')
        Taro.showToast({
          title: '请开通免密',
          icon: 'fail',
          duration: 2000
        })
        //that.gohome();
          
      }

    })

  }
  // onMM() {
  //   console.log('开启免密')
  // }
  onCloseHeard() {
    console.log('关闭心愿单')
    this.setState({
      HearBoolean: false,
      markBoolean: false
    })
  }
  onCloseHeardlist() {
    console.log('关闭心愿单列表')
    this.setState({
      HearlistBoolean: false,
      markBoolean: false,
    })
  }
  onSetheart() {
    console.log('进入心愿单中心');
    Taro.navigateTo({
      url: '/pages/wish/likes/myheart'
    })
  }
  onPay() {
    console.log('订单明细页面')
    Taro.navigateTo({
      url: '/pages/orders/index'
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
  gotoCartFn(){
    var result = Taro.getStorageSync('goodsResult');
    var orderid = result.orderid;
    var machineid = result.machineid;
    var orderno = result.orderno;
    var recogmode = result.recogmode;
    this.gotoCart(orderid,machineid,orderno,recogmode);
  }
  closeCarting(){
    this.setState({
      Carting: false,
      markBoolean: false
    })
    
  }
  regionchange(e){
    console.log('e:'+e);
    console.log(e);
    var that = this;
    that.setState({
      machineBoolean:false
    })
   
    if (e.type == 'end') {
      if (this.mapContext) {
        this.mapContext.getCenterLocation({
          success: function (res) {
            // that.setData({
            //   latitude: res.latitude,
            //   longitude: res.longitude
            // });
            console.log('------');
           
            that.getNearbyMachines(res.latitude, res.longitude);
           
          }
        })
      }

    }

  }
  markertap(e){

    var that = this;
    var curmachineid = '';
    for (var i = 0; i < this.state.markers.length; i++) {
      if (e.markerId == this.state.markers[i].id) {
        curmachineid = this.state.allMarkers[i].machineid;
      }

    }
    if (curmachineid != '') {
      Taro.getLocation({
        type: 'wgs84',
        success: function (res) {
          let latitude = res.latitude
          let longitude = res.longitude
          Taro.request({
            url: BASE_URL + 'machine/indexmachinedetail',
            data: {
              lon: longitude,
              lat: latitude,
              machineid: curmachineid
            },
            header: {
              'content-type': 'application/json',
              'token':globalData.token
            },
            success: function (res) {
              // that.showBottomModal();
              console.log('res:')
              console.log(res)
              that.setState({
                markerDetail: res.data.data,
                machineBoolean:true

              });
              machineid = res.data.data.machineid;
            }
          })
        },
        fail: function (res) {
          Taro.openSetting({
            //重新请求获取定位
            success: (res) => {
              if (res.authSetting["scope.userLocation"]) {

              }
            }
          })
        },
      })


    }

  }
  hideModal(){
    // this.setState({
    //   machineBoolean: false
    // })
    Taro.navigateTo({
      url: `../box/boxdetail/boxdetail?machineid=${machineid}`
    })
  }

  topersonfn(){
    console.log('个人主页')
    Taro.navigateTo({
      url: '/pages/personal/index'
    })
  }

  render() {
    const { unpayList,feedbackslist,markerDetail } = this.state;
    const markerDiv = markerDetail.categorys.map((item,index)=>{
         return (
          <CoverView className='goodli'>
          <CoverImage className='goodImg' src={item.iconurl} />
          <CoverView className='goodsName'>{item.categoryname}</CoverView>
        </CoverView>
         )
    })
    const contentList = unpayList.map((item) => {
      return (
        <CoverView className='clist'>
          <CoverView className='canme'>{item.name}</CoverView>
          <CoverView className='ctime'>{item.time}</CoverView>
          {
            item.goods.map((item_) => {
              return (
                <CoverView className="goods">
                  <CoverImage className='gImg' src={item_.url} />
                  <CoverView className='gName'>{item_.goodsname}</CoverView>
                </CoverView>
              )
            })
          }


        </CoverView>
      )
    })

    const heartList = feedbackslist.map((item,index)=>{
      return (
       
                <CoverView className='hearLi'>
                  <CoverImage className='userInfo' src={this.state.zm} />
                  <CoverView className='CVFloat'>
                    {item.type=='f'?
                     <CoverView className='cvtitle'>商户{item.party} 回复了您的心愿</CoverView>
                     :
                     <CoverView className='cvtitle'>用户{item.party} 回复了您的心愿</CoverView>
                    }
                   {item.type=='f'?
                    <CoverView className='cvcallback'>回复心愿：{item.wish}</CoverView>
                    :
                    <CoverView className='cvcallback'>点赞心愿：{item.wish}</CoverView>
                  }
                    {/* <CoverView className='checkInfo'>查看消息</CoverView> */}
                  </CoverView>
                </CoverView>              
              
      )
    })


    return (
      <View>
        {/* <Canvas className='canvas'/> */}
        <Map className='mb-map' id='mymap'  show-location={this.state.showLocation} latitude={this.state.latitude} longitude={this.state.longitude} scale={this.state.scale} markers={this.state.markers} controls={this.state.controls} onControlTap={this.onControlTap} onmarkertap={this.markertap} onregionchange={this.regionchange}/>
        <CoverView className='menus_avator'>
          <CoverImage className='menus_user' onTouchStart={this.topersonfn}  src={this.state.zm} />
          {this.state.befee>0?
          <CoverView className='fee' onClick={this.onStored}>当前余额:{this.state.befee/100}元</CoverView>
          :
          <CoverView className='fee' onClick={this.onStored}>储值有优惠</CoverView>
          }

        </CoverView>

        {/* 遮罩层 */}
        {this.state.markBoolean ?
          <CoverView className='mark'></CoverView>
          :
          <CoverView></CoverView>}

          {/* 未注册 */}
          {this.state.singinBoolean?
          <CoverView className='singin'>
             {/* <CoverImage className='singinImg' onTouchStart={this.closeSingin} src={this.state.singinImg}/> */}
             <CoverView className='singDiv'>
               <CoverView className='wzcDiv'>
                {this.state.setp1?
                <CoverImage className='wzc10' src={this.state.wzc11}/>
                :
                <CoverImage className='wzc10' src={this.state.wzc10}/>
                }
                  {this.state.setp2 ?
                <CoverImage className='wzc10' src={this.state.wzc33}/>
                :
                <CoverImage className='wzc10' src={this.state.wzc30}/>
                }
                   
               </CoverView>
             <CoverView className='sinfo'>亲！{systemUser}恭候您多时啦...</CoverView>
             {this.state.setp1 && 
             <Button className='singBtn' open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber.bind(this)} >我去注册</Button>
             }
              {this.state.setp2 && 
             <Button className='singBtn' onClick={this.gotoPapay} >我去免密</Button>
              //  <Button className='singBtn' onClick={this.gotopayfen} >开通支付分</Button>
             }
             
             </CoverView>
             
          </CoverView>
          :
          <CoverView></CoverView>
          }

           {/*购物中订单 */}
        {this.state.haveShopping?
          <CoverView className='boxInfo' onClick={this.onInfo}>
            <CoverImage className='posImg' src={this.state.dw} />
            <CoverView className='info'>亲！您有一张购物中订单</CoverView>
            <CoverView className='btnOpen' data-orderid='{{orderid}}' data-machineid='{{machineid}}' data-orderno='{{orderno}}' data-recogmode='{{recogmode}}' onClick={this.gotoCart}>打开订单</CoverView>
            
          </CoverView>
          :
          <CoverView></CoverView>}

        {/* 打开定位权限 */}

        {this.state.posBoolean?
          <CoverView className='boxInfo' onClick={this.onInfo}>
            <CoverImage className='posImg' src={this.state.dw} />
            <CoverView className='info'>亲！{systemUser}找不到您的位置...</CoverView>
            <CoverView className='btnOpen' onClick={this.onClosePos}>打开定位权限</CoverView>
            
          </CoverView>
          :
          <CoverView></CoverView>}

        {/*未付订单*/}
        {this.state.unpayBoolean ?
          <CoverView className='unpayOrder'>

            <CoverImage src={this.state.unpayImg} />
            <CoverImage className='unprice' src={this.state.unpriceImg} />
            <CoverView className='textOne'>本次</CoverView>
            <CoverView className='textTwo'>应付款(元)</CoverView>
            <CoverView className='textPrice'>{(this.state.unpayorder.payfee/100).toFixed(2)}</CoverView>
            <CoverView className='textshi'>Wa!  这里有未付订单！</CoverView>
            <CoverView className='unpayList'>
              <CoverView className='orderList'>
                <CoverView className='orderInfo'>
                  <CoverView className='goodstate'>订单号：[{this.state.unpayorder.orderno}]</CoverView>
                  <CoverView className='time'>{this.state.unpayorder.createtime}</CoverView>
                </CoverView>
                <CoverImage className='goodsImg' src={this.state.unpayorder.goods[0].picurl} />
                <CoverView className='goodsInfos'>
                  <CoverView>
                    <CoverImage className='del' src={this.state.del} />
                    <CoverView className='total'>共{this.state.unpayorder.goodsnum}件商品</CoverView>
                  </CoverView>
                  <CoverView className='goodsInfoDetail'>
                  [{this.state.unpayorder.goods[0].goodsname}等...] {this.state.unpayorder.goods[0].location}
                   </CoverView>
                </CoverView>
              </CoverView>
              <Button className='BtnOne' type='default' onClick={this.payOrder}>支付</Button>
            </CoverView>

          </CoverView>
          :
          <CoverView></CoverView>}

        {/* //免密提示框 */}
        {this.state.DensityFree ?
          <CoverView className='desityFree'>
            <CoverImage className='mmImg' src={this.state.mm} />
            <CoverView className='mmText'>无需输入支付密码，快速购物！</CoverView>
            <Button className='BtnTwo' onClick={this.gotoPapay}>开启免密 愉快购物</Button>
          </CoverView>
          :
          <CoverView></CoverView>
        }
        {this.state.bool && this.state.thumbups>0?
         <CoverView className='thumbups'>{this.state.thumbups}</CoverView>
         :
         ''
        }
         {/* //购物中订单 */}
         {this.state.Carting?
          <CoverView className='desityFree'>
             {/* <CoverImage src={this.state.closebtn} onTouchStart={this.closeCarting} className='closeBtn' /> */}
            <CoverImage className='mmImg' src={this.state.mm} />
            <CoverView className='mmText'>{this.state.cartTips}</CoverView>
            <Button className='BtnTwo' onClick={this.gotoCartFn}>查看详情</Button>
          </CoverView>
          :
          <CoverView></CoverView>
        }
        {this.state.bool && this.state.thumbups>0?
         <CoverView className='thumbups'>{this.state.thumbups}</CoverView>
         :
         ''
        }
        {/* 心愿单提示框 */}
        {this.state.HearlistBoolean ?
          <CoverView className='HearDiv1'>
            <CoverImage src={this.state.xydd} />
            <CoverImage src={this.state.closebtn} onTouchStart={this.onCloseHeardlist} className='closeBtn' />
            <CoverView className='myhear' onTouchStart={this.onSetheart} hoverStartTime={10}></CoverView>
            <CoverView className='bgColor'>
            <CoverView className='hearList'>
              {heartList}
              </CoverView>
            </CoverView>
          </CoverView>
          :
          <CoverView></CoverView>
        }


        {/* //点击出现位置 */}
           {this.state.bool ?
          <CoverView className='menus'>
            <CoverImage className='menusImg' src={this.state.menus} />
            <CoverImage className='menuscreen' onClick={this.onScreen} src={this.state.screen} />
            <CoverImage className='menusBtnRight' onClick={this.onRight} src={this.state.user} />
            <CoverImage className='menusBtnLeft' onClick={this.onLeft} src={this.state.person} />
            {/* <CoverView className='menu_user'>{this.state.commonCode}</CoverView> */}
          </CoverView>
          :
          <CoverView></CoverView>}

           {/*机柜信息 */}
           {this.state.machineBoolean ?
              <CoverView className='machineInfo' onClick={this.hideModal}>
                <CoverImage className='pos_' src={this.state.pos_} />
                <CoverImage className='openImg' src={this.state.open} />
                <CoverView className='addrDiv'>
                  <CoverImage className='addr' src={this.state.mach} />
                  <CoverView className='address'>{markerDetail.machinename}</CoverView>
                </CoverView>
                <CoverView className='addrDiv_'>
                  <CoverImage className='addr_' src={this.state.addr} />
                  <CoverView className='address_'>地址：{markerDetail.location} {markerDetail.dailaddress}</CoverView>
                  <CoverView className='dist' style='clear:both'>距您步行{markerDetail.distance}km</CoverView>
                  <CoverView className='goodType'>
                    {markerDiv}
                   
                  </CoverView>
                  <CoverView className='zhanweifu'></CoverView>
                </CoverView>

              </CoverView>
              :
              <CoverView></CoverView>
            }
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
