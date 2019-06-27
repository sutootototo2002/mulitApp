<<<<<<< HEAD
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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Qropen.__proto__ || Object.getPrototypeOf(Qropen)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "formid", "lockid", "machineid", "orderid", "openfailed", "requestfailed", "pay", "num", "tag", "qrurl", "haslogin", "showlogin", "showpapay", "showopen", "papayPressed", "showModalStatus", "unpayorder", "loadImg", "loadImg1", "loadImg2", "unpayImg", "unpriceImg", "islogin", "markBoolean", "open", "unpay"], _this.config = {
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
        haslogin: false,
        showlogin: false,
        showpapay: false,
        showopen: false,
        papayPressed: false,
        showModalStatus: false,
        unpayorder: [],
        loadImg: _index3.PATH + '/mImages/openouter.png',
        loadImg1: _index3.PATH + '/mImages/smks-wzc.png',
        loadImg2: _index3.PATH + '/mImages/car.png',
        unpayImg: _index3.PATH + '/mImages/wfk-11.png',
        unpriceImg: _index3.PATH + '/mImages/wfk.png',
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
        machineid: this.$router.params.machineid
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
<<<<<<< HEAD
      }, 1000);
=======
      }, 2000);
>>>>>>> 0309acd... 微信小程序免密版--心愿单
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
            var isnopasspay = res.data.data.isnopasspay;
            var havearrears = res.data.data.havearrears;
            if (havearrears == "1") {
              that.getUnpayOrder();
            }
            if (isnopasspay == "1") {
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
}(_index.Component), _class.properties = {}, _class.$$events = ["getPhoneNumber", "gotoPapay", "submitInfo", "payOrder"], _temp2);
exports.default = Qropen;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Qropen, true));
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,intervalPapay,intervalOrderStatus,requestfailed,_createClass=function(){function o(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,a){return t&&o(e.prototype,t),a&&o(e,a),e}}(),_get=function e(t,a,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,a);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,a,o)}if("value"in n)return n.value;var d=n.get;return void 0!==d?d.call(o):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js"),_util=require("../../../utils/util.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var orderid="",Qropen=(_temp2=_class=function(e){function d(){var e,t,a;_classCallCheck(this,d);for(var o=arguments.length,n=Array(o),i=0;i<o;i++)n[i]=arguments[i];return(t=a=_possibleConstructorReturn(this,(e=d.__proto__||Object.getPrototypeOf(d)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp","formid","lockid","machineid","orderid","openfailed","requestfailed","pay","num","tag","qrurl","haslogin","showlogin","showpapay","showopen","papayPressed","showModalStatus","unpayorder","loadImg","loadImg1","loadImg2","unpayImg","unpriceImg","islogin","markBoolean","open","unpay"],a.config={navigationBarTitleText:""},a.$$refs=[],_possibleConstructorReturn(a,t)}return _inherits(d,_index.Component),_createClass(d,[{key:"_constructor",value:function(e){_get(d.prototype.__proto__||Object.getPrototypeOf(d.prototype),"_constructor",this).call(this,e),this.state={formid:"",lockid:"",machineid:"",orderid:"",openfailed:!1,requestfailed:!0,pay:!1,num:0,tag:100,qrurl:"",haslogin:!1,showlogin:!1,showpapay:!1,showopen:!1,papayPressed:!1,showModalStatus:!1,unpayorder:[],loadImg:_index3.PATH+"/mImages/openouter.png",loadImg1:_index3.PATH+"/mImages/smks-wzc.png",loadImg2:_index3.PATH+"/mImages/car.png",unpayImg:_index3.PATH+"/mImages/wfk-11.png",unpriceImg:_index3.PATH+"/mImages/wfk.png",islogin:!1,markBoolean:!1,open:!1,unpay:!1}}},{key:"componentWillMount",value:function(){console.log("---onLoad---"),_index2.default.setNavigationBarTitle({title:_index3.globalData.sysTitle}),console.log(this.$router.params),this.setState({formid:this.$router.params.formid,lockid:this.$router.params.lockid,machineid:this.$router.params.machineid});var a=this;_index2.default.showLoading({title:""});var e=decodeURIComponent(this.$router.params.q);a.setState({qrurl:e}),_index2.default.getStorage({key:"token"}).then(function(e){var t=e.data;_index2.default.request({url:_index3.BASE_URL+"token/verifyToken",data:{token:t},header:{"content-type":"application/json",token:t},success:function(e){console.log(e),200==e.data.code?(console.log("*********token 有效***********"),_index3.globalData.token=t,_index3.globalData.haslogin=!0,a.getUserDetail()):(_index2.default.hideLoading(),console.log("*********token 过期***********1"),_index2.default.removeStorageSync("token"),a.checkUser())}})}).catch(function(e){_index2.default.hideLoading(),console.log("*********不存在token***********"),console.log("----checkUser----"),a.checkUser()})}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){console.log("---onShow----");var e=this;setTimeout(function(){e.getUserDetail()},2e3)}},{key:"componentDidHide",value:function(){}},{key:"componentDidCatchError",value:function(){}},{key:"getPhoneNumber",value:function(a){console.log(a.detail.errMsg);var o=this;if("getPhoneNumber:ok"==a.detail.errMsg){o=this;_index2.default.login().then(function(e){console.log(e);var t=e.code;console.log("开始登录:"+t),(0,_util.login)(t,a.detail.encryptedData,a.detail.iv,function(e){_index2.default.showToast({title:"登陆成功",icon:"success",duration:500}),o.setState({islogin:!1,pay:!0})},function(e){_index2.default.showToast({title:"登陆失败,请再按一下",icon:"fail",duration:500})})}).catch(function(e){console.log(e)})}}},{key:"showLoginModal",value:function(){this.setState({showlogin:!0,showpapay:!1})}},{key:"checkUser",value:function(){_index2.default.showLoading({title:""});var a=this;_index2.default.login({success:function(e){var t=e.code;console.log("START LOGIN:"+t),_index2.default.request({url:_index3.BASE_URL+"token/checkUser",data:{code:t},header:{"content-type":"application/json",token:_index3.globalData.token},method:"GET",success:function(e){_index2.default.hideLoading(),console.log(e.data),200==e.data.code&&""!=e.data.data&&(console.log("服务器登录成功"),_index2.default.setStorage({key:"token",data:e.data.data}),_index3.globalData.token=e.data.data,_index3.globalData.haslogin=!0,a.getUserDetail())}})},fail:function(e){}})}},{key:"getUserDetail",value:function(){_index2.default.showLoading({title:""});var a=this;_index2.default.request({url:_index3.BASE_URL+"user/detail",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){if(console.log("用户信息："),console.log(e),_index2.default.hideLoading(),200==e.data.code){_index3.globalData.haslogin=!0,a.setState({islogin:!1});var t=e.data.data.isnopasspay;"1"==e.data.data.havearrears&&a.getUnpayOrder(),"1"==t?(console.log("---已开通免密open---"),a.setState({islogin:!1,pay:!1,open:!0})):(console.log("---未开通免密open---"),a.setState({pay:!0})),a.getShoppingOrder()}else{console.log("*********用户不存在***********1"),a.setState({islogin:!0});try{_index2.default.removeStorageSync("token")}catch(e){}_index3.globalData.haslogin=!1}}})}},{key:"getShoppingOrder",value:function(){_index2.default.request({url:_index3.BASE_URL+"order/shoppingorder",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){if(console.log("---getShoppingOrder---"),console.log(e),200==e.data.code){var t=e.data.data,a=t.orderid,o=t.machineid,n=t.orderno;3==t.recogmode?(_index2.default.setStorage({key:"orderid",data:a}),_index2.default.redirectTo({url:"/pages/index/shopping/index?orderid="+a+"&machineid="+o+"&orderno="+n+"&from=index"})):(_index2.default.setStorage({key:"orderid",data:a}),_index2.default.redirectTo({url:"/pages/index/cgshopping/index?orderid="+a+"&machineid="+o+"&orderno="+n}))}}})}},{key:"getUnpayOrder",value:function(){var t=this;_index2.default.request({url:_index3.BASE_URL+"order/unpayorder",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){200==e.data.code?t.setState({unpay:!0,markBoolean:!0,unpayorder:e.data.data}):_index2.default.showToast({title:"获取未支付订单失败"})}})}},{key:"unpayorderLayer",value:function(e){"close"==e&&this.setState({showModalStatus:!1}),"open"==e&&this.setState({showModalStatus:!0})}},{key:"deviceOpen",value:function(n,e){console.log("machined:"+this.state.machineid+"lockid:"+e+"formid:"+this.state.formid),_index2.default.showLoading({title:""});var i=this;_index2.default.request({url:_index3.BASE_URL+"device/open",data:{machineid:n,lockid:e,formid:i.state.formid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(_index2.default.hideLoading(),200==e.data.code){var t=e.data.data.orderid,a=e.data.data.orderno,o=e.data.data.recogmode;i.setState({orderid:t}),3==o?(_index2.default.setStorageSync("orderid",t),_index2.default.redirectTo({url:"../../index/shopping/index?orderid="+t+"&machineid="+n+"&orderno="+a+"&from=open"})):(_index2.default.setStorageSync("orderid",t),_index2.default.redirectTo({url:"../../index/cgshopping/index?orderid="+t+"&machineid="+n+"&orderno="+a}))}else i.setState({openfailed:!1,islogin:!1}),_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1,success:function(e){e.confirm&&_index2.default.reLaunch({url:"../../index/index"})}})},fail:function(e){_index2.default.showModal({title:"提示",content:"请求失败，请稍后再试",showCancel:!1,success:function(e){e.confirm&&_index2.default.reLaunch({url:"../../index/index"})}})}})}},{key:"tryagain",value:function(){_index2.default.redirectTo({url:"/pages/index/index"})}},{key:"open",value:function(){var t=this,a=0,o=setInterval(function(){var e=a++;t.setState({tag:e}),requestfailed?(console.log("---循环执行代码 ---"),t.openStatus()):(t.setState({tag:100}),console.log("---停止循环执行代码 ---"),clearInterval(o))},1e3);setTimeout(function(){requestfailed&&(clearInterval(o),t.requestOpenStatus())}.bind(this),6e4)}},{key:"openStatus",value:function(){var t=this;orderid=_index2.default.getStorageSync("orderid"),console.log("orderid:"),console.log(orderid),_index2.default.request({url:_index3.BASE_URL+"device/openstatus",data:{orderid:orderid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){200==e.data.code?(t.setState({requestfailed:!1}),requestfailed=!1,_index2.default.setStorageSync("orderid",t.state.orderid),_index2.default.reLaunch({url:"../../index/index"})):211==e.data.code?(t.setState({requestfailed:!1}),requestfailed=!1,_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1,success:function(e){e.confirm&&_index2.default.navigateBack({})}})):t.setState({requestfailed:!0})},fail:function(e){t.setState({openfailed:!1})}})}},{key:"requestOpenStatus",value:function(){var t=this;_index2.default.request({url:_index3.BASE_URL+"device/requestopenstatus",data:{orderid:t.state.orderid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(200==e.data.code){t.setState({requestfailed:!1});e.data.data.orderstatus,e.data.data.doorstatus;_index2.default.setStorageSync("orderid",t.state.orderid),_index2.default.redirectTo({url:"../../index/index"})}else t.setState({openfailed:!0})},fail:function(e){t.setState({openfailed:!0})}})}},{key:"submitInfo",value:function(e){console.log("submitInfo"),this.requestopen();var t=e.detail.formId;_index2.default.setStorageSync("formId",e.detail.formId),console.log(e);this.setState({formid:t})}},{key:"requestopen",value:function(){var o=_index2.default.getStorageSync("formid");_index2.default.showLoading({title:""});var n=this;_index2.default.request({url:_index3.BASE_URL+"device/requestopen",data:{qrurl:n.state.qrurl},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(console.log(e),_index2.default.hideLoading(),200==e.data.code){var t=e.data.data.machineid,a=e.data.data.lockid;n.setState({machineid:t,lockid:a,showopen:!0}),_index2.default.hideLoading(),_index2.default.reLaunch({url:"../open/open?machineid="+t+"&lockid="+a+"&formid="+o.formid})}else 401==e.data.code?(_index2.default.hideLoading(),_index2.default.reLaunch({url:"../../index/index"})):_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1,success:function(e){e.confirm&&_index2.default.reLaunch({url:"../../index/index"})}})},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"payOrder",value:function(){var e=_index2.default.getStorageSync("orderid");this.setState({orderid:e}),this.requestPay(e)}},{key:"requestPay",value:function(t){var a=this;_index2.default.showLoading({title:""}),_index2.default.request({method:"POST",data:{orderid:t},url:_index3.BASE_URL+"pay/getPreGoodsOrder",header:{Accept:"application/json","content-type":"application/x-www-form-urlencoded",token:_index3.globalData.token},success:function(e){_index2.default.hideLoading(),200==e.data.code?_index2.default.requestPayment({timeStamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:e.data.data.signType,paySign:e.data.data.paySign,success:function(e){console.log("success",e),a.queryPayStatus(t)},fail:function(e){console.log("fail",e),_index2.default.showModal({title:"提示",content:"支付失败，请重新支付",showCancel:!1,success:function(e){}})}}):_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1})}})}},{key:"queryPayStatus",value:function(e){var t=this;_index2.default.showLoading({title:"等待支付结果..."}),intervalOrderStatus=setInterval(function(){_index2.default.request({method:"POST",data:{orderid:e},url:_index3.BASE_URL+"order/paystatus",header:{Accept:"application/json",token:_index3.globalData.token},success:function(e){console.log(e.data.data),5==e.data.data.orderstatus&&(console.log("----payed---"),clearInterval(intervalOrderStatus),_index2.default.hideLoading(),t.setState({unpay:!1,markBoolean:!1}),t.getUserDetail())}})},2e3)}},{key:"gotoPapay",value:function(){var t=this;t.setState({papayPressed:!0}),_index2.default.request({method:"POST",url:_index3.BASE_URL+"pay/getPapayExtraData",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("免密返回参数"),console.log(e.data),_index2.default.navigateToMiniProgram({appId:"wxbd687630cd02ce1d",path:"pages/index/index",extraData:{appid:e.data.appid,contract_code:e.data.contract_code,contract_display_account:e.data.contract_display_account,mch_id:e.data.mch_id,notify_url:e.data.notify_url,plan_id:e.data.plan_id,request_serial:e.data.request_serial,timestamp:e.data.timestamp,sign:e.data.sign}}).then(function(e){console.log(e),t.setState({pay:!1}),t.getUserDetail()}).catch(function(e){console.log(e)})},fail:function(e){console.log(e),_index2.default.hideLoading()}})}},{key:"gotoHome",value:function(){}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];var e=this.__state.unpay?(this.__state.unpayorder.payfee/100).toFixed(2):null;return Object.assign(this.__state,{anonymousState__temp:e}),this.__state}}]),d}(),_class.properties={},_class.$$events=["getPhoneNumber","gotoPapay","submitInfo","payOrder"],_temp2);exports.default=Qropen,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Qropen,!0));
>>>>>>> b7c6447... 微信小程序免密版更新
