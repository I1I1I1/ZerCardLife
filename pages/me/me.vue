<template>
	<view class="">
		<view class="nav">
			<view class="nav-list"></view>
			<view class="nav-list" id="life0">我的</view>
			<view class="nav-list"></view>
		</view>
		<view class="bascinfo">
			
			<image  class="huiyuan_img" :src="image"></image>
			
			<label v-show="loginshow" class="login" @click="loginchoose">登录</label>
			
		</view>
		<view class="contentlist">
			
			<view class="xinin_x">
				<label class="inputlabel">姓名</label>
				<view  class="inputlist">
					{{ username }}
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">手机号</label>
				<view  class="inputlist">
					{{ userphone }}
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">身份证号</label>
				<view  class="inputlist">
					{{idcardval}}
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">店铺名称</label>
				<view  class="inputlist">
					{{ shopname }}
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">入职时间</label>
				<view  class="inputlist">
					{{datepos}}
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">账号权限</label>
				<view  class="inputlist">
					{{poscheck}}
				</view>
			</view>
			<view class="xinin_x" v-show="exitshow">
				<button @click="exit" class="exit">退出登录</button>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
	data(){
		return {
			loginshow:true,
			exitshow:false,
			fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',//返回图片
			shop_pkid:"",//店铺id
			image:this.httpUrl+'file/static/uptouxiang.png',
			shopname:'',//店铺名称
			username:'',//员工姓名
			usersex:'',//性别
			userphone:'',//电话号
			posstate:'',//职位状态
			idcardval:'',//身份证号
			datepos:'',//入职时间
			idvalues:[
				{text:"普通员工",value:"3"},
				{text:"店长",value:"2"}
			],//职位
			poscheck:'',
			idnum:'',//权限账号
			memberIntro:'',//员工简介
		}
	},
	onShow() {
		let _this = this;
		let personinfo = uni.getStorageSync("personinfo");
		console.log("person",personinfo)
		if(personinfo != ""){
			let personImg = personinfo.personImg;
			let emp_name = personinfo.emp_name; 
			let emp_phone = personinfo.emp_phone; 
			let idcardval = personinfo.idcardval; 
			let shop_name = personinfo.shop_name;  
			let datepos = personinfo.datepos; 
			let emp_role_pkid = personinfo.emp_role_pkid;
			
			_this.image = personImg;//头像
			_this.username = emp_name;//员工姓名
			_this.userphone = emp_phone;//电话号
			_this.idcardval = idcardval;//身份证
			_this.shopname = shop_name;//店铺名称
			_this.datepos = datepos;//入职时间
			_this.idnum = emp_role_pkid;//权限账号
			
			if(_this.image == null || _this.image == "0"){
				_this.image =_this.httpUrl+'file/static/uptouxiang.png';
				console.log("_this.image1",_this.image)
			}
			if(_this.idnum == "2"){
				_this.poscheck = "店长";
			}else if(_this.idnum == "3"){
				_this.poscheck = "普通员工";
			}
			_this.loginshow=false;
			_this.exitshow=true;
		}else{
			_this.image=this.httpUrl+'file/static/uptouxiang.png';
			_this.loginshow=true;
			_this.exitshow=false;
		}
	},
	methods: {
		back(){
			uni.switchTab({
				url:"../homelistpage/homelistpage"
			});
		},
		//退出
		exit(){
			let _this = this;
		   uni.clearStorageSync();
		    _this.image=this.httpUrl+'file/static/uptouxiang.png';//头像
		   _this.username = "";//员工姓名
		   _this.userphone = "";//电话号
		   _this.idcardval = "";//身份证
		   _this.shopname = "";//店铺名称
		   _this.datepos = "";//入职时间
		   _this.poscheck = "";//权限账号
		  
		   	_this.loginshow = true;
		   	_this.exitshow = false;   
		},
		//登录
		loginchoose(){
		   uni.navigateTo({
			   url:"../index/index"
		   })	
		}
	}
	
};
</script>

<style>
	html,body{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
/****导航****/
	.contentlist{
		padding:0 40upx 0upx 40upx;	
		box-sizing: border-box;
		height: 100%;
		overflow: auto;
	}
	.nav{
		display: flex;
		height: 75px;
		background: linear-gradient(to right,#F54D28,#FB9723);
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: bolder;
		padding-top: 27upx;
		flex-wrap: nowrap;
		padding-left: 25upx;
		width: 100%;
		box-sizing: border-box;
	}
	.nav-list{
		flex: 1;
	}
	.back{
		position: relative;
		top: 2upx;
	}
	#life0{
		position: relative;
		left: 50upx;
		
	}

   .bascinfo{
	   background: url(../../static/bejing1.png);
	   background-repeat: no-repeat;
	   background-size: 100% 100%;
	   height: 300upx;
	   width: 100%;
	   display: flex;
	   flex-direction: column;
	   justify-content: center;
	   align-items: center;
	   box-sizing: border-box;
   }
   .touxiangicon{
	   width: 100%;
	   display: flex;
	   justify-content: center;
   }
   .login{
	   color: #fff;
	   margin-top: 20upx;
	   position: relative;
	   left: -20upx;
   }
 
.huiyuan_img{
	height: 130upx;
	width: 130upx;
	border-radius: 50%;
	
}
/**填入信息**/
	.xinin_x{
		display: flex;
		width: 100%;
		line-height: 85upx;
		flex-wrap: nowrap;
		align-items: center;
	}
	.xinin_x:not(:last-child){
		 border-bottom: 1px solid #E5E5E5; 
	}
	
	.huiyuan_img{
		height: 180upx;
		width: 180upx;
		border-radius: 50%;
		margin-right: 30upx;
	}
	.xin_y3 {
		position: relative;
		font-weight: normal;
		font-size: 0.8rem;
	}
	
	.selicon{
		width: 20upx;
		height: 20upx;
	}
	.inputlabel{
		flex: 1;
		color: #333333;
		font-size: 0.8rem;
		white-space: nowrap;
	}
	.inputlist{
		flex: 3;
		color: #999;
		font-size: 0.8rem;
		white-space: nowrap;
	}
	
   
	::-webkit-scrollbar{
		width: 0upx;
	}
   
	.exit{
		height: 88upx;
		line-height: 88upx;
		color: #fff;
		background: #E54D42;
		font-size: 0.8rem;
		margin-top: 20upx;
	}
	
</style>
