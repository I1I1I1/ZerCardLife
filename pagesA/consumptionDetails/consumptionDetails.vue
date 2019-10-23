<template>
	<view class="order" @touchstart="ts($event)" >
		<!----员工弹框---->
		<view class="Zao" v-show="isShow"></view>
		<view class="memberContent"  v-show="isServeShow">
			<input type="number" placeholder="请输入手机号" class="memberSel" v-model="telvalue"/>
			<!-------按钮-------->
			<view class="btnbg">
				<button class="qx" @click="servecancel()">取消</button>
				<button class="qd" @click="serveok('手机号结账')">确定</button>
			</view>
		</view>
		<view class="nav1">
			<view class="navlist">
				<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
				<view class="nav-list" id="life0">0卡生活</view>
				<view class="nav-list"></view>
			</view>
			<view class=" contentlist">
				<view class="orderlist">
					<view class="olistleft"></view>
					<view class="olist">
						<view style="font-size: 1.2em;">{{username}}</view>
						<view style="font-size: 1em;">{{order_code}}</view>
						<view style="font-size: 0.8em;">{{userDes}}</view>
					</view>
					<view class="olistleft"></view>
				</view>
			</view>
		</view>
		<view class="ordercontent">
			<view class="orderTitle">
				<label class="tilteline"></label>消费详情
			</view>
			<view class="theader">
				<view class="tabler"><image :src="xfmxiconchanpinIcon" mode=""></image>产品/服务</view>
				<view class="tabler"><image :src="xfmxiconjiageIcon" mode=""></image>价格</view>
				<view class="tabler"><image :src="xfmxiconshuliangIcon" mode=""></image>数量</view>
			</view>
			<view class="tbody">
				<view class="tbodylist" v-for="(tlist,index) in tlists" :key="index">
					<view class="tabler">{{tlist.title}}</view>
					<view class="tabler">￥{{tlist.price}}</view>
					<view class="tabler sl">{{tlist.sl}}</view>
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="fs">
				<view>合计金额:</view>
			</view>
			<view class="fs je">
				<view>￥{{totalPrice}}</view>
			</view>
			<view class="fs saoprice" >
			    <view class="jzlist">
					<button v-show="jzShow" @click="jzbtn('散客结账')">散客结账</button>
				</view>
				<view class="jzlist">
					<button v-show="jzShow" @click="jzbtn('手机号结账')">手机号结账</button>
				</view>
			
				<view class="saobg">
					<label class="btn" @touchstart="scan('扫一扫结账')">
						会员扫一扫
					</label>
					<image class="upicon jssel" :src="mingxicionjiantouIcon" mode=""  v-show="shows"  @click.stop="jzSel($event)"></image>
					<image class="upicon jssel" :src="mingxicionjiantouIcon" mode=""  v-show="isShows"  @click.stop="jzSelhidden($event)" ></image>
					
				</view>
			</view>
		</view>
		<view style="position:absolute;">
			<uni-popup :show="flag" type="middle" @hidePopup="hide">
				<view>
					<image style="height: 445upx;width: 445upx;" :src="zeroCardIcon" mode=""></image>
				</view>	
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@../../components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',//返回图片
				xfmxiconchanpinIcon:this.httpUrl+'file/static/xfmx-icon-chanpin@3x.png',
				xfmxiconjiageIcon:this.httpUrl+'file/static/xfmx-icon-jiage@3x.png',
				xfmxiconshuliangIcon:this.httpUrl+'file/static/xfmx-icon-shuliang@3x.png',
				mingxicionjiantouIcon:this.httpUrl+'file/static/mingxi-cion-jiantou.png',
				guanbi:this.httpUrl+'file/static/guanbi@3x.png',
				zeroCardIcon:this.httpUrl+'file/static/zeroCard.png',
				telvalue:"",//手机号
				isShow:false,//模态框遮罩
				isServeShow:false,//模态框
				shows:true,
				isShows:false,
				jzShow:false,
				tlists:[],
				flag:false,//关注公众号
				username:"",//主工
				assisant:"",//助理
				order_code:"",//订单编号
				userDes:"",//项目
				userid:"",//主工Id
				totalPrice:0,//价位
				shop_pkid:""//商店id
			}
		},
		onLoad(option) {
			console.log("option",option);
			let _this=this;
			
			_this.username=option.username;
			_this.assisant=option.assisant;
			_this.order_code=option.order_code;
			_this.userDes=option.userDes;
			_this.userid=option.userid;
			_this.shop_pkid = option.shop_pkid;
			
			uni.request({
				url: _this.httpUrl+'v_order_infoController/findById.xsh?shop_pkid='+option.shop_pkid+'&order_code='+option.order_code,
				method: 'GET',
				//header: {'content-type': "application/x-www-form-urlencoded"},
				data:{},
				success(res) {
					console.log("获取订单详情",res)
					_this.tlists = [];
					let obj = res.data.objs;
					 for(let k in obj){
						_this.tlists.push({
							title:obj[k].goods_name,
							price:Number(obj[k].standard_price),
							sl:Number(obj[k].detail_num)
						})
					} 
					console.log("this.tlists",_this.tlists)
					let len = _this.tlists.length;
					
					for(let i =0;i<len;i++){
						_this.totalPrice += Number(_this.tlists[i].price);
					}
					_this.totalPrice = _this.totalPrice.toFixed(2)
				},
				fail(err) { 
					console.log("响应失败",err);
				}
			});
		},
		
		methods:{
			//调回上一级
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 关注微信号
			hide(){
				this.flag = false;
			},
			//结账显示隐藏选择
			jzSel(e){
				if(this.jzShow == false){
					this.jzShow =true;
				}else{
					this.jzShow =false;
				}
				this.shows =false;
				this.isShows =true;
			},
			jzSelhidden(){
				this.shows =true;
				this.isShows =false;
			},
			jzbtn(val){
				console.log(val);
				let _this = this;
				if(val !== "手机号结账"){
					uni.navigateTo({
						url:"../settle/settle?jzType="+val+"&username="+_this.username+"&assisant="+_this.assisant+"&order_code="+_this.order_code+"&userDes="+_this.userDes+"&totalPrice="+_this.totalPrice+"&userid="+_this.userid+"&shop_pkid="+_this.shop_pkid
					})
				}else{
					_this.isShow = true;
					_this.isServeShow = true;
				}
			},
			//取消模态框
			servecancel(){
				let _this = this;
				_this.isShow = false;
				_this.isServeShow = false;
				_this.telvalue = "";
			},
			//手机号结账确定
			serveok(val){
				let _this = this;
				console.log("_this.telvalue",_this.telvalue)
				if(_this.telvalue == ""){
					uni.showToast({
						icon:'none',
						title:'请输入手机号！'
					}); 
				}else{
					uni.request({
						url: _this.httpUrl+'Jni_Member_CardController/selectCard.xsh?shop_pkid='+_this.shop_pkid+"&mi_mobile="+_this.telvalue,
						method: 'GET',
						//header: {'content-type': "application/x-www-form-urlencoded"},
						data:{},
						success(res) {
							console.log("获取手机号1",res)
							_this.orderlists = [];
							let message = res.data.message;
							if(message == "获取成功"){
								uni.navigateTo({
									url:"../settle/settle?jzType="+val+"&username="+_this.username+"&assisant="+_this.assisant+"&order_code="+_this.order_code+"&userDes="+_this.userDes+"&totalPrice="+_this.totalPrice+"&telphone="+_this.telvalue+"&userid="+_this.userid+"&shop_pkid="+_this.shop_pkid
								});
								_this.isShow = false;
								_this.isServeShow = false;
								_this.telvalue = "";
							}else{
								uni.showToast({
									icon:'none',
									title: '手机号不存在请重新输入!'
								}); 
							}
						},
						fail(err) { 
							console.log("响应失败",err);
						}
					});
					
				}
				
			},
			//扫码
			scan(val){
					let _this = this;
				uni.scanCode({
					success: function (res) {
					
						console.log("res成功",res)
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						let openid = res.result;
						uni.request({
							url: _this.httpUrl+'Jni_Member_CardController/selectCard.xsh?shop_pkid='+_this.shop_pkid+"&openid="+openid,
							method: 'GET',
							//header: {'content-type': "application/x-www-form-urlencoded"},
							data:{},
							success(res) {
								console.log("获取openid",res)
								_this.orderlists = [];
								let message = res.data.message;
								if(message == "获取成功"){
									uni.navigateTo({
										url:"../settle/settle?jzType="+val+"&username="+_this.username+"&assisant="+_this.assisant+"&order_code="+_this.order_code+"&userDes="+_this.userDes+"&totalPrice="+_this.totalPrice+"&telphone="+_this.telvalue+"&userid="+_this.userid+"&shop_pkid="+_this.shop_pkid
									});
								}else{
									uni.showModal({
										title: '提示',
										content: '您并未注册会员，是否关注零卡生活注册成为会员',
										success: function (res) {
											if (res.confirm) {
												console.log('用户点击确定');
											_this.flag = true 
											
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										},
										});
								}
							},
							fail(err) { 
								console.log("响应失败",err);
							}
						});
					}
				});
			},
			ts(e){
				e.stopPropagation();
				if(this.jzShow == true){
					this.jzShow =false;
				}
				this.shows =true;
				this.isShows =false;
			}
		}
	}
