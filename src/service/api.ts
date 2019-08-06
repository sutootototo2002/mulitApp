import {stringify} from 'qs';
import request from '../utils/request';
import {PATH} from '../config/index';


//得到令牌
export async function verifyToken(params) {
  return request(`${PATH}/token/verifyToken?${stringify(params)}`);
}
//用户登录接口 判断用户是否登录，如果登录可以拿到令牌
export async function checkUser(params) {
  return request(`${PATH}/clientapi/token/checkUser?${stringify(params)}`);
}
//得到位置支付宝、微信
export async function getpostion(params) {
    return request(`${PATH}/clientapi/token/checkUser?${stringify(params)}`);
  }


