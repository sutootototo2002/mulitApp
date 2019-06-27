<<<<<<< HEAD
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// var socketOpen = false;
// var shoudReconnet = false;
// var socketMsgQueue = [];
var intervalRefresh;
var intervalOrder;
var intervalOrderStatus;
var timer = 0;
var timerList = [];
var count = 0;

//import {} from '../../../utils/util.js';
var order = require("../../../utils/order.js");

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && poprocess.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

<<<<<<< HEAD
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cartgoods", "systemUser", "formid", "lockid", "machineid", "machine", "shelfs", "orderno", "orderid", "openfailed", "state1", "icon1", "socketMsgQueue", "socketOpen", "totalfee", "promotions", "cartTips1", "cartTips2", "needRequestOrder", "isRefreshingOrder"], _this.config = {
=======
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cartgoods", "formid", "lockid", "machineid", "machine", "shelfs", "orderno", "orderid", "openfailed", "state1", "icon1", "socketMsgQueue", "socketOpen", "totalfee", "promotions", "cartTips1", "cartTips2", "needRequestOrder", "isRefreshingOrder"], _this.config = {
>>>>>>> 0309acd... 微信小程序免密版--心愿单
      navigationBarTitleText: ''
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        formid: '',
        lockid: '',
        machineid: '',
        machine: {},
        shelfs: {},
        orderno: '',
        orderid: '',
        openfailed: false,
        state1: _index3.PATH + '/mImages/shopping.png',
        icon1: _index3.PATH + '/mImages/fkz.png',
        socketMsgQueue: [],
        socketOpen: false,
        totalfee: 0,
        cartgoods: [],
        promotions: 0,
<<<<<<< HEAD
        cartTips1: '正在购物中...',
        cartTips2: '请在取出商品后关闭柜门',
=======
        cartTips1: '正在购物中',
        cartTips2: '小主,拿到满意商品后,要关门哦！',
