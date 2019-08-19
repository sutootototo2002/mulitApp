var count = 0;

import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../config/index.js'; 

import {login,getUserDetail,toFixedFn} from '../../utils/util.js';

import './recharge.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


interface IState {
  mhhImg: string,
  avatar: string,
  arrow:string,
  fee:number,
  navList:Array<object>,
  curNav:string,
  curIndex:number,
  realmoney:number,
  ispayvalue:boolean,
  payvalue:Object,
  del:string,
  answer:string,
  curPage:number,
  logs:Array<object>,
  total:number,
  hasnext:boolean,
  wishes:Array<object>,
  successboolean:boolean,
  logList:Array<object>,
  mm:string,
  tempavatar:string,
  isMM:boolean,
  markBoolean:boolean,
  Loadingtime:Number,
  count:Number,
}
class Recharge extends Component<{}, IState>{
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
   config = {
     navigationBarTitleText:'我的储值'
   }
  
   constructor (props: {} | undefined) {
    super(props)
    this.state = {
      mhhImg:PATH+'xydImg.png',
      avatar:'',
      tempavatar:PATH +'tempavator.png',
      arrow:PATH+'arrow1.png',
      del: PATH + 'gban.png',
      answer:PATH+'bzzx.png',
      mm: PATH + 'mm.png',
      isMM:false,
      fee:0,
      curNav:'',
      curIndex:0,
      realmoney:0,
      wishes:[],
      navList:[],
      ispayvalue:false,
      payvalue:{},
      curPage:1,
      logs:[],
      total:0,
      hasnext:true,
      successboolean:false,
      logList:[],
      markBoolean: false,
      Loadingtime:0,
      count:0,
      iscz:true
    }
  }

