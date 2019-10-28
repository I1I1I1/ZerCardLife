<template>
	<view>
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">会员信息</view>
			<view class="nav-list"></view>
		</view>
		<view class="">
			<view class="">
				<bw-img-upload style="width:100%" ></bw-img-upload>
				<bw-swiper :swiperList="swiperList" style="width:100%"></bw-swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import bwSwiper from '@../../components/wxcomponents/bw-swiper/bw-swiper.vue'
	export default {
		components:{
			bwSwiper
		},
		data() {
			return {
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',
				fullScreen:{ // 是否全屏 不支持卡牌
					type:Boolean,
					default:false
				},
				swiperList:{ // 滑块视图容器数据 
				// 数据格式 :imageKey="xx" :textKey="yy" [{xx: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',yy:'加油'}] 提示文字可要可不要
				// 或者 [{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'}] 提示文字可要可不要
					type:Array,
					default:function(){
						return [{xx: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',yy:'加油'}]
					}
				},
			}
		},
		methods: {
			
		},
		onLoad() {
			let huiyuanInfo = [];
		} 
	}
</script>

<style>
	@import url("huiyuanInfo.css");
</style>
