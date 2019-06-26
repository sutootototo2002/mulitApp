
var avatar;
var lastLon;
var lastLat;
var wishid;
var merchantid;

import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../../config/index.js'; 

import { AtButton,AtInput } from 'taro-ui'

import './myheart.scss';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

interface IState {
  mhhImg: string,
  avator:string,
  imgs:string,
  imgs1:string,
  zmkm:string,
  clear:string,
  value:string,
  bool:boolean,
  HearBoolean:boolean,
  HearHead:string,
  closebtn:string,
  markBoolean:boolean,
  heardImg:string,
  addr:string,
  dyzh:string,
  yyzh:string,
  searLists:Array<object>,
  myheartList:Array<object>,
  otherWishes:Array<object>,
  hashOtherWishes:Array<object>,
  hasMore:boolean,
  pageNo:number,
  pageSize:number,
  isDel:boolean,
  machines:Array<object>,
  wish:string,
  wishname:string
}

class Myheart extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText:'心愿单'
  }
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
      mhhImg:PATH+'/mImages/xydImg.png',
      avator:globalData.avatar?globalData.avatar:PATH+'/mImages/tempavator.jpg',
      imgs:PATH+'/mImages/xytb.png',
      imgs1:PATH+'/mImages/xytb-1.png',
      zmkm:PATH+'/mImages/zmkm0.png',
      clear:PATH+'/mImages/ljx1.png',
      value:'',
      bool:false,
      HearBoolean:false,
      HearHead:PATH+'/mImages/ysjtb1.png',
      closebtn:PATH+'/mImages/gban1.png',
      markBoolean:false,
      heardImg:PATH+'/mImages/fkz.png',
      addr:PATH+'/mImages/tytb-4.png',
      dyzh:PATH+'/mImages/dyz_f.png',
      yyzh:PATH+'/mImages/yyz_f.png',
      searLists:[],
      myheartList:[], //我的心愿单
      otherWishes: [],//其他心愿单
      hashOtherWishes: [], //有其他愿望
      pageNo:1,
      pageSize: 10,
      hasMore:false,
      isDel:false,
      machines:[],
      wish:'',
      wishname:''
    }
  }
  


  componentWillMount(){
       console.log('-----------onLoad---------')
       console.log(this.$router.params)
       avatar = this.$router.params.avatar;
       lastLon = this.$router.params.lon;
       lastLat = this.$router.params.lat;
      //  console.log('avatar:'+avatar+'lastLon'+lastLon+'lastLat'+lastLat)

       console.log("globalData:")
       console.log(globalData)
       
  }
  componentDidMount () {}

  componentDidShow () {
      console.log('---onshow----')
      this.ongetHeartList();
      this.reset();
      this.loadOtherWishes();

  }

  componentDidHide () {}

  componentDidCatchError () {}

  loadOtherWishes() {
    Taro.showLoading({
      title: '',
    });
    Taro.request({
      url: BASE_URL + 'wishlist/otherWishList',
      data: {
        pageNo: this.state.pageNo,
        pageSize: this.state.pageSize,
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: (res) => {
        var rows = res.data.rows;
        console.log('其他小伙伴的心愿单：')
        console.log(res.data)
        let hash = {}
        const chatList = rows.reduce(function (item, next) { 
          hash[next.wishlistid]?"":hash[next.wishlistid] = true && item.push(next); 
          return item 
          }, [])
        
        
        console.log(chatList);
        Taro.hideLoading();
        this.setState({
          otherWishes: chatList,
          hasMore: res.data.hasMore,
          //pageNo: res.data.pageNo,
        })
      },
      fail: (err) => {
        Taro.hideLoading();
        Taro.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }
    // 每次取到的数据可能有重复,去重并更新
    // addAndUpdate(res) {
    //   var rows = res.rows;
    //   var n = this.state.otherWishes.length;
    //   var j = 0;
    //   for(var i = 0; i < rows.length; i++) {
    //     var idx = this.state.hashOtherWishes[rows[i].wishlistid];
    //     if(idx === undefined) {
    //       this.state.hashOtherWishes[rows[i].wishlistid] = n + j;
    //       this.state.otherWishes.push(rows[i]);
    //       j++;
    //     } else {
    //       //更新点赞数
    //       this.state.otherWishes[idx].likes = rows[i].likes;
    //     }
    //   }
    // }
  reset() {
    this.setState({
      otherWishes:[],
      hashOtherWishes:[],
      pageNo:1
    })
  }
  onCloseHeard(){
    console.log('关闭心愿单')
    this.setState({
      HearBoolean:false,
      markBoolean:false
    })
  }
  addgoods(){
  
    console.log('添加商品')
    this.setState({
      bool:true,
      isDel:false
    })
  }
  add(){
    console.log('添加商品')
    this.setState({
      bool:false
    })
  }
  onSetheart(){
    console.log('进入心愿单中心');
    Taro.navigateTo({
      url: '/pages/wish/likes/myheart'
    })
  }
  oncheckdetail(e){
    console.log('查看详情')
    console.log(e);
    console.log('wishid：'+e.currentTarget.dataset.wishid)
    console.log('wishname:'+e.currentTarget.dataset.wishname)

    wishid = e.target.dataset.wishid
    merchantid = e.target.dataset.merchantid ? e.target.dataset.merchantid : ''
    this.setState({
      HearBoolean:true,
      markBoolean:true,
      wishname:e.currentTarget.dataset.wishname
    })
    this.loadMachines()
  }

  loadMachines() {
    Taro.showLoading({
      title: '',
    });
    Taro.request({
      url: BASE_URL + 'wishlist/getWishFeedBacks',
      data: {
        wishlistid: wishid,
        merchantid: merchantid,
        longitude: globalData.longitude,
        latitude: globalData.lastLon
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: (res) => {
        console.log('machines:')
        console.log(res)
        Taro.hideLoading();
        this.setState({
          machines: res.data.rows,
          wish: res.data.rows.length > 0 ? res.data.rows[0].wishname : '',
        })
      },
      fail: (err) => {
        Taro.hideLoading();
        this.setState({
          machines: []
        })
      }
    })
  }

// $("#keyword").on('keypress',function(e) {
//   var keycode = e.keyCode;
//   var searchName = $(this).val();
//   if(keycode=='13') {
//       e.preventDefault();  
//       //请求搜索接口
      
//   }
// })

  onSearchHandler(value){
     console.log(value);
     this.setState({
      value:value
    })
     var that = this;
    //  /wishlist/filterWishes
    Taro.request({
      url: BASE_URL + 'wishlist/filterWishes',
      data: {
        name:value
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token':globalData.token
      },
      method: "POST"
    }).then((res)=>{
      
       if(res.data.code==200){
          console.log("res.data.rows:");
          console.log(res.data.rows);
          that.setState({
            searLists:res.data.rows
          })
          
       }
     

    })
  }
  formSubmit(e){
    console.log(e)
    console.log('form')
  }
  onGoback(){
    this.setState({
      value:'',
      bool:false
    })
  }
  onInput(value){
    console.log();
    console.log('添加。。')
    console.log(value);
    if(!value){
      Taro.showToast({
        title:'请添加心愿',
        icon: 'fail',
        duration: 2000
      })
      return;
    }
    this.adda(value);
    
  }
  onBlur(value){
    console.log('失去焦点。。。。')
    console.log(value);
    
    
  }
  adda(value){
    var that = this;
    Taro.request({
      url: BASE_URL + 'wishlist/addWish',
      data: {
        name: value
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: (res)=> {
        //Taro.hideLoading();
        //检测是否可以开门
       

        if (res.data.status == 200) {
         
           console.log('添加成功！')
           that.setState({
            bool:false,
            value:''
           })
           that.ongetHeartList();

        } else{
          Taro.showToast({
            title: res.data.msg,
            icon: 'fail',
            duration: 2000
          })

        }

      },
      fail: (e) =>{
        Taro.showToast({
          title: '请求失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }
bindconfirm(e){
  console.log(e);
  console.log('bindconfirom');
}
ongetHeartList(){
  var that = this;
  Taro.request({
    url: BASE_URL + '/wishlist/myWishList',
    data: {
      
    },
    header: {
      'content-type': 'application/json', // 默认值
      'token': globalData.token
    },
    method: "POST",
    success: function (res) {
      console.log('获取心愿列表11111：')
      console.log(res.data.rows);
      let rowss = res.data.rows;
      //let myheartList_ = [];
      let myheartList_:Array<object> = rowss.map((item,index)=>{
        item.id = index;
        return item;
      })
      
      that.setState({
        myheartList : myheartList_
      })
      
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
onModify(){
  console.log('修改按钮')
  this.setState({
    isDel:true
  })
}
ondelFn(e){
   console.log(e);
   console.log(e.currentTarget.id)
   var index_ = e.currentTarget.id;
   var type = e.currentTarget.dataset.type;
   var wishlistid = e.currentTarget.dataset.wishlistid;
   var wishpraise = e.currentTarget.dataset.wishpraise;
    
    // /wishlist/deleteAWish
    var that = this;
    Taro.request({
      url: BASE_URL + '/wishlist/deleteAWish',
      data: {
        type:type,
        wishlistid:wishlistid,
        wishpraise:wishpraise

      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      method: "POST",
      success: function (res) {
        //console.log('删除：')
        console.log(res);
        if(res.data.status ==200){
          console.log('删除成功！')
          //that.ongetHeartList();
          //that.ongetHeartList();
          let temp = that.state.otherWishes;
          temp.map((item,index)=>{
            if(item.wishlistid == wishlistid ){
              item.extra = '0'
           }
           return item;
        })
        var lists = that.state.myheartList;
        lists.splice(index_,1);
        that.setState({
          myheartList:lists,
          otherWishes:temp
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
toBoxdetail(e){
  Taro.navigateTo({
    url: `../../box/boxdetail/boxdetail?machineid=${e.currentTarget.dataset.machineid}`,
  })
}
unlikeit(e){
    var idx = e.currentTarget.dataset.id;
    var wishid = e.currentTarget.dataset.wishid;
    var obj = this.state.myheartList.find((item,index)=>{
        if(item.wishlistid == wishid){
          return item.wishpraise
        }
    })
    var type = e.currentTarget.dataset.type;
    console.log("wishpraise:");
    console.log(obj.wishpraise);
    Taro.request({
      url: BASE_URL + 'wishlist/deleteAWish',
      method: 'POST',
      data: {
        wishlistid: wishid,
        wishpraise: obj.wishpraise,
        type: type,
      },
      header: {
        'content-type': 'application/json',
        'token': globalData.token
      },
      success: (res) => {
        Taro.hideLoading();
        if (res.data.status == 200) {
         
         
          let temp = this.state.otherWishes;
          temp.map((item,index)=>{
            if(item.wishlistid == wishid ){
              item.extra = '0'
           }
           return item;
      })
      console.log('extra after...')
      console.log(temp);
      var myheartListArr = this.state.myheartList
      var tt = myheartListArr.filter((item,index)=>{
            return item.wishlistid !== wishid
          })
      console.log(tt);
      this.setState({
        otherWishes:temp,
        myheartList:tt
      })
          
        }
        Taro.showToast({
          title: res.data.msg,
          icon: res.data.status == 200 ? 'success' : 'none',
          duration: 2000
        })
      },
      fail: (err) => {
        Taro.hideLoading();
        Taro.showToast({
          title: '删除失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }


likeit(e){
  console.log(e);
  var idx = e.currentTarget.dataset.id;
  var wishid = e.currentTarget.dataset.wishid;
  console.log('idx:'+idx+'wishid:'+wishid)
  Taro.showLoading({
    title: '',
  });
  Taro.request({
    url: BASE_URL + 'wishlist/likeAWish',
    method: 'POST',
    data: {
      wishlistid: e.currentTarget.dataset.wishid,
    },
    header: {
      'content-type': 'application/json',
      'token': globalData.token
    },
    success: (res) => {
      // console.log('请求成功:' + JSON.stringify(res));
      Taro.hideLoading();
      var rows = this.state.myheartList.concat(res.data.rows);
      console.log("this.state.otherWishes")
      console.log(this.state.otherWishes)
      let temp = this.state.otherWishes;
      temp.map((item,index)=>{
        if(index == idx ){
          item.extra = '1'
        }
        return item;
      })
      console.log('extra after...')
      console.log(temp);
      this.setState({
        otherWishes:temp,
        myheartList:rows
      })
      //var rows = this.data.myWishes.concat(res.data.rows);
      // this.setData({
      //   ["otherWishes[" + idx+"].extra"]: '1',
      //   ["otherWishes[" + idx + "].likes"]: res.data.n,
      //   myWishes: rows,
      // });
      Taro.showToast({
        title: '点赞成功',
        icon: 'success',
        duration: 2000
      })
    },
    fail: (err) => {
      console.log('请求失败:' + err);
      Taro.hideLoading();
      Taro.showToast({
        title: '点赞失败',
        icon: 'fail',
        duration: 2000
      })
    }
  })


}

addWishFn(e){
  console.log(e)
  var value = e.currentTarget.dataset.wishname;
  this.setState({
     value:value
  })
}
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数 
  render () {
    const { searLists,myheartList,otherWishes,machines} = this.state;
    const myhart = myheartList.map((item,index)=>{
      return (
        <View className='wishLi'>
         
        <View className='viewli'>{item.wishname}</View>
        {this.state.isDel?
         <View className='delFn'  data-type={item.type} data-wishlistid={item.wishlistid} data-wishpraise={item.wishpraise} onTouchStart={this.ondelFn} id={index}>X</View>
         :
         ''
        }
       
        </View>
      )
    })
    const searList = searLists.map((item,index)=>{
        return (
          
          <View className='wishname' data-wishname={item.wishname} onClick={this.addWishFn}>{item.wishname}</View>
        )
    })
    const heartlist = otherWishes.map((item,index)=>{
        return (
          <View className='xhdDiv'>
          <Image className='xhdvator_' src={item.avatar} />
          <View className='xhdFloat'>
            <View className='xhdCtent'>我想要 <Text className='gtype'>{item.wishname}</Text></View>
            <View>
              <Image className='sumheart' src={this.state.imgs}/>
              <View className='sumcount'>{item.likes}</View>
            </View>
            <View className='clickOk'>
              {item.extra=='1'?
                <Image className='sumheartOne' src={this.state.imgs}  data-likes="{{item.likes}}" data-likes="{{item.type}}"  onTouchStart={this.unlikeit} data-wishid="{{item.wishlistid}}" data-id="{{index}}" />
               :
                <Image className='sumheartOne' src={this.state.imgs1}  data-likes="{{item.likes}}" onTouchStart={this.likeit} data-wishid="{{item.wishlistid}}" data-id="{{index}}" />

              }
               <View className='youzan'>赞</View>
            </View>
          </View>
          {item.status == 2?
          <View className='xhdAnswer'>
            <Image className='answer' src={this.state.zmkm}/>
            <View className='answerInfo'>顾客您好！您的心愿商品已上货，快来看看吧！</View>
            <View className='checkdetail' data-wishname={item.wishname} data-wishid="{{item.wishlistid}}" onTouchStart={this.oncheckdetail}>查看详情</View>
          </View>
          :
          ''
          }
                    
        </View>
        )
    })
     
    const machinesTemp = machines.map((item,index)=>{
          return (
            <View className='gLi'>
                   <Image className='machBigImg' src={this.state.heardImg}/>
                   {item.phystate=='运营中'?
                   <Image className='yyzh' src={this.state.yyzh}/>
                   :
                   <Image className='yyzh' src={this.state.dyzh}/>
                   }
                   
                   <View className='gAddr'>{item.location?item.location:globalData.sysTitle}</View>
                   {/* <View className='gAddr_'>{item.phystate}</View> */}
                   <Button className='gdetail' data-machineid="{{item.machineid}}" onClick={this.toBoxdetail} >查看详情</Button>
                   <View className='gdistDiv'>
                     <Image className='gdist' src={this.state.addr} />
                     <View className='gdist1'>距离您{item.distance}</View>
                   </View>
                 </View>
          )
    })
    return (
        <View className='myheartView'>
          <View className='mhh'>
          <Image className='mhhImages' src={this.state.mhhImg}/>
          </View>
          <Image className='boxOne' src={this.state.avator}/>
          <View className='BoxDiv'>
          <View className="yhdBox">
            <Text className='xhdTitle'>我的心愿单</Text>
            <View className='viewUl'>
              {myhart}
            </View>
            <View className='modifyBtn'>
               <View className='modifyView' onTouchStart={this.onModify}>修改心愿单</View>
               <View className='addView' onTouchStart={this.addgoods}>新增心愿单</View>
               {/* <Image className='delView' src={this.state.clear}/> */}
            </View>
          </View>
            <View className='otherBox'>
             <Text className='xhdTitle'>其他小伙伴的心愿单</Text>
             <View className='otherDiv'>
               {heartlist}
            

             </View>
          </View>
          </View>
          {/* <Button className='callback' type='default'>返回</Button> */}
          {this.state.bool?
          <View className='yhdBox1'>
              <View>
              <Form action='' target="rfFrame">
              <AtInput
                id='keyword'
                name='value'
                title='我想要：'
                type='search'
                onChange={this.onSearchHandler}
                placeholder='请输入商品'
                value={this.state.value}
              />
              </Form>
                <View>
                  {searList}
                </View>
                <AtButton type='primary' size='small' className='addgoods1' onClick={this.onInput.bind(this,this.state.value)} >添加</AtButton>
                <AtButton type='primary' size='small' className='addgoods' onClick={this.onGoback.bind(this,this.state.value)} >返回</AtButton>
              </View>
            </View>
         :
         <View></View>
          }
          {this.state.markBoolean?
         <View className='mark'></View>
         :
         <CoverView></CoverView>}
         {this.state.HearBoolean?
          <View className='HearDiv'>
             <Image className='HearImg' src={this.state.HearHead}/>
             <Image src={this.state.closebtn} onTouchStart={this.onCloseHeard} className='closeBtn'/>
             <View className='HearList'>
              <View className='title'>
                <View className='gTitle'>{this.state.wishname}</View>
                <View className='gline'>|</View>
                <View className='gInfo'>这些货柜都能找到</View>
              </View>
              <View className='goodsList'>
                 {machinesTemp}
             </View>
              <View className='clickBtn'>点击加载更多</View>
           </View>
         
          </View>
         :
         <View></View>
         }
        </View>
    )
  }
}


