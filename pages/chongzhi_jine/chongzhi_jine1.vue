<template>
	<view class="mains">
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">充值</view>
			<view class="nav-list"></view>
		</view>
		<!-- 用户的卡片开始 -->
		<view class="Mo_Tai_Kuang_top">
			<image :src="mctd_img" class="Mo_Tai_Kuang_card_image"></image>
			<view class="Mo_Tai_Kuang_card">
				<view class="Mo_Tai_Kuang_cardtop">
					<view class="Mo_Tai_Kuang_cardVip">
						VIP
					</view>
					<view class="Mo_Tai_Kuang_cardTypeC">
						{{mct_name}}
					</view>
				</view>
				<view class="Mo_Tai_Kuang_cardfooter"> 
					<view class="Mo_Tai_Kuang_noCard">
						NO.{{card_id}}
					</view>
					<view class="Mo_Tai_Kuang_moneny">
						<view class="Mo_Tai_Kuang_moneny1">
							{{card_name}}
						</view>
						<text class="Mo_Tai_Kuang_moneny2">
							{{balanceview}}
						</text>
					</view> 
				</view>
			</view>
		</view>
		<!-- 用户的卡片结束 -->	
		<view class="contentbody">
			<view class="chongzhi" >
				<view class="chongzhi_shu">
					|
					<view class="chongzhi_title">充值金额</view>
				</view>
				<view class="typeBuJu">
					<view class="chongzhi_type" v-for="(chongzhiTypeVal, index) in chongZhiType" :key="index" 
					@click="chooseCardType(chongzhiTypeVal,index)" :class="{orange:chooseCardTypeIndex === index}">
						<view class="chongzhi_money">
							￥{{ chongzhiTypeVal.cCt_mctd_money }}
						</view>
						<view class="chongzhi_money1">
							{{ chongzhiTypeVal.cCt_mctd_name }}
						</view>
					</view>
				</view>
				
			</view>
			<!-- 支付 -->
			<view class="zhifu">
				<view class="shu1">
					|
					<view class="dengji huiyuan">支付方式</view>
				</view>
				<view class="">
					<view class="zhifu_zf" v-for="(payStypeVal, index) in payStype" :key="index" @click="zhifuChange(index,payStypeVal)">
						<label for=""><image :src="payStypeVal.image" mode="" class="zhifu_image"></image></label>
						<label for="" class="zhifu_zf_zi">{{ payStypeVal.name }}</label>
						<label for=""  class=""><image :src="isCheckState==index?iconsel: iconNosel" class="section" :class="isCheckState==index?iconsel: iconNosel" ></image></label>				
						<view class="xian"></view>
					</view>
				</view>
			</view>
			<view style="min-height: 250upx;">
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom">
			<view class="quxiao" @click="back()">取消</view>
			<view class="queding" @click="go_kaika_success">确定</view>
		</view>
	</view>
</template>

