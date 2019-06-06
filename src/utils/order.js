
//var count=0;
// import { BASE_URL, globalData} from '../config/index.js';

import { BASE_URL,globalData} from '../config/index.js';

// eslint-disable-next-line import/first
import Taro from '@tarojs/taro'

// eslint-disable-next-line import/no-commonjs
module.exports = {
  orderstatus: orderstatus,
  shoppingorder: shoppingorder,
  stopInterval: stopInterval,
  requestorderstatus:requestorderstatus
}
//停止销毁轮询
function stopInterval(){
  console.log("stopInterval:")
  clearInterval(globalData.timerTem);

}



 //查询订单状态
 
function orderstatus(orderid, succeeded) {

  startqueryorderstatus(orderid,succeeded);

}

function startqueryorderstatus(orderid,succeeded) {

  

  globalData.timerTem  =  setInterval(()=> {
       
      requestorderstatus(orderid,succeeded);

      console.log(new Date() + '_' + globalData.requestcount);

  }, 2000)
  console.log("globalData.timerTem00000000000000000000000")
  console.log(globalData.timerTem)

  

}
/**
 * 查询是否有购物中订单
 */
function shoppingorder(succeeded) {
  
  Taro.request({
    url:BASE_URL + 'order/shoppingorder',
    data: {},
    header: {
      'content-type': 'application/json', // 默认值
      'token': globalData.token
    },
    success: function(res) {
      if (res.data.code == 200) {
        var result = res.data.data;
        console.log('---getShoppingOrder(购物中订单)---');
        console.log(result);
        succeeded(result);
      } else {

      }

    }
  })
}

function requestorderstatus(orderid, succeeded) {
  globalData.requestcount++;
  Taro.request({
    url: BASE_URL + 'device/orderstatus',
    data: {
      orderid: orderid,
      times: globalData.requestcount
    },
    header: {
      'content-type': 'application/json', // 默认值
      'token': globalData.token
    },
    method: "POST",
    success: function(res) {
      console.log(res);
      succeeded(res);
    },
    fail: function(e) {
       console.log(e);
    }
  })
}