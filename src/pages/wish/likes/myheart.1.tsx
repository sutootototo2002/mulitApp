import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../../config/index.js'; 

import { AtButton,AtInput } from 'taro-ui'




// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

interface IState {
  mhhImg: string,
  avator:string,
  imgs:string,
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
  yyzh:string
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
      avator:PATH+'/mImages/tempavator.jpg',
      imgs:PATH+'/mImages/xytb.png',
      zmkm:PATH+'/mImages/zmkm0.png',
      clear:PATH+'/mImages/ljx1.png',
      value:'',
      bool:false,
      HearBoolean:false,
      HearHead:PATH+'/mImages/ysjtb1.png',
      closebtn:PATH+'/mImages/gban1.png',
      markBoolean:true,
      heardImg:PATH+'/mImages/fkz.png',
      addr:PATH+'/mImages/tytb-4.png',
      dyzh:PATH+'/mImages/dyz_f.png',
      yyzh:PATH+'/mImages/yyz_f.png',
    }
  }
  


  componentWillMount(){
       console.log('-----------onLoad---------')
      
       
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}
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
      bool:true
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
      url: '/pages/wish/myheart'
    })
  }
  oncheckdetail(){
    console.log('查看详情')
    this.setState({
      HearBoolean:true,
      markBoolean:true
    })
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <View className='myheartView'>
          <View className='mhh'>
          <Image className='mhhImages' src={this.state.mhhImg}/>
          </View>
          <Image className='boxOne' src={this.state.avator}/>
          <View className="yhdBox">
            <Text className='xhdTitle'>我的心愿单</Text>
            <View className='viewUl'>
              <View className='viewli'>冰红茶</View>
              <View className='viewli'>康师傅方便面</View>
              <View className='viewli'>冰红茶</View>
              <View className='viewli'>冰红茶</View>
              <View className='viewli'>冰红茶</View>
              <View className='viewli'>康师傅绿茶</View>
              <View className='viewli'>康师傅方便面</View>
              <View className='viewli'>冰红茶</View>
              <View className='viewli'>冰红茶</View>
              <View className='viewli'>冰红茶</View>
              <View className='viewli'>康师傅绿茶</View>
            </View>
            <View className='modifyBtn'>
               <View className='modifyView'>修改心愿单</View>
               <View className='addView' onTouchStart={this.addgoods}>新增心愿单</View>
               <Image className='delView' src={this.state.clear}/>
            </View>
          </View>
            <View className='otherBox'>
             <Text className='xhdTitle'>其他小伙伴的心愿单</Text>
             <View className='otherDiv'>
             <View className='xhdDiv'>
               <Image className='xhdvator_' src={this.state.avator} />
               <View className='xhdFloat'>
                 <View className='xhdCtent'>我想要 <Text className='gtype'>零度可乐</Text><Text className='gtype'>大辣条</Text></View>
                 <View>
                   <Image className='sumheart' src={this.state.imgs}/>
                   <View className='sumcount'>55</View>
                 </View>
                 <View className='clickOk'>
                 <Image className='sumheartOne' src={this.state.imgs}/>
                    <View className='youzan'>赞</View>
                 </View>
               </View>
               <View className='xhdAnswer'>
                  <Image className='answer' src={this.state.zmkm}/>
                  <View className='answerInfo'>顾客您好！您的心愿商品已上货，快来看看吧！</View>
                  <View className='checkdetail' onTouchStart={this.oncheckdetail}>查看详情</View>
               </View>            
             </View>
             <View className='xhdDiv'>
               <Image className='xhdvator_' src={this.state.avator} />
               <View className='xhdFloat'>
                 <View className='xhdCtent'>我想要 <Text className='gtype'>零度可乐</Text><Text className='gtype'>大辣条</Text></View>
                 <View>
                   <Image className='sumheart' src={this.state.imgs}/>
                   <View className='sumcount'>55</View>
                 </View>
                 <View className='clickOk'>
                 <Image className='sumheartOne' src={this.state.imgs}/>
                    <View className='youzan'>赞</View>
                 </View>
               </View>
               <View className='xhdAnswer'>
                  <Image className='answer' src={this.state.zmkm}/>
                  <View className='answerInfo'>顾客您好！您的心愿商品已上货，快来看看吧！</View>
                  <View className='checkdetail'>查看详情</View>
               </View>            
             </View>
             <View className='xhdDiv'>
               <Image className='xhdvator_' src={this.state.avator} />
               <View className='xhdFloat'>
                 <View className='xhdCtent'>我想要 <Text className='gtype'>零度可乐</Text><Text className='gtype'>大辣条</Text></View>
                 <View>
                   <Image className='sumheart' src={this.state.imgs}/>
                   <View className='sumcount'>55</View>
                 </View>
                 <View className='clickOk'>
                 <Image className='sumheartOne' src={this.state.imgs}/>
                    <View className='youzan'>赞</View>
                 </View>
               </View>
               <View className='xhdAnswer'>
                  <Image className='answer' src={this.state.zmkm}/>
                  <View className='answerInfo'>顾客您好！您的心愿商品已上货，快来看看吧！</View>
                  <View className='checkdetail'>查看详情</View>
               </View>            
             </View>
             <View className='xhdDiv'>
               <Image className='xhdvator_' src={this.state.avator} />
               <View className='xhdFloat'>
                 <View className='xhdCtent'>我想要 <Text className='gtype'>零度可乐</Text><Text className='gtype'>大辣条</Text></View>
                 <View>
                   <Image className='sumheart' src={this.state.imgs}/>
                   <View className='sumcount'>55</View>
                 </View>
                 <View className='clickOk'>
                 <Image className='sumheartOne' src={this.state.imgs}/>
                    <View className='youzan'>赞</View>
                 </View>
               </View>
               <View className='xhdAnswer'>
                  <Image className='answer' src={this.state.zmkm}/>
                  <View className='answerInfo'>顾客您好！您的心愿商品已上货，快来看看吧！</View>
                  <View className='checkdetail'>查看详情</View>
               </View>            
             </View>
             
             </View>
          </View>
          {/* <Button className='callback' type='default'>返回</Button> */}
          {this.state.bool?
          <View className='yhdBox1'>
              <View>
              <AtInput
                name='value'
                title='我想要：'
                type='text'
                placeholder='请输入商品'
                value={this.state.value}
              />
                <AtButton type='primary' size='small' className='addgoods' onClick={this.add}>添加</AtButton>
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
                <View className='gTitle'>零度可乐</View>
                <View className='gline'>|</View>
                <View className='gInfo'>这些货柜都能找到</View>
              </View>
              <View className='goodsList'>
                 <View className='gLi'>
                   <Image className='machBigImg' src={this.state.heardImg}/>
                   <Image className='yyzh' src={this.state.yyzh}/>
                   <View className='gAddr'>富海国际港1层大厅3号柜</View>
                   <View className='gAddr_'>北京市海淀区大柳树北路17号</View>
                   <Button className='gdetail'>查看详情</Button>
                   <View className='gdistDiv'>
                     <Image className='gdist' src={this.state.addr} />
                     <View className='gdist1'>距离您1.2m</View>
                   </View>
                 </View>
                 <View className='gLi'>
                 <Image className='machBigImg' src={this.state.heardImg}/>
                   <Image className='yyzh' src={this.state.dyzh}/>
                   <View className='gAddr'>富海国际港1层大厅3号柜</View>
                   <View className='gAddr_'>北京市海淀区大柳树北路17号</View>
                   <Button className='gdetail'>查看详情</Button>
                   <View className='gdistDiv'>
                     <Image className='gdist' src={this.state.addr} />
                     <View className='gdist1'>距离您1.2m</View>
                   </View>
                 </View>
                 <View className='gLi'>
                   <Image className='machBigImg' src={this.state.heardImg}/>
                   <Image className='yyzh' src={this.state.yyzh}/>
                   <View className='gAddr'>富海国际港1层大厅3号柜</View>
                   <View className='gAddr_'>北京市海淀区大柳树北路17号</View>
                   <Button className='gdetail'>查看详情</Button>
                   <View className='gdistDiv'>
                     <Image className='gdist' src={this.state.addr} />
                     <View className='gdist1'>距离您1.2m</View>
                   </View>
                 </View>
                 <View className='gLi'>
                   <Image className='machBigImg' src={this.state.heardImg}/>
                   <Image className='yyzh' src={this.state.yyzh}/>
                   <View className='gAddr'>富海国际港1层大厅3号柜</View>
                   <View className='gAddr_'>北京市海淀区大柳树北路17号</View>
                   <Button className='gdetail'>查看详情</Button>
                   <View className='gdistDiv'>
                     <Image className='gdist' src={this.state.addr} />
                     <View className='gdist1'>距离您1.2m</View>
                   </View>
                 </View>
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