<script>
    export default {
		data() {
			return {
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',
				iconsel:this.httpUrl+'file/static/settle/jiezhang-icon-anniu-sel@3x.png',
				iconNosel:this.httpUrl+'file/static/settle/jiezhang-icon-anniu-nor@3x.png',
				isCheckState: 0,
				ChongZhiKa:false,
				CiKa:false,
				ShiXiaoKa:false,
				DaZheKa:false, 
				payStype:[
					{ name:"微信支付", image: this.httpUrl+'file/static/settle/jiezhang-icon-wxzf@3x.png'},
					{ name:"支付宝支付", image:this.httpUrl+'file/static/settle/jiezhang-icon-zfbzf@3x.png'},
					{ name:"现金支付", image:this.httpUrl+'file/static/settle/jiezhang-icon-xjzf@3x.png'},
					{ name:"其它支付", image:this.httpUrl+'file/static/settle/qitazhifu.png'}
				],
				cardtype:"",//卡类型
				zhifuname:'微信支付',//支付方式
				balanceBefore:'',  //充前余额
				balance:'',  //卡内金额
				rrmoney:'',  // 充值金额	
				
				rruse:'',//充值次数（面值次数）
				numberofuseBefore:'',//充前次数
				numberofuse:'',  //  剩余次数
				cardname:'',//卡有效期
				mctdname:'',//充值时长
				
				mc_pkid:'',
				remark3:'',
				card_id:'',
				shop_pkid:'',
				created_by:'',
				rr_type:'',
				
				chooseCardTypeIndex:'', //选卡时的角标
				
				// 顶部卡
				balanceview:'',
				card_name:'',
				mct_name:'',
				mct_pkid:'',
				mctd_img:'',
				
				chongZhiType:[], // 选卡的数组
				chooseState:0,//选中状态
				
				gogogobalance:'',  //充值成功后的金额
				gogogomaturity_time:'',  //充值成功后的时间
				gogogonumber_of_use:'',  //充值成功后的次数
				gogogomct_name:'',  //充值成功后的卡类型
				// code:'',  //充值成功后的交易编号
				
			};      
		},
		onLoad(option) {
				let _this = this;
				console.log("获取会员卡传来信息",option)
				_this.balanceBefore = option.balance;
				_this.created_by = option.created_by;
				_this.mc_pkid = option.mc_pkid;
				_this.number_of_use = option.number_of_use;
				_this.shop_pkid = option.shop_pkid;
				_this.mi_pkid = option.mi_pkid;
		
				_this.balanceview = option.balanceview;
				_this.card_id = option.card_id;
				_this.card_name = option.card_name;
				_this.mct_name = option.mct_name;
				_this.mct_pkid = option.mct_pkid;
				_this.shop_pkid = option.shop_pkid;
				_this.guoqi = option.guoqi;
				_this.card_level_discount = option.card_level_discount;
				_this.mctd_img = option.mctd_img;
				_this.numberofuseBefore = option.number_of_use;
		
				_this.CardType(_this.mct_name,_this.card_level_discount);
				
			},
		methods: {
		back(){
			uni.navigateBack({
				delta:1
			})
		},
		// 选择支付方式
		zhifuChange(index,payStypeVal){
			this.isCheckState = index;
			this.zhifuname = payStypeVal.name;
			console.log("this.zhifuname",this.zhifuname);
		},
		// 选卡
		chooseCardType(chongzhiTypeVal,index){
			let _this = this;
			_this.chooseCardTypeIndex = index;
			_this.chooseState = 1;
			console.log("选卡",chongzhiTypeVal);
		},
		//跳充值完成
		go_kaika_success(){
			let _this = this;
			let chooseCardTypeIndexs = _this.chooseCardTypeIndex; // 选卡时的角标	
			console.log("chooseCardTypeIndexs",chooseCardTypeIndexs);
			console.log("_this.chooseState",_this.chooseState)
			if(_this.chooseState == 0){
				uni.showToast({
					title:"请选择充值金额...",
					icon:"none"
				});
			}else{
				let mctdmonth = _this.chongZhiType[chooseCardTypeIndexs].cCt_mctd_month;//开通月数
				
				let balanceBefore = _this.balanceBefore;//储值卡原余额
				let mctdmoney = _this.chongZhiType[chooseCardTypeIndexs].cCt_mctd_money;// 充多少
				let mctdgivemoney = _this.chongZhiType[chooseCardTypeIndexs].cCt_mctd_money;// 送多少
				let mctdfrequency =  _this.chongZhiType[chooseCardTypeIndexs].cCt_mctd_frequency;//充值次数
				let numberofuseBefore = _this.number_of_use; //充前的次数
				let rrday = _this.chongZhiType[chooseCardTypeIndexs].cCt_mctd_month;//充值天数
				let mctdname = _this.chongZhiType[chooseCardTypeIndexs].cCt_mctd_name;//充值时长
				let mc_pkid = _this.mc_pkid;
				let balance = Number(balanceBefore) + Number(mctdmoney) + Number(mctdgivemoney);
				
				let number_of_use = Number(numberofuseBefore) + Number(mctdfrequency);
				// console.log(numberofuseBefore,mctdfrequency,"ssss")
				let remark3	= mctdmonth;
				let card_id  = _this.card_id;
				let shoppkid = _this.shop_pkid;//商店id
				let created_by = _this.created_by;//创建人
				let rr_type = _this.zhifuname;
				console.log("rr_type",rr_type);
				let rr_money = mctdmoney;
				let rr_day = rrday;
				let rr_use =  mctdfrequency;
				let remark2 = _this.guoqi;
				let code = "";
				// console.log("code",code)
				
				let  mi_pkid = _this.mi_pkid;
				uni.request({
					url:_this.httpUrl + 'Jni_Member_CardController/updateCardCZ.xsh',
					method:'POST',
					header:{ 'content-type':'application/x-www-form-urlencoded' },
					data:{
						mc_pkid:mc_pkid,
						balance:balance,
						number_of_use:number_of_use,
						remark3:remark3,
						card_id:card_id,
						shop_pkid:shoppkid,
						created_by:created_by,
						rr_type:rr_type,
						rr_money:rr_money,
						rr_day:rr_day,
						rr_use:rr_use,
						remark2:remark2
					},
					// 先获得交易编号
					success(res) {
						console.log("充值成功",res)
						 code = res.data.oc_code;
						// console.log("code",code)
						
						
						uni.request({
							url: _this.httpUrl + 'Jni_Member_CardController/selectCard.xsh',
							method: 'POST',
							header:{ 'content-type':'application/x-www-form-urlencoded' },
							data:{
								card_id:card_id,
								mi_pkid:mi_pkid
							},
							success(res) {
								console.log("res成功",res)
								let data = res.data.obj[0];
								_this.gogogobalance = data.balance;
								_this.gogogomaturity_time = data.maturity_time;
								_this.gogogonumber_of_use = data.number_of_use;
								_this.gogogomct_name = data.mct_name;
								
								setTimeout(()=>{
									uni.navigateTo({
										url:'../chongzhi_success/chongzhi_success?oc_code=' + code + '&rr_type=' + rr_type 
											+ '&gogogobalance=' + _this.gogogobalance + '&gogogomaturity_time=' + _this.gogogomaturity_time 
											+ '&gogogonumber_of_use=' + _this.gogogonumber_of_use + '&gogogomct_name=' + _this.gogogomct_name 
											+ '&gogogomct_name=' + _this.gogogomct_name
									});
								},100)
								_this.chooseState = 0;
								
							}
						})
						
						
					}
				});
				
			}
		},
		// 充值成功后的卡的内容
		chongZhiSucce(){
			let _this = this;
			let card_id = _this.card_id;
			let mi_pkid = _this.mi_pkid;
			uni.request({
				url: _this.httpUrl + 'Jni_Member_CardController/selectCard.xsh',
				method: 'POST',
				header:{ 'content-type':'application/x-www-form-urlencoded' },
				data:{
					card_id:card_id,
					mi_pkid:mi_pkid
				},
				success(res) {
					let data = res.data.obj[0]
					_this.gogogobalance = data.balance;
					_this.gogogomaturity_time = data.maturity_time;
					_this.gogogonumber_of_use = data.number_of_use;
					_this.gogogomct_name = data.mct_name;
					console.log("11111111111",_this.gogogobalance)
					
					
				}
			})
		},

		// 选择充值的类型
		CardType(card,time){
			let _this = this;
			// let len = 0;
			uni.request({
			    	url: _this.httpUrl + 'v_shop_card_infoController/find.xsh',
			    	method: 'POST',
			    	header:{ 'content-type':'application/x-www-form-urlencoded' },
			    	// header:{ "Content-Type":'application/json'},
			    	data:{
			    		shop_pkid:_this.shop_pkid,
			    		mct_pkid:_this.mct_pkid
			    	},
			    	success(res) {
			    		let data = res.data.obj;
			    		console.log("选择充值的类型",data)
						let cardleveldiscount = time;
			    		for(let i=0; i<data.length; i++){
			    			let chooseCardLeftBot = data[i].mctd_money;
							let mctddiscount = data[i].mctd_discount;	
							if(card == '储值卡' ){
								chooseCardLeftBot = data[i].mctd_give_money + data[i].mctd_money;
								if(data[i].is_used == '0'){
									_this.chongZhiType.push({
										chooseCardLeftBot:chooseCardLeftBot,
										cCt_created_by:data[i].created_by,
										cCt_created_date:data[i].created_date,
										cCt_mct_name:data[i].mct_name,
										cCt_mct_pkid:data[i].mct_pkid,
										cCt_mctd_discount:mctddiscount,
										cCt_mctd_frequency:data[i].mctd_frequency,
										cCt_mctd_give_money:data[i].mctd_give_money,
										cCt_mctd_img:data[i].mctd_img,
										cCt_mctd_money:data[i].mctd_money,
										cCt_mctd_month:data[i].mctd_month,
										cCt_mctd_name:data[i].mctd_name,
										cCt_mctd_pkid:data[i].mctd_pkid,
										cCt_mctd_royalty:data[i].mctd_royalty,
										cCt_updated_by:data[i].updated_by,
										cCt_updated_date:data[i].updated_date,
										cCt_updated_date:data[i].is_used  // 0可用，1不可用
									});
								}
							}else if(_this.mct_name == '打折卡' ){
														
								if(cardleveldiscount == mctddiscount){
									if(data[i].is_used == '0'){
										_this.chongZhiType.push({
											chooseCardLeftBot:chooseCardLeftBot,
											cCt_created_by:data[i].created_by,
											cCt_created_date:data[i].created_date,
											cCt_mct_name:data[i].mct_name,
											cCt_mct_pkid:data[i].mct_pkid,
											cCt_mctd_discount:mctddiscount,
											cCt_mctd_frequency:data[i].mctd_frequency,
											cCt_mctd_give_money:data[i].mctd_give_money,
											cCt_mctd_img:data[i].mctd_img,
											cCt_mctd_money:data[i].mctd_money,
											cCt_mctd_month:data[i].mctd_month,
											cCt_mctd_name:data[i].mctd_name,
											cCt_mctd_pkid:data[i].mctd_pkid,
											cCt_mctd_royalty:data[i].mctd_royalty,
											cCt_updated_by:data[i].updated_by,
											cCt_updated_date:data[i].updated_date,
											cCt_updated_date:data[i].is_used  // 0可用，1不可用
										});
									}
								}
							}else{
								if(data[i].is_used == '0'){
									_this.chongZhiType.push({
										chooseCardLeftBot:chooseCardLeftBot,
										cCt_created_by:data[i].created_by,
										cCt_created_date:data[i].created_date,
										cCt_mct_name:data[i].mct_name,
										cCt_mct_pkid:data[i].mct_pkid,
										cCt_mctd_discount:mctddiscount,
										cCt_mctd_frequency:data[i].mctd_frequency,
										cCt_mctd_give_money:data[i].mctd_give_money,
										cCt_mctd_img:data[i].mctd_img,
										cCt_mctd_money:data[i].mctd_money,
										cCt_mctd_month:data[i].mctd_month,
										cCt_mctd_name:data[i].mctd_name,
										cCt_mctd_pkid:data[i].mctd_pkid,
										cCt_mctd_royalty:data[i].mctd_royalty,
										cCt_updated_by:data[i].updated_by,
										cCt_updated_date:data[i].updated_date,
										cCt_updated_date:data[i].is_used  // 0可用，1不可用
									});
								}
							}
			    			
			    		}
	
			    	}
			    });
				
			
		},
		
		
	    }
	
};
</script>

