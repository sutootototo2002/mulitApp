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

var Recharge = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Recharge, _BaseComponent);

  function Recharge() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Recharge);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recharge.__proto__ || Object.getPrototypeOf(Recharge)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "loopArray0", "loopArray1", "navList", "logList", "mhhImg", "avatar", "tempavatar", "arrow", "ad", "del", "answer", "mm", "isMM", "fee", "curNav", "curIndex", "realmoney", "wishes", "ispayvalue", "payvalue", "curPage", "logs", "total", "hasnext", "successboolean", "markBoolean"], _this.config = {
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
        mhhImg: _index3.PATH + '/mImages/xydImg.png',
        avatar: '',
        tempavatar: '/mImages/tempavator.png',
        arrow: _index3.PATH + '/mImages/arrow.png',
        ad: _index3.PATH + '/mImages/ad.png',
        del: _index3.PATH + '/mImages/gban.png',
        answer: _index3.PATH + '/mImages/bzzx.png',
        mm: _index3.PATH + '/mImages/mm.png',
        isMM: true,
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
        markBoolean: false
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
    key: "onCloseSuccess",
    value: function onCloseSuccess() {
      console.log('关闭成功');
      this.setState({
        successboolean: false,
        markBoolean: false
      });
      this.getUserDetail();
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
            ismm = false;
          } else {
            ismm = true;
          }
          var fee = res.data.data.fee;
          that.setState({
            fee: fee,
            isMM: ismm
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
        console.log("成功");
        console.log(res.data);
        var orderid = res.data.data.orderid;
        that.onPay(orderid);
      }).catch(function (error) {
        console.log("接口异常");
        console.log(error);
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
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state = this.__state,
          navList = _state.navList,
          logList = _state.logList;


      var price_format = function price_format(data) {
        var str = data / 100;
        var str1 = str.toFixed(2);
        return str1;
      };
      var anonymousState__temp3 = price_format(this.__state.fee);
      var anonymousState__temp4 = this.__state.ispayvalue ? Number(this.__state.payvalue.fee) / 100 + Number(this.__state.payvalue.giftfee) / 100 : null;
      var anonymousState__temp5 = this.__state.successboolean ? Number(this.__state.payvalue.fee) / 100 + Number(this.__state.payvalue.giftfee) / 100 : null;
      var loopArray0 = navList.map(function (post, index) {
        post = {
          $original: (0, _index.internal_get_original)(post)
        };
        var $loopState__temp2 = Number(post.$original.fee) / 100 + Number(post.$original.giftfee) / 100;
        return {
          $loopState__temp2: $loopState__temp2,
          $original: post.$original
        };
      });
      var loopArray1 = logList.map(function (posts) {
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
      Object.assign(this.__state, {
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        loopArray0: loopArray0,
        loopArray1: loopArray1
      });
      return this.__state;
    }
  }]);

  return Recharge;
}(_index.Component), _class.properties = {}, _class.$$events = ["onselectNav", "onClose", "onAnswer", "ongenerateorder", "onCloseSuccess", "onMM"], _temp2);
exports.default = Recharge;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Recharge, true));