</script>

<style>
@import url("../../common/uni.css");
	/******最外层*****/
	html,body,.order{
		height: 100%;
		padding: 0;
		overflow: hidden;
	}
	.order{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #F0F0F0;
	}
	/****导航****/
	.nav1{
		display: flex;
		height: auto;
		flex-direction: column;
		z-index: 5;
	}
	.navlist{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: bolder;
		padding-top: 15upx;
		flex-wrap: nowrap;
		padding-left: 25upx;
		width: 100%;
		height: 50pt;
		background: linear-gradient(to right,#F54D28,#FB9723);
		
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
		width: 100%;
		height: 200upx;
		text-align: center;
		margin: 0 auto;
		background: linear-gradient(to right,#F54D28,#FB9723);
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
	}
	.orderlist{
		background-image: url(../../static/jiezhang-xzyg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		zoom: 1;
		height: auto;
		width: 700upx;
		height: 240upx;
		margin-top: 0upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
		color: #fff;
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: nowrap;
		border-radius: 8pt;
	}
	.olistleft{
		flex:2;
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
		padding-left: 80upx;
		box-sizing: border-box;
		text-align: left;
	}
	.ordercontent{
		height: 56%;
		background: #fff;
		padding-left: 35upx;
		padding-right: 35upx;
		padding-top: 30upx;
		margin-bottom: 10upx;
		box-sizing: border-box;
	}
	/***消费详情***/
	.orderTitle{
		width: 100%;
		font-size: 34upx;
		height: 90upx;
		font-size: 0.8rem;
		font-weight: 600;
		display: flex;
		align-items: flex-end;
		padding-bottom: 10upx;
	}
	.tilteline{
		height: 30upx;
		border-left: 2pt solid #F86926;
		margin-right: 20upx;
		position: relative;
		top:-4upx;
	}
	.tbody{
		height: 80% !important;
		overflow: auto;
		overflow-x: hidden;
	}
	.tbody::-webkit-scrollbar{
		width: 0upx;
	}
	.theader,.tbodylist{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #333;
	}
	.tbodylist{
		color: #666666;
	}
	.theader>view:first-child{
		text-align: left;
	}
	.theader>view:last-child{
		text-align: right;
	}
	
	.tabler{
		flex: 1;
		text-align: center;
		font-size: 0.8rem;
		height: 60upx;
		line-height: 60upx;
		width: 50upx;
		box-sizing: border-box;
		padding-right: 30upx;
	}
	.sl{
		text-align: center;
		box-sizing: border-box !important;
		position: relative;
		left: 55upx;
	}
	.theader image{
		width: 30upx;
		height: 30upx;
		position: relative;
		top: 5upx;
		margin-right: 10upx;
	}
	/**底部**/
	.foot{
		background-color: #fff;
		width: 100%;
		height: 45pt;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 30upx;
	}
	.fs{
		flex: 1;
		font-size: 0.8rem;
		color: #333;
		font-weight: 600;
	}
	.je{
		color: #F55127;
		font-weight: 600;
		position:relative;
		left: -50upx;
		
	}
	.jzlist{
		height: 80upx;
		padding: 0;
		line-height: 80upx;
		
	}
	.jzlist>button{
		height: 80upx;
		line-height: 80upx;
		background-color: #FAFAFA;
	}
	.saoprice{
		position: relative;
		top:-75upx;
		width: 100upx;
	}
	button{
		white-space: nowrap;
		font-size: 0.8rem;
		color: #999999;
	}
	.saobg{
		display: flex;
		background-color: #F87D24;
		color: #fff;
		border-radius: 5pt;
		line-height: 75upx;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		text-align: center;
	}
	
	.btn{
		flex: 5;
		width: 100%;
		height: 75upx;
		background-color: transparent;
		color: #fff;
		font-weight: bold;
		line-height: 75upx;
		font-size: 0.8rem;
		zoom:1;
		padding-left: 4upx;
	}
	.jssel{
		flex: 1;
		position: relative;
		left: -8upx;
		line-height: 75upx;
		text-align: left;
	}
	/***遮罩层***/
		.Zao{
			width: 100%;
			height: 100%;
			background-color: #000000;
			opacity: 0.5;
			z-index: 15;
			position: fixed;
		}
		.memberContent{
			height: 100%;
			width: 100%;
			position: fixed;
			z-index: 16;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			
		}
	/*****按钮*****/
	.btnbg{
		display: flex;
		padding: 10px;
		justify-content: flex-end;
	}
	.btnbg>button{
	
		color: #fff;
		font-weight: bold;
		border-radius: 8pt;
		
	}
	.qx{
		border:transparent !important;
		background-color: #1E90FF;
		margin-right: 10upx;
	}
	.qd{
		border:transparent !important;
		background-color:#F87D24;
	}
	.memberSel{
		border: 1px solid #999;
		border-radius: 4pt;
		background-color: #fff;
	
	}
</style>
