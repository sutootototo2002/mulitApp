import { number } from "prop-types";

/** 
 * 线上环境
 * 为了方便测试，使用的是聚合数据免费接口
 *BASE_URL: 'https://t.wemall.com.cn/clientapi/',
  HOST_URL: 'https://t.wemall.com.cn/',
  HOST_WEBSOCKET: 'wss://t.wemall.com.cn/socket/',
 */





export const BASE_URL='https://testo.wemall.com.cn/clientapi/'

/** 
 * 测试环境
 */
export const HOST_URL= 'https://testo.wemall.com.cn/'

/*
 * WEBSOCKET
 */
export const HOST_WEBSOCKET= 'wss://testo.wemall.com.cn/socket/'
/** 
 * 线上mock
 */
export const MOCKHOST = 'http://xxx/mock'

/** 
 * 是否mock
 */
export const ISMOCK = false

/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = BASE_URL

/**
 * 全局的分享信息 不用每一个都去写
 */
export const SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
}
export const PATH ="https://shoptestapp.wemall.com.cn" //图片路径
export const systemUser='知码小蜜';
export const bgColor='#ff9409';
export const globalData={
  token: '',
  haslogin:false,
  isshopping:0,
  needrefresh:false,
  requestcount:0,
  timerTem:0,
  sysTitle:'知码开门售货柜',
  intervalPapayTemp:null
}

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}



