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

var $timer = 0;
var Bindcard = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Bindcard, _BaseComponent);

  function Bindcard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bindcard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bindcard.__proto__ || Object.getPrototypeOf(Bindcard)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["cards", "orderid", "isCard", "step1", "step2", "step3", "step", "cardid", "timerShow", "bindSuccess", "unbingImg", "info", "step1Img", "step2Img", "step3Img", "mhhImg", "stepcard", "screencard", "successcard", "carImg", "countDownNum"], _this.config = {
      navigationBarTitleText: '绑卡'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bindcard, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Bindcard.prototype.__proto__ || Object.getPrototypeOf(Bindcard.prototype), "_constructor", this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        orderid: '',
        isCard: false,
        step1: true,
        step2: false,
        step3: false,
        step: false,
        cardid: '',
        timerShow: false,
        bindSuccess: false,
        cards: [],
        unbingImg: _index3.PATH + '/mImages/unbingcard.png',
        info: _index3.PATH + '/mImages/infoNew.png',
        step1Img: _index3.PATH + '/mImages/step1.png',
        step2Img: _index3.PATH + '/mImages/step2.png',
        step3Img: _index3.PATH + '/mImages/step3.png',
        mhhImg: _index3.PATH + '/mImages/xydImg.png',
        stepcard: _index3.PATH + '/mImages/stepcard.png',
        screencard: _index3.PATH + '/mImages/screen1.png',
        successcard: _index3.PATH + '/mImages/success.png',
        carImg: _index3.PATH + '/mImages/mycard.png',
        countDownNum: 30
      };
      this.timer = 0;
      this.requestTimer = 0;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log(this.$router.params);
      //this.countDown()
      this.cardlist();
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
      var that = this;
      if (that.requestTimer != 0) {
        clearInterval(that.requestTimer);
      }
      if (that.timer != 0) {
        clearInterval(that.timer);
      }
    }
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
  }, {
    key: "cardlist",
    value: function cardlist() {
      var that = this;
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'card/cards',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          _index2.default.hideLoading();
          console.log(res.data);
          that.setState({
            cards: res.data.data
          });
        },
        fail: function fail(error) {
          _index2.default.hideLoading();
        }
      });
    }
  }, {
    key: "onbindCardFn",
    value: function onbindCardFn() {
      //console.log('绑定卡片')
      this.setState({
        step: true
      });
    }
  }, {
    key: "addbind",
    value: function addbind() {
      console.log('开始扫码');
      this.setState({
        step: true,
        step1: true
      });
    }
    //开始扫码

  }, {
    key: "onscan",
    value: function onscan() {
      var that = this;
      _index2.default.scanCode({}).then(function (res) {
        var qrurl = res.result;
        console.log('qrurl:' + qrurl);
        that.requestOpen(qrurl);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "requestOpen",
    value: function requestOpen(qrurl) {
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'card/bindmachine',
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
          if (res.data.code == 200) {
            that.setState({
              step1: false,
              step2: true,
              cardid: res.data.data,
              timerShow: true
            });
            that.countDown();
          } else if (res.data.code == 221) {
            _index2.default.showModal({
              title: '提示',
              content: '亲，两个人不能同时绑定亲情卡哦！',
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {}
              }
            });
          } else {
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {}
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
    key: "countDown",
    value: function countDown() {
      var that = this;
      var $countDownNum = that.state.countDownNum; //获取倒计时初始值
      //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
      this.timer = setInterval(function () {
        $countDownNum--;
        that.setState({
          countDownNum: $countDownNum
        });
        if ($countDownNum == 0) {
          clearInterval(that.timer);
          if (that.state.bindSuccess) {
            that.setState({
              step: false,
              step1: true,
              step2: false
            });
          } else {
            _index2.default.showModal({
              title: '提示',
              content: '操作超时，请重试',
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {
                  that.setState({
                    step: false,
                    step1: true,
                    step2: false
                  });
                }
              }
            });
          }
        }
      }, 1000);
      this.requestTimer = setInterval(function () {
        that.checkBindStatus();
      }, 2000);
    }
    //检查绑卡

  }, {
    key: "checkBindStatus",
    value: function checkBindStatus() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'card/bindstatus',
        data: {
          cardid: that.state.cardid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          if (res.data.code == 200) {
            console.log('到这里200');
            if (res.data.data == 1) {
              that.setState({
                step1: false,
                step2: false
              });
            } else if (res.data.data == 2) {
              clearInterval(that.requestTimer);
              _index2.default.hideLoading();
              that.setState({
                step1: false,
                step2: false,
                step3: true,
                bindSuccess: true
              });
            } else if (res.data.data == 3) {
              _index2.default.hideLoading();
              clearInterval(that.requestTimer);
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
            }
          }
        },
        fail: function fail(e) {
          console.log('到这里fail');
          _index2.default.showToast({
            title: '请求失败',
            icon: 'fail',
            duration: 2000
          });
        }
      });
    }
  }, {
    key: "unbind",
    value: function unbind(e) {
      _index2.default.showModal({
        title: '解绑实体卡',
        content: '确定解绑实体卡',
        showCancel: true,
        cancelText: '取消',
        confirmText: '确定',
        success: function success(res) {
          if (res.confirm) {
            _index2.default.request({
              method: 'POST',
              url: _index3.BASE_URL + 'card/unbind',
              data: {
                cardid: e.currentTarget.dataset.cardid
              },
              header: {
                'content-type': 'application/json',
                'token': _index3.globalData.token
              },
              success: function success(res) {
                console.log(res.data);
                _index2.default.showToast({
                  title: '解绑成功'
                });
                _index2.default.navigateBack({});
              }
            });
          }
        }
      });
    }
  }, {
    key: "detail",
    value: function detail(e) {
      var cardid = e.currentTarget.dataset.cardid;
      _index2.default.navigateTo({
        url: '/pages/orders/orderlist/orderlist?cardid=' + cardid
      });
    }
  }, {
    key: "done",
    value: function done() {
      //完成调用再次调用接口
      this.cardlist();
      this.setState({
        step: false,
        step1: true,
        step2: false,
        step3: false
      });
    }
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var cards = this.__state.cards;

      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Bindcard;
}(_index.Component), _class.properties = {}, _class.$$events = ["detail", "unbind", "addbind", "onscan", "done", "onbindCardFn"], _temp2);
exports.default = Bindcard;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Bindcard, true));