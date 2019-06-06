'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.get = get;


/** 
 * 线上环境
 * 为了方便测试，使用的是聚合数据免费接口
 *BASE_URL: 'https://t.wemall.com.cn/clientapi/',
  HOST_URL: 'https://t.wemall.com.cn/',
  HOST_WEBSOCKET: 'wss://t.wemall.com.cn/socket/',
 */

var BASE_URL = exports.BASE_URL = 'https://testo.wemall.com.cn/clientapi/';

/** 
 * 测试环境
 */
var HOST_URL = exports.HOST_URL = 'https://testo.wemall.com.cn/';

/*
 * WEBSOCKET
 */
var HOST_WEBSOCKET = exports.HOST_WEBSOCKET = 'wss://testo.wemall.com.cn/socket/';
/** 
 * 线上mock
 */
var MOCKHOST = exports.MOCKHOST = 'http://xxx/mock';

/** 
 * 是否mock
 */
var ISMOCK = exports.ISMOCK = false;

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
var MAINHOST = exports.MAINHOST = BASE_URL;

/**
 * 全局的分享信息 不用每一个都去写
 */
var SHAREINFO = exports.SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
};
var PATH = exports.PATH = "http://shoptestapp.wemall.com.cn";
var systemUser = exports.systemUser = '知码小蜜';

var globalData = exports.globalData = {
  token: '',
  haslogin: false,
  isshopping: 0,
  needrefresh: false,
  requestcount: 0,
  timerTem: 0,
  intervalPapayTemp: null
};

function set(key, val) {
  globalData[key] = val;
}

function get(key) {
  return globalData[key];
}