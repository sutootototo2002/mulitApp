<<<<<<< HEAD
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
    key: "fetchMoreLikes",
    value: function fetchMoreLikes() {
      if (this.state.hasMore) {
        this.loadOtherWishes();
      }
    }
  }, {
>>>>>>> 0309acd... 微信小程序免密版--心愿单
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
<<<<<<< HEAD
          console.log(chatList);
          _index2.default.hideLoading();
          _this2.setState({
            otherWishes: chatList,
            hasMore: res.data.hasMore
=======
          console.log("chatList：");
          console.log(chatList);
          _index2.default.hideLoading();
          console.log("pageNo:");
          console.log(res.data.pageNo);
          _this2.setState({
            otherWishes: _this2.state.otherWishes.concat(chatList),
            hasMore: res.data.hasMore,
            pageNo: res.data.pageNo
>>>>>>> 0309acd... 微信小程序免密版--心愿单
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
}(_index.Component), _class.properties = {}, _class.$$events = ["ondelFn", "addWishFn", "unlikeit", "likeit", "oncheckdetail", "toBoxdetail", "onModify", "addgoods", "fetchMoreLikes", "onSearchHandler", "onInput", "onGoback", "onCloseHeard"], _temp2);
exports.default = Myheart;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Myheart, true));
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,avatar,lastLon,lastLat,wishid,merchantid,_createClass=function(){function o(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,a){return t&&o(e.prototype,t),a&&o(e,a),e}}(),_get=function e(t,a,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,a);if(void 0===i){var n=Object.getPrototypeOf(t);return null===n?void 0:e(n,a,o)}if("value"in i)return i.value;var s=i.get;return void 0!==s?s.call(o):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var Myheart=(_temp2=_class=function(e){function s(){var e,t,a;_classCallCheck(this,s);for(var o=arguments.length,i=Array(o),n=0;n<o;n++)i[n]=arguments[n];return(t=a=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(i)))).$usedState=["myheartList","searLists","otherWishes","machines","globalData","mhhImg","avator","imgs","imgs1","zmkm","clear","value","bool","HearBoolean","HearHead","closebtn","markBoolean","heardImg","addr","dyzh","yyzh","hashOtherWishes","pageNo","pageSize","hasMore","isDel","wish","wishname"],a.config={navigationBarTitleText:"心愿单"},a.$$refs=[],_possibleConstructorReturn(a,t)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={mhhImg:_index3.PATH+"/mImages/xydImg.png",avator:_index3.globalData.avatar?_index3.globalData.avatar:_index3.PATH+"/mImages/tempavator.jpg",imgs:_index3.PATH+"/mImages/xytb.png",imgs1:_index3.PATH+"/mImages/xytb-1.png",zmkm:_index3.PATH+"/mImages/zmkm0.png",clear:_index3.PATH+"/mImages/ljx1.png",value:"",bool:!1,HearBoolean:!1,HearHead:_index3.PATH+"/mImages/ysjtb1.png",closebtn:_index3.PATH+"/mImages/gban1.png",markBoolean:!1,heardImg:_index3.PATH+"/mImages/fkz.png",addr:_index3.PATH+"/mImages/tytb-4.png",dyzh:_index3.PATH+"/mImages/dyz_f.png",yyzh:_index3.PATH+"/mImages/yyz_f.png",searLists:[],myheartList:[],otherWishes:[],hashOtherWishes:[],pageNo:1,pageSize:10,hasMore:!1,isDel:!1,machines:[],wish:"",wishname:""}}},{key:"componentWillMount",value:function(){console.log("-----------onLoad---------"),console.log(this.$router.params),avatar=this.$router.params.avatar,lastLon=this.$router.params.lon,lastLat=this.$router.params.lat,console.log("globalData:"),console.log(_index3.globalData)}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){console.log("---onshow----"),this.ongetHeartList(),this.reset(),this.loadOtherWishes()}},{key:"componentDidHide",value:function(){}},{key:"componentDidCatchError",value:function(){}},{key:"fetchMoreLikes",value:function(){this.state.hasMore&&this.loadOtherWishes()}},{key:"loadOtherWishes",value:function(){var i=this;_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"wishlist/otherWishList",data:{pageNo:this.state.pageNo,pageSize:this.state.pageSize},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){var t=e.data.rows;console.log("其他小伙伴的心愿单："),console.log(e.data);var a={},o=t.reduce(function(e,t){return!a[t.wishlistid]&&(a[t.wishlistid]=e.push(t)),e},[]);console.log("chatList："),console.log(o),_index2.default.hideLoading(),console.log("pageNo:"),console.log(e.data.pageNo),i.setState({otherWishes:i.state.otherWishes.concat(o),hasMore:e.data.hasMore,pageNo:e.data.pageNo})},fail:function(e){_index2.default.hideLoading(),_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"reset",value:function(){this.setState({otherWishes:[],hashOtherWishes:[],pageNo:1})}},{key:"onCloseHeard",value:function(){console.log("关闭心愿单"),this.setState({HearBoolean:!1,markBoolean:!1})}},{key:"addgoods",value:function(){console.log("添加商品"),this.setState({bool:!0,isDel:!1})}},{key:"add",value:function(){console.log("添加商品"),this.setState({bool:!1})}},{key:"onSetheart",value:function(){console.log("进入心愿单中心"),_index2.default.navigateTo({url:"/pages/wish/likes/myheart"})}},{key:"oncheckdetail",value:function(e){console.log("查看详情"),console.log(e),console.log("wishid："+e.currentTarget.dataset.wishid),console.log("wishname:"+e.currentTarget.dataset.wishname),wishid=e.target.dataset.wishid,merchantid=e.target.dataset.merchantid?e.target.dataset.merchantid:"",this.setState({HearBoolean:!0,markBoolean:!0,wishname:e.currentTarget.dataset.wishname}),this.loadMachines()}},{key:"loadMachines",value:function(){var t=this;_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"wishlist/getWishFeedBacks",data:{wishlistid:wishid,merchantid:merchantid,longitude:_index3.globalData.longitude,latitude:_index3.globalData.lastLon},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("machines:"),console.log(e),_index2.default.hideLoading(),t.setState({machines:e.data.rows,wish:0<e.data.rows.length?e.data.rows[0].wishname:""})},fail:function(e){_index2.default.hideLoading(),t.setState({machines:[]})}})}},{key:"onSearchHandler",value:function(e){console.log(e),this.setState({value:e});var t=this;_index2.default.request({url:_index3.BASE_URL+"wishlist/filterWishes",data:{name:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST"}).then(function(e){200==e.data.code&&(console.log("res.data.rows:"),console.log(e.data.rows),t.setState({searLists:e.data.rows}))})}},{key:"formSubmit",value:function(e){console.log(e),console.log("form")}},{key:"onGoback",value:function(){this.setState({value:"",bool:!1})}},{key:"onInput",value:function(e){console.log(),console.log("添加。。"),console.log(e),e?this.adda(e):_index2.default.showToast({title:"请添加心愿",icon:"fail",duration:2e3})}},{key:"onBlur",value:function(e){console.log("失去焦点。。。。"),console.log(e)}},{key:"adda",value:function(e){var t=this;_index2.default.request({url:_index3.BASE_URL+"wishlist/addWish",data:{name:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){200==e.data.status?(console.log("添加成功！"),t.setState({bool:!1,value:""}),t.ongetHeartList()):_index2.default.showToast({title:e.data.msg,icon:"fail",duration:2e3})},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"bindconfirm",value:function(e){console.log(e),console.log("bindconfirom")}},{key:"ongetHeartList",value:function(){var a=this;_index2.default.request({url:_index3.BASE_URL+"/wishlist/myWishList",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){console.log("获取心愿列表11111："),console.log(e.data.rows);var t=e.data.rows.map(function(e,t){return e.id=t,e});a.setState({myheartList:t})},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"onModify",value:function(){console.log("修改按钮"),this.setState({isDel:!0})}},{key:"ondelFn",value:function(e){console.log(e),console.log(e.currentTarget.id);var o=e.currentTarget.id,t=e.currentTarget.dataset.type,i=e.currentTarget.dataset.wishlistid,a=e.currentTarget.dataset.wishpraise,n=this;_index2.default.request({url:_index3.BASE_URL+"/wishlist/deleteAWish",data:{type:t,wishlistid:i,wishpraise:a},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(a){if(console.log(a),200==a.data.status){console.log("删除成功！");var e=n.state.otherWishes;e.map(function(e,t){e.wishlistid==i&&(e.extra="0",e.likes=a.data.n)});var t=n.state.myheartList;t.splice(o,1),n.setState({myheartList:t,otherWishes:e})}},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"toBoxdetail",value:function(e){_index2.default.navigateTo({url:"../../box/boxdetail/boxdetail?machineid="+e.currentTarget.dataset.machineid})}},{key:"unlikeit",value:function(e){var o=this,i=(e.currentTarget.dataset.id,e.currentTarget.dataset.wishid),t=this.state.myheartList.find(function(e,t){if(e.wishlistid==i)return e.wishpraise}),a=e.currentTarget.dataset.type;console.log("wishpraise:"),console.log(t.wishpraise),_index2.default.request({url:_index3.BASE_URL+"wishlist/deleteAWish",method:"POST",data:{wishlistid:i,wishpraise:t.wishpraise,type:a},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(a){if(_index2.default.hideLoading(),200==a.data.status){var e=o.state.otherWishes;e.map(function(e,t){return e.wishlistid==i&&(e.extra="0",e.likes=a.data.n),e}),console.log("extra after..."),console.log(e);var t=o.state.myheartList.filter(function(e,t){return e.wishlistid!==i});console.log(t),o.setState({otherWishes:e,myheartList:t})}_index2.default.showToast({title:a.data.msg,icon:200==a.data.status?"success":"none",duration:2e3})},fail:function(e){_index2.default.hideLoading(),_index2.default.showToast({title:"删除失败",icon:"fail",duration:2e3})}})}},{key:"likeit",value:function(e){var o=this;console.log(e);var i=e.currentTarget.dataset.id,t=e.currentTarget.dataset.wishid;console.log("idx:"+i+"wishid:"+t),_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"wishlist/likeAWish",method:"POST",data:{wishlistid:e.currentTarget.dataset.wishid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(a){_index2.default.hideLoading();var e=o.state.myheartList.concat(a.data.rows);console.log("this.state.otherWishes"),console.log(o.state.otherWishes);var t=o.state.otherWishes;t.map(function(e,t){return t==i&&(e.extra="1",e.likes=a.data.n),e}),console.log("extra after..."),console.log(t),o.setState({otherWishes:t,myheartList:e}),_index2.default.showToast({title:"点赞成功",icon:"success",duration:2e3})},fail:function(e){console.log("请求失败:"+e),_index2.default.hideLoading(),_index2.default.showToast({title:"点赞失败",icon:"fail",duration:2e3})}})}},{key:"addWishFn",value:function(e){console.log(e);var t=e.currentTarget.dataset.wishname;this.setState({value:t})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];var e=this.__state;e.searLists,e.myheartList,e.otherWishes,e.machines;return Object.assign(this.__state,{globalData:_index3.globalData}),this.__state}}]),s}(),_class.properties={},_class.$$events=["ondelFn","addWishFn","unlikeit","likeit","oncheckdetail","toBoxdetail","onModify","addgoods","fetchMoreLikes","onSearchHandler","onInput","onGoback","onCloseHeard"],_temp2);exports.default=Myheart,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Myheart,!0));
>>>>>>> b7c6447... 微信小程序免密版更新
=======
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,avatar,lastLon,lastLat,wishid,merchantid,_createClass=function(){function o(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,a){return t&&o(e.prototype,t),a&&o(e,a),e}}(),_get=function e(t,a,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,a);if(void 0===i){var n=Object.getPrototypeOf(t);return null===n?void 0:e(n,a,o)}if("value"in i)return i.value;var s=i.get;return void 0!==s?s.call(o):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var Myheart=(_temp2=_class=function(e){function s(){var e,t,a;_classCallCheck(this,s);for(var o=arguments.length,i=Array(o),n=0;n<o;n++)i[n]=arguments[n];return(t=a=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(i)))).$usedState=["myheartList","searLists","otherWishes","machines","globalData","mhhImg","avator","imgs","imgs1","zmkm","clear","value","bool","HearBoolean","HearHead","closebtn","markBoolean","heardImg","addr","dyzh","yyzh","hashOtherWishes","pageNo","pageSize","hasMore","isDel","wish","wishname"],a.config={navigationBarTitleText:"心愿单"},a.$$refs=[],_possibleConstructorReturn(a,t)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={mhhImg:_index3.PATH+"/mImages/xydImg.png",avator:_index3.globalData.avatar?_index3.globalData.avatar:_index3.PATH+"/mImages/tempavator.jpg",imgs:_index3.PATH+"/mImages/xytb.png",imgs1:_index3.PATH+"/mImages/xytb-1.png",zmkm:_index3.PATH+"/mImages/zmkm0.png",clear:_index3.PATH+"/mImages/ljx1.png",value:"",bool:!1,HearBoolean:!1,HearHead:_index3.PATH+"/mImages/ysjtb1.png",closebtn:_index3.PATH+"/mImages/gban1.png",markBoolean:!1,heardImg:_index3.PATH+"/mImages/fkz.png",addr:_index3.PATH+"/mImages/tytb-4.png",dyzh:_index3.PATH+"/mImages/dyz_f.png",yyzh:_index3.PATH+"/mImages/yyz_f.png",searLists:[],myheartList:[],otherWishes:[],hashOtherWishes:[],pageNo:1,pageSize:10,hasMore:!1,isDel:!1,machines:[],wish:"",wishname:""}}},{key:"componentWillMount",value:function(){console.log("-----------onLoad---------"),console.log(this.$router.params),avatar=this.$router.params.avatar,lastLon=this.$router.params.lon,lastLat=this.$router.params.lat,console.log("globalData:"),console.log(_index3.globalData)}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){console.log("---onshow----"),this.ongetHeartList(),this.reset(),this.loadOtherWishes()}},{key:"componentDidHide",value:function(){}},{key:"componentDidCatchError",value:function(){}},{key:"fetchMoreLikes",value:function(){this.state.hasMore&&this.loadOtherWishes()}},{key:"loadOtherWishes",value:function(){var i=this;_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"wishlist/otherWishList",data:{pageNo:this.state.pageNo,pageSize:this.state.pageSize},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){var t=e.data.rows;console.log("其他小伙伴的心愿单："),console.log(e.data);var a={},o=t.reduce(function(e,t){return!a[t.wishlistid]&&(a[t.wishlistid]=e.push(t)),e},[]);console.log("chatList："),console.log(o),_index2.default.hideLoading(),console.log("pageNo:"),console.log(e.data.pageNo),i.setState({otherWishes:i.state.otherWishes.concat(o),hasMore:e.data.hasMore,pageNo:e.data.pageNo})},fail:function(e){_index2.default.hideLoading(),_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"reset",value:function(){this.setState({otherWishes:[],hashOtherWishes:[],pageNo:1})}},{key:"onCloseHeard",value:function(){console.log("关闭心愿单"),this.setState({HearBoolean:!1,markBoolean:!1})}},{key:"addgoods",value:function(){console.log("添加商品"),this.setState({bool:!0,isDel:!1})}},{key:"add",value:function(){console.log("添加商品"),this.setState({bool:!1})}},{key:"onSetheart",value:function(){console.log("进入心愿单中心"),_index2.default.navigateTo({url:"/pages/wish/likes/myheart"})}},{key:"oncheckdetail",value:function(e){console.log("查看详情"),console.log(e),console.log("wishid："+e.currentTarget.dataset.wishid),console.log("wishname:"+e.currentTarget.dataset.wishname),wishid=e.target.dataset.wishid,merchantid=e.target.dataset.merchantid?e.target.dataset.merchantid:"",this.setState({HearBoolean:!0,markBoolean:!0,wishname:e.currentTarget.dataset.wishname}),this.loadMachines()}},{key:"loadMachines",value:function(){var t=this;_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"wishlist/getWishFeedBacks",data:{wishlistid:wishid,merchantid:merchantid,longitude:_index3.globalData.longitude,latitude:_index3.globalData.lastLon},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("machines:"),console.log(e),_index2.default.hideLoading(),t.setState({machines:e.data.rows,wish:0<e.data.rows.length?e.data.rows[0].wishname:""})},fail:function(e){_index2.default.hideLoading(),t.setState({machines:[]})}})}},{key:"onSearchHandler",value:function(e){console.log(e),this.setState({value:e});var t=this;_index2.default.request({url:_index3.BASE_URL+"wishlist/filterWishes",data:{name:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST"}).then(function(e){200==e.data.code&&(console.log("res.data.rows:"),console.log(e.data.rows),t.setState({searLists:e.data.rows}))})}},{key:"formSubmit",value:function(e){console.log(e),console.log("form")}},{key:"onGoback",value:function(){this.setState({value:"",bool:!1})}},{key:"onInput",value:function(e){console.log(),console.log("添加。。"),console.log(e),e?this.adda(e):_index2.default.showToast({title:"请添加心愿",icon:"fail",duration:2e3})}},{key:"onBlur",value:function(e){console.log("失去焦点。。。。"),console.log(e)}},{key:"adda",value:function(e){var t=this;_index2.default.request({url:_index3.BASE_URL+"wishlist/addWish",data:{name:e},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){200==e.data.status?(console.log("添加成功！"),t.setState({bool:!1,value:""}),t.ongetHeartList()):_index2.default.showToast({title:e.data.msg,icon:"fail",duration:2e3})},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"bindconfirm",value:function(e){console.log(e),console.log("bindconfirom")}},{key:"ongetHeartList",value:function(){var a=this;_index2.default.request({url:_index3.BASE_URL+"/wishlist/myWishList",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){console.log("获取心愿列表11111："),console.log(e.data.rows);var t=e.data.rows.map(function(e,t){return e.id=t,e});a.setState({myheartList:t})},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"onModify",value:function(){console.log("修改按钮"),this.setState({isDel:!0})}},{key:"ondelFn",value:function(e){console.log(e),console.log(e.currentTarget.id);var o=e.currentTarget.id,t=e.currentTarget.dataset.type,i=e.currentTarget.dataset.wishlistid,a=e.currentTarget.dataset.wishpraise,n=this;_index2.default.request({url:_index3.BASE_URL+"/wishlist/deleteAWish",data:{type:t,wishlistid:i,wishpraise:a},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(a){if(console.log(a),200==a.data.status){console.log("删除成功！");var e=n.state.otherWishes;e.map(function(e,t){e.wishlistid==i&&(e.extra="0",e.likes=a.data.n)});var t=n.state.myheartList;t.splice(o,1),n.setState({myheartList:t,otherWishes:e})}},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"toBoxdetail",value:function(e){_index2.default.navigateTo({url:"../../box/boxdetail/boxdetail?machineid="+e.currentTarget.dataset.machineid})}},{key:"unlikeit",value:function(e){var o=this,i=(e.currentTarget.dataset.id,e.currentTarget.dataset.wishid),t=this.state.myheartList.find(function(e,t){if(e.wishlistid==i)return e.wishpraise}),a=e.currentTarget.dataset.type;console.log("wishpraise:"),console.log(t.wishpraise),_index2.default.request({url:_index3.BASE_URL+"wishlist/deleteAWish",method:"POST",data:{wishlistid:i,wishpraise:t.wishpraise,type:a},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(a){if(_index2.default.hideLoading(),200==a.data.status){var e=o.state.otherWishes;e.map(function(e,t){return e.wishlistid==i&&(e.extra="0",e.likes=a.data.n),e}),console.log("extra after..."),console.log(e);var t=o.state.myheartList.filter(function(e,t){return e.wishlistid!==i});console.log(t),o.setState({otherWishes:e,myheartList:t})}_index2.default.showToast({title:a.data.msg,icon:200==a.data.status?"success":"none",duration:2e3})},fail:function(e){_index2.default.hideLoading(),_index2.default.showToast({title:"删除失败",icon:"fail",duration:2e3})}})}},{key:"likeit",value:function(e){var o=this;console.log(e);var i=e.currentTarget.dataset.id,t=e.currentTarget.dataset.wishid;console.log("idx:"+i+"wishid:"+t),_index2.default.showLoading({title:""}),_index2.default.request({url:_index3.BASE_URL+"wishlist/likeAWish",method:"POST",data:{wishlistid:e.currentTarget.dataset.wishid},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(a){_index2.default.hideLoading();var e=o.state.myheartList.concat(a.data.rows);console.log("this.state.otherWishes"),console.log(o.state.otherWishes);var t=o.state.otherWishes;t.map(function(e,t){return t==i&&(e.extra="1",e.likes=a.data.n),e}),console.log("extra after..."),console.log(t),o.setState({otherWishes:t,myheartList:e}),_index2.default.showToast({title:"点赞成功",icon:"success",duration:2e3})},fail:function(e){console.log("请求失败:"+e),_index2.default.hideLoading(),_index2.default.showToast({title:"点赞失败",icon:"fail",duration:2e3})}})}},{key:"addWishFn",value:function(e){console.log(e);var t=e.currentTarget.dataset.wishname;this.setState({value:t})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];var e=this.__state;e.searLists,e.myheartList,e.otherWishes,e.machines;return Object.assign(this.__state,{globalData:_index3.globalData}),this.__state}}]),s}(),_class.properties={},_class.$$events=["ondelFn","addWishFn","unlikeit","likeit","oncheckdetail","toBoxdetail","onModify","addgoods","fetchMoreLikes","onSearchHandler","onInput","onGoback","onCloseHeard"],_temp2);exports.default=Myheart,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Myheart,!0));
>>>>>>> b7c6447... 微信小程序免密版更新
