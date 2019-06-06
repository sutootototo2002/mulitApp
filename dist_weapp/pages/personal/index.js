'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require('../../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../config/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var curPage = 0;
var curStatus = 8;
var cardid = '';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "globalData", "mhhImg", "iconImg1", "iconImg2", "tytb33", "perbox", "avator", "iconB1", "iconB2", "iconB21", "iconB3", "iconB4", "iconC1", "iconC2", "iconC3", "iconC4", "userInfoList", "wishes", "isuserInfo", "goodsList", "total"], _this.config = {
      navigationBarTitleText: '个人中心'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), '_constructor', this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        mhhImg: _index3.PATH + '/mImages/xydImg.png',
        iconImg1: _index3.PATH + '/mImages/tytb-1.png',
        iconImg2: _index3.PATH + '/mImages/tytb-61.png',
        tytb33: _index3.PATH + '/mImages/tytb-33.png',
        perbox: _index3.PATH + '/mImages/perbox.png',
        avator: _index3.PATH + '/mImages/tempavator.png',
        iconB1: _index3.PATH + '/mImages/wddd-new1-50.png',
        iconB2: _index3.PATH + '/mImages/wddd-new3-50.png',
        iconB21: _index3.PATH + '/mImages/wddd-new3-51.png',
        iconB3: _index3.PATH + '/mImages/wddd-new2-50.png',
        iconB4: _index3.PATH + '/mImages/wddd-55.png',
        iconC1: _index3.PATH + '/mImages/zhsz.png',
        iconC2: _index3.PATH + '/mImages/bzzx.png',
        iconC3: _index3.PATH + '/mImages/yjfk.png',
        iconC4: _index3.PATH + '/mImages/wdkf.png',
        userInfoList: {},
        wishes: [],
        isuserInfo: true,
        goodsList: [],
        total: 0
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // Taro.showLoading({
      //   title: '',
      // })
      this.getUserDetail();
      this.getWishList();
      this.getOrders();
      cardid = this.$router.params.cardid ? this.$router.params.cardid : '';
      console.log('componentDidMount');
    }
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {
      console.log('componentDidShow');
      //返回时候刷新
      this.getUserDetail();
      this.getWishList();
      this.getOrders();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      console.log('componentWillUpdate');
    }
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {
      console.log('componentDidHide');
    }
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {
      console.log('componentDidCatchError');
    }
  }, {
    key: 'getOrders',
    value: function getOrders() {
      var that = this;
      var page = curPage + 1;
      // this.setState({
      //   curPage: page
      // })
      curPage = page;
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'order/orderlist',
        data: {
          page: page,
          rows: 10,
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
          console.log(res.data.data.total);
          that.setState({
            total: res.data.data.total,
            goodsList: res.data.data.data
          });
          //var hasnext = res.data.data.hasnext;
        }
      });
    }
  }, {
    key: 'getUserDetail',
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
          //var fee = res.data.data.fee;
          console.log("查看用户信息：");
          console.log(res);
          var avatar = true;
          if (res.data.data.avatar !== null) {
            avatar = false;
          }
          _index3.globalData.fee = res.data.data.fee;
          that.setState({
            userInfoList: res.data.data,
            isuserInfo: avatar
            // money: fee,
            // avatarUrl: res.data.data.avatar == null ? '../../../images/default.png' : res.data.data.avatar,
            // nickName: res.data.data.nickname == null ? '' : res.data.data.nickname,
            // mobile: res.data.data.mobile == null ? '' : res.data.data.mobile,
            // isnopasspay: res.data.data.isnopasspay == 0 ? false : true
          });
        }
      });
    }
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: 'getWishList',
    value: function getWishList() {
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/myWishList',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          _index2.default.hideLoading();
          that.setState({
            wishes: res.data.rows
          });
        },
        fail: function fail(e) {
          _index2.default.hideLoading();
        }
      });
    }
  }, {
    key: 'gobingcart',
    value: function gobingcart() {
      console.log('绑定亲情卡');
      _index2.default.navigateTo({
        url: '../card/bindcard'
      });
    }
  }, {
    key: 'goheart',
    value: function goheart() {
      console.log('进入心愿单中心');
      _index2.default.navigateTo({
        url: '../wish/likes/myheart'
      });
    }
  }, {
    key: 'toOrders',
    value: function toOrders() {
      _index2.default.navigateTo({
        url: '../orders/orderlist/orderlist?state=8&value=0'
      });
    }
  }, {
    key: 'toOrders1',
    value: function toOrders1() {
      _index2.default.navigateTo({
        url: '../orders/orderlist/orderlist?state=8&value=0'
      });
    }
  }, {
    key: 'toOrders2',
    value: function toOrders2() {
      _index2.default.navigateTo({
        url: '../orders/orderlist/orderlist?state=6&value=1'
      });
    }
  }, {
    key: 'toOrders3',
    value: function toOrders3() {
      _index2.default.navigateTo({
        url: '../orders/orderlist/orderlist?state=7&value=2'
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
      this.setState({
        isuserInfo: false
      });
      _index2.default.showLoading({
        title: ''
      });
      _index2.default;
      var temp = this.state.userInfoList;
      temp.avatar = res.detail.userInfo.avatarUrl;
      _index3.globalData.avatar = temp.avatar;
      temp.nickName = res.detail.userInfo.nickName;
      _index3.globalData.nickName = temp.nickName;
      this.setState({
        userInfoList: temp
      });
      console.log("userInfoList:");
      console.log(this.state.userInfoList);
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
            title: '更新成功',
            icon: 'success',
            duration: 2000
          });
          //that.goRecharge();
        },
        fail: function fail(res) {
          _index2.default.hideLoading();
        }
      });
    }
  }, {
    key: 'goRecharge',
    value: function goRecharge() {
      _index2.default.navigateTo({
        url: '/pages/recharge/recharge?avatar=' + _index3.globalData.avatar + '&nickname=' + _index3.globalData.nickname + '&fee=' + _index3.globalData.fee
      });
    }
  }, {
    key: 'toHome',
    value: function toHome() {
      _index2.default.navigateTo({
        url: '/pages/index/index'
      });
    }
  }, {
    key: 'toSever',
    value: function toSever() {
      _index2.default.navigateTo({
        url: '/pages/service/service'
      });
    }
  }, {
    key: 'requestOpen',
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
          } else if (!(res.data.code == 206)) {
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
    key: 'onScreen',
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
          that.toHome();
        }
        if (res.data.code == 202) {
          console.log('您已被加入黑名单');
          that.toHome();
        }
        if (res.data.code == 205) {
          console.log('用户未登录');
          that.toHome();
        }
        if (res.data.code == 206) {
          console.log('请开通免密');
          that.toHome();
          // that.setState({
          //   singinBoolean:true,
          //   setp2:true,
          //   setp3:false
          // })
        }
      });
    }
  }, {
    key: '_createData',
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var price_format = function price_format(data) {
        var str = data / 100;
        var str1 = str.toFixed(2);
        return str1;
      };
      var anonymousState__temp = price_format(this.__state.userInfoList.fee);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        globalData: _index3.globalData
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["userInfoHandler", "goRecharge", "goheart", "gobingcart", "toOrders", "toOrders1", "toOrders2", "toOrders3", "onScreen", "toHome", "toSever"], _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));