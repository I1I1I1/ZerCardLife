(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/kakai_dengjixuanren/kakai_dengjixuanren"],{1006:function(e,a,n){"use strict";var i=function(){var e=this,a=e.$createElement;e._self._c;e._isMounted||(e.e0=function(a){e.flag=!e.flag},e.e1=function(a){e.flag=!e.flag})},t=[];n.d(a,"a",function(){return i}),n.d(a,"b",function(){return t})},"2f0a":function(e,a,n){"use strict";n.r(a);var i=n("bbbd"),t=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(a,e,function(){return i[e]})}(s);a["default"]=t.a},"63a3":function(e,a,n){},bbbd:function(e,a,n){"use strict";(function(e,i){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var t=function(){return n.e("components/uni-drawer/uni-drawer").then(n.bind(null,"b216"))},s={components:{uniDrawer:t},data:function(){return{fanhuiIcon:this.httpUrl+"file/static/order/jiehznag-icon-fanhui.png",iconsel:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-sel@3x.png",iconNosel:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-nor@3x.png",chongzhiiconsousuo:this.httpUrl+"file/static/chongzhi_sousuo/chongzhi-icon-sousuo@2x.png",isCheckState:0,isCheckSex:0,sexvalues:[{text:"男性",value:1},{text:"女性",value:2}],agevalues:[{text:"少年",value:1},{text:"青年",value:2},{text:"中年",value:3},{text:"老年",value:4}],imageURL:"",name:"",phone:"",sex:"",age:"",card_name_type:"",mct_pkid:"",mctd_money:"",mctd_name:"",saleCheck:"",drawerisCheckState:-1,isZhiFuState:0,keywords:"",flag:!1,mainSalesManTimes:"",zhifuname:"微信支付",number:"",mainSalesMan:"",mainSalesManEmp_no:"",mainSalesAss:"",mainSalesAssManEmp_no:"",salesMan:[],payStype:[{zhifuname:"微信支付",image:this.httpUrl+"file/static/settle/jiezhang-icon-wxzf@3x.png"},{zhifuname:"支付宝支付",image:this.httpUrl+"file/static/settle/jiezhang-icon-zfbzf@3x.png"},{zhifuname:"现金支付",image:this.httpUrl+"file/static/settle/jiezhang-icon-xjzf@3x.png"}],selectEmpInfo:"",startCardTime:"",remark3:"",shop_pkid:""}},methods:{cha:function(){this.mainSalesAss=""},back:function(){e.navigateBack({delta:1})},agechange:function(e,a){this.isCheckState=e,console.log(i("ageval",a," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:277")),this.age=a.text.substring(0,1),console.log(i("this.age",this.age," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:279"))},sexChange:function(e){this.isCheckSex=e,console.log(i("this.isCheckSex",this.isCheckSex," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:283"))},go_kaika_xuanren:function(){var a=this;a.name=a.name,console.log(i(a.name," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:288")),a.phone=a.phone,console.log(i(a.phone," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:290")),a.sex=a.isCheckSex,a.age=a.age,console.log(i(a.age," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:293")),""==a.name?e.showToast({title:"请输入姓名",duration:2e3,icon:"none"}):""==a.phone&&e.showToast({title:"请输入联系电话",duration:2e3,icon:"none"})},search:function(e){console.log(i(e," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:313")),this.salesMan=[],this.selectEmpInfo=this.keywords,this.getSales(),console.log(i("selectEmpInfo",this.selectEmpInfo," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:317"))},salesManChange:function(e,a){this.drawerisCheckState=a,this.mainSalesManTimes=e.name,this.number=e.number},SalesMan:function(){this.flag=!this.flag,this.saleCheck="主销售"},SalesAss:function(){this.flag=!this.flag,this.saleCheck="副销售"},changeMainSalesMan:function(){"主销售"===this.saleCheck?(this.mainSalesMan=this.mainSalesManTimes,this.mainSalesManEmp_no=this.number,this.drawerisCheckState=-1):"副销售"===this.saleCheck&&(this.mainSalesAss=this.mainSalesManTimes,this.mainSalesAssManEmp_no=this.number,console.log(i("this.mainSalesAssManEmp_no",this.mainSalesAssManEmp_no," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:348")),this.drawerisCheckState=-1),this.flag=!1},zhifuChange:function(e,a){this.isZhiFuState=e,this.zhifuname=a.zhifuname},getSales:function(){var a=this;a.shop_pkid=a.shop_pkid;var n=a.selectEmpInfo;e.request({url:a.httpUrl+"Jni_EmployeeController/selectEmployee.xsh",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{shop_pkid:a.shop_pkid,selectEmpInfo:n},success:function(e){console.log(i("resww(销售人员)",e," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:376"));for(var n=e.data.obj,t=0;t<n.length;t++)a.salesMan.push({name:n[t].emp_name,number:n[t].emp_no,image:n[t].remark1})},fail:function(e){console.log(i("响应失败",e," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:390"))}})},addCard:function(){var a=this;a.card_name=a.mctd_name,a.mi_pkid=a.mi_pkid,a.balance=a.balance,a.number_of_use=a.mctd_frequency,a.card_level_discount=a.mctd_discount,a.open_day=a.mctd_month,a.mct_pkid=a.mct_pkid,a.mctd_pkid=a.mctd_pkid,a.shop_pkid=a.shop_pkid,a.created_by=a.mainSalesManEmp_no,a.mct_img=a.imageURL,a.remark2=a.mainSalesAssManEmp_no,a.remark3=a.zhifuname,a.prople_name=a.name,a.prople_mobile=a.phone,a.prople_sex=a.sex,a.prople_age=a.age,""==a.created_by?e.showToast({title:"主销售不能为空",duration:2e3,icon:"none"}):e.request({url:a.httpUrl+"/Jni_Member_CardController/addCard.xsh",method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},data:{card_name:a.card_name,mi_pkid:a.mi_pkid,balance:a.balance,open_day:a.open_day,number_of_use:a.number_of_use,mtcd_discount:a.card_level_discount,mctd_pkid:a.mctd_pkid,shop_pkid:a.shop_pkid,created_by:a.created_by,mctd_img:a.mct_img,remark2:a.remark2,remark4:a.remark3,prople_name:a.prople_name,prople_mobile:a.prople_mobile,prople_sex:a.prople_sex,prople_age:a.prople_age},success:function(n){if(console.log(i("确认开卡",n," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:446")),a.oc_code=n.data.oc_code,console.log(i(a.oc_code," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:448")),void 0!==a.oc_code){var t=new Date,s=new Date(t.toString());console.log(i(s," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:452"));var o=s.getFullYear(),c=s.getMonth()+1<10?"0"+(s.getMonth()+1):s.getMonth()+1,r=s.getDate()<10?"0"+s.getDate():s.getDate();a.startCardTime=o+"."+c+"."+r,e.navigateTo({url:"../kaika_success/kaika_success?oc_code="+a.oc_code+"&startCardTime="+a.startCardTime+"&remark3="+a.remark3})}else e.showToast({title:"开卡失败",duration:2e3,icon:"none"})}})}},onLoad:function(e){var a=this;console.log(i("options",e," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:480")),a.shop_pkid=e.shop_pkid,a.imageURL=e.imageURL,a.mct_pkid=e.mct_pkid,a.mctd_pkid=e.mctd_pkid,a.card_name_type=e.name,a.mctd_discount=e.mctd_discount,a.mctd_frequency=e.mctd_frequency,a.mctd_give_money=e.mctd_give_money,a.mctd_name=e.mctd_name,a.mctd_money=e.mctd_money,a.mctd_month=e.mctd_month,a.balance=Number(a.mctd_money)+Number(a.mctd_give_money),console.log(i("_this.balance",a.balance," at pages\\kakai_dengjixuanren\\kakai_dengjixuanren.vue:495")),a.mi_pkid=e.mi_pkid,a.shop_pkid=e.shop_pkid,a.name=e.huiyuanname,a.sex=e.sex,"男"==a.sex?a.isCheckSex=0:"女"==a.sex&&(a.isCheckSex=1),a.phone=e.mi_mobile,a.age=e.age,"少"==a.age?a.isCheckState=0:"青"==a.age?a.isCheckState=1:"中"==a.age?a.isCheckState=2:"老"==a.age&&(a.isCheckState=3),a.getSales()}};a.default=s}).call(this,n("6e42")["default"],n("0de9")["default"])},be9c:function(e,a,n){"use strict";var i=n("63a3"),t=n.n(i);t.a},fc48:function(e,a,n){"use strict";n.r(a);var i=n("1006"),t=n("2f0a");for(var s in t)"default"!==s&&function(e){n.d(a,e,function(){return t[e]})}(s);n("be9c");var o=n("2877"),c=Object(o["a"])(t["default"],i["a"],i["b"],!1,null,null,null);a["default"]=c.exports}},[["0621","common/runtime","common/vendor"]]]);