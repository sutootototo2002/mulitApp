import { BASE_URL, globalData} from '../config/index.js';

// eslint-disable-next-line import/first
import Taro from '@tarojs/taro'

//时间转换
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//数字转换1--01 2 --02
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



// eslint-disable-next-line import/no-commonjs
module.exports = {
  formatTime: formatTime,
  login: login,
  uploadimg: uploadimg,
  getUserDetail:getUserDetail
}
//获取用户信息方法
function getUserDetail(callback) {
  var that = this;
  Taro.request({
    url: BASE_URL + 'user/detail',
    data: {
    },
    header: {
      'content-type': 'application/json', // 默认值
      'token': globalData.token
    }
  }).then((res)=>{
     callback(res);
  }).catch(res=>{
     callback(res);
  })
}

function login(code, encryptedData, iv, succeeded, failed) {
  // 1 调用wx.login获取 code
  // 2 调用wx.getUserInfo获取签名所需的 rawData , signatrue, encryptData
  // 3 发起请求将获取的数据发送的后台
  var that = this;
  Taro.showLoading({
    title: '正在登录',
  })
  Taro.request({
    url: BASE_URL + 'token/getToken',
    data: {
      "code": code,
      "encryptedData": encryptedData,
      "iv": iv
    },
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    success: function (res) {
      console.log(res.data);
      if (res.data.code == 200) {
        Taro.hideLoading();
        console.log('服务器登录成功');
        Taro.setStorage({
          key: "token",
          data: res.data.data
        });
        globalData.token = res.data.data;
        globalData.haslogin = true;
        // typeof cb == 'function' && cb();
        succeeded(res);
      } else {
        console.log(res.code)
        var code = res.code;
        Taro.hideLoading();
        Taro.showToast({
          title: '登录失败，请重试',
          icon: code,
          duration: 2000
        })
      }

    },
    fail: function (e) {
      Taro.hideLoading();
      Taro.showToast({
        title: '服务器登陆失败，请退出后重新登录',
        icon: 'fail',
        duration: 2000
      })
    }
  })
}
//多张图片上传
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
  var keys = data.keys ? data.keys : "";
  Taro.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'file',
    formData: null,
    success: function (res) {
      success++;
      console.log(res)
      console.log(i);
      //let $data = res.data;
      var json = JSON.parse(res.data);
      keys = keys.concat(json.data + ";");
      console.info("keys---:" + keys);
    },
    fail: function (e) {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: function (e) {
      console.log(i);
      i++;
      if (i == data.path.length) {   //当图片传完时，停止调用          
        console.log('执行完毕' + keys);
        console.log('成功：' + success + " 失败：" + fail);
        Taro.hideLoading();
        typeof data.cb == 'function' && data.cb(keys);
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        data.keys = keys;
        uploadimg(data);
      }
    }
  });
}