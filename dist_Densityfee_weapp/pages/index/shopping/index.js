<<<<<<< HEAD
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

var socketOpen = false;
var shoudReconnet = false;
var socketMsgQueue = [];
var timer1 = 0;
var timerList = [];

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
<<<<<<< HEAD
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cartgoods", "systemUser", "formid", "lockid", "machineid", "machine", "shelfs", "orderno", "orderid", "openfailed", "state1", "icon1", "socketMsgQueue", "socketOpen", "totalfee", "promotions", "cartTips1", "cartTips2"], _this.config = {
=======
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cartgoods", "formid", "lockid", "machineid", "machine", "shelfs", "orderno", "orderid", "openfailed", "state1", "icon1", "socketMsgQueue", "socketOpen", "totalfee", "promotions", "cartTips1", "cartTips2"], _this.config = {
>>>>>>> 0309acd... 微信小程序免密版--心愿单
=======
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cartgoods", "formid", "lockid", "machineid", "machine", "shelfs", "orderno", "orderid", "openfailed", "state1", "icon1", "socketMsgQueue", "socketOpen", "totalfee", "promotions", "cartTips1", "cartTips2"], _this.config = {
>>>>>>> master
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
        cartTips1: '正在购物中',
        cartTips2: '小主,拿到满意商品后,要关门哦！'
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      _index2.default.setNavigationBarTitle({
        title: _index3.globalData.sysTitle
      });
      console.log('重力柜数据');
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
      //得到
      this.getShelfs();
      this.getPromotions(routerinfo.machineid);
      this.cartitems();
      //获取订单状态
      //var orderid = that.data.orderid;
      order.startqueryorderstatus(orderid, function succeeded(res) {
        console.log('-----orderstatus-----');
        console.log(res);
        var orderstatus = res.data.data.orderstatus;
        var doorstatus = res.data.data.doorstatus;
        if (res.data.code == 200) {
          if (orderstatus == "5" || orderstatus == "3" || orderstatus == "7" || orderstatus == "8" || orderstatus == "9") {
            //5已付款 3已取消 8已完成 9 错误
            order.stopInterval();
            setTimeout(function () {
              _index2.default.redirectTo({
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderid + '&whereis=weight'
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
<<<<<<< HEAD
              cartTips1: '柜门已关闭，订单正在结算中',
              cartTips2: '稍后给您推送结算账单'
=======
              cartTips1: '正在购物中',
              cartTips2: '小主,' + _index3.systemUser + '正在快速核算订单,请耐心等候哦！'
>>>>>>> 0309acd... 微信小程序免密版--心愿单
=======
              cartTips1: '正在购物中',
              cartTips2: '小主,' + _index3.systemUser + '正在快速核算订单,请耐心等候哦！'
>>>>>>> master
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
      console.log("orderid:");
      console.log(orderid);
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
                        url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=weight'
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
                        url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=weight'
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
                url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=weight'
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
    //转到客服

  }, {
    key: "goKefu",
    value: function goKefu() {
      console.log('微信客服');
      _index2.default.navigateTo({
        url: '/pages/service/service'
      });
    }
    //获取购物筐

  }, {
    key: "cartitems",
    value: function cartitems() {
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      console.log(routerinfo.orderno);
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'order/cartitems',
        data: {
          orderno: routerinfo.orderno
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('购物商品');
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
          }
        }
      });
    }
  }, {
    key: "connectServer",
    value: function connectServer() {
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      var that = this;
      _index2.default.connectSocket({
        url: _index3.HOST_WEBSOCKET
      }).then(function (res) {
        console.log('---success---');
        console.log(res);
      }).catch(function (error) {
        console.log('---fail---');
        console.log(error);
      });
      _index2.default.onSocketOpen(function (res) {
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
      });
      _index2.default.onSocketError(function (res) {
        console.log('WebSocket连接打开失败，请检查！');
        // wx.showToast({
        //   title: '连接打开失败',
        // })
        console.log(res);
        if (shoudReconnet) {
          _index2.default.connectSocket({
            url: _index3.HOST_WEBSOCKET
          });
        }
      });
      _index2.default.onSocketClose(function (res) {
        console.log('WebSocket 已关闭！');
        if (shoudReconnet) {
          _index2.default.connectSocket({
            url: _index3.HOST_WEBSOCKET
          });
        }
      });
      _index2.default.onSocketMessage(function (res) {
        console.log('===onSocketMessage===');
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
            _index2.default.request({
              method: 'POST',
              data: {
                'orderno': routerinfo.orderno,
                'client_id': data.client_id
              },
              url: _index3.HOST_URL + 'callbackapi/bind/bind',
              header: {
                'Accept': 'application/json',
                'token': _index3.globalData.token
              },
              success: function success(res) {
                console.log(res.data);
                if (!res.data) {
                  _index2.default.showToast({
                    title: 'websocket绑定失败'
                  });
                }
              }
            });
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
              if (orderstatus == "5" || orderstatus == "3" || orderstatus == "8") {
                //5已付款 3已取消 8已完成
                order.stopInterval();
                socketOpen = false;
                shoudReconnet = false;
                _index2.default.closeSocket();
                _index2.default.redirectTo({
                  url: '/pages/orders/orderdetail/orderdetail?orderid=' + routerinfo.orderid + '&whereis=weight'
                });
              } else if (orderstatus == 4) {
                //4待支付 说明免密接口请求成功 等待回调
                _index2.default.showLoading({
                  title: '结算中...'
                });
                socketOpen = false;
                shoudReconnet = false;
                _index2.default.closeSocket();
              } else if (orderstatus == 6) {
                //6已欠费
                order.stopInterval();
                socketOpen = false;
                shoudReconnet = false;
                _index2.default.closeSocket();
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
<<<<<<< HEAD
      Object.assign(this.__state, {
        systemUser: _index3.systemUser
      });
=======
      Object.assign(this.__state, {});
>>>>>>> 0309acd... 微信小程序免密版--心愿单
=======
      Object.assign(this.__state, {});
>>>>>>> master
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["goKefu", "gotoBack"], _temp2);
exports.default = Index;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,o);if(void 0===a){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,o,n)}if("value"in a)return a.value;var i=a.get;return void 0!==i?i.call(n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var socketOpen=!1,shoudReconnet=!1,socketMsgQueue=[],timer1=0,timerList=[],order=require("../../../utils/order.js"),Index=(_temp2=_class=function(e){function i(){var e,t,o;_classCallCheck(this,i);for(var n=arguments.length,a=Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=o=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(a)))).$usedState=["cartgoods","formid","lockid","machineid","machine","shelfs","orderno","orderid","openfailed","state1","icon1","socketMsgQueue","socketOpen","totalfee","promotions","cartTips1","cartTips2"],o.config={navigationBarTitleText:""},o.$$refs=[],_possibleConstructorReturn(o,t)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={formid:"",lockid:"",machineid:"",machine:{},shelfs:{},orderno:"",orderid:"",openfailed:!1,state1:_index3.PATH+"/mImages/shopping.png",icon1:_index3.PATH+"/mImages/fkz.png",socketMsgQueue:[],socketOpen:!1,totalfee:0,cartgoods:[],promotions:0,cartTips1:"正在购物中",cartTips2:"小主,拿到满意商品后,要关门哦！"}}},{key:"componentWillMount",value:function(){_index2.default.setNavigationBarTitle({title:_index3.globalData.sysTitle}),console.log("重力柜数据"),console.log(this.$router.params);var e=this.$router.params.machineid,o=this.$router.params.orderid,t=this.$router.params.orderno,n=this;this.setState({machineid:e,orderid:o,orderno:t}),_index2.default.setStorageSync("routerinfo",this.$router.params);var a=_index2.default.getStorageSync("routerinfo");this.getMachineDetail(),this.getShelfs(),this.getPromotions(a.machineid),this.cartitems(),order.startqueryorderstatus(o,function(e){console.log("-----orderstatus-----"),console.log(e);var t=e.data.data.orderstatus;e.data.data.doorstatus;200==e.data.code&&("5"==t||"3"==t||"7"==t||"8"==t||"9"==t?(order.stopInterval(),setTimeout(function(){_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+o+"&whereis=weight"})},2e3)):"6"==t?(order.stopInterval(),n.requestPay(a.orderid)):n.setState({cartTips1:"正在购物中",cartTips2:"小主,"+_index3.systemUser+"正在快速核算订单,请耐心等候哦！"}))})}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){}},{key:"componentDidHide",value:function(){order.stopInterval()}},{key:"componentWillUnmount",value:function(){order.stopInterval()}},{key:"componentDidCatchError",value:function(){}},{key:"getPromotions",value:function(e){var o=this;_index2.default.request({url:_index3.BASE_URL+"promotion/machine",data:{machineid:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(_index2.default.hideLoading(),200==e.data.code){var t=e.data.data;console.log("promotions:success"),console.log(t),o.setState({promotions:t.length})}else console.log("promotions:fail"),console.log(e.data.code),console.log(e)},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"getMachineDetail",value:function(){var e=_index2.default.getStorageSync("routerinfo"),t=this;_index2.default.request({url:_index3.BASE_URL+"machine/machinedetail",data:{machineid:e.machineid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("machine:"),console.log(e.data.data),t.setState({machine:e.data.data})}})}},{key:"getShelfs",value:function(){var t=this,e=_index2.default.getStorageSync("routerinfo");_index2.default.request({url:_index3.BASE_URL+"machine/shelfs",data:{machineid:e.machineid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log(e),console.log(e.data.data),t.setState({shelfs:e.data.data})}})}},{key:"requestPay",value:function(e){console.log("orderid:"),console.log(e);var t=_index2.default.getStorageSync("routerinfo");_index2.default.showLoading({title:"请求支付"}),_index2.default.request({method:"POST",data:{orderid:e},url:_index3.BASE_URL+"pay/getPreGoodsOrder",header:{Accept:"application/json","content-type":"application/x-www-form-urlencoded",token:_index3.globalData.token},success:function(e){200==e.data.code?_index2.default.requestPayment({timeStamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:e.data.data.signType,paySign:e.data.data.paySign,success:function(e){console.log("success",e),_index2.default.hideLoading(),_index2.default.showModal({title:"提示",content:"支付成功",showCancel:!1,success:function(e){e.confirm&&_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=weight"})}})},fail:function(e){_index2.default.hideLoading(),console.log("---弹出失败 fail---",e),console.log("fail",e),_index2.default.showModal({title:"提示",content:"支付失败，请重新支付",showCancel:!1,success:function(e){e.confirm&&_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=weight"})}})}}):(e.data.msg="该订单已支付")?(_index2.default.hideLoading(),_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=weight"})):(_index2.default.hideLoading(),_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1}))}})}},{key:"goKefu",value:function(){console.log("微信客服"),_index2.default.navigateTo({url:"/pages/service/service"})}},{key:"cartitems",value:function(){var e=_index2.default.getStorageSync("routerinfo");console.log(e.orderno);var a=this;_index2.default.request({url:_index3.BASE_URL+"order/cartitems",data:{orderno:e.orderno},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){if(console.log("购物商品"),console.log(e),200==e.data.code){var t=e.data.data;console.log("---cartitems---"),console.log(t);var o=t.data;console.log("商品："),console.log(o);t.weights;var n=t.totalfee;a.setState({totalfee:n,cartgoods:o}),a.connectServer()}}})}},{key:"connectServer",value:function(){var s=_index2.default.getStorageSync("routerinfo"),d=this;_index2.default.connectSocket({url:_index3.HOST_WEBSOCKET}).then(function(e){console.log("---success---"),console.log(e)}).catch(function(e){console.log("---fail---"),console.log(e)}),_index2.default.onSocketOpen(function(e){console.log("WebSocket连接已打开！");var t={orderno:s.orderno,message:"connect"};console.log("连接已打开数据"),console.log(JSON.stringify(t))}),_index2.default.onSocketError(function(e){console.log("WebSocket连接打开失败，请检查！"),console.log(e),shoudReconnet&&_index2.default.connectSocket({url:_index3.HOST_WEBSOCKET})}),_index2.default.onSocketClose(function(e){console.log("WebSocket 已关闭！"),shoudReconnet&&_index2.default.connectSocket({url:_index3.HOST_WEBSOCKET})}),_index2.default.onSocketMessage(function(e){console.log("===onSocketMessage==="),console.log(e);var t=JSON.parse(e.data);switch(t.type||""){case"ping":break;case"init":_index2.default.request({method:"POST",data:{orderno:s.orderno,client_id:t.client_id},url:_index3.HOST_URL+"callbackapi/bind/bind",header:{Accept:"application/json",token:_index3.globalData.token},success:function(e){console.log(e.data),e.data||_index2.default.showToast({title:"websocket绑定失败"})}});break;default:console.log("收到服务器内容：");var o=e,n=JSON.parse(o.data);if(console.log(n),"cart"==n.op){console.log("收到购物车信息");var a=n.data,r=(n.weights,n.totalfee);d.setState({totalfee:r,cartgoods:a})}else if("order"==n.op){console.log("收到关门订单");var i=n.orderstatus;"5"==i||"3"==i||"8"==i?(order.stopInterval(),shoudReconnet=socketOpen=!1,_index2.default.closeSocket(),_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+s.orderid+"&whereis=weight"})):4==i?(_index2.default.showLoading({title:"结算中..."}),shoudReconnet=socketOpen=!1,_index2.default.closeSocket()):6==i?(order.stopInterval(),shoudReconnet=socketOpen=!1,_index2.default.closeSocket(),d.requestPay(s.orderid)):(console.log("未知状态"),console.log(o))}}})}},{key:"gotoBack",value:function(){_index2.default.navigateTo({url:"/pages/index/index"})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2],this.__state.cartgoods;return Object.assign(this.__state,{}),this.__state}}]),i}(),_class.properties={},_class.$$events=["goKefu","gotoBack"],_temp2);exports.default=Index,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Index,!0));
>>>>>>> b7c6447... 微信小程序免密版更新
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,o);if(void 0===a){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,o,n)}if("value"in a)return a.value;var i=a.get;return void 0!==i?i.call(n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var socketOpen=!1,shoudReconnet=!1,socketMsgQueue=[],timer1=0,timerList=[],order=require("../../../utils/order.js"),Index=(_temp2=_class=function(e){function i(){var e,t,o;_classCallCheck(this,i);for(var n=arguments.length,a=Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=o=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(a)))).$usedState=["cartgoods","formid","lockid","machineid","machine","shelfs","orderno","orderid","openfailed","state1","icon1","socketMsgQueue","socketOpen","totalfee","promotions","cartTips1","cartTips2"],o.config={navigationBarTitleText:""},o.$$refs=[],_possibleConstructorReturn(o,t)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={formid:"",lockid:"",machineid:"",machine:{},shelfs:{},orderno:"",orderid:"",openfailed:!1,state1:_index3.PATH+"/mImages/shopping.png",icon1:_index3.PATH+"/mImages/fkz.png",socketMsgQueue:[],socketOpen:!1,totalfee:0,cartgoods:[],promotions:0,cartTips1:"正在购物中",cartTips2:"小主,拿到满意商品后,要关门哦！"}}},{key:"componentWillMount",value:function(){_index2.default.setNavigationBarTitle({title:_index3.globalData.sysTitle}),console.log("重力柜数据"),console.log(this.$router.params);var e=this.$router.params.machineid,o=this.$router.params.orderid,t=this.$router.params.orderno,n=this;this.setState({machineid:e,orderid:o,orderno:t}),_index2.default.setStorageSync("routerinfo",this.$router.params);var a=_index2.default.getStorageSync("routerinfo");this.getMachineDetail(),this.getShelfs(),this.getPromotions(a.machineid),this.cartitems(),order.startqueryorderstatus(o,function(e){console.log("-----orderstatus-----"),console.log(e);var t=e.data.data.orderstatus;e.data.data.doorstatus;200==e.data.code&&("5"==t||"3"==t||"7"==t||"8"==t||"9"==t?(order.stopInterval(),setTimeout(function(){_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+o+"&whereis=weight"})},2e3)):"6"==t?(order.stopInterval(),n.requestPay(a.orderid)):n.setState({cartTips1:"正在购物中",cartTips2:"小主,"+_index3.systemUser+"正在快速核算订单,请耐心等候哦！"}))})}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){}},{key:"componentDidHide",value:function(){order.stopInterval()}},{key:"componentWillUnmount",value:function(){order.stopInterval()}},{key:"componentDidCatchError",value:function(){}},{key:"getPromotions",value:function(e){var o=this;_index2.default.request({url:_index3.BASE_URL+"promotion/machine",data:{machineid:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(_index2.default.hideLoading(),200==e.data.code){var t=e.data.data;console.log("promotions:success"),console.log(t),o.setState({promotions:t.length})}else console.log("promotions:fail"),console.log(e.data.code),console.log(e)},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"getMachineDetail",value:function(){var e=_index2.default.getStorageSync("routerinfo"),t=this;_index2.default.request({url:_index3.BASE_URL+"machine/machinedetail",data:{machineid:e.machineid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("machine:"),console.log(e.data.data),t.setState({machine:e.data.data})}})}},{key:"getShelfs",value:function(){var t=this,e=_index2.default.getStorageSync("routerinfo");_index2.default.request({url:_index3.BASE_URL+"machine/shelfs",data:{machineid:e.machineid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log(e),console.log(e.data.data),t.setState({shelfs:e.data.data})}})}},{key:"requestPay",value:function(e){console.log("orderid:"),console.log(e);var t=_index2.default.getStorageSync("routerinfo");_index2.default.showLoading({title:"请求支付"}),_index2.default.request({method:"POST",data:{orderid:e},url:_index3.BASE_URL+"pay/getPreGoodsOrder",header:{Accept:"application/json","content-type":"application/x-www-form-urlencoded",token:_index3.globalData.token},success:function(e){200==e.data.code?_index2.default.requestPayment({timeStamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:e.data.data.signType,paySign:e.data.data.paySign,success:function(e){console.log("success",e),_index2.default.hideLoading(),_index2.default.showModal({title:"提示",content:"支付成功",showCancel:!1,success:function(e){e.confirm&&_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=weight"})}})},fail:function(e){_index2.default.hideLoading(),console.log("---弹出失败 fail---",e),console.log("fail",e),_index2.default.showModal({title:"提示",content:"支付失败，请重新支付",showCancel:!1,success:function(e){e.confirm&&_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=weight"})}})}}):(e.data.msg="该订单已支付")?(_index2.default.hideLoading(),_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+t.orderid+"&whereis=weight"})):(_index2.default.hideLoading(),_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1}))}})}},{key:"goKefu",value:function(){console.log("微信客服"),_index2.default.navigateTo({url:"/pages/service/service"})}},{key:"cartitems",value:function(){var e=_index2.default.getStorageSync("routerinfo");console.log(e.orderno);var a=this;_index2.default.request({url:_index3.BASE_URL+"order/cartitems",data:{orderno:e.orderno},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){if(console.log("购物商品"),console.log(e),200==e.data.code){var t=e.data.data;console.log("---cartitems---"),console.log(t);var o=t.data;console.log("商品："),console.log(o);t.weights;var n=t.totalfee;a.setState({totalfee:n,cartgoods:o}),a.connectServer()}}})}},{key:"connectServer",value:function(){var s=_index2.default.getStorageSync("routerinfo"),d=this;_index2.default.connectSocket({url:_index3.HOST_WEBSOCKET}).then(function(e){console.log("---success---"),console.log(e)}).catch(function(e){console.log("---fail---"),console.log(e)}),_index2.default.onSocketOpen(function(e){console.log("WebSocket连接已打开！");var t={orderno:s.orderno,message:"connect"};console.log("连接已打开数据"),console.log(JSON.stringify(t))}),_index2.default.onSocketError(function(e){console.log("WebSocket连接打开失败，请检查！"),console.log(e),shoudReconnet&&_index2.default.connectSocket({url:_index3.HOST_WEBSOCKET})}),_index2.default.onSocketClose(function(e){console.log("WebSocket 已关闭！"),shoudReconnet&&_index2.default.connectSocket({url:_index3.HOST_WEBSOCKET})}),_index2.default.onSocketMessage(function(e){console.log("===onSocketMessage==="),console.log(e);var t=JSON.parse(e.data);switch(t.type||""){case"ping":break;case"init":_index2.default.request({method:"POST",data:{orderno:s.orderno,client_id:t.client_id},url:_index3.HOST_URL+"callbackapi/bind/bind",header:{Accept:"application/json",token:_index3.globalData.token},success:function(e){console.log(e.data),e.data||_index2.default.showToast({title:"websocket绑定失败"})}});break;default:console.log("收到服务器内容：");var o=e,n=JSON.parse(o.data);if(console.log(n),"cart"==n.op){console.log("收到购物车信息");var a=n.data,r=(n.weights,n.totalfee);d.setState({totalfee:r,cartgoods:a})}else if("order"==n.op){console.log("收到关门订单");var i=n.orderstatus;"5"==i||"3"==i||"8"==i?(order.stopInterval(),shoudReconnet=socketOpen=!1,_index2.default.closeSocket(),_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+s.orderid+"&whereis=weight"})):4==i?(_index2.default.showLoading({title:"结算中..."}),shoudReconnet=socketOpen=!1,_index2.default.closeSocket()):6==i?(order.stopInterval(),shoudReconnet=socketOpen=!1,_index2.default.closeSocket(),d.requestPay(s.orderid)):(console.log("未知状态"),console.log(o))}}})}},{key:"gotoBack",value:function(){_index2.default.navigateTo({url:"/pages/index/index"})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2],this.__state.cartgoods;return Object.assign(this.__state,{}),this.__state}}]),i}(),_class.properties={},_class.$$events=["goKefu","gotoBack"],_temp2);exports.default=Index,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Index,!0));
>>>>>>> b7c6447... 微信小程序免密版更新
