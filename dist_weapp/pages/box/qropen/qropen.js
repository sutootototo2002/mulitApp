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

var _util = require('../../../utils/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var intervalPapay;
var intervalOrderStatus;
var requestfailed;
var orderid = '';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && poprocess.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Qropen = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Qropen, _BaseComponent);

  function Qropen() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Qropen);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Qropen.__proto__ || Object.getPrototypeOf(Qropen)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["formid", "lockid", "machineid", "orderid", "openfailed", "requestfailed", "pay", "num", "tag", "qrurl", "haslogin", "showlogin", "showpapay", "showopen", "papayPressed", "showModalStatus", "unpayorder", "loadImg", "loadImg1", "islogin"], _this.config = {
      navigationBarTitleText: '打开柜子'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Qropen, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Qropen.prototype.__proto__ || Object.getPrototypeOf(Qropen.prototype), '_constructor', this).call(this, props);
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
        pay: false,
        num: 0,
        tag: 100,
        qrurl: '',
        haslogin: false,
        showlogin: false,
        showpapay: false,
        showopen: false,
        papayPressed: false,
        showModalStatus: false,
        unpayorder: [],
        loadImg: _index3.PATH + '/mImages/openouter.png',
        loadImg1: _index3.PATH + '/mImages/smks-wzc.png',
        islogin: false
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log('---onLoad---');
      console.log(this.$router.params);
      this.setState({
        formid: this.$router.params.formid,
        lockid: this.$router.params.lockid,
        machineid: this.$router.params.machineid
      });
      var that = this;
      _index2.default.showLoading({
        title: ''
      });
      var qrurl = decodeURIComponent(this.$router.params.q);
      //var qrurl = 'https://t.wemall.com.cn/clientapi?id=XX2121901170001&lockid=1-1-1';
      that.setState({
        qrurl: qrurl
      });
      _index2.default.getStorage({
        key: 'token'
      }).then(function (res) {
        var token = res.data;
        _index2.default.request({
          url: _index3.BASE_URL + 'token/verifyToken',
          data: {
            'token': token
          },
          header: {
            'content-type': 'application/json',
            'token': token
          },
          success: function success(res) {
            console.log(res);
            if (res.data.code == 200) {
              console.log('*********token 有效***********');
              _index3.globalData.token = token;
              _index3.globalData.haslogin = true;
              that.getUserDetail();
            } else {
              _index2.default.hideLoading();
              console.log('*********token 过期***********1');
              try {
                _index2.default.removeStorageSync('token');
              } catch (e) {}
              // Do something when catch error

              //that.showLoginModal();
              that.setState({
                islogin: true,
                openfailed: true //点击开门
              });
            }
          }
        });
      }).catch(function (error) {
        _index2.default.hideLoading();
        console.log('*********不存在token***********');
        that.checkUser();
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {
      console.log("---onShow----");
      var that = this;
      setTimeout(function () {
        that.getUserDetail();
      }, 2000);
    }
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {}
    //setp1 点击获取手机号码授权

  }, {
    key: 'getPhoneNumber',
    value: function getPhoneNumber(e) {
      console.log(e.detail.errMsg);
      var that = this;
      if (e.detail.errMsg == 'getPhoneNumber:ok') {
        var that = this;
        _index2.default.login().then(function (res) {
          console.log(res);
          var code = res.code; //获取code
          console.log('开始登录:' + code);
          function succeeded(res) {
            _index2.default.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 500
            });
            that.setState({
              islogin: false,
              openfailed: false
            });
            // that.gotoPapay();
          }
          ;
          function failed(res) {
            _index2.default.showToast({
              title: '登陆失败,请再按一下',
              icon: 'fail',
              duration: 500
            });
          }
          ;
          (0, _util.login)(code, e.detail.encryptedData, e.detail.iv, succeeded, failed);
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: 'showLoginModal',
    value: function showLoginModal() {
      this.setState({
        showlogin: true,
        showpapay: false
      });
    }
  }, {
    key: 'checkUser',
    value: function checkUser() {
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.login({
        success: function success(res) {
          var code = res.code; //获取code
          console.log('START LOGIN:' + code);
          _index2.default.request({
            url: _index3.BASE_URL + 'token/checkUser',
            data: {
              "code": code
            },
            header: {
              'content-type': 'application/json',
              'token': _index3.globalData.token11
            },
            method: 'GET',
            success: function success(res) {
              _index2.default.hideLoading();
              console.log(res.data);
              if (res.data.code == 200) {
                if (res.data.data != "") {
                  console.log('服务器登录成功');
                  _index2.default.setStorage({
                    key: "token",
                    data: res.data.data
                  });
                  _index3.globalData.token = res.data.data;
                  _index3.globalData.haslogin = true;
                  that.getUserDetail();
                  that.setState({
                    islogin: true,
                    openfailed: true //点击开门
                  });
                } else {
                  //that.showLoginModal();
                  that.setState({
                    islogin: false,
                    openfailed: false //隐藏
                  });
                }
              } else {
                //that.showLoginModal();
                that.setState({
                  islogin: true,
                  openfailed: true
                });
              }
            }
          });
        },
        fail: function fail(e) {
          //that.showLoginModal();
          that.setState({
            islogin: true,
            openfailed: true
          });
        }
      });
    }
  }, {
    key: 'getUserDetail',
    value: function getUserDetail() {
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'user/detail',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('用户信息：');
          console.log(res);
          _index2.default.hideLoading();
          if (res.data.code == 200) {
            //已经注册过
            _index3.globalData.haslogin = true;
            //
            var isnopasspay = res.data.data.isnopasspay;
            var havearrears = res.data.data.havearrears;
            if (havearrears == "1") {
              that.getUnpayOrder();
              that.setState({
                // showlogin: false,
                // showpapay: false,
                // showopen: false,
                pay: true
              });
            }
            if (isnopasspay == "1") {
              console.log('---已开通免密open---');
              that.setState({
                pay: false
              });
            } else {
              that.setState({
                pay: true
              });
            }
            that.getShoppingOrder();
          } else {
            console.log('*********用户不存在***********1');
            try {
              _index2.default.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            _index3.globalData.haslogin = false;
          }
        }
      });
    }
  }, {
    key: 'getShoppingOrder',
    value: function getShoppingOrder() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'order/shoppingorder',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('---getShoppingOrder---');
          console.log(res);
          if (res.data.code == 200) {
            var result = res.data.data;
            var orderid = result.orderid;
            var machineid = result.machineid;
            var orderno = result.orderno;
            if (result.recogmode == 3) {
              //重力柜
              _index2.default.setStorage({
                key: "orderid",
                data: orderid
              });
              _index2.default.redirectTo({
                url: '/pages/index/shopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno + '&from=index'
              });
            } else {
              _index2.default.setStorage({
                key: "orderid",
                data: orderid
              });
              _index2.default.redirectTo({
                url: '/pages/index/cgshopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno
              });
            }
          }
        }
      });
    }
  }, {
    key: 'getUnpayOrder',
    value: function getUnpayOrder() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'order/unpayorder',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 200) {
            that.setState({
              unpayorder: res.data.data
            });
            //that.unpayorderLayer('open');
          } else {
            _index2.default.showToast({
              title: '获取未支付订单失败'
            });
          }
        }
      });
    }
  }, {
    key: 'unpayorderLayer',
    value: function unpayorderLayer(currentStatu) {
      //关闭  
      if (currentStatu == "close") {
        this.setState({
          showModalStatus: false
        });
      }
      // 显示  
      if (currentStatu == "open") {
        this.setState({
          showModalStatus: true
        });
      }
    }
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
            var orderid = res.data.data.orderid;
            var orderno = res.data.data.orderno;
            var recogmode = res.data.data.recogmode;
            that.setState({
              orderid: orderid
            });
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
              openfailed: false,
              islogin: false
            });
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
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
      var iNow = 0;
      var interval = setInterval(function () {
        var newtag = iNow++;
        that.setState({
          tag: newtag
        });
        //循环执行代码 
        if (requestfailed) {
          console.log('---循环执行代码 ---');
          that.openStatus();
        } else {
          that.setState({
            tag: 100
          });
          console.log('---停止循环执行代码 ---');
          clearInterval(interval);
        }
      }, 1000); //循环时间1秒 
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
            _index2.default.setStorageSync("orderid", that.state.orderid);
            // wx.setStorage({
            //   key: "orderid",
            //   data: that.data.orderid
            // });
            _index2.default.reLaunch({
              url: '../../index/index'
            });
          } else if (res.data.code == 211) {
            that.setState({
              requestfailed: false
            });
            requestfailed = false;
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {
                  _index2.default.navigateBack({});
                }
              }
            });
          } else {
            that.setState({
              requestfailed: true
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
    key: 'requestOpenStatus',
    value: function requestOpenStatus() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'device/requestopenstatus',
        data: {
          orderid: that.state.orderid
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
            var orderstatus = res.data.data.orderstatus;
            var doorstatus = res.data.data.doorstatus;
            _index2.default.setStorageSync("orderid", that.state.orderid);
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
    key: 'submitInfo',
    value: function submitInfo(e) {
      console.log('submitInfo');
      this.requestopen();
      var formid = e.detail.formId;
      _index2.default.setStorageSync("formId", e.detail.formId);
      console.log(e);
      var that = this;
      that.setState({
        formid: formid
      });
    }
  }, {
    key: 'requestopen',
    value: function requestopen() {
      //检测开门
      var formid_ = _index2.default.getStorageSync('formid');
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'device/requestopen',
        data: {
          qrurl: that.state.qrurl
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          console.log(res);
          _index2.default.hideLoading();
          //检测是否可以开门
          if (res.data.code == 200) {
            var machineid = res.data.data.machineid;
            var lockid = res.data.data.lockid;
            that.setState({
              machineid: machineid,
              lockid: lockid,
              showopen: true
            });
            _index2.default.hideLoading();
            _index2.default.reLaunch({
              url: '../open/open?machineid=' + machineid + '&lockid=' + lockid + '&formid=' + formid_.formid
            });
          } else if (res.data.code == 401) {
            _index2.default.hideLoading();
            _index2.default.reLaunch({
              url: '../../index/index'
            });
          } else {
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
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
  }, {
    key: 'gotoPapay',
    value: function gotoPapay() {
      var that = this;
      that.setState({
        papayPressed: true
      });
      _index2.default.request({
        method: 'POST',
        url: _index3.BASE_URL + 'pay/getPapayExtraData',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('免密返回参数');
          console.log(res.data);
          _index2.default.navigateToMiniProgram({
            appId: 'wxbd687630cd02ce1d',
            path: 'pages/index/index',
            extraData: {
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
          }).then(function (res) {
            console.log(res);
            that.getUserDetail();
          }).catch(function (error) {
            console.log(error);
          });
        },
        fail: function fail(res) {
          console.log(res);
          _index2.default.hideLoading();
        }
      });
    }
  }, {
    key: 'gotoHome',
    value: function gotoHome() {}
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

  return Qropen;
}(_index.Component), _class.properties = {}, _class.$$events = ["getPhoneNumber", "gotoPapay", "submitInfo"], _temp2);
exports.default = Qropen;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Qropen, true));