"use strict";

var _index = require("../config/index.js");

var _index2 = require("../npm/@tarojs/taro-weapp/index.js");

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-commonjs

//var count=0;
// import { BASE_URL, globalData} from '../config/index.js';

module.exports = {
  orderstatus: orderstatus,
  shoppingorder: shoppingorder,
  stopInterval: stopInterval,
  requestorderstatus: requestorderstatus
  //停止销毁轮询
};

// eslint-disable-next-line import/first
function stopInterval() {
  console.log("stopInterval:");
  clearInterval(_index.globalData.timerTem);
}

//查询订单状态

function orderstatus(orderid, succeeded) {

  startqueryorderstatus(orderid, succeeded);
}

function startqueryorderstatus(orderid, succeeded) {

  _index.globalData.timerTem = setInterval(function () {

    requestorderstatus(orderid, succeeded);

    console.log(new Date() + '_' + _index.globalData.requestcount);
  }, 2000);
  console.log("globalData.timerTem00000000000000000000000");
  console.log(_index.globalData.timerTem);
}
/**
 * 查询是否有购物中订单
 */
function shoppingorder(succeeded) {

  _index3.default.request({
    url: _index.BASE_URL + 'order/shoppingorder',
    data: {},
    header: {
      'content-type': 'application/json', // 默认值
      'token': _index.globalData.token
    },
    success: function success(res) {
      if (res.data.code == 200) {
        var result = res.data.data;
        console.log('---getShoppingOrder(购物中订单)---');
        console.log(result);
        succeeded(result);
      }
    }
  });
}

function requestorderstatus(orderid, succeeded) {
  _index.globalData.requestcount++;
  _index3.default.request({
    url: _index.BASE_URL + 'device/orderstatus',
    data: {
      orderid: orderid,
      times: _index.globalData.requestcount
    },
    header: {
      'content-type': 'application/json', // 默认值
      'token': _index.globalData.token
    },
    method: "POST",
    success: function success(res) {
      console.log(res);
      succeeded(res);
    },
    fail: function fail(e) {
      console.log(e);
    }
  });
}