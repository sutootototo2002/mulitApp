if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../npm/taro-ui/dist/weapp/components/input/index');
require('../../npm/taro-ui/dist/weapp/components/loading/index');
require('../../npm/taro-ui/dist/weapp/components/button/index');
require('../../npm/taro-ui/dist/weapp/components/tabs/index');
require('../../npm/taro-ui/dist/weapp/components/tabs-pane/index');
require('../../npm/taro-ui/dist/weapp/components/activity-indicator/index');
require('../../npm/taro-ui/dist/weapp/components/textarea/index');
require('../../pages/index/index');
require('../../pages/personal/index');
require('../../pages/recharge/recharge');
require('../../pages/wish/likes/myheart');
require('../../pages/login/login');
require('../../pages/service/service');
require('../../pages/index/shopping/index');
require('../../pages/index/cgshopping/index');
require('../../pages/orders/orderdetail/orderdetail');
require('../../pages/orders/orderlist/orderlist');
require('../../pages/box/boxdetail/boxdetail');
require('../../pages/card/bindcard');
require('../../pages/box/open/open');
require('../../pages/box/qropen/qropen');
require('../../pages/refund/refund');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}