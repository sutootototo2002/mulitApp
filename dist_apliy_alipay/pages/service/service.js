"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/_tarojs/taro-alipay/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Login = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Login, _BaseComponent);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "loginImg", "serverImg1", "serverImg2", "serverImg3", "serverImg4", "id_", "server"], _this.config = {
      navigationBarTitleText: '联系客服'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Login.prototype.__proto__ || Object.getPrototypeOf(Login.prototype), "_constructor", this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        loginImg: _index3.PATH + '/mImages/loginImg.png',
        serverImg1: _index3.PATH + '/mImages/lxkf-1.png',
        serverImg2: _index3.PATH + '/mImages/lxkf-2.png',
        serverImg3: _index3.PATH + '/mImages/lxkf-3.png',
        serverImg4: _index3.PATH + '/mImages/lxkf-4.png',
        id_: 0,
        server: [{ id: 0, img: _index3.PATH + '/mImages/lxkf-1.png', name: '订单计算错误' }, { id: 1, img: _index3.PATH + '/mImages/lxkf-2.png', name: '账号储值问题' }, { id: 2, img: _index3.PATH + '/mImages/lxkf-3.png', name: '货柜门打不开' }, { id: 3, img: _index3.PATH + '/mImages/lxkf-4.png', name: '货柜门无法锁上' }]
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
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
    key: "turnFn",
    value: function turnFn(e) {
      console.log(e.currentTarget.dataset.id);
      var id = e.currentTarget.dataset.id;
      this.setState({
        id_: id
      });
    }
  }, {
    key: "gohome",
    value: function gohome() {
      // 
      _index2.default.navigateBack({});
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var loopArray0 = this.__state.server.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = _this2.__state.id_ == Number(item.$original.id) ? 'box select' : 'box';
        return {
          $loopState__temp2: $loopState__temp2,
          $original: item.$original
        };
      });

      Object.assign(this.__state, {
        loopArray0: loopArray0
      });
      return this.__state;
    }
  }]);

  return Login;
}(_index.Component), _class.$$events = ["turnFn", "gohome"], _temp2);
exports.default = Login;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(Login, true));