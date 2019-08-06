"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./npm/_tarojs/async-await/index.js");

var _index = require("./npm/_tarojs/taro-alipay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./config/index.js");

var _variables = require("./variables.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 全局引入一次即可

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    var _this = _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).apply(this, arguments));
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */


    _this.config = {
      pages: ['pages/index/index', 'pages/personal/index', 'pages/recharge/recharge', 'pages/wish/likes/myheart', 'pages/login/login', 'pages/service/service', 'pages/index/shopping/index', 'pages/index/cgshopping/index', 'pages/orders/orderdetail/orderdetail', 'pages/orders/orderlist/orderlist', 'pages/box/boxdetail/boxdetail', 'pages/card/bindcard', 'pages/box/open/open', 'pages/box/qropen/qropen', 'pages/refund/refund'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#ff9409',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      },
      "navigateToMiniProgramAppIdList": ["wxbd687630cd02ce1d", "wx9b0e57d73efd4ba1"],
      "permission": {
        "scope.userLocation": {
          "desc": "你的位置信息将用于帮您寻找附近的机柜"
        }
      }
    };
    return _this;
  }

  _createClass(_App, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _index2.default.setNavigationBarTitle({
        title: _index3.globalData.sysTitle
      });
      _index2.default.setNavigationBarColor({
        frontColor: _variables.fontColor,
        backgroundColor: _variables.redColor,
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
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
    value: function componentDidHide() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/_tarojs/taro-alipay/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});