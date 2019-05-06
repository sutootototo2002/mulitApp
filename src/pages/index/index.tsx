
import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../config/index.js'; 

//图片修改

import location from '../../assets/images/location.png'

import wishImg from '../../assets/images/syxytb.png'

import juan from '../../assets/images/juan.png'

import './index.scss'

// var app = Taro.getApp()



// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
interface IState {
  latitude: number,
  longitude:number,
  scale:number,
  controls:Array<object>,
  isOpened:boolean,
  mapObj:object,
  mapKey:string,
  showLocation:boolean,
  markers:Array<object>,
  allMarkers:Array<object>,
  menus:string,
  bool:boolean,
  menuright:Array<object>
  screen:string,
  user:string,
  person:string,
  zm:string,
  dw:string,
  searchImg:string,
  token:string,
  commonCode:string,
  checkPapay:boolean,//是否开通免密
  posBoolean:boolean,
  markBoolean:boolean,
  unpayBoolean:boolean,
  machineBoolean:boolean,
  unpayImg:string,
  unpriceImg:string,
  payName:number,
  unpayList:Array<object>,
  tempImg:string,
  del:string,
  pos_:string,
  open:string,
  addr:string,
  mach:string,
  DensityFree:boolean,
  mm:string,
  HearBoolean:boolean,
  HearlistBoolean:boolean,
  HearHead:string,
  closebtn:string,
  heardImg:string,
  yyzh:string,
  dyzh:string,
  xydd:string

}

