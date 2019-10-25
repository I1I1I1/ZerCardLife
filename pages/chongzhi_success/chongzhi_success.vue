<template>
	<view class="content1">
		<view class="">
			<image class="backimage" :src="chenggongbeijing" mode=""></image>
			<image class="image1" :src="jiezhangiconcgtishi"></image>
			<view class="linka">0卡生活</view>
			<view class="kaikasuccess">充值成功</view>
		</view>
		<!-- <view class="xianshi" v-for="(chongzhi_successVal,index) in chongzhi_success" :key="index">			 -->
		<view class="xianshi">			
			<!-- 显示信息 -->
			<view class="font-black">
				<view class="">
				交易编号
				</view>
				
				<text class="font-orange">{{oc_code}}</text>
			</view>
			<view class="font-black">
				<view class="">
				交易方式
				</view>
				
				<text class="font-orange">{{rr_type}}</text>
			</view>
			<view class="font-black">
				<view class="">
				交易时间
				</view>
				
				<text class="font-orange">{{time}}</text>
			</view>
			<view class="font-black" v-if="chuZhiKa">
				<text space="emsp" class="">
				余  额
				</text>
				
				<text class="font-orange">¥{{value}}</text>
			</view>
			<view class="font-black" v-if="ciKa">
				<text space="emsp" class="">
				次  数
				</text>
				
				<text class="font-orange">{{value}}次</text>
			</view>
			<view class="font-black" v-if="shiXiaoKa">
				<text space="emsp" class="">
				到期时间
				</text>
				
				<text class="font-orange">{{value}}</text>
			</view>

			
			<!-- 显示信息结束 -->
		</view>
		<view class="xian"></view>
		<view class="xian"></view>
		<view class="xian"></view>
		<view class="xian"></view>
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
			chongzhi_success:[],
			oc_code:'',
			rr_type:'',
			time:'',
			value:'',
			chuZhiKa:false,
			ciKa:false,
			shiXiaoKa:false
		};
	},
	onLoad(res) {
		 let date = new Date();
		 let year = date.getFullYear();
		 let mon = date.getMonth()+1;
		 if(mon < 10){
		  mon = "0" + mon;
		 }
		 let day = date.getDate();
		 if(day < 10){
		  day = "0"+day;
		 }
		 let dateRes = year+"."+mon+"."+day; 
		 
		this.oc_code  = res.oc_code;
		this.rr_type  = res.rr_type;
		this.time  = dateRes;
		this.gogogomct_name = res.gogogomct_name;
		
		console.log("res",res)
		
		if(this.gogogomct_name == '储值卡'){
			this.chuZhiKa = true;
			this.value = res.gogogobalance;
			
		}
		if(this.gogogomct_name == '打折卡'){
			this.shiXiaoKa = true;
			let gogogomaturity_time = res.gogogomaturity_time;
			gogogomaturity_time = gogogomaturity_time.replace(new RegExp('/','g'),".");
			gogogomaturity_time = gogogomaturity_time.replace(new RegExp('-','g'),".");
			this.value = gogogomaturity_time;
		}
		if(this.gogogomct_name == '次数卡'){
			this.ciKa = true;
			this.value = res.gogogonumber_of_use;
		}
		if(this.gogogomct_name == '时效卡'){
			this.shiXiaoKa = true;
			let gogogomaturity_time = res.gogogomaturity_time;
			gogogomaturity_time = gogogomaturity_time.replace(new RegExp('/','g'),".");
			gogogomaturity_time = gogogomaturity_time.replace(new RegExp('-','g'),".");
			this.value = gogogomaturity_time;
		}
	},
	methods: {
		finished(){
		   uni.switchTab({
			url:"../homelistpage/homelistpage"
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
	top: -335upx;
	margin-bottom: 96upx;
}
.font-black {
	color: #333333;
	font-size: 35upx;
	display: flex;
	justify-content:space-around;
	font-family: PingFangSC-Semibold, sans-serif;
	margin-top: 50upx;
	align-items:baseline ;
	text-align: left;
	
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
