var curStatus = 8; //默认状态为8
var curPage = 0;
var cardid = '';
var value = 0;
import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text,ScrollView } from '@tarojs/components'

import { AtTabs, AtTabsPane,AtButton,AtActivityIndicator} from 'taro-ui'

import {BASE_URL,globalData,PATH,systemUser} from '../../../config/index.js'; 

import './orderlist.scss'

interface IState {
    current:number,
    addrimg:string,
    goodsList:Array<object>,
    dargStyle:object,
    downDragStyle:object,
    downText:string,
    upDragStyle:object,
    pullText:string,
    start_p:object,
    scrollY:boolean,
    dargState:number,
    
}
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Orderlist extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
   config = {
     navigationBarTitleText:'订单列表页',
     onReachBottomDistance:50
    

   }
   constructor (props: {} | undefined) {
    super(props)
    this.state = {
        current:0,
        goodsList:[],
        addrimg:PATH+'/mImages/wddd2.png',
        dargStyle: {//下拉框的样式
          top: 0 + 'px'
      },
      downDragStyle: {//下拉图标的样式
          height: 0 + 'px'
      },
      downText: '下拉刷新',
      upDragStyle: {//上拉图标样式
          height: 0 + 'px'
      },
      pullText: '上拉加载更多',
      start_p: {},
      scrollY:true,
      dargState: 0//刷新状态 0不做操作 1刷新 -1加载更多
    }
    }
    onPullDownRefresh(){
      console.log('下拉事件111111111111111')
      curPage = 0;
      this.setState({
        goodsList:[]
      })
      this.getOrdersup()
    }
    onReachBottom(){
      console.log('上拉事件1111111111111111111111')
      this.getOrders();
    }

  componentWillMount(){
    console.log(this.$router.params)
    if(this.$router.params.cardid){
        cardid = this.$router.params.cardid;
    }
    if(this.$router.params.state){
      curStatus = Number(this.$router.params.state);
    }
    if(this.$router.params.value){
      value = this.$router.params.value;
      console.log(value);
      this.setState({
        current:Number(value)
      })
    }
    //curPage = 0;
   
    
    console.log("cardid");
    console.log(cardid);
    //curStatus = 8;
    this.getOrdersup();
    
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  getOrdersup() {
    var that = this;
    var page = curPage + 1;
   
    Taro.showLoading({
      title: '',
    })
    Taro.request({
      url: BASE_URL + 'order/orderlist',
      data: {
        page: page,
        rows: 5,
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
        that.setState({
          goodsList: res.data.data.data
        })
        //var hasnext = res.data.data.hasnext;
       
      }
    })

  }
  getOrders() {
    var that = this;
    var page = curPage + 1;
    // this.setState({
    //   curPage: page
    // })
    curPage = page;

    Taro.showLoading({
      title: '',
    })
    Taro.request({
      url: BASE_URL + 'order/orderlist',
      data: {
        page: page,
        rows: 5,
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
        
        
            
            
        var hasnext = res.data.data.hasnext;
        if(!hasnext){
          Taro.showLoading({
            title: '没有数据更新了',
          })
          setTimeout(() => {
            Taro.hideLoading();
          }, 1500);
          
        }
          that.setState({
            goodsList: that.state.goodsList.concat(res.data.data.data)
        })
        
      }
    })

  }
  userInfoHandler(res){
    var that = this;
    console.log(res.detail.userInfo);
    if (res.detail.userInfo == null){
      return;
    }
    
    Taro.showLoading({
      title: '',
    });Taro
    
    globalData.avatar = res.detail.userInfo.avatarUrl;
    globalData.nickname = res.detail.userInfo.nickname||res.detail.userInfo.nickName;
    
    console.log("globalData.nickName")
    console.log(globalData.nickname)
    console.log("globalData.avatar")
    console.log(globalData.avatar)

    // this.setState({
    //   isperson:true
    // })

    console.log("userInfoList:")
    // console.log(this.state.userInfoList)
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
      success:  (res)=> {
        console.log(res);
        
        Taro.showToast({
          title: '头像更新成功',
          icon: 'success',
          duration: 2000
        })

       

        that.onSetheart();
      },
      fail: (res)=> {
        Taro.hideLoading();
        // Taro.showModal({
        //   title: '提示',
        //   content: '请更新头像',
        //   success: function(res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
      }
    })
  }
  handleClick (value) {
    console.log(value)
    if(value==0){
        curStatus = 8; 
        curPage = 0;
    }
    if(value==1){
        curStatus = 7;
        curPage = 0;
    }
    if(value==2){
        curStatus = 0;
        curPage = 0;
    }

    this.setState({
      current: value
    })
    this.getOrdersup();
  }
  //查看详情
  toOrderDetail(orderId){
      Taro.navigateTo({
        url: '/pages/orders/orderdetail/orderdetail?orderid=' + orderId
      })
   
  }
  touchEnd(e) {
    if (this.state.dargState === 1) {
        this.down()
    } else if (this.state.dargState === -1) {
        this.pull()
    }
    this.reduction()
}
pull() {//上拉
  console.log('上拉')
      // this.props.onPull()
      this.onReachBottom()
      
  }
  onSetheart() {
    console.log('进入心愿单中心');
    Taro.navigateTo({
      url: '/pages/wish/likes/myheart'
    })
  }
