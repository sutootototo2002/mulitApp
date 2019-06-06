'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require('../../../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../config/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var requestfailed = true;
var iNow = 0;
var orderid = '';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && poprocess.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Open = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Open, _BaseComponent);

  function Open() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Open);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Open.__proto__ || Object.getPrototypeOf(Open)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["formid", "lockid", "machineid", "orderid", "openfailed", "requestfailed", "num", "tag", "isfind", "dw", "loadImg"], _this.config = {
      navigationBarTitleText: '会员注册'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Open, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Open.prototype.__proto__ || Object.getPrototypeOf(Open.prototype), '_constructor', this).call(this, props);
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
        orderid: '',
        openfailed: false,
        requestfailed: true,
        num: 0,
        tag: 0,
        isfind: false,
        dw: _index3.PATH + '/mImages/dw.png',
        loadImg: _index3.PATH + '/mImages/open.png'
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log(this.$router.params);
      this.setState({
        formid: this.$router.params.formid,
        lockid: this.$router.params.lockid,
        machineid: this.$router.params.machineid
      });
      this.open();
      this.deviceOpen(this.$router.params.machineid, this.$router.params.lockid);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {}
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {}
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: 'deviceOpen',
    value: function deviceOpen(machineid, lockid) {
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'device/open',
        data: {
          machineid: machineid,
          lockid: lockid,
          formid: that.state.formid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          _index2.default.hideLoading();
          var code = res.data.code;
          if (code == 200) {
            orderid = res.data.data.orderid;
            var orderno = res.data.data.orderno;
            var recogmode = res.data.data.recogmode;
            that.setState({
              orderid: orderid
            });
            _index2.default.setStorageSync("orderid", orderid);
            if (recogmode == 3) {
              //重力柜
              _index2.default.setStorageSync("orderid", orderid);
              // wx.setStorage({
              //   key: "orderid",
              //   data: orderid
              // });
              _index2.default.redirectTo({
                url: '../../index/shopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno + '&from=open'
              });
            } else {
              _index2.default.setStorageSync("orderid", orderid);
              // wx.setStorage({
              //   key: "orderid",
              //   data: orderid
              // });
              _index2.default.redirectTo({
                url: '../../index/cgshopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno
              });
            }
          } else {
            that.setState({
              openfailed: true,
              isfind: true
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
        fail: function fail(e) {
          _index2.default.showModal({
            title: '提示',
            content: '请求失败，请稍后再试',
            showCancel: false,
            success: function success(res) {
              if (res.confirm) {
                _index2.default.reLaunch({
                  url: '../../index/index'
                });
              }
            }
          });
        }
      });
    }
  }, {
    key: 'tryagain',
    value: function tryagain() {
      _index2.default.redirectTo({
        url: '/pages/index/index'
      });
    }
  }, {
    key: 'open',
    value: function open() {
      var that = this;
      var interval = setInterval(function () {
        var newtag = 1;
        that.setState({
          tag: newtag
        });
        //循环执行代码 
        if (requestfailed) {
          console.log('---循环执行代码 ---');
          that.openStatus();
        } else {
          console.log('---停止循环执行代码 ---');
          that.setState({
            tag: 100
          });
          clearInterval(interval);
        }
      }, 800); //循环时间1秒 
      setTimeout(function () {
        if (requestfailed) {
          clearInterval(interval);
          that.requestOpenStatus();
        }
      }.bind(this), 60000);
    }
  }, {
    key: 'openStatus',
    value: function openStatus() {
      var that = this;
      orderid = _index2.default.getStorageSync("orderid");
      console.log("orderid:");
      console.log(orderid);
      _index2.default.request({
        url: _index3.BASE_URL + 'device/openstatus',
        data: {
          orderid: orderid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          if (res.data.code == 200) {
            that.setState({
              requestfailed: false
            });
            requestfailed = false;
            console.log("orderid:1111111111111111111111");
            console.log(orderid);
            //Taro.setStorageSync("orderid", orderid);
            // wx.setStorage({
            //   key: "orderid",
            //   data: that.data.orderid
            // });
            _index2.default.reLaunch({
              url: '../../index/index'
            });
          } else if (res.data.code == 211) {
            that.setState({
              isfind: true
            });
            requestfailed = false;
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
            requestfailed = false;
          }
        },
        fail: function fail(e) {
          that.setState({
            openfailed: true
          });
        }
      });
    }
  }, {
    key: 'requestOpenStatus',
    value: function requestOpenStatus() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'device/requestopenstatus',
        data: {
          orderid: orderid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          if (res.data.code == 200) {
            that.setState({
              requestfailed: false
            });
            requestfailed = false;
            var orderstatus = res.data.data.orderstatus;
            var doorstatus = res.data.data.doorstatus;
            //Taro.setStorageSync("orderid", that.state.orderid);
            // wx.setStorage({
            //   key: "orderid",
            //   data: orderid
            // });
            _index2.default.redirectTo({
              url: '../../index/index'
            });
          } else {
            that.setState({
              openfailed: true
            });
          }
        },
        fail: function fail(e) {
          that.setState({
            openfailed: true
          });
        }
      });
    }
  }, {
    key: 'onClosePos',
    value: function onClosePos() {
      _index2.default.redirectTo({
        url: '/pages/service/service'
      });
    }
  }, {
    key: '_createData',
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Open;
}(_index.Component), _class.properties = {}, _class.$$events = ["tryagain", "onClosePos"], _temp2);
exports.default = Open;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Open, true));