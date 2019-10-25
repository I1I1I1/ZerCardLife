<template>
		<view style="height: 100%;">
			
			
			<view class="container" v-show="ifShow">
				<view class="nav">
					<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
					<view class="nav-list" id="life0">选择店铺</view>
					<view class="nav-list"></view>
				</view>
				<view class="qrimg">
					<view class="qrimg-i">
						<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" 
						:background="background" :foreground="foreground" :pdground="pdground" :icon="icon" 
						:iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
					</view>
				</view>
			</view>
			<view class="order" v-show="shops">
		   <view class="nav">
		   	<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
		   	<view class="nav-list" id="life0">选择店铺</view>
		   	<view class="nav-list"></view>
		   </view>
			<view class="contentlist">
				<view class="orderlist" @click="shopInfo(shoplist)" v-for="(shoplist,index) in shoplists" :key="index">
					<view>
						<image :src="shopIcon" class="shopicons"></image>
					</view>
					<view class="shopinfos">
						<view class="shopname">
							<view>
								{{shoplist.shop_name}}
							</view>
							<view><image :src="rightDirIcon" mode="" class="toRightIndex"></image></view>
						</view>	
						<view class="dress">{{shoplist.shop_address}}</view>
					</view>
				</view>
			</view>
		    <view class="foot" @click="newShop"  v-show="shops">
		    	<button class="btn">新增店铺</button>
		    </view>
			</view>
	</view>
	
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	var _self;
	export default {
		components: {
		    uniSwipeAction,
			tkiQrcode
		},
		data() {
			return {
				shops:false,
				shop_pkid:"",
				shoplists:[],
				openid:"",
				fanhuiIcon:'',//返回图片
				shopIcon:'',//店铺图片
				rightDirIcon:'',//向右指向图片
				createby:'',//创建人
				mi_pkid:'',//会员id
				
				ifShow: false,
				val: '二维码', // 要生成的二维码值
				size: 300, // 二维码大小
				unit: 'upx', // 单位
				background: '#000', // 背景色
				//foreground: '#309286', // 前景色
				foreground:"#fff",
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 800, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' ,// 二维码生成后的图片地址或base64,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(e) {
			let _this = this;
			_this.openid = e.openid;
			_this.val = e.openid;
			console.log("new_openid",_this.openid);
			_this.fanhuiIcon = _this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png';
			_this.shopIcon = _this.httpUrl+'file/static/home/shopIcon.png';
			_this.rightDirIcon = _this.httpUrl+'file/static/home/rightDir.png';
		
			uni.request({
				url: _this.httpUrl+'v_employee_shopController/find.xsh?openid='+_this.openid,
				method: 'GET',
				//header: {'content-type': "application/x-www-form-urlencoded"},
				data:{},
				success(res) {
					console.log("获取店铺信息",res);
					
						_this.shoplists = [];
						let obj = res.data.obj;
						 for(let k in obj){
							_this.shoplists.push({
								"shop_pkid":obj[k].shop_pkid,
								"emp_pkid":obj[k].emp_pkid,
								"emp_role_pkid":obj[k].emp_role_pkid,
								"shop_name":obj[k].shop_name,
								"shop_address":obj[k].shop_address,
								"emp_name":obj[k].emp_name,
								"mi_pkid":obj[k].mi_pkid,
								"emp_phone":obj[k].emp_phone,
								"personImg":obj[k].remark1,
								"idcardval":obj[k].remark2,
								"datepos":obj[k].updated_date
							})
						} 
						_this.createby = obj[0].mi_pkid;
						_this.mi_pkid = obj[0].mi_pkid;
						
						_this.emp_name = obj[0].emp_name;
						_this.emp_sex = obj[0].emp_sex;
						_this.emp_phone = obj[0].emp_phone;
						_this.remark1 = obj[0].remark1;
						_this.remark5 = obj[0].remark2;
						_this.remark3 = obj[0].remark3;
						_this.remark4 = obj[0].updated_date;
						
						let shoppkid = obj[0].shop_pkid;
						let emp_pkid = obj[0].emp_pkid;
						let emp_role_pkid = obj[0].emp_role_pkid;
						let mi_pkid = obj[0].mi_pkid;
						
						
						
						let personImg = obj[0].remark1;//头像  
						let emp_name = obj[0].emp_name; //姓名
						let emp_phone = obj[0].emp_phone; //手机号
						let idcardval = obj[0].remark2; //身份证号
						let shop_name = obj[0].shop_name;  //店铺
						let datepos = obj[0].updated_date; //入职日期
						let len = obj.length;
						
					if(emp_role_pkid == "2"){
						_this.shops = true;
						_this.ifShow = false;
					}else if(emp_role_pkid == "3" || emp_role_pkid == "员工"){
							let personinfo = {
								personImg,
								emp_name,
								emp_phone,
								idcardval,
								shop_name,
								datepos,
								emp_role_pkid
							}
							uni.setStorageSync('shop_pkid',shoppkid);
							uni.setStorageSync('emp_name',emp_name);
							uni.setStorageSync('emp_pkid',emp_pkid);
							uni.setStorageSync('emp_role_pkid',"3");
							uni.setStorageSync('mi_pkid',mi_pkid);	
							//缓存个人信息
							uni.setStorageSync('personinfo',personinfo);	
							 setTimeout(()=>{
								uni.switchTab({
									url:"../homelistpage/homelistpage"
								})
							},10) 
							_this.shops = true;
							_this.ifShow = false;
					}
					else{
						_this.shops = false;
						_this.ifShow = true;
					}
					
				},
				fail(err) { 
						
					console.log("响应失败",err);
				}
			});
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			
			//跳到详情
			shopInfo(e){
				console.log("e",e);
				let _this = this;
				let shoppkid = e.shop_pkid;
				let empname = e.emp_name;
				let emp_pkid = e.emp_pkid;
				let emp_role_pkid = e.emp_role_pkid;
				let mi_pkid = e.mi_pkid;
				
				let personImg = e.personImg;  
				let emp_name = e.emp_name; 
				let emp_phone = e.emp_phone; 
				let idcardval = e.idcardval; 
				let shop_name = e.shop_name;  
				let datepos = e.datepos; 
			
				let personinfo = {
					personImg,
					emp_name,
					emp_phone,
					idcardval,
					shop_name,
					datepos,
					emp_role_pkid
				}
				
				uni.setStorageSync('shop_pkid',shoppkid);
				uni.setStorageSync('emp_name',empname);
				uni.setStorageSync('emp_pkid',emp_pkid);
				uni.setStorageSync('emp_role_pkid',emp_role_pkid);
				uni.setStorageSync('mi_pkid',mi_pkid);	
				uni.setStorageSync('personinfo',personinfo);	
				 uni.showToast({
					title:"加载中...",
					icon:"loading"
				}); 
				 setTimeout(()=>{
					uni.switchTab({
						url:"../homelistpage/homelistpage"
					})
				},2000) 
			},
			//新增店铺页面
			newShop(){
				uni.showToast({
					title:"加载中...",
					icon:"loading"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pagesB/shopIncrease/shopIncrease?openid="+_this.openid + "&createby=" + _this.createby + "&mi_pkid=" + _this.mi_pkid
						      +"&emp_name= " + _this.emp_name
						      +"&emp_sex= " + _this.emp_sex
						      +"&emp_phone=" + _this.emp_phone
						      +"&remark1=" + _this.remark1
						      +"&remark5=" + _this.remark5
						      +"&remark3=" + _this.remark3
						      +"&remark4= " + _this.remark4
					})
				},2000)
				
			},
			
			
			creatQrcode() {//生成二维码
				this.$refs.qrcode._makeCode()
			}
		}
	}
