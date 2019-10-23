<template>
	<view class="order">
		<view class="delorder" v-show="delshow">
			<view class="deldone">
				<view>是否确定取消订单</view>
				<view class="delbtnlist">
					<button @click="delok" class="delok">确定</button>
					<button @click="delcancel" class="delcancel">取消</button>
				</view>
			</view>
			
		</view>
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">0卡生活</view>
			<view class="nav-list"></view>
		</view>
		<view class="contentlist">
			<view class="shopCarslist">
				<view  class="shopCarslistscroll" v-for="(orderlist,index) in orderlists" :key="index">
					<view class="shopList">
						<view class="shopdatalist"  @click="orderInfo(orderlist)">
							<view class="olistleft"></view>
							<view class="olist">
								<view style="font-size: 1.2em;">{{orderlist.username}}</view>
								<view style="font-size: 1.1em;">{{orderlist.userNo}}</view>
								<view style="font-size: 1em;">{{orderlist.userDes}}</view>
							</view>	
						</view>	
						<view class="delshop"  @click="shopListClick(orderlist)">
							取消订单
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot" @click="newOrder">
			<button class="btn">新建订单</button>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
	export default {
		components: {
		    uniSwipeAction
		},
		data() {
			return {
				oi_pkid:"",
				delshow:false,
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',//返回图片
				orderlists:[],
				shop_pkid:"",
				emp_pkid:"",//创建人id
				emp_role_pkid:""//角色id
			}
		},
		onLoad(options) {
			let _this = this;
			console.log(options)
			_this.shop_pkid = options.shop_pkid;
			_this.emp_pkid = options.emp_pkid; 
			_this.emp_role_pkid = options.emp_role_pkid;
			_this.orderlistdata();
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			orderlistdata(){
				let _this = this;
				uni.request({
					url: _this.httpUrl+'v_order_infoController/findById.xsh?shop_pkid='+_this.shop_pkid+'&emp_pkid='+_this.emp_pkid+'&emp_role_pkid='+_this.emp_role_pkid,
					method: 'GET',
					//header: {'content-type': "application/x-www-form-urlencoded"},
					data:{},
					success(res) {
						console.log("获取订单",res)
						_this.orderlists = [];
						let obj = res.data.obj;
						 for(let k in obj){
							_this.orderlists.push({
								userid:obj[k].emp_pkid,
								shop_pkid:obj[k].shop_pkid,
								username:obj[k].emp_name,
								userNo:obj[k].order_code,
								userDes:obj[k].remark1,
								assisant:obj[k].remark2,
								oi_pkid:obj[k].oi_pkid
							})
						}
					},
					fail(err) { 
						console.log("响应失败",err);
					}
				});
			},
			//跳回订单页面
			newOrder(){
				uni.showToast({
					title:"加载中...",
					icon:"loading"
				});
				setTimeout(()=>{
					uni.navigateTo({
						url:"../order/order?shop_pkid="+this.shop_pkid+'&emp_pkid='+this.emp_pkid+'&emp_role_pkid='+this.emp_role_pkid
					})
				},2000)
				
			},
			//跳到详情
			orderInfo(e){
				console.log(e)
				let order_code = e.userNo;
				let userDes= e.userDes;
				let username= e.username;
				let shop_pkid = e.shop_pkid;
				let userid = e.userid;
				let assisant = e.assisant;
				console.log("order_code",order_code);
				
				 uni.showToast({
					title:"加载中...",
					icon:"loading"
				}); 
				 setTimeout(()=>{
					uni.navigateTo({
						url:"../consumptionDetails/consumptionDetails?order_code="+order_code+"&userDes="+userDes+"&username="+username+"&shop_pkid="+shop_pkid+"&userid="+userid+"&assisant="+assisant+'&emp_pkid='+this.emp_pkid+'&emp_role_pkid='+this.emp_role_pkid
					})
				},2000) 
				
			},
			//删除订单
			shopListClick(d){
				console.log(d);
				let _this = this;
				_this.oi_pkid = d.oi_pkid;
				this.delshow = true;
			},
			delok(){
				let _this = this;
				let oi_pkid = _this.oi_pkid;
				this.delshow = false;
				uni.request({
					url: _this.httpUrl+'Jni_Order_InfoController/delete.xsh?oi_pkid='+oi_pkid,
					method: 'GET',
					//header: {'content-type': "application/x-www-form-urlencoded"},
					data:{},
					success(res) {
						console.log("删除订单",res);
						uni.showToast({
							title:"取消订单成功！",
							icon:"success"
						});
						_this.orderlistdata();
					},
					fail(err) { 
						console.log("响应失败",err);
					}
				});
			},
			delcancel(){
				this.delshow = false;
			}
		}
	}
</script>

<style>
	
	.delorder{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.deldone{
		    margin:auto;
			display: flex;
			width: 300upx;
			height: 200upx;
			justify-content: center;
			flex-direction: column;
	}
	.delbtnlist{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 5upx;
	}
	.delok{
		width: 135upx;
		height: 70upx;
		line-height: 70upx;
		background-color:#F87D24;
		font-size: 0.6rem;
		color: #fff;
	}
	.delcancel{
		width: 135upx;
		height: 70upx;
		line-height: 70upx;
		background-color: #1E90FF;
		font-size: 0.6rem;
		color: #fff;
	}
/*  @import url("../../static/iconfont/iconfont.css"); */
	image{
		height: 352upx;
		
	}
	/******最外层*****/
	.order{
		
	}
	html,body,.order{
		
		height: 100%;
		padding: 0;
		overflow: hidden;
	}
	.order{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
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
		padding-top: 37upx;
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
		height: 100%;
		width: 100%;
	}
	.contentlist::-webkit-scrollbar{
		width: 0upx;
	}
	
	.shopCarslist{
		
		display: block;
		overflow: hidden;
		overflow-y: auto;
		box-sizing: border-box;
		margin: 0 auto;
		padding: 30upx;
		height: 100%;
	}
	.shopCarslist::-webkit-scrollbar{
		width: 0upx;
	}
	.shopCarslistscroll{
		display: block;
		overflow: hidden;
		overflow-x: auto;
		padding: 0;
		box-sizing: border-box;
		border-radius: 4pt;
	}
	.shopCarslistscroll::-webkit-scrollbar{
		width: 0upx;
	}
	.shopList{
		height: 250upx;
		width: 130%;
		zoom: 1;
		color: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #E5E5E5;
		overflow-x: auto;
		overflow-y: hidden !important;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	
	
	.shopdatalist{
		background-image: url(../../static/jiezhang-xzyg@3x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 102%;
		height: 250upx;
		font-size: 0.9rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		
	}
	
	.delshop{
		width: 20%;
		height: 250upx;
		line-height: 250upx;
		text-align: center;
		background-color: #F65528;
		color: #fff;
		font-size: 0.7rem;
		position: relative;
		left: -5px;
		border-radius: 0 4pt 4pt 0;
	}
	
	.olist{
		flex: 4;
		font-size: 0.7rem;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		padding-top: 30upx;
	}
	.olist>view{
		flex: 1;
		padding-left: 200upx;
		box-sizing: border-box;
		text-align: left;
		width: 80%;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis !important;
		overflow: hidden;

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
	
</style>
