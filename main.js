import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false

App.mpType = 'app'
var APITOKEN  = 'api2018';

Vue.prototype.idcardreg =   /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证验证
Vue.prototype.num = /\d{n}$/;//数字验证
Vue.prototype.tell = /^1[3456789]\d{9}$/;//手机号验证
Vue.prototype.phone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;//座机
Vue.prototype.money = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;//金额验证

Vue.prototype.weixinUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx14ff1851c13b404a&secret=48e67155136135d7613629bbf9e9b788&grant_type=authorization_code&js_code=';//0卡

 Vue.prototype.httpUrl="http://172.16.1.8:8080/ZeroCardSmall/"; // 贾帅
 // Vue.prototype.httpUrl="http://172.16.1.210:8080/ZeroCardSmall/"; // 服务器


App.mpType = 'app'

	 Vue.filter('keepnum',function(value){
			value = Number(value)
			return value.toFixed(2);
	})

const app = new Vue({
    ...App
})
app.$mount()

 



