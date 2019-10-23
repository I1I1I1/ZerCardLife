<template>
	<view class="main">
		<view class="nav">
		   <view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
		   <view class="nav-list" id="life0">开卡</view>
		   <view class="nav-list"></view>
		</view>
		<!-- 模态框 -->
		<view class="motai" v-if="saoma_shouji">			
		</view>
		<view class="motai_contont" v-if="saoma_shouji">
			<view class="motai_contont_top">
				<view class="huiyuan_info">
					获取会员信息
				</view>
				<view class="">
					<image :src="guanbi" class="guanbi" @click="closeMoTai"></image>
				</view>
			</view>
			<view class="motai_contont_bottom">
				<view class="" @click="useErWeiMa">
					二维码获取会员信息
				</view>
				<view class="" @click="useSouSuo">
					手机号/会员名搜索会员信息
				</view>
			</view>
			
		</view>
		<!-- 模态框结束 -->
		<view class="content">
			<!-- 左侧边栏 -->
			<view  class="left-aside">
				<view v-for="(data,index) in datas" :key="index" @click="colorchange(index, data)" class="jiantouka" :class="{colors:isColorCheck==index}" >
					<view :class="{colorline:isColorCheck==index}" @click="showCardType"></view>{{data.name}}
				</view>
			</view>
			<!-- 右侧栏 -->
			<view  class="right-aside">
				<view class="jiantouka_tupian" v-for="(cardImgVal, index) in cardImg" :key="index"
				 @click="kakai_dengjixuanren(cardImgVal)">
					<image :src="cardImgVal.imageURL" mode="" class="card_image">
					
					<view class="card">
						
						<view class="cardtop">
							<view class="cardVip">
								VIP
							</view>
							<view class="cardTypeC">
								{{ cardImgVal.name }}
							</view>
						</view>
						<view class="cardfooter">
							<view class="noCard">
								<!-- NO.{{ cardImgVal.mct_pkid }} -->
							</view>
							<view class="moneny">
								<view class="moneny1">
									{{ cardImgVal.mctd_name }}
								</view>
								<view class="moneny2">
									{{ cardImgVal.mctd_money }}元
								</view>
							</view> 
						</view>
					</view>
					</image>
				</view>
 			</view>
			<uni-popup :show="flag" type="middle" @hidePopup="hide">
				<view>
					<image style="height: 445upx;width: 445upx;" :src="zeroCardIcon" mode=""></image>
				</view>	
			</uni-popup>
			
		</view>		   
	</view>     
