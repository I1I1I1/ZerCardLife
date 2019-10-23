<template>
	<view class="bg">
		<!---导航区---->
		<view class="life" id="life">0卡生活</view>
		<!----轮播------>
		    <swiper indicator-color="rgba(255,255,255,0.3)" :current="current" indicator-active-color="rgba(255,255,255,1)" autoplay="true" circular="true" :indicator-dots="true" interval="3000" duration="2000" class="lunbo"  @change="change">
		        <swiper-item v-for="(item ,index) in info" :key="index">
					<image :src="item.content"  class="img" mode="aspectFill" ></image>
		        </swiper-item>
		    </swiper>
		<!---更多---->
		<view class="content">
			<view class="more">
				<view class="info"><image :src="labaIcon" class="laba" mode=""></image>置顶消息会在这里滚动通知，去看看</view>
				<view class="more1">更多</view>
			</view>
		</view>
		<!---收银管理---->
		<view class="sygl">
			<view class="sy">
				<view class="ox1"></view><view class="ox">收银管理</view>
			</view>
			<view class="sy1">
				<view class="syDes" @click="orderList">
					<view><image :src="homeiconjz" mode="" class="syimg"></image></view>
					<view class="des">结账</view>
				</view>
				<view class="syDes" @click="order">
					<view><image :src="homeicondingdan" mode="" class="syimg"></image></view>
					<view class="des">订单</view>
				</view>
				<view class="syDes" @click="openCard">
					<view><image :src="homeiconkaika" mode="" class="syimg"></image></view>
					<view class="des">开卡</view>
				</view>
				<view class="syDes" @click="plusMoney">
					<view><image :src="homeiconchongzhi" mode="" class="syimg"></image></view>
					<view class="des">充值</view>
				</view>
			</view>
		</view>
		<!---店铺管理---->
		<view class="sygl">
			<view class="sy">
				<view class="ox1"></view><view class="ox">店铺管理</view>
			</view>
			<view class="sy1">
				<view class="syDes">
					<view><image :src="homeicondpjs" mode="" class="syimg"></image></view>
					<view class="des">店铺介绍</view>
				</view>
				<view class="syDes">
					<view><image :src="homeicondpxc" mode="" class="syimg"></image></view>
					<view class="des">店铺相册</view>
				</view>
				<view class="syDes" @click="personnel">
					<view><image :src="homeiconrsgl" mode="" class="syimg"></image></view>
					<view class="des">人事管理</view>
				</view>
				<view class="syDes">
					<view><image :src="homeiconhygl" mode="" class="syimg"></image></view>
					<view class="des">会员管理</view>
				</view>
			</view>
		</view>
		<!---历史记录---->
		<view class="sygl">
			<view class="sy">
				<view class="ox1"></view><view class="ox">历史记录</view>
			</view>
			<view class="sy1">
				<view class="syDes">
					<view><image :src="homeiconjiezhangjilu" mode="" class="syimg"></image></view>
					<view class="des">结账记录</view>
				</view>
				<view class="syDes">
					<view><image :src="homeiconchongzhijilu" mode="" class="syimg"></image></view>
					<view class="des">充值记录</view>
				</view>
				<view class="syDes">
					<view><image :src="homeiconkaikajilu" mode="" class="syimg"></image></view>
					<view class="des">开卡记录</view>
				</view>
				<view class="syDes">
				</view>
			</view>
		</view>
	</view>
	
	
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	export default {
		data() {
			return {
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'dot',
				dotsStyles: {},
				info:[
					{
						colorClass: 'uni-bg-blue',
						content:this.httpUrl+'file/static/home_img-syzn.png'
					},
					{
						colorClass: 'uni-bg-blue',
						content:this.httpUrl+'file/static/home_img-syzn.png'
					},
				],
				labaIcon:this.httpUrl+'file/static/laba/home-icon-laba.png',
				//收银管理
				homeiconjz:this.httpUrl+'file/static/shouyin/home-icon-jz.png',
				homeicondingdan:this.httpUrl+'file/static/shouyin/home-icon-dingdan.png',
				homeiconkaika:this.httpUrl+'file/static/shouyin/home-icon-kaika.png',
				homeiconchongzhi:this.httpUrl+'file/static/shouyin/home-icon-chongzhi.png',
				//店铺管理
				homeicondpjs:this.httpUrl+'file/static/dianpu/home-icon-dpjs.png',
				homeicondpxc:this.httpUrl+'file/static/dianpu/home-icon-dpxc.png',
				homeiconrsgl:this.httpUrl+'file/static/dianpu/home-icon-rsgl.png',
				homeiconhygl:this.httpUrl+'file/static/dianpu/home-icon-hygl.png',
				//历史记录
				homeiconjiezhangjilu:this.httpUrl+'file/static/lishi/home-icon-jiezhangjilu.png',
				homeiconchongzhijilu:this.httpUrl+'file/static/lishi/home-icon-chongzhijilu.png',
				homeiconkaikajilu:this.httpUrl+'file/static/lishi/home-icon-kaikajilu.png',
				
				
				shop_pkid:"",//店铺id
				emp_name:"",//创建人
				emp_pkid:"",//创建人id
				emp_role_pkid:"",//角色id
				mi_pkid:'' //created_by
			}
		},
		onLoad(option) {
			this.openid = uni.getStorageSync('openid');
			this.shop_pkid = uni.getStorageSync('shop_pkid');
			this.emp_pkid = uni.getStorageSync('emp_pkid');
			this.emp_name = uni.getStorageSync('emp_name');
			this.emp_role_pkid = uni.getStorageSync('emp_role_pkid');
			
			this.mi_pkid = uni.getStorageSync('mi_pkid');
		},
		components: {
			uniSwiperDot
		},
		methods:{
			//跳转产品服务订单页
			order(){
				console.log(this.shop_pkid)
				uni.showToast({
					title:"加载中...",
					icon:"loading"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pagesA/order/order?shop_pkid="+this.shop_pkid+"&emp_pkid="+this.emp_pkid+"&emp_role_pkid="+this.emp_role_pkid
					})
				},2000)
				
			},
			//跳转结账页
			orderList(){
				console.log(this.shop_pkid)
				uni.showToast({
					title:"加载中...",
					icon:"loading"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pagesA/orderList/orderList?shop_pkid="+this.shop_pkid+"&emp_pkid="+this.emp_pkid+"&emp_role_pkid="+this.emp_role_pkid
					})
				},2000)
			},
			//跳开卡页
			openCard(){
				console.log(this.shop_pkid)
				uni.showToast({
					title:"加载中...",
					icon:"loading"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:"../startCard/startCard?shop_pkid="+this.shop_pkid
					})
				},2000)
			},
			//跳充值页
			plusMoney(){
				console.log(this.shop_pkid,this.emp_name)
				uni.showToast({
					title:"加载中...",
					icon:"loading"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:"../chongzhi_sousuo1/chongzhi_sousuo1?shop_pkid="+this.shop_pkid+"&emp_name="+this.emp_name
					})
				},2000)
			},
			// 跳人事管理
			personnel(){
				uni.showToast({
					title:"加载中...",
					icon:"loading"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:"/pagesB/personnel_management/personnel_management?shop_pkid="+this.shop_pkid + "&openid=" + this.openid + "&mi_pkid=" + this.mi_pkid
					})
				},2000)
			}
		}
		
	}
