<<<<<<< HEAD
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

var _util = require('../../utils/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var intervalPapayTemp = 0;
var intervalOrderStatus;
var tsFeedback = '2099-12-31'; //时间界限
var tsWish = '2099-12-31'; //时间界限
var feedbacks = [];
var thumbups_;
var hasMore = false;
var machineid = '';
var data = [];
var count = 0;
var timer = 0;
var timerList = [];
var intervalPapayTempArr = [];

var order = require("../../utils/order.js");
var wishImg = "/assets/images/syxytb.png";
var flag = "/assets/images/jgtb.png";

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

<<<<<<< HEAD
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "markerDetail", "unpayList", "feedbackslist", "systemUser", "showModalStatus", "showopen", "papayPressed", "qrurl", "showlogin", "showpapay", "isnopasspay", "havearrears", "formid", "isweapp", "mapKey", "latitude", "longitude", "scale", "menus", "screen", "user", "person", "zm", "avatar", "zmdefault", "searchImg", "dw", "unpayImg", "unpriceImg", "pos_", "tempImg", "del", "open", "addr", "mach", "mm", "HearHead", "closebtn", "heardImg", "yyzh", "dyzh", "xydd", "singinImg", "wzc10", "wzc11", "wzc20", "wzc22", "wzc30", "wzc33", "clear", "setp1", "setp2", "setp3", "controls", "isOpened", "mapObj_", "showLocation", "markers", "allMarkers", "bool", "booladdr", "menuright", "token", "checkPapay", "commonCode", "markBoolean", "posBoolean", "unpayBoolean", "machineBoolean", "DensityFree", "HearBoolean", "HearlistBoolean", "singinBoolean", "thumbups", "fee", "befee", "payName", "haslogin", "intervalPapay", "unpayorder", "cartTips", "orderid", "machineid", "orderno", "recogmode", "haveShopping", "Carting", "timerTem"], _this.config = {
=======
    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "markerDetail", "unpayList", "feedbackslist", "systemUser", "showModalStatus", "showopen", "papayPressed", "qrurl", "showlogin", "showpapay", "isnopasspay", "havearrears", "formid", "isweapp", "mapKey", "latitude", "longitude", "scale", "menus", "screen", "user", "person", "zm", "avatar", "zmdefault", "searchImg", "dw", "unpayImg", "unpriceImg", "pos_", "tempImg", "del", "open", "addr", "mach", "mm", "HearHead", "closebtn", "heardImg", "yyzh", "dyzh", "xydd", "singinImg", "wzc10", "wzc11", "wzc20", "wzc22", "wzc30", "wzc33", "clear", "setp1", "setp2", "setp3", "controls", "isOpened", "mapObj_", "showLocation", "markers", "allMarkers", "bool", "booladdr", "menuright", "token", "checkPapay", "commonCode", "markBoolean", "posBoolean", "unpayBoolean", "machineBoolean", "DensityFree", "HearBoolean", "HearlistBoolean", "singinBoolean", "thumbups", "fee", "befee", "payName", "haslogin", "intervalPapay", "unpayorder", "cartTips", "orderid", "hasMore", "machineid", "orderno", "recogmode", "haveShopping", "Carting", "timerTem"], _this.config = {
>>>>>>> 0309acd... 微信小程序免密版--心愿单
      navigationBarTitleText: '首页'
    }, _this.onHeard = function () {
      console.log('心愿单开启');
      _this.wishBranch();
    }, _this.onInfo = function (e) {
      e.stopPropagation();
      console.log('onInfo');
    }, _this.onClosePos = function (e) {
      //关闭
      e.stopPropagation();
      console.log(e);
      console.log('onInfo1111');
      _this.setState({
        markBoolean: false,
        posBoolean: false
      });
      _this.onsub();
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), '_constructor', this).call(this, props);

      this.state = {
        showModalStatus: false,
        showopen: false,
        papayPressed: false,
        qrurl: "",
        showlogin: false,
        showpapay: false,
        isnopasspay: 0,
        havearrears: 0,
        formid: '',
        isweapp: false,
        mapKey: 'CFOBZ-IOJKX-TGG4T-ZZM75-EXWF2-OHFAP',
        latitude: 39.908823,
        longitude: 116.397470,
        scale: 16,
        menus: _index3.PATH + '/mImages/menus.png',
        screen: _index3.PATH + '/mImages/tytb-3.png',
        user: _index3.PATH + '/mImages/tytb-6.png',
        person: _index3.PATH + '/mImages/tytb-22.png',
        zm: _index3.PATH + '/mImages/zm2.png',
        avatar: '',
        zmdefault: _index3.PATH + '/mImages/zm2.png',
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
        singinImg: _index3.PATH + '/mImages/gban.png',
        wzc10: _index3.PATH + '/mImages/wzc-10.png',
        wzc11: _index3.PATH + '/mImages/wzc-11.png',
        wzc20: _index3.PATH + '/mImages/wzc-20.png',
        wzc22: _index3.PATH + '/mImages/wzc-22.png',
        wzc30: _index3.PATH + '/mImages/wzc-30.png',
        wzc33: _index3.PATH + '/mImages/wzc-33.png',
        clear: _index3.PATH + '/mImages/clear.png',
        setp1: true,
        setp2: false,
        setp3: false,
        controls: [],
        isOpened: false,
        mapObj_: {},
        showLocation: true,
        markers: [],
        allMarkers: [],
        bool: false,
        booladdr: false,
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
        singinBoolean: false,
        thumbups: 0,
        fee: true,
        befee: 0,
        payName: 0.00,
        unpayList: [],
        haslogin: false,
        intervalPapay: {},
        unpayorder: [],
        cartTips: '',
        orderid: '',
<<<<<<< HEAD
=======
        hasMore: true,
>>>>>>> 0309acd... 微信小程序免密版--心愿单
        machineid: '',
        orderno: '',
        recogmode: '',
        haveShopping: false,
        Carting: false,
        feedbackslist: [],
        markerDetail: [],
        timerTem: "0"
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log(this.props, nextProps);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log('---onLoad---');
      if (_index2.default.getEnv() == "ALIPAY") {
        _index3.globalData.isweapp = false;
        //console.log('**支付宝端(isweapp为false)**'+globalData.isweapp)
      }
      if (_index2.default.getEnv() == "WEAPP") {
        _index3.globalData.isweapp = true;
        //console.log('**微信端(isweapp为true)**'+globalData.isweapp)
      }
      this.mapObj = _index2.default.createMapContext("mymap"); //获取地图控件
      var that = this;
      _index2.default.getSystemInfo({}).then(function (res) {
        _index2.default.setStorageSync("userInfo", res);
        data = _index2.default.getStorageSync('userInfo');
      }).catch(function (error) {
        console.log('请检查网络！' + error);
      });
      //请求授权位置
      this.ongetPost();
      //检查用户情况
    }
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {
      order.stopInterval();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      order.stopInterval();
    }
  }, {
<<<<<<< HEAD
=======
    key: 'fetchMoreLikes',
    value: function fetchMoreLikes() {
      if (this.state.hasMore) {
        this.showFeedbackAndThumbups();
      }
    }
  }, {
>>>>>>> 0309acd... 微信小程序免密版--心愿单
    key: 'componentDidShow',
    value: function componentDidShow() {
      var _this2 = this;

      console.log('---onshow---');
<<<<<<< HEAD
=======
      this.setState({
        HearlistBoolean: false
      });
>>>>>>> 0309acd... 微信小程序免密版--心愿单
      var that = this;
      if (this.state.singinBoolean == true && this.state.setp1 == false && this.state.setp2 == true) {
        _index2.default.showLoading({
          title: '免密开通中'
        });
        if (intervalPapayTemp) {
          clearInterval(intervalPapayTemp);
        }
        intervalPapayTemp = setInterval(function () {
          console.log('---循环执行代码 ---');
          that.checkPapay();
        }, 2000);
        intervalPapayTempArr.push(intervalPapayTemp);
        setTimeout(function () {
          _index2.default.hideLoading();
          _index2.default.reLaunch({
            url: '/pages/index/index'
          });
        }.bind(this), 6000);
      } else {
        setTimeout(function () {
          _this2.checkToken();
        }, 2000);
      }
    }
    //setp1 点击获取手机号码授权

  }, {
    key: 'getPhoneNumber',
    value: function getPhoneNumber(e) {
      console.log(e.detail.errMsg);
      var that = this;
      if (e.detail.errMsg == 'getPhoneNumber:ok') {
        var that = this;
        _index2.default.login().then(function (res) {
          console.log(res);
          var code = res.code; //获取code
          console.log('开始登录:' + code);
          function succeeded(res) {
            _index2.default.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 500
            });
            that.setState({
              showlogin: false,
              showpapay: true,
              showopen: false,
              setp1: true,
              setp2: true
            });
            // that.gotoPapay();
          }
          ;
          function failed(res) {
            _index2.default.showToast({
              title: '登陆失败,请再按一下',
              icon: 'fail',
              duration: 500
            });
          }
          ;
          (0, _util.login)(code, e.detail.encryptedData, e.detail.iv, succeeded, failed);
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }, {
    key: 'checkPapay',
    value: function checkPapay() {
      var that = this;
      var data1 = _index2.default.getStorageSync('userInfo');
      _index2.default.request({
        url: _index3.BASE_URL + 'user/detail',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 200) {
            var isnopasspay = res.data.data.isnopasspay;
            if (isnopasspay == "0") {
              that.setState({
                setp2: true
              });
            } else {
              that.setState({
                setp1: true,
                setp2: false,
                singinBoolean: false,
                bool: true,
                controls: [{
                  id: 2,
                  iconPath: wishImg,
                  position: {
                    width: 100,
                    height: 100,
                    left: data.windowWidth - 90,
                    top: (data.windowHeight - 115) / 2
                  },
                  clickable: true
                  // {
                  //   id: 3,
                  //   iconPath:juan,
                  //   position: {
                  //     width: 80,
                  //     height:80,
                  //     left: data.windowWidth-80,
                  //     top: (data.windowHeight-115)/2 +90
                  //   },
                  //   clickable: true
                  // }
                }]
              });
              clearInterval(intervalPapayTemp);
              _index2.default.hideLoading();
            }
          }
        }
      });
    }
    //setp2 开通免密

  }, {
    key: 'gotoPapay',
    value: function gotoPapay() {
      var that = this;
      _index2.default.request({
        method: 'POST',
        url: _index3.BASE_URL + 'pay/getPapayExtraData',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        }
      }).then(function (res) {
        _index2.default.navigateToMiniProgram({
          appId: 'wxbd687630cd02ce1d',
          path: 'pages/index/index',
          extraData: {
            appid: res.data.appid,
            contract_code: res.data.contract_code,
            contract_display_account: res.data.contract_display_account,
            mch_id: res.data.mch_id,
            notify_url: res.data.notify_url,
            plan_id: res.data.plan_id,
            request_serial: res.data.request_serial,
            timestamp: res.data.timestamp,
            sign: res.data.sign
          }
        }).then(function (res) {
          that.getUserDetail();
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
    //得到用户信心

  }, {
    key: 'getUserDetail',
    value: function getUserDetail() {
      var _this3 = this;

      var that = this;
      _index2.default.showLoading({
        'title': ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'user/detail',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        }
      }).then(function (res) {
        _index2.default.hideLoading();
        _index2.default.setStorageSync("userDetail", res);
        var data1 = _index2.default.getStorageSync('userInfo');
        if (res.data.code == 200) {
          _index3.globalData.haslogin = true;
          var $setp1 = true;
          var $setp2 = true;
          var $singinBoolean = true;
          var $fee = 0;
          var $markBoolean = true;
          var $avatarUrl = res.data.data.avatar;
          _index3.globalData.avatar = $avatarUrl;
          _index3.globalData.fee = res.data.data.fee;
          _index3.globalData.nickname = res.data.data.nickname;
          if (res.data.data.isnopasspay == "1") {
            $singinBoolean = false;
            $markBoolean = false;
            var userid = res.data.data.userid;
            if (userid) {
              that.fetchWishCount();
            }
          } else {
            $singinBoolean = true;
            $markBoolean = true;
          }
          if (res.data.data.havearrears == "1") {
            that.getUnpayOrder();
          } else {
            console.log('没有未结订单！');
          }
          if (res.data.data.fee) {
            $fee = res.data.data.fee;
          }
          _this3.setState({
            setp1: $setp1,
            setp2: $setp2,
            singinBoolean: $singinBoolean,
            markBoolean: $markBoolean,
            befee: $fee,
            bool: true,
            controls: [{
              id: 2,
              iconPath: wishImg,
              position: {
                width: 100,
                height: 100,
                left: data.windowWidth - 90,
                top: (data.windowHeight - 115) / 2
              },
              clickable: true
              //,
              // {
              //   id: 3,
              //   iconPath:juan,
              //   position: {
              //     width: 80,
              //     height:80,
              //     left: data.windowWidth-80,
              //     top: (data.windowHeight-115)/2 +90
              //   },
              //   clickable: true
              // }
            }],
            zm: $avatarUrl !== null ? $avatarUrl : _this3.state.zmdefault
          });
        } else {
          _index2.default.removeStorageSync('token');
          _index3.globalData.haslogin = false;
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
    //付支付订单

  }, {
    key: 'getUnpayOrder',
    value: function getUnpayOrder() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'order/unpayorder',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          if (res.data.code == 200) {
            _index2.default.setStorageSync("orderid", res.data.data.orderid);
            that.setState({
              unpayorder: res.data.data,
              singinBoolean: false,
              unpayBoolean: true,
              markBoolean: true
            });
          } else {
            console.log('没有未支付订单！');
          }
        }
      });
    }
    // 提取心愿回复数

  }, {
    key: 'fetchWishCount',
    value: function fetchWishCount() {
      var _this4 = this;

      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/n',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('thumbups:');
          console.log(res);
          _this4.setState({
            thumbups: res.data.data
          });
          thumbups_ = res.data.data;
        },
        fail: function fail(err) {
          _this4.setState({
            thumbups: 0
          });
          thumbups_ = 0;
        }
      });
    }
    //setp3 去购物

  }, {
    key: 'goshoping',
    value: function goshoping() {
      this.getUserDetail();
      var data = _index2.default.getStorageSync("userDetail");
      var data1 = _index2.default.getStorageSync('userInfo');
      var that = this;
      if (data.data.data.havearrears == 0) {
        that.setState({
          singinBoolean: false,
          markBoolean: false,
          bool: true,
          befee: data.data.data.fee,
          controls: [{
            id: 2,
            iconPath: wishImg,
            position: {
              width: 100,
              height: 100,
              left: data.windowWidth - 90,
              top: (data.windowHeight - 115) / 2
            },
            clickable: true
            // ,
            // {
            //   id: 3,
            //   iconPath:juan,
            //   position: {
            //     width: 80,
            //     height:80,
            //     left: data.windowWidth-80,
            //     top: (data.windowHeight-115)/2 +90
            //   },
            //   clickable: true
            // }
          }]
        });
      }
      if (data.data.data.havearrears == 1) {
        that.setState({
          singinBoolean: false,
          markBoolean: false
        });
      }
    }
  }, {
    key: 'onStored',
    value: function onStored() {
      //储值
      _index2.default.navigateTo({
        url: '/pages/recharge/recharge?avatar=' + _index3.globalData.avatar + '&nickname=' + _index3.globalData.nickname + '&fee=' + _index3.globalData.fee
      });
    }
  }, {
    key: 'closeSingin',
    value: function closeSingin() {
      this.setState({
        singinBoolean: false,
        markBoolean: false
      });
    }
  }, {
    key: 'ongetUserInfo',
    value: function ongetUserInfo() {
      _index2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userInfo']) {
            _index2.default.getUserInfo().then(function (res) {
              console.log('获取用户信息');
            }).catch(function (error) {
              console.log("用户没有授权");
              console.log(error);
            });
          } else {
            console.log('用户未授权');
            _index2.default.authorize({
              scope: 'scope.userInfo'
            }).then(function (res) {
              console.log('用户授权信息：');
              console.log(res);
            }).catch(function (error) {
              console.log('error');
            });
          }
        }
      });
    }
  }, {
    key: 'setPost',
    value: function setPost() {
      this.setState({
        markBoolean: true,
        posBoolean: true
      });
    }
  }, {
    key: 'ongetPost',
    value: function ongetPost() {
      var that = this;
      _index2.default.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            that.setPost();
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            that.ongetLocation();
          } else {
            that.ongetLocation();
          }
        }
      });
    }
    //定位到中心点

  }, {
    key: 'moveToCenter',
    value: function moveToCenter() {
      _index2.default.createMapContext("mymap").moveToLocation();
    }
  }, {
    key: 'ongetLocation',
    value: function ongetLocation() {
      var that = this;
      _index2.default.getLocation({
        type: 'gcj02' //wgs84 gcj02
      }).then(function (res) {
        console.log("获取用户定位：");
        console.log(res);
        var data = _index2.default.getStorageSync('userInfo');
        console.log(data);
        _index3.globalData.lastLon = res.latitude;
        _index3.globalData.longitude = res.longitude;
        console.log("latitude:" + _index3.globalData.lastLon);
        console.log("longitude:" + _index3.globalData.longitude);
        that.setState({
          latitude: res.latitude,
          longitude: res.longitude
        });
        console.log(that.mapObj);
        that.mapObj.moveToLocation();
        console.log("res.latitude,res.longitude");
        console.log(res.latitude, res.longitude);
        console.log('添加地图周围机柜信息');
        that.getNearbyMachines(res.latitude, res.longitude);
        //that.getNearbyMachines(res.latitude,res.longitude);
      }).catch(function (res) {
        console.log("获取用户定位失败111：");
        console.log(res); //请确定定位相关权限已开启
        //console.log(res.errCode)
        if (_index3.globalData.isweapp == true) {
          that.setState({
            posBoolean: true,
            markBoolean: true
          });
        } else {
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
    //设置定位关闭

  }, {
    key: 'oncancel',
    value: function oncancel() {
      //调用用户信息
      var data = _index2.default.getStorageSync('userInfo');
      this.setState({
        controls: [{
          id: 2,
          iconPath: wishImg,
          position: {
            width: 100,
            height: 100,
            left: data.windowWidth - 90,
            top: (data.windowHeight - 115) / 2
          },
          clickable: true
          // ,
          // {
          //   id: 3,
          //   iconPath: juan,
          //   position: {
          //     width: 80,
          //     height: 80,
          //     left: data.windowWidth - 80,
          //     top: (data.windowHeight - 115) / 2 + 90
          //   },
          //   clickable: true
          // }
        }]
      });
    }
    //验证token是否有效

  }, {
    key: 'verifyToken',
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
    key: 'myGetAuthCode',
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
    key: 'wxGetAuthCode',
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
    key: 'checkLogin',
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
    key: 'checkToken',
    value: function checkToken() {
      _index2.default.showLoading({
        title: ''
      });
      var that = this;
      _index2.default.getStorage({
        key: 'token'
      }).then(function (res) {
        console.log(res);
        _index2.default.hideLoading();
        var token = res.data;
        console.log('token');
        console.log(token);
        if (token == null || token == '' || token == 'undefined') {
          console.log('*********不存在token*尝试自动登录**********');
          that.checkUser();
        } else {
          console.log('*********存在token:检查登录是否有效***********');
          _index2.default.request({
            url: _index3.BASE_URL + 'token/verifyToken',
            data: {
              'token': token
            },
            header: {
              'content-type': 'application/json',
              'token': token
            }
          }).then(function (res) {
            //判断token是否有效
            if (res.data.code == 200) {
              console.log('-----token 有效----');
              _index3.globalData.token = token;
              that.getUserDetail();
              that.checkShopping();
            } else if (res.data.code == 215) {
              console.log('-----token 无效----');
              _index2.default.removeStorageSync('token');
              _index2.default.removeStorageSync('userInfo');
              that.checkUser();
            }
          }).catch(function (err) {
            console.log('*********不存在token***********2');
            that.checkUser();
          });
        }
      }).catch(function (error) {
        _index2.default.hideLoading();
        console.log('*********不存在token***********清除');
        console.log(error);
        that.checkUser();
      });
    }
    //更新用户心思

  }, {
    key: 'updateuserinfo',
    value: function updateuserinfo() {}
    //更新用户信息

    //检查是否购买过商品

  }, {
    key: 'checkShopping',
    value: function checkShopping() {
      var that = this;
      order.shoppingorder(function successed(result) {
        // 如果有购物中订单，设置页面状态，并开启轮询
        var orderid = result.orderid;
        var machineid = result.machineid;
        var orderno = result.orderno;
        var recogmode = result.recogmode;
        _index2.default.setStorageSync('goodsResult', result);
        that.setState({
          cartTips: '您有一张订单正在购物中',
          orderid: orderid,
          machineid: machineid,
          orderno: orderno,
          recogmode: recogmode,
          haveShopping: true
        });
        order.startqueryorderstatus(orderid, function succeeded(res) {
          console.log('res:订单数据');
          console.log(res);
          var orderstatus = res.data.data.orderstatus;
          var doorstatus = res.data.data.doorstatus;
          if (res.data.code == 200) {
            if (orderstatus == "5" || orderstatus == "3" || orderstatus == "7" || orderstatus == "8" || orderstatus == "9") {
              //5已付款 3已取消 8已完成 9 错误
              console.log('------执行这里-----------');
              order.stopInterval();
              setTimeout(function () {
                _index2.default.redirectTo({
                  url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderid + "&whereis=all"
                });
              }, 3000);
            } else if (orderstatus == "6") {
              order.stopInterval();
              that.requestPay(orderid);
            } else {
              console.log('------苏晓燕1111111您有一张订单正在结算中-----');
              that.setState({
                cartTips: '您有一张订单正在结算中',
                Carting: true,
                bool: false,
                markBoolean: true,
                haveShopping: true
              });
            }
          }
        });
      });
    }
    //购物中订单

  }, {
    key: 'gotoCart',
    value: function gotoCart(e) {
      console.log("e.currentTarget.dataset:");
      console.log(e.currentTarget.dataset);
      var that = this;
      var orderid = e.currentTarget.dataset.orderid;
      var machineid = e.currentTarget.dataset.machineid;
      var orderno = e.currentTarget.dataset.orderno;
      var recogmode = e.currentTarget.dataset.recogmode;
      console.log("orderid: " + orderid);
      if (recogmode == 3) {
        //重力柜
        _index2.default.setStorageSync("orderid", orderid);
        _index2.default.redirectTo({
          url: '/pages/index/shopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno + '&from=index'
        });
      } else {
        _index2.default.setStorageSync("orderid", orderid);
        _index2.default.redirectTo({
          url: '/pages/index/cgshopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno
        });
      }
    }
    //发起支付

  }, {
    key: 'requestPay',
    value: function requestPay(orderid) {
      var that = this;
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        method: 'POST',
        data: {
          'orderid': orderid
        },
        url: _index3.BASE_URL + 'pay/getPreGoodsOrder',
        header: {
          'Accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          _index2.default.hideLoading();
          if (res.data.code == 200) {
            _index2.default.requestPayment({
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': res.data.data.signType,
              'paySign': res.data.data.paySign,
              'success': function success(res) {
                console.log('success', res);
                that.queryPayStatus(orderid);
              },
              'fail': function fail(res) {
                console.log('fail', res);
                //edit at 0606
                _index2.default.showModal({
                  title: '提示',
                  content: '支付失败，请重新支付',
                  showCancel: false,
                  success: function success(res) {
                    // if (res.confirm) {
                    //   that.updatePayStatus(0, orderid);
                    //   that.getUnpayOrder();
                    // }
                  }
                });
              }
            });
          } else {
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            });
          }
        }
      });
    }
    //支付接口

  }, {
    key: 'queryPayStatus',
    value: function queryPayStatus(orderid) {
      var that = this;
      _index2.default.showLoading({
        title: '等待支付结果...'
      });
      //查询订单状态
      intervalOrderStatus = setInterval(function () {
        _index2.default.request({
          method: 'POST',
          data: {
            'orderid': orderid
          },
          url: _index3.BASE_URL + 'order/paystatus',
          header: {
            'Accept': 'application/json',
            'token': _index3.globalData.token
          },
          success: function success(res) {
            console.log(res.data.data);
            if (res.data.data.orderstatus == 5) {
              console.log('----payed---');
              clearInterval(intervalOrderStatus);
              _index2.default.hideLoading();
              that.setState({
                unpayBoolean: false,
                singinBoolean: true,
                markBoolean: true
              });
              that.getUserDetail();
            }
          }
        });
      }, 2000); //循环时间2秒
    }
    //检查用户是否登录

  }, {
    key: 'checkUser',
    value: function checkUser() {
      var that = this;
      _index2.default.login().then(function (res) {
        console.log('得到code');
        var code = res.code;
        console.log(code);
        _index2.default.request({
          url: _index3.BASE_URL + 'token/checkUser',
          data: {
            'code': code
          },
          header: {
            'content-type': 'application/json',
            'token': _index3.globalData.token
          },
          method: 'GET'
        }).then(function (res) {
          console.log(res);
          if (res.data.code == 200) {
            console.log('服务器登录成功');
            _index2.default.setStorage({
              key: "token",
              data: res.data.data
            });
            _index3.globalData.token = res.data.data;
            _index3.globalData.haslogin = true;
            that.setState({
              setp1: true,
              setp2: true
            });
            console.log('globalData.token');
            console.log(_index3.globalData.token);
            console.log('检查用户是否已经注册过：用户存在');
            that.getUserDetail();
          } else if (res.data.code == 216) {
            console.log('检查用户是否已经注册过：用户不存在');
            console.log('页面停留在登录界面第一步');
            that.setState({
              singinBoolean: true,
              markBoolean: true,
              setp1: true,
              setp2: false
            });
          }
        }).catch(function (error) {
          console.log("得到code错误信息");
          console.log(error);
        });
      });
    }
    //获取机柜的经纬度坐标，必须获取token才可以拿到

  }, {
    key: 'getNearbyMachines',
    value: function getNearbyMachines(latitude, longitude) {
      //throw new Error("Method not implemented.");
      if (latitude == 0 && longitude == 0) {
        return;
      }
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'machine/nearbymachines',
        data: {
          lon: longitude,
          lat: latitude,
          distance: 1000
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('附近获取机柜信息：');
          console.log(res.data);
          var data1 = _index2.default.getStorageSync('userInfo');
          var markers = [];
          var temps = res.data.data;
          markers = temps.map(function (item, index) {
            item.iconPath = flag;
            item.width = 50;
            item.height = 50;
            item.latitude = res.data.data[index].lat;
            item.longitude = res.data.data[index].lon;
            item.id = res.data.data[index].machineid;
            return item;
          });
          console.log('markers:');
          console.log(markers);
          // for (var i = 0; i < res.data.data.length; i++) {
          //   var marker:object = {};
          //   marker.iconPath = "../../assets/images/jgtb.png";
          //   marker.id = res.data.data[i].machineid;
          //   marker.width = 40;
          //   marker.height = 40;
          //   marker.latitude = res.data.data[i].lat;
          //   marker.longitude = res.data.data[i].lon;
          //   markers.push(marker);
          // }
          that.setState({
            markers: markers,
            allMarkers: res.data.data
          });
        }
      });
    }
    //确定按钮

  }, {
    key: 'onsub',
    value: function onsub() {
      //选择定位地点
      console.log('选择定位地点');
      var that = this;
      _index2.default.openSetting({
        success: function success(data) {
          console.log(data);
          if (data.authSetting["scope.userLocation"] == true) {
            _index2.default.showToast({
              title: '授权成功',
              icon: 'success',
              duration: 5000
            });
            //再次授权，调用getLocationt的API
            that.ongetLocation();
          } else {
            _index2.default.showToast({
              title: '授权失败',
              icon: 'success',
              duration: 5000
            });
          }
        }
      });
    }
  }, {
    key: 'onconcel',
    value: function onconcel() {
      console.log('取消操作');
    }
  }, {
    key: 'onControlTap',
    value: function onControlTap(e) {
      //点击地图菜单项，点击那个就返回哪个的controlId
      console.log(e.controlId);
      if (e.controlId == 2) {
        //开启心愿单
        this.onHeard();
      }
    }
    //心愿单页面跳转

  }, {
    key: 'myWishList',
    value: function myWishList() {
      this.hideFeedbackAndThumbups();
      console.log("latitude:" + _index3.globalData.lastLon);
      console.log("longitude:" + _index3.globalData.longitude);
      _index2.default.navigateTo({
        url: "../wish/likes/myheart?avatar=" + _index3.globalData.avatarUrl + "&lon=" + _index3.globalData.lastLon + "&lat=" + _index3.globalData.longitude
      });
    }
    //重置

  }, {
    key: 'resetWishParam',
    value: function resetWishParam() {
      tsFeedback = '2099-12-31';
      tsWish = '2099-12-31';
      feedbacks = [];
    }
    //隐藏心愿面板

  }, {
    key: 'hideFeedbackAndThumbups',
    value: function hideFeedbackAndThumbups() {
      this.setState({
        HearlistBoolean: false
      });
    }
    //判断是否有回复，如果没有就跳入心愿单页面

  }, {
    key: 'wishBranch',
    value: function wishBranch() {
      if (thumbups_ == 0) {
        this.myWishList();
      } else if (thumbups_ > 0) {
        this.resetWishParam();
        this.showFeedbackAndThumbups();
      } else {
        // TODO
        this.resetWishParam();
        this.showFeedbackAndThumbups();
      }
    }
    //得到心愿回复

  }, {
    key: 'showFeedbackAndThumbups',
    value: function showFeedbackAndThumbups() {
      var _this5 = this;

<<<<<<< HEAD
=======
      var that = this;
>>>>>>> 0309acd... 微信小程序免密版--心愿单
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/getWishAndFeedBack',
        data: {
          // userid: this.data.userid,
          pageSize: 10,
          tsFeedback: tsFeedback,
          tsWish: tsWish
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('getWishAndFeedBack:');
          console.log(res.data.rows);
          var rows = res.data.rows;
          _this5.updateWishTimeStamp(rows);
          _this5.addRows(rows);
          _index2.default.hideLoading();
          _this5.setState({
            machineBoolean: false,
            HearlistBoolean: true,
            feedbackslist: feedbacks
          });
          //feedbacks = this.data.feedbacks
<<<<<<< HEAD
          hasMore = res.data.hasMore;
=======
          that.setState({
            hasMore: res.data.hasMore
          });
>>>>>>> 0309acd... 微信小程序免密版--心愿单
        },
        fail: function fail(err) {
          _index2.default.hideLoading();
          _index2.default.showToast({
            title: '请求失败',
            icon: 'fail',
            duration: 2000
          });
        }
      });
    }
  }, {
    key: 'addRows',
    value: function addRows(rows) {
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].type == 'f') {
          feedbacks.splice(0, 0, rows[i]);
        } else {
          feedbacks.push(rows[i]);
        }
      }
      console.log("feedbacks:");
      console.log(feedbacks);
    }
  }, {
    key: 'updateWishTimeStamp',
    value: function updateWishTimeStamp(rows) {
<<<<<<< HEAD
      tsFeedback = rows.map(function (item, index) {
        if (item.type == 'f') {
          return item.ts;
        }
      });
      tsWish = rows.map(function (item, index) {
        if (item.type !== 'f') {
          return item.ts;
=======
      rows.map(function (item, index) {
        if (item.type == 'f') {
          tsFeedback = item.ts;
        }
      });
      rows.map(function (item, index) {
        if (item.type !== 'f') {
          tsWish = item.ts;
>>>>>>> 0309acd... 微信小程序免密版--心愿单
        }
      });
      console.log('tsFeedback:' + tsFeedback);
      console.log('tsWish:' + tsWish);
    }
  }, {
    key: 'onRight',
    value: function onRight() {
      console.log('微信客服');
      _index2.default.navigateTo({
        url: '/pages/service/service'
      });
    }
  }, {
    key: 'gohome',
    value: function gohome() {
      console.log('首页');
      _index2.default.navigateTo({
        url: '/pages/index/index'
      });
    }
  }, {
    key: 'ongotopersonal',
    value: function ongotopersonal() {
      _index2.default.navigateTo({
        url: '/pages/personal/index'
      });
    }
    //去登陆

  }, {
    key: 'ongotologin',
    value: function ongotologin() {
      _index2.default.navigateTo({
        url: '/pages/personal/index'
      });
    }
  }, {
    key: 'onLeft',
    value: function onLeft() {
      console.log('个人中心');
      this.ongotologin();
    }
  }, {
    key: 'paytipsmodal',
    value: function paytipsmodal(currentStatu) {
      //关闭  
      // if (currentStatu == "close") {
      //   this.setData({
      //     showPayModalStatus: false
      //   });
      // }
      // 显示  
      // if (currentStatu == "open") {
      //   this.setData({
      //     showPayModalStatus: true
      //   });
      // }
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
          } else {
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {
                  that.gohome();
                }
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
          _index2.default.showToast({
            title: '您有未结订单',
            icon: 'fail',
            duration: 2000
          });
          that.setState({
            cartTips: '您有一张订单正在结算中',
            Carting: true,
            bool: false,
            markBoolean: true,
            haveShopping: true
          });
          that.gohome();
        }
        if (res.data.code == 202) {
          console.log('您的帐号异常，请与客服联系！');
          _index2.default.showToast({
            title: '您的帐号异常！',
            icon: 'fail',
            duration: 2000
          });
        }
        if (res.data.code == 205) {
          console.log('用户未登录');
          _index2.default.showToast({
            title: '用户未登录',
            icon: 'fail',
            duration: 2000
          });
          //that.gohome();
        }
        if (res.data.code == 206) {
          console.log('请开通免密');
          _index2.default.showToast({
            title: '请开通免密',
            icon: 'fail',
            duration: 2000
          });
          //that.gohome();
        }
      });
    }
    // onMM() {
    //   console.log('开启免密')
    // }

  }, {
    key: 'onCloseHeard',
    value: function onCloseHeard() {
      console.log('关闭心愿单');
      this.setState({
        HearBoolean: false,
        markBoolean: false
      });
    }
  }, {
    key: 'onCloseHeardlist',
    value: function onCloseHeardlist() {
      console.log('关闭心愿单列表');
      this.setState({
        HearlistBoolean: false,
        markBoolean: false
      });
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
    key: 'onPay',
    value: function onPay() {
      console.log('订单明细页面');
      _index2.default.navigateTo({
        url: '/pages/orders/index'
      });
    }
  }, {
    key: 'payOrder',
    value: function payOrder() {
      var orderid = _index2.default.getStorageSync("orderid");
      //var orderid = this.data.unpayorder.orderid;
      this.setState({
        orderid: orderid
      });
      this.requestPay(orderid);
    }
  }, {
    key: 'gotoCartFn',
    value: function gotoCartFn() {
      var result = _index2.default.getStorageSync('goodsResult');
      var orderid = result.orderid;
      var machineid = result.machineid;
      var orderno = result.orderno;
      var recogmode = result.recogmode;
      this.gotoCart(orderid, machineid, orderno, recogmode);
    }
  }, {
    key: 'closeCarting',
    value: function closeCarting() {
      this.setState({
        Carting: false,
        markBoolean: false
      });
    }
  }, {
    key: 'regionchange',
    value: function regionchange(e) {
      console.log('e:' + e);
      console.log(e);
      var that = this;
      that.setState({
        machineBoolean: false
      });
      if (e.type == 'end') {
        if (this.mapContext) {
          this.mapContext.getCenterLocation({
            success: function success(res) {
              // that.setData({
              //   latitude: res.latitude,
              //   longitude: res.longitude
              // });
              console.log('------');
              that.getNearbyMachines(res.latitude, res.longitude);
            }
          });
        }
      }
    }
  }, {
    key: 'markertap',
    value: function markertap(e) {
      var that = this;
      var curmachineid = '';
      for (var i = 0; i < this.state.markers.length; i++) {
        if (e.markerId == this.state.markers[i].id) {
          curmachineid = this.state.allMarkers[i].machineid;
        }
      }
      if (curmachineid != '') {
        _index2.default.getLocation({
          type: 'wgs84',
          success: function success(res) {
            var latitude = res.latitude;
            var longitude = res.longitude;
            _index2.default.request({
              url: _index3.BASE_URL + 'machine/indexmachinedetail',
              data: {
                lon: longitude,
                lat: latitude,
                machineid: curmachineid
              },
              header: {
                'content-type': 'application/json',
                'token': _index3.globalData.token
              },
              success: function success(res) {
                // that.showBottomModal();
                console.log('res:');
                console.log(res);
                that.setState({
                  markerDetail: res.data.data,
                  machineBoolean: true
                });
                machineid = res.data.data.machineid;
              }
            });
          },
          fail: function fail(res) {
            _index2.default.openSetting({
              //重新请求获取定位
              success: function success(res) {
                if (res.authSetting["scope.userLocation"]) {}
              }
            });
          }
        });
      }
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      // this.setState({
      //   machineBoolean: false
      // })
      _index2.default.navigateTo({
        url: "../box/boxdetail/boxdetail?machineid=" + machineid
      });
    }
  }, {
    key: 'topersonfn',
    value: function topersonfn() {
      console.log('个人主页');
      _index2.default.navigateTo({
        url: '/pages/personal/index'
      });
    }
  }, {
    key: '_createData',
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state = this.__state,
          unpayList = _state.unpayList,
          feedbackslist = _state.feedbackslist,
          markerDetail = _state.markerDetail;

      var anonymousState__temp = this.__state.unpayBoolean ? (this.__state.unpayorder.payfee / 100).toFixed(2) : null;
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        systemUser: _index3.systemUser
      });
      return this.__state;
    }
  }]);

  return Index;