</template>
<script>
	var si_pkid = "";
	import uniPopup from "@../../components/uni-popup/uni-popup.vue"
	export default{
		components: {
			uniPopup
			},
		data(){
			return{
				guanbi:this.httpUrl+'file/static/guanbi@3x.png',
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',//返回图片
				zeroCardIcon:this.httpUrl+'file/static/zeroCard.png',
				mct_name:'', // 卡类型的中文名字
				flag:false,
				hahaflag:false,
				si_pkid:'', // 获得左侧列表的id索引
				sci_pkid:'', // 右边卡的id
				sci_img:'', // 图片地址
				isColorCheck:0,
				datas:[], // 卡的类型
				name:'',
				cardImg:[
				],
				// cardImg:[],
				shop_card_type:"打折卡",
				card:[],
				card_name:'',
				newOpenCard:[],
				balance:'',  // 余额
				shop_pkid:'',
				mi_pkid:'', // 会员id
				saoma_shouji:false, // 扫码还是手机
			}
		},
		methods:{
			// 关闭模态框
			closeMoTai(){
				this.saoma_shouji = false;
			},
			// 调二维码获取会员信息
			useErWeiMa(){
				let _this = this;
						// 调扫码
					uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
							_this.openid = res.result;
							_this.saoma_shouji = false;
							uni.request({
								url:_this.httpUrl + '/Jni_Member_InfoController/selectUser.xsh',
								method:'POST',
								header:{ 'content-type':'application/x-www-form-urlencoded' },
								data:{
									openid:_this.openid,
								},
								// 先获得会员信息
								success(res) {
									if(res.data.message == '获取失败'){
										// 不是会员
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
									}else if(res.data.message == '获取成功'){
												// console.log('会员信息',res)
										let datahy = res.data.obj
										 _this.huiyuanname = res.data.obj[0].name
										 _this.mi_mobile = res.data.obj[0].mi_mobile
										 _this.sex = res.data.obj[0].sex
										 _this.age = res.data.obj[0].age
											
										uni.request({
											url: _this.httpUrl + 'Jni_Member_CardController/selectCard.xsh',
											method: 'POST',
											header:{ 'content-type':'application/x-www-form-urlencoded' },
											data:{
												shop_pkid:_this.shop_pkid,
												mctd_pkid:_this.mctd_pkid,
												mi_pkid:_this.mi_pkid,
											},     
											success(res){
											// 		// 除时效卡可以开多张卡
											console.log(_this.name)
											
													
														// 成功是已经有的  res[0].card_name !== "储蓄卡"
														if( _this.name !== "储值卡" && res.data.message == "获取成功" ){
															uni.showToast({
																title: '你已有一张'+res.data.obj[0].card_name,
																duration: 2000,
																icon: 'none'
															});
													
														}else{
															// 失败没有，跳开卡
															
															uni.navigateTo({
																url:'../../pagesB/kakai_dengjixuanren/kakai_dengjixuanren?mctd_give_money='+ _this.mctd_give_money 
																     +  '&mct_pkid=' + _this.mct_pkid + '&mctd_name=' + _this.mctd_name 
																	 +  '&mctd_money=' + _this.mctd_money + '&name=' + _this.name 
																     +  '&huiyuanname=' + _this.huiyuanname + '&sex=' + _this.sex 
																	 + '&mi_mobile=' + _this.mi_mobile + '&age=' + _this.age
																	 + '&shop_pkid=' + _this.shop_pkid + '&imageURL=' + _this.imageURL
																	 + '&mctd_discount=' + _this.mctd_discount + '&mctd_frequency=' + _this.mctd_frequency
																	 + '&mctd_month=' +_this.mctd_month + '&mi_pkid=' + _this.mi_pkid
																	 + '&mctd_pkid=' + _this.mctd_pkid
															});
														}
											}, 
											fail(err){
												console.log("获取失败111",err)	
												}
											})
										}
									}
								})					
							}  // 扫码的
						})  // 扫码的
			},
			// 调搜索获取会员信息
			useSouSuo(){
				let _this = this;
				let is_used = _this.is_used;  // 是否显示
				let imageURL = _this.imageURL;   // 图片地址
				let mct_pkid = _this.mct_pkid;   //卡的唯一主键（no）
				let mctd_pkid = _this.mctd_pkid;  //卡类型详情主键
				let name = _this.name;  // 卡类型的名字
				let mctd_discount = _this.mctd_discount;  // 折扣
				let mctd_frequency = _this.mctd_frequency;  // 次数
				let mctd_give_money = _this.mctd_give_money; // 赠送的钱
				let mctd_name = _this.mctd_name;  // 卡优惠的描述
				let mctd_money = _this.mctd_money;  // 开卡需要的钱数
				let mctd_month = _this.mctd_month;  // 时效卡的时长
				let mctd_royalty = _this.mctd_royalty; // 提成 ????
				let shop_pkid = _this.shop_pkid;
				
				uni.navigateTo({
					url:'../../pagesA/kaika_sousuo1/kaika_sousuo1?is_used='+ is_used + '&imageURL=' + imageURL + '&mct_pkid=' + mct_pkid 
								+ '&mctd_pkid=' + mctd_pkid + '&name=' + name + '&mctd_discount=' + mctd_discount 
								+ '&mctd_frequency=' + mctd_frequency + '&mctd_give_money=' + mctd_give_money + '&mctd_name=' + mctd_name 
								+ '&mctd_money=' + mctd_money + '&mctd_month=' + mctd_month + '&shop_pkid=' + shop_pkid 
				});
				_this.saoma_shouji = false;
		
				
			},
			// 关注微信号
			hide(){
				this.flag = false;
			},
			// 选弹框还是手机
			haha(){
				this.hahaflag = false;
			},
			//返回上一级
			back(){
				uni.navigateBack({
					delta:1,
				}) 
			}, 
			// 跳转下一页
			kakai_dengjixuanren(cardImgVal){ 
				console.log("cardImgVal",cardImgVal)
				let _this = this; 
				// _this.shop_pkid = shop_pkid
				_this.is_used = cardImgVal.is_used, // 是否显示
				_this.imageURL = cardImgVal.imageURL,  // 图片地址
				_this.mct_pkid = cardImgVal.mct_pkid,  //卡的唯一主键（no）
				_this.mctd_pkid = cardImgVal.mctd_pkid, //卡类型详情主键
				_this.name = cardImgVal.name, // 卡类型的名字
				_this.mctd_discount = cardImgVal.mctd_discount, // 折扣
				_this.mctd_frequency = cardImgVal.mctd_frequency,  // 次数
				_this.mctd_give_money = cardImgVal.mctd_give_money, // 赠送的钱
				_this.mctd_name = cardImgVal.mctd_name , // 卡优惠的描述
				_this.mctd_money = cardImgVal.mctd_money, // 开卡需要的钱数
				_this.mctd_month = cardImgVal.mctd_month, // 时效卡的时长
				_this.mctd_royalty = cardImgVal.mctd_royalty, // 提成 ????
				
				  // _this.openid = "oTN2u4tjaIkcskI_peSWmmdbtmbA"
			
				//扫码还是手机 
				 _this.saoma_shouji = true;
				

			},

			
			//点击改变颜色, 右侧卡的类型随着变化 
			 colorchange(index,data){ 
			    let _this = this;
				_this.isColorCheck = index;
				_this.shop_card_type = data.name;
				console.log("_this.shop_card_type",_this.shop_card_type)
				_this.showCardType();
			 }, 
			 
			 // 显示右侧卡的类型
			 showCardType(){
				 let _this = this;
				 let shop_card_type = _this.shop_card_type;
				 console.log("显示右侧卡的类型111",_this.shop_card_type)
				 // 遍历卡  
				 uni.request({
					 url: _this.httpUrl + 'v_shop_card_infoController/find.xsh',
					 method: 'POST',
					 header:{ 'content-type':'application/x-www-form-urlencoded' },
					 data:{
						 mct_name:shop_card_type,
						 shop_pkid:_this.shop_pkid,
					 },
					 success(res){
						 console.log("resww(按类型查信息)", res)   
						 let data = res.data.obj;
						 _this.cardImg = [];	
					 
						 for(var i=0; i< data.length; i++){
							 _this.cardImg.push({  
								  is_used:data[i].is_used, // 是否显示
								  imageURL:data[i].mctd_img,  // 图片地址
                                  mct_pkid:data[i].mct_pkid,  //卡的唯一主键（no）
								  mctd_pkid:data[i].mctd_pkid, //卡类型详情主键
								  name:data[i].mct_name, // 卡类型的名字
								  mctd_discount:data[i].mctd_discount, // 折扣
								  mctd_frequency:data[i].mctd_frequency,  // 次数
								  mctd_give_money:data[i].mctd_give_money, // 赠送的钱
								  mctd_name:data[i].mctd_name , // 卡优惠的描述
								  mctd_money:data[i].mctd_money, // 开卡需要的钱数
								  mctd_month:data[i].mctd_month, // 时效卡的时长
								  mctd_royalty:data[i].mctd_royalty , // 提成 ????
							 })
						 }		
							console.log("_this.cardImg",_this.cardImg)			  
					 },
					 fail(err){
						 console.log("响应失败",err)
					 }
				 })
			},

			// 显示左侧开卡类型
			showStarCardType(){
				let _this = this;
				_this.shop_pkid = _this.shop_pkid;
				// 显示左侧开卡的类型
				uni.request({
					url: _this.httpUrl + 'v_shop_card_infoController/find.xsh',
					 data:{
						shop_pkid:_this.shop_pkid 
					 },
					method: 'POST',
					// 请求头， 不写的话请求不到数据
					header:{ 'content-type':'application/x-www-form-urlencoded' }, 
					success(res) {
						let data = res.data.card_type; 
						console.log("11111111",data)
						for(var i=0; i<data.length; i++){
							_this.datas.push({
								// si_pkid:data[i].si_pkid, 
								name: data[i], 
								// remark1:data[i].remark1
							})						
						}
						
						 console.log(res)
					},
					fail(err) {
						console.log("响应失败", err)
					}
				})
						
			},
		
		},
		onLoad(option) {
			let _this = this;
			 _this.shop_pkid = option.shop_pkid
			
			_this.showCardType();
			// 显示左侧开卡的类型
			_this.showStarCardType();
		},
	}
