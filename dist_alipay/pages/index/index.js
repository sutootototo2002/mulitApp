'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require('../../npm/_tarojs/taro-alipay/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../config/index.js');

var _util = require('../../utils/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "unpayList", "systemUser", "showModalStatus", "showopen", "papayPressed", "qrurl", "showlogin", "showpapay", "isnopasspay", "havearrears", "formid", "isweapp", "mapKey", "latitude", "longitude", "scale", "menus", "screen", "user", "person", "zm", "searchImg", "dw", "unpayImg", "unpriceImg", "pos_", "tempImg", "del", "open", "addr", "mach", "mm", "HearHead", "closebtn", "heardImg", "yyzh", "dyzh", "xydd", "singinImg", "wzc10", "wzc11", "wzc20", "wzc22", "wzc30", "wzc33", "setp1", "setp2", "setp3", "controls", "isOpened", "mapObj_", "showLocation", "markers", "allMarkers", "bool", "menuright", "token", "checkPapay", "commonCode", "markBoolean", "posBoolean", "unpayBoolean", "machineBoolean", "DensityFree", "HearBoolean", "HearlistBoolean", "singinBoolean", "fee", "befee", "payName"], _this.config = {
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
        singinImg: _index3.PATH + '/mImages/gban.png',
        wzc10: _index3.PATH + '/mImages/wzc-10.png?' + Math.random(),
        wzc11: _index3.PATH + '/mImages/wzc-11.png?' + Math.random(),
        wzc20: _index3.PATH + '/mImages/wzc-20.png?' + Math.random(),
        wzc22: _index3.PATH + '/mImages/wzc-22.png?' + Math.random(),
        wzc30: _index3.PATH + '/mImages/wzc-30.png?' + Math.random(),
        wzc33: _index3.PATH + '/mImages/wzc-33.png?' + Math.random(),
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
        menuright: [],
        token: '',
        checkPapay: false,
        commonCode: '',
        markBoolean: true,
        posBoolean: false,
        unpayBoolean: false,
        machineBoolean: false,
        DensityFree: false,
        HearBoolean: false,
        HearlistBoolean: false,
        singinBoolean: true,
        fee: true,
        befee: 0,
        payName: 0.00,
        unpayList: []
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
      console.log('---onLoad---项目运行时触发');
      // console.log('---此处需要将来要改为支付分---')
      if (_index2.default.getEnv() == "ALIPAY") {
        console.log('**支付宝**');
        _index3.globalData.isweapp = false;
      }
      if (_index2.default.getEnv() == "WEAPP") {
        console.log('**微信**');
        _index3.globalData.isweapp = true;
      }
      console.log(_index3.globalData.isweapp);
      this.mapObj = _index2.default.createMapContext("mymap");
      var that = this;
      this.ongetUserInfo();
      //拿到系统信息
      console.log('获取用户信息:');
      _index2.default.getSystemInfo({
        success: function success(res) {
          console.log('获取用户的手机信息（屏幕宽高等）');
          console.log(JSON.stringify(res));
          console.log('存储用户信息到缓存store中');
          var store = _index2.default.setStorageSync("userInfo", res);
          var data = _index2.default.getStorageSync('userInfo'); //**重要信息
          console.log("data中是否有用户信息：");
          console.log(data);
          //中心店插入旗帜
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
            }]
          });
        }
      });
      //检查登录情况
      console.log('检查登录情况:');
      //this.checkToken();
      //请求授权位置
      this.ongetPost();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {
      // console.log('---onshow---')
      // console.log('---免密首先检查免密开通情况---')
    }
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
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
            that.setState({
              showlogin: false,
              showpapay: true,
              showopen: false,
              setp1: false,
              setp2: true
            });
            _index2.default.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 500
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
    //setp2 开通免密
    //开通免密支付

  }, {
    key: 'gotoPapay',
    value: function gotoPapay() {
      console.log('开启免密');
      this.getUserDetail();
      var data = _index2.default.getStorageSync("userDetail");
      console.log(data.data.data);
      var that = this;
      if (data.data.data.isnopasspay == 1) {
        that.setState({
          setp1: false,
          setp2: false,
          setp3: true
        });
        _index2.default.showToast({
          title: '已开通免密',
          icon: 'success',
          duration: 500
        });
      }
      if (data.data.data.isnopasspay == 0) {
        that.setState({
          setp1: false,
          setp2: true,
          setp3: false
        });
        _index2.default.request({
          method: 'POST',
          url: _index3.BASE_URL + 'pay/getPapayExtraData',
          data: {},
          header: {
            'content-type': 'application/json',
            'token': _index3.globalData.token
          }
        }).then(function (res) {
          console.log('免密信息');
          console.log(res);
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
            console.log("成功跳转");
            console.log(res);
          }).catch(function (error) {
            console.log('错误');
            console.log(error);
          });
        }).catch(function (error) {
          console.log('免密信息失败');
        });
      }
    }
    //得到用户信心

  }, {
    key: 'getUserDetail',
    value: function getUserDetail() {
      _index2.default.showLoading({
        'title': ''
      });
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'user/detail',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        }
      }).then(function (res) {
        _index2.default.hideLoading();
        console.log("用户信息：");
        console.log(res);
        _index2.default.setStorageSync("userDetail", res);
        if (res.data.code == 200) {
          console.log('成功获取登录信息');
        } else {
          console.log('有其他问题');
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
    //setp3 去购物

  }, {
    key: 'goshoping',
    value: function goshoping() {
      console.log('去购物');
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
            id: 1,
            iconPath: location,
            position: {
              width: 55,
              height: 55,
              left: (data1.windowWidth - 55) / 2,
              top: (data1.windowHeight - 115) / 2
            },
            clickable: true
          }, {
            id: 2,
            iconPath: wishImg,
            position: {
              width: 100,
              height: 100,
              left: data1.windowWidth - 90,
              top: (data1.windowHeight - 115) / 2
            },
            clickable: true
          }, {
            id: 3,
            iconPath: juan,
            position: {
              width: 80,
              height: 80,
              left: data1.windowWidth - 80,
              top: (data1.windowHeight - 115) / 2 + 90
            },
            clickable: true
          }]
        });
      }
      if (data.data.data.havearrears == 1) {
        that.setState({
          singinBoolean: false,
          markBoolean: false
        });
        //拉取订单
      }
    }
  }, {
    key: 'onStored',
    value: function onStored() {
      //储值
      _index2.default.navigateTo({
        url: '/pages/recharge/recharge'
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
          console.log(JSON.stringify(res));
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            _index2.default.getUserInfo().then(function (res) {
              console.log("获取头像昵称");
              console.log(res);
              console.log(res.userInfo);
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
    key: 'ongetPost',
    value: function ongetPost() {
      var _this2 = this;

      //请求授权位置
      console.log('请求授权位置');
      _index2.default.getSetting({
        success: function success(res) {
          console.log(JSON.stringify(res));
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            _index2.default.getUserInfo().then(function (res) {
              console.log("获取头像昵称");
              console.log(res);
              console.log(res.userInfo);
            }).catch(function (error) {
              console.log("用户没有授权");
              console.log(error);
            });
          } else {
            console.log('用户未授权');
            _index2.default.authorize({
              scope: 'scope.getUserInfo'
            }).then(function (res) {
              console.log('用户授权信息：');
              console.log(res);
            }).catch(function (error) {
              console.log('error');
            });
          }
          // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
          // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
          // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            _index2.default.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function success(res) {
                if (res.cancel) {
                  _index2.default.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  });
                } else if (res.confirm) {
                  _index2.default.openSetting({
                    success: function success(dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        _index2.default.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        });
                        //再次授权，调用wx.getLocation的API
                      } else {
                        _index2.default.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        });
                      }
                    }
                  });
                }
              }
            });
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            //调用wx.getLocation的API
            var that = _this2;
            that.ongetLocation();
          } else {
            //调用wx.getLocation的API
            var that = _this2;
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
          }]
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
    key: 'checkPapay',
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
      var that = this;
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.getStorage({
        key: 'token'
      }).then(function (res) {
        _index2.default.hideLoading();
        console.log('getStorage');
        console.log(res.data);
        var token = res.data;
        if (!(token == null || token == '' || token == 'undefined')) {
          //如果token存在，获取真正的token令牌
          // verifyToken({'token':token}).then((res)=>{
          //   console.log('我是真令牌:')
          //   console.log(res)
          // })
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
            console.log('成功');
            console.log(res);
            if (res.data.code == 200) {
              console.log('token有效');
              _index3.globalData.token = token;
              that.getUserDetail();
            } else {
              console.log('token无效');
              _index2.default.removeStorageSync('token');
              that.checkUser();
            }
          }).catch(function (error) {
            console.log('失败111');
            console.log(error);
          });
        }
      });
    }
    //更新用户心思

  }, {
    key: 'updateuserinfo',
    value: function updateuserinfo() {}
    //更新用户信息

    //检查用户是否登录

  }, {
    key: 'checkUser',
    value: function checkUser() {
      var that = this;
      _index2.default.login().then(function (res) {
        console.log('得到code');
        var code = res.code;
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
          console.log('检查用户是否已经注册过');
          console.log(res);
          if (res.data.code == 200) {
            console.log('服务器登录成功');
            _index2.default.setStorage({
              key: "token",
              data: res.data.data
            });
            _index3.globalData.token = res.data.data;
            _index3.globalData.haslogin = true;
            console.log('globalData.token');
            console.log(_index3.globalData.token);
          } else {
            console.log('切换登录页面');
            that.ongotologin();
          }
        }).catch(function (error) {
          console.log(error);
        });
      });
    }
    //获取机柜的经纬度坐标，必须获取token才可以拿到

  }, {
    key: 'getNearbyMachines',
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
    key: 'onsub',
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
          //that.mapObj.moveToLocation();
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
        this.onHeard();
      }
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
    key: 'ongotologin',
    value: function ongotologin() {
      _index2.default.navigateTo({
        url: '/pages/login/login'
      });
    }
  }, {
    key: 'onLeft',
    value: function onLeft() {
      console.log('个人中心');
      this.ongotologin();
    }
  }, {
    key: 'onScreen',
    value: function onScreen() {
      console.log('扫码开门');
      //未支付订单判断还没有写
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
        if (res.data.code == 200) {}
        if (res.data.code == 201) {
          console.log('您有未结订单');
        }
        if (res.data.code == 202) {
          console.log('您已被加入黑名单');
        }
        if (res.data.code == 205) {
          console.log('用户未登录');
        }
        if (res.data.code == 206) {
          console.log('请开通免密');
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
        url: '/pages/wish/myheart'
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
    key: '_createData',
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
}(_index.Component), _class.$$events = ["onControlTap", "onStored", "closeSingin", "getPhoneNumber", "gotoPapay", "goshoping", "onInfo", "onClosePos", "onPay", "onCloseHeardlist", "onSetheart", "onCloseHeard", "onScreen", "onRight", "onLeft"], _temp2);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
// export default Index as ComponentClass<PageOwnProps, PageState>


exports.default = Index;

Page(require('../../npm/_tarojs/taro-alipay/index.js').default.createComponent(Index, true));