<<<<<<< HEAD
}(_index.Component), _class.properties = {}, _class.$$events = ["onControlTap", "markertap", "regionchange", "topersonfn", "onStored", "getPhoneNumber", "gotoPapay", "onInfo", "gotoCart", "onClosePos", "payOrder", "gotoCartFn", "onCloseHeardlist", "onSetheart", "onScreen", "onRight", "onLeft", "hideModal"], _temp2);
=======
}(_index.Component), _class.properties = {}, _class.$$events = ["onControlTap", "markertap", "regionchange", "topersonfn", "onStored", "getPhoneNumber", "gotoPapay", "onInfo", "gotoCart", "onClosePos", "payOrder", "gotoCartFn", "onCloseHeardlist", "onSetheart", "fetchMoreLikes", "onScreen", "onRight", "onLeft", "hideModal"], _temp2);
>>>>>>> 0309acd... 微信小程序免密版--心愿单
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
// export default Index as ComponentClass<PageOwnProps, PageState>


exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,a){return t&&o(e.prototype,t),a&&o(e,a),e}}(),_get=function e(t,a,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,a);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,a,o)}if("value"in n)return n.value;var s=n.get;return void 0!==s?s.call(o):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../config/index.js"),_util=require("../../utils/util.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var intervalOrderStatus,thumbups_,intervalPapayTemp=0,tsFeedback="2099-12-31",tsWish="2099-12-31",feedbacks=[],hasMore=!1,machineid="",data=[],count=0,timer=0,timerList=[],intervalPapayTempArr=[],order=require("../../utils/order.js"),wishImg="/assets/images/syxytb.png",flag="/assets/images/jgtb.png",Index=(_temp2=_class=function(e){function s(){var e,t,a;_classCallCheck(this,s);for(var o=arguments.length,n=Array(o),i=0;i<o;i++)n[i]=arguments[i];return(t=a=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp","markerDetail","unpayList","feedbackslist","systemUser","showModalStatus","showopen","papayPressed","qrurl","showlogin","showpapay","isnopasspay","havearrears","formid","isweapp","mapKey","latitude","longitude","scale","menus","screen","user","person","zm","avatar","zmdefault","searchImg","dw","unpayImg","unpriceImg","pos_","tempImg","del","open","addr","mach","mm","HearHead","closebtn","heardImg","yyzh","dyzh","xydd","singinImg","wzc10","wzc11","wzc20","wzc22","wzc30","wzc33","clear","setp1","setp2","setp3","controls","isOpened","mapObj_","showLocation","markers","allMarkers","bool","booladdr","menuright","token","checkPapay","commonCode","markBoolean","posBoolean","unpayBoolean","machineBoolean","DensityFree","HearBoolean","HearlistBoolean","singinBoolean","thumbups","fee","befee","payName","haslogin","intervalPapay","unpayorder","cartTips","orderid","hasMore","machineid","orderno","recogmode","haveShopping","Carting","timerTem"],a.config={navigationBarTitleText:"首页"},a.onHeard=function(){console.log("心愿单开启"),a.wishBranch()},a.onInfo=function(e){e.stopPropagation(),console.log("onInfo")},a.onClosePos=function(e){e.stopPropagation(),console.log(e),console.log("onInfo1111"),a.setState({markBoolean:!1,posBoolean:!1}),a.onsub()},a.$$refs=[],_possibleConstructorReturn(a,t)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={showModalStatus:!1,showopen:!1,papayPressed:!1,qrurl:"",showlogin:!1,showpapay:!1,isnopasspay:0,havearrears:0,formid:"",isweapp:!1,mapKey:"CFOBZ-IOJKX-TGG4T-ZZM75-EXWF2-OHFAP",latitude:39.908823,longitude:116.39747,scale:16,menus:_index3.PATH+"/mImages/menus.png",screen:_index3.PATH+"/mImages/tytb-3.png",user:_index3.PATH+"/mImages/tytb-6.png",person:_index3.PATH+"/mImages/tytb-22.png",zm:_index3.PATH+"/mImages/zm2.png",avatar:"",zmdefault:_index3.PATH+"/mImages/zm2.png",searchImg:_index3.PATH+"/mImages/searchImg.png",dw:_index3.PATH+"/mImages/dw.png",unpayImg:_index3.PATH+"/mImages/wfk-11.png",unpriceImg:_index3.PATH+"/mImages/wfk.png",pos_:_index3.PATH+"/mImages/bg_0.png",tempImg:"http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg",del:_index3.PATH+"/mImages/clear.png",open:_index3.PATH+"/mImages/yyz.png",addr:_index3.PATH+"/mImages/tytb-4.png",mach:_index3.PATH+"/mImages/tytb-1.png",mm:_index3.PATH+"/mImages/mm.png",HearHead:_index3.PATH+"/mImages/ysjtb1.png",closebtn:_index3.PATH+"/mImages/gban1.png",heardImg:_index3.PATH+"/mImages/fkz.png",yyzh:_index3.PATH+"/mImages/yyz_f.png",dyzh:_index3.PATH+"/mImages/dyz_f.png",xydd:_index3.PATH+"/mImages/xyd_img.png",singinImg:_index3.PATH+"/mImages/gban.png",wzc10:_index3.PATH+"/mImages/wzc-10.png",wzc11:_index3.PATH+"/mImages/wzc-11.png",wzc20:_index3.PATH+"/mImages/wzc-20.png",wzc22:_index3.PATH+"/mImages/wzc-22.png",wzc30:_index3.PATH+"/mImages/wzc-30.png",wzc33:_index3.PATH+"/mImages/wzc-33.png",clear:_index3.PATH+"/mImages/clear.png",setp1:!0,setp2:!1,setp3:!1,controls:[],isOpened:!1,mapObj_:{},showLocation:!0,markers:[],allMarkers:[],bool:!1,booladdr:!1,menuright:[],token:"",checkPapay:!1,commonCode:"",markBoolean:!1,posBoolean:!1,unpayBoolean:!1,machineBoolean:!1,DensityFree:!1,HearBoolean:!1,HearlistBoolean:!1,singinBoolean:!1,thumbups:0,fee:!0,befee:0,payName:0,unpayList:[],haslogin:!1,intervalPapay:{},unpayorder:[],cartTips:"",orderid:"",hasMore:!0,machineid:"",orderno:"",recogmode:"",haveShopping:!1,Carting:!1,feedbackslist:[],markerDetail:[],timerTem:"0"}}},{key:"componentWillReceiveProps",value:function(e){console.log(this.props,e)}},{key:"componentWillMount",value:function(){console.log("---onLoad---"),"ALIPAY"==_index2.default.getEnv()&&(_index3.globalData.isweapp=!1),"WEAPP"==_index2.default.getEnv()&&(_index3.globalData.isweapp=!0),this.mapObj=_index2.default.createMapContext("mymap");_index2.default.getSystemInfo({}).then(function(e){_index2.default.setStorageSync("userInfo",e),data=_index2.default.getStorageSync("userInfo")}).catch(function(e){console.log("请检查网络！"+e)}),this.ongetPost()}},{key:"componentDidHide",value:function(){order.stopInterval()}},{key:"componentWillUnmount",value:function(){order.stopInterval()}},{key:"fetchMoreLikes",value:function(){this.state.hasMore&&this.showFeedbackAndThumbups()}},{key:"componentDidShow",value:function(){var e=this;console.log("---onshow---"),this.setState({HearlistBoolean:!1});var t=this;1==this.state.singinBoolean&&0==this.state.setp1&&1==this.state.setp2?(_index2.default.showLoading({title:"免密开通中"}),intervalPapayTemp&&clearInterval(intervalPapayTemp),intervalPapayTemp=setInterval(function(){console.log("---循环执行代码 ---"),t.checkPapay()},2e3),intervalPapayTempArr.push(intervalPapayTemp),setTimeout(function(){_index2.default.hideLoading(),_index2.default.reLaunch({url:"/pages/index/index"})}.bind(this),6e3)):setTimeout(function(){e.checkToken()},2e3)}},{key:"getPhoneNumber",value:function(a){console.log(a.detail.errMsg);var o=this;if("getPhoneNumber:ok"==a.detail.errMsg){o=this;_index2.default.login().then(function(e){console.log(e);var t=e.code;console.log("开始登录:"+t),(0,_util.login)(t,a.detail.encryptedData,a.detail.iv,function(e){_index2.default.showToast({title:"登陆成功",icon:"success",duration:500}),o.setState({showlogin:!1,showpapay:!0,showopen:!1,setp1:!0,setp2:!0})},function(e){_index2.default.showToast({title:"登陆失败,请再按一下",icon:"fail",duration:500})})}).catch(function(e){console.log(e)})}}},{key:"checkPapay",value:function(){var t=this;_index2.default.getStorageSync("userInfo");_index2.default.request({url:_index3.BASE_URL+"user/detail",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){200==e.data.code&&("0"==e.data.data.isnopasspay?t.setState({setp2:!0}):(t.setState({setp1:!0,setp2:!1,singinBoolean:!1,bool:!0,controls:[{id:2,iconPath:wishImg,position:{width:100,height:100,left:data.windowWidth-90,top:(data.windowHeight-115)/2},clickable:!0}]}),clearInterval(intervalPapayTemp),_index2.default.hideLoading()))}})}},{key:"gotoPapay",value:function(){var t=this;_index2.default.request({method:"POST",url:_index3.BASE_URL+"pay/getPapayExtraData",data:{},header:{"content-type":"application/json",token:_index3.globalData.token}}).then(function(e){_index2.default.navigateToMiniProgram({appId:"wxbd687630cd02ce1d",path:"pages/index/index",extraData:{appid:e.data.appid,contract_code:e.data.contract_code,contract_display_account:e.data.contract_display_account,mch_id:e.data.mch_id,notify_url:e.data.notify_url,plan_id:e.data.plan_id,request_serial:e.data.request_serial,timestamp:e.data.timestamp,sign:e.data.sign}}).then(function(e){t.getUserDetail()}).catch(function(e){console.log(e)})}).catch(function(e){console.log(e)})}},{key:"getUserDetail",value:function(){var i=this,s=this;_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"user/detail",data:{},header:{"content-type":"application/json",token:_index3.globalData.token}}).then(function(e){_index2.default.hideLoading(),_index2.default.setStorageSync("userDetail",e);_index2.default.getStorageSync("userInfo");if(200==e.data.code){_index3.globalData.haslogin=!0;var t=!0,a=0,o=!0,n=e.data.data.avatar;if(_index3.globalData.avatar=n,_index3.globalData.fee=e.data.data.fee,_index3.globalData.nickname=e.data.data.nickname,"1"==e.data.data.isnopasspay)o=t=!1,e.data.data.userid&&s.fetchWishCount();else o=t=!0;"1"==e.data.data.havearrears?s.getUnpayOrder():console.log("没有未结订单！"),e.data.data.fee&&(a=e.data.data.fee),i.setState({setp1:!0,setp2:!0,singinBoolean:t,markBoolean:o,befee:a,bool:!0,controls:[{id:2,iconPath:wishImg,position:{width:100,height:100,left:data.windowWidth-90,top:(data.windowHeight-115)/2},clickable:!0}],zm:null!==n?n:i.state.zmdefault})}else _index2.default.removeStorageSync("token"),_index3.globalData.haslogin=!1}).catch(function(e){console.log(e)})}},{key:"getUnpayOrder",value:function(){var t=this;_index2.default.request({url:_index3.BASE_URL+"order/unpayorder",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){200==e.data.code?(_index2.default.setStorageSync("orderid",e.data.data.orderid),t.setState({unpayorder:e.data.data,singinBoolean:!1,unpayBoolean:!0,markBoolean:!0})):console.log("没有未支付订单！")}})}},{key:"fetchWishCount",value:function(){var t=this;_index2.default.request({url:_index3.BASE_URL+"wishlist/n",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("thumbups:"),console.log(e),t.setState({thumbups:e.data.data}),thumbups_=e.data.data},fail:function(e){t.setState({thumbups:0}),thumbups_=0}})}},{key:"goshoping",value:function(){this.getUserDetail();var e=_index2.default.getStorageSync("userDetail");_index2.default.getStorageSync("userInfo");0==e.data.data.havearrears&&this.setState({singinBoolean:!1,markBoolean:!1,bool:!0,befee:e.data.data.fee,controls:[{id:2,iconPath:wishImg,position:{width:100,height:100,left:e.windowWidth-90,top:(e.windowHeight-115)/2},clickable:!0}]}),1==e.data.data.havearrears&&this.setState({singinBoolean:!1,markBoolean:!1})}},{key:"onStored",value:function(){_index2.default.navigateTo({url:"/pages/recharge/recharge?avatar="+_index3.globalData.avatar+"&nickname="+_index3.globalData.nickname+"&fee="+_index3.globalData.fee})}},{key:"closeSingin",value:function(){this.setState({singinBoolean:!1,markBoolean:!1})}},{key:"ongetUserInfo",value:function(){_index2.default.getSetting({success:function(e){e.authSetting["scope.userInfo"]?_index2.default.getUserInfo().then(function(e){console.log("获取用户信息")}).catch(function(e){console.log("用户没有授权"),console.log(e)}):(console.log("用户未授权"),_index2.default.authorize({scope:"scope.userInfo"}).then(function(e){console.log("用户授权信息："),console.log(e)}).catch(function(e){console.log("error")}))}})}},{key:"setPost",value:function(){this.setState({markBoolean:!0,posBoolean:!0})}},{key:"ongetPost",value:function(){var t=this;_index2.default.getSetting({success:function(e){null!=e.authSetting["scope.userLocation"]&&1!=e.authSetting["scope.userLocation"]?t.setPost():(e.authSetting["scope.userLocation"],t.ongetLocation())}})}},{key:"moveToCenter",value:function(){_index2.default.createMapContext("mymap").moveToLocation()}},{key:"ongetLocation",value:function(){var a=this;_index2.default.getLocation({type:"gcj02"}).then(function(e){console.log("获取用户定位："),console.log(e);var t=_index2.default.getStorageSync("userInfo");console.log(t),_index3.globalData.lastLon=e.latitude,_index3.globalData.longitude=e.longitude,console.log("latitude:"+_index3.globalData.lastLon),console.log("longitude:"+_index3.globalData.longitude),a.setState({latitude:e.latitude,longitude:e.longitude}),console.log(a.mapObj),a.mapObj.moveToLocation(),console.log("res.latitude,res.longitude"),console.log(e.latitude,e.longitude),console.log("添加地图周围机柜信息"),a.getNearbyMachines(e.latitude,e.longitude)}).catch(function(e){console.log("获取用户定位失败111："),console.log(e),1==_index3.globalData.isweapp?a.setState({posBoolean:!0,markBoolean:!0}):_index2.default.showModal({title:"提示",content:"系统找不到您的位置！",cancelText:"取消",success:function(e){console.log(e),e.confirm?(console.log("用户点击确定时候："),a.onsub()):console.log("用户点击取消")}})})}},{key:"oncancel",value:function(){var e=_index2.default.getStorageSync("userInfo");this.setState({controls:[{id:2,iconPath:wishImg,position:{width:100,height:100,left:e.windowWidth-90,top:(e.windowHeight-115)/2},clickable:!0}]})}},{key:"verifyToken",value:function(){console.log("********token是否有效********"),_index2.default.request({url:_index3.BASE_URL+"token/verifyToken",data:{token:_index3.globalData.token},header:{"content-type":"application/json"}}).then(function(e){return console.log(e.data)})}},{key:"myGetAuthCode",value:function(){var t=this;my.getAuthCode({scopes:["auth_user"],success:function(e){console.log("支付宝code临时码"),console.log(e),console.log(e.authCode),t.setState({commonCode:e.authCode})}})}},{key:"wxGetAuthCode",value:function(){var t=this;_index2.default.login().then(function(e){console.log("小程序code临时码"),console.log(e.code),t.setState({commonCode:e.code})})}},{key:"checkLogin",value:function(){"ALIPAY"!=_index2.default.getEnv()?"WEAPP"!=_index2.default.getEnv()||this.wxGetAuthCode():this.myGetAuthCode()}},{key:"checkToken",value:function(){_index2.default.showLoading({title:""});var a=this;_index2.default.getStorage({key:"token"}).then(function(e){console.log(e),_index2.default.hideLoading();var t=e.data;console.log("token"),console.log(t),null==t||""==t||"undefined"==t?(console.log("*********不存在token*尝试自动登录**********"),a.checkUser()):(console.log("*********存在token:检查登录是否有效***********"),_index2.default.request({url:_index3.BASE_URL+"token/verifyToken",data:{token:t},header:{"content-type":"application/json",token:t}}).then(function(e){200==e.data.code?(console.log("-----token 有效----"),_index3.globalData.token=t,a.getUserDetail(),a.checkShopping()):215==e.data.code&&(console.log("-----token 无效----"),_index2.default.removeStorageSync("token"),_index2.default.removeStorageSync("userInfo"),a.checkUser())}).catch(function(e){console.log("*********不存在token***********2"),a.checkUser()}))}).catch(function(e){_index2.default.hideLoading(),console.log("*********不存在token***********清除"),console.log(e),a.checkUser()})}},{key:"updateuserinfo",value:function(){}},{key:"checkShopping",value:function(){var i=this;order.shoppingorder(function(e){var a=e.orderid,t=e.machineid,o=e.orderno,n=e.recogmode;_index2.default.setStorageSync("goodsResult",e),i.setState({cartTips:"您有一张订单正在购物中",orderid:a,machineid:t,orderno:o,recogmode:n,haveShopping:!0}),order.startqueryorderstatus(a,function(e){console.log("res:订单数据"),console.log(e);var t=e.data.data.orderstatus;e.data.data.doorstatus;200==e.data.code&&("5"==t||"3"==t||"7"==t||"8"==t||"9"==t?(console.log("------执行这里-----------"),order.stopInterval(),setTimeout(function(){_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+a+"&whereis=all"})},3e3)):"6"==t?(order.stopInterval(),i.requestPay(a)):(console.log("------苏晓燕1111111您有一张订单正在结算中-----"),i.setState({cartTips:"您有一张订单正在结算中",Carting:!0,bool:!1,markBoolean:!0,haveShopping:!0})))})})}},{key:"gotoCart",value:function(e){console.log("e.currentTarget.dataset:"),console.log(e.currentTarget.dataset);var t=e.currentTarget.dataset.orderid,a=e.currentTarget.dataset.machineid,o=e.currentTarget.dataset.orderno,n=e.currentTarget.dataset.recogmode;console.log("orderid: "+t),3==n?(_index2.default.setStorageSync("orderid",t),_index2.default.redirectTo({url:"/pages/index/shopping/index?orderid="+t+"&machineid="+a+"&orderno="+o+"&from=index"})):(_index2.default.setStorageSync("orderid",t),_index2.default.redirectTo({url:"/pages/index/cgshopping/index?orderid="+t+"&machineid="+a+"&orderno="+o}))}},{key:"requestPay",value:function(t){var a=this;_index2.default.showLoading({title:""}),_index2.default.request({method:"POST",data:{orderid:t},url:_index3.BASE_URL+"pay/getPreGoodsOrder",header:{Accept:"application/json","content-type":"application/x-www-form-urlencoded",token:_index3.globalData.token},success:function(e){_index2.default.hideLoading(),200==e.data.code?_index2.default.requestPayment({timeStamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:e.data.data.signType,paySign:e.data.data.paySign,success:function(e){console.log("success",e),a.queryPayStatus(t)},fail:function(e){console.log("fail",e),_index2.default.showModal({title:"提示",content:"支付失败，请重新支付",showCancel:!1,success:function(e){}})}}):_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1})}})}},{key:"queryPayStatus",value:function(e){var t=this;_index2.default.showLoading({title:"等待支付结果..."}),intervalOrderStatus=setInterval(function(){_index2.default.request({method:"POST",data:{orderid:e},url:_index3.BASE_URL+"order/paystatus",header:{Accept:"application/json",token:_index3.globalData.token},success:function(e){console.log(e.data.data),5==e.data.data.orderstatus&&(console.log("----payed---"),clearInterval(intervalOrderStatus),_index2.default.hideLoading(),t.setState({unpayBoolean:!1,singinBoolean:!0,markBoolean:!0}),t.getUserDetail())}})},2e3)}},{key:"checkUser",value:function(){var a=this;_index2.default.login().then(function(e){console.log("得到code");var t=e.code;console.log(t),_index2.default.request({url:_index3.BASE_URL+"token/checkUser",data:{code:t},header:{"content-type":"application/json",token:_index3.globalData.token},method:"GET"}).then(function(e){console.log(e),200==e.data.code?(console.log("服务器登录成功"),_index2.default.setStorage({key:"token",data:e.data.data}),_index3.globalData.token=e.data.data,_index3.globalData.haslogin=!0,a.setState({setp1:!0,setp2:!0}),console.log("globalData.token"),console.log(_index3.globalData.token),console.log("检查用户是否已经注册过：用户存在"),a.getUserDetail()):216==e.data.code&&(console.log("检查用户是否已经注册过：用户不存在"),console.log("页面停留在登录界面第一步"),a.setState({singinBoolean:!0,markBoolean:!0,setp1:!0,setp2:!1}))}).catch(function(e){console.log("得到code错误信息"),console.log(e)})})}},{key:"getNearbyMachines",value:function(e,t){if(0!=e||0!=t){var o=this;_index2.default.request({url:_index3.BASE_URL+"machine/nearbymachines",data:{lon:t,lat:e,distance:1e3},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(a){console.log("附近获取机柜信息："),console.log(a.data);var e;_index2.default.getStorageSync("userInfo");e=a.data.data.map(function(e,t){return e.iconPath=flag,e.width=50,e.height=50,e.latitude=a.data.data[t].lat,e.longitude=a.data.data[t].lon,e.id=a.data.data[t].machineid,e}),console.log("markers:"),console.log(e),o.setState({markers:e,allMarkers:a.data.data})}})}}},{key:"onsub",value:function(){console.log("选择定位地点");var t=this;_index2.default.openSetting({success:function(e){console.log(e),1==e.authSetting["scope.userLocation"]?(_index2.default.showToast({title:"授权成功",icon:"success",duration:5e3}),t.ongetLocation()):_index2.default.showToast({title:"授权失败",icon:"success",duration:5e3})}})}},{key:"onconcel",value:function(){console.log("取消操作")}},{key:"onControlTap",value:function(e){console.log(e.controlId),2==e.controlId&&this.onHeard()}},{key:"myWishList",value:function(){this.hideFeedbackAndThumbups(),console.log("latitude:"+_index3.globalData.lastLon),console.log("longitude:"+_index3.globalData.longitude),_index2.default.navigateTo({url:"../wish/likes/myheart?avatar="+_index3.globalData.avatarUrl+"&lon="+_index3.globalData.lastLon+"&lat="+_index3.globalData.longitude})}},{key:"resetWishParam",value:function(){tsWish=tsFeedback="2099-12-31",feedbacks=[]}},{key:"hideFeedbackAndThumbups",value:function(){this.setState({HearlistBoolean:!1})}},{key:"wishBranch",value:function(){0==thumbups_?this.myWishList():(this.resetWishParam(),this.showFeedbackAndThumbups())}},{key:"showFeedbackAndThumbups",value:function(){var a=this,o=this;_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"wishlist/getWishAndFeedBack",data:{pageSize:10,tsFeedback:tsFeedback,tsWish:tsWish},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("getWishAndFeedBack:"),console.log(e.data.rows);var t=e.data.rows;a.updateWishTimeStamp(t),a.addRows(t),_index2.default.hideLoading(),a.setState({machineBoolean:!1,HearlistBoolean:!0,feedbackslist:feedbacks}),o.setState({hasMore:e.data.hasMore})},fail:function(e){_index2.default.hideLoading(),_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"addRows",value:function(e){for(var t=0;t<e.length;t++)"f"==e[t].type?feedbacks.splice(0,0,e[t]):feedbacks.push(e[t]);console.log("feedbacks:"),console.log(feedbacks)}},{key:"updateWishTimeStamp",value:function(e){e.map(function(e,t){"f"==e.type&&(tsFeedback=e.ts)}),e.map(function(e,t){"f"!==e.type&&(tsWish=e.ts)}),console.log("tsFeedback:"+tsFeedback),console.log("tsWish:"+tsWish)}},{key:"onRight",value:function(){console.log("微信客服"),_index2.default.navigateTo({url:"/pages/service/service"})}},{key:"gohome",value:function(){console.log("首页"),_index2.default.navigateTo({url:"/pages/index/index"})}},{key:"ongotopersonal",value:function(){_index2.default.navigateTo({url:"/pages/personal/index"})}},{key:"ongotologin",value:function(){_index2.default.navigateTo({url:"/pages/personal/index"})}},{key:"onLeft",value:function(){console.log("个人中心"),this.ongotologin()}},{key:"paytipsmodal",value:function(e){}},{key:"requestOpen",value:function(e){_index2.default.showLoading({title:""});var o=this;_index2.default.request({url:_index3.BASE_URL+"device/requestopen",data:{qrurl:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(_index2.default.hideLoading(),console.log("检测是否可以开门"),console.log(e),200==e.data.code){var t=e.data.data.machineid,a=e.data.data.lockid;_index2.default.reLaunch({url:"../box/open/open?machineid="+t+"&lockid="+a+"&formid="})}else _index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1,success:function(e){e.confirm&&o.gohome()}})},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"onScreen",value:function(){console.log("扫码开门");var t=this;_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"device/checkscan",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST"}).then(function(e){console.log("扫码是否成功："),console.log(e),_index2.default.hideLoading(),200==e.data.code&&_index2.default.scanCode().then(function(e){console.log(e),console.log(e.result),t.requestOpen(e.result)}).catch(function(e){console.log(e)}),201==e.data.code&&(console.log("您有未结订单"),_index2.default.showToast({title:"您有未结订单",icon:"fail",duration:2e3}),t.setState({cartTips:"您有一张订单正在结算中",Carting:!0,bool:!1,markBoolean:!0,haveShopping:!0}),t.gohome()),202==e.data.code&&(console.log("您的帐号异常，请与客服联系！"),_index2.default.showToast({title:"您的帐号异常！",icon:"fail",duration:2e3})),205==e.data.code&&(console.log("用户未登录"),_index2.default.showToast({title:"用户未登录",icon:"fail",duration:2e3})),206==e.data.code&&(console.log("请开通免密"),_index2.default.showToast({title:"请开通免密",icon:"fail",duration:2e3}))})}},{key:"onCloseHeard",value:function(){console.log("关闭心愿单"),this.setState({HearBoolean:!1,markBoolean:!1})}},{key:"onCloseHeardlist",value:function(){console.log("关闭心愿单列表"),this.setState({HearlistBoolean:!1,markBoolean:!1})}},{key:"onSetheart",value:function(){console.log("进入心愿单中心"),_index2.default.navigateTo({url:"/pages/wish/likes/myheart"})}},{key:"onPay",value:function(){console.log("订单明细页面"),_index2.default.navigateTo({url:"/pages/orders/index"})}},{key:"payOrder",value:function(){var e=_index2.default.getStorageSync("orderid");this.setState({orderid:e}),this.requestPay(e)}},{key:"gotoCartFn",value:function(){var e=_index2.default.getStorageSync("goodsResult"),t=e.orderid,a=e.machineid,o=e.orderno,n=e.recogmode;this.gotoCart(t,a,o,n)}},{key:"closeCarting",value:function(){this.setState({Carting:!1,markBoolean:!1})}},{key:"regionchange",value:function(e){console.log("e:"+e),console.log(e);var t=this;t.setState({machineBoolean:!1}),"end"==e.type&&this.mapContext&&this.mapContext.getCenterLocation({success:function(e){console.log("------"),t.getNearbyMachines(e.latitude,e.longitude)}})}},{key:"markertap",value:function(e){for(var o=this,n="",t=0;t<this.state.markers.length;t++)e.markerId==this.state.markers[t].id&&(n=this.state.allMarkers[t].machineid);""!=n&&_index2.default.getLocation({type:"wgs84",success:function(e){var t=e.latitude,a=e.longitude;_index2.default.request({url:_index3.BASE_URL+"machine/indexmachinedetail",data:{lon:a,lat:t,machineid:n},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("res:"),console.log(e),o.setState({markerDetail:e.data.data,machineBoolean:!0}),machineid=e.data.data.machineid}})},fail:function(e){_index2.default.openSetting({success:function(e){e.authSetting["scope.userLocation"]}})}})}},{key:"hideModal",value:function(){_index2.default.navigateTo({url:"../box/boxdetail/boxdetail?machineid="+machineid})}},{key:"topersonfn",value:function(){console.log("个人主页"),_index2.default.navigateTo({url:"/pages/personal/index"})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];var e=this.__state,t=(e.unpayList,e.feedbackslist,e.markerDetail,this.__state.unpayBoolean?(this.__state.unpayorder.payfee/100).toFixed(2):null);return Object.assign(this.__state,{anonymousState__temp:t,systemUser:_index3.systemUser}),this.__state}}]),s}(),_class.properties={},_class.$$events=["onControlTap","markertap","regionchange","topersonfn","onStored","getPhoneNumber","gotoPapay","onInfo","gotoCart","onClosePos","payOrder","gotoCartFn","onCloseHeardlist","onSetheart","fetchMoreLikes","onScreen","onRight","onLeft","hideModal"],_temp2);exports.default=Index,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Index,!0));
>>>>>>> b7c6447... 微信小程序免密版更新
