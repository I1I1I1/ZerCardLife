(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"04a8":function(e,t,n){"use strict";n.r(t);var o=n("a41e"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=i.a},"24c7":function(e,t,n){"use strict";n.r(t);var o=n("df20"),i=n("04a8");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("5da1");var u=n("2877"),c=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=c.exports},"4ae4":function(e,t,n){},"5da1":function(e,t,n){"use strict";var o=n("4ae4"),i=n.n(o);i.a},"6ad3":function(e,t,n){"use strict";n("d3e6");var o=a(n("b0ce")),i=a(n("24c7"));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,o.default)(i.default))},a41e:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{username:"",userpwd:"",code:"",openid:"",name:"",face:"",sign:""}},methods:{getunicode:function(t){console.log("code",t);var n=this;e.request({url:this.weixinUrl+t,method:"GET",header:{"content-type":"application/x-www-form-urlencoded"},data:{},success:function(t){console.log("userResult",t),n.openid=t.data.openid,e.showToast({icon:"success",title:"登录成功！"}),e.setStorageSync("openid",n.openid),e.navigateTo({url:"../home/home"})},fail:function(e){console.log(e)}})},wxLogin:function(t){var n=this;if(console.log("res1",t),!t.detail.iv)return e.showToast({title:"您取消了授权，登录失败",icon:"none"}),!1;e.login({provider:"weixin",success:function(t){var o=t.code;n.code=o,e.showToast({title:"获取许可完毕"}),n.getunicode(o)},fail:function(){console.log("loginfail!"),null!=timeout&&(clearTimeout(timeout),timeout=null)}})}}};t.default=n}).call(this,n("543d")["default"])},df20:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:"content"},[n("h1",[e._v("0卡生活")]),n("view",{staticClass:"contentview"},[n("image",{staticClass:"logbg",attrs:{src:"../../static/loginbg/loginbg.png",mode:""}}),n("button",{attrs:{"open-type":"getUserInfo",type:"primary",withCredentials:"true",eventid:"57b6ce02-0"},on:{getuserinfo:e.wxLogin}},[e._v("微信授权登录")])],1)],1)},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})}},[["6ad3","common/runtime","common/vendor"]]]);