<style>
	@import "../../colorui/main.css";
	@import "../../colorui/icon.css";
	html,body,.mains{
		height: 100%;
		overflow: hidden;
	}

	.contentbody{
	    height: 50%;
		overflow: auto;
		flex: 5;
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
		left: 60upx;
		font-size: 40upx;
	}
page {
	background-color: #ffffff;
}
.shu {
	color: #f54d28;
	font-size: 35upx;
	font-weight: bolder;
	padding-right: 10upx;
	display: flex;
	padding-left: 6%;
	padding-top: 4%;
	font-weight: 1500;
}
.huiyuan {
	padding-left: 2%;
	color: black;
}

.xinxi {
	position: relative;
	top: 150upx;
	width: 80%;
	height: 70%;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 8px;
	padding-bottom: 10%;
}
.xinin_x {
	display: flex;
	font-size: 30upx;
	padding-left: 10%;
	padding-top: 5%;
	font-weight: bold;
}
.xin_y1 {
	padding-left: 10%;
	position: relative;
	top: 7upx;
	padding-bottom: 2%;
	font-size: 30upx; 
	font-weight: normal;
	color: #333333;
}
.xin_y2 {
	padding-left: 10%;
	position: relative;
	top: -5upx;
	font-size: 25upx; 
	font-weight: normal;
	color: #333333;
}
.xian {
	background-color: #e5e5e5;
	width: 100%;
	height: 1upx;
	position: relative;
	top: 10upx;
}
.xian1 {
	background-color: #e5e5e5;
	width: 80%;
	height: 1upx;
	position: relative;
	left: 10%;
	top: 4upx;
}

