var $orderid;
import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView,Canvas,View,Image,Icon,CoverImage,Button,Text } from '@tarojs/components'

import {BASE_URL,globalData,PATH,systemUser} from '../../config/index.js'; 

import { AtTabs, AtTabsPane,AtButton,AtTextarea   } from 'taro-ui'

import {uploadimg} from '../../utils/util.js';

import './refund.scss'

interface IState {
    machineImg:string,
    navList:Array<object>,
    id_:number,
    value:string,
    temp:string,
    upload:string,
    imagesArr:Array<object>,
    pics:Array<object>,
    files:Array<object>
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class Refund extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText:'问题反馈'
  }
  constructor (props: {} | undefined) {
    super(props)
    this.state = {
        machineImg:PATH+'refund.png',
        navList:[],
        id_:0,
        value: '',
        temp:PATH+'carma.jpg',
        upload:PATH+'carma.jpg',
        imagesArr:[],
        pics:[],
        files:[]
    }
}


  componentWillMount(){
    console.log(this.$router.params)
    $orderid = this.$router.params.orderid;
    this.getRefundressons();
  }
  getRefundressons() {
    var that = this;
    Taro.request({
      url: BASE_URL + 'order/refundressons',
      data: {
        orderid: $orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log('getDetail:')
        console.log(res.data.data)
        that.setState({
            navList:res.data.data
        })
        
      }
    })
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  selectNav(id){
   
   console.log(id);
   var nlist = this.state.navList;
   let temp = nlist.map((item,index)=>{
       if(item.id == id){
         item.selected = 'true'
       }else{
        item.selected = 'false'
       }
       return item;
   })

   console.log("temp:")
   console.log(temp)
   this.setState({
     id_:Number(id),
     navList:temp
   })
  }
  del(e){
    console.log(e);
    var index_ = e.currentTarget.dataset.id;

    console.log(index_)
    this.state.pics.splice(index_, 1)
   
    this.setState({
      pics:this.state.pics
    })
    
    
 }
  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }
  chooseImage(e){
    var that = this;
    if (that.state.pics.length >=4){
        Taro.showToast({
          title: '最多上传四张图片',
        })
        return;
    }
    Taro.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 //['album', 'camera']
      count: 4 - that.state.pics.length,
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // that.setData({
        //   files: that.data.files.concat(res.tempFilePaths)
        // });
        
        // wx.setStorage({
        //   key: "tempPics",
        //   data: res.tempFilePaths
        // });

        // var tempFilePaths = wx.getStorageSync('tempPics');
        console.log('tempFilePaths:' + res.tempFilePaths);
        //
        Taro.getNetworkType({
          success(resnet) {
            const networkType = resnet.networkType;
            if (networkType == 'unknown' || networkType == 'none'){
                Taro.showToast({
                  title: '未连接网络',
                })
                return;
            }else {
              Taro.showLoading({
                title: '正在上传',
              })
              uploadimg({
                url: BASE_URL + 'image/upload',
                path: res.tempFilePaths,//这里是选取的图片的地址数组
                cb: function (res2) {
                  console.log('--res2---');
                  console.log(res2);
                  if (res2 != '') {
                    console.log('--res2不为空！')
                    var aftersplists = res2.split(";");
                    console.log("aftersplists:")
                    console.log(aftersplists)
                    aftersplists.splice(aftersplists.length - 1, 1);
                    var ftemp =that.state.files.concat(res.tempFilePaths)
                    var ptemp = that.state.pics.concat(aftersplists)
                    console.log("ftemp")
                    console.log(ftemp)
                    console.log("ptemp")
                    console.log(ptemp)
                    that.setState({
                      files: ftemp,
                      pics: ptemp
                    })
                    
                  } else {
                    // wx.removeStorageSync("tempPics");
                    console.log('--res2空！')
                    Taro.showToast({
                      title: '上传失败',
                    })
                  }

                }
              });
            }
          }
        })


        
        //
      }
    })
  }

  submitRefund(res){
    var that = this;
    
    console.log("$orderid: "+$orderid)
    var nlist = that.state.navList;
    var labels = nlist.filter((item,index)=>{
      if(item.selected=='true'){
        return item;
      }
    })
    console.log("类型选择："+labels);
    console.log(labels);

    

    if(labels.length==0){
      Taro.showModal({
        title: '提示',
        content: '请选择问题类型',
        showCancel:false
      })
      return;
    }else{
      var lab = labels[0].id;
    }
    //
    var tmpics = '';
    for (var i = 0; i < that.state.pics.length; i++) {
      tmpics = tmpics + that.state.pics[i] + ";";
    };
    //
    if (tmpics == '') {
      Taro.showModal({
        title: '提示',
        content: '请至少上传一张图片',
        showCancel: false
      })
      return;
    }
    console.log("tmpics(图片选择):"+tmpics);
    console.log(tmpics);
    Taro.showLoading({
      title: '努力反馈中',
    });
    console.log("备注：");
    console.log(that.state.value);
    Taro.request({
      method: 'POST',
      data: {
        'orderid': $orderid,
        'labels': lab,
        'remark': that.state.value,
        'pics': tmpics
      },
      url: BASE_URL + 'order/applyrefund',
      header: {
        'Accept': 'application/json',
        'token': globalData.token
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data.code == 200){
          Taro.hideLoading();
          Taro.showModal({
            title: '反馈成功',
            content: '客官息怒，您的反馈我们已经收到，小二们抓紧核实处理',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                Taro.redirectTo({
                  url: '/pages/index/index'
                })
              }
            }
          });
        }else{
          Taro.hideLoading();
          Taro.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // wx.navigateBack();
              }
            }
          });
        }
        



      }
    })
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    const {navList,pics} = this.state;
    
    const navReason = navList.map((item,index)=>{
        
        return (
            
            <AtButton class={(this.state.id_ == Number(index+1))?'btn select':'btn'}  type='secondary'  id={"ab"+index}  onClick={this.selectNav.bind(this,item.id)} >{item.reason}</AtButton>

        )
    })
    const imagesContent = pics.map((item,index)=>{
      return (
          <View className='imgsss' style='position:relative;'>
            <View className='poDiv' data-id={index} onClick={this.del}>X</View>
            <Image src={item} style='width:100%'/>
          </View>
      )
    })
    return (
        <View className='answerDiv'>
           <View className='answerTitle'>请选择问题类型</View>
           <View className='answerInfo'>
               <Image className='machineInfo' src={this.state.machineImg}/>
               {navReason}
           </View>
           <View className='texDiv'>
              <AtTextarea
                  value={this.state.value}
                  onChange={this.handleChange.bind(this)}
                  maxLength={200}
                  placeholder='请输入吐槽意见，您的意见是我们前进的动力!'
                />
           </View>
           <View>
              <View className='img1' onClick={this.chooseImage}>
                <Image className='img' src={this.state.temp}/>
              </View>
              <View className='imgsDiv'>
                 {imagesContent}
                 
              </View>
           </View>
           <View><AtButton className='btnsubmit' onClick={this.submitRefund}>立即提交</AtButton></View>
        </View>
    )
  }
}


