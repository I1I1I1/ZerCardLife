<template>
	<view class="main">
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">选充值卡</view>
			<view class="nav-list"></view>
		</view>
		<view class="shu">
			|
			<view class="dengji huiyuan">会员信息</view>
		</view>
		<view class="huiyuan_xinxi">
			<view class="info">
				<view class="name">
					{{ name }} 
				</view>
				<view class="number">  
					{{ number }}
				</view>
			</view>
			<view class="huiyuan_xinxi_image"></view>			
		</view>
		<!-- 阴影 -->
		<view class="yinying"></view>
		<view class="huiyuanka">
			<view class="shu">  
				|
				<view class="dengji huiyuan">会员卡</view>
			</view>
			<view class="kabody">
				<view class="huiyuan_kaImg" >
					<view class="huiyuan_kaImg_r" v-for="(imgVal, index) in img" :key="index" @click="goChongZhiJinE(imgVal,index)">
						<image :src="imgVal.mctd_img" mode="" class="card_image"></image>
							<view class="card">
								<view class="cardtop">
									<view class="cardVip">
										VIP
									</view>
									<view class="cardTypeC">
										{{imgVal.mct_name}}
									</view>
								</view>
								<view class="cardfooter"> 
									<view class="noCard">
										NO.{{imgVal.card_id}}
									</view>
									<view class="moneny">
										<view class="moneny1">
											{{imgVal.card_name}}
										</view>
										<text class="moneny2">
											{{imgVal.balanceview}}
										</text>
									</view> 
								</view>
							</view>
							
						</view>
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
				name:'',
				number:'',
				img:[],
				created_by:'',
				shop_pkid:'',
				mi_pkid:'',
				guoqi:'0',
				chooseCardLeftBot:'',  // 选择卡时候的右下角显示内容
				imageIndex:'',  //会员卡角标
				chooseCardTypeIndex:'',  // 选卡时的角标
				goChongZhiType:[], //判断能否跳下一页的数组
				chongZhiType:[], // 能否跳转下一页
			}
		},
		onLoad(option) {
			console.log(option)
			let _this = this;
			_this.shop_pkid = option.shop_pkid;
			_this.mi_pkid = option.mi_pkid;
			_this.created_by = option.created_by;
			_this.gethuiyuan();
		},
		methods: {
			// 获得选卡时的角标
			chongzhi(chooseCardTypeVal,index){
				let _this = this;
				_this.chooseCardTypeIndex = index;
				_this.cardIndex = index;
				console.log(chooseCardTypeVal)
				console.log("_this.chooseCardTypeIndex",_this.chooseCardTypeIndex)
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			gethuiyuan(){
					let _this = this
					_this.shop_pkid = _this.shop_pkid,
					_this.mi_pkid = _this.mi_pkid
					uni.request({
				 		 url: _this.httpUrl + '	Jni_Member_InfoController/findById.xsh',
				 		 method: 'POST',
						 header:{ 'content-type':'application/x-www-form-urlencoded' },
						 data:{
							 shop_pkid:_this.shop_pkid,
							 mi_pkid:_this.mi_pkid
						 },
				 		 success(res){ 
							console.log('res',res)
							let obj1 = res.data.obj_one;
							let obj2 = res.data.obj_two;
						  
							// 会员姓名和会员号
							for (let i=0; i<obj1.length; i++) {
								_this.name=obj1[i].name, 
								_this.number= obj1[i].mi_pkid								
							}
							
							for(let i=0; i<obj2.length; i++){
								let balanceobj = obj2[i].balance+"元";
								let cardname = obj2[i].card_name;
								//获取会员卡图片
								let imgurl = "";
								if(obj2[i].mct_name == '时效卡'){
									balanceobj = "";
									let updateddate = obj2[i].updated_date;
									updateddate = updateddate.replace(new RegExp('/','g'),".");
									updateddate = updateddate.replace(new RegExp('-','g'),".");
									
									let maturitytime = obj2[i].maturity_time;
									maturitytime = maturitytime.replace(new RegExp('/','g'),".");
									maturitytime = maturitytime.replace(new RegExp('-','g'),".");
									
									cardname = "有效期"+updateddate+"-"+maturitytime;
									// 是否过期
										let date = new Date();
										//console.log(date)
										//let date1 =date.setDate(date.getDate());
										let nowyear = date.getFullYear();
										let nowmonth = date.getMonth()+1;
										if(nowmonth < 10){
											nowmonth = "0" + nowmonth;
										}
										let nowdate = date.getDate();
										if(nowdate < 10){
											nowdate = "0"+nowdate
										}
										//当前时间
										let d1 = nowyear+"-"+nowmonth+"-"+nowdate;
										let date1 = new Date(d1.replace(/-/g,"\/"));
										date1 = Date.parse(date1);
										//console.log("时间戳1："+date1);
										//获取循环出日期
										 let d2 = obj2[i].maturity_time;
										 let date2 = new Date(d2.replace(/-/g,"\/"));
										 date2 = Date.parse(date2);
										// console.log("时间戳2："+date2);
										//日期比较
										 if(date1>date2){
											imgurl = _this.httpUrl+'file/static/jiantouka_tupian/outdate@2x.png';
											_this.guoqi = '1';
										}else{
											imgurl = obj2[i].mctd_img;
											_this.guoqi = '0';
										}
									// 是否过期结束	
									
								}
								if(obj2[i].mct_name == '储值卡'){
									imgurl = obj2[i].mctd_img;
								}
								if(obj2[i].mct_name == '打折卡'){
									
									let maturitytime = obj2[i].maturity_time;
									maturitytime = maturitytime.replace(new RegExp('/','g'),".");
									maturitytime = maturitytime.replace(new RegExp('-','g'),".");
									balanceobj = maturitytime +'到期';
									console.log("maturitytime",maturitytime)
									// 是否过期
										let date = new Date();
										console.log("date",date)
										let nowyear = date.getFullYear();
										let nowmonth = date.getMonth()+1;
										if(nowmonth < 10){
											nowmonth = "0" + nowmonth;
										}
										let nowdate = date.getDate();
										if(nowdate < 10){
											nowdate = "0"+nowdate
										}
										//当前时间
										let d1 = nowyear+"-"+nowmonth+"-"+nowdate;
										let date1 = new Date(d1.replace(/-/g,"\/"));
										date1 = Date.parse(date1);
										//获取循环出日期
										 let d2 = obj2[i].maturity_time;
										 let date2 = new Date(d2.replace(/-/g,"\/"));
										 date2 = Date.parse(date2);
										 console.log("11",date1,"22",date2)
										//日期比较
										 if(date1>date2){
											 console.log("454545",date1,date2)
											imgurl = _this.httpUrl+'file/static/jiantouka_tupian/outdate@2x.png';
											_this.guoqi = "1";
										}else{
											imgurl = obj2[i].mctd_img;
											_this.guoqi = "0";
										}
									// 是否过期结束	
								}
								
								if(obj2[i].mct_name == '次数卡'){
									balanceobj = obj2[i].number_of_use+"次";
									imgurl = obj2[i].mctd_img;
								}
								
							
								 _this.img.push({
									 guoqi:_this.guoqi,
									 balance: obj2[i].balance,
									 balanceview: balanceobj,
									 card_id : obj2[i].card_id,
									 card_level_discount : obj2[i].mctd_discount,
									 card_name : cardname,
									 default_card : obj2[i].default_card,
									 mctd_img : imgurl,
									 is_used : obj2[i].is_used,
									 maturity_time : obj2[i].maturity_time,
									 mc_pkid : obj2[i].mc_pkid,
									 mct_pkid : obj2[i].mct_pkid,  //会员卡会员主键
									 mi_pkid : obj2[i].mi_pkid,
									 number_of_use : obj2[i].number_of_use,
									 card_id: obj2[i].card_id,
									 mct_name: obj2[i].mct_name,
									 created_date:obj2[i].created_date,
									 updated_date:obj2[i].updated_date,
									 is_used:obj2[i].is_used,
								 })		
							}
				 		 }, 
				 		 fail(err){
				 			 console.log("响应失败",err)
				 		 }
					})
			},
			// 点击选充值类型
			goChongZhiJinE(imgVal,index){
				let _this = this;
				
				console.log("imgVal",imgVal)
				console.log("index",index)
				_this.imageIndex = index;
				_this.mctd_img = imgVal.mctd_img; 
				_this.card_name = imgVal.card_name;
				_this.balanceview = imgVal.balanceview;
				_this.balance = imgVal.balance;  //余额
				_this.card_id = imgVal.card_id;  //卡号
				_this.card_level_discount = imgVal.card_level_discount;  //折扣
				_this.default_card = imgVal.default_card;  //默认支付
				_this.is_used = imgVal.is_used;  //启用状态
				_this.maturity_time = imgVal.maturity_time;  //到期时间
				_this.mc_pkid = imgVal.mc_pkid;  //会员卡信息表主键
				_this.mct_name = imgVal.mct_name;  //卡种中文
				_this.mct_pkid = imgVal.mct_pkid;  //会员卡类型表主键
				_this.mi_pkid = imgVal.mi_pkid;  //会员信息主键
				_this.number_of_use = imgVal.number_of_use;  //使用次数 
				_this.is_used = imgVal.is_used; // 是否还有卡 0 有卡
				_this.guoqi = imgVal.guoqi;
				console.log("_this.guoqi",_this.number_of_use)
				
				
				_this.CardType(_this.mct_name, _this.card_level_discount);
				
				
				
			},
			
			// 跳转到下一页
			gogogo(){
				let _this = this;
				uni.navigateTo({
					url:'../chongzhi_jine/chongzhi_jine1?shop_pkid=' + _this.shop_pkid + '&mct_pkid=' + _this.mct_pkid
						+ '&mct_name='+ _this.mct_name + '&card_id=' +_this.card_id + '&card_name='+ _this.card_name
						+ '&balanceview=' + _this.balanceview + '&guoqi=' + _this.guoqi + '&card_level_discount=' + _this.card_level_discount
						+ '&mctd_img=' + _this.mctd_img  + '&number_of_use=' + _this.number_of_use + '&mc_pkid=' + _this.mc_pkid + '&balance=' + _this.balance
						+ '&created_by=' + _this.created_by + '&mi_pkid=' + _this.mi_pkid
				})
			},
			// 判断有没有这种充值卡能不能跳转
			CardType(mct_name,card_level_discount){
				let _this = this;
				let len = 0;
				_this.chongZhiType = []
				
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
				    		console.log("555555",data)
							let cardleveldiscount = card_level_discount;
				    		for(let i=0; i<data.length; i++){
				    			let chooseCardLeftBot = data[i].mctd_money;
								let mctddiscount = data[i].mctd_discount;	
								if(mct_name == '储值卡' ){
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
								}else if(mct_name == '打折卡' ){
															
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
				
							len = _this.chongZhiType.length;
							console.log("len",len)
							if( len == 0){
									uni.showToast({
										title: '此卡已下架',
										duration: 1000,
										icon: 'none'
									});
							}else{
									_this.gogogo();
							}
				    			
				    		
				    	}
				    });
					
				
			},
			
			
		
			
		}
	}