/* 阴影 */
.yinying {
	width: 100%;
	height: 40upx;
	background-color: #f0f0f0;
	position: relative;
	top: 50upx;
}

/* 支付 */
.shu1 {
	color: #f54d28;
	font-size: 35upx;
	font-weight: bolder;
	display: flex;
	position: relative;
	padding-top: 4%;
	font-weight: 1500;
	left: -5upx;
	/* background-color: #000000; */
}
.zhifu {
	position: relative;
	top: 55upx;
	width: 90%;
	height: 340upx;
	margin: 0 auto;
	background-color: #ffffff;
	padding-bottom: 10%;
}
.section{
	height: 20upx;
	width: 20upx;
	float: right;
	top: 50upx;
	position: relative;
	right: 5upx;
}
/* 微信支付宝现金图标 */
.zhifu_image {
	height: 40upx;
	width: 40upx;
	margin-left: 10upx;
	margin-top: 30upx;
	position: relative;
	top: 10upx;
}
.zhifu_zf_zi{
	padding-left: 20upx;
	line-height: 60upx;
}
.zhifu_zf {
	margin-left: 30upx;
	position: relative;
	bottom: 10upx;
	width: 610upx;
}
.bottom {
	width: 100%;
	height: 8%;
	background-color: #ffffff;
	position: fixed;
	top: 92%;
}