</script>

<style>
	
	*{
		padding: 0 !important;
	}
	.bg{
		border: 1px solid transparent;
		height: 420upx;
		background:url(../../static/home-beijing.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		zoom: 1;
		
	}
	.life{
		height: 30px;
		position: absolute;
		top:30px;
		padding-left: 15px;
		color: #fff;
		font-weight: bold;
	}
	.img{
		display: initial;
		color: #fff;
		
	}
	
	swiper{
		height: 300upx;
	}
	.lunbo,.uni-swiper__warp{
		margin-top: 140upx;
	}
	.dots_fff {
		background: rgba(255,255,255,0.3) !important;
	}
	/* 更多css */
	.more{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1upx solid #e5e5e5;
		margin-top: 10upx;
		padding-bottom: 20upx;
		margin-left: 20upx;
		margin-right: 20upx;
	}
	.laba{
		width: 30upx;
		height: 30upx;
		border:1px dotted #000;
		/* border:1px dotted #7FC2FE;
		background-color: #DBF8FE; */
	    position: relative;
		left: -15upx;
		top: 5upx;
	}
	.info{
		font-size: 25upx;
		color: #999999;
		padding-left:15px;
	}
	.more1{
		font-size: 28upx;
		color: orange;
		padding-right:15px;
	}
	/* 收银管理、店铺css */
	
	.sygl{
		padding-top: 10px;
	
	}
	.ox1{
		border-left:3px solid #ff7500;
		padding-left: 5px;
		height: 28upx;
		position: relative;
		top:15upx;
	}
	.ox{
		font-size: 36upx;
	}
	.sy{
		font-family: PingFangSC-Semibold, sans-serif;
		font-weight: 600;
		padding-left:15px;
		margin-bottom: 20upx;
		display: flex;
	}
	.syimg{
		width: 80upx;
		height: 80upx;
		border:1px dotted #000;
		/* border:1px dotted #7FC2FE;
		background-color: #DBF8FE; */
	}
	.sy1{
		position: relative;
		margin:10upx;
		display: flex;		
		justify-content: center;
		padding-bottom: 20upx;
		border-bottom: 1upx solid #e5e5e5;
	}
	.syDes{
		flex: 1;
		text-align: center;
	}
	.des{
		font-size: 28upx;
		color: #666;
	}
</style>
