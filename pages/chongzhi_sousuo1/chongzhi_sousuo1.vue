<template>
	<view>
		<!-- <view class="content1"></view> -->
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">会员查询</view>
			<view class="nav-list"></view>
		</view>
		<view class="search-block">
			<view class="search1">
				<view class="search-ico-wapper"><image :src="chongzhiiconsousuoIcon" class="search-ico" mode=""></image></view>
				<input type="text" value="" placeholder="点击输入搜索内容" class="search-text" maxlength="10"  v-model="keywords" @input="search(keywords)"/>
				<view class="search-ico-wapper1"  @click="saoma"><image :src="chongzhiiconsysIcon" class="search-ico-1" mode=""></image></view>
			</view>
			
		</view>
		<view class="shadow"></view>
		<view class="chongzhi"></view>
		<view class="show">
			<image :src="chongzhisousuoimgIcon" mode="" class="blackground" v-if="show_picture"></image>
			
			<view class="" v-if="show_huiyuan">
				<view class="show_head">
					会员信息
				</view>
				<view class="xian">
					
				</view>
				<view class="huiyuan_info"  v-for="(huiyuanVal, index) in huiyuan"  :key="index" @click="huiyuanChange(huiyuanVal)">
					<view class="huiyuan_img">
						<image :src="huiyuanVal.image" mode=""></image>
					</view>
					<view class="huiyuan_hanzi">
						<view class="name">
							{{ huiyuanVal.name }}
						</view>
						<view class="phone">
							{{ huiyuanVal.number }} 
						</view>
					</view>
					<view class="xian1">
						
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',
			chongzhiiconsousuoIcon:this.httpUrl+'file/static/chongzhi_sousuo/chongzhi-icon-sousuo@2x.png',
			chongzhiiconsysIcon:this.httpUrl+'file/static/chongzhi_sousuo/chongzhi-icon-sys@2x.png',
			chongzhisousuoimgIcon:this.httpUrl+'file/static/chongzhi_sousuo/chongzhi-sousuo-img@2x.png',
			show_picture:true,
			show_huiyuan:false,
			iconsel: this.httpUrl+'file/static/checkbox_button/jiezhang-icon-anniu-sel.png',
			iconNosel: this.httpUrl+'file/static/checkbox_button/jiezhang-icon-anniu-nor.png',
			isCheckState: 0,
			huiyuan: [],
			name:'',
			number:'',
			mi_pkid:'',
			shop_pkid:'',
			created_by:''
		};
	},
	onLoad(option) {
		console.log(option)
		let _this = this;
		_this.shop_pkid = option.shop_pkid;
		_this.created_by = option.emp_name;
	},
	methods: {
		back(){
			uni.navigateBack({
				delta:1
			})
		},
		
		search(keywords){
			let _this = this;
			if(_this.keywords ==''){
				_this.show_picture = true;
				_this.show_huiyuan = false;
			}else{
				_this.show_picture = false;
				_this.show_huiyuan = true;
				_this.huiyuan = [];
				uni.request({
					url: _this.httpUrl + 'v_user_infoController/findById.xsh',
					method: 'POST',
					header:{ 'content-type':'application/x-www-form-urlencoded' },
					data:{
						shop_pkid:_this.shop_pkid,
					    find:keywords
					},
					success(res){
						console.log("会员", res)   
						let data = res.data.obj;					  
						for(var i=0; i< data.length; i++){
							_this.huiyuan.push({  
							 name: data[i].name,
							number:data[i].mi_mobile,
							 mi_pkid: data[i].mi_pkid,
							image:data[i].remark1
						})
					 }		
					
					}, 
					fail(err){
						console.log("响应失败",err)
					}
				})
			}
			
		},
		huiyuanChange(huiyuanVal){
			console.log(huiyuanVal)
			let _this = this;
			_this.shop_pkid = _this.shop_pkid;
			_this.mi_pkid = huiyuanVal.mi_pkid;
			uni.navigateTo({
				url:'../chongzhi_xuanka/chongzhi_xuanka1?shop_pkid=' +_this.shop_pkid + '&mi_pkid='+_this.mi_pkid+'&created_by='+ _this.created_by
			})
		},
		// 二维码扫顾客
		saoma(){
			let _this = this;
			uni.scanCode({
				success(res){
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					uni.request({
						url:_this.httpUrl + '/Jni_Member_InfoController/selectUser.xsh',
						method:'POST',
						header:{ 'content-type':'application/x-www-form-urlencoded' },
						data:{
							openid:res.result
						},
						success(res) {
							console.log(res)
							if(res.data.message == '获取成功'){
								let _this = this;
								_this.shop_pkid = _this.shop_pkid;
								_this.mi_pkid = res.data.obj.mi_pkid;
								uni.navigateTo({
									url:'../chongzhi_xuanka/chongzhi_xuanka1?shop_pkid=' +_this.shop_pkid + '&mi_pkid=' + _this.mi_pkid + '&created_by=' + _this.created_by
								})
							}else{
								uni.showToast({
									title: '不是本店会员',
									duration: 2000,
									icon: 'none'
								});
							}
						}
					})
				}
			})
		}
	}
	
};
</script>

