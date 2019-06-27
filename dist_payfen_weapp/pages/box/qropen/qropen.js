"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,intervalPapay,intervalOrderStatus,requestfailed,_createClass=function(){function o(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,a){return t&&o(e.prototype,t),a&&o(e,a),e}}(),_get=function e(t,a,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,a);if(void 0===n){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,a,o)}if("value"in n)return n.value;var d=n.get;return void 0!==d?d.call(o):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js"),_util=require("../../../utils/util.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var orderid="",Qropen=(_temp2=_class=function(e){function d(){var e,t,a;_classCallCheck(this,d);for(var o=arguments.length,n=Array(o),i=0;i<o;i++)n[i]=arguments[i];return(t=a=_possibleConstructorReturn(this,(e=d.__proto__||Object.getPrototypeOf(d)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp","formid","lockid","machineid","orderid","openfailed","requestfailed","pay","num","tag","qrurl","haslogin","showlogin","showpapay","showopen","papayPressed","showModalStatus","unpayorder","loadImg","loadImg1","loadImg2","unpayImg","unpriceImg","islogin","markBoolean","open","unpay"],a.config={navigationBarTitleText:""},a.$$refs=[],_possibleConstructorReturn(a,t)}return _inherits(d,_index.Component),_createClass(d,[{key:"_constructor",value:function(e){_get(d.prototype.__proto__||Object.getPrototypeOf(d.prototype),"_constructor",this).call(this,e),this.state={formid:"",lockid:"",machineid:"",orderid:"",openfailed:!1,requestfailed:!0,pay:!1,num:0,tag:100,qrurl:"",haslogin:!1,showlogin:!1,showpapay:!1,showopen:!1,papayPressed:!1,showModalStatus:!1,unpayorder:[],loadImg:_index3.PATH+"/mImages/openouter.png",loadImg1:_index3.PATH+"/mImages/smks-wzc.png",loadImg2:_index3.PATH+"/mImages/car.png",unpayImg:_index3.PATH+"/mImages/wfk-11.png",unpriceImg:_index3.PATH+"/mImages/wfk.png",islogin:!1,markBoolean:!1,open:!1,unpay:!1}}},{key:"componentWillMount",value:function(){console.log("---onLoad---"),_index2.default.setNavigationBarTitle({title:_index3.globalData.sysTitle}),console.log(this.$router.params),this.setState({formid:this.$router.params.formid,lockid:this.$router.params.lockid,machineid:this.$router.params.machineid});var a=this;_index2.default.showLoading({title:""});var e=decodeURIComponent(this.$router.params.q);a.setState({qrurl:e}),_index2.default.getStorage({key:"token"}).then(function(e){var t=e.data;_index2.default.request({url:_index3.BASE_URL+"token/verifyToken",data:{token:t},header:{"content-type":"application/json",token:t},success:function(e){console.log(e),200==e.data.code?(console.log("*********token 有效***********"),_index3.globalData.token=t,_index3.globalData.haslogin=!0,a.getUserDetail()):(_index2.default.hideLoading(),console.log("*********token 过期***********1"),_index2.default.removeStorageSync("token"),a.checkUser())}})}).catch(function(e){_index2.default.hideLoading(),console.log("*********不存在token***********"),console.log("----checkUser----"),a.checkUser()})}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){console.log("---onShow----");var e=this;setTimeout(function(){e.getUserDetail()},2e3)}},{key:"componentDidHide",value:function(){}},{key:"componentDidCatchError",value:function(){}},{key:"getPhoneNumber",value:function(a){console.log(a.detail.errMsg);var o=this;if("getPhoneNumber:ok"==a.detail.errMsg){o=this;_index2.default.login().then(function(e){console.log(e);var t=e.code;console.log("开始登录:"+t),(0,_util.login)(t,a.detail.encryptedData,a.detail.iv,function(e){_index2.default.showToast({title:"登陆成功",icon:"success",duration:500}),o.setState({islogin:!1,pay:!0})},function(e){_index2.default.showToast({title:"登陆失败,请再按一下",icon:"fail",duration:500})})}).catch(function(e){console.log(e)})}}},{key:"showLoginModal",value:function(){this.setState({showlogin:!0,showpapay:!1})}},{key:"checkUser",value:function(){_index2.default.showLoading({title:""});var a=this;_index2.default.login({success:function(e){var t=e.code;console.log("START LOGIN:"+t),_index2.default.request({url:_index3.BASE_URL+"token/checkUser",data:{code:t},header:{"content-type":"application/json",token:_index3.globalData.token},method:"GET",success:function(e){_index2.default.hideLoading(),console.log(e.data),200==e.data.code&&""!=e.data.data&&(console.log("服务器登录成功"),_index2.default.setStorage({key:"token",data:e.data.data}),_index3.globalData.token=e.data.data,_index3.globalData.haslogin=!0,a.getUserDetail())}})},fail:function(e){}})}},{key:"getUserDetail",value:function(){_index2.default.showLoading({title:""});var a=this;_index2.default.request({url:_index3.BASE_URL+"user/detail",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){if(console.log("用户信息："),console.log(e),_index2.default.hideLoading(),200==e.data.code){_index3.globalData.haslogin=!0,a.setState({islogin:!1});var t=e.data.data.isnopasspay;"1"==e.data.data.havearrears&&a.getUnpayOrder(),"1"==t?(console.log("---已开通免密open---"),a.setState({islogin:!1,pay:!1,open:!0})):(console.log("---未开通免密open---"),a.setState({pay:!0})),a.getShoppingOrder()}else{console.log("*********用户不存在***********1"),a.setState({islogin:!0});try{_index2.default.removeStorageSync("token")}catch(e){}_index3.globalData.haslogin=!1}}})}},{key:"getShoppingOrder",value:function(){_index2.default.request({url:_index3.BASE_URL+"order/shoppingorder",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){if(console.log("---getShoppingOrder---"),console.log(e),200==e.data.code){var t=e.data.data,a=t.orderid,o=t.machineid,n=t.orderno;3==t.recogmode?(_index2.default.setStorage({key:"orderid",data:a}),_index2.default.redirectTo({url:"/pages/index/shopping/index?orderid="+a+"&machineid="+o+"&orderno="+n+"&from=index"})):(_index2.default.setStorage({key:"orderid",data:a}),_index2.default.redirectTo({url:"/pages/index/cgshopping/index?orderid="+a+"&machineid="+o+"&orderno="+n}))}}})}},{key:"getUnpayOrder",value:function(){var t=this;_index2.default.request({url:_index3.BASE_URL+"order/unpayorder",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){200==e.data.code?t.setState({unpay:!0,markBoolean:!0,unpayorder:e.data.data}):_index2.default.showToast({title:"获取未支付订单失败"})}})}},{key:"unpayorderLayer",value:function(e){"close"==e&&this.setState({showModalStatus:!1}),"open"==e&&this.setState({showModalStatus:!0})}},{key:"deviceOpen",value:function(n,e){console.log("machined:"+this.state.machineid+"lockid:"+e+"formid:"+this.state.formid),_index2.default.showLoading({title:""});var i=this;_index2.default.request({url:_index3.BASE_URL+"device/open",data:{machineid:n,lockid:e,formid:i.state.formid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(_index2.default.hideLoading(),200==e.data.code){var t=e.data.data.orderid,a=e.data.data.orderno,o=e.data.data.recogmode;i.setState({orderid:t}),3==o?(_index2.default.setStorageSync("orderid",t),_index2.default.redirectTo({url:"../../index/shopping/index?orderid="+t+"&machineid="+n+"&orderno="+a+"&from=open"})):(_index2.default.setStorageSync("orderid",t),_index2.default.redirectTo({url:"../../index/cgshopping/index?orderid="+t+"&machineid="+n+"&orderno="+a}))}else i.setState({openfailed:!1,islogin:!1}),_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1,success:function(e){e.confirm&&_index2.default.reLaunch({url:"../../index/index"})}})},fail:function(e){_index2.default.showModal({title:"提示",content:"请求失败，请稍后再试",showCancel:!1,success:function(e){e.confirm&&_index2.default.reLaunch({url:"../../index/index"})}})}})}},{key:"tryagain",value:function(){_index2.default.redirectTo({url:"/pages/index/index"})}},{key:"open",value:function(){var t=this,a=0,o=setInterval(function(){var e=a++;t.setState({tag:e}),requestfailed?(console.log("---循环执行代码 ---"),t.openStatus()):(t.setState({tag:100}),console.log("---停止循环执行代码 ---"),clearInterval(o))},1e3);setTimeout(function(){requestfailed&&(clearInterval(o),t.requestOpenStatus())}.bind(this),6e4)}},{key:"openStatus",value:function(){var t=this;orderid=_index2.default.getStorageSync("orderid"),console.log("orderid:"),console.log(orderid),_index2.default.request({url:_index3.BASE_URL+"device/openstatus",data:{orderid:orderid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){200==e.data.code?(t.setState({requestfailed:!1}),requestfailed=!1,_index2.default.setStorageSync("orderid",t.state.orderid),_index2.default.reLaunch({url:"../../index/index"})):211==e.data.code?(t.setState({requestfailed:!1}),requestfailed=!1,_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1,success:function(e){e.confirm&&_index2.default.navigateBack({})}})):t.setState({requestfailed:!0})},fail:function(e){t.setState({openfailed:!1})}})}},{key:"requestOpenStatus",value:function(){var t=this;_index2.default.request({url:_index3.BASE_URL+"device/requestopenstatus",data:{orderid:t.state.orderid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(200==e.data.code){t.setState({requestfailed:!1});e.data.data.orderstatus,e.data.data.doorstatus;_index2.default.setStorageSync("orderid",t.state.orderid),_index2.default.redirectTo({url:"../../index/index"})}else t.setState({openfailed:!0})},fail:function(e){t.setState({openfailed:!0})}})}},{key:"submitInfo",value:function(e){console.log("submitInfo"),this.requestopen();var t=e.detail.formId;_index2.default.setStorageSync("formId",e.detail.formId),console.log(e);this.setState({formid:t})}},{key:"requestopen",value:function(){var o=_index2.default.getStorageSync("formid");_index2.default.showLoading({title:""});var n=this;_index2.default.request({url:_index3.BASE_URL+"device/requestopen",data:{qrurl:n.state.qrurl},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(console.log(e),_index2.default.hideLoading(),200==e.data.code){var t=e.data.data.machineid,a=e.data.data.lockid;n.setState({machineid:t,lockid:a,showopen:!0}),_index2.default.hideLoading(),_index2.default.reLaunch({url:"../open/open?machineid="+t+"&lockid="+a+"&formid="+o.formid})}else 401==e.data.code?(_index2.default.hideLoading(),_index2.default.reLaunch({url:"../../index/index"})):_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1,success:function(e){e.confirm&&_index2.default.reLaunch({url:"../../index/index"})}})},fail:function(e){_index2.default.showToast({title:"请求失败",icon:"fail",duration:2e3})}})}},{key:"payOrder",value:function(){var e=_index2.default.getStorageSync("orderid");this.setState({orderid:e}),this.requestPay(e)}},{key:"requestPay",value:function(t){var a=this;_index2.default.showLoading({title:""}),_index2.default.request({method:"POST",data:{orderid:t},url:_index3.BASE_URL+"pay/getPreGoodsOrder",header:{Accept:"application/json","content-type":"application/x-www-form-urlencoded",token:_index3.globalData.token},success:function(e){_index2.default.hideLoading(),200==e.data.code?_index2.default.requestPayment({timeStamp:e.data.data.timeStamp,nonceStr:e.data.data.nonceStr,package:e.data.data.package,signType:e.data.data.signType,paySign:e.data.data.paySign,success:function(e){console.log("success",e),a.queryPayStatus(t)},fail:function(e){console.log("fail",e),_index2.default.showModal({title:"提示",content:"支付失败，请重新支付",showCancel:!1,success:function(e){}})}}):_index2.default.showModal({title:"提示",content:e.data.msg,showCancel:!1})}})}},{key:"queryPayStatus",value:function(e){var t=this;_index2.default.showLoading({title:"等待支付结果..."}),intervalOrderStatus=setInterval(function(){_index2.default.request({method:"POST",data:{orderid:e},url:_index3.BASE_URL+"order/paystatus",header:{Accept:"application/json",token:_index3.globalData.token},success:function(e){console.log(e.data.data),5==e.data.data.orderstatus&&(console.log("----payed---"),clearInterval(intervalOrderStatus),_index2.default.hideLoading(),t.setState({unpay:!1,markBoolean:!1}),t.getUserDetail())}})},2e3)}},{key:"gotoPapay",value:function(){var t=this;t.setState({papayPressed:!0}),_index2.default.request({method:"POST",url:_index3.BASE_URL+"pay/getPapayExtraData",data:{},header:{"content-type":"application/json",token:_index3.globalData.token},success:function(e){console.log("免密返回参数"),console.log(e.data),_index2.default.navigateToMiniProgram({appId:"wxbd687630cd02ce1d",path:"pages/index/index",extraData:{appid:e.data.appid,contract_code:e.data.contract_code,contract_display_account:e.data.contract_display_account,mch_id:e.data.mch_id,notify_url:e.data.notify_url,plan_id:e.data.plan_id,request_serial:e.data.request_serial,timestamp:e.data.timestamp,sign:e.data.sign}}).then(function(e){console.log(e),t.setState({pay:!1}),t.getUserDetail()}).catch(function(e){console.log(e)})},fail:function(e){console.log(e),_index2.default.hideLoading()}})}},{key:"gotoHome",value:function(){}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];var e=this.__state.unpay?(this.__state.unpayorder.payfee/100).toFixed(2):null;return Object.assign(this.__state,{anonymousState__temp:e}),this.__state}}]),d}(),_class.properties={},_class.$$events=["getPhoneNumber","gotoPapay","submitInfo","payOrder"],_temp2);exports.default=Qropen,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Qropen,!0));