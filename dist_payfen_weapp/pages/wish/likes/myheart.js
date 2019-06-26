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

var avatar;
var lastLon;
var lastLat;
var wishid;
var merchantid;
var Myheart = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Myheart, _BaseComponent);

  function Myheart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Myheart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Myheart.__proto__ || Object.getPrototypeOf(Myheart)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["myheartList", "searLists", "otherWishes", "machines", "globalData", "mhhImg", "avator", "imgs", "imgs1", "zmkm", "clear", "value", "bool", "HearBoolean", "HearHead", "closebtn", "markBoolean", "heardImg", "addr", "dyzh", "yyzh", "hashOtherWishes", "pageNo", "pageSize", "hasMore", "isDel", "wish", "wishname"], _this.config = {
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
        avator: _index3.globalData.avatar ? _index3.globalData.avatar : _index3.PATH + '/mImages/tempavator.jpg',
        imgs: _index3.PATH + '/mImages/xytb.png',
        imgs1: _index3.PATH + '/mImages/xytb-1.png',
        zmkm: _index3.PATH + '/mImages/zmkm0.png',
        clear: _index3.PATH + '/mImages/ljx1.png',
        value: '',
        bool: false,
        HearBoolean: false,
        HearHead: _index3.PATH + '/mImages/ysjtb1.png',
        closebtn: _index3.PATH + '/mImages/gban1.png',
        markBoolean: false,
        heardImg: _index3.PATH + '/mImages/fkz.png',
        addr: _index3.PATH + '/mImages/tytb-4.png',
        dyzh: _index3.PATH + '/mImages/dyz_f.png',
        yyzh: _index3.PATH + '/mImages/yyz_f.png',
        searLists: [],
        myheartList: [],
        otherWishes: [],
        hashOtherWishes: [],
        pageNo: 1,
        pageSize: 10,
        hasMore: false,
        isDel: false,
        machines: [],
        wish: '',
        wishname: ''
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('-----------onLoad---------');
      console.log(this.$router.params);
      avatar = this.$router.params.avatar;
      lastLon = this.$router.params.lon;
      lastLat = this.$router.params.lat;
      //  console.log('avatar:'+avatar+'lastLon'+lastLon+'lastLat'+lastLat)
      console.log("globalData:");
      console.log(_index3.globalData);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      console.log('---onshow----');
      this.ongetHeartList();
      this.reset();
      this.loadOtherWishes();
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
  }, {
    key: "loadOtherWishes",
    value: function loadOtherWishes() {
      var _this2 = this;

      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/otherWishList',
        data: {
          pageNo: this.state.pageNo,
          pageSize: this.state.pageSize
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          var rows = res.data.rows;
          console.log('其他小伙伴的心愿单：');
          console.log(res.data);
          var hash = {};
          var chatList = rows.reduce(function (item, next) {
            hash[next.wishlistid] ? "" : hash[next.wishlistid] = item.push(next);
            return item;
          }, []);
          console.log(chatList);
          _index2.default.hideLoading();
          _this2.setState({
            otherWishes: chatList,
            hasMore: res.data.hasMore
          });
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
    // 每次取到的数据可能有重复,去重并更新
    // addAndUpdate(res) {
    //   var rows = res.rows;
    //   var n = this.state.otherWishes.length;
    //   var j = 0;
    //   for(var i = 0; i < rows.length; i++) {
    //     var idx = this.state.hashOtherWishes[rows[i].wishlistid];
    //     if(idx === undefined) {
    //       this.state.hashOtherWishes[rows[i].wishlistid] = n + j;
    //       this.state.otherWishes.push(rows[i]);
    //       j++;
    //     } else {
    //       //更新点赞数
    //       this.state.otherWishes[idx].likes = rows[i].likes;
    //     }
    //   }
    // }

  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        otherWishes: [],
        hashOtherWishes: [],
        pageNo: 1
      });
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
    key: "addgoods",
    value: function addgoods() {
      console.log('添加商品');
      this.setState({
        bool: true,
        isDel: false
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
        url: '/pages/wish/likes/myheart'
      });
    }
  }, {
    key: "oncheckdetail",
    value: function oncheckdetail(e) {
      console.log('查看详情');
      console.log(e);
      console.log('wishid：' + e.currentTarget.dataset.wishid);
      console.log('wishname:' + e.currentTarget.dataset.wishname);
      wishid = e.target.dataset.wishid;
      merchantid = e.target.dataset.merchantid ? e.target.dataset.merchantid : '';
      this.setState({
        HearBoolean: true,
        markBoolean: true,
        wishname: e.currentTarget.dataset.wishname
      });
      this.loadMachines();
    }
  }, {
    key: "loadMachines",
    value: function loadMachines() {
      var _this3 = this;

      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/getWishFeedBacks',
        data: {
          wishlistid: wishid,
          merchantid: merchantid,
          longitude: _index3.globalData.longitude,
          latitude: _index3.globalData.lastLon
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          console.log('machines:');
          console.log(res);
          _index2.default.hideLoading();
          _this3.setState({
            machines: res.data.rows,
            wish: res.data.rows.length > 0 ? res.data.rows[0].wishname : ''
          });
        },
        fail: function fail(err) {
          _index2.default.hideLoading();
          _this3.setState({
            machines: []
          });
        }
      });
    }
    // $("#keyword").on('keypress',function(e) {
    //   var keycode = e.keyCode;
    //   var searchName = $(this).val();
    //   if(keycode=='13') {
    //       e.preventDefault();  
    //       //请求搜索接口
    //   }
    // })

  }, {
    key: "onSearchHandler",
    value: function onSearchHandler(value) {
      console.log(value);
      this.setState({
        value: value
      });
      var that = this;
      //  /wishlist/filterWishes
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/filterWishes',
        data: {
          name: value
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST"
      }).then(function (res) {
        if (res.data.code == 200) {
          console.log("res.data.rows:");
          console.log(res.data.rows);
          that.setState({
            searLists: res.data.rows
          });
        }
      });
    }
  }, {
    key: "formSubmit",
    value: function formSubmit(e) {
      console.log(e);
      console.log('form');
    }
  }, {
    key: "onGoback",
    value: function onGoback() {
      this.setState({
        value: '',
        bool: false
      });
    }
  }, {
    key: "onInput",
    value: function onInput(value) {
      console.log();
      console.log('添加。。');
      console.log(value);
      if (!value) {
        _index2.default.showToast({
          title: '请添加心愿',
          icon: 'fail',
          duration: 2000
        });
        return;
      }
      this.adda(value);
    }
  }, {
    key: "onBlur",
    value: function onBlur(value) {
      console.log('失去焦点。。。。');
      console.log(value);
    }
  }, {
    key: "adda",
    value: function adda(value) {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/addWish',
        data: {
          name: value
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          //Taro.hideLoading();
          //检测是否可以开门
          if (res.data.status == 200) {
            console.log('添加成功！');
            that.setState({
              bool: false,
              value: ''
            });
            that.ongetHeartList();
          } else {
            _index2.default.showToast({
              title: res.data.msg,
              icon: 'fail',
              duration: 2000
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
    key: "bindconfirm",
    value: function bindconfirm(e) {
      console.log(e);
      console.log('bindconfirom');
    }
  }, {
    key: "ongetHeartList",
    value: function ongetHeartList() {
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + '/wishlist/myWishList',
        data: {},
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          console.log('获取心愿列表11111：');
          console.log(res.data.rows);
          var rowss = res.data.rows;
          //let myheartList_ = [];
          var myheartList_ = rowss.map(function (item, index) {
            item.id = index;
            return item;
          });
          that.setState({
            myheartList: myheartList_
          });
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
    key: "onModify",
    value: function onModify() {
      console.log('修改按钮');
      this.setState({
        isDel: true
      });
    }
  }, {
    key: "ondelFn",
    value: function ondelFn(e) {
      console.log(e);
      console.log(e.currentTarget.id);
      var index_ = e.currentTarget.id;
      var type = e.currentTarget.dataset.type;
      var wishlistid = e.currentTarget.dataset.wishlistid;
      var wishpraise = e.currentTarget.dataset.wishpraise;
      // /wishlist/deleteAWish
      var that = this;
      _index2.default.request({
        url: _index3.BASE_URL + '/wishlist/deleteAWish',
        data: {
          type: type,
          wishlistid: wishlistid,
          wishpraise: wishpraise
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        method: "POST",
        success: function success(res) {
          //console.log('删除：')
          console.log(res);
          if (res.data.status == 200) {
            console.log('删除成功！');
            //that.ongetHeartList();
            //that.ongetHeartList();
            var temp = that.state.otherWishes;
            temp.map(function (item, index) {
              if (item.wishlistid == wishlistid) {
                item.extra = '0';
              }
              return item;
            });
            var lists = that.state.myheartList;
            lists.splice(index_, 1);
            that.setState({
              myheartList: lists,
              otherWishes: temp
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
    key: "toBoxdetail",
    value: function toBoxdetail(e) {
      _index2.default.navigateTo({
        url: "../../box/boxdetail/boxdetail?machineid=" + e.currentTarget.dataset.machineid
      });
    }
  }, {
    key: "unlikeit",
    value: function unlikeit(e) {
      var _this4 = this;

      var idx = e.currentTarget.dataset.id;
      var wishid = e.currentTarget.dataset.wishid;
      var obj = this.state.myheartList.find(function (item, index) {
        if (item.wishlistid == wishid) {
          return item.wishpraise;
        }
      });
      var type = e.currentTarget.dataset.type;
      console.log("wishpraise:");
      console.log(obj.wishpraise);
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/deleteAWish',
        method: 'POST',
        data: {
          wishlistid: wishid,
          wishpraise: obj.wishpraise,
          type: type
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          _index2.default.hideLoading();
          if (res.data.status == 200) {
            var temp = _this4.state.otherWishes;
            temp.map(function (item, index) {
              if (item.wishlistid == wishid) {
                item.extra = '0';
              }
              return item;
            });
            console.log('extra after...');
            console.log(temp);
            var myheartListArr = _this4.state.myheartList;
            var tt = myheartListArr.filter(function (item, index) {
              return item.wishlistid !== wishid;
            });
            console.log(tt);
            _this4.setState({
              otherWishes: temp,
              myheartList: tt
            });
          }
          _index2.default.showToast({
            title: res.data.msg,
            icon: res.data.status == 200 ? 'success' : 'none',
            duration: 2000
          });
        },
        fail: function fail(err) {
          _index2.default.hideLoading();
          _index2.default.showToast({
            title: '删除失败',
            icon: 'fail',
            duration: 2000
          });
        }
      });
    }
  }, {
    key: "likeit",
    value: function likeit(e) {
      var _this5 = this;

      console.log(e);
      var idx = e.currentTarget.dataset.id;
      var wishid = e.currentTarget.dataset.wishid;
      console.log('idx:' + idx + 'wishid:' + wishid);
      _index2.default.showLoading({
        title: ''
      });
      _index2.default.request({
        url: _index3.BASE_URL + 'wishlist/likeAWish',
        method: 'POST',
        data: {
          wishlistid: e.currentTarget.dataset.wishid
        },
        header: {
          'content-type': 'application/json',
          'token': _index3.globalData.token
        },
        success: function success(res) {
          // console.log('请求成功:' + JSON.stringify(res));
          _index2.default.hideLoading();
          var rows = _this5.state.myheartList.concat(res.data.rows);
          console.log("this.state.otherWishes");
          console.log(_this5.state.otherWishes);
          var temp = _this5.state.otherWishes;
          temp.map(function (item, index) {
            if (index == idx) {
              item.extra = '1';
            }
            return item;
          });
          console.log('extra after...');
          console.log(temp);
          _this5.setState({
            otherWishes: temp,
            myheartList: rows
          });
          //var rows = this.data.myWishes.concat(res.data.rows);
          // this.setData({
          //   ["otherWishes[" + idx+"].extra"]: '1',
          //   ["otherWishes[" + idx + "].likes"]: res.data.n,
          //   myWishes: rows,
          // });
          _index2.default.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 2000
          });
        },
        fail: function fail(err) {
          console.log('请求失败:' + err);
          _index2.default.hideLoading();
          _index2.default.showToast({
            title: '点赞失败',
            icon: 'fail',
            duration: 2000
          });
        }
      });
    }
  }, {
    key: "addWishFn",
    value: function addWishFn(e) {
      console.log(e);
      var value = e.currentTarget.dataset.wishname;
      this.setState({
        value: value
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
          searLists = _state.searLists,
          myheartList = _state.myheartList,
          otherWishes = _state.otherWishes,
          machines = _state.machines;

      Object.assign(this.__state, {
        globalData: _index3.globalData
      });
      return this.__state;
    }
  }]);

  return Myheart;
}(_index.Component), _class.properties = {}, _class.$$events = ["ondelFn", "addWishFn", "unlikeit", "likeit", "oncheckdetail", "toBoxdetail", "onModify", "addgoods", "onSearchHandler", "onInput", "onGoback", "onCloseHeard"], _temp2);
exports.default = Myheart;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Myheart, true));