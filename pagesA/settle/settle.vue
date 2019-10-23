<template>
	<view class="bg">
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">0卡生活</view>
			<view class="nav-list"></view>
		</view>
		<view>
			<view class=" contentlist">
				<view class="orderlist">
					<view class="olistleft"></view>
					<view class="olist">
						<view>{{orderName}}</view>
						<view>{{userNo}}</view>
						<view>{{userDes}}</view>
					</view>
					<view class="olistleft"></view>
				</view>
			</view>
			<view class="order">
					<view class="card-menu"  :style="{opacity:cardshow}">
						<scroll-view scroll-x="true" class="scrollview" @scroll="scroll" scroll-left="0" v-for="(card,index)  in imgCards" :key="index" @click="cardcheck(card,index)" >
							 <image :src="card.path" class="imgborder" :class="{MenuCurrent:cardIndex === index}">
							<view class="card">
								<view class="cardtop">
									<view class="cardVip">
										VIP
									</view>
									<view class="cardTypeC">
										{{card.title}}
									</view>
								</view>
								
								<view class="noCard">
									NO.{{card.cardids}}
								</view>
								<view class="moneny">
									<view class="moneny1">
										{{card.remark3}}
									</view>
									<view class="moneny2">
										{{card.desnow}}
									</view>
								</view>  
							</view>
						</image>
						</scroll-view>
					</view>
					<!---支付方式---->
					<view class="settleStyle">
						<view class="title">
							<view class="titleline"></view>抵扣支付方式
						</view>
						<view class="sel">
							<view class="sellist" @click="sel(index)" v-for="(sellist,index) in settleArray" :key="index">
								<label><image :src="sellist.styleIcon" mode="" class="selStyle"></image>{{sellist.styleTitle}}</label>
								<label><image :src="Ischeck===index?checkedIcon:selIconState" mode="" class="selState"></image></label> 
							</view>
						</view>
					</view>
			</view>
		</view>
		<view class="foot" @click="newOrder">
			<button class="btn">结账({{totalPrices}}元)</button>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
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
	console.log(dateRes)
	
	let nowyearcard = year+"-"+mon+"-"+day;//当前年日期
	let yearcard1 = nowyearcard.replace(/-/g, "/");
	var yc1=new Date(Date.parse(yearcard1)); 
	
	export default {
		components: {
		    uniSwipeAction
		},
		data() {
			return {
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',//返回图片
				telvalue:"",//手机号
				cardshow:1,//是否显示
				cardIndex:null,//卡片选择
				orderName:"散客",//客户
				username:"",//主工员工
				assisant:"",//助理
				userNo:"",//员工编号
				userDes:"",//项目
				shop_pkid:"",//店铺id
				order_code:"",//订单编号
				totalPrice:"",//价格
				totalPrices:0,//折扣价
				zkdate:"",//折扣日期
				recharge_type:"",//支付方式
				balance:"",//卡余额
				cardid:"",//主键id
				card_ids:"",//卡id
				zkname:"",
				cardnames:"",//几折
				number_of_use:"",//卡次数
				jzType:"",//是否是散客
				Ischeck:null,
				styleNum:0,//判断是否是非会员支付
				maturitytime:"",//判断日期
				imgCards:[],
				checkedIcon:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-sel@3x.png",
				selIconState:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-nor@3x.png",
				settleArray:[
					{
						styleIcon:this.httpUrl+"file/static/settle/jiezhang-icon-wxzf@3x.png",
						styleTitle:"微信支付"
					},
					{
						styleIcon:this.httpUrl+"file/static/settle/jiezhang-icon-zfbzf@3x.png",
						styleTitle:"支付宝支付"
					},
					{
						styleIcon:this.httpUrl+"file/static/settle/jiezhang-icon-xjzf@3x.png",
						styleTitle:"现金支付"
					},
					{
						styleIcon:this.httpUrl+"file/static/settle/qitazhifu.png",
						styleTitle:"其它支付"
					}
				],
				balanceTotal:0//卡总余额
			}
		},
		onLoad(option) {
			console.log(option);
			let _this=this;
			_this.assisant=option.assisant;
			_this.username=option.username;
			_this.userNo=option.order_code;
			_this.userDes=option.userDes;
			_this.shop_pkid=option.shop_pkid;//店铺id
			_this.order_code=option.order_code;//订单编号
			_this.totalPrice=option.totalPrice;//价格
			_this.totalPrices = _this.totalPrice;
			_this.telvalue = option.telphone;//手机号
			let jzType = option.jzType;//支付者来源（散客或手机号或会员卡）
			_this.jzType = option.jzType;
			uni.request({
				url: _this.httpUrl+'Jni_Member_InfoController/findById.xsh?mi_mobile='+_this.telvalue,
				method: 'GET',
				data:{},
				success(res) {
					console.log("获取会员信息",res)
					_this.orderName=res.data.obj_three[0].name;
				},
				fail(err) { 
					console.log("响应失败",err);
				}
			});
			if(jzType == "散客结账"){
				_this.cardshow = 0;
				
			}else{
				console.log(this.httpUrl+'Jni_Member_CardController/selectCard.xsh?shop_pkid='+_this.shop_pkid+"&mi_mobile="+_this.telvalue)
				uni.request({
					url: this.httpUrl+'Jni_Member_CardController/selectCard.xsh?shop_pkid='+_this.shop_pkid+"&mi_mobile="+_this.telvalue,
					method: 'GET',
					//header: {'content-type': "application/x-www-form-urlencoded"},
					data:{},
					success(res) {
						console.log("获取会员卡种",res)
						_this.orderlists = [];
						let obj = res.data.obj;
						_this.imgCards = [];
						
						for(let k in obj){
							let des = "";
							let cardtime = obj[k].card_name;
							let cardimg = obj[k].mctd_img;
							if(obj[k].mct_name == "次数卡"){
								des = obj[k].number_of_use + "次";
								cardtime = cardtime+"次数卡";
							}
							else if(obj[k].mct_name == "时效卡"){
								des = "";
								cardtime = obj[k].created_date;
								cardtime = cardtime.replace(new RegExp('/','g'),".");
								cardtime = cardtime.replace(new RegExp('-','g'),".");
								
								let recordtimecards = obj[k].maturity_time;
								recordtimecards = recordtimecards.replace(new RegExp('/','g'),".");
								recordtimecards = recordtimecards.replace(new RegExp('-','g'),".");
								
								cardtime = "有效期"+cardtime+"-"+recordtimecards;
								
								let timecard = obj[k].maturity_time;
								let timecard2 = timecard.replace(/-/g, "/");
								let tc2=new Date(Date.parse(timecard2));  
								if(Number(yc1) > Number(tc2)){
									cardimg = this.httpUrl+'file/static/jiantouka_tupian/outdate@2x.png';
								}
							}
							else if(obj[k].mct_name == "打折卡"){
								let recordtimecards = obj[k].maturity_time;
								des = recordtimecards+"到期";
								cardtime = cardtime;
								
								let recordtimecards2 = recordtimecards.replace(/-/g, "/");
								let rtc2=new Date(Date.parse(recordtimecards2));  
								if(Number(yc1) > Number(rtc2)){
									cardimg = '../../static/outdate.png';
								}
							}else{
								des = obj[k].balance + "元";
							}
							_this.imgCards.push(
								{
									path:cardimg,
									title:obj[k].mct_name,
									card_name:obj[k].card_name,
									discount:obj[k].mctd_discount,
									balance:obj[k].balance,
									cardid:obj[k].mc_pkid,
									cardids:obj[k].card_id,
									number_of_use:obj[k].number_of_use,
									maturity_time:obj[k].maturity_time,
									remark3:cardtime,
									desnow:des
								}
							);
						}
						
					},
					fail(err) { 
						console.log("响应失败",err);
					}
				});
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			//结账成功
			newOrder(){
				
				let _this = this;
				let yearcard = _this.maturitytime;//时效卡日期
				let yearcard2 = yearcard.replace(/-/g, "/"); 
				var yc2=new Date(Date.parse(yearcard2));  
				
				let zkcard = _this.zkdate;//折扣卡日期
				let zkcard2 = zkcard.replace(/-/g, "/"); 
				var zk2=new Date(Date.parse(zkcard2));  
	
				if(_this.recharge_type !== ""){
					if(Number(_this.balanceTotal) < Number(_this.totalPrices) && _this.zkname == "储蓄卡"){
						uni.showToast({
							title:"卡余额不足,请选择其他方式支付",
							icon:"none"
						});
						return false;
					}
					else if(Number(yc1) > Number(yc2) && _this.zkname == "时效卡"){
						uni.showToast({
							title:"时效卡已过期,请选择其他方式支付",
							icon:"none"
						});
						return false;
					}
					else if(Number(yc1) > Number(zk2) && _this.zkname == "打折卡" && _this.recharge_type !==""){
						uni.showToast({
							title:"该打折卡已过期,请选择其他方式支付",
							icon:"none"
						});
						return false;
					}
					else if(Number(yc1) <= Number(zk2) && _this.zkname == "打折卡" && _this.recharge_type !==""){
						_this.recharge_type = _this.cardnames+","+_this.recharge_type;
						return false;
					}
					else if(_this.zkname == "次数卡" && Number(_this.number_of_use) == 0){
						uni.showToast({
							title:"卡剩余次数不足,请选择其他方式支付",
							icon:"none"
						});
						return false;
					}else{
						uni.showToast({
							title:"加载中...",
							icon:"loading"
						});
						
						if(_this.jzType !== "散客结账"){
							console.log("!散客");
							uni.request({
								url: _this.httpUrl+'Jni_Member_CardController/updateCard.xsh',
								method: 'POST',
								header: {
									'content-type': "application/x-www-form-urlencoded"
								},
								data: {
									created_by:_this.username,//主工
									created_assist:_this.assisant,//付工
									cr_money:_this.totalPrices,//花多钱
									recharge_type:_this.recharge_type,//支付方式
									shop_pkid:_this.shop_pkid,//商店id
									order_code:_this.order_code,//订单id
									balance:_this.balance,//卡余额
									mc_pkid:_this.cardid,//主键id
									card_id:_this.card_ids,//卡id
									number_of_use:_this.number_of_use//次卡次数
								},
								success(Result) { 
									console.log("更新结账成功111",Result);
								},
								fail(err) {
									console.log(err)
								}
							});
						}else{
							console.log("散客");
							uni.request({
								url: _this.httpUrl+'Jni_Consumption_RecordController/add_sanhu.xsh',
								method: 'POST',
								header: {
									'content-type': "application/x-www-form-urlencoded"
								},
								data: {
									created_by:_this.username,//主工
									created_assist:_this.assisant,//付工
									cr_money:_this.totalPrices,//花多钱
									recharge_type:_this.recharge_type,//支付方式
									shop_pkid:_this.shop_pkid,//商店id
									order_code:_this.order_code,//订单id
								},
								success(Result) { 
									console.log("结账成功",Result);
								},
								fail(err) {
									console.log(err)
								}
							});
						}
						let balance = _this.balance;
						if(_this.recharge_type == "次数卡支付"){
							balance = _this.number_of_use;
						}
						 setTimeout(()=>{
							uni.navigateTo({ 
								url:"../settleSuccess/settleSuccess?order_code="+_this.order_code+"&recharge_type="+_this.recharge_type+"&dateRes="+dateRes+"&balance="+balance+"&shop_pkid="+_this.shop_pkid+"&totalprices="+_this.totalPrices
							})
						},2000) 
					}	
				}else if(_this.recharge_type == "" && _this.zkname == "打折卡"){
					uni.showToast({
						title:"请选择折扣方式支付",
						icon:"none"
					});
				}else{
					uni.showToast({
						title:"请选择好付款方式...",
						icon:"none"
					});
				} 
			},
			//选择方式
			sel(index){
				let _this = this;
				console.log("支付方式："+_this.settleArray[index].styleTitle)
				_this.recharge_type = _this.settleArray[index].styleTitle;
				_this.Ischeck = index;
				_this.totalPrices = _this.totalPrice;
				
				console.log("zkname",_this.zkname)
				if(_this.zkname != "打折卡"){
					_this.cardIndex = null;
					_this.balance = "";
					_this.cardnames ="";
					/* this.maturitytime ="";
					this.zkdate = ""; */
					_this.jzType="散客结账";
				}else{
					_this.jzType="手机号结账";
				}
			
				console.log(_this.totalPrices,_this.jzType)
			},
			//选择卡片
			cardcheck(e,index){
				console.log("卡片",e)
				this.recharge_type = e.title+"支付";
				this.cardnames ="";
				this.maturitytime ="";
				this.zkdate = "";
				this.zkname = e.title;
				
				if(e.title == "次数卡"){
					console.log("次数卡前",e.number_of_use)
					this.number_of_use = e.number_of_use-1;
					console.log("次数卡",this.number_of_use);
					this.totalPrices = this.totalPrice;
					this.balanceTotal = this.totalPrices;
					this.balance = parseFloat(e.balance);
					console.log(this.totalPrices,this.recharge_type,this.balance,this.cardid)
				}else if(e.title == "时效卡"){
					this.number_of_use = e.number_of_use + 1;
					console.log("时效卡",this.number_of_use);
					this.maturitytime = e.maturity_time;
					this.totalPrices = this.totalPrice;
					this.balanceTotal = this.totalPrices;
					this.balance = parseFloat(e.balance);
					console.log(this.totalPrices,this.recharge_type,this.balance,this.cardid,this.maturitytime)
				}
				else if(e.title == "打折卡"){
					this.number_of_use = e.number_of_use;
					this.totalPrices =  this.totalPrice * e.discount;
					this.totalPrices = this.totalPrices.toFixed(2);
					this.balanceTotal = parseFloat(e.balance);
					this.balance = parseFloat(e.balance);
					this.zkdate = e.maturity_time;
					this.recharge_type = "";
					this.cardnames = e.card_name;
					console.log(this.totalPrices,this.recharge_type,this.balance,this.cardid,this.zkdate,this.zkname)
				}else if(e.discount == 0){
					this.number_of_use = e.number_of_use;
					this.totalPrices = this.totalPrice;
					this.balance = parseFloat(e.balance) - this.totalPrices;
					this.balance = this.balance.toFixed(2);
					this.balanceTotal = this.balance;
					console.log(this.totalPrices,this.recharge_type,this.balance,this.cardid)
				}else{
					this.number_of_use = e.number_of_use;
					this.totalPrices = this.totalPrice * e.discount;
					this.totalPrices = this.totalPrices.toFixed(2);
					this.balance = parseFloat(e.balance) - this.totalPrices;
					this.balanceTotal = this.balance;
					console.log(this.totalPrices,this.recharge_type,this.balance,this.cardid)
				}
				this.cardid = e.cardid;
				this.card_ids = e.cardids;
				this.cardIndex = index;
				this.Ischeck = null;
				this.jzType="手机号结账";
			}
		}
	}
</script>
<style>
  /* @import url("../../static/iconfont/iconfont.css"); */
	
	/******最外层*****/
	html,body,.bg{
		box-sizing: border-box;
		height: 100%;
		padding: 0;
	}
	.bg{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		
	}
	.order{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0;
		}
	
	.seltbl{
		height: 100%;
		flex: 1;
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
		left: 20upx;
		
	}
	/***主体****/
	.contentlist{
		text-align: center;
		justify-content: center;
		height: 250upx;
		margin-top: 30upx;
		margin-bottom: 20px;
		width: 100%;
	}
	.orderlist{
		margin: 0 auto;
		background-image: url(../../static/jiezhang-xzyg@3x.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		zoom: 1;
		width: 680upx;
		height: 250upx;
		color: #fff;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
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
	/****卡片选择***/
	.card-menu{
		
		display: flex;
		overflow-x: auto;
		box-sizing: border-box;
	}
	 ::-webkit-scrollbar {
	      width: 0px;
	      background-color: transparent;
	    }
	.scrollview{
		border:1px solid #fff;
		height: 240upx;
		flex: 1;
	}
	/* 13998370319 */
	.MenuCurrent{
		border:1px solid #FD9821 !important;
		height: 230upx;
	}
	.imgborder{
		border:1px solid #fff;
		width: 367upx;
		height: 230upx;
	}
	.card{
			width: 100%;
			position: relative;
			top: -245upx;
			height: 242upx;
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
			position: relative;
			top: 10upx;
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
			top:30upx;
		}
		.moneny{
			display: flex;
			justify-content: space-between;
			color: #666666;
			position: relative;
			top: 10upx;
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
	/***支付方式***/
	.settleStyle{
		border-top: 10pt solid #F0F0F0;
		padding: 30upx;
		box-sizing: border-box;
	}
	/**付款方式**/
	.title{
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		font-weight: 600;
	}
	.titleline{
		height: 20upx;
		border: 4upx solid #F86926;
		margin-right: 15upx;
	}
	.sel{
		padding-top: 20upx;
	}
	.sellist{
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10upx;
		border-bottom: 1upx dotted #E5E5E5;
	}
	.sellist>label{
		font-size: 0.8rem;
	}
	.selStyle{
		width: 50upx;
		height:50upx;
		margin-right: 35upx;
		position: relative;
		top: 15upx;
	}
	.selState{
		width: 30upx;
		height:30upx;
		position: relative;
		top: 20upx;
	}
	
	
	/**底部**/
	.foot{
		background-color: #FAFAFA;
		width: 100%;
		height: 90upx;
		position:absolute;
		bottom:0px;
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
