"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var count = 0;
var Recharge = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Recharge, _BaseComponent);

  function Recharge() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Recharge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recharge.__proto__ || Object.getPrototypeOf(Recharge)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp11", "anonymousState__temp12", "anonymousState__temp13", "anonymousState__temp14", "loopArray0", "loopArray1", "navList", "isMM", "logList", "globalData", "mhhImg", "avatar", "tempavatar", "arrow", "del", "answer", "mm", "fee", "curNav", "curIndex", "realmoney", "wishes", "ispayvalue", "payvalue", "curPage", "logs", "total", "hasnext", "successboolean", "markBoolean", "Loadingtime", "count", "iscz"], _this.config = {
      navigationBarTitleText: '我的储值'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Recharge, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Recharge.prototype.__proto__ || Object.getPrototypeOf(Recharge.prototype), "_constructor", this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        mhhImg: _index3.PATH + 'xydImg.png',
        avatar: '',
        tempavatar: _index3.PATH + 'tempavator.png',
        arrow: _index3.PATH + 'arrow1.png',
        del: _index3.PATH + 'gban.png',
        answer: _index3.PATH + 'bzzx.png',
        mm: _index3.PATH + 'mm.png',
        isMM: false,
        fee: 0,
        curNav: '',
        curIndex: 0,
        realmoney: 0,
        wishes: [],
        navList: [],
        ispayvalue: false,
        payvalue: {},
        curPage: 1,
        logs: [],
        total: 0,
        hasnext: true,
        successboolean: false,
        logList: [],
        markBoolean: false,
        Loadingtime: 0,
        count: 0,
        iscz: true
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('---onload-rechange---');
      console.log(this.$router.params);
      this.setState({
        avatar: this.$router.params.avatar,
        fee: this.$router.params.fee
      });
      this.getUserDetail();
      this.onloadData();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // console.log('-------onshow-----')
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
    //关闭

  }, {
    key: "onClose",
    value: function onClose() {
      console.log('关闭弹出');
      this.setState({
        ispayvalue: false,
        markBoolean: false
      });
    }
  }, {
    key: "onClose1",
    value: function onClose1() {
      console.log('关闭弹出');
      this.setState({
        successboolean: false,
        markBoolean: false
      });
    }
  }, {
    key: "onCloseSuccess",
    value: function onCloseSuccess() {
      var that = this;
      console.log('关闭成功');
      var time = setInterval(function () {
        console.log("count:");
        console.log(that.state.count++);
        _index2.default.showLoading({
          title: ''
        });
        if (that.state.count >= 5) {
          clearInterval(time);
          console.log('出来出来');
          _index2.default.hideLoading();
          that.getUserDetail();
          if (Number(that.state.fee / 100) >= 100) {
            console.log('大于100');
            that.onScreen();
            that.setState({
              successboolean: false,
              markBoolean: false
            });
          } else {
            that.gohome();
          }
        }
      }, 1000);
    }
    //获取列表

  }, {
    key: "onloadData",
    value: function onloadData() {
      var _this2 = this;

      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'recharge/activity',
        data: {
          x: '',
          y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        }
      }).then(function (res) {
        _index2.default.hideLoading();
        console.log('getuser:');
        console.log(res.data.data);
        that.setState({
          navList: res.data.data,
          curNav: res.data.data[0].activityid,
          curIndex: 0,
          realmoney: parseFloat(res.data.data[0].fee) + parseFloat(res.data.data[0].giftfee)
        });
        _this2.getLogs();
      });
    }
  }, {
    key: "getUserDetail",
    value: function getUserDetail() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'user/detail',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('获取用户信息：');
          console.log(res);
          var ismm = false;
          if (res.data.data.isscorepay == "1") {
            ismm = true;
          } else {
            ismm = false;
          }
          var fee = res.data.data.fee;
          that.setState({
            fee: fee,
            isMM: ismm
          });
        },
        fail: function fail(res) {
          _index2.default.showToast({
            title: '请检查网络',
            icon: 'fail',
            duration: 1000
          });
        }
      });
    }
  }, {
    key: "getLogs",
    value: function getLogs() {
      var that = this;
      var page = this.state.curPage;
      this.setState({
        curPage: page
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'recharge/logs',
        data: {
          page: page
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
          // complete: function (e) {
          //   wx.hideLoading();
          // }
        } }).then(function (res) {
        console.log("logs是什么鬼");
        console.log(res.data.data.data);
        that.setState({
          logList: res.data.data.data,
          total: res.data.total,
          hasnext: res.data.hasnext
        });
        // var page = res.data.data.page;
        // var total = res.data.data.total;
        // var hasnext = res.data.data.hasnext;
        // var logs = res.data.data.data;
        // var listData = that.state.logs;
        // for (var i = 0; i < logs.length; i++) {
        //   listData.push(logs[i]);
        // }
        // that.setState({
        //   logs: listData,
        //   total: total,
        //   hasnext: hasnext
        // })
      }).catch(function (error) {
        console.log(error);
      });
    }
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "onCallback",
    value: function onCallback(res) {
      console.log('callback数据recharge');
      console.log(res);
      _index2.default.setStorageSync('usersinfo', res.data);
    }
  }, {
    key: "onselectNav",
    value: function onselectNav(event) {
      var id = event.currentTarget.dataset.money.activityid;
      var payvalue = event.currentTarget.dataset.money;
      var curIndex = event.currentTarget.dataset.key;
      console.log(event);
      console.log(curIndex);
      this.setState({
        curNav: id,
        curIndex: curIndex,
        ispayvalue: true,
        markBoolean: true,
        payvalue: payvalue
      });
    }
  }, {
    key: "ongenerateorder",
    value: function ongenerateorder(e) {
      var _this3 = this;

      this.setState({
        iscz: false
      });
      if (!this.state.iscz) {
        _index2.default.showToast({
          title: '操作过于频繁，请稍后再试！',
          icon: 'fail',
          duration: 2000
        });
        return;
      }
      console.log('点击充值');
      console.log(e);
      var that = this;
      var formid = e.detail.formId;
      //生成订单
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        method: 'POST',
        url: _index3.BASE_URL + 'recharge/generateorder',
        data: {
          activityid: this.state.curNav,
          formid: formid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        }
      }).then(function (res) {
        _this3.setState({
          iscz: true
        });
        console.log("成功");
        console.log(res.data);
        var orderid = res.data.data.orderid;
        that.onPay(orderid);
      }).catch(function (error) {
        console.log("接口异常");
        console.log(error);
        _this3.setState({
          iscz: true
        });
      });
    }
  }, {
    key: "updatePayStatus",
    value: function updatePayStatus(status, orderid) {
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        method: 'POST',
        data: {
          'status': status,
          'orderid': orderid
        },
        url: _index3.BASE_URL + 'recharge/orderpaystatus',
        header: {
          'Accept': 'application/json',
          'token': _index3.globalData.token
        }
      }).then(function (res) {
        console.log("updatePayStatus:");
        console.log(res.data);
        _index2.default.hideLoading();
        // wx.navigateBack();
      }).catch(function (res) {});
    }
  }, {
    key: "requestOpen",
    value: function requestOpen(qrurl) {
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'device/requestopen',
        data: {
          qrurl: qrurl
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          _index2.default.hideLoading();
          //检测是否可以开门
          console.log("检测是否可以开门");
          console.log(res);
          if (res.data.code == 200) {
            var machineid = res.data.data.machineid;
            var lockid = res.data.data.lockid;
            _index2.default.reLaunch({
              url: '../box/open/open?machineid=' + machineid + '&lockid=' + lockid + '&formid='
            });
          } else if (res.data.code == 201) {
            _index2.default.showToast({
              title: '您有未结订单',
              icon: 'fail',
              duration: 2000
            });
          } else {
            console.log('失败！');
            _index2.default.showToast({
              title: "机柜二维码错误",
              icon: 'fail',
              duration: 2000
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
    key: "onScreen",
    value: function onScreen() {
      console.log('扫码开门');
      //未支付订单判断还没有写
      var that = this;
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'device/checkscan',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST"
      }).then(function (res) {
        console.log("扫码是否成功：");
        console.log(res);
        _index2.default.hideLoading();
        if (res.data.code == 200) {
          //扫码二维码
          _index2.default.scanCode().then(function (res) {
            //扫码二维码结果
            console.log(res);
            console.log(res.result);
            that.requestOpen(res.result);
          }).catch(function (res) {
            console.log(res);
          });
        }
        if (res.data.code == 201) {
          console.log('您有未结订单');
          _index2.default.showToast({
            title: '您有未结订单',
            icon: 'fail',
            duration: 2000
          });
          that.gohome();
        }
        if (res.data.code == 202) {
          console.log('您已被加入黑名单');
          _index2.default.showToast({
            title: '您的帐号异常！',
            icon: 'fail',
            duration: 2000
          });
          that.gohome();
        }
        if (res.data.code == 205) {
          console.log('用户未登录');
          _index2.default.showToast({
            title: '用户未登录',
            icon: 'fail',
            duration: 2000
          });
          that.gohome();
        }
        if (res.data.code == 206) {
          console.log('请开通支付分');
          // Taro.showToast({
          //   title: '请开通支付分',
          //   icon: 'fail',
          //   duration: 2000
          // })
          that.gohome();
        }
      });
    }
  }, {
    key: "onPay",
    value: function onPay(orderid) {
      //去付款
      console.log('去付款');
      var that = this;
      _index2.default.request({
        method: 'POST',
        data: {
          'orderid': orderid
        },
        url: _index3.BASE_URL + 'pay/getPreRechargeOrder',
        header: {
          'Accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'token': _index3.globalData.token
        }
      }).then(function (res) {
        console.log(res.data);
        _index2.default.hideLoading();
        if (res.data.code == 200) {
          _index2.default.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign
          }).then(function (res) {
            console.log('success', res);
            _index3.globalData.needrefresh = true;
            that.updatePayStatus(1, orderid);
            that.onloadData();
            that.getUserDetail();
            that.setState({
              ispayvalue: false,
              //markBoolean:false,
              successboolean: true
            });
            // Taro.navigateTo({
            //   url: '/pages/recharge/rechargesuccess?fee=' + (parseFloat(that.data.money) + parseFloat(that.data.realmoney)) / 100
            // })
            // Taro.showModal({
            //   title: '提示',
            //   content: '储值成功',
            //   showCancel: false,
            //   success: function (res) {
            //     if (res.confirm) {
            //       globalData.needrefresh = true;
            //       //that.updatePayStatus(1, orderid);
            //       //that.loadData();
            //     }
            //   }
            // });
          }).catch(function (error) {
            console.log(error);
            console.log('fail', res);
            that.updatePayStatus(0, orderid);
          });
        } else {
          _index2.default.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          });
        }
      });
    }
  }, {
    key: "gohome",
    value: function gohome() {
      _index2.default.redirectTo({
        url: '/pages/index/index'
      });
    }
  }, {
    key: "onAnswer",
    value: function onAnswer() {
      console.log('有疑问请点击这里');
    }
  }, {
    key: "onMM",
    value: function onMM() {
      //开通免密
      //检查是否需要开通，如果已经开通就关闭
      console.log('开启支付分');
      this.start();
    }
    //开启支付分
    //   gotopayfen(){
    //     console.log('开启支付分')
    //     this.start();
    //  }

  }, {
    key: "start",
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
    key: "_createData",
    value: function _createData() {
      var _this4 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state = this.__state,
          navList = _state.navList,
          logList = _state.logList,
          isMM = _state.isMM;


      var price_format = function price_format(data) {
        var str = data / 100;
        var str1 = str.toFixed(2);
        return str1;
      };
      var anonymousState__temp11 = price_format(this.__state.fee);
      var anonymousState__temp12 = this.__state.ispayvalue ? (this.__state.payvalue.fee / 100).toFixed(2) : null;
      var anonymousState__temp13 = this.__state.ispayvalue ? (Number(this.__state.payvalue.fee) / 100 + Number(this.__state.payvalue.giftfee) / 100).toFixed(2) : null;
      var anonymousState__temp14 = price_format(this.__state.fee);
      var loopArray0 = logList.map(function (posts) {
        posts = {
          $original: (0, _index.internal_get_original)(posts)
        };

        var name = '';
        if (posts.$original.logtype == '1') {
          name = '储值';
        }
        if (posts.$original.logtype == '2') {
          name = '消费';
        }
        if (posts.$original.logtype == '3') {
          name = '退款';
        }
        if (posts.$original.logtype == '4') {
          name = '取现';
        }
        return {
          name: name,
          $original: posts.$original
        };
      });
      var loopArray1 = navList.map(function (post, index) {
        post = {
          $original: (0, _index.internal_get_original)(post)
        };
        var $loopState__temp10 = null;
        var $loopState__temp8 = null;
        var $loopState__temp6 = Number(post.$original.fee) / 100 + Number(post.$original.giftfee) / 100 + Number(price_format(_this4.__state.fee)) >= 100;
        var $loopState__temp4 = null;
        var $loopState__temp2 = null;

        if (isMM) {
          $loopState__temp2 = (Number(post.$original.giftfee) / 100).toFixed(2);
          $loopState__temp4 = (Number(post.$original.fee) / 100 + Number(post.$original.giftfee) / 100).toFixed(2);
        } else {
          if ($loopState__temp6) {
            console.log(Number(post.$original.fee) / 100 + Number(post.$original.giftfee) / 100 + Number(price_format(_this4.__state.fee)));
            $loopState__temp8 = (Number(post.$original.giftfee) / 100).toFixed(2);
            $loopState__temp10 = (Number(post.$original.fee) / 100 + Number(post.$original.giftfee) / 100).toFixed(2);
          }
        }
        return {
          $loopState__temp10: $loopState__temp10,
          $loopState__temp8: $loopState__temp8,
          $loopState__temp6: $loopState__temp6,
          $loopState__temp4: $loopState__temp4,
          $loopState__temp2: $loopState__temp2,
          $original: post.$original
        };
      });
      Object.assign(this.__state, {
        anonymousState__temp11: anonymousState__temp11,
        anonymousState__temp12: anonymousState__temp12,
        anonymousState__temp13: anonymousState__temp13,
        anonymousState__temp14: anonymousState__temp14,
        loopArray0: loopArray0,
        loopArray1: loopArray1,
        globalData: _index3.globalData
      });
      return this.__state;
    }
  }]);

  return Recharge;
}(_index.Component), _class.properties = {}, _class.$$events = ["onselectNav", "onClose", "onAnswer", "ongenerateorder", "onClose1", "onCloseSuccess", "gohome"], _temp2);
exports.default = Recharge;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Recharge, true));