>>>>>>> 0309acd... 微信小程序免密版--心愿单
        needRequestOrder: false,
        isRefreshingOrder: false
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      _index2.default.setNavigationBarTitle({
        title: _index3.globalData.sysTitle
      });
      console.log('视频柜数据');
      console.log(this.$router.params);
      var machineid = this.$router.params.machineid;
      var orderid = this.$router.params.orderid;
      var orderno = this.$router.params.orderno;
      var that = this;
      this.setState({
        machineid: machineid,
        orderid: orderid,
        orderno: orderno
      });
      _index2.default.setStorageSync("routerinfo", this.$router.params);
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      //机柜详细信息
      this.getMachineDetail();
      this.getPromotions(routerinfo.machineid);
      //
      console.log("*******onLoad*******");
      var that = this;
      //查询订单状态
      if (routerinfo.orderid == null || routerinfo.orderid == 'undefined') {
        console.log("options.orderid为空");
        var orderid_ = _index2.default.getStorageSync('orderid');
        that.setState({
          orderid: orderid
        });
      }
      console.log("*******orderid*******" + routerinfo.orderid);
      var orderid_ = routerinfo.orderid;
      order.startqueryorderstatus(orderid, function succeeded(res) {
        console.log('-----orderstatus-----');
        console.log(res);
        var orderstatus = res.data.data.orderstatus;
        var doorstatus = res.data.data.doorstatus;
        if (res.data.code == 200) {
          if (orderstatus == "5" || orderstatus == "3" || orderstatus == "7" || orderstatus == "8" || orderstatus == "9") {
            //5已付款 3已取消 8已完成 9 错误
            console.log('---走这里---');
            order.stopInterval();
            setTimeout(function () {
              _index2.default.redirectTo({
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderid + '&whereis=cgshop'
              });
            }, 2000);
          } else if (orderstatus == "6") {
            //6已欠费
            order.stopInterval();
            //拉起支付
            that.requestPay(routerinfo.orderid);
          } else {
            that.setState({
<<<<<<< HEAD
              cartTips1: '柜门已关闭，订单正在结算中',
              cartTips2: '稍后给您推送结算账单'
=======
              cartTips1: '正在购物中',
              cartTips2: '小主,' + _index3.systemUser + '正在快速核算订单,请耐心等候哦！'
>>>>>>> 0309acd... 微信小程序免密版--心愿单
            });
          }
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {
      order.stopInterval();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      order.stopInterval();
    }
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
    // 在 App 类中的 render() 函数没有实际作用
    //获取促销商品

  }, {
    key: "tapRefresh",
    value: function tapRefresh() {
      order.stopInterval();
      _index2.default.redirectTo({
        url: '/pages/index/index'
      });
    }
  }, {
    key: "getPromotions",
    value: function getPromotions(machineid) {
      //console.log('aaa')
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'promotion/machine',
        data: {
          machineid: machineid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          _index2.default.hideLoading();
          //检测是否可以开门
          if (res.data.code == 200) {
            var promotions = res.data.data;
            console.log("promotions:success");
            console.log(promotions);
            that.setState({
              promotions: promotions.length
            });
          } else {
            console.log("promotions:fail");
            console.log(res.data.code);
            console.log(res);
          }
        },
        fail: function fail(e) {
          _index2.default.showToast({
            title: '请求失败',
            icon: 'fail',
            duration: 2000
          });
        }
      });
    }
    // 请勿修改此函数

  }, {
    key: "getMachineDetail",
    value: function getMachineDetail() {
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'machine/machinedetail',
        data: {
          machineid: routerinfo.machineid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('machine:');
          console.log(res.data.data);
          that.setState({
            machine: res.data.data
          });
        }
      });
    }
    //转到客服

  }, {
    key: "goKefu",
    value: function goKefu() {
      console.log('微信客服');
      _index2.default.navigateTo({
        url: '/pages/service/service'
      });
    }
    //获取机柜货台布局

  }, {
    key: "getShelfs",
    value: function getShelfs() {
      var that = this;
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      _index2.default.request({
        url: _index3.BASE_URL + 'machine/shelfs',
        data: {
          machineid: routerinfo.machineid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log(res);
          console.log(res.data.data);
          that.setState({
            shelfs: res.data.data
          });
        }
      });
    }
    //

  }, {
    key: "requestPay",
    value: function requestPay(orderid) {
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      var that = this;
      _index2.default.showLoading({
        title: '请求支付'
      });
      _index2.default.request({
        method: 'POST',
        data: {
          'orderid': orderid
        },
        url: _index3.BASE_URL + 'pay/getPreGoodsOrder',
        header: {
          'Accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 200) {
            _index2.default.requestPayment({
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': res.data.data.signType,
              'paySign': res.data.data.paySign,
              'success': function success(res) {
                console.log('success', res);
                _index2.default.hideLoading();
                _index2.default.showModal({
                  title: '提示',
                  content: '支付成功',
                  showCancel: false,
                  success: function success(res) {
                    if (res.confirm) {
                      _index2.default.redirectTo({
                        url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=cgshop'
                      });
                    }
                  }
                });
              },
              'fail': function fail(res) {
                _index2.default.hideLoading();
                console.log('---弹出失败 fail---', res);
                console.log('fail', res);
                _index2.default.showModal({
                  title: '提示',
                  content: '支付失败，请重新支付',
                  showCancel: false,
                  success: function success(res) {
                    if (res.confirm) {
                      _index2.default.redirectTo({
                        url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=cgshop'
                      });
                    }
                  }
                });
              }
            });
          } else {
            if (res.data.msg = '该订单已支付') {
              _index2.default.hideLoading();
              _index2.default.redirectTo({
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=cgshop'
              });
            } else {
              _index2.default.hideLoading();
              _index2.default.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false
              });
            }
          }
        }
      });
    }
    //获取购物筐

  }, {
    key: "open",
    value: function open() {
      //取消
      _index2.default.navigateTo({
        url: '/pages/contact/contact'
      });
    }
  }, {
    key: "phonecall",
    value: function phonecall() {
      _index2.default.makePhoneCall({
        phoneNumber: '400889959'
      });
    }
    // 轮询订单支付状态

  }, {
    key: "queryPayStatus",
    value: function queryPayStatus(orderid) {
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      var that = this;
      _index2.default.showLoading({
        title: '等待支付结果...'
      });
      //查询订单状态
      intervalOrderStatus = setInterval(function () {
        _index2.default.request({
          method: 'POST',
          data: {
            'orderid': orderid
          },
          url: _index3.BASE_URL + 'order/paystatus',
          header: {
            'Accept': 'application/json',
            'token': _index3.globalData.token
          },
          success: function success(res) {
            console.log(res.data.data);
            if (res.data.data.orderstatus == "5" || res.data.data.orderstatus == "3" || res.data.data.orderstatus == "8" || res.data.data.orderstatus == "9") {
              console.log('----payed---');
              clearInterval(intervalOrderStatus);
              clearInterval(intervalRefresh);
              _index2.default.redirectTo({
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=cgshop'
              });
            }
          }
        });
      }, 2000); //循环时间2秒
    }
  }, {
    key: "syncRfidOrder",
    value: function syncRfidOrder() {
      var that = this;
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      _index2.default.request({
        url: _index3.BASE_URL + 'device/syncRfidOrder',
        data: {
          orderno: routerinfo.orderno,
          machineid: routerinfo.machineid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          console.log(res);
          if (res.data.code == 224) {
            // 交易不存在
            _index2.default.showToast({
              title: '交易不存在'
            });
            _index2.default.redirectTo({
              url: '/pages/index/index'
            });
          } else if (res.data.code == 223) {
            // 机柜离线
            _index2.default.hideLoading();
            _index2.default.showToast({
              title: '机柜离线'
            });
          } else if (res.data.code == 222) {
            // 交易中
            _index2.default.hideLoading();
            _index2.default.showToast({
              title: '交易中'
            });
          } else {
            _index2.default.hideLoading();
            that.orderStatus();
          }
        },
        fail: function fail(e) {
          _index2.default.hideLoading();
          that.setState({
            needRequestOrder: true,
            isRefreshingOrder: false
          });
        }
      });
    }
  }, {
    key: "gotoBack",
    value: function gotoBack() {
      //回到首页
      _index2.default.navigateTo({
        url: '/pages/index/index'
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var cartgoods = this.__state.cartgoods;

<<<<<<< HEAD
      Object.assign(this.__state, {
        systemUser: _index3.systemUser
      });
=======
      Object.assign(this.__state, {});
>>>>>>> 0309acd... 微信小程序免密版--心愿单
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["goKefu", "gotoBack"], _temp2);
exports.default = Index;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,intervalRefresh,intervalOrder,intervalOrderStatus,_createClass=function(){function a(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,o){return t&&a(e.prototype,t),o&&a(e,o),e}}(),_get=function e(t,o,a){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,o);if(void 0===n){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,o,a)}if("value"in n)return n.value;var i=n.get;return void 0!==i?i.call(a):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var timer=0,timerList=[],count=0,order=require("../../../utils/order.js"),Index=(_temp2=_class=function(e){function i(){var e,t,o;_classCallCheck(this,i);for(var a=arguments.length,n=Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=o=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(n)))).$usedState=["cartgoods","formid","lockid","machineid","machine","shelfs","orderno","orderid","openfailed","state1","icon1","socketMsgQueue","socketOpen","totalfee","promotions","cartTips1","cartTips2","needRequestOrder","isRefreshingOrder"],o.config={navigationBarTitleText:""},o.$$refs=[],_possibleConstructorReturn(o,t)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={formid:"",lockid:"",machineid:"",machine:{},shelfs:{},orderno:"",orderid:"",openfailed:!1,state1:_index3.PATH+"/mImages/shopping.png",icon1:_index3.PATH+"/mImages/fkz.png",socketMsgQueue:[],socketOpen:!1,totalfee:0,cartgoods:[],promotions:0,cartTips1:"正在购物中",cartTips2:"小主,拿到满意商品后,要关门哦！",needRequestOrder:!1,isRefreshingOrder:!1}}},{key:"componentWillMount",value:function(){_index2.default.setNavigationBarTitle({title:_index3.globalData.sysTitle}),console.log("视频柜数据"),console.log(this.$router.params);var e=this.$router.params.machineid,o=this.$router.params.orderid,t=this.$router.params.orderno;this.setState({machineid:e,orderid:o,orderno:t}),_index2.default.setStorageSync("routerinfo",this.$router.params);var a=_index2.default.getStorageSync("routerinfo");this.getMachineDetail(),this.getPromotions(a.machineid),console.log("*******onLoad*******");var n=this;if(null==a.orderid||"undefined"==a.orderid){console.log("options.orderid为空");_index2.default.getStorageSync("orderid");n.setState({orderid:o})}console.log("*******orderid*******"+a.orderid);a.orderid;order.startqueryorderstatus(o,function(e){console.log("-----orderstatus-----"),console.log(e);var t=e.data.data.orderstatus;e.data.data.doorstatus;200==e.data.code&&("5"==t||"3"==t||"7"==t||"8"==t||"9"==t?(console.log("---走这里---"),order.stopInterval(),setTimeout(function(){_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+o+"&whereis=cgshop"})},2e3)):"6"==t?(order.stopInterval(),n.requestPay(a.orderid)):n.setState({cartTips1:"正在购物中",cartTips2:"小主,"+_index3.systemUser+"正在快速核算订单,请耐心等候哦！"}))})}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){}},{key:"componentDidHide",value:function(){order.stopInterval()}},{key:"componentWillUnmount",value:function(){order.stopInterval()}},{key:"componentDidCatchError",value:function(){}},{key:"tapRefresh",value:function(){order.stopInterval(),_index2.default.redirectTo({url:"/pages/index/index"})}},{key:"getPromotions",value:function(e){var o=this;_index2.default.request({url:_index3.BASE_URL+"promotion/machine",data:{machineid:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(_index2.default.hideLoading(),200==e.data.code){var t=e.data.data;console.log("promotions:success"),console.log(t),o.setState({promotions:t.length})}else console.log("promotions:fail"),console.log(e.data.code),console.log(e)},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"getMachineDetail",value:function(){var e=_index2.default.getStorageSync("routerinfo"),t=this;_index2.default.request({url:_index3.BASE_URL+"machine/machinedetail",data:{machineid:e.machineid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("machine:"),console.log(e.data.data),t.setState({machine:e.data.data})}})}},{key:"goKefu",value:function(){console.log("微信客服"),_index2.default.navigateTo({url:"/pages/service/service"})}},{key:"getShelfs",value:function(){var t=this,e=_index2.default.getStorageSync("routerinfo");_index2.default.request({url:_index3.BASE_URL+"machine/shelfs",data:{machineid:e.machineid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log(e),console.log(e.data.data),t.setState({shelfs:e.data.data})}})}},{key:"requestPay",value:function(e){var t=_index2.default.getStorageSync("routerinfo");_index2.default.showLoading({title:"请求支付"}),_index2.default.request({method:"POST",data:{orderid:e},url:_index3.BASE_URL+"pay/getPreGoodsOrder",header:{Accept:"application/json","content-type":"application/x-www-form-urlencoded",token:_index3.globalData.token},success:function(e){200==e.data.code?_index2.default.requestPayment({timeStamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:e.data.data.signType,paySign:e.data.data.paySign,success:function(e){console.log("success",e),_index2.default.hideLoading(),_index2.default.showModal({title:"提示",content:"支付成功",showCancel:!1,success:function(e){e.confirm&&_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=cgshop"})}})},fail:function(e){_index2.default.hideLoading(),console.log("---弹出失败 fail---",e),console.log("fail",e),_index2.default.showModal({title:"提示",content:"支付失败，请重新支付",showCancel:!1,success:function(e){e.confirm&&_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=cgshop"})}})}}):(e.data.msg="该订单已支付")?(_index2.default.hideLoading(),_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=cgshop"})):(_index2.default.hideLoading(),_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1}))}})}},{key:"open",value:function(){_index2.default.navigateTo({url:"/pages/contact/contact"})}},{key:"phonecall",value:function(){_index2.default.makePhoneCall({phoneNumber:"400889959"})}},{key:"queryPayStatus",value:function(e){var t=_index2.default.getStorageSync("routerinfo");_index2.default.showLoading({title:"等待支付结果..."}),intervalOrderStatus=setInterval(function(){_index2.default.request({method:"POST",data:{orderid:e},url:_index3.BASE_URL+"order/paystatus",header:{Accept:"application/json",token:_index3.globalData.token},success:function(e){console.log(e.data.data),"5"!=e.data.data.orderstatus&&"3"!=e.data.data.orderstatus&&"8"!=e.data.data.orderstatus&&"9"!=e.data.data.orderstatus||(console.log("----payed---"),clearInterval(intervalOrderStatus),clearInterval(intervalRefresh),_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=cgshop"}))}})},2e3)}},{key:"syncRfidOrder",value:function(){var t=this,e=_index2.default.getStorageSync("routerinfo");_index2.default.request({url:_index3.BASE_URL+"device/syncRfidOrder",data:{orderno:e.orderno,machineid:e.machineid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){console.log(e),224==e.data.code?(_index2.default.showToast({title:"交易不存在"}),_index2.default.redirectTo({url:"/pages/index/index"})):223==e.data.code?(_index2.default.hideLoading(),_index2.default.showToast({title:"机柜离线"})):222==e.data.code?(_index2.default.hideLoading(),_index2.default.showToast({title:"交易中"})):(_index2.default.hideLoading(),t.orderStatus())},fail:function(e){_index2.default.hideLoading(),t.setState({needRequestOrder:!0,isRefreshingOrder:!1})}})}},{key:"gotoBack",value:function(){_index2.default.navigateTo({url:"/pages/index/index"})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2],this.__state.cartgoods;return Object.assign(this.__state,{}),this.__state}}]),i}(),_class.properties={},_class.$$events=["goKefu","gotoBack"],_temp2);exports.default=Index,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Index,!0));
>>>>>>> b7c6447... 微信小程序免密版更新
