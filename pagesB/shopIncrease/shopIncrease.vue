<template>
	<view class="order">
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">新增店铺</view>
			<view class="nav-list"></view>
		</view> 
			

		<view class="contentlist">
			<view class="xinin_x">
				<label class="inputlabel">店铺名称</label>
				<view  class="inputlist"><input type="text" placeholder="请输入店铺名称" v-model="shop_name"/></view>
			</view>
			
			<view class="xinin_x">
				<label class="inputlabel">电话号码</label>
				<view  class="inputlist"><input type="text" placeholder="请输入电话号码" v-model="shop_phone"/></view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">位置区域</label>
				<view  class="inputlist">
					<picker mode="region" class="picker" :range="years" @change="yearChange">
						<view  class="areacheck">
							<input type="text" style="color: #333;" :value="areatext" disabled placeholder="请选择省、市、区" />
							<view style="font-size: 1.3rem;">
								<image :src="rightDirIcon" class="toRightIndex"></image>
							</view>
						</view>
						
					</picker>
					
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">详细地址</label>
				<view  class="inputlist"><input type="text"  placeholder="请输入详细地址" v-model="remark2"/></view>
			</view>
			
			<view class="xinin_x1">
				<label class="inputlabel">店铺简介</label>
				<view  class="inputlist"><textarea  class="input" style="padding: 0;" placeholder="请输入店铺简介" v-model="sd_introduce"/></view>
			</view>
		</view>
		<view class="bottom">
			<view class="quxiao"><button class="cancel"  @click="cancel">取消</button></view>
			<view class="queding"><button class="save" @click="save">确定</button></view>
		</view>
	</view>

</template>

<script>
 export default {
	data() {
		return {
			visible:true,
			fanhuiIcon:'',//返回图片
			openid:'',
			rightDirIcon:this.httpUrl+'file/static/home/rightDir.png',
			createby:'',//创建人
			mi_pkid:'',//会员编号
			shop_name:'',//店名
			shop_phone:'',//店铺电话
			areatext: '',//省市区
			remark2:'',//详细地址
			sd_introduce:''//简介
		}
	},
	onLoad(option) {
		let _this = this;
		_this.openid = option.openid;
		_this.createby = option.createby;
		_this.mi_pkid = option.mi_pkid;
		_this.fanhuiIcon = _this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png';
		_this.emp_name = option.emp_name;
		_this.emp_phone = option.emp_phone;
		_this.emp_sex = option.emp_sex;
		_this.remark1 = option.remark1;
		_this.remark3 = option.remark3;
		_this.remark4 = option.remark4;
		console.log(option)
	},
	methods: {
		back(){
			uni.navigateBack({
				delta:1
			});
		},
		 yearChange : function(e){
			console.log(e)
			this.areatext = e.detail.value;
		},
		cancel(){
			uni.navigateBack({
				delta:1
			}) 
		},
		save(){
			let _this = this;
			console.log(_this.areatext.toString())
			let tell = _this.tell; //手机号验证
			if(_this.shop_name == ''){
				uni.showToast({
					title: '请填写店名',
					duration: 2000,
					icon: 'none'
				});
			}else if(!tell.test(_this.shop_phone)){
				uni.showToast({
					title: '请填写正确手机号',
					duration: 2000,
					icon: 'none'
				});
			}else if(_this.areatext == ''){
				uni.showToast({
					title: '请选择地区',
					duration: 2000,
					icon: 'none'
				});
			}else if(_this.remark2 == ''){
				uni.showToast({
					title: '请选择详细地址',
					duration: 2000,
					icon: 'none'
				});
			}else if(_this.sd_introduce == ''){
				uni.showToast({
					title: '请填写简介',
					duration: 2000,
					icon: 'none'
				});	
			}else{
				uni.request({
					url:_this.httpUrl + '/Jni_ShopController/add.xsh',
					method:'POST',
					header:{ 'content-type':'application/x-www-form-urlencoded' },
					data:{
						openid:_this.openid,
						shop_name:_this.shop_name,
						shop_phone:_this.shop_phone,
						shop_address:_this.areatext,
						remark2:_this.remark2,
						sd_introduce:_this.sd_introduce,
						created_by : _this.createby,
						mi_pkid : _this.mi_pkid,
						
						emp_name:_this.emp_name,
						emp_sex:_this.emp_sex,
						emp_phone:_this.emp_phone, 		
						remark1:_this.remark1,
						remark5:_this.remark5,
						remark3:_this.remark3,
						remark4:_this.remark4
						
						
					},
					success(res) {
						console.log(res)
						uni.showToast({
							title:"加载中...",
							icon:"loading"
						});
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/home/home?openid="+_this.openid
							})
						},2000)
					}
					
				})
			}
			
			
			
		}
		
	}
	
};
</script>

<style>
/******最外层*****/
	*{
		margin: 0;
		padding: 0;
	}
	html,body,.order{
		height: 100%;
		padding: 0;
		overflow: hidden;
		background-color: #fff;
	}
	.order{
		height: auto;
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
		overflow: hidden;
		overflow-y: auto;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-bottom: 10pt solid #f0f0f0;
		padding: 0upx 0upx 0upx 30upx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		
	}
	.contentlist::-webkit-scrollbar{
		width: 0upx;
	}
	
	/**填入信息**/
	.xinin_x{
		display: flex;
		width: 100%;
		height: 133upx;
		line-height: 133upx;
		flex-wrap: nowrap;
		
		align-items: center;
	}
	.xinin_x:not(:last-child){
		border-bottom: 1px solid #E5E5E5;
	}
	.inputlabel{
		color: #333333;
		font-size: 0.8rem;
		white-space: nowrap;
	}
	.inputlist{
		font-size: 0.8rem;
		flex:3;
		box-sizing: border-box;
		padding-left: 40upx;
		white-space: nowrap;
		display: flex;
		justify-content: space-between;
		color: #333333;
	}
	.xinin_x1{
		display: flex;
		width: 100%;
		height: 153upx;
		line-height: 153upx;
		flex-wrap: nowrap;
		
		align-items: flex-start;
	}
    .input{
		height: 81upx;
		width: 90%;
		line-height: 0;
		position: relative;
		top:59upx;
		color: ;
	}
    .picker{
		width: 100% !important;
	
	}
	.areacheck{
		width: 100% !important;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 20upx;
		box-sizing: border-box;
		color: #999999;
		font-size: 0.8rem;
	}
	.toRightIndex{
		width: 30upx;
		height: 30upx;
		color: #666666;
	}
	
	/*   底部按钮   */
	.bottom {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding-bottom: 12pt;
		border: 1px solid transparent;
	}
	.quxiao {
		flex: 1;
	}
	.queding {
		flex: 1;
	}
	.cancel{
		width: 258upx;
		height: 85upx;
		line-height: 85upx;
		font-size: 28upx;
		position: relative;	
		text-align: center;
		background: #0081FF;
		color: #fff;
		border-radius: 4px;
	}
	.save{
		width: 258upx;
		height: 85upx;
		line-height: 85upx;
		font-size: 28upx;
		position: relative;
		text-align: center;
		left: 10upx;
		background: #F87D24;
		color: #FFFFFF;
		border-radius: 4px;
	}
	
</style>