<style>
	@import "../../colorui/main.css";
    @import "../../colorui/icon.css";
.content1 {
	height: 150upx;
}
/****导航****/
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
	 left: 40upx;
	 font-size: 40upx;
	}	
.chongzhi {
	color: #ffffff;
	font-size: 35upx;
	position: relative;
	top: -220upx;
	left: 343upx;
}
page {
	background-color: #ffffff;
}
image{
	width: 100%;
	height: 100%;
}
/* 搜索框 */
.search-ico,
.search-ico-1 {
	width: 40upx;
	height: 40upx;
}
.search-text {
	font-size: 14px;
	background-color: #ffffff;
	height: 60upx;
	width: 480upx;
	padding-left: 25upx;
	border: transparent;
	
}
.search-block {
	display: flex;
	flex-direction: row;
	padding-left: 60upx;
	position: relative;
	top: -32upx;
	
}
.search1{
	display: flex;
	align-items: center;
	height: 60upx;
	width: 630upx;
	background: #fff;
    -moz-box-shadow: 0 0 10px #e6e6e6;
	-webkit-box-shadow: 0 0 10px #e6e6e6;
	box-shadow: 0 0 10px #e6e6e6;
	border-radius: 18px;
	position: relative;
	top:15upx;
	z-index: 5;
}
.search-ico-wapper {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0upx 0upx 0upx 40upx;
border-radius: 18px;
	
}
.search-ico-wapper1 {
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0upx 40upx 0upx 0upx;
	border-radius: 18px;
}
/* .shadow {
	width: 638upx;
	height: 60upx;
	border-radius: 18px;
	-moz-box-shadow: 0 0 10px #e6e6e6;
	-webkit-box-shadow: 0 0 10px #e6e6e6;
	box-shadow: 0 0 10px #e6e6e6;
	position: relative;
	top: -90upx;
	left: 60upx;
} */
.show{
	display: flex;
	flex-direction: column;
	margin-left: 100upx;
	position: relative;
	top: 20upx;
}
.huiyuan_info{
	
}
.show_head{
	font-size: 25upx;
	color: #999999;
	margin-bottom: 20upx;
}
.xian{
	background: #EBEBEB;
	width: 85%;
	height: 1upx;
}

.huiyuan_img{
	height: 90upx;
	width: 90upx;
	margin-top: 30upx;
}
.huiyuan_hanzi{
	position: relative;
	left: 120upx;
	top: -80upx;
}
.blackground{
position: relative;
	top: 125upx; 
	left: -38upx;
	height: 600upx;
	width: 96%;
}
.phone{
	margin-top: 10upx;
	font-size: 24upx;
	color: #AFAFAF;
}
.xian1{
	background: #EBEBEB;
	width: 85%;
	height: 1upx;
	position: relative;
	top: -40upx;
	
}
</style>
