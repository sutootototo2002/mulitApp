"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../config/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var machineid;
var curPage = 0;
var lat;
var lon;
var distance;


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Boxdetail = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Boxdetail, _BaseComponent);

  function Boxdetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Boxdetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Boxdetail.__proto__ || Object.getPrototypeOf(Boxdetail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["machine", "goods", "globalData", "distance", "machineid", "addr", "total", "salesort", "hasnext", "loginImg"], _this.config = {
      navigationBarTitleText: '机柜详情页'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Boxdetail, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Boxdetail.prototype.__proto__ || Object.getPrototypeOf(Boxdetail.prototype), "_constructor", this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        machineid: '',
        machine: {},
        goods: [],
        addr: _index3.PATH + 'addr1.png',
        total: 0,
        salesort: '0',
        hasnext: false,
        loginImg: _index3.PATH + 'loginImg.png'
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('-----------onLoad---------');
      console.log(this.$router.params);
      console.log(this.$router.params.machineid);
      machineid = this.$router.params.machineid;
      distance = this.$router.params.distance;
      this.getDetail();
      this.getGoods();
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
    key: "getDetail",
    value: function getDetail() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'machine/machinedetail',
        data: {
          machineid: machineid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log("详细信息：");
          console.log(res.data.data);
          lat = res.data.data.lat;
          lon = res.data.data.lon;
          that.setState({
            machine: res.data.data
          });
        }
      });
    }
  }, {
    key: "getGoods",
    value: function getGoods() {
      var that = this;
      var page = 1;
      _index2.default.request({
        url: _index3.BASE_URL + 'machine/goods',
        data: {
          machineid: machineid,
          salesort: that.state.salesort,
          page: page,
          rows: 5
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log("更加商品；；；");
          console.log(res);
          var page = res.data.data.page;
          var total = res.data.data.total;
          var hasnext = res.data.data.hasnext;
          var goods = res.data.data.data;
          that.setState({
            goods: goods,
            total: total,
            hasnext: hasnext
          });
        },
        fail: function fail(e) {
          _index2.default.hideLoading();
        }
      });
    }
  }, {
    key: "viewlocation",
    value: function viewlocation() {
      _index2.default.openLocation({
        latitude: Number(lat),
        longitude: Number(lon),
        scale: 28
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

      var _state = this.__state,
          machine = _state.machine,
          goods = _state.goods;

      console.log("machine.pics:");
      // console.log(machine);
      console.log(machine.pics);
      if (machine.pics) {
        console.log('1111111111111');
      }
      Object.assign(this.__state, {
        globalData: _index3.globalData,
        distance: distance
      });
      return this.__state;
    }
  }]);

  return Boxdetail;
}(_index.Component), _class.properties = {}, _class.$$events = ["getGoods"], _temp2);
exports.default = Boxdetail;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Boxdetail, true));