</script>
<style>
	@import url("../../common/uni.css");
	@import url("../../colorui/main.css");
	@import url("../../colorui/icon.css");
			.zeroCard{
			height: 100upx;
			width: 100upx;
		}
    .colors{
		color: #F75E26;
		background: #fff;
	}
	.colorline{
		border-right: 3px solid #F75E26;
		height: 25upx;
		margin-right: 10upx;
		position: relative;
		top:2upx;
	}
	/***导航***/	
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
	  left: 80upx;
	  font-size: 40upx;
	 }	
		

	.fanhui{
		height: 50upx;
		width: 50upx;
		color: #FFFFFF;
		background-color: #1CBBB4;
	}
	
	
	.content{
		display: flex;
		height: 100%;
	}
	
	.left-aside{
		width: 30%;
		color: #A9A9A9;
		background-color: #F0F0F0;
	}
	
	.right-aside{
		height: 90%;  
		width: 70%;
		background-color: #FFFFFF;
		overflow-y: auto;
		box-sizing: border-box;
	}
	html,.main{
		overflow: hidden;
		height: 100%;
	}
	.jiantouka{
		font-family: PingFangSC-Semibold, sans-serif;
		font-size: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 100upx; 
		line-height: 100upx;
	}
	

	.jiantouka_tupian{
		display: flex;
		flex-direction: column;
	}
	.card_image{
		height: 300upx;
	}
	
	.card{
			width: 100%;
			position: relative;
			top: -300upx;
			height: 300upx;
			padding-top: 40upx;
			padding-bottom: 40upx; 
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
		}
		.cardtop{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			
		}
		.cardVip{
			color: #FFFFFF;
			position: relative;
			left: 40upx;
			font-size: 35upx;
		}
		.cardTypeC{
			color: #FFFFFF;
			display: flex;
			justify-content: flex-end;    /* 靠右 */
			position: relative;
			right: 40upx;
			font-size: 25upx;
		
		}
		.cardTypeE{
			color: #FFFFFF;
			display: flex;
			justify-content: flex-end;    /* 靠右 */
			position: relative;
			right: 40upx;
			font-size: 20upx;
			top: 0upx;
			display: none;
		}
		.noCard{
			color: #999999;
			font-size: 23upx;
			position: relative;
			left: 40upx;
			top:0upx;
		}
		.moneny{
			display: flex;
			justify-content: space-between;
			color: #666666;
		}
		.moneny1{
			position: relative;
			left: 40upx;
			font-size: 23upx;
			
		}
		.moneny2{
			position: relative;
			right: 40upx;
			font-size: 23upx;
		}
		
		/* 模态框 */
		.motai{
			position: fixed;
			height: 100%;
			width: 100%;
			background:rgba(0,0,0,1);
			opacity:0.4;
			display: flex;
			z-index:15;
		}
		.motai_contont{
			position: fixed;
			left: 17%;
			top: 40%;
			display: flex;
			flex-direction: column;
			width:65%;
			height:340upx;
			background:rgba(255,255,255,1);
			box-shadow:0upx 0upx 43upx 0upx rgba(0, 0, 0, 0.15);
			border-radius:16upx;
			z-index: 20;
			opacity:1;
		}
		.motai_contont_top{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-weight:bold;
			color:rgba(51,51,51,1);
			z-index: 25;
		}
		.motai_contont_bottom{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			top: 40upx;
		}
		.motai_contont_bottom > view{
			width:70%;
			height:66upx;
			color: #FFFFFF;
			background:#FA8924;
			border-radius:30upx;
			margin-bottom: 25upx;
			text-align: center;
			font-size: 25upx;
			line-height: 66upx;
		}
		.motai_contont_top{
			border-bottom: solid 1upx #E5E5E5;
		}
		.huiyuan_info{
			font-size: 30upx;
			margin-left: 25upx;
			margin-top: 25upx;
			margin-bottom: 25upx;
		}
		.guanbi{
			width: 30upx;
			height: 30upx;
			margin-right: 30upx;
			margin-top: 30upx;
		}
</style>


