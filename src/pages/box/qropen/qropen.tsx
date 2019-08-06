var intervalPapay;
var intervalOrderStatus;
var requestfailed;
var orderid = '';

import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text,Navigator, Form } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser,sysTitle} from '../../../config/index.js'; 

import {login} from '../../../utils/util.js';

import './qropen.scss'

interface IState {
    formid:string,
    lockid:string,
    machineid:string,
    orderid:string,
    openfailed:boolean,
    num:number,
    tag:number,
    unpayorderimg:string,
    requestfailed:boolean
    loadImg:string,
    loadImg1:string,
    loadImg2:string,
    pay:boolean,
    qrurl:string,
    haslogin:boolean,
    showlogin:boolean,
    showpapay:boolean,
    showopen:boolean,
    papayPressed:boolean,
    showModalStatus:boolean,
    islogin:boolean,
    open:boolean,
    isReason:boolean,
    dw:string,
    unpayImg:string,
    unpriceImg:string,
    markBoolean: boolean,
    unpay:boolean,
    unpayorder:Array<object>
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && poprocess.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Qropen extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText:''
  }
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
        formid:'',
        lockid:'',
        machineid:'',
        orderid:'',
        openfailed:false,
        requestfailed:true,
        pay:false,
        num:0,
        tag:100,
        qrurl:'',
        dw: PATH + 'dw.png',
        isReason:false,
        haslogin:false,
        showlogin:false,
        showpapay:false,
        showopen:false,
        papayPressed:false,
        showModalStatus:false,
        unpayorder:[],
        loadImg:PATH+'openouter.png',
        loadImg1:PATH+'smks-wzc.png',
        loadImg2:PATH+'car.png',
        unpayImg: PATH + 'wfk-11.png',
        unpriceImg: PATH + 'wfk.png',
        unpayorderimg: PATH + 'unpay_info.png',
        islogin:false,
        markBoolean:false,
        open:false,
        unpay:false

    }
}

  componentWillMount(){
    console.log('---onLoad---')
    Taro.setNavigationBarTitle({
      title:globalData.sysTitle
    })
    console.log(this.$router.params)
    this.setState({
        formid:this.$router.params.formid,
        lockid:this.$router.params.lockid,
        machineid:this.$router.params.machineid//"21e0211a094065ae25490fd4590aa7d1"||this.$router.params.machineid
    })
    var that = this;
    Taro.showLoading({
      title: '',
    });
    var qrurl = decodeURIComponent(this.$router.params.q);
    //var qrurl = 'https://testo.wemall.com.cn/clientapi?id=QT3111804100002&lockid=1-1-1';
    that.setState({
      qrurl: qrurl
    });
    Taro.getStorage({
      key: 'token'
    }).then((res)=>{
        var token = res.data;
        Taro.request({
          url: BASE_URL + 'token/verifyToken',
          data: {
            'token': token
          },
          header: {
            'content-type': 'application/json',
            'token': token
          },
          success: function (res) {
            console.log(res);
            if (res.data.code == 200) {
              console.log('*********token 有效***********'); 
              globalData.token = token;
              globalData.haslogin = true;
              that.getUserDetail();
            } else {
              Taro.hideLoading();
              console.log('*********token 过期***********1');
                // Do something when catch error
                Taro.removeStorageSync('token');
                that.checkUser();
              
             

            }
          }
        })
    }).catch((error)=>{
        Taro.hideLoading();
        console.log('*********不存在token***********')
        console.log('----checkUser----')
        that.checkUser();
    })
    
  }
  componentDidMount () {}

  componentDidShow () {
    console.log("---onShow----")
    var that = this;
    setTimeout(()=>{
      that.getUserDetail();
    },2000)
    

  }

  componentDidHide () {}

  componentDidCatchError () {}

   //setp1 点击获取手机号码授权
   getPhoneNumber(e){
    console.log(e.detail.errMsg)
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      var that = this;
      Taro.login().then((res)=>{
         console.log(res)
         var code = res.code;  //获取code
         console.log('开始登录:' + code);
         function succeeded(res) {
          Taro.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 500
          })
          that.setState({
            islogin:false,
            pay:true
            
          })
          
          
         
          // that.gotoPapay();
        };
        function failed(res) {
          Taro.showToast({
            title: '登陆失败,请再按一下',
            icon: 'fail',
            duration: 500
          })
        };
         login(code, e.detail.encryptedData, e.detail.iv, succeeded, failed);

      }).catch((error)=>{
         console.log(error);
      })
    }

  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  showLoginModal(){
    this.setState({
      showlogin:true,
      showpapay:false
    })
  }
  checkUser() {
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.login({
      success: function (res) {
        var code = res.code;  //获取code
        console.log('START LOGIN:' + code);
        Taro.request({
          url: BASE_URL + 'token/checkUser',
          data: {
            "code": code
          },
          header: {
            'content-type': 'application/json',
            'token': globalData.token
          },
          method: 'GET',
          success: function (res) {
            Taro.hideLoading();
            console.log(res.data);
            if (res.data.code == 200) {
              if (res.data.data != "") {
                console.log('服务器登录成功');
                Taro.setStorage({
                  key: "token",
                  data: res.data.data
                });
                globalData.token = res.data.data;
                globalData.haslogin = true;
                that.getUserDetail();
               
              } else {
                //that.showLoginModal();
                
               
              }

            } else {
              //that.showLoginModal();
             
            }

          }
        })
      },
      fail: function (e) {
        //that.showLoginModal();
       
      }
    })
  }
  getUserDetail() {
    Taro.showLoading({
      title: '',
    })
    var that = this;
    Taro.request({
      url: BASE_URL + 'user/detail',
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log('用户信息：')
        console.log(res);
        Taro.hideLoading();
        if (res.data.code == 200) {
          //已经注册过
          globalData.haslogin = true;
          that.setState({
            islogin:false
          })
          //
          var isscorepay = res.data.data.isscorepay;
          var havearrears = res.data.data.havearrears;
          if (havearrears == "1") {
            that.getUnpayOrder();
            
          }
            if (isscorepay == "1") {
              console.log('---已开通免密open---')
              that.setState({
                islogin:false,
                pay:false,
                open:true
               
              });
            } else {
              console.log('---未开通免密open---')
              that.setState({
                pay:true
              });
            }
          

          that.getShoppingOrder();
        } else {
          console.log('*********用户不存在***********1');
          that.setState({
            islogin:true
          })
          try {
            Taro.removeStorageSync('token');
          } catch (e) {
            // Do something when catch error
          }
          globalData.haslogin = false;
          
        }
      }
    })
  }
  getShoppingOrder() {
    var that = this;
    Taro.request({
      url: BASE_URL + 'order/shoppingorder',
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log('---getShoppingOrder---');
        console.log(res);
        if (res.data.code == 200) {
          var result = res.data.data;
          var orderid = result.orderid;
          var machineid = result.machineid;
          var orderno = result.orderno;
          if (result.recogmode == 3) {//重力柜

            Taro.setStorage({
              key: "orderid",
              data: orderid
            });
            Taro.redirectTo({
              url: '/pages/index/shopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno + '&from=index'
            })
          } else {
            Taro.setStorage({
              key: "orderid",
              data: orderid
            });
            Taro.redirectTo({
              url: '/pages/index/cgshopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno
            })
          }
        } else {

        }

      }
    })
  }
  getUnpayOrder() {
    var that = this;
    Taro.request({
      url:BASE_URL + 'order/unpayorder',
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setState({
            unpay:true,
            markBoolean:true,
            unpayorder: res.data.data
          });
          //that.unpayorderLayer('open');
        } else {
          Taro.showToast({
            title: '获取未支付订单失败',
          })
        }

      }
    })
  }

  unpayorderLayer(currentStatu) {
    //关闭  
    if (currentStatu == "close") {
      this.setState(
        {
          showModalStatus: false
        }
      );
    }

    // 显示  
    if (currentStatu == "open") {
      this.setState(
        {
          showModalStatus: true
        }
      );
    }
  }

  deviceOpen(machineid, lockid) {
    console.log('machined:'+this.state.machineid+"lockid:"+lockid+'formid:'+this.state.formid)
    Taro.showLoading({
      title: '',
    })
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/open',
      data: {
        machineid: machineid,//machineid || "21e0211a094065ae25490fd4590aa7d1",
        lockid: lockid,
        formid: that.state.formid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        Taro.hideLoading();
        var code = res.data.code;
        if (code == 200) {
          var orderid = res.data.data.orderid;
          var orderno = res.data.data.orderno;
          var recogmode = res.data.data.recogmode;
          that.setState({
            orderid: orderid
          });
          
          if (recogmode == 3) {//重力柜
            Taro.setStorageSync("orderid", orderid);

            // wx.setStorage({
            //   key: "orderid",
            //   data: orderid
            // });
            Taro.redirectTo({
              url: '../../index/shopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno + '&from=open'
            })
          } else {
            Taro.setStorageSync("orderid", orderid);
            // wx.setStorage({
            //   key: "orderid",
            //   data: orderid
            // });
            Taro.redirectTo({
              url: '../../index/cgshopping/index?orderid=' + orderid + '&machineid=' + machineid + '&orderno=' + orderno
            })
          }
        } else if(res.data.code == 235){
          console.log('235')
          that.setState({
            requestfailed: true,
            markBoolean:true,
            isReason:true
          });
          requestfailed = false
          
        } else {
          that.setState({
            openfailed: false,
            islogin:false
          });
          Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                Taro.reLaunch({
                  url: '../../index/index'
                })
              }
            }
          })
        }

      },
      fail: function (e) {
        Taro.showModal({
          title: '提示',
          content: '请求失败，请稍后再试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              Taro.reLaunch({
                url: '../../index/index'
              })
            }
          }
        })
      }
    })
  }
  tryagain(){
      Taro.redirectTo({
        url: '/pages/index/index'
      })
  }
  open() {
    var that = this;
    var iNow = 0;
    
    var interval = setInterval(function () {
      
      var newtag = iNow ++;
      that.setState({
        tag: newtag,
      });

      //循环执行代码 
      if (requestfailed) {
        console.log('---循环执行代码 ---');
        that.openStatus();
      } else {
        that.setState({
          tag: 100,
        });
        console.log('---停止循环执行代码 ---');
        clearInterval(interval)
      }

    }, 1000); //循环时间1秒 
    setTimeout(function () {
      if (requestfailed) {
        clearInterval(interval);
        //that.requestOpenStatus();
      }
    }.bind(this), 1000);
  }
  openStatus() {
    var that = this;
    orderid = Taro.getStorageSync("orderid");
    console.log("orderid:")
    console.log(orderid)
    Taro.request({
      url: BASE_URL + 'device/openstatus',
      data: {
        orderid: orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 200) {
          that.setState({
            requestfailed: false
          });
          requestfailed = false
          Taro.setStorageSync("orderid", that.state.orderid);
          // wx.setStorage({
          //   key: "orderid",
          //   data: that.data.orderid
          // });
          Taro.reLaunch({
            url: '../../index/index'
          })
        } else if (res.data.code == 211) {
          that.setState({
            requestfailed: false
          });
          requestfailed = false
          Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                Taro.navigateBack({

                })
              }
            }
          })
        } else {
          that.setState({
            requestfailed: true
          });
        }
      },
      fail: function (e) {
        that.setState({
          openfailed: false
        });
      }
    })
  }
  requestOpenStatus() {//主动请求机柜状态
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/requestopenstatus',
      data: {
        orderid: that.state.orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token':globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 200) {
          that.setState({
            requestfailed: false
          });
          var orderstatus = res.data.data.orderstatus;
          var doorstatus = res.data.data.doorstatus;

          Taro.setStorageSync("orderid", that.state.orderid);
          // wx.setStorage({
          //   key: "orderid",
          //   data: orderid
          // });
          Taro.redirectTo({
            url: '../../index/index'
          })
        } else {
          that.setState({
            openfailed: true
          });
        }
      },
      fail: function (e) {
        that.setState({
          openfailed: true
        });
      }
    })
  }
  submitInfo(e){
      console.log('submitInfo')
      this.requestopen();
      var formid = e.detail.formId;
      Taro.setStorageSync("formId", e.detail.formId);
      
      console.log(e);
      var that = this;
      that.setState({
        formid: formid
      });

  }
  requestopen(){
    //检测开门
    const formid_ = Taro.getStorageSync('formid');
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/requestopen',
      data: {
        qrurl: that.state.qrurl
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        Taro.hideLoading();
        //检测是否可以开门
        if (res.data.code == 200) {
          var machineid = res.data.data.machineid;
          var lockid = res.data.data.lockid;
          that.setState({
            machineid: machineid,
            lockid: lockid,
            showopen: true
          });
          Taro.hideLoading();
          Taro.reLaunch({
            url: '../open/open?machineid=' + machineid + '&lockid=' + lockid + '&formid=' + formid_.formid
          })
        } else if (res.data.code == 401) {
            Taro.hideLoading();
            Taro.reLaunch({
            url: '../../index/index'
          })
        }else if(res.data.code == 201){
          Taro.showToast({
            title: '您有未结订单',
            icon: 'fail',
            duration: 2000
          })
        }else {
            Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                Taro.reLaunch({
                  url: '../../index/index'
                })
              }
            }
          })
        }

      },
      fail: function (e) {
        Taro.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }
  payOrder(){
    var orderid = Taro.getStorageSync("orderid");
    //var orderid = this.data.unpayorder.orderid;
    this.setState({
      orderid: orderid
    });
    this.requestPay(orderid);

  }
    //发起支付
    requestPay(orderid){
      var that = this;
      Taro.showLoading({
        title: '',
      })
      Taro.request({
        method: 'POST',
        data: {
          'orderid': orderid
        },
  
        url: BASE_URL + 'pay/getPreGoodsOrder',
        header: {
          'Accept': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
          'token': globalData.token
        },
        success: function (res) {
          Taro.hideLoading();
          if (res.data.code == 200) {
            Taro.requestPayment({
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': res.data.data.signType,
              'paySign': res.data.data.paySign,
              'success': function (res) {
                console.log('success', res);
                // wx.showModal({
                //   title: '提示',
                //   content: '支付成功',
                //   showCancel: false,
                //   success: function (res) {
                //     if (res.confirm) {
                //       that.queryPayStatus(orderid);
                //     }
                //   }
                // });
                that.queryPayStatus(orderid);
              },
              'fail': function (res) {
                console.log('fail', res);
                //edit at 0606
                Taro.showModal({
                  title: '提示',
                  content: '支付失败，请重新支付',
                  showCancel: false,
                  success: function (res) {
                    // if (res.confirm) {
                    //   that.updatePayStatus(0, orderid);
                    //   that.getUnpayOrder();
                    // }
                  }
                })
              }
            })
          } else {
            Taro.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
          }
  
  
        }
      })
    }
    //支付接口
    queryPayStatus(orderid) {
      var that = this;
      Taro.showLoading({
        title: '等待支付结果...',
      });
      //查询订单状态
      intervalOrderStatus = setInterval(function () {
        Taro.request({
          method: 'POST',
          data: {
            'orderid': orderid
          },
  
          url: BASE_URL + 'order/paystatus',
          header: {
            'Accept': 'application/json',
            'token': globalData.token
          },
          success: function (res) {
            console.log(res.data.data);
            if (res.data.data.orderstatus == 5) {
              console.log('----payed---');
              clearInterval(intervalOrderStatus)
              Taro.hideLoading();
              that.setState({
                unpay:false,
                markBoolean:false,
              });
              that.getUserDetail();
            } else {
  
            }
          }
        })
  
      }, 2000); //循环时间2秒
    }
  gotoPapay(){
    var that = this;
    that.setState({
      papayPressed: true
    })
    Taro.request({
      method: 'POST',
      url: BASE_URL + 'pay/getPapayExtraData',
      data: {

      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log('免密返回参数');
        console.log(res.data);
        Taro.navigateToMiniProgram({
          appId: 'wxbd687630cd02ce1d',
          path: 'pages/index/index',
          extraData: {
            appid: res.data.appid,
            contract_code: res.data.contract_code,
            contract_display_account: res.data.contract_display_account,
            mch_id: res.data.mch_id,
            notify_url: res.data.notify_url,
            plan_id: res.data.plan_id,
            request_serial: res.data.request_serial,
            timestamp: res.data.timestamp,
            sign: res.data.sign
          }
        
        }).then((res)=>{
            console.log(res);
            that.setState({
              pay:false
            });
            that.getUserDetail();
            

        }).catch((error)=>{
            console.log(error);
        })
      },
      fail: function (res) {
        console.log(res);
        Taro.hideLoading();
      }
    })
  }

  gotopayfen(){
    console.log('开启支付分')
    this.start();

 }

 start(){
  Taro.request({
    url: BASE_URL+'user/startOpenSmartPay',
    data: '',
    method: 'GET',
    dataType: 'json',
    success: function(res) {
      console.log(res);
      let extraData= {
        mch_id: res.data.data.mch_id,
        service_id: res.data.data.service_id,
        out_request_no: res.data.data.out_request_no,
        timestamp: res.data.data.timestamp,
        nonce_str: res.data.data.nonce_str,
        sign_type: res.data.data.sign_type,
        sign: res.data.data.sign,

      }
      console.log(extraData);
      wx.openBusinessView({
        businessType: 'wxpayScoreEnable',
        extraData: extraData,
        envVersion: 'release'
      })
    },
  })
  
}
onconcel(){
  Taro.redirectTo({
    url: '/pages/index/index'
  })
}

  gotoHome(){

  }
  render () {
    return (
      <View>
        {this.state.islogin?
        <View>
          <Image className='loadImg' src={this.state.loadImg1}/>
          <View className='infoZm'>小主,还没有注册没办法购物哦!</View>
          <Form>
            <Button open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber.bind(this)} className='Btn btnopen'>注册</Button>
          </Form>
        </View>
        :
        ''
        }
        {this.state.pay?
          <View>
             <Image className='loadImg' src={this.state.loadImg}/>
             {/* <View className='infoZm'>扫码即可支付哦！</View> */}
            <Form >
            <Button type="default" onClick={this.gotopayfen} className='Btn btnopen'> 开通支付分 </Button>
            </Form>
          </View>
          :
          ''
        }
        {this.state.open?
         <View>
           <Image className='loadImg' src={this.state.loadImg2}/>
           <View className='infoZm11'>Waaaaaaaaa!</View>
           <View className='infoZm22'>热门商品等着您</View>
           <Form onSubmit={this.submitInfo} report-submit='true' >
             <Button type="default" form-type="submit" className='Btn btnopen opens'> 点击开门 </Button>
           </Form>
         </View>
         :
         ''
        }

          {/* 遮罩层 */}
          {this.state.markBoolean ?
          <View className='mark'></View>
          :
          <View></View>}

         {/*未付订单*/}
         {this.state.unpay ?
          <View className='unpayOrder'>

            <CoverImage src={this.state.unpayImg} />
            <CoverImage className='unprice' src={this.state.unpriceImg} />
            <CoverView className='textOne'>本次</CoverView>
            <CoverView className='textTwo'>应付款(元)</CoverView>
            <CoverView className='textPrice'>{(this.state.unpayorder.payfee/100).toFixed(2)}</CoverView>
            <CoverView className='textshi'>Wa!  这里有未付订单！</CoverView>
            <CoverView className='unpayList'>
              <CoverView className='orderList'>
                <CoverView className='orderInfo'>
                  <CoverView className='goodstate'>订单号：[{this.state.unpayorder.orderno}等...]</CoverView>
                  <CoverView className='time'>{this.state.unpayorder.createtime}</CoverView>
                </CoverView>
                <CoverImage className='goodsImg' src={this.state.unpayorder.goods[0].picurl} />
                <CoverView className='goodsInfos'>
                  <CoverView>
                    {/* <CoverImage className='del' src={this.state.del} /> */}
                    <CoverView className='total'>共{this.state.unpayorder.goodsnum}件商品</CoverView>
                  </CoverView>
                  <CoverView className='goodsInfoDetail'>
                    {this.state.unpayorder.goods[0].goodsname}等... {this.state.unpayorder.goods[0].location}
                   </CoverView>
                </CoverView>
              </CoverView>
              {/* <Button className='BtnOne' type='default' onClick={this.payOrder}>支付</Button> */}
              
               {this.state.unpayorder.score == 0?
                <Button className='BtnOne' type='default' onClick={this.payOrder}>支付</Button>
                :
                <CoverView>
                  <CoverView className='paynewDiv'>请到您的微信>钱包>支付分中支付</CoverView>
                  <CoverView className='tsDiv'>
                    <CoverImage className='unpayImg' src={this.state.unpayorderimg} />
                    <CoverView className='unpayDiv'>长时间不支付将影响您的信用</CoverView>
                  </CoverView>
                </CoverView>
              }               
            </CoverView>

          </View>
          :
          <View></View>}

         {this.state.isReason?
          <CoverView className='boxReason'>
           <CoverImage className='posImg111' src={this.state.dw} />
           <CoverView className='word11'>订单创建失败，可能原因如下：</CoverView>
           <CoverView className='word22'>
           <CoverView className='word'>
           1、您有未支付的支付分订单，请在“我->支付->钱包->支付分”中查看并完成支付。
          
             </CoverView>
             <CoverView className='word'>
            2、微信支付分基于风控因素，导致订单创建失败。
             </CoverView>
           </CoverView>
           {/* <CoverView className='word33'>您可以选择储值方式来进行购物消费</CoverView> */}
           <CoverView style='margin-top:50px;text-align:center'>
           <CoverView className='btnOpen12' onClick={this.onconcel}>确定</CoverView>
          </CoverView>
          </CoverView>
          :
          <CoverView></CoverView>}    


        
      </View>
    )
  }
}