  componentWillMount(){
    console.log('---onload-rechange---')
    console.log(this.$router.params)
    this.setState({
       avatar:this.$router.params.avatar,
       fee:this.$router.params.fee
    })

    this.getUserDetail();
   
    this.onloadData();
    

  }
  componentDidMount () {
    // console.log('-------onshow-----')
    
    

  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  //关闭
  onClose(){
    console.log('关闭弹出')
    this.setState({
      ispayvalue:false,
      markBoolean:false
    });
  }
  onClose1(){
    console.log('关闭弹出')
    this.setState({
      successboolean:false,
      markBoolean:false,
    });
  }
  onCloseSuccess(){
    var that = this;
    console.log('关闭成功')
    
   
     var time = setInterval(function(){
        console.log("count:")
        console.log(that.state.count++)
        Taro.showLoading({
          title: '',
        })
        if(that.state.count>=5){
          clearInterval(time);
          console.log('出来出来')
          Taro.hideLoading();
          that.getUserDetail();
          if(Number(that.state.fee/100)>=100){
            console.log('大于100');
            that.onScreen();
            that.setState({
                successboolean:false,
                markBoolean:false,
                
              });
         }else{
           that.gohome();
         }
        }
     },1000)
  }
  //获取列表
  onloadData(){
    Taro.showLoading({
      title: '',
    })
    var that = this;
    Taro.request({
      url: BASE_URL + 'recharge/activity',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    }).then((res)=>{
      Taro.hideLoading();
      console.log('getuser:')
      console.log(res.data.data)
        that.setState({
          navList: res.data.data,
          curNav:res.data.data[0].activityid,
          curIndex:0,
          realmoney:parseFloat(res.data.data[0].fee) + parseFloat(res.data.data[0].giftfee)
        });
        
        this.getLogs();
       
        
       
    })
    
  }
 
  getUserDetail() {
    var that = this;
    Taro.request({
      url: BASE_URL + 'user/detail',
      data: {
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: (res)=> {
        console.log('获取用户信息：')
        console.log(res);
        let ismm:boolean = false;
        if(res.data.data.isscorepay=="1"){
            ismm = true;
        }else{
            ismm = false;
          
        }
        var fee = res.data.data.fee;
        
        that.setState({
          fee: fee,
          isMM:ismm
        });

       
      },
      fail:(res)=>{
        Taro.showToast({
          title: '请检查网络',
          icon: 'fail',
          duration: 1000
        })
      }
    })

  }

  

  getLogs() {
    var that = this;
    var page = this.state.curPage;
    this.setState({
      curPage: page
    })
    Taro.request({
      url: BASE_URL + 'recharge/logs',
      data: {
        page: page
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      }
      
      // complete: function (e) {
      //   wx.hideLoading();
      // }
    }).then((res)=>{
        console.log("logs是什么鬼");
        console.log(res.data.data.data);
        that.setState({
          logList: res.data.data.data,
          total: res.data.total,
          hasnext: res.data.hasnext
        })
        // var page = res.data.data.page;
        // var total = res.data.data.total;
        // var hasnext = res.data.data.hasnext;
        // var logs = res.data.data.data;
        // var listData = that.state.logs;
        // for (var i = 0; i < logs.length; i++) {
        //   listData.push(logs[i]);
        // }
        // that.setState({
        //   logs: listData,
        //   total: total,
        //   hasnext: hasnext
        // })
      
    }).catch((error)=>{
       console.log(error)
    })

  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  onCallback(res){
    console.log('callback数据recharge');
    console.log(res);
    Taro.setStorageSync('usersinfo',res.data);
  }
  onselectNav(event){
    let id = event.currentTarget.dataset.money.activityid;
    let payvalue = event.currentTarget.dataset.money;
    let curIndex = event.currentTarget.dataset.key;
    console.log(event);
    console.log(curIndex);
    this.setState({
      curNav:id,
      curIndex:curIndex,
      ispayvalue:true,
      markBoolean:true,
      payvalue:payvalue
    })
  }
  ongenerateorder(e){
    this.setState({
      iscz:false
    })
    if(!this.state.iscz){
      Taro.showToast({
        title: '操作过于频繁，请稍后再试！',
        icon: 'fail',
        duration: 2000
      })
      return
    }
    

    console.log('点击充值')
    console.log(e)
    var that = this;
    var formid = e.detail.formId;
    //生成订单
    Taro.showLoading({
      title: '',
    });
    Taro.request({
      method: 'POST',
      url: BASE_URL + 'recharge/generateorder',
      data: {
        activityid: this.state.curNav,
        formid: formid
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      }
      
    }).then((res)=>{
        this.setState({
          iscz:true
        })
        console.log("成功")
        console.log(res.data)
        var orderid = res.data.data.orderid;
        that.onPay(orderid);
        
     
    }).catch((error)=>{
      console.log("接口异常")
      console.log(error)
      this.setState({
        iscz:true
      })
    })

  }
  updatePayStatus(status, orderid) {
    Taro.showLoading({
      title: '',
    });
    Taro.request({
      method: 'POST',
      data: {
        'status': status,
        'orderid': orderid
      },

      url: BASE_URL + 'recharge/orderpaystatus',
      header: {
        'Accept': 'application/json',
        'token': globalData.token
      }
      
    }).then((res)=>{
        console.log("updatePayStatus:");
        console.log(res.data);
        Taro.hideLoading();
        // wx.navigateBack();

      
    }).catch((res)=>{
      
    })
  }
  requestOpen(qrurl){
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'device/requestopen',
      data: {
        qrurl: qrurl
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        Taro.hideLoading();
        //检测是否可以开门
        console.log("检测是否可以开门")
        console.log(res)

        if (res.data.code == 200) {
          var machineid = res.data.data.machineid;
          var lockid = res.data.data.lockid;

          Taro.reLaunch({
            url: '../box/open/open?machineid=' + machineid + '&lockid=' + lockid + '&formid='
          })

        }else if(res.data.code == 201){
          Taro.showToast({
            title: '您有未结订单',
            icon: 'fail',
            duration: 2000
          })
        }else{
          console.log('失败！')
          Taro.showToast({
            title: "机柜二维码错误",
            icon: 'fail',
            duration: 2000
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
  onScreen() {
    console.log('扫码开门')
    //未支付订单判断还没有写
    var that = this;
    Taro.showLoading({
      title: '',
    });
    
    Taro.request({
      url: BASE_URL + 'device/checkscan',
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'token':globalData.token
      },
      method: "POST"
    }).then((res)=>{
       console.log("扫码是否成功：")
       console.log(res)
       Taro.hideLoading();
       if(res.data.code==200){
         //扫码二维码
          Taro.scanCode().then((res)=>{
              //扫码二维码结果
              console.log(res)
              console.log(res.result)
              that.requestOpen(res.result);
          }).catch((res)=>{
             console.log(res);
          })
       }
       if(res.data.code==201){ 
          console.log('您有未结订单')
          Taro.showToast({
            title: '您有未结订单',
            icon: 'fail',
            duration: 2000
          })
         
          that.gohome();
          
       }
       if(res.data.code==202){ 
        console.log('您已被加入黑名单')
        Taro.showToast({
          title: '您的帐号异常！',
          icon: 'fail',
          duration: 2000
        })

        that.gohome();
      }
      if(res.data.code==205){ 
        console.log('用户未登录')
        Taro.showToast({
          title: '用户未登录',
          icon: 'fail',
          duration: 2000
        })
        that.gohome();
      }
      if(res.data.code==206){ 
         
        console.log('请开通支付分')
        // Taro.showToast({
        //   title: '请开通支付分',
        //   icon: 'fail',
        //   duration: 2000
        // })
        that.gohome();
          
      }

    })

  }
  
  onPay(orderid){
    //去付款
    console.log('去付款')
    var that = this;

    Taro.request({
      method: 'POST',
      data: {
        'orderid': orderid
      },

      url:BASE_URL + 'pay/getPreRechargeOrder',
      header: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'token':globalData.token
      }
     
    }).then((res)=>{
     
        console.log(res.data);
        Taro.hideLoading();
        if (res.data.code == 200){
          Taro.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
           
          }).then((res)=>{
            
              console.log('success', res);
              globalData.needrefresh = true;
              that.updatePayStatus(1, orderid);
              that.onloadData();
              that.getUserDetail();
              that.setState({
                ispayvalue:false,
                //markBoolean:false,
                successboolean:true
              })
              // Taro.navigateTo({
              //   url: '/pages/recharge/rechargesuccess?fee=' + (parseFloat(that.data.money) + parseFloat(that.data.realmoney)) / 100
              // })
              // Taro.showModal({
              //   title: '提示',
              //   content: '储值成功',
              //   showCancel: false,
              //   success: function (res) {
              //     if (res.confirm) {
              //       globalData.needrefresh = true;
                    
              //       //that.updatePayStatus(1, orderid);
              //       //that.loadData();
              //     }
              //   }
              // });

          }).catch((error)=>{
            console.log(error)
            console.log('fail', res);
            that.updatePayStatus(0, orderid);
          })
        }else{
          Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
        
    })
  }
  gohome(){
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }
  onAnswer(){
    console.log('有疑问请点击这里')
  }
  onMM(){
    //开通免密
    //检查是否需要开通，如果已经开通就关闭
    console.log('开启支付分')
    this.start();

  }

    //开启支付分
  //   gotopayfen(){
  //     console.log('开启支付分')
  //     this.start();
  
  //  }

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

  render () {
   
    const { navList,logList,isMM} = this.state;


   
    const content = navList.map((post,index) => {
      if(isMM){
        return <View className={this.state.curNav == post.activityid?'box1 select':'box1'} data-money={post} data-key={index} data-id={post.activityid}  onTouchStart={this.onselectNav.bind(this)}  >
        <View className='price'>{post.fee/100}元</View>
       
        <View className='prices'>+赠{(Number(post.giftfee)/100).toFixed(2)}元，到账{((Number(post.fee)/100)+(Number(post.giftfee)/100)).toFixed(2)}元</View>
        <Image className='pro' src={this.state.arrow}/>
      </View>
      }else{
        if((Number(post.fee)/100+Number(post.giftfee)/100+Number(price_format(this.state.fee)))>=100){
          console.log(Number(post.fee)/100+Number(post.giftfee)/100+Number(price_format(this.state.fee)))
          return <View className={this.state.curNav == post.activityid?'box1 select':'box1'} data-money={post} data-key={index} data-id={post.activityid}  onTouchStart={this.onselectNav.bind(this)}  >
          <View className='price'>{post.fee/100}元</View>
         
          <View className='prices'>+赠{(Number(post.giftfee)/100).toFixed(2)}元，到账{(Number(post.fee)/100+Number(post.giftfee)/100).toFixed(2)}元</View>
          <Image className='pro' src={this.state.arrow}/>
        </View>
        }
      }
       
     
    })
    const mxList = logList.map((posts)=>{
      let name = ''
       if(posts.logtype == '1'){
        name = '储值'
       }
       if(posts.logtype == '2'){
        name = '消费'
       }
       if(posts.logtype == '3'){
        name = '退款'
       }
       if(posts.logtype == '4'){
        name = '取现'
       }
      return <View className='mxli'>
       <View className='xmname'>{name}</View>
       <View className='xmtime'>{posts.createtime}</View>
       <View className='xmprice'>{posts.fee/100}元</View>
      </View>
    })
    const price_format = data =>{
      var str = data/100;
      var str1 = str.toFixed(2)
      return str1
    }
    return (
        <View>
           <View className='myrecharge'>
              <View className='mhh'>
                <Image className='mhhImages' src={this.state.mhhImg}/>
                <View className='priceDiv'>
                  <View>
                    <View className='price0'>￥</View>
                    <View className='price1'>{price_format(this.state.fee)}</View>
                  </View>
                  <View className='mhhword'>账户余额</View>
                 
                </View>
                <View className='btnword'>请选择充值金额</View>
              </View>
              <Image className='boxOne1' src={globalData.avatar?globalData.avatar:this.state.tempavatar}/>
              
              <View className='main_'>
                {!this.state.isMM?
                <View className='infoD'>*为保证您能够正常购物，购物前储值账户余额应大于100元。</View>
                :
                ''
                }

                {content} 
              </View>
              <View className='mingxi'>
                <View className='mxTitle'>——— 零钱明细 ———</View>
                <View className='mxList'>
                  {mxList}
                </View>
              </View>
              
              {this.state.ispayvalue?
              <View className='payvalue'>
                <Image className='payclose' onTouchStart={this.onClose} src={this.state.del}/>
                <View className='payContent'>
                    <View className='payTitle'>确认充值</View>
                    <Image className='payanswer' onTouchStart={this.onAnswer} src={this.state.answer}/>
                    <View className='disfee'>
                      <View className='pricefh'>￥</View>
                      <View className='price_fee'>{this.state.payvalue.fee/100}</View>
                    </View>
                    <View className='payinfo'>
                      <View className='pinfo1'>充值信息</View>
                      {/* <View className='prices'>+赠{post.fee/100}元，到账{(post.fee+post.giftfee)/100}元</View> */}
                      <View className='pinfo2'>充值{(this.state.payvalue.fee/100).toFixed(2)}元，到账{(Number(this.state.payvalue.fee)/100+Number(this.state.payvalue.giftfee)/100).toFixed(2)}元</View>
                    </View>
                    {this.state.isMM?
                    <View className='ts'>
                      <View className='ts1'>温馨提示：</View>
                      <View className='ts2'>亲！充值有赠送金额，储值账户余额只能消费，无法退款或提取。</View>
                    </View>
                    :
                     <View className='ts'>
                     <View className='ts1'>温馨提示：</View>
                     <View className='ts2'>为保证您能够正常购物，购物前储值账户余额应大于100元，当前账号余额为￥{price_format(this.state.fee)}</View>
                   </View>
                    }
                    
                     {this.state.iscz?
                     <Button type='default' className='Btn btn1' onClick={this.ongenerateorder}>确认充值</Button>
                     :
                     <Button type='default' className='Btn btn1' >确认充值</Button>
                     }
                    
                </View>
              </View>
              :
              <View></View>
              }
              
             {this.state.successboolean?
             <View className='payvalue'>
               <Image className='payclose' onTouchStart={this.onClose1} src={this.state.del}/>
               <View className='payContent'>
                  <View className='payTitle'>充值成功</View>
                  {/* <View className='payTitle1'>恭喜小主，您的当前账户余额：{price_format(this.state.fee)}元</View> */}
                  <View>
                    <CoverImage className='mmImg' src={this.state.mm} />
                    <CoverView className='mmText'>无需输入支付密码，快速购物！</CoverView>
                  </View>
                  <Button type='default' className='Btn btn1' onClick={this.onCloseSuccess}>去购物</Button>
                </View>
                  
             
             </View>
             :
             <View></View>
             } 

          {this.state.markBoolean ?
          <View className='mark'></View>
          :
          <View></View>}

           </View>
        <View className='footer' >
        <Button className='btn-max-w' style='font-size: 12px;width: 80%;' plain type='primary' onClick={this.gohome}>返回首页</Button>
        </View>
        </View>

    )
  }
}
