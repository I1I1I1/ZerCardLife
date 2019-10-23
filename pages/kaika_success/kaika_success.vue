<template>
	<view class="content1">
		<view class="">
			<image class="backimage" :src="chenggongbeijing" mode=""></image>
			<image class="image1" :src="jiezhangiconcgtishi"></image>
			<view class="linka">0卡生活</view>
			<view class="kaikasuccess">开卡成功</view>
		</view>
		<view class="xianshi">
			<view class="font-black" v-for="(kaika_successVal,index) in kaika_success" :key="index">
				<view>
					{{ kaika_successVal.name}}
				</view>
				<text class="font-orange">{{ kaika_successVal.value }}</text>
			</view>
			<view class="xian"></view>
			<view class="xian"></view>
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
				kaika_success: [
					{
						id: 1,
						name: "交易编号",
						value: ""
					},
					{
						id: 2,
						name: "交易方式",
						value: ""
					},
					{
						id: 3,
						name: "交易时间",
						value: ""
					}
				]
			};
		},
		methods: {
			finished(){
			   uni.switchTab({
				url:"../homelistpage/homelistpage"
			   })
			  }
		},
		onLoad(res) {
			this.kaika_success[0].value  = res.oc_code;
			this.kaika_success[2].value  = res.startCardTime;
			this.kaika_success[1].value  = res.remark3;
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
		top: -180rpx;
		margin-bottom: 100rpx;
	}

	.font-black {
		color: #333333;
		font-size: 35upx;
		display: flex;
		justify-content: space-around;
		font-family: PingFangSC-Semibold, sans-serif;
		margin-top: 50upx;
		align-items: baseline;
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
