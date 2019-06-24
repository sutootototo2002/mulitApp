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

var order = require("../../../utils/order.js");
var Orderdetail = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Orderdetail, _BaseComponent);

  function Orderdetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Orderdetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Orderdetail.__proto__ || Object.getPrototypeOf(Orderdetail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["order", "worksheet", "Buttonstate1", "orderid", "whereis", "showTuihuo", "icon1", "state0", "state1", "state3", "state4", "state5", "state6", "state71", "state70", "state8", "state9", "refundhistory", "isrefundhistory"], _this.config = {
      navigationBarTitleText: '订单详情'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Orderdetail, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Orderdetail.prototype.__proto__ || Object.getPrototypeOf(Orderdetail.prototype), "_constructor", this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        orderid: '',
        whereis: '',
        showTuihuo: true,
        order: [],
        icon1: _index3.PATH + '/mImages/fkz.png',
        state0: _index3.PATH + '/mImages/gwz1.png',
        state1: _index3.PATH + '/mImages/ddqk.png',
        state3: _index3.PATH + '/mImages/ddqk.png',
        state4: _index3.PATH + '/mImages/ddqk.png',
        state5: _index3.PATH + '/mImages/ddqk.png',
        state6: _index3.PATH + '/mImages/ddqk.png',
        state71: _index3.PATH + '/mImages/ddxqwcl.png',
        state70: _index3.PATH + '/mImages/ddxqwcl.png',
        state8: _index3.PATH + '/mImages/ddqk.png',
        state9: _index3.PATH + '/mImages/ddqk.png',
        refundhistory: {},
        isrefundhistory: false,
        worksheet: {}
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log(this.$router.params);
      _index2.default.setStorageSync("routerinfo", this.$router.params);
      this.setState({
        orderid: this.$router.params.orderid
      });
      if (this.$router.params.whereis) {
        this.setState({
          whereis: this.$router.params.whereis
        });
      }
      if (this.$router.params.whereis == 'weight' || this.$router.params.whereis == 'cgshop') {
        this.setState({
          showTuihuo: false
        });
      }
      this.getDetail();
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
      //order.stopInterval();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      order.stopInterval();
    }
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
  }, {
    key: "getDetail",
    value: function getDetail() {
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      // Taro.showLoading({
      //   title: '',
      // });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'order/detail',
        data: {
          orderid: routerinfo.orderid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log("成功！");
          console.log('订单列表：');
          console.log(res.data.data);
          if (res.data.data.machinename == null) {
            res.data.data.machinename = '无';
          }
          if (res.data.data.dailaddress == null) {
            res.data.data.dailaddress = '无';
          }
          _index2.default.hideLoading();
          that.setState({
            order: res.data.data
          });
          if (res.data.data.haveworksheet == 1) {
            that.getWorksheet();
            console.log("失败！");
          }
          console.log("轮询");
          that.getRefund();
        }
      });
    }
  }, {
    key: "getWorksheet",
    value: function getWorksheet() {
      var that = this;
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      _index2.default.request({
        url: _index3.BASE_URL + 'order/worksheet',
        data: {
          orderid: routerinfo.orderid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log(res);
          if (res.data.code == 200) {
            that.setState({
              worksheet: res.data.data
            });
          }
        }
      });
    }
  }, {
    key: "getRefund",
    value: function getRefund() {
      var that = this;
      var routerinfo = _index2.default.getStorageSync('routerinfo');
      _index2.default.request({
        url: _index3.BASE_URL + 'order/refundhistory',
        data: {
          orderid: routerinfo.orderid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('refundhistory:');
          console.log(res.data.data);
          if (res.data.data != undefined && res.data.data.refundstatus == 3) {
            that.setState({
              isrefundhistory: true,
              refundhistory: res.data.data
            });
          } else {
            that.setState({
              isrefundhistory: false
            });
          }
        }
      });
    }
  }, {
    key: "goKefu",
    value: function goKefu() {
      console.log('微信客服');
      _index2.default.navigateTo({
        url: '/pages/service/service'
      });
    }
  }, {
    key: "gotoBack",
    value: function gotoBack() {
      //回到首页
      console.log(this.state.whereis + "---" + 111);
      if (this.state.whereis == 'weight' || this.state.whereis == 'cgshop' || this.state.whereis == 'all') {
        _index2.default.navigateTo({
          url: '/pages/index/index'
        });
      } else {
        _index2.default.navigateBack({});
      }
    }
  }, {
    key: "ontoAnswer",
    value: function ontoAnswer(e) {
      console.log('订单编号：');
      console.log(e);
      var orderid = e.currentTarget.dataset.orderid;
      _index2.default.navigateTo({
        url: '/pages/refund/refund?orderid=' + orderid
      });
    }
  }, {
    key: "ontopay",
    value: function ontopay() {
      //申请退款
      _index2.default.navigateTo({
        url: '/pages/index/index'
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

      var order = this.__state.order;

      console.log("order");
      console.log(order);
      var orderContent = void 0;
      if (order.orderstatus == 0) {}
      if (order.orderstatus == 9) {}
      if (order.orderstatus == 8) {}
      if (order.orderstatus == 7 && order.refunding == 1) {}
      if (order.orderstatus == 7 && order.refunding == 0) {}
      if (order.orderstatus == 6) {}
      if (order.orderstatus == 5) {}
      if (order.orderstatus == 4) {}
      if (order.orderstatus == 3) {}
      var Buttonstate = void 0;
      var Buttonstate1 = void 0;
      if (order.orderstatus == 5 && order.haveworksheet == 0 && order.totalfee > 0 && this.__state.showTuihuo) {} else if (order.orderstatus == 5 && order.haveworksheet == 1 && order.totalfee > 0 && this.__state.showTuihuo) {} else {}
      // if (order.orderstatus !== 7) {
      //   Buttonstate1 = <Button className='selBtn' data-orderid={order.orderid} onClick={this.ontoAnswer}>问题反馈</Button>
      // }
      Object.assign(this.__state, {
        Buttonstate1: Buttonstate1
      });
      return this.__state;
    }
  }]);

  return Orderdetail;
}(_index.Component), _class.properties = {}, _class.$$events = ["ontoAnswer", "goKefu", "gotoBack"], _temp2);
exports.default = Orderdetail;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Orderdetail, true));