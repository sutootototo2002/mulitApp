var curPage = 0;
var curStatus = 8;
var cardid = '';
import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text,Swiper, SwiperItem} from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../config/index.js'; 

import {login,getUserDetail} from '../../utils/util.js';

import './index.scss'
import { userInfo } from 'os';

interface IState {
  mhhImg:string,
  iconImg1:string,
  iconImg2:string,
  tytb33:string,
  perbox:string,
  avator:string,
  iconB1:string,
  iconB2:string,
  iconB21:string,
  iconB3:string,
  iconB4:string,
  iconC1:string,
  iconC2:string,
  iconC3:string,
  iconC4:string,
  wishes:Array<object>,
  SwiperItemArry:Array<object>,
  userInfoList:object,
  isuserInfo:boolean,
  goodsList:Array<object>,
  total:number
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Index extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText:'个人中心'
  }
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
      mhhImg:PATH+'/mImages/xydImg.png',
      iconImg1:PATH+'/mImages/homeTo.png',
      iconImg2:PATH+'/mImages/serverNew.png',
      tytb33:PATH+'/mImages/tytb-41.png',
      perbox:PATH+'/mImages/perbox.png',
      avator:PATH+'/mImages/tempavator.png',
      iconB1:PATH+'/mImages/wddd-new1-50.png',
      iconB2:PATH+'/mImages/wddd-new3-50.png',
      iconB21:PATH+'/mImages/wddd-new3-51.png',
      iconB3:PATH+'/mImages/wddd-new2-50.png',
      iconB4:PATH+'/mImages/wddd-55.png',
      iconC1:PATH+'/mImages/zhsz.png',
      iconC2:PATH+'/mImages/bzzx.png',
      iconC3:PATH+'/mImages/yjfk.png',
      iconC4:PATH+'/mImages/wdkf.png',
      userInfoList:{},
      wishes:[],
      isuserInfo:true,
      goodsList:[],
      SwiperItemArry:[{item:'1',url:PATH+'/mImages/swper1.png'},{item:'2',url:PATH+'/mImages/swper2.png'}],
      total:0,
    }
}

 
  componentWillMount(){
    // Taro.showLoading({
    //   title: '',
    // })
    this.getUserDetail();
    this.getWishList();
    this.getOrders();
    cardid = this.$router.params.cardid?this.$router.params.cardid:''
    console.log('componentDidMount')
  }

  componentDidShow () {
    console.log('componentDidShow')
    //返回时候刷新
    this.getUserDetail();
    this.getWishList();
    this.getOrders();

  }

  componentWillUpdate(){
    console.log('componentWillUpdate')
    console.log('---------sususu----------')
  }

  componentDidHide () {
    console.log('componentDidHide')
  }

  componentDidCatchError () {
    console.log('componentDidCatchError')
  }

  getOrders() {
    var that = this;
    var page = 0;
    page = curPage + 1;
    // this.setState({
    //   curPage: page
    // })
    //curPage = page;

    Taro.showLoading({
      title: '',
    })
    Taro.request({
      url: BASE_URL + 'order/orderlist',
      data: {
        page: page,
        rows: 10,
        status: curStatus,
        cardid: cardid
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: function (res) {
        Taro.hideLoading();
        console.log('订单数据列表：')
        console.log(res.data.data.data)
        console.log(res.data.data.total)
        that.setState({
            total:res.data.data.total,
            goodsList:res.data.data.data
        })
        //var hasnext = res.data.data.hasnext;
      }
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
      success: function (res) {
        //var fee = res.data.data.fee;
        console.log("查看用户信息：1111")
        console.log(res)
        var avatar = true ;
        if(res.data.data.avatar!==null){
          globalData.fee = res.data.data.fee;
          globalData.nickName = res.data.data.nickname;
          that.setState({
            userInfoList:res.data.data,
            isuserInfo:false
          });
        }else{
          that.setState({
            userInfoList:res.data.data,
            isuserInfo:true
          });
        }
        
       
      }
    })
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  getWishList() {
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'wishlist/myWishList',
      data: {
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: function (res) {
        
        Taro.hideLoading();
        that.setState({
          wishes: res.data.rows,
        })
      },
      fail: function (e) {
        Taro.hideLoading();
      }
    })
  }
  gobingcart(){
    console.log('绑定亲情卡')
    
    Taro.navigateTo({
      url: '../card/bindcard'
    })
  }
  goheart(){
    
    console.log('进入心愿单中心');
    Taro.navigateTo({
      url: '../wish/likes/myheart'
    })
  }
  toOrders(){
    Taro.navigateTo({
      url: '../orders/orderlist/orderlist?state=8&value=0'
    })
  }
  toOrders1(){
    Taro.navigateTo({
      url: '../orders/orderlist/orderlist?state=8&value=0'
    })
  }
  toOrders2(){
    Taro.navigateTo({
      url: '../orders/orderlist/orderlist?state=7&value=1'
    })
  }
  toOrders3(){
    Taro.navigateTo({
      url: '../orders/orderlist/orderlist?state=0&value=2'
    })
  }
  userInfoHandler(res){
    var that = this;
    console.log(res.detail.userInfo);
    if (res.detail.userInfo == null){
      return;
    }
    this.setState({
      isuserInfo:false
    })
    Taro.showLoading({
      title: '',
    });Taro
    var temp = this.state.userInfoList;
    temp.avatar = res.detail.userInfo.avatarUrl;
    globalData.avatar = temp.avatar;
    temp.nickName = res.detail.userInfo.nickname||res.detail.userInfo.nickName;
    globalData.nickName = temp.nickName;
    console.log("globalData.nickName")
    console.log(globalData.nickName)
    
    this.setState({
      userInfoList:temp
    });
    console.log("userInfoList:")
    console.log(this.state.userInfoList)
    Taro.request({
      method: 'POST',
      url: BASE_URL + 'user/updateuserinfo',
      data: {
        avatarUrl: res.detail.userInfo.avatarUrl,
        city: res.detail.userInfo.city,
        country: res.detail.userInfo.country,
        nickName: res.detail.userInfo.nickName,
        province: res.detail.userInfo.province
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log(res);
        
        Taro.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000
        })

       

        //that.goRecharge();
      },
      fail: function (res) {
        Taro.hideLoading();
      }
    })
  }
  goRecharge(){
    Taro.navigateTo({
      url: '/pages/recharge/recharge?avatar=' + globalData.avatar + '&nickname=' + globalData.nickname+'&fee='+globalData.fee
    })
  }
  gohome(){
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  toSever(){
    Taro.navigateTo({
      url: '/pages/service/service'
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

        } else if (res.data.code == 206) {
          //that.paytipsmodal('open');
        } else {
          Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

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
        Taro.showToast({
          title: '请开通支付分',
          icon: 'fail',
          duration: 2000
        })
        that.gohome();
          
      }

    })

  }
  render () {
    const price_format = data =>{
      var str = data/100;
      var str1 = str.toFixed(2)
      return str1
    }
    const { SwiperItemArry} = this.state;
    const SwiperItems = SwiperItemArry.map((item,index)=>{
      return(<SwiperItem>
            <View className='demo-text-1'>
               <Image src={item.url} style='position:absolute;width:100%;height:100%' />
            </View>
      </SwiperItem>
      )
    })
    return (
        <View className='personalCenter'>
           <View className='mhh'>
                <Image className='mhhImages' src={this.state.mhhImg}/>
           </View>
           <View className='personDiv'>
              <View className='contents'>
                <View className='personBox'>
                  <Image className='avator' src={this.state.userInfoList.avatar?this.state.userInfoList.avatar:this.state.avator}/>
                  <Image className='boxBottom' src={this.state.perbox}/>
                  {this.state.isuserInfo?
                  <Button className='boxName' open-type="getUserInfo" ongetUserInfo={this.userInfoHandler.bind(this)} >点击更新信息</Button>
                  :
                  <View className='boxName'>{globalData.nickName}</View>
                  }
                  <Button className='boxInfo' onClick={this.goRecharge}>充值优惠</Button>
                  <View className='boxUl'>
                     <View className='uli' onClick={this.goRecharge}>
                       <View className='wordb'>￥{price_format(this.state.userInfoList.fee)}</View>
                       <View className='wordz'>余额</View>
                     </View>
                     <View className='line' >|</View>
                     <View className='uli' onClick={this.goheart}>
                       <View className='wordb'>{this.state.wishes.length}</View>
                       <View className='wordz'>心愿</View>
                     </View>
                     <View className='line'  style='display:none'>|</View>
                     <View className='uli' onClick={this.gobingcart} style='display:none'>
                      <View className='wordb'>0</View>
                      <View className='wordz'>亲情卡</View>
                     </View>
                  </View>
                </View>
                <View className='mysever'>
                  <View className='titleSever'>
                    <View className='myordertitle'>我的订单</View>
                    <View className='mychecked' onClick={this.toOrders}>查看全部订单></View>
                  </View>
                  <View className='orderDiv'>
                   
                     <View className='iconLi' onClick={this.toOrders1}>
                       {this.state.total<=0?
                       <Image className='iconb' src={this.state.iconB2}/>
                       :
                       <View>
                         <View className='totalDiv'>{this.state.total}</View>
                       <Image className='iconb' src={this.state.iconB21}/>
                       </View>
                       }
                       <View className='iconw' >已付款</View>
                     </View>
                     <View className='iconLi' onClick={this.toOrders2}>
                       <Image className='iconb' src={this.state.iconB1}/>
                       <View className='iconw' >转退款</View>
                     </View>
                     <View className='iconLi' onClick={this.toOrders3}>
                       <Image className='iconb' src={this.state.iconB3}/>
                       <View className='iconw'>其他</View>
                     </View>
                     {/* <View className='iconLi'>
                       <Image className='iconb' src={this.state.iconB4}/>
                       <View className='iconw'>常买清单</View>
                     </View> */}
                  </View>
                  <View>
                     
                  </View>
                </View>
                <View className='mysever' style='padding:0 0 0 0;'>
                <Swiper
                    className='test-h'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    autoplay>
                    {/* <SwiperItem>
                      <View className='demo-text-1'>

                      </View>
                    </SwiperItem> */}
                   
                    {SwiperItems}
                  </Swiper>
                </View>
                {/* <View className='mysever'>
                <View className='titleSever'>
                    <View className='myordertitle'>我的服务</View>
                  </View>
                  <View className='orderDiv'>
                     <View className='iconLi'>
                       <Image className='iconb' src={this.state.iconC1}/>
                       <View className='iconw'>账户设置</View>
                     </View>
                     <View className='iconLi'>
                       <Image className='iconb' src={this.state.iconC2}/>
                       <View className='iconw'>帮助中心</View>
                     </View>
                     <View className='iconLi'>
                       <Image className='iconb' src={this.state.iconC3}/>
                       <View className='iconw'>意见反馈</View>
                     </View>
                     <View className='iconLi'>
                       <Image className='iconb' src={this.state.iconC4}/>
                       <View className='iconw'>我的客服</View>
                     </View>
                  </View>
                  <View></View>
                </View> */}
                <View className='temp'></View>             
              </View>
           </View>
           <View className='footer'>
             <View className='zmkm' >
               <Image className='zmkmImg'  onTouchStart={this.onScreen}  src={this.state.tytb33}/>
             </View>
             <View className='footerDiv'>
               <View className='icon1'>
                 <Image className='iconImg1' onTouchStart={this.gohome} src={this.state.iconImg1}/>
               </View>
               <View className='icon2'>
               <Image className='iconImg2' onTouchStart={this.toSever} src={this.state.iconImg2}/>
               </View>
             </View>
           </View>
        </View>
    )
  } 
}