.quxiao {
	width: 30%;
	height: 70upx;
	font-size: 28upx;
	position: relative;
	text-align: center;
	padding-top: 15upx;
	left: 10%;
	background: #0081ff;
	color: #ffffff;
	border-radius: 8px;
}
.queding {
	width: 30%;
	height: 70upx;
	font-size: 28upx;
	position: relative;
	text-align: center;
	padding-top: 15upx;
	background: #f87d24;
	color: #ffffff;
	left: 60%;
	bottom: 64%;
	border-radius: 8px;
}

/* 顶部卡 */
.Mo_Tai_Kuang_top{
	position: relative;
	margin: auto;
	margin-bottom: -160upx;
}

		.Mo_Tai_Kuang_card_image{
			height: 383upx;
			position: relative;
			width: 795upx;

		}
		.Mo_Tai_Kuang_card{
			position: relative;
			top: -235upx;
			padding-bottom: 40upx; 
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
		}
		.Mo_Tai_Kuang_cardtop{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			position: relative;
			top: -30upx;
			
		}
		.Mo_Tai_Kuang_cardVip{
			color: #FFFFFF;
			position: relative;
			left: 85upx;
			font-size: 55upx;
			top: -52upx;
		}
		.Mo_Tai_Kuang_cardTypeC{
			color: #FFFFFF;
			display: flex;
			justify-content: flex-end;    /* 靠右 */
			position: relative;
			right: 60upx;
			font-size: 37upx;
			top: -50upx
		}
		.Mo_Tai_Kuang_cardTypeE{
			color: #FFFFFF;
			display: flex;
			justify-content: flex-end;    /* 靠右 */
			position: relative;
			right: 40upx;
			font-size: 20upx;
			top: 0upx;
			display: none;
		}
		.Mo_Tai_Kuang_cardfooter{
			position: relative;
			top: 60upx;
		}
		.Mo_Tai_Kuang_noCard{
			color: #999999;
			font-size: 36upx;
			position: relative;
			left: 77upx;
			top:-43upx;
		}
		.Mo_Tai_Kuang_moneny{
			display: flex;
			justify-content: space-between;
			color: #666666;
		}
		.Mo_Tai_Kuang_moneny1{
			position: relative;
			left: 77upx;
			font-size: 37upx;
			top: -24rpx;
		}
		.Mo_Tai_Kuang_moneny2{
			position: relative;
			top:-24upx;
			right: 60upx;
			font-size: 37upx;
		}
		
/* 充值卡的类型 */
		.chongzhi_title{
			position: relative;
			font-weight:bold;
			color: #000000;
			font-size: 35upx;
			padding-left: 2%;
			margin-bottom: 20upx;
		}
		.typeBuJu{
			display: flex;
			flex-direction: row;
			width: 100%;
			flex-wrap: wrap;
		}
		.chongzhi_type{
			height: 120upx;
			width: 200upx;
		    display: flex;
			flex-direction: column;
			justify-content: center;
			border: solid 1upx #E5E5E5;
			text-align: center;
			border-radius: 8upx;
			margin-right: 40upx;
			position: relative;
			left: 40upx;
			margin-bottom: 20upx;
			color: #666666;
		}
		.orange{
			background: linear-gradient(to right,#F55328,#FA8724);
			color: #FFFFFF;
		}
		.chongzhi_shu{
			color: #f54d28;
			font-size: 35upx;
			font-weight: bolder;
			display: flex;
			padding-left: 4%;
			padding-top: 4%;
			font-weight: 1500;
		}
		.chongzhi_money{
			font-size: 30upx;
			font-weight:bold;
		}
		.chongzhi_money1{
			font-size: 24upx;
		}
		
</style>
