var $timer=0;

import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../config/index.js'; 

import './bindcard.scss'
import { number } from 'prop-types';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
interface IState {
  orderid:string,
  mhhImg:string,
  unbingImg:string,
  step1:boolean,
  step2:boolean,
  step3:boolean,
  step:boolean,
  info:string,
  carImg:string,
  step1Img:string,
  step2Img:string,
  step3Img:string,
  stepcard:string,
  screencard:string,
  successcard:string,
  isCard:boolean,
  cardid:string,
  timerShow:boolean,
  cards:Array<object>,
  //requestTimer:string,
  countDownNum:number,
  bindSuccess:boolean
}

class Bindcard extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
   config = {
     navigationBarTitleText:'绑卡'
   }
  timer: number;
  requestTimer: number;
   constructor (props: {} | undefined) {
    super(props)
    this.state = {
      orderid:'',
      isCard:false,
      step1:true,
      step2:false,
      step3:false,
      step:false,
      cardid:'',
      timerShow:false,
      bindSuccess:false,
      cards:[],
      unbingImg:PATH+'/mImages/unbingcard.png',
      info:PATH+'/mImages/infoNew.png',
      step1Img:PATH+'/mImages/step1.png',
      step2Img:PATH+'/mImages/step2.png',
      step3Img:PATH+'/mImages/step3.png',
      mhhImg:PATH+'/mImages/xydImg.png',
      stepcard:PATH+'/mImages/stepcard.png',
      screencard:PATH+'/mImages/screen1.png',
      successcard:PATH+'/mImages/success.png',
      carImg:PATH+'/mImages/mycard.png',
      countDownNum:30
    }
    this.timer = 0;
    this.requestTimer = 0;

   }

  componentWillMount(){
    console.log(this.$router.params)
    //this.countDown()
    this.cardlist();

  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {
    var that = this;
    if (that.requestTimer != 0){
      clearInterval(that.requestTimer);
    }
    if (that.timer != 0) {
      clearInterval(that.timer);
    }
  }

  componentDidCatchError () {}
  cardlist(){
    var that = this;
    Taro.showLoading({
      title: '',
    })
    Taro.request({
      url: BASE_URL + 'card/cards',
      data: {
        
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: function (res) {
        Taro.hideLoading();
        console.log(res.data)
        that.setState({
          cards: res.data.data,
        })
        


      },
      fail:function(error){
        Taro.hideLoading();
      }
    })
  }
  onbindCardFn(){
    //console.log('绑定卡片')
    this.setState({
      step:true
    })
  }
  addbind(){
    console.log('开始扫码')
    this.setState({
      step:true,
      step1:true
      
    })


  }
  //开始扫码
  onscan(){
    var that = this;
    Taro.scanCode({
      
    }).then((res)=>{
      var qrurl = res.result;
      console.log('qrurl:' + qrurl)
      that.requestOpen(qrurl);
    }).catch((error)=>{
      console.log(error)
    })
  }

  requestOpen(qrurl){
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'card/bindmachine',
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
        if (res.data.code == 200) {
          that.setState({
            step1: false,
            step2:true,
            cardid: res.data.data,
            timerShow:true
          });
          that.countDown();
        } else if (res.data.code == 221) {
          Taro.showModal({
            title: '提示',
            content: '亲，两个人不能同时绑定亲情卡哦！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              }
            }
          })
        }  else {
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
  countDown() {
    
      let that = this;
      let $countDownNum = that.state.countDownNum;//获取倒计时初始值
      
      //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
      this.timer= setInterval(()=>{
        $countDownNum --;
        that.setState({
          countDownNum : $countDownNum
        })
        if($countDownNum == 0){
          
          clearInterval(that.timer);
          if (that.state.bindSuccess){
             that.setState({
               step:false,
               step1:true,
               step2:false
             })
          }else{
            Taro.showModal({
              title: '提示',
              content: '操作超时，请重试',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  that.setState({
                    step:false,
                    step1:true,
                    step2:false
                  })
                }
              }
            })
          }
          
        }
     },1000)
     this.requestTimer= setInterval(()=>{
        that.checkBindStatus();
     },2000)
     
  }
   //检查绑卡
  checkBindStatus(){
    var that = this;
    Taro.request({
      url: BASE_URL + 'card/bindstatus',
      data: {
        cardid: that.state.cardid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == 200) {
          console.log('到这里200')
          if (res.data.data == 1){
            that.setState({
              step1: false,
              step2:false
            });
          } else if (res.data.data == 2) {
            clearInterval(that.requestTimer);
            Taro.hideLoading();
            that.setState({
              step1: false,
              step2:false,
              step3:true,
              bindSuccess:true
            });
          } else if (res.data.data == 3) {
            Taro.hideLoading();
            clearInterval(that.requestTimer);
            Taro.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  Taro.navigateBack({

                  })
                } 
              }
            })
          }
        }

      },
      fail: function (e) {
        console.log('到这里fail')
        Taro.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }
  unbind(e) {
    Taro.showModal({
      title: '解绑实体卡',
      content: '确定解绑实体卡',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          Taro.request({
            method: 'POST',
            url: BASE_URL + 'card/unbind',
            data: {
              cardid: e.currentTarget.dataset.cardid
            },
            header: {
              'content-type': 'application/json',
              'token': globalData.token
            },
            success: function (res) {
              console.log(res.data)
              Taro.showToast({
                title: '解绑成功',
              })
              Taro.navigateBack({
                
              })
            }
          })
        }
      }
    })
  }
  detail(e) {
    var cardid = e.currentTarget.dataset.cardid;
    Taro.navigateTo({
      url: '/pages/orders/orderlist/orderlist?cardid='+cardid
    })
  }
  done(){
    //完成调用再次调用接口

    this.cardlist();
    this.setState({
      step:false,
      step1:true,
      step2:false,
      step3:false
    })
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    const {cards}= this.state;
    const cardArr = cards.map((item,index)=>{
          return (
            <View className='unbingdDiv'>
              <Image className='mycard' src={this.state.carImg}/>
              <View className='cardNO'>卡号：{item.cardno}</View>
              <View className='cardTimer'>绑卡时间:{item.bindtime}</View>
              <View className='cardetail' data-cardid={item.cardid} onClick={this.detail}>查看明细</View>
              <View className='uncard' data-cardid={item.cardid} onClick={this.unbind}>解除绑定</View>
            </View>
                // <View className='unbingdDiv'>
                //    <Image className='mycard' src={this.state.carImg}/>
                //    <View>{item.cardno}</View>
                //    <View>{item.bindtime}</View>
                //    <View data-cardid={item.cardid} onClick={this.detail}>明细</View>
                //    <View data-cardid={item.cardid} onClick={this.unbind}>解绑</View>
                // </View>
              
          )
    })
    return (
     
          <View className='myheartView'>
            <View className='mhh'>
              <Image className='mhhImages' onClick={this.addbind} src={this.state.mhhImg}/>
            </View>
           
            {this.state.step?
             <View className='setps'>
               <View className='headDiv'>
                 {this.state.step1?
                 <View>
                  <View className='headDiv'>
                     <Image className='headImg' src={this.state.step1Img} />
                  </View>
                  
                  <View>
                    <Image className='cards' src={this.state.screencard}/>
                  </View>
                  <View className='cword'>请扫描柜门上二维码</View>
                  <View className='btns'>
                    <Button type='default' className='btnFresh' onClick={this.onscan}>开始扫码</Button>
                    <Button className='concelFn'>取消</Button>
                  </View>
                 </View>
                 :
                 ''
                 }
                 {this.state.step2?
                 <View>
                  <View className='headDiv'>
                     <Image className='headImg' src={this.state.step2Img} />
                  </View>
                  <View>
                    <Image className='cards' src={this.state.stepcard}/>
                  </View>
                  <View>{this.state.countDownNum}s</View>
                  <View className='cword'>请将实体卡靠近读卡器</View>
                  <View className='btns'>
                    <Button className='btnFresh'>刷新</Button>
                    <Button className='concelFn'>取消</Button>
                  </View>
                 </View>
                 :
                 ''
                 }
                 {this.state.step3?
                 <View>
                  <View className='headDiv'>
                     <Image className='headImg' src={this.state.step3Img} />
                  </View>
                  <View>
                    <Image className='cards' src={this.state.successcard}/>
                  </View>
                  <View className='cword'>恭喜绑定成功！</View>
                  <View className='cword'>可以把卡送给最亲爱的人哦！</View>
                  <View className='btns'>
                    <Button type='default' className='btnFresh' onClick={this.done}>绑定成功</Button>
                    <Button className='concelFn'>取消</Button>
                  </View>
                 </View>
                 :
                 ''
                 }
                 
               </View>
                 
           </View>
           :
           ''
            }
            <View className='boxDiv'>
              {this.state.isCard?
              <View>
                <View>
                {cardArr}
                </View>
                <View>
               
                {/* <View className='unbingdDiv'>
                   <Image className='mycard' src={this.state.carImg}/>
                   <View className='cardNO'>卡号：</View>
                   <View className='cardTimer'>绑卡时间:</View>
                   <View className='cardetail' data-cardid={item.cardid} onClick={this.detail}>查看明细</View>
                   <View className='uncard' data-cardid={item.cardid} onClick={this.unbind}>解除绑定</View>
                </View> */}
                

              </View>
                <View>
                <View className='unbingdDiv'>
                  <Image className='ubDOne' onTouchStart={this.onbindCardFn.bind(this)} src={this.state.unbingImg} />
                </View>
                <View className='tishi'>
                  <Image className='Imgs'  src={this.state.info} />
                  <View className='Info_'>
                    绑定的卡仅用于开门，消费在绑定的微信中结算
                  </View>
                  
                  </View>
                 </View>
               </View>
              :
              <View>
                <View className='unbingdDivOne'>
                  <Image className='ubDOne' onTouchStart={this.onbindCardFn.bind(this)} src={this.state.unbingImg} />
                </View>
                <View className='tishi'>
                  <Image className='Imgs'  src={this.state.info} />
                  <View className='Info_'>
                    绑定的卡仅用于开门，消费在绑定的微信中结算
                  </View>
                  
                  </View>
                 </View>
              }
              
             
              
            </View>
          </View>
     
  )
  }
}