down() {//下拉
  console.log('下拉')
  this.onPullDownRefresh();
  
        // this.props.onDown()

    }
reduction() {//还原初始设置
  const time = 0.5;
  this.setState({
      upDragStyle: {//上拉图标样式
          height: 0 + 'px',
          transition: `all ${time}s`
      },
      dargState: 0,
      dargStyle: {
          top: 0 + 'px',
          transition: `all ${time}s`
      },
      downDragStyle: {
          height: 0 + 'px',
          transition: `all ${time}s`
      },
      scrollY:true
  })
  setTimeout(() => {
      this.setState({
          dargStyle: {
              top: 0 + 'px',
          },
          upDragStyle: {//上拉图标样式
              height: 0 + 'px'
          },
          pullText: '上拉加载更多',
          downText: '下拉刷新'
      })
  }, time * 1000);
}

ScrollToUpper() { //滚动到顶部事件
	console.log('滚动到顶部事件')
        // this.props.Upper()
    }
ScrollToLower() { //滚动到底部事件
      console.log('滚动到底部事件')
            // this.props.Lower()
} 
touchStart(e) {
  this.setState({
      start_p: e.touches[0]
  })
}
  touchmove(e) {
		let that = this
        let move_p = e.touches[0],//移动时的位置
            deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
            deviationY = 50,//拉动长度（低于这个值的时候不执行）
            maxY = 100;//拉动的最大高度

        let start_x = this.state.start_p.clientX,
            start_y = this.state.start_p.clientY,
            move_x = move_p.clientX,
            move_y = move_p.clientY;


        //得到偏移数值
        let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
        if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
            let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
			if (move_y - start_y > 0) {//下拉操作
				if (pY >= deviationY) {
					this.setState({ dargState: 1, downText: '释放刷新' })
				} else {
					this.setState({ dargState: 0, downText: '下拉刷新' })
				}
				if (pY >= maxY) {
					pY = maxY
				}
				this.setState({
					dargStyle: {
						top: pY + 'px',
					},
					downDragStyle: {
						height: pY + 'px'
					},
					scrollY:false//拖动的时候禁用
				})
			}
			if (start_y - move_y > 0) {//上拉操作
				console.log('上拉操作')
				if (pY >= deviationY) {
					this.setState({ dargState: -1, pullText: '释放加载更多' })
				} else {
					this.setState({ dargState: 0, pullText: '上拉加载更多' })
				}
				if (pY >= maxY) {
					pY = maxY
				}
				this.setState({
					dargStyle: {
						top: -pY + 'px',
					},
					upDragStyle: {
						height: pY + 'px'
					},
					scrollY: false//拖动的时候禁用
				})
			}

        }
    }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    const { goodsList } = this.state;

    const tabList = [{ title: '已付款' }, { title: '转退款' }, { title: '其他' }]
    const Content =goodsList.map((item,index)=>{
          const goodsArr = item.goods.map((item_,index)=>{
              return <View className='gUL' key="">
                  <Image className='gImg' src={item_.picurl} />
                  <View className='fLeft'>
                      <View className='boxline'>
                          <View className='gname'>{item_.goodsname}</View>
                          <View className='gprice'>￥{item_.unitfee/100}</View>
                      </View>
                      <View className='boxline'>
                          <View className='gname'>{item_.spec}</View>
                          <View className='gprice'>X{item_.amount}</View>
                      </View>
                  </View>
                  
              </View>
          })
          return (
              <View className='boxLi'>
                  <View>
                     {item.location?
                      <View className='addr'><Image className='addimg' src={this.state.addrimg?this.state.addrimg:''}/>{item.location} {item.dailaddress}</View>
                      :
                      <View className='addr'><Image className='addimg' src={this.state.addrimg}/>{globalData.sysTitle}</View>
                     }
                    
                    
                     {item.orderstatus==1? <View className='ctime'>购物中</View>:''}
                     {item.orderstatus==2? <View className='ctime'>待结账</View>:''}
                     {item.orderstatus==3? <View className='ctime'>已取消</View>:''}
                     {item.orderstatus==4? <View className='ctime'>待支付</View>:''}
                     {item.orderstatus==5? <View className='ctime'>已付款</View>:''}
                     {item.orderstatus==6? <View className='ctime'>已欠费</View>:''}
                     {item.orderstatus==7? <View className='ctime'>转退款</View>:''}
                     {item.orderstatus==8? <View className='ctime'>已完成</View>:''}
                     {item.orderstatus==9? <View className='ctime'>订单异常</View>:''}
                    

                  </View>
                  { item.goods.length?
                   <View className='gslist'>
                       {goodsArr}
                       <View className='total'>共{item.goods.length}件商品 合计：￥{item.payfee/100}</View>
                   </View>
                   :
                   <View className='goodsum'>                  
                       <View>共{item.goods.length}件商品 合计：￥{item.payfee/100}</View>
                   </View>
                  
                  }
                   <View className='Btns'>
                       <View style='float:left;font-size:25rpx;color:#ccc'>{item.createtime}</View>
                       <AtButton class='btn'  data-orderid={item.orderid} onClick={this.toOrderDetail.bind(this,item.orderid)}  >订单详情</AtButton>                      
                       {/* <AtButton class='btn' >删除订单</AtButton> */}
                       <AtButton class='btn1' type='secondary'  open-type="getUserInfo" ongetUserInfo={this.userInfoHandler.bind(this)} >我的心愿</AtButton>
                       {/* {item.orderstatus==1?<AtButton class='btn1' type='secondary' >购物中</AtButton>:''}
                       {item.orderstatus==2?<AtButton class='btn1' type='secondary'>待结账</AtButton>:''}
                       {item.orderstatus==3?<AtButton class='btn1' type='secondary'>已取消</AtButton>:''}
                       {item.orderstatus==4?<AtButton class='btn1' type='secondary'>待支付</AtButton>:''}
                       {item.orderstatus==5?<AtButton class='btn1' type='secondary'>已付款</AtButton>:''}
                       {item.orderstatus==6?<AtButton class='btn1' type='secondary'>已欠费</AtButton>:''}
                       {item.orderstatus==7?<AtButton class='btn1' type='secondary'>转退款</AtButton>:''}
                       {item.orderstatus==8?<AtButton class='btn1' type='secondary'>已完成</AtButton>:''}    
                       {item.orderstatus==9?<AtButton class='btn1' type='secondary'>异常订单</AtButton>:''}                                          */}
                       {/* <AtButton class='btn'>已完成</AtButton>
                       <AtButton class='btn'>已付款</AtButton>
                       <AtButton class='btn'>待付款</AtButton>
                       <AtButton class='btn'>欠款订单</AtButton> */}
                   </View>
              </View>
          )
    });
        let dargStyle = this.state.dargStyle;
        let downDragStyle = this.state.downDragStyle;
        let upDragStyle = this.state.upDragStyle;
        
    return (
        <View style='background:#f2f2f2'>
           <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
        <View className='dragUpdataPage'>
                <View className='downDragBox' style={downDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.downText}</Text>
                </View>
                <ScrollView
                    style={dargStyle}
                    onTouchMove={this.touchmove}
                    onTouchEnd={this.touchEnd}
                    onTouchStart={this.touchStart}
                    onScrollToUpper={this.ScrollToUpper}
                    onScrollToLower={this.ScrollToLower}
                    className='dragUpdata'
                    scrollY={this.state.scrollY}
                    scrollWithAnimation>
                    <View>
                       <View>{Content}</View>
                    </View>
                </ScrollView>
                <View className='upDragBox' style={upDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.pullText}</Text>
                </View>
            </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          
        <View className='dragUpdataPage'>
                <View className='downDragBox' style={downDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.downText}</Text>
                </View>
                <ScrollView
                    style={dargStyle}
                    onTouchMove={this.touchmove}
                    onTouchEnd={this.touchEnd}
                    onTouchStart={this.touchStart}
                    onScrollToUpper={this.ScrollToUpper}
                    onScrollToLower={this.ScrollToLower}
                    className='dragUpdata'
                    scrollY={this.state.scrollY}
                    scrollWithAnimation>
                    <View>
                       <View>{Content}</View>
                    </View>
                </ScrollView>
                <View className='upDragBox' style={upDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.pullText}</Text>
                </View>
            </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
        <View className='dragUpdataPage'>
                <View className='downDragBox' style={downDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.downText}</Text>
                </View>
                <ScrollView
                    style={dargStyle}
                    onTouchMove={this.touchmove}
                    onTouchEnd={this.touchEnd}
                    onTouchStart={this.touchStart}
                    onScrollToUpper={this.ScrollToUpper}
                    onScrollToLower={this.ScrollToLower}
                    className='dragUpdata'
                    scrollY={this.state.scrollY}
                    scrollWithAnimation>
                    <View>
                       <View>{Content}</View>
                    </View>
                </ScrollView>
                <View className='upDragBox' style={upDragStyle}>
                    <AtActivityIndicator></AtActivityIndicator>
                    <Text className='downText'>{this.state.pullText}</Text>
                </View>
            </View>
        </AtTabsPane>
      </AtTabs>
        </View>
    )
  }
}