</script>

<style>
	
	/******最外层*****/
	html,body,.order{
		height: 100%;
		padding: 0;
		overflow: hidden;
		background-color: #F0F0F0;
	}
	.order{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	/****导航****/
	
	.nav{
		display: flex;
		height: 68px;
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
		left: 20upx;
	}
	/***主体****/
	.contentlist{
		overflow: auto;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.contentlist::-webkit-scrollbar{
		width: 0upx;
	}
	
	
	/**店铺列表**/
	.orderlist{
		background-color: #fff;
		width: 680upx;
		height: 180upx;
		margin-top: 40upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: nowrap;
		border-radius: 8upx;
		align-items: center;
		padding: 30upx 30upx 20upx 20upx;
		box-sizing: border-box;
	}
	
	.shopicons{
		width: 135rpx;
		height: 135rpx;
	}
	
	.olist>view{
		flex: 1;
		box-sizing: border-box;
	}
	.shopinfos{
		flex: 2;
		padding-left: 50upx;
		box-sizing: border-box;
	}
	.shopname{
		display: flex;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		font-size: 15pt;
	}
	.dress{
		color: #666666;
		font-size: 13pt;
		padding-top: 10upx;
		box-sizing: border-box;
	}
	.toRightIndex{
		width: 30upx;
		height: 30upx;
		color: #666666;
	}
	/**底部**/
	.foot{
		background-color: #FAFAFA;
		width: 100%;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.foots{
		flex: 1;
	}
	.btn{
		width: 100%;
		height: 90upx;
		background-color: #F87D24;
		color: #fff;
		font-weight: bold;
		border-radius: 4pt;
		border: transparent;
		line-height: 90upx;
		font-size: 1rem;
	}
	
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 99%;
		height: 500upx;
		overflow: hidden;
	}
	
	.qrimg {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		
	}
	.qrimg-i{
		margin-right: 10px;
	}
	
	.slider {
		width: 100%;
	}
</style>

	
