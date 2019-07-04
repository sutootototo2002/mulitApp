"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function i(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,o){return t&&i(e.prototype,t),o&&i(e,o),e}}(),_get=function e(t,o,i){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,o);if(void 0===n){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,o,i)}if("value"in n)return n.value;var a=n.get;return void 0!==a?a.call(i):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("../../../config/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var requestfailed=!0,iNow=0,orderid="",Open=(_temp2=_class=function(e){function a(){var e,t,o;_classCallCheck(this,a);for(var i=arguments.length,n=Array(i),r=0;r<i;r++)n[r]=arguments[r];return(t=o=_possibleConstructorReturn(this,(e=a.__proto__||Object.getPrototypeOf(a)).call.apply(e,[this].concat(n)))).$usedState=["formid","lockid","machineid","orderid","openfailed","requestfailed","markBoolean","num","tag","infine","isfind","dw","loadImg"],o.config={navigationBarTitleText:""},o.$$refs=[],_possibleConstructorReturn(o,t)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={formid:"",lockid:"",machineid:"",orderid:"",openfailed:!1,requestfailed:!0,markBoolean:!1,num:0,tag:0,infine:"设备故障",isfind:!1,dw:_index3.PATH+"/mImages/dw.png",loadImg:_index3.PATH+"/mImages/open.png"}}},{key:"componentWillMount",value:function(){_index2.default.setNavigationBarTitle({title:_index3.globalData.sysTitle}),console.log(this.$router.params),this.setState({formid:this.$router.params.formid,lockid:this.$router.params.lockid,machineid:this.$router.params.machineid}),this.open(),this.deviceOpen(this.$router.params.machineid,this.$router.params.lockid)}},{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){}},{key:"componentDidHide",value:function(){}},{key:"componentDidCatchError",value:function(){}},{key:"deviceOpen",value:function(i,e){_index2.default.showLoading({title:""});var n=this;_index2.default.request({url:_index3.BASE_URL+"device/open",data:{machineid:i,lockid:e,formid:n.state.formid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(_index2.default.hideLoading(),200==e.data.code){orderid=e.data.data.orderid;var t=e.data.data.orderno,o=e.data.data.recogmode;n.setState({orderid:orderid}),_index2.default.setStorageSync("orderid",orderid),3==o?(_index2.default.setStorageSync("orderid",orderid),_index2.default.redirectTo({url:"../../index/shopping/index?orderid="+orderid+"&machineid="+i+"&orderno="+t+"&from=open"})):(_index2.default.setStorageSync("orderid",orderid),_index2.default.redirectTo({url:"../../index/cgshopping/index?orderid="+orderid+"&machineid="+i+"&orderno="+t}))}else n.setState({openfailed:!0,isfind:!0,markBoolean:!0})},fail:function(e){_index2.default.showModal({title:"提示",content:"请求失败，请稍后再试",showCancel:!1,success:function(e){e.confirm&&_index2.default.reLaunch({url:"../../index/index"})}})}})}},{key:"tryagain",value:function(){_index2.default.redirectTo({url:"/pages/index/index"})}},{key:"open",value:function(){var e=this,t=setInterval(function(){e.setState({tag:1}),requestfailed?console.log("---循环执行代码 ---"):(console.log("---停止循环执行代码 ---"),e.setState({tag:100}),clearInterval(t))},800);setTimeout(function(){requestfailed&&(clearInterval(t),e.requestOpenStatus())}.bind(this),6e4)}},{key:"openStatus",value:function(){var t=this;orderid=_index2.default.getStorageSync("orderid"),console.log("orderid:"),console.log(orderid),_index2.default.request({url:_index3.BASE_URL+"device/openstatus",data:{orderid:orderid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){200==e.data.code?(t.setState({requestfailed:!1}),requestfailed=!1,console.log("orderid:1111111111111111111111"),console.log(orderid)):211==e.data.code?(t.setState({isfind:!0,infine:e.data.msg}),_index2.default.showToast({title:e.data.msg,icon:"fail",duration:2e3}),requestfailed=!1):(t.setState({requestfailed:!0}),_index2.default.showToast({title:e.data.msg,icon:"fail",duration:2e3}),requestfailed=!1,t.setState({isfind:!0,infine:e.data.msg}))},fail:function(e){t.setState({openfailed:!0})}})}},{key:"requestOpenStatus",value:function(){var o=this;_index2.default.request({url:_index3.BASE_URL+"device/requestopenstatus",data:{orderid:orderid},header:{"content-type":"application/json",token:_index3.globalData.token},method:"POST",success:function(e){if(200==e.data.code){o.setState({requestfailed:!1}),requestfailed=!1;var t=e.data.data.orderstatus;e.data.data.doorstatus;"5"==t||"3"==t||"7"==t||"8"==t||"9"==t?_index2.default.redirectTo({url:"/pages/orders/orderdetail/orderdetail?orderid="+orderid+"&whereis=all"}):_index2.default.redirectTo({url:"../../index/index"})}else o.setState({openfailed:!0})},fail:function(e){o.setState({openfailed:!0})}})}},{key:"onClosePos",value:function(){_index2.default.redirectTo({url:"/pages/service/service"})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};arguments[2];return Object.assign(this.__state,{}),this.__state}}]),a}(),_class.properties={},_class.$$events=["tryagain","onClosePos"],_temp2);exports.default=Open,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Open,!0));