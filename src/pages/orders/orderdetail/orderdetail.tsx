import Taro, { Component, Config, MapContext } from '@tarojs/taro'

import { Map, CoverView, Canvas, View, Image, CoverImage, Button, Text } from '@tarojs/components'

import { BASE_URL, globalData, PATH, systemUser } from '../../../config/index.js';

import './index.scss'
import Path from 'src/cax/render/display/shape/path.js';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
interface IState {
  orderid: string,
  whereis: string,
  showTuihuo: boolean,
  order: object,
  state0: string,
  state1: string,
  state3: string,
  state4: string,
  state5: string,
  state6: string,
  state70: string,
  state71: string,
  state8: string,
  state9: string,
  icon1: string,
  refundhistory:object,
  worksheet:object,
  isrefundhistory:boolean
}

class Orderdetail extends Component<{}, IState>{

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config = {
    navigationBarTitleText: '订单详情'
  }
  constructor(props: {} | undefined) {
    super(props)
    this.state = {
      orderid: '',
      whereis: '',
      showTuihuo: true,
      order: [],
      icon1: PATH + '/mImages/fkz.png',
      state0: PATH + '/mImages/gwz1.png',
      state1: PATH + '/mImages/ddqk.png',
      state3: PATH + '/mImages/ddqk.png',
      state4: PATH + '/mImages/ddqk.png',
      state5: PATH + '/mImages/ddqk.png',
      state6: PATH + '/mImages/ddqk.png',
      state71: PATH + '/mImages/ddxqwcl.png',
      state70: PATH + '/mImages/ddxqwcl.png',
      state8: PATH + '/mImages/ddqk.png',
      state9: PATH + '/mImages/ddqk.png',
      refundhistory:{},
      isrefundhistory:false,
      worksheet:{}
    }
  }