</script> 

<style>
	@import url("../../colorui/main.css");
	@import url("../../colorui/icon.css");
.MenuCurrent{
  border:1px solid #FD9821 !important;
  height: 230upx;
 }
.content1{
	height: 150upx;
}
page{
	background-color: #FFFFFF;
}
body,.main,.kabody,.huiyuanka{
	height: 100%;
	overflow: hidden;
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
.shu {
	color: #f54d28;
	font-size: 35upx;
	font-weight: bolder;
	padding-right: 10upx;
	display: flex;
	padding-left: 4%;
	padding-top: 4%;
	font-weight: 1500;
}
.huiyuan {
	padding-left: 2%;
	color: black;
}
.xinxi{
	position: relative;
	top: 150upx;
	width: 80%;
	height: 70%;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 8px;
	padding-bottom: 10%;
}

.info{
	display: flex;
	flex-direction: column;
	z-index: 10;
	position: relative;
	top: 78upx;
	left: 235upx;
	color: #FFFFFF;
}
.name{
	font-size: 30upx;
}
.number{
	position: relative;
	top: 30upx; 
}
.huiyuan_xinxi {
	height: 280upx;
	
}

.huiyuan_xinxi_image{
	position: relative;	
	top: -64upx;
	background-image: url('../../static/chongzhi_xuanka/jiezhang-xzyg@2x.png');
	background-size:110% 110% ;
	background-repeat:no-repeat ;
	background-position: center;
	width: 106%;
	height: 116%;
	z-index: 3;
	margin-top: -55upx;

	/* background-color: #007AFF; */
} 


.huiyuan {
	padding-left: 2%;
	color: black;
}
.shu{
	color: #f54d28;
	font-size: 35upx;
	font-weight: bolder;
	padding-right: 10upx;
	display: flex;
	padding-left: 4%;
	padding-top: 4%; 
	font-weight: 1500;
}

/* 阴影 */
.yinying {
	width: 100%;
	height: 90upx;
	background-color: #f0f0f0;
	position: relative;
	top: -50upx;
	z-index: 1;
}
.huiyuanka{
	position: relative;
	top: -40upx;
}
.kabody{
	height: 50%;

	overflow-y: scroll !important;
}
.huiyuan_kaImg{
	display: flex;
	width: 100%;
	flex-flow:row wrap;
	justify-content:flex-start;
	align-items:center;
	padding-left: 20upx;
	padding-right: 20upx;
	
	
}

.huiyuan_kaImg_r{
	width: 50%;
	flex-flow:row wrap;
	margin-bottom: 100upx;
	height: 115upx;

}

/* 卡的样式 */
	.card_image{
		height: 230upx;
	}
	
	.card{
			width: 100%;
			position: relative;
			top: -235upx;
			/* height: 300upx; */
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
		.cardfooter{
			position: relative;
			top: 60upx;
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
			font-size: 21upx;
			
		}
		.moneny2{
			position: relative;
			top:-2upx;
			right: 40upx;
			font-size: 23upx;
		}

/* 模态框 */
.modalbg{
	width:100%;
	height: 100%;
	opacity: 0.3;
	overflow: hidden;
	background-color: #000000;
	position: fixed;
	z-index: 15;
}
.Mo_Tai_Kuang{
	display: flex;
	flex-direction:column;
	position: relative;
	height: 80%;
	width: 600upx;
	border:1px solid #000000;
	background-color: #fff !important;
	opacity: 1 !important;
	z-index: 27;
	align-items: center;
	justify-content: center;
	margin: auto;
	margin-top: 50upx;
}

.Mo_Tai_Kuang_top{
	position: relative;
	margin: auto;
}
.zhong_wen_chong_ka{
	margin-top: -124upx;
}
.Mo_Tai_Kuang_bottom{
	height: 500upx;
	overflow-y: auto !important;
	border: 1px solid #F0F0F0;
	border-left: transparent;
	border-right: transparent;
	position:relative;
	
}
		.Mo_Tai_Kuang_card_image{
			height: 333upx;
			position: relative;
			width: 595upx;

		}
		.Mo_Tai_Kuang_card{
			/* width: 100%; */
			/* height: 300upx; */
			position: relative;
			top: -235upx;
			/* height: 300upx; */
			/* padding-top: 40upx; */
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
			left: 80upx;
			font-size: 55upx;
		}
		.Mo_Tai_Kuang_cardTypeC{
			color: #FFFFFF;
			display: flex;
			justify-content: flex-end;    /* 靠右 */
			position: relative;
			right: 60upx;
			font-size: 37upx;
		
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
			font-size: 29upx;
			position: relative;
			left: 77upx;
			top:-7upx;
		}
		.Mo_Tai_Kuang_moneny{
			display: flex;
			justify-content: space-between;
			color: #666666;
		}
		.Mo_Tai_Kuang_moneny1{
			position: relative;
			left: 77upx;
			font-size: 25upx;
			
		}
		.Mo_Tai_Kuang_moneny2{
			position: relative;
			top:-2upx;
			right: 60upx;
			font-size: 26upx;
		}
		
	/* 模态框选择卡类型 */
	.Mo_Tai_Kuang_bottom_card{
		/* width: 100%; */
		/* height: 300upx; */
		position: relative;
		top: -235upx;
		/* height: 300upx; */
		/* padding-top: 40upx; */
		padding-bottom: 40upx; 
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		margin-bottom: -175upx;

	}
	.Mo_Tai_Kuang_bottom_cardtop{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		top: -30upx;
		
	}
	.Mo_Tai_Kuang_bottom_cardVip{
		color: #FFFFFF;
		position: relative;
		left: 80upx;
		font-size: 55upx;
	}
	.Mo_Tai_Kuang_bottom_cardTypeC{
		color: #FFFFFF;
		display: flex;
		justify-content: flex-end;    /* 靠右 */
		position: relative;
		right: 60upx;
		font-size: 37upx;
	
	}
	.Mo_Tai_Kuang_bottom_cardTypeE{
		color: #FFFFFF;
		display: flex;
		justify-content: flex-end;    /* 靠右 */
		position: relative;
		right: 40upx;
		font-size: 20upx;
		top: 0upx;
		display: none;
	}
	.Mo_Tai_Kuang_bottom_cardfooter{
		position: relative;
		top: 60upx;
	}
	.Mo_Tai_Kuang_bottom_noCard{
		color: #999999;
		font-size: 29upx;
		position: relative;
		left: 77upx;
		top:-7upx;
	}
	.Mo_Tai_Kuang_bottom_moneny{
		display: flex;
		justify-content: space-between;
		color: #666666;
	}
	.Mo_Tai_Kuang_bottom_moneny1{
		position: relative;
		left: 77upx;
		font-size: 25upx;
		
	}
	.Mo_Tai_Kuang_bottom_moneny2{
		position: relative;
		top:-2upx;
		right: 60upx;
		font-size: 26upx;
	}
	/* 模态框按钮 */
	.Mo_Tai_Kuang_button{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		top: 30upx;
		color: #FFFFFF;
	}
	.Mo_Tai_Kuang_button_quxiao{
		height: 60upx;
		width: 170upx;
		background: #1E90FF;
		text-align: center;
		font-size: 30upx;
		position: relative;
		top: 0upx;
		border-radius:5px;
		left: 65upx;
		line-height: 60upx;
	}
	.Mo_Tai_Kuang_button_queren{
		height: 60upx;
		width: 170upx;
		background: #F87D24;
		text-align: center;
		font-size: 30upx;
		position: relative;
		top: 0upx;
		border-radius:5px;
		right:65upx;
		line-height: 60upx;
	}
</style>
