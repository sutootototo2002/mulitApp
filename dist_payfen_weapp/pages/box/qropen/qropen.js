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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Qropen.__proto__ || Object.getPrototypeOf(Qropen)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "formid", "lockid", "machineid", "orderid", "openfailed", "requestfailed", "pay", "num", "tag", "qrurl", "dw", "isReason", "haslogin", "showlogin", "showpapay", "showopen", "papayPressed", "showModalStatus", "unpayorder", "loadImg", "loadImg1", "loadImg2", "unpayImg", "unpriceImg", "unpayorderimg", "islogin", "markBoolean", "open", "unpay"], _this.config = {
      navigationBarTitleText: ''
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
        dw: _index3.PATH + 'dw.png',
        isReason: false,
        haslogin: false,
        showlogin: false,
        showpapay: false,
        showopen: false,
        papayPressed: false,
        showModalStatus: false,
        unpayorder: [],
        loadImg: _index3.PATH + 'openouter.png',
        loadImg1: _index3.PATH + 'smks-wzc.png',
        loadImg2: _index3.PATH + 'car.png',
        unpayImg: _index3.PATH + 'wfk-11.png',
        unpriceImg: _index3.PATH + 'wfk.png',
        unpayorderimg: _index3.PATH + 'unpay_info.png',
        islogin: false,
        markBoolean: false,
        open: false,
        unpay: false
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log('---onLoad---');
      _index2.default.setNavigationBarTitle({
        title: _index3.globalData.sysTitle
      });
      console.log(this.$router.params);
      this.setState({
        formid: this.$router.params.formid,
        lockid: this.$router.params.lockid,
        machineid: this.$router.params.machineid //"21e0211a094065ae25490fd4590aa7d1"||this.$router.params.machineid
      });
      var that = this;
      _index2.default.showLoading({
        title: ''
      });
      var qrurl = decodeURIComponent(this.$router.params.q);
      //var qrurl = 'https://testo.wemall.com.cn/clientapi?id=QT3111804100002&lockid=1-1-1';
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
              // Do something when catch error
              _index2.default.removeStorageSync('token');
              that.checkUser();
            }
          }
        });
      }).catch(function (error) {
        _index2.default.hideLoading();
        console.log('*********不存在token***********');
        console.log('----checkUser----');
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
              pay: true
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
              'token': _index3.globalData.token
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
                }
              }
            }
          });
        },
        fail: function fail(e) {
          //that.showLoginModal();
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
            that.setState({
              islogin: false
            });
            //
            var isscorepay = res.data.data.isscorepay;
            var havearrears = res.data.data.havearrears;
            if (havearrears == "1") {
              that.getUnpayOrder();
            }
            if (isscorepay == "1") {
              console.log('---已开通免密open---');
              that.setState({
                islogin: false,
                pay: false,
                open: true
              });
            } else {
              console.log('---未开通免密open---');
              that.setState({
                pay: true
              });
            }
            that.getShoppingOrder();
          } else {
            console.log('*********用户不存在***********1');
            that.setState({
              islogin: true
            });
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
              unpay: true,
              markBoolean: true,
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
      console.log('machined:' + this.state.machineid + "lockid:" + lockid + 'formid:' + this.state.formid);
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
          } else if (res.data.code == 235) {
            console.log('235');
            that.setState({
              requestfailed: true,
              markBoolean: true,
              isReason: true
            });
            requestfailed = false;
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
          //that.requestOpenStatus();
        }
      }.bind(this), 1000);
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
            openfailed: false
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
          } else if (res.data.code == 201) {
            _index2.default.showToast({
              title: '您有未结订单',
              icon: 'fail',
              duration: 2000
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
    key: 'payOrder',
    value: function payOrder() {
      var orderid = _index2.default.getStorageSync("orderid");
      //var orderid = this.data.unpayorder.orderid;
      this.setState({
        orderid: orderid
      });
      this.requestPay(orderid);
    }
    //发起支付

  }, {
    key: 'requestPay',
    value: function requestPay(orderid) {
      var that = this;
      _index2.default.showLoading({
        title: ''
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
          _index2.default.hideLoading();
          if (res.data.code == 200) {
            _index2.default.requestPayment({
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': res.data.data.signType,
              'paySign': res.data.data.paySign,
              'success': function success(res) {
                console.log('success', res);
                // wx.showModal({
                //   title: '提示',
                //   content: '支付成功',
                //   showCancel: false,
                //   success: function (res) {
                //     if (res.confirm) {
                //       that.queryPayStatus(orderid);
                //     }
                //   }
                // });
                that.queryPayStatus(orderid);
              },
              'fail': function fail(res) {
                console.log('fail', res);
                //edit at 0606
                _index2.default.showModal({
                  title: '提示',
                  content: '支付失败，请重新支付',
                  showCancel: false,
                  success: function success(res) {
                    // if (res.confirm) {
                    //   that.updatePayStatus(0, orderid);
                    //   that.getUnpayOrder();
                    // }
                  }
                });
              }
            });
          } else {
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            });
          }
        }
      });
    }
    //支付接口

  }, {
    key: 'queryPayStatus',
    value: function queryPayStatus(orderid) {
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
            if (res.data.data.orderstatus == 5) {
              console.log('----payed---');
              clearInterval(intervalOrderStatus);
              _index2.default.hideLoading();
              that.setState({
                unpay: false,
                markBoolean: false
              });
              that.getUserDetail();
            }
          }
        });
      }, 2000); //循环时间2秒
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
            that.setState({
              pay: false
            });
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
    key: 'gotopayfen',
    value: function gotopayfen() {
      console.log('开启支付分');
      this.start();
    }
  }, {
    key: 'start',
    value: function start() {
      _index2.default.request({
        url: _index3.BASE_URL + 'user/startOpenSmartPay',
        data: '',
        method: 'GET',
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          var extraData = {
            mch_id: res.data.data.mch_id,
            service_id: res.data.data.service_id,
            out_request_no: res.data.data.out_request_no,
            timestamp: res.data.data.timestamp,
            nonce_str: res.data.data.nonce_str,
            sign_type: res.data.data.sign_type,
            sign: res.data.data.sign
          };
          console.log(extraData);
          wx.openBusinessView({
            businessType: 'wxpayScoreEnable',
            extraData: extraData,
            envVersion: 'release'
          });
        }
      });
    }
  }, {
    key: 'onconcel',
    value: function onconcel() {
      _index2.default.redirectTo({
        url: '/pages/index/index'
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
      var anonymousState__temp = this.__state.unpay ? (this.__state.unpayorder.payfee / 100).toFixed(2) : null;
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }]);

  return Qropen;
}(_index.Component), _class.properties = {}, _class.$$events = ["getPhoneNumber", "gotopayfen", "submitInfo", "payOrder", "onconcel"], _temp2);
exports.default = Qropen;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Qropen, true));