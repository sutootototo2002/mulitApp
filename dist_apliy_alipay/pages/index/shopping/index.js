"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/_tarojs/taro-alipay/index.js");

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cartgoods", "systemUser", "formid", "lockid", "machineid", "machine", "shelfs", "orderno", "orderid", "openfailed", "state1", "icon1", "socketMsgQueue", "socketOpen", "totalfee", "promotions", "cartTips1", "cartTips2"], _this.config = {
      navigationBarTitleText: _index3.globalData.sysTitle
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
              cartTips1: '柜门已关闭，订单正在结算中',
              cartTips2: '稍后给您推送结算账单'
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

      Object.assign(this.__state, {
        systemUser: _index3.systemUser
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["goKefu", "gotoBack"], _temp2);
exports.default = Index;

Page(require('../../../npm/_tarojs/taro-alipay/index.js').default.createComponent(Index, true));