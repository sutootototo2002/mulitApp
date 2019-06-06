var intervalPapay;
var intervalOrderStatus;
var requestfailed;
var orderid = '';

import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text,Navigator, Form } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../../config/index.js'; 

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
    requestfailed:boolean
    loadImg:string,
    loadImg1:string,
    pay:boolean,
    qrurl:string,
    haslogin:boolean,
    showlogin:boolean,
    showpapay:boolean,
    showopen:boolean,
    papayPressed:boolean,
    showModalStatus:boolean,
    islogin:boolean,
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
    navigationBarTitleText:'打开柜子'
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
        haslogin:false,
        showlogin:false,
        showpapay:false,
        showopen:false,
        papayPressed:false,
        showModalStatus:false,
        unpayorder:[],
        loadImg:PATH+'/mImages/openouter.png',
        loadImg1:PATH+'/mImages/smks-wzc.png',
        islogin:false,

    }
}

  componentWillMount(){
    console.log('---onLoad---')
    console.log(this.$router.params)
    this.setState({
        formid:this.$router.params.formid,
        lockid:this.$router.params.lockid,
        machineid:this.$router.params.machineid
    })
    var that = this;
    Taro.showLoading({
      title: '',
    });
    var qrurl = decodeURIComponent(this.$router.params.q);
    //var qrurl = 'https://t.wemall.com.cn/clientapi?id=XX2121901170001&lockid=1-1-1';
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
              try {
                Taro.removeStorageSync('token');
              } catch (e) {
                // Do something when catch error
              }
              //that.showLoginModal();
              that.setState({
                islogin:true, //已登录
                openfailed:true //点击开门
              })

            }
          }
        })
    }).catch((error)=>{
        Taro.hideLoading();
        console.log('*********不存在token***********')
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
            openfailed:false
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
            'token': globalData.token11
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
                that.setState({
                  islogin:true, //已登录
                  openfailed:true //点击开门
                })
              } else {
                //that.showLoginModal();
                that.setState({
                  islogin:false, //未登录
                  openfailed:false //隐藏
                })
               
              }

            } else {
              //that.showLoginModal();
              that.setState({
                islogin:true,
                openfailed:true
              })
            }

          }
        })
      },
      fail: function (e) {
        //that.showLoginModal();
        that.setState({
          islogin:true,
          openfailed:true
        })
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
          //
          var isnopasspay = res.data.data.isnopasspay;
          var havearrears = res.data.data.havearrears;
          if (havearrears == "1") {
            that.getUnpayOrder();
            that.setState({
              // showlogin: false,
              // showpapay: false,
              // showopen: false,
              pay:true
            });
          }
            if (isnopasspay == "1") {
              console.log('---已开通免密open---')
              that.setState({
                pay:false,
                // showlogin: false,
                // showpapay: false,
                // showopen: true
              });
            } else {
              that.setState({
                pay:true
              });
            }
          

          that.getShoppingOrder();
        } else {
          console.log('*********用户不存在***********1');
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
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/open',
      data: {
        machineid: machineid,
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
        that.requestOpenStatus();
      }
    }.bind(this), 60000);
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
          openfailed: true
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
        } else {
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

  gotoHome(){

  }
  render () {
    return (
        <View>
          {this.state.islogin?
          <View>
            <Image className='loadImg' src={this.state.loadImg1}/>
              <Form>
                <Button type="default" open-type="getPhoneNumber" onGetPhoneNumber={this.getPhoneNumber.bind(this) className='Btn btnopen'> 去注册 </Button>
              </Form>
          </View>
          :
          ""
          }
          
          {!this.state.openfailed?
          <View>
              <Image className='loadImg' src={this.state.loadImg}/>
              <View className='openlock'>开锁中，听到开锁声便可取货购物</View>
              {this.state.pay?
               <Form >
                  <Button type="default" onClick={this.gotoPapay} className='Btn btnopen'> 开启微信免密支付 </Button>
               </Form>
              :
              <Form onSubmit={this.submitInfo} report-submit='true' >
              <Button type="default" form-type="submit" className='Btn btnopen'> 点击开门 </Button>
              </Form>
              }
              
          
          </View>
          :
          <View>
            <Image className='loadImg' src={this.state.loadImg1}/>
          <View className='fail'>开柜失败</View>
          <Form onSubmit={this.submitInfo} report-submit='true' >
          <Button type="default" form-type="submit" className='Btn btnopen'> 请重试 </Button>
          </Form>
          <View className='bottominfo'>取出商品后请手动关门结算</View>
          <Navigator className='navigator' url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover" >反馈异常</Navigator>
          </View>
        
          }

        </View>
    )
  }
}


