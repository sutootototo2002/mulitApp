# mulitApp 智能机柜C端(小程序端)  #

## 一、开发环境安装 ##

### 1、node 环境安装 ###
    地址：https://nodejs.org/zh-cn/
    开发时的版本v10.15.0


### 2、Taro框架安装 ###
    安装地址：https://taro.aotu.io/
    taro-ui地址：https://taro.aotu.io/

### 3、mulitApp接口文档 ###
    地址：http://doc.wemall.com.cn/web/#/13?page_id=338

### 4、小程序图片在腾讯云上 ###
       
	小程序静态文件测试地址	shoptestapp-1253877534.cos.ap-beijing.myqcloud.com	| shopapp.wemall.com.cn
	小程序静态文件地址	shopapp-1253877534.cos.ap-beijing.myqcloud.com   |shoptestapp.wemall.com.cn


### 5、github存储 ###

      https://github.com/sutootototo2002/mulitApp.git

### 6、小程序node.js版本切换工具 ###
    
    nvm版本切换工具:https://github.com/coreybutler/nvm-windows/releases
    node版本查看:https://nodejs.org/zh-cn/download/releases/

    （主要用于小程序云开发平台,如果不是可以忽略）

### 7、小程序配置输出颜色###

    满足私人定制的需求：只需在网页上指定颜色，即可生成不同色系的UI组件
    custom-variables.scss
	
	/* 改变主题变量，具体变量名可查看 taro-ui/dist/style/variables/default.scss 文件 */
	$color-brand:#ff9409;
	////* 引入 Taro UI 默认样式 */
	@import "~taro-ui/dist/style/index.scss";

    app.tsx
     window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ff9409',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }

### 8、小程序打包命令 ###

    微信:npm run dev:weapp
    支付宝:npm run dev:alipay


### 9、小程序模块开发 ###

 1、首页地图开发

   1.获取页面信息接口（默认定位在天安门）
	
	   Taro.getSystemInfo({
	      success: res => {
	          console.log(res);
	      }
	    })


    {"errMsg":"getSystemInfo:ok", //调用成功
     "model":"iPhone5", //手机型号
	 "pixelRatio":2,
	 "windowWidth":320, 窗口宽
	 "windowHeight":504, 窗口高
	 "system":"iOS 10.0.1", //系统
	 "language":"zh",  //中文
	 "version":"6.6.3",
	 "screenWidth":320, //屏幕宽
	 "screenHeight":568,//屏幕高
	 "SDKVersion":"2.6.6",
	 "brand":"devtools",
	 "fontSizeSetting":16,
	 "batteryLevel":100,
	 "statusBarHeight":20, //状态栏的高
	 "platform":"devtools"}

   2.获取用户定位（如果没有定位,提示去设置）
      
      原定位类型：type:wgs84

      现在定位类型：type:gcj02

      Taro.openSetting 改为： Taro.chooseLocation 具体接口见文档

    