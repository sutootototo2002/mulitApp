'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require('../../../npm/_tarojs/taro-alipay/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../config/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var curStatus = 8; //默认状态为8
var curPage = 1;
var cardid = '';
var value = 0;


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Orderlist = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Orderlist, _BaseComponent);

  function Orderlist() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Orderlist);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Orderlist.__proto__ || Object.getPrototypeOf(Orderlist)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "anonymousState__temp7", "anonymousState__temp8", "anonymousState__temp9", "goodsList", "globalData", "tabList", "current", "hasnext", "addrimg", "dargStyle", "downDragStyle", "downText", "upDragStyle", "pullText", "start_p", "scrollY", "dargState"], _this.config = {
      navigationBarTitleText: '订单列表页',
      onReachBottomDistance: 50
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Orderlist, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Orderlist.prototype.__proto__ || Object.getPrototypeOf(Orderlist.prototype), '_constructor', this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        current: 0,
        hasnext: true,
        goodsList: [],
        addrimg: _index3.PATH + 'wddd2.png',
        dargStyle: {
          top: "0px"
        },
        downDragStyle: {
          height: "0px"
        },
        downText: '下拉刷新',
        upDragStyle: {
          height: "0px"
        },
        pullText: '上拉加载更多',
        start_p: {},
        scrollY: true,
        dargState: 0 //刷新状态 0不做操作 1刷新 -1加载更多
      };
    }
  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      console.log('下拉事件111111111111111');
      curPage = 1;
      this.setState({
        goodsList: []
      });
      //curPage
      this.getOrdersup();
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      console.log('上拉事件1111111111111111111111');
      if (!this.state.hasnext) {
        _index2.default.showLoading({
          title: '没有数据更新了'
        });
        setTimeout(function () {
          _index2.default.hideLoading();
        }, 1000);
      } else {
        ++curPage;
        this.getOrders();
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log(this.$router.params);
      if (this.$router.params.cardid) {
        cardid = this.$router.params.cardid;
      }
      if (this.$router.params.state) {
        curStatus = Number(this.$router.params.state);
      }
      if (this.$router.params.value) {
        value = this.$router.params.value;
        console.log(value);
        this.setState({
          current: Number(value)
        });
      }
      curPage = 1;
      console.log("cardid");
      console.log(cardid);
      //curStatus = 8;
      this.getOrdersup();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {}
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {}
  }, {
    key: 'getOrdersup',
    value: function getOrdersup() {
      var that = this;
      var page = curPage;
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'order/orderlist',
        data: {
          page: page,
          rows: 5,
          status: curStatus,
          cardid: cardid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          _index2.default.hideLoading();
          console.log('订单数据列表：');
          console.log(res.data.data.data);
          that.setState({
            hasnext: res.data.data.hasnext,
            goodsList: res.data.data.data
          });
          //var hasnext = res.data.data.hasnext;
        }
      });
    }
  }, {
    key: 'getOrders',
    value: function getOrders() {
      var that = this;
      var page = curPage;
      // this.setState({
      //   curPage: page
      // })
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'order/orderlist',
        data: {
          page: page,
          rows: 5,
          status: curStatus,
          cardid: cardid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          _index2.default.hideLoading();
          console.log('订单数据列表：');
          console.log(res.data.data.data);
          that.setState({
            hasnext: res.data.data.hasnext,
            goodsList: that.state.goodsList.concat(res.data.data.data)
          });
        }
      });
    }
  }, {
    key: 'userInfoHandler',
    value: function userInfoHandler(res) {
      var that = this;
      console.log(res.detail.userInfo);
      if (res.detail.userInfo == null) {
        return;
      }
      _index2.default.showLoading({
        title: ''
      });
      _index2.default;
      _index3.globalData.avatar = res.detail.userInfo.avatarUrl;
      _index3.globalData.nickname = res.detail.userInfo.nickname || res.detail.userInfo.nickName;
      console.log("globalData.nickName");
      console.log(_index3.globalData.nickname);
      console.log("globalData.avatar");
      console.log(_index3.globalData.avatar);
      // this.setState({
      //   isperson:true
      // })
      console.log("userInfoList:");
      // console.log(this.state.userInfoList)
      _index2.default.request({
        method: 'POST',
        url: _index3.BASE_URL + 'user/updateuserinfo',
        data: {
          avatarUrl: res.detail.userInfo.avatarUrl,
          city: res.detail.userInfo.city,
          country: res.detail.userInfo.country,
          nickName: res.detail.userInfo.nickName,
          province: res.detail.userInfo.province
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log(res);
          _index2.default.showToast({
            title: '头像更新成功',
            icon: 'success',
            duration: 2000
          });
          that.onSetheart();
        },
        fail: function fail(res) {
          _index2.default.hideLoading();
          // Taro.showModal({
          //   title: '提示',
          //   content: '请更新头像',
          //   success: function(res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定')
          //     } else if (res.cancel) {
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
        }
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(value) {
      console.log(value);
      if (value == 0) {
        curStatus = 8;
        curPage = 1;
      }
      if (value == 1) {
        curStatus = 7;
        curPage = 1;
      }
      if (value == 2) {
        curStatus = 10;
        curPage = 1;
      }
      this.setState({
        current: value
      });
      this.getOrdersup();
    }
    //查看详情

  }, {
    key: 'toOrderDetail',
    value: function toOrderDetail(orderId) {
      _index2.default.navigateTo({
        url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderId
      });
    }
  }, {
    key: 'touchEnd',
    value: function touchEnd(e) {
      if (this.state.dargState === 1) {
        this.down();
      } else if (this.state.dargState === -1) {
        this.pull();
      }
      this.reduction();
    }
  }, {
    key: 'pull',
    value: function pull() {
      console.log('上拉');
      // this.props.onPull()
      this.onReachBottom();
    }
  }, {
    key: 'onSetheart',
    value: function onSetheart() {
      console.log('进入心愿单中心');
      _index2.default.navigateTo({
        url: '/pages/wish/likes/myheart'
      });
    }
  }, {
    key: 'down',
    value: function down() {
      console.log('下拉');
      this.onPullDownRefresh();
      // this.props.onDown()
    }
  }, {
    key: 'reduction',
    value: function reduction() {
      var _this2 = this;

      var time = 0.5;
      this.setState({
        upDragStyle: {
          height: "0px",
          transition: "all " + time + "s"
        },
        dargState: 0,
        dargStyle: {
          top: "0px",
          transition: "all " + time + "s"
        },
        downDragStyle: {
          height: "0px",
          transition: "all " + time + "s"
        },
        scrollY: true
      });
      setTimeout(function () {
        _this2.setState({
          dargStyle: {
            top: "0px"
          },
          upDragStyle: {
            height: "0px"
          },
          pullText: '上拉加载更多',
          downText: '下拉刷新'
        });
      }, 500);
    }
  }, {
    key: 'ScrollToUpper',
    value: function ScrollToUpper() {
      console.log('滚动到顶部事件');
      // this.props.Upper()
    }
  }, {
    key: 'ScrollToLower',
    value: function ScrollToLower() {
      console.log('滚动到底部事件');
      // this.props.Lower()
    }
  }, {
    key: 'touchStart',
    value: function touchStart(e) {
      this.setState({
        start_p: e.touches[0]
      });
    }
  }, {
    key: 'touchmove',
    value: function touchmove(e) {
      var that = this;
      var move_p = e.touches[0],

      //移动时的位置
      deviationX = 0.30,

      //左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 50,

      //拉动长度（低于这个值的时候不执行）
      maxY = 100; //拉动的最大高度
      var start_x = this.state.start_p.clientX,
          start_y = this.state.start_p.clientY,
          move_x = move_p.clientX,
          move_y = move_p.clientY;
      //得到偏移数值
      var dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
      if (dev < deviationX) {
        //当偏移数值大于设置的偏移数值时则不执行操作
        var pY = Math.abs(move_y - start_y) / 3.5; //拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
        if (move_y - start_y > 0) {
          //下拉操作
          if (pY >= deviationY) {
            this.setState({ dargState: 1, downText: '释放刷新' });
          } else {
            this.setState({ dargState: 0, downText: '下拉刷新' });
          }
          if (pY >= maxY) {
            pY = maxY;
          }
          this.setState({
            dargStyle: {
              top: pY + 'px'
            },
            downDragStyle: {
              height: pY + 'px'
            },
            scrollY: false //拖动的时候禁用
          });
        }
        if (start_y - move_y > 0) {
          //上拉操作
          console.log('上拉操作');
          if (pY >= deviationY) {
            this.setState({ dargState: -1, pullText: '释放加载更多' });
          } else {
            this.setState({ dargState: 0, pullText: '上拉加载更多' });
          }
          if (pY >= maxY) {
            pY = maxY;
          }
          this.setState({
            dargStyle: {
              top: -pY + 'px'
            },
            upDragStyle: {
              height: pY + 'px'
            },
            scrollY: false //拖动的时候禁用
          });
        }
      }
    }
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: '_createData',
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var goodsList = this.__state.goodsList;

      var tabList = [{ title: '已付款' }, { title: '转退款' }, { title: '其他' }];

      var dargStyle = this.__state.dargStyle;
      var downDragStyle = this.__state.downDragStyle;
      var upDragStyle = this.__state.upDragStyle;
      var anonymousState__temp = (0, _index.internal_inline_style)(downDragStyle);
      var anonymousState__temp2 = (0, _index.internal_inline_style)(dargStyle);
      var anonymousState__temp3 = (0, _index.internal_inline_style)(upDragStyle);
      var anonymousState__temp4 = (0, _index.internal_inline_style)(downDragStyle);
      var anonymousState__temp5 = (0, _index.internal_inline_style)(dargStyle);
      var anonymousState__temp6 = (0, _index.internal_inline_style)(upDragStyle);
      var anonymousState__temp7 = (0, _index.internal_inline_style)(downDragStyle);
      var anonymousState__temp8 = (0, _index.internal_inline_style)(dargStyle);
      var anonymousState__temp9 = (0, _index.internal_inline_style)(upDragStyle);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6,
        anonymousState__temp7: anonymousState__temp7,
        anonymousState__temp8: anonymousState__temp8,
        anonymousState__temp9: anonymousState__temp9,
        globalData: _index3.globalData,
        tabList: tabList
      });
      return this.__state;
    }
  }]);

  return Orderlist;
}(_index.Component), _class.$$events = ["toOrderDetail", "userInfoHandler", "handleClick", "touchmove", "touchEnd", "touchStart", "ScrollToUpper", "ScrollToLower"], _temp2);
exports.default = Orderlist;

Page(require('../../../npm/_tarojs/taro-alipay/index.js').default.createComponent(Orderlist, true));