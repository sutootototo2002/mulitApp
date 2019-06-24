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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "markerDetail", "unpayList", "feedbackslist", "systemUser", "showModalStatus", "showopen", "papayPressed", "qrurl", "showlogin", "showpapay", "isnopasspay", "havearrears", "formid", "isweapp", "mapKey", "latitude", "longitude", "scale", "menus", "screen", "user", "person", "zm", "avatar", "zmdefault", "searchImg", "dw", "unpayImg", "unpriceImg", "pos_", "tempImg", "del", "open", "addr", "mach", "mm", "HearHead", "closebtn", "heardImg", "yyzh", "dyzh", "xydd", "singinImg", "wzc10", "wzc11", "wzc20", "wzc22", "wzc30", "wzc33", "clear", "setp1", "setp2", "setp3", "controls", "isOpened", "mapObj_", "showLocation", "markers", "allMarkers", "bool", "booladdr", "menuright", "token", "checkPapay", "commonCode", "markBoolean", "posBoolean", "unpayBoolean", "machineBoolean", "DensityFree", "HearBoolean", "HearlistBoolean", "singinBoolean", "thumbups", "fee", "befee", "payName", "haslogin", "intervalPapay", "unpayorder", "cartTips", "orderid", "machineid", "orderno", "recogmode", "haveShopping", "Carting", "timerTem"], _this.config = {
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
    key: 'componentDidShow',
    value: function componentDidShow() {
      var _this2 = this;

      console.log('---onshow---');
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
          hasMore = res.data.hasMore;
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
      tsFeedback = rows.map(function (item, index) {
        if (item.type == 'f') {
          return item.ts;
        }
      });
      tsWish = rows.map(function (item, index) {
        if (item.type !== 'f') {
          return item.ts;
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
}(_index.Component), _class.properties = {}, _class.$$events = ["onControlTap", "markertap", "regionchange", "topersonfn", "onStored", "getPhoneNumber", "gotoPapay", "onInfo", "gotoCart", "onClosePos", "payOrder", "gotoCartFn", "onCloseHeardlist", "onSetheart", "onScreen", "onRight", "onLeft", "hideModal"], _temp2);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
// export default Index as ComponentClass<PageOwnProps, PageState>


exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));