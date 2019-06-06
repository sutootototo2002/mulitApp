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

var Myheart = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Myheart, _BaseComponent);

  function Myheart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Myheart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Myheart.__proto__ || Object.getPrototypeOf(Myheart)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["mhhImg", "avator", "imgs", "zmkm", "clear", "value", "bool", "HearBoolean", "HearHead", "closebtn", "markBoolean", "heardImg", "addr", "dyzh", "yyzh"], _this.config = {
      navigationBarTitleText: '心愿单'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Myheart, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Myheart.prototype.__proto__ || Object.getPrototypeOf(Myheart.prototype), "_constructor", this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        mhhImg: _index3.PATH + '/mImages/xydImg.png',
        avator: _index3.PATH + '/mImages/tempavator.jpg',
        imgs: _index3.PATH + '/mImages/xytb.png',
        zmkm: _index3.PATH + '/mImages/zmkm0.png',
        clear: _index3.PATH + '/mImages/ljx.png',
        value: '',
        bool: false,
        HearBoolean: true,
        HearHead: _index3.PATH + '/mImages/ysjtb1.png',
        closebtn: _index3.PATH + '/mImages/gban1.png',
        markBoolean: true,
        heardImg: _index3.PATH + '/mImages/fkz.png',
        addr: _index3.PATH + '/mImages/tytb-4.png',
        dyzh: _index3.PATH + '/mImages/dyz_f.png',
        yyzh: _index3.PATH + '/mImages/yyz_f.png'
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('-----------onLoad---------');
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
  }, {
    key: "onCloseHeard",
    value: function onCloseHeard() {
      console.log('关闭心愿单');
      this.setState({
        HearBoolean: false,
        markBoolean: false
      });
    }
  }, {
    key: "addgoods",
    value: function addgoods() {
      console.log('添加商品');
      this.setState({
        bool: true
      });
    }
  }, {
    key: "add",
    value: function add() {
      console.log('添加商品');
      this.setState({
        bool: false
      });
    }
  }, {
    key: "onSetheart",
    value: function onSetheart() {
      console.log('进入心愿单中心');
      _index2.default.navigateTo({
        url: '/pages/wish/myheart'
      });
    }
  }, {
    key: "oncheckdetail",
    value: function oncheckdetail() {
      console.log('查看详情');
      this.setState({
        HearBoolean: true,
        markBoolean: true
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
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Myheart;
}(_index.Component), _class.$$events = ["addgoods", "oncheckdetail", "add", "onCloseHeard"], _temp2);
exports.default = Myheart;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(Myheart, true));