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

//图片修改
var location = "/assets/images/location.png";
var wishImg = "/assets/images/syxytb.png";
var juan = "/assets/images/juan.png";

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "unpayList", "systemUser", "mapKey", "latitude", "longitude", "scale", "menus", "screen", "user", "person", "zm", "searchImg", "dw", "unpayImg", "unpriceImg", "pos_", "tempImg", "del", "open", "addr", "mach", "mm", "HearHead", "closebtn", "heardImg", "yyzh", "dyzh", "xydd", "controls", "isOpened", "mapObj", "showLocation", "markers", "allMarkers", "bool", "menuright", "token", "checkPapay", "commonCode", "markBoolean", "posBoolean", "unpayBoolean", "machineBoolean", "DensityFree", "HearBoolean", "HearlistBoolean", "payName"], _this.config = {
      navigationBarTitleText: '首页'
    }, _this.onHeard = function () {
      console.log('心愿单开启');
      _this.setState({
        HearlistBoolean: true,
        markBoolean: true
      });
    }, _this.onInfo = function (e) {
      e.stopPropagation();
      console.log('onInfo');
    }, _this.onClosePos = function (e) {
      //关闭
      e.stopPropagation();
      console.log(e);
      console.log('onInfo1111');
      _this.setState({
        markBoolean: true,
        posBoolean: true
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      /**
      * 指定config的类型声明为: Taro.Config
      *
      * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
      * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
      * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
      */

      this.state = {
        mapKey: 'CFOBZ-IOJKX-TGG4T-ZZM75-EXWF2-OHFAP',
        latitude: 39.908823,
        longitude: 116.397470,
        scale: 16,
        menus: _index3.PATH + '/mImages/menus.png',
        screen: _index3.PATH + '/mImages/screen.png',
        user: _index3.PATH + '/mImages/tytb-6.png',
        person: _index3.PATH + '/mImages/tytb-22.png',
        zm: _index3.PATH + '/mImages/zm2.png',
        searchImg: _index3.PATH + '/mImages/searchImg.png',
        dw: _index3.PATH + '/mImages/dw.png',
        unpayImg: _index3.PATH + '/mImages/wfk-11.png',
        unpriceImg: _index3.PATH + '/mImages/wfk.png',
        pos_: _index3.PATH + '/mImages/bg_0.png',
        tempImg: 'http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg',
        del: _index3.PATH + '/mImages/clear.png',
        open: _index3.PATH + '/mImages/yyz.png',
        addr: _index3.PATH + '/mImages/tytb-4.png',
        mach: _index3.PATH + '/mImages/tytb-1.png',
        mm: _index3.PATH + '/mImages/mm.png',
        HearHead: _index3.PATH + '/mImages/ysjtb1.png',
        closebtn: _index3.PATH + '/mImages/gban1.png',
        heardImg: _index3.PATH + '/mImages/fkz.png',
        yyzh: _index3.PATH + '/mImages/yyz_f.png',
        dyzh: _index3.PATH + '/mImages/dyz_f.png',
        xydd: _index3.PATH + '/mImages/xyd_img.png',
        controls: [],
        isOpened: false,
        mapObj: {},
        showLocation: true,
        markers: [],
        allMarkers: [],
        bool: true,
        menuright: [],
        token: '',
        checkPapay: false,
        commonCode: '',
        markBoolean: false,
        posBoolean: false,
        unpayBoolean: false,
        machineBoolean: false,
        DensityFree: false,
        HearBoolean: false,
        HearlistBoolean: false,
        payName: 0.00,
        unpayList: [{
          'name': 'suxiaoyan',
          "order": 5.00,
          "time": '2019-01-03',
          "goods": [{ 'goodsname': '脉动1', 'Gl': 'ml', 'amount': 99, 'address': '丰台区南智能机柜11', 'url': "http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg" }, { 'goodsname': '脉动2', 'Gl': 'ml', 'amount': 99, 'address': '丰台区南智能机柜22', 'url': "http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg" }, { 'goodsname': '脉动3', 'Gl': 'ml', 'amount': 99, 'address': '丰台区南智能机柜33', 'url': "http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg" }]
        }]
      };
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      console.log(this.props, nextProps);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('获取getApp:');
      // console.log(app)
      console.log('---onLaunch---项目运行时触发');
      console.log('获取用户信息:');
      this.mapObj = _index2.default.createMapContext("mymap");
      var that = this;
      //拿到系统信息
      _index2.default.getSystemInfo({
        success: function success(res) {
          console.log('获取用户的手机信息（屏幕宽高等）');
          console.log(JSON.stringify(res));
          console.log('存储用户信息到缓存store中');
          var store = _index2.default.setStorageSync("userInfo", res);
          var data = _index2.default.getStorageSync('userInfo');
          console.log("data中是否有用户信息：");
          console.log(data);
          that.setState({
            controls: [{
              id: 1,
              iconPath: location,
              position: {
                width: 55,
                height: 55,
                left: (res.windowWidth - 55) / 2,
                top: (res.windowHeight - 115) / 2
              },
              clickable: true
            }, {
              id: 2,
              iconPath: wishImg,
              position: {
                width: 100,
                height: 100,
                left: res.windowWidth - 90,
                top: (res.windowHeight - 115) / 2
              },
              clickable: true
            }, {
              id: 3,
              iconPath: juan,
              position: {
                width: 80,
                height: 80,
                left: res.windowWidth - 80,
                top: (res.windowHeight - 115) / 2 + 90
              },
              clickable: true
            }]
          });
        }
      });
      //得到位置
      _index2.default.getLocation({
        type: 'gcj02',
        success: function success(res) {
          console.log("获取用户定位成功：");
          var data = _index2.default.getStorageSync('userInfo');
          console.log(res);
          console.log(res.city);
          console.log(data);
          that.setState({
            latitude: res.latitude,
            longitude: res.longitude,
            controls: [{
              id: 1,
              iconPath: location,
              position: {
                width: 55,
                height: 55,
                left: (data.windowWidth - 55) / 2,
                top: (data.windowHeight - 115) / 2
              },
              clickable: true
            }, {
              id: 2,
              iconPath: wishImg,
              position: {
                width: 100,
                height: 100,
                left: data.windowWidth - 90,
                top: (data.windowHeight - 115) / 2
              },
              clickable: true
            }, {
              id: 3,
              iconPath: juan,
              position: {
                width: 80,
                height: 80,
                left: data.windowWidth - 80,
                top: (data.windowHeight - 115) / 2 + 90
              },
              clickable: true
            }]
          });
          console.log(that.mapObj);
          that.mapObj.moveToLocation();
          console.log("res.latitude,res.longitude");
          console.log(res.latitude, res.longitude);
          that.getNearbyMachines(res.latitude, res.longitude);
        },
        fail: function fail(res) {
          console.log("获取用户定位失败111：");
          console.log(res); //请确定定位相关权限已开启
          //console.log(res.errCode)
          _index2.default.showModal({
            title: '提示',
            content: '系统找不到您的位置！',
            cancelText: '取消',
            success: function success(res) {
              console.log(res);
              if (res.confirm) {
                console.log('用户点击确定时候：');
                that.onsub();
              } else {
                console.log('用户点击取消');
                return;
              }
            }
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      console.log('---onshow---');
      console.log('---免密首先检查免密开通情况---');
      console.log('---此处需要将来要改为支付分---');
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
    //设置定位关闭

  }, {
    key: "oncancel",
    value: function oncancel() {
      //调用用户信息
      var data = _index2.default.getStorageSync('userInfo');
      this.setState({
        controls: [{
          id: 1,
          iconPath: location,
          position: {
            width: 55,
            height: 55,
            left: (data.windowWidth - 55) / 2,
            top: (data.windowHeight - 115) / 2
          },
          clickable: true
        }, {
          id: 2,
          iconPath: wishImg,
          position: {
            width: 100,
            height: 100,
            left: data.windowWidth - 90,
            top: (data.windowHeight - 115) / 2
          },
          clickable: true
        }, {
          id: 3,
          iconPath: juan,
          position: {
            width: 80,
            height: 80,
            left: data.windowWidth - 80,
            top: (data.windowHeight - 115) / 2 + 90
          },
          clickable: true
        }]
      });
    }
    //免密是否开通验证

  }, {
    key: "checkPapay",
    value: function checkPapay() {
      console.log('******检查是否开通免密*****');
      if (_index2.default.getEnv() == "ALIPAY") {
        console.log('**支付宝是否开通免密**');
      }
      if (_index2.default.getEnv() == "WEAPP") {
        console.log('**微信是否开通免密**');
      }
    }
    //验证token是否有效

  }, {
    key: "verifyToken",
    value: function verifyToken() {
      console.log("********token是否有效********");
      _index2.default.request({
        url: _index3.BASE_URL + 'token/verifyToken',
        data: {
          'token': _index3.globalData.token
        },
        header: {
          'content-type': 'application/json'
        }
      }).then(function (res) {
        return console.log(res.data);
      });
    }
    //1支付宝获取授权code临时码

  }, {
    key: "myGetAuthCode",
    value: function myGetAuthCode() {
      var that = this;
      my.getAuthCode({
        scopes: ['auth_user'],
        success: function success(res) {
          console.log("支付宝code临时码");
          console.log(res);
          console.log(res.authCode);
          that.setState({
            commonCode: res.authCode
          });
          //console.log(that.state.commonCode)
        }
      });
    }
    //2微信获取授权code临时码

  }, {
    key: "wxGetAuthCode",
    value: function wxGetAuthCode() {
      var that = this;
      _index2.default.login().then(function (res) {
        console.log("小程序code临时码");
        console.log(res.code);
        that.setState({
          commonCode: res.code
        });
        //console.log(that.state.commonCode)
      });
    }
    //检查用户是否登录

  }, {
    key: "checkLogin",
    value: function checkLogin() {
      //判断端（支付宝/微信）
      if (_index2.default.getEnv() == "ALIPAY") {
        this.myGetAuthCode();
        return;
      }
      if (_index2.default.getEnv() == "WEAPP") {
        this.wxGetAuthCode();
        return;
      }
    }
    //获取小程序token值

  }, {
    key: "checkToken",
    value: function checkToken() {
      this.checkLogin();
    }
    //获取机柜的经纬度坐标，必须获取token才可以拿到

  }, {
    key: "getNearbyMachines",
    value: function getNearbyMachines(latitude, longitude) {
      console.log("globalData.token");
      console.log(_index3.globalData.token);
      if (latitude == 0 && longitude) {
        return;
      }
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'machine/nearbymachines',
        data: {
          lon: latitude,
          lat: longitude,
          distance: 1000
        },
        header: {
          'content-type': 'application/json',
          'token': "011OMTMu0t0sBj1ozQJu0ckyMu0OMTMg"
        },
        success: function success(res) {
          console.log('获取附近机柜:[]');
          console.log(res);
        }
      });
    }
    //确定按钮

  }, {
    key: "onsub",
    value: function onsub() {
      //选择定位地点
      console.log('选择定位地点');
      var that = this;
      _index2.default.chooseLocation({
        success: function success(res) {
          //允许打开定位
          console.log("定位成功：");
          console.log(res);
          that.setState({
            latitude: res.latitude,
            longitude: res.longitude
          });
          that.mapObj.moveToLocation();
        },
        fail: function fail(res) {
          //不允许打开定位
          console.log("定位失败：");
          console.log(res);
          return;
        }
      });
    }
  }, {
    key: "onconcel",
    value: function onconcel() {
      console.log('取消操作');
    }
  }, {
    key: "onControlTap",
    value: function onControlTap(e) {
      //点击地图菜单项，点击那个就返回哪个的controlId
      console.log(e.controlId);
      if (e.controlId == 2) {
        this.onHeard();
      }
    }
  }, {
    key: "onRight",
    value: function onRight() {
      console.log('微信客服');
      _index2.default.navigateTo({
        url: '/pages/service/service'
      });
    }
  }, {
    key: "onLeft",
    value: function onLeft() {
      console.log('个人中心');
      _index2.default.navigateTo({
        url: '/pages/login/login'
      });
    }
  }, {
    key: "onScreen",
    value: function onScreen() {
      console.log('扫码开门');
    }
  }, {
    key: "onMM",
    value: function onMM() {
      console.log('开启免密');
    }
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
    key: "onCloseHeardlist",
    value: function onCloseHeardlist() {
      console.log('关闭心愿单列表');
      this.setState({
        HearlistBoolean: false,
        markBoolean: false
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
    key: "onPay",
    value: function onPay() {
      console.log('订单明细页面');
      _index2.default.navigateTo({
        url: '/pages/orders/index'
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var unpayList = this.__state.unpayList;

      var anonymousState__temp = this.__state.unpayBoolean ? this.__state.payName.toFixed(2) : null;
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        systemUser: _index3.systemUser
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["onControlTap", "onInfo", "onClosePos", "onPay", "onMM", "onCloseHeardlist", "onSetheart", "onCloseHeard", "onScreen", "onRight", "onLeft"], _temp2);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
// export default Index as ComponentClass<PageOwnProps, PageState>


exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));