export default class Index extends Component<{}, IState>{
  mapObj: Taro.MapContext;
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
      mapKey:'CFOBZ-IOJKX-TGG4T-ZZM75-EXWF2-OHFAP',
      latitude: 39.908823,
      longitude: 116.397470,
      scale:16,
      menus:PATH+'/mImages/menus.png',
      screen:PATH+'/mImages/screen.png',
      user:PATH+'/mImages/tytb-6.png', 
      person:PATH+'/mImages/tytb-22.png', 
      zm:PATH+'/mImages/zm2.png',
      searchImg:PATH+'/mImages/searchImg.png',
      dw:PATH+'/mImages/dw.png',
      unpayImg:PATH+'/mImages/wfk-11.png',
      unpriceImg:PATH+'/mImages/wfk.png',
      pos_:PATH+'/mImages/bg_0.png',
      tempImg:'http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg',
      del:PATH+'/mImages/clear.png',
      open:PATH+'/mImages/yyz.png',
      addr:PATH+'/mImages/tytb-4.png',
      mach:PATH+'/mImages/tytb-1.png',
      mm:PATH+'/mImages/mm.png',
      HearHead:PATH+'/mImages/ysjtb1.png',
      closebtn:PATH+'/mImages/gban1.png',
      heardImg:PATH+'/mImages/fkz.png',
      yyzh:PATH+'/mImages/yyz_f.png',
      dyzh:PATH+'/mImages/dyz_f.png',
      xydd:PATH+'/mImages/xyd_img.png',
      controls: [],
      isOpened:false,
      mapObj:{},
      showLocation:true,
      markers: [],
      allMarkers: [],
      bool:true, //menus是否显示
      menuright:[],
      token:'',
      checkPapay:false, //是否开通免密
      commonCode:'', //公共授权临时code
      markBoolean:false,
      posBoolean:false,
      unpayBoolean:false,
      machineBoolean:false,
      DensityFree:false, 
      HearBoolean:false,
      HearlistBoolean:false,
      payName:0.00,
      unpayList:[
        {
        'name':'suxiaoyan',
        "order":5.00,
        "time":'2019-01-03',
        "goods":[
                {'goodsname':'脉动1','Gl':'ml','amount':99,'address':'丰台区南智能机柜11','url':"http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg"},
                {'goodsname':'脉动2','Gl':'ml','amount':99,'address':'丰台区南智能机柜22','url':"http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg"},
                {'goodsname':'脉动3','Gl':'ml','amount':99,'address':'丰台区南智能机柜33','url':"http://filetest.wemall.com.cn/de0aa02f4a0f49171149beab583c826b.jpg"}
                 ]
      }
    ]
      
    }
  }

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps: any) {
    console.log(this.props, nextProps)
  }
  componentWillMount(){
    console.log('获取getApp:')
    // console.log(app)
    console.log('---onLaunch---项目运行时触发')
    console.log('获取用户信息:')
    this.mapObj = Taro.createMapContext("mymap")
 
    
    var that = this;
    //拿到系统信息
    Taro.getSystemInfo({
      success: (res: { windowWidth: number; windowHeight: number; }) => {
          console.log('获取用户的手机信息（屏幕宽高等）')
          console.log(JSON.stringify(res));
          console.log('存储用户信息到缓存store中')
          
          let store = Taro.setStorageSync("userInfo",res);
          const data = Taro.getStorageSync('userInfo');
          console.log("data中是否有用户信息：");
          console.log(data);
          that.setState({
             controls:[{
              id: 1,
              iconPath: location,
              position: {
                width: 55,
                height:55,
                left: (res.windowWidth-55)/2,
                top: (res.windowHeight-115)/2
              },
              clickable: true
            },{
              id: 2,
              iconPath: wishImg,
              position: {
                width: 100,
                height:100,
                left: res.windowWidth-90,
                top: (res.windowHeight-115)/2
              },
              clickable: true
            },
            {
              id: 3,
              iconPath:juan,
              position: {
                width: 80,
                height:80,
                left: res.windowWidth-80,
                top: (res.windowHeight-115)/2 +90
              },
              clickable: true
            }
          ]
          })
      }
    })
    //得到位置
    Taro.getLocation({
      type: 'gcj02', //wgs84 gcj02
      success:(res)=>{
        console.log("获取用户定位成功：")

        const data = Taro.getStorageSync('userInfo');
        console.log(res)
        console.log(res.city)
       
        console.log(data);
        that.setState({
          latitude: res.latitude,
          longitude: res.longitude,
          controls:[{
            id:1,
            iconPath: location,
            position: {
              width: 55,
              height:55,
              left: (data.windowWidth-55)/2,
              top: (data.windowHeight-115)/2
            },
            clickable: true
          },
          {
            id: 2,
            iconPath: wishImg,
            position: {
              width: 100,
              height:100,
              left: data.windowWidth-90,
              top: (data.windowHeight-115)/2
            },
            clickable: true
          },
          {
            id: 3,
            iconPath:juan,
            position: {
              width: 80,
              height:80,
              left: data.windowWidth-80,
              top: (data.windowHeight-115)/2+90
            },
            clickable: true
          }
        ]
        });
        console.log(that.mapObj);
        that.mapObj.moveToLocation();
        console.log("res.latitude,res.longitude");
        console.log(res.latitude,res.longitude);
        that.getNearbyMachines(res.latitude,res.longitude);
      },
      fail:(res)=>{
        console.log("获取用户定位失败111：")
        console.log(res) //请确定定位相关权限已开启
        //console.log(res.errCode)
        Taro.showModal({
          title:'提示',
          content:'系统找不到您的位置！',
          cancelText: '取消',
          success:(res)=>{
            console.log(res);
            if (res.confirm) {
              console.log('用户点击确定时候：');

              that.onsub()
              
              } else {
              console.log('用户点击取消')
              return;
              }
          }
        })
       
      }

    })
  }
  componentWillUnmount () { }

  componentDidShow () {
    console.log('---onshow---')
    console.log('---免密首先检查免密开通情况---')
    console.log('---此处需要将来要改为支付分---')
    
    
    
   }

  componentDidHide () { }

  //设置定位关闭
  oncancel(){
    //调用用户信息
    const data = Taro.getStorageSync('userInfo');
    this.setState({
      controls:[{
        id: 1,
        iconPath: location,
        position: {
          width: 55,
          height:55,
          left: (data.windowWidth-55)/2,
          top: (data.windowHeight-115)/2
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: wishImg,
        position: {
          width: 100,
          height:100,
          left: data.windowWidth-90,
          top: (data.windowHeight-115)/2
        },
        clickable: true
      },
      {
        id: 3,
        iconPath: juan,
        position: {
          width: 80,
          height:80,
          left: data.windowWidth-80,
          top: (data.windowHeight-115)/2 +90
        },
        clickable: true
      }
    ]
    })
  }
  //免密是否开通验证
  checkPapay(){
    console.log('******检查是否开通免密*****');
    if(Taro.getEnv()  == "ALIPAY" ){
       console.log('**支付宝是否开通免密**')
    }
    if(Taro.getEnv()  == "WEAPP" ){
      console.log('**微信是否开通免密**')
      
    }
    
    
  }
  //验证token是否有效
  verifyToken(){
     console.log("********token是否有效********")
     Taro.request({
      url: BASE_URL+'token/verifyToken',
      data: {
        'token': globalData.token
      },
      header: {
        'content-type': 'application/json'
      }
    })
    .then(res => console.log(res.data))
  }
  //1支付宝获取授权code临时码
  myGetAuthCode(){
    var that = this;
    my.getAuthCode({
      scopes: ['auth_user'],
      success: (res) => {
        console.log("支付宝code临时码")
        console.log(res)
        console.log(res.authCode)
        that.setState({
          commonCode:res.authCode
        })
        //console.log(that.state.commonCode)
      }
    });
  }
   //2微信获取授权code临时码
    wxGetAuthCode(){
      var that = this;
      Taro.login().then(res=>{
        console.log("小程序code临时码")
        console.log(res.code)
        that.setState({
          commonCode:res.code
        })
        //console.log(that.state.commonCode)
      })
    }
  //检查用户是否登录
  checkLogin(){

    //判断端（支付宝/微信）
    if(Taro.getEnv()  == "ALIPAY" ){
       this.myGetAuthCode();
       return;
    }  
    if(Taro.getEnv()  == "WEAPP" ){
      this.wxGetAuthCode();
      return;
   }  

   
  }
  //获取小程序token值
  checkToken(){
     this.checkLogin();
     }
  //获取机柜的经纬度坐标，必须获取token才可以拿到
  getNearbyMachines(latitude: number, longitude: number){
     console.log("globalData.token")
     console.log(globalData.token)
    if(latitude==0 && longitude){
      return;
    }
    var that = this;

    Taro.request({
      url: BASE_URL + 'machine/nearbymachines',
      data: {
        lon: latitude,
        lat: longitude,
        distance: 1000
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': "011OMTMu0t0sBj1ozQJu0ckyMu0OMTMg"
      },
      success: function (res) {
       console.log('获取附近机柜:[]')
       console.log(res);
        }
    })
  }
  //确定按钮
  onsub(){
    //选择定位地点
    console.log('选择定位地点');
    var that = this;
    Taro.chooseLocation({
      success: (res: { latitude: number; longitude: number; })=> {
       //允许打开定位
       console.log("定位成功：");
       console.log(res);
       that.setState({
        latitude: res.latitude,
        longitude:res.longitude
      })
      that.mapObj.moveToLocation();
      },
      fail: (res: any) => {
      //不允许打开定位
       console.log("定位失败：");
       console.log(res);
       return;
      }
    })
  }
  onconcel(){
    console.log('取消操作')
  }
  onControlTap(e: { controlId: any; }){
      //点击地图菜单项，点击那个就返回哪个的controlId
      console.log(e.controlId)
      if(e.controlId==2){
         this.onHeard();
      }
      

  }
  onHeard=()=>{
    console.log('心愿单开启');
    this.setState({
      HearlistBoolean:true,
      markBoolean:true
      
    })
  }
  onInfo=(e)=>{
    e.stopPropagation();
    console.log('onInfo')
  }
  //关闭定位
  onClosePos=(e)=>{
    //关闭
    e.stopPropagation();
    console.log(e);
    console.log('onInfo1111')
    this.setState({
      markBoolean:true,
      posBoolean:true
    })
  }
  onRight(){
    console.log('微信客服')
    Taro.navigateTo({
      url: '/pages/service/service'
    })
  }
  onLeft(){
    console.log('个人中心')
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }
  onScreen(){
    console.log('扫码开门')
  }
  onMM(){
    console.log('开启免密')
  }
  onCloseHeard(){
    console.log('关闭心愿单')
    this.setState({
      HearBoolean:false,
      markBoolean:false
    })
  }
  onCloseHeardlist(){
    console.log('关闭心愿单列表')
    this.setState({
      HearlistBoolean:false,
      markBoolean:false,
    })
  }
  onSetheart(){
    console.log('进入心愿单中心');
    Taro.navigateTo({
      url: '/pages/wish/myheart'
    })
  }
  onPay(){
    console.log('订单明细页面')
    Taro.navigateTo({
      url: '/pages/orders/index'
    })
    
  }
  render () {
    const {unpayList} = this.state;
    
    

    
    const contentList = unpayList.map((item)=>{
            
             
      return (
            <CoverView className='clist'>
             <CoverView className='canme'>{item.name}</CoverView>
             <CoverView className='ctime'>{item.time}</CoverView>
             {
               item.goods.map((item_)=>{
                 return (
                   <CoverView className="goods">
                   <CoverImage className='gImg' src={item_.url}/>
                   <CoverView className='gName'>{item_.goodsname}</CoverView>
                   </CoverView>
                 )
               })
             }
            
             
      </CoverView>
      )
    })


    return (
      <View>
        {/* <Canvas className='canvas'/> */}
        
         <Map className='mb-map' id='mymap' show-location={this.state.showLocation} subkey={this.state.mapKey} latitude={this.state.latitude} longitude={this.state.longitude} scale={this.state.scale} controls={this.state.controls} onControlTap={this.onControlTap}/>
         <CoverView className='menus_avator'>
           <CoverImage className='menus_user' src={this.state.zm}/>
         </CoverView>

         {/* 遮罩层 */}
         {this.state.markBoolean?
         <CoverView className='mark'></CoverView>
         :
         <CoverView></CoverView>}
         {/* 打开定位权限 */}
         
         {this.state.posBoolean?
         <CoverView className='boxInfo' onClick={this.onInfo} hidden={this.state.posBoolean}>
           <CoverImage className='posImg' src={this.state.dw} />
           <CoverView className='info'>亲！{systemUser}找不到您的位置...</CoverView>
           <CoverView className='btnOpen' onClick={this.onClosePos}>打开定位权限</CoverView>
         </CoverView>
         :
         <CoverView></CoverView>}

         {/*未付订单*/}
         {this.state.unpayBoolean?
         <CoverView className='unpayOrder'>

            <CoverImage src={this.state.unpayImg}/>
            <CoverImage className='unprice' src={this.state.unpriceImg}/>
            <CoverView className='textOne'>本次</CoverView>
            <CoverView className='textTwo'>应付款(元)</CoverView>
            <CoverView className='textPrice'>{this.state.payName.toFixed(2)}</CoverView>
            <CoverView className='textshi'>Wa!  这里有未付订单！</CoverView>
            <CoverView className='unpayList'>
              <CoverView className='orderList'>
                  <CoverView className='orderInfo'>
                     <CoverView className='goodstate'>未付知码订单</CoverView>
                     <CoverView className='time'>2019/11/10 23:00</CoverView>
                   </CoverView>
                 <CoverImage className='goodsImg' src={this.state.tempImg} />
                 <CoverView className='goodsInfos'>
                   <CoverView>
                     <CoverImage className='del' src={this.state.del}/>
                     <CoverView className='total'>共5件商品</CoverView>
                   </CoverView>
                   <CoverView className='goodsInfoDetail'>
                   [脉动300mlx1瓶] 丰台区南四环
                   </CoverView>
                 </CoverView>
              </CoverView>
              <Button className='BtnOne' onClick={this.onPay}>支付</Button>
            </CoverView>
            
         </CoverView>
         :
         <CoverView></CoverView>}

         {/* //免密提示框 */}
         {this.state.DensityFree?
           <CoverView className='desityFree'>
             <CoverImage className='mmImg' src={this.state.mm}/>
             <CoverView className='mmText'>无需输入支付密码，快速购物！</CoverView>
             <Button className='BtnTwo' onClick={this.onMM}>开启免密 愉快购物</Button>
           </CoverView>
           :
           <CoverView></CoverView>
         }

         {/* 心愿单提示框 */}
         {this.state.HearlistBoolean?
          <CoverView className='HearDiv1'>
            <CoverImage src={this.state.xydd} />
            <CoverImage src={this.state.closebtn} onTouchStart={this.onCloseHeardlist} className='closeBtn'/>
            <CoverView className='myhear' onTouchStart={this.onSetheart} hoverStartTime={10}></CoverView>
            <CoverView className='bgColor'>
              <CoverView className='hearList'>
                 <CoverView className='hearLi'>
                   <CoverImage className='userInfo' src={this.state.zm}/>
                   <CoverView className='CVFloat'>
                     <CoverView className='cvtitle'>用户小怪兽大胖子111点赞了您的心愿</CoverView>
                     <CoverView className='cvcallback'>点赞心愿：百事可乐</CoverView>
                     <CoverView className='checkInfo'>查看消息</CoverView>
                   </CoverView>
                 </CoverView>
                 <CoverView className='hearLi'>
                   <CoverImage className='userInfo' src={this.state.zm}/>
                   <CoverView className='CVFloat'>
                     <CoverView className='cvtitle'>用户小怪兽大胖子111点赞了您的心愿</CoverView>
                     <CoverView className='cvcallback'>点赞心愿：百事可乐</CoverView>
                     <CoverView className='checkInfo'>查看消息</CoverView>
                   </CoverView>
                 </CoverView>
                 <CoverView className='hearLi'>
                   <CoverImage className='userInfo' src={this.state.zm}/>
                   <CoverView className='CVFloat'>
                     <CoverView className='cvtitle'>用户小怪兽大胖子111点赞了您的心愿</CoverView>
                     <CoverView className='cvcallback'>点赞心愿：百事可乐</CoverView>
                     <CoverView className='checkInfo'>查看消息</CoverView>
                   </CoverView>
                 </CoverView>
                 <CoverView className='hearLi'>
                   <CoverImage className='userInfo' src={this.state.zm}/>
                   <CoverView className='CVFloat'>
                     <CoverView className='cvtitle'>用户小怪兽大胖子111点赞了您的心愿</CoverView>
                     <CoverView className='cvcallback'>点赞心愿：百事可乐</CoverView>
                     <CoverView className='checkInfo'>查看消息</CoverView>
                   </CoverView>
                 </CoverView>
              </CoverView>
            </CoverView>
          </CoverView>
          :
          <CoverView></CoverView>
         }
         {/* 心愿单提示框详情 */}
         {this.state.HearBoolean?
         <CoverView className='HearDiv'>
           <CoverImage className='HearImg' src={this.state.HearHead}/>
           <CoverImage src={this.state.closebtn} onTouchStart={this.onCloseHeard} className='closeBtn'/>
           <CoverView className='HearList'>
              <CoverView className='title'>
                <CoverView className='gTitle'>零度可乐</CoverView>
                <CoverView className='gline'>|</CoverView>
                <CoverView className='gInfo'>这些货柜都能找到</CoverView>
              </CoverView>
              <CoverView className='goodsList'>
                 <CoverView className='gLi'>
                   <CoverImage className='machBigImg' src={this.state.heardImg}/>
                   <CoverImage className='yyzh' src={this.state.yyzh}/>
                   <CoverView className='gAddr'>富海国际港1层大厅3号柜</CoverView>
                   <CoverView className='gAddr_'>北京市海淀区大柳树北路17号</CoverView>
                   <Button className='gdetail'>查看详情</Button>
                   <CoverView className='gdistDiv'>
                     <CoverImage className='gdist' src={this.state.addr} />
                     <CoverView className='gdist1'>距离您1.2m</CoverView>
                   </CoverView>
                 </CoverView>
                 <CoverView className='gLi'>
                 <CoverImage className='machBigImg' src={this.state.heardImg}/>
                   <CoverImage className='yyzh' src={this.state.dyzh}/>
                   <CoverView className='gAddr'>富海国际港1层大厅3号柜</CoverView>
                   <CoverView className='gAddr_'>北京市海淀区大柳树北路17号</CoverView>
                   <Button className='gdetail'>查看详情</Button>
                   <CoverView className='gdistDiv'>
                     <CoverImage className='gdist' src={this.state.addr} />
                     <CoverView className='gdist1'>距离您1.2m</CoverView>
                   </CoverView>
                 </CoverView>
                 <CoverView className='gLi'>
                   <CoverImage className='machBigImg' src={this.state.heardImg}/>
                   <CoverImage className='yyzh' src={this.state.yyzh}/>
                   <CoverView className='gAddr'>富海国际港1层大厅3号柜</CoverView>
                   <CoverView className='gAddr_'>北京市海淀区大柳树北路17号</CoverView>
                   <Button className='gdetail'>查看详情</Button>
                   <CoverView className='gdistDiv'>
                     <CoverImage className='gdist' src={this.state.addr} />
                     <CoverView className='gdist1'>距离您1.2m</CoverView>
                   </CoverView>
                 </CoverView>
                 <CoverView className='gLi'>
                   <CoverImage className='machBigImg' src={this.state.heardImg}/>
                   <CoverImage className='yyzh' src={this.state.yyzh}/>
                   <CoverView className='gAddr'>富海国际港1层大厅3号柜</CoverView>
                   <CoverView className='gAddr_'>北京市海淀区大柳树北路17号</CoverView>
                   <Button className='gdetail'>查看详情</Button>
                   <CoverView className='gdistDiv'>
                     <CoverImage className='gdist' src={this.state.addr} />
                     <CoverView className='gdist1'>距离您1.2m</CoverView>
                   </CoverView>
                 </CoverView>
              </CoverView>
              <CoverView className='clickBtn'>点击加载更多</CoverView>
           </CoverView>
         </CoverView>
         :
         <CoverView></CoverView>
         }
         

         {/* //点击出现位置 */}
         {this.state.bool?
         <CoverView className='menus'>
         <CoverImage className='menusImg' src={this.state.menus}/>
         <CoverImage className='menuscreen' onClick={this.onScreen} src={this.state.screen}/>
         <CoverImage className='menusBtnRight' onClick={this.onRight} src={this.state.user}/>
         <CoverImage className='menusBtnLeft' onClick={this.onLeft} src={this.state.person}/>
         {/* <CoverView className='menu_user'>{this.state.commonCode}</CoverView> */}
         {/*机柜信息 */}
         {this.state.machineBoolean?
         <CoverView className='machineInfo'>
            <CoverImage className='pos_' src={this.state.pos_}/>
            <CoverImage className='openImg' src={this.state.open} />
            <CoverView className='addrDiv'>
              <CoverImage className='addr' src={this.state.mach} />
              <CoverView className='address'>车道沟北方地产大厦楼西侧</CoverView>
            </CoverView>
            <CoverView className='addrDiv_'>
              <CoverImage className='addr_' src={this.state.addr} />
              <CoverView className='address_'>地址：北京市海淀区紫竹院路81号</CoverView>
              <CoverView className='dist'>| 距您步行539m</CoverView>
              <CoverView className='goodType'>
                 <CoverView className='goodli'>
                   <CoverImage className='goodImg' src={this.state.tempImg}/>
                   <CoverView className='goodsName'>水果</CoverView>
                 </CoverView>
              </CoverView>
              <CoverView className='zhanweifu'></CoverView>
            </CoverView>
            
         </CoverView>
         :
         <CoverView></CoverView>
         }
      

         </CoverView>
         :
         <CoverView></CoverView>}
       </View>
        )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

// export default Index as ComponentClass<PageOwnProps, PageState>
