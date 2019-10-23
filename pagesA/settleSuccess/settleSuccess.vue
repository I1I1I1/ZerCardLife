<template>
	<view class="content1">
		<view class="">
			<image class="backimage" :src="chenggongbeijing" mode=""></image>
			<image class="image1" :src="jiezhangiconcgtishi"></image>
			<view class="linka">0卡生活</view>
			<view class="kaikasuccess">结账成功</view>
		</view>
		<view class="xianshi">
			<view class="font-black">
				<view class="">
				交易编号	
				</view>
				<text class="font-orange">{{order_code}}</text>
			</view>
			<view class="xian"></view>
			
			<view class="font-black">
				<view>交易方式</view>
				<text class="font-orange">{{recharge_type}}</text>
			</view>
			<view class="xian"></view>
			<view class="xian"></view>
			<view class="font-black">
				<view>{{usetype}}</view>
				<text class="font-orange">{{totalprices}}</text>
			</view>
			<view class="xian"></view>
			<view class="xian"></view>
			<view class="font-black">
				<view class="">
					交易时间
				</view>
				<text class="font-orange">{{dateRes}}</text>
			</view>
			<view class="xian"  v-show="balanceShow"></view>
			<view class="xian"  v-show="balanceShow"></view>
			<view class="font-black" v-show="balanceShow">
				<view>
					剩余
				</view>
				<text class="font-orange">{{balance}}</text>
			</view>
		</view>
		<view class="over">
			<button class="finished" @click="finished()">完成</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			chenggongbeijing:this.httpUrl+'file/static/jiezhang_success/chenggongbeijing@3x.png',
			jiezhangiconcgtishi:this.httpUrl+'file/static/jiezhang_success/jiezhang-icon-cgtishi.png',
			order_code:"",//交易编号
			recharge_type:"",//交易方式
			dateRes:"",//交易时间
			balance:"",//卡余额
			balanceShow:true,
			totalprices:0,
			shop_pkid:"",//店铺id
			usetype:"",
			useval:""
		};
	},
	onLoad(option) {
		console.log("交易成功",option);
		this.order_code = option.order_code;
		this.recharge_type = option.recharge_type;
		this.dateRes = option.dateRes;
		this.shop_pkid = option.shop_pkid;
		this.usetype = "消费金额";
		this.totalprices = parseFloat(option.totalprices).toFixed(2) + "元";
		if(option.recharge_type == "储值卡支付"){
			this.balanceShow = true;
			this.balance = parseFloat(option.balance).toFixed(2) + "元";
			
		}else if(option.recharge_type == "次数卡支付"){
			this.balanceShow = true;
			this.balance = option.balance+"次";
			this.usetype = "使用情况";
			this.totalprices = "1次";
		}else if(option.recharge_type == "时效卡支付"){
			this.balanceShow = false;
			this.usetype = "使用情况";
			this.totalprices = "1次";
		}
		else if(option.recharge_type !== "储值卡支付" && option.recharge_type !== "次数卡支付"){
			this.balanceShow = false;
		}
	},
	methods: {
		finished(){
			uni.switchTab({
				url:"/pages/homelistpage/homelistpage"
			})
		}
	}
};
</script>

<style>
page {
	background-color: #ffffff;
}
.backimage {
	width: 100%;
	height: 500upx;
}
.image1 {
	position: fixed;
	width: 150upx;
	height: 150upx;
	left: 300upx;
	top: 350upx;
}
.linka {
	color: #ffffff;
	font-size: 35upx;
	position: relative;
	top: -440upx;
	left: 40%;
	font-size: 40upx;
	font-weight: bold;
}
.kaikasuccess {
	color: #ffffff;
	font-size: 60upx;
	position: relative;
	top: -320upx;
	left: 34%;

}
.xianshi {
	position: relative;
	top: -60upx;
}
.xian {
	background-color: #e5e5e5;
	width: 80%;
	height: 1upx;
	position: relative;
	left: 10%;
	top: 10upx;
}
.font-black {
	color: #333333;
	font-size: 35upx;
	display: flex;
	justify-content:space-around;
	font-family: PingFangSC-Semibold, sans-serif;
	margin-top: 50upx;
	align-items:baseline ;
}
.font-orange {
	color: #fb9722;
	flex-wrap: nowrap;
	text-align: right;
	width: 40%;
	font-family: PingFangSC-Regular, sans-serif;
	font-size: 30upx;
}
.over{
	width: 100%;
	display: flex;
	justify-content: center;
	position: fixed;
	top: 86%;
	
}
.finished{
	background: #F87D24;
	text-align: center;
	font-size: 33upx;
	color: #FFFFFF;
	height: 38pt;
	width: 90%;
	line-height: 38pt;
	border-radius: 8upx;
}
</style>