  componentWillMount() {
    
    console.log(this.$router.params)
    Taro.setStorageSync("routerinfo", this.$router.params);

    this.setState({
      orderid: this.$router.params.orderid
    })
    if (this.$router.params.whereis) {
      this.setState({
        whereis: this.$router.params.whereis
      })
    }
    if (this.$router.params.whereis == 'weight' || this.$router.params.whereis == 'cgshop') {
      this.setState({
        showTuihuo: false
      })
    }
    this.getDetail();
  }
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  getDetail() {
    const routerinfo = Taro.getStorageSync('routerinfo');
    Taro.showLoading({
      title: '',
    });
    var that = this;
    Taro.request({
      url: BASE_URL + 'order/detail',
      data: {
        orderid: routerinfo.orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log("成功！");
        console.log('订单列表：')
        console.log(res.data.data);
        if (res.data.data.machinename == null) {
          res.data.data.machinename = '无';
        }
        if (res.data.data.dailaddress == null) {
          res.data.data.dailaddress = '无';
        }
        Taro.hideLoading();
        that.setState({
          order: res.data.data
        });
        if (res.data.data.haveworksheet == 1) {
          that.getWorksheet();
          console.log("失败！");

        }
        console.log("轮询");
        that.getRefund();
      }
    })
  }
  getWorksheet() {
    var that = this;
    const routerinfo = Taro.getStorageSync('routerinfo');
    Taro.request({
      url: BASE_URL + 'order/worksheet',
      data: {
        orderid: routerinfo.orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 200){
          that.setState({
            worksheet: res.data.data
          });
        }else{

        }

      }
    })
  }
  getRefund() {
    var that = this;
    const routerinfo = Taro.getStorageSync('routerinfo');
     Taro.request({
      url: BASE_URL + 'order/refundhistory',
      data: {
        orderid: routerinfo.orderid
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': globalData.token
      },
      success: function (res) {
        console.log('refundhistory:')
        console.log(res.data.data);
        
        if (res.data.data != undefined && res.data.data.refundstatus == 3){
          
          that.setState({
            isrefundhistory:true,
            refundhistory: res.data.data
          });
        }else{
          that.setState({
            isrefundhistory:false
          });
        }
        
      }
    })
  }
  goKefu() {
    console.log('微信客服')
    Taro.navigateTo({
      url: '/pages/service/service'
    })
  }
  gotoBack() {
    //回到首页
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  ontoAnswer(e) {
    console.log('订单编号：')
    console.log(e)
    var orderid = e.currentTarget.dataset.orderid;
    Taro.navigateTo({
      url: '/pages/refund/refund?orderid='+orderid
    })
  }
  ontopay() {
    //申请退款
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    const { order } = this.state;
    console.log("order")
    console.log(order)
    let orderContent;
    if (order.orderstatus == 0) {

      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>交易已完成</View>
      </View>
    }
    if (order.orderstatus == 9) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>异常订单</View>
      </View>
    }
    if (order.orderstatus == 8) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>交易已完成</View>
      </View>
    }
    if (order.orderstatus == 7 && order.refunding == 1) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>退款中</View>
      </View>
    }
    if (order.orderstatus == 7 && order.refunding == 0) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>转退款</View>
      </View>
    }

    if (order.orderstatus == 6) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>已欠费</View>
      </View>
    }
    if (order.orderstatus == 5) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>已付款</View>
      </View>
    }
    if (order.orderstatus == 4) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>待支付</View>
      </View>
    }
    if (order.orderstatus == 3) {
      orderContent = <View>
        <Image className='shopImg' src={this.state.state0} />
        <View className='shoptitle'>已取消</View>
      </View>
    }

    let Buttonstate;
    let Buttonstate1;

    if (order.orderstatus == 5 && order.haveworksheet == 0 && order.totalfee > 0 && this.state.showTuihuo) {
      Buttonstate = <Button className='toSever1' data-orderid={order.orderid} onClick={this.ontoAnswer}>申请退款</Button>
    }else if (order.orderstatus == 5 && order.haveworksheet == 1 && order.totalfee > 0 && this.state.showTuihuo) {
      Buttonstate = <Button className='toSever1'>已反馈</Button>
    }else{
      Buttonstate = <Button className='toSever1' onClick={this.goKefu}>联系客服</Button>
    }
    // if (order.orderstatus !== 7) {
    //   Buttonstate1 = <Button className='selBtn' data-orderid={order.orderid} onClick={this.ontoAnswer}>问题反馈</Button>
    // }


    const _paytypes = order.paytypes.map((item) => {
      return (
        <View>{item.paytype}：{item.payfee / 100}元</View>
      )
    })

    const goodsitem = order.goods.map((item) => {
      return (
        <View className='glist'>
          <Image className='goodsImg' src={item.picurl} />
          <View ></View>
          <View className='goodsInfo'>
            <View className='goodsName'>商品:{item.goodsname}</View>
            <View className='line1'>

              <View className='goodsPrice'>价格：{item.unitfee / 100}</View>
              <View className='acount'>数量：{item.amount}</View>
            </View>
            <View className='line1'>
              <View className='goodsge'>规格:{item.spec}</View>
              <View className='total'>总价：{item.totalfee / 100}元</View>
            </View>
          </View>
        </View>
      )
    })

    return (
      <View className='smain'>
        <View className='shopDiv'>
          {orderContent}
        </View>
        <View className='addr'>
          <Image className='addricon' src={this.state.icon1} />
          <View className='addr1'>{this.state.order.machinename}</View>
          <View className='addr2'>{this.state.order.location}{this.state.order.dailaddress}</View>
          {Buttonstate}
        </View>
        <View className='seDiv'>
          <View className='selectDiv'>
            <View className='seltitle'>所选商品</View>
            <View className='seltotal'>合计：{this.state.order.payfee / 100}元</View>
          </View>
          <View className='goodslist'>
            {goodsitem}
          </View>
        </View>
        <View className='orderdetail'>
          <View className='selectDiv'>
            <View className='seltitle'>订单信息</View>
            {Buttonstate1}
          </View>
          <View className='seltInfo'>
            {_paytypes}
            <View>优惠总额：{this.state.order.totalpromotion / 100}元</View>
            <View>订单编号：{this.state.order.orderno}</View>
            <View>交易流水：{this.state.order.serialno}</View>
            <View>交易日期：{this.state.order.createtime}</View>
          </View>
        </View>
       
        <View className='worksheet' >
        {this.state.order.haveworksheet==1?
          <View className='selectDiv'>
            <View className='seltitle'>问题反馈</View>
          </View>
          :
          ''
          }
          {this.state.order.haveworksheet==1?
          <View className='answerDiv'>
            <View className='answer1'>反馈来源：{worksheet.sourcename}</View>
            <View className='answer1'>服务类型：{worksheet.problemname}</View>
            <View className='answer1'>问题备注：{worksheet.wsdescription}</View>
            <View className='answer1'>处理状态：{worksheet.status}</View>
            <View className='answer1'>处理时间：{worksheet.updatetime}</View>
            <View className='answer1'>处理备注：{worksheet.remark}</View>
            
            <View className='answer1'>问题图片：</View>
            <View className='pics'>
              <Image className='img1' src={worksheet.pic1 ? worksheet.pic1  : ''} />
              <Image className='img1' src={worksheet.pic2 ? worksheet.pic2  : ''} />
              <Image className='img1' src={worksheet.pic3 ? worksheet.pic3  : ''} />
              <Image className='img1' src={worksheet.pic4 ? worksheet.pic4  : ''} />
            </View>
          </View>
        :
        ''
          }
        </View>
        {this.state.isrefundhistory?
        <View className='worksheet1'>
        <View className='selectDiv'>
          <View className='seltitle'>退款记录</View>
        </View>
        <View>
          <View className='answer1'>退款金额：¥{this.state.refundhistory.realfee/100}</View>
          <View className='answer1'>退款流水：{this.state.refundhistory.serialno}</View>
          <View className='answer1'>退款时间：{this.state.refundhistory.fefundtime}</View>
        </View>
      </View>
      :
      ''
        }
        


        <View>
          {/* <Button type='default' className='Btn'>刷 新</Button> */}
          {this.state.order.orderstatus==6 &&this.state.order.orderstatus==4?
          <Button type='default' className='btn'> 支付 </Button>
          :
          ''
          }
          <Button type="default" className='btn' onClick={this.gotoBack}> 返回 </Button>

        </View>
      </View>
    )
  }
}


