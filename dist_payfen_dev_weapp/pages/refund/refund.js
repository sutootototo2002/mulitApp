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

var $orderid;


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var Refund = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Refund, _BaseComponent);

  function Refund() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Refund);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Refund.__proto__ || Object.getPrototypeOf(Refund)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "navList", "pics", "machineImg", "id_", "value", "temp", "upload", "imagesArr", "files"], _this.config = {
      navigationBarTitleText: '问题反馈'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Refund, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Refund.prototype.__proto__ || Object.getPrototypeOf(Refund.prototype), '_constructor', this).call(this, props);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        machineImg: _index3.PATH + '/mImages/refund.png',
        navList: [],
        id_: 0,
        value: '',
        temp: _index3.PATH + '/mImages/carma.jpg',
        upload: _index3.PATH + '/mImages/carma.jpg',
        imagesArr: [],
        pics: [],
        files: []
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      console.log(this.$router.params);
      $orderid = this.$router.params.orderid;
      this.getRefundressons();
    }
  }, {
    key: 'getRefundressons',
    value: function getRefundressons() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'order/refundressons',
        data: {
          orderid: $orderid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('getDetail:');
          console.log(res.data.data);
          that.setState({
            navList: res.data.data
          });
        }
      });
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
    key: 'selectNav',
    value: function selectNav(id) {
      console.log(id);
      var nlist = this.state.navList;
      var temp = nlist.map(function (item, index) {
        if (item.id == id) {
          item.selected = 'true';
        } else {
          item.selected = 'false';
        }
        return item;
      });
      console.log("temp:");
      console.log(temp);
      this.setState({
        id_: Number(id),
        navList: temp
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }
  }, {
    key: 'chooseImage',
    value: function chooseImage(e) {
      var that = this;
      if (that.state.pics.length >= 4) {
        _index2.default.showToast({
          title: '最多上传四张图片'
        });
        return;
      }
      _index2.default.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        count: 4 - that.state.pics.length,
        success: function success(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // that.setData({
          //   files: that.data.files.concat(res.tempFilePaths)
          // });
          // wx.setStorage({
          //   key: "tempPics",
          //   data: res.tempFilePaths
          // });
          // var tempFilePaths = wx.getStorageSync('tempPics');
          console.log('tempFilePaths:' + res.tempFilePaths);
          //
          _index2.default.getNetworkType({
            success: function success(resnet) {
              var networkType = resnet.networkType;
              if (networkType == 'unknown' || networkType == 'none') {
                _index2.default.showToast({
                  title: '未连接网络'
                });
                return;
              } else {
                _index2.default.showLoading({
                  title: '正在上传'
                });
                (0, _util.uploadimg)({
                  url: _index3.BASE_URL + 'image/upload',
                  path: res.tempFilePaths,
                  cb: function cb(res2) {
                    console.log('--res2---');
                    console.log(res2);
                    if (res2 != '') {
                      console.log('--res2不为空！');
                      var aftersplists = res2.split(";");
                      console.log("aftersplists:");
                      console.log(aftersplists);
                      aftersplists.splice(aftersplists.length - 1, 1);
                      var ftemp = that.state.files.concat(res.tempFilePaths);
                      var ptemp = that.state.pics.concat(aftersplists);
                      console.log("ftemp");
                      console.log(ftemp);
                      console.log("ptemp");
                      console.log(ptemp);
                      that.setState({
                        files: ftemp,
                        pics: ptemp
                      });
                    } else {
                      // wx.removeStorageSync("tempPics");
                      console.log('--res2空！');
                      _index2.default.showToast({
                        title: '上传失败'
                      });
                    }
                  }
                });
              }
            }
          });
          //
        }
      });
    }
  }, {
    key: 'submitRefund',
    value: function submitRefund(res) {
      var that = this;
      console.log("$orderid: " + $orderid);
      var nlist = that.state.navList;
      var labels = nlist.filter(function (item, index) {
        if (item.selected == 'true') {
          return item;
        }
      });
      console.log("类型选择：" + labels);
      console.log(labels);
      if (labels.length == 0) {
        _index2.default.showModal({
          title: '提示',
          content: '请选择问题类型',
          showCancel: false
        });
        return;
      } else {
        var lab = labels[0].id;
      }
      //
      var tmpics = '';
      for (var i = 0; i < that.state.pics.length; i++) {
        tmpics = tmpics + that.state.pics[i] + ";";
      }
      ;
      //
      if (tmpics == '') {
        _index2.default.showModal({
          title: '提示',
          content: '请至少上传一张图片',
          showCancel: false
        });
        return;
      }
      console.log("tmpics(图片选择):" + tmpics);
      console.log(tmpics);
      _index2.default.showLoading({
        title: '努力反馈中'
      });
      console.log("备注：");
      console.log(that.state.value);
      _index2.default.request({
        method: 'POST',
        data: {
          'orderid': $orderid,
          'labels': lab,
          'remark': that.state.value,
          'pics': tmpics
        },
        url: _index3.BASE_URL + 'order/applyrefund',
        header: {
          'Accept': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          // console.log(res.data);
          if (res.data.code == 200) {
            _index2.default.hideLoading();
            _index2.default.showModal({
              title: '反馈成功',
              content: '客官息怒，您的反馈我们已经收到，小二们抓紧核实处理',
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {
                  _index2.default.redirectTo({
                    url: '/pages/index/index'
                  });
                }
              }
            });
          } else {
            _index2.default.hideLoading();
            _index2.default.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function success(res) {
                if (res.confirm) {
                  // wx.navigateBack();
                }
              }
            });
          }
        }
      });
    }
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: '_createData',
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      ;

      var _state = this.__state,
          navList = _state.navList,
          pics = _state.pics;

      var loopArray0 = navList.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = _this2.__state.id_ == Number(item.$original.id) ? 'btn select' : 'btn';
        var $loopState__temp4 = "ab" + index;
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $original: item.$original
        };
      });
      Object.assign(this.__state, {
        loopArray0: loopArray0
      });
      return this.__state;
    }
  }]);

  return Refund;
}(_index.Component), _class.properties = {}, _class.$$events = ["selectNav", "handleChange", "chooseImage", "submitRefund"], _temp2);
exports.default = Refund;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Refund, true));