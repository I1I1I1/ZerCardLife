<template>
	
<view class="zong">
	<view class="main">
		<view class="nav">
			<view class="naver">
			  <view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			  <view class="nav-list" id="life0">开卡</view>
			  <view class="nav-list"></view>		
			</view>  
			<image :src="imageURL" mode=" widthFix" class="card"></image>
			<view class="card">		   	
				<view class="cardtop">
					<view class="cardVip">
						VIP
					</view>
					<view class="cardTypeC">
						{{ card_name_type }}
					</view>
				</view>
				<view class="cardfooter">
					<view class="noCard">
						NO.{{ mct_pkid }}
					</view>
					<view class="moneny">
						<view class="moneny1">
							{{ mctd_name }}
						</view>
						<view class="moneny2">
							{{ mctd_money }}元
						</view>
					</view> 
				</view>
			</view>
		</view>

		<view class="middle">
				<view class="xinxi">
					<view class="shu">
						|
						<view class="dengji huiyuan">会员信息登记</view>
					</view>
					<view class="xinin_x">
						姓名
						<input type="text" value="" placeholder="输入会员姓名(必须输入)" class="xin_y1" v-model="name" @input="inputFunc" id="inputFunc"/>
					</view>
					<view class="xian"></view>
					<view class="xinin_x">
						手机号
						<input type="text" value="" placeholder="输入手机号(必须输入)" class="xin_y2" v-model="phone"/>
					</view>
					<view class="xian"></view>
					<view class="xinin_x">
						性别
						<view class="dengji_sex">
							<radio-group @change="sexChange" class="xin_y3" v-model="sex">
								<label for="nan" v-for="(sexval, index) in sexvalues" :key="index" @click="sexChange(index)">
									<image :src="isCheckSex==index?iconsel:iconNosel" mode="" class="selicon"></image>
									{{sexval.text}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="xian"></view>
					<view class="xinin_x" v-model="age">
						年龄段
						<view class="dengji_sex">
							<radio-group  class="xin_y4">
								<label for="shaonian" v-for="(ageval,index) in agevalues" :key="index" @click="agechange(index,ageval)">
									<image :src="isCheckState==index?iconsel:iconNosel" mode="" class="selicon"></image>
									{{ageval.text}}
								</label>
							</radio-group> 
						</view>
					</view>
					<view class="xian"></view>
					<view class="next" @click="go_kaika_xuanren">下一步</view>
				</view>
			<!-- 销售页（下面） -->
			<view class="xinxi">
				<view class="shu">
					<view class="lines"></view>
					<view class="dengji huiyuan">销售人员</view>
				</view>
				<view class="xinin_x">
					主销售人员 
					<input type="text" class="xin_y2" @click="SalesMan" v-model="mainSalesMan" disabled placeholder="选择主销售姓名(必填)"/><view class="pleaseChoose" @click="SalesMan">选择&gt;</view>
				</view>
				<view class="xian"></view>
				<view class="xinin_x">
					副销售人员
					<input type="text" class="xin_y2" @click="SalesAss" v-model="mainSalesAss" disabled placeholder="输入副销售姓名(可不填)"/><view class="cha" @click="cha">×</view>
				</view>
				<view class="xian"></view>
			</view>
			
			
				<!-- 支付方式 -->
				<view class="zhifu">
					<view class="shu">
						<view class="lines"></view>
						<view class="dengji huiyuan">支付方式</view>
					</view>
				
					<view class="zhifubg">
						<view class="zhifu_zf" v-for="(payStypeVal, index) in payStype" :key="index" @click="zhifuChange(index,payStypeVal)">
							<label>
								<image :src="payStypeVal.image" mode="" class="zhifu_image"></image>
								<label class="zhifu_zf_zi">{{ payStypeVal.zhifuname }}</label>
							</label>
						
							<label>
								<image :src="isZhiFuState==index?iconsel: iconNosel" class="zhifu_section" :class="isZhiFuState===index?iconsel: iconNosel"></image>
							</label>
						</view>
					</view>
				</view>
				<view style="height: 330upx;"></view>
		</view>	
	</view>
	<!-- 抽屉栏 -->
	<uni-drawer :visible="flag"  mode="right" @close="flag=!flag"> 
		<scroll-view scroll-y class="drawer">
			 <view style="drawer_head">
				<view class="orange"></view>
				<view class="uni-title">员工选择</view>
				<view class="search_xian">
	
				</view>
				<!-- 搜索栏 -->
				<view class="search-block">
					<view class="search-ico-wapper">
						<image :src="chongzhiiconsousuo" class="search-ico" mode=""></image>
					</view>
					<input type="text" value="" placeholder="点击输入搜索内容" class="search-text" maxlength="10" v-model="keywords" @input="search(keywords)"/>
				</view>
				<view class="shadow"></view>
				<!-- 搜索栏结束 -->
	
				<!-- 显示销售 -->
				<view class="uni-list uni-common-mt">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate uni-navigate-right">
							<view class="xinin_x" v-for="(salesManVal, index) in salesMan" :key="index" @click="salesManChange(salesManVal,index)">
								<view class="chooseSales">
									<image :src="salesManVal.image" mode="" class="touxiang"></image>
									<radio-group class="">
										<view class="salesManName" v-model="mainSalesMan">
											{{ salesManVal.name }}
										</view>
	
										<view class="salesManNumber" v-model="number">
											工号:{{ salesManVal.number }}
										</view>
										<label for="">
											<image :src="drawerisCheckState==index?iconsel:iconNosel" mode="" class="drawer_selicon"></image>
										</label>
	
									</radio-group>
								</view>
								<view class="line">
									
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 显示销售结束 -->
			</view>
			 <view class="kongbai"></view>
			 <view class="drawer_button">
				<view class="drawer_quxiao" @click="flag=!flag">
					取消
				</view>
				<view class="drawer_queding" @click="changeMainSalesMan">
					确定
				</view>
			</view>
		</scroll-view>
    </uni-drawer>
	<!-- 抽屉栏结束 -->
	<view class="bottom">
		<view class="quxiao" @click="back">取消</view>
		<view class="queding" @click="addCard">确定</view>
	</view>
	  
	
</view>

</template>

<script>
	
 import uniDrawer from "@../../components/uni-drawer/uni-drawer.vue";
 export default {
	components: {
		uniDrawer
	},
	data() {
		return {
			fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',
			iconsel:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-sel@3x.png",
			iconNosel:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-nor@3x.png",
			chongzhiiconsousuo:this.httpUrl+"file/static/chongzhi_sousuo/chongzhi-icon-sousuo@2x.png",
			isCheckState:0,
			isCheckSex:0,
			sexvalues:[
				{text:"男性",value:1},
				{text:"女性",value:2}
			],
			agevalues:[
				{text:"少年",value:1},
				{text:"青年",value:2},
				{text:"中年",value:3},
				{text:"老年",value:4}
			],
			imageURL:'',
			name:'',
			phone:'',
			sex:'',
			age:'',
			card_name_type:'',  // 卡类型的名字
			mct_pkid:'',  //卡的唯一主键（no）
			mctd_money:'',  // 开卡需要的钱数
			mctd_name:'',
			
			// 销售的页
			saleCheck:"",

			drawerisCheckState: -1,//抽屉选择按钮
			isZhiFuState: 0,//支付方式状态
			keywords:'',
			flag: false, //抽屉是否弹出
			mainSalesManTimes:'',//临时接受主销售
			zhifuname:'微信支付',
			number:'',
			mainSalesMan:'',//主销售
			mainSalesManEmp_no:'',
			mainSalesAss:'',//副销售
			mainSalesAssManEmp_no:'',
			salesMan:[],
			// 销售的页结束
			// 支付方式
			payStype: [{
					zhifuname: "微信支付",
					image: this.httpUrl+'file/static/settle/jiezhang-icon-wxzf@3x.png'
				},
				{
					zhifuname: "支付宝支付",
					image: this.httpUrl+'file/static/settle/jiezhang-icon-zfbzf@3x.png'
				},
				{
					zhifuname: "现金支付",
					image: this.httpUrl+'file/static/settle/jiezhang-icon-xjzf@3x.png'
				},
				{   zhifuname:"其它支付", 
					image:this.httpUrl+'file/static/settle/qitazhifu.png',
				}
			],
			selectEmpInfo:'',  // 传给后台的销售人名
			startCardTime:'',
			remark3:'',
			shop_pkid:''
		};
	},
	methods: {
		cha(){
			this.mainSalesAss = ""
		},
		//返回上一级
		back(){
			uni.navigateBack({
				delta:1
			})
		}, 
		agechange(index,ageval){
			this.isCheckState = index;
			// console.log('this.isCheckState',this.isCheckState)
			
			console.log("ageval",ageval)
			this.age = ageval.text.substring(0, 1)
			console.log('this.age',this.age)
		},
		sexChange(index){
			this.isCheckSex = index;
			console.log('this.isCheckSex',this.isCheckSex)
		},
		go_kaika_xuanren(){
			let _this = this; 
			_this.name = _this.name; 
			console.log(_this.name)
			_this.phone = _this.phone;
			console.log(_this.phone) 
			_this.sex = _this.isCheckSex;  
			_this.age = _this.age;
			console.log(_this.age) 
			if(_this.name == ""){
				uni.showToast({
					title: '请输入姓名',
					duration: 2000,
					icon: 'none'
				});
			}else if(_this.phone == ""){
				uni.showToast({
					title: '请输入联系电话',
					duration: 2000,
					icon: 'none'
				});
			}

			 
		},
		// 销售开始
		// 查询
				search(keywords){ 
					console.log(keywords)
					this.salesMan = []
					this.selectEmpInfo = this.keywords
					this.getSales();	
					console.log("selectEmpInfo",this.selectEmpInfo)
				},
				
			//点击抽屉中内容并获取
			salesManChange(salesvalue,index) {
				// console.log('salesvalue',salesvalue)
				this.drawerisCheckState = index;
				this.mainSalesManTimes = salesvalue.name;
				this.number = salesvalue.number
				// console.log('this.number',this.number)
			},
		
			//主销售与副销售切换并弹出抽屉
			SalesMan(){
				this.flag =! this.flag;
				this.saleCheck = "主销售";
			}, 
			SalesAss(){
				this.flag =! this.flag;
				this.saleCheck = "副销售";
			},
			// 改变主销售
			changeMainSalesMan(){
				if(this.saleCheck === "主销售"){
					this.mainSalesMan = this.mainSalesManTimes;
					this.mainSalesManEmp_no = this.number
					// console.log('this.mainSalesManEmp_no',this.mainSalesManEmp_no)
					this.drawerisCheckState = -1;
				}else if(this.saleCheck === "副销售"){
					this.mainSalesAss = this.mainSalesManTimes;
					this.mainSalesAssManEmp_no = this.number
					console.log('this.mainSalesAssManEmp_no',this.mainSalesAssManEmp_no)
					this.drawerisCheckState = -1;
				}
				this.flag = false;
			},
			// 选择支付接口
			zhifuChange(index,payStypeVal) {
				this.isZhiFuState = index;
				// console.log("isZhiFuState",this.isZhiFuState)
				// console.log(payStypeVal)
				this.zhifuname = payStypeVal.zhifuname
				// console.log("this.zhifuname",this.zhifuname)
			},
		// 显示销售人员
		getSales(){
			let _this = this;
			_this.shop_pkid = _this.shop_pkid;
			let selectEmpInfo = _this.selectEmpInfo
				uni.request({
			 		 url: _this.httpUrl + 'Jni_EmployeeController/selectEmployee.xsh',
			 		 method: 'POST',
					 header:{ 'content-type':'application/x-www-form-urlencoded' },
					 // header:{ "Content-Type":'application/json;charset=UTF-8' },
					 data:{
						 shop_pkid:_this.shop_pkid,
						 selectEmpInfo:selectEmpInfo
					 },
			 		 success(res){
			 			 console.log("resww(销售人员)", res)   
			 			 let data = res.data.obj;	
						// _this.mainSalesMan = data[0].emp_name;
						// _this.mainSalesManEmp_no = data[0].emp_no	
			 			 for(var i=0; i< data.length; i++){
			 				 _this.salesMan.push({  
			 					 name: data[i].emp_name,
								 number:data[i].emp_no,
			 					 image: data[i].remark1        
			 				 })
			 			 }		
			 							 
			 		 }, 
			 		 fail(err){
			 			 console.log("响应失败",err)
			 		 }
				})
			},
			// 开卡确定按钮
			addCard(){
				let _this = this;
				_this.card_name = _this.mctd_name;
				_this.mi_pkid = _this.mi_pkid;  // 	会员ID
				_this.balance = _this.balance;  // 卡余额
				_this.number_of_use	 = _this.mctd_frequency	;  // 剩余次数
				_this.card_level_discount = _this.mctd_discount;  // 卡折扣
				_this.open_day = _this.mctd_month;
				_this.mct_pkid = _this.mct_pkid;  // 卡类型ID
				_this.mctd_pkid = _this.mctd_pkid; // //卡类型详情主键
				_this.shop_pkid = _this.shop_pkid;  // 店铺ID
				_this.created_by = _this.mainSalesManEmp_no;  // 主销售
				
				_this.mct_img = _this.imageURL;  // 卡图片
				_this.remark2 = _this.mainSalesAssManEmp_no;  // 副销售
				_this.remark3 = _this.zhifuname;  // 支付方式
				_this.prople_name = _this.name;  // 店员填写用户名字
				_this.prople_mobile = _this.phone;  // 店员填写用户手机
				_this.prople_sex = _this.sex;   //店员填写用户性别
				_this.prople_age = _this.age;   //店员填写用户年龄
				console.log(_this.prople_age,"_this.prople_age")
				let tell = _this.tell; //手机号验证
				if(_this.created_by == ''){
					uni.showToast({
						title: '主销售不能为空',
						duration: 2000,
						icon: 'none'
					});
				}else if(_this.prople_name == ''){
					uni.showToast({
						title: '会员姓名不能为空',
						duration: 2000,
						icon: 'none'
					});
				}else if(!tell.test(_this.prople_mobile)){
					uni.showToast({
						title: '请输入正确的手机号',
						duration: 2000,
						icon: 'none'
					});
				}else{
						uni.request({
						url: _this.httpUrl + '/Jni_Member_CardController/addCard.xsh',
						method:'POST',
						header:{ 'content-type':'application/x-www-form-urlencoded' },
						data:{
							card_name:_this.card_name,
							mi_pkid:_this.mi_pkid,
							balance:_this.balance,
							open_day:_this.open_day,
							number_of_use:_this.number_of_use,
							mtcd_discount:_this.card_level_discount,
							mctd_pkid:_this.mctd_pkid,
							shop_pkid:_this.shop_pkid,
							created_by	:_this.created_by,
							mctd_img:_this.mct_img,
							remark2:_this.remark2,
							remark4:_this.remark3,
							prople_name:_this.prople_name,
							prople_mobile:_this.prople_mobile,
							prople_sex:_this.prople_sex,
							prople_age:_this.prople_age,
							oc_money:_this.mctd_money
						},
						success(res) {
							console.log('确认开卡',res)
							_this.oc_code = res.data.oc_code
							console.log(_this.oc_code)
							if(_this.oc_code !== undefined){
								let time = new Date();
								let time1 = new Date(time.toString())
								console.log(time1)
								let year = time1.getFullYear()
								let month = time1.getMonth() + 1<10 ? '0' + (time1.getMonth() + 1): time1.getMonth()+1;
								let date = time1.getDate() < 10 ? '0' + time1.getDate() : time1.getDate();
								// let hour = time1.getHours() < 10 ? '0' + time1.getHours() : time1.getHours();
								// let minute = time1.getMinutes() < 10 ? '0' + time1.getMinutes() : time1.getMinutes();
								// let second = time1.getSeconds() < 10 ? '0' + time1.getSeconds() : time1.getSeconds();
								_this.startCardTime  = year + '.' + month + '.' + date;
								
								uni.navigateTo({
									url: '../../pages/kaika_success/kaika_success?oc_code='+ _this.oc_code + '&startCardTime=' + _this.startCardTime + '&remark3=' + _this.remark3,
								});
							}else{
								uni.showToast({
									title: '开卡失败',
									duration: 2000,
									icon: 'none'
								});
							}
						
						}
					})
								
				}
			}
	},
	 onLoad(options) {
		 let _this = this;
		 console.log("options",options)
		  		  
		    _this.shop_pkid = options.shop_pkid;
			_this.imageURL = options.imageURL;  // 图片地址
			_this.mct_pkid = options.mct_pkid;  // 卡的唯一主键（no）
			_this.mctd_pkid = options.mctd_pkid; //卡类型详情主键
			_this.card_name_type = options.name;  // 卡类型的名字
			_this.mctd_discount = options.mctd_discount;  // 折扣
			_this.mctd_frequency = options.mctd_frequency;  // 次数
			_this.mctd_give_money = options.mctd_give_money;  // 赠送的钱
			_this.mctd_name = options.mctd_name;  // 卡优惠的描述
			_this.mctd_money = options.mctd_money;  // 开卡需要的钱数
			_this.mctd_month = options.mctd_month;  // 时效卡的时长
			
			_this.balance = Number(_this.mctd_money) + Number(_this.mctd_give_money)
			console.log("_this.balance",_this.balance)
			
			_this.mi_pkid = options.mi_pkid;
			_this.shop_pkid = options.shop_pkid;
			_this.name = options.huiyuanname;
			_this.sex = options.sex;
			if(_this.sex == '男'){
				_this.isCheckSex = 0
			}else if(_this.sex == '女'){
				_this.isCheckSex = 1
			}
			_this.phone = options.mi_mobile;
			_this.age = options.age;
			if(_this.age == '少'){
				_this.isCheckState = 0
			}else if(_this.age == '青'){
				_this.isCheckState = 1
			}else if(_this.age == '中'){
				_this.isCheckState = 2
			}else if(_this.age == '老'){
				_this.isCheckState = 3
			}
			_this.getSales()
		
    },
	
};
</script>

<style>
	@import url("../../colorui/main.css");
	@import url("../../colorui/icon.css");
html,body,.zong,.main{
	overflow: hidden;
	height: 100%;
	background-color: #f0f0f0;
}
.zong{
	/* overflow-y: hidden; */
}

.selicon{
	width: 20upx;
	height: 20upx;
}

.middle{
	position: relative;
	width: 100%;
	height: 70%;
	top:420upx;
	overflow-y: auto;
	margin: auto;
    padding: 0;
}

/***导航***/	
	
	.nav{
	  height: 420upx;
	  background: linear-gradient(to right,#F54D28,#FB9723);
	  width: 100%;
	  position: fixed;
	  z-index: 5;
	 }
	 .naver{
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
	  top: 26upx;;
	 } 
	 #life0{
	  position: relative;
	  left: 80upx;
	  font-size: 40upx;
	
	 }	
	 
	.card{
	  position: absolute;
	  width: 100%;
	  height:400upx;
	 }
	 
/* 登记内容css */
.xinxi {
	position: relative;
	top: 150upx;
	width: 89%;
	height: auto;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 8px;
	padding-bottom: 10%;
	margin-bottom: 25upx;
}
.shu {
	color: #f54d28;
	font-size: 40upx;
	font-weight: bolder;
	padding-right: 10upx;
	display: flex;
	padding-left: 4%;
	padding-top: 4%;
}
.huiyuan {
	padding-left: 3%;
}
.xian {
	background-color: #e5e5e5;
	width: 90%;
	height: 1upx;
	position: relative;
	left: 5%;
}
.xinin_x {
	display: flex;
	font-size: 30upx;
	padding-left: 5%;
	padding-top: 7%;
	font-weight: bold;
	
}
.xin_y1 {
	padding-left: 10%;
	position: relative;
	top: -6upx;
	font-size: 25upx;
	line-height: 25upx;
	font-weight: normal;
	color: #000000;
}
.xin_y2 {
	padding-left: 5%;
	position: relative;
	top: -5upx;
	font-size: 25upx;
	font-weight: normal;
	color: #000000;
}
.pleaseChoose{
	position: relative;
	font-size: 25upx;
	font-weight: normal;
	left:80upx;
	top: 8upx;
	color: #999999;
}
.cha{
	position: relative;
	left:120upx;
	top: 8upx;
	color: #999999;
}
.xin_y3 {
	position: relative;
	left: 55upx;
	font-size: 25upx;
	font-weight: normal;
}
.xin_y3>label{
	margin-left: 12rpx;
    margin-right: 27rpx;
}
.xin_y3>label>image{
	margin-right: 15upx;
}
.xin_y4 {
	position: relative;
	left: 4upx;
	/* padding-left: 5upx; */
	font-size: 25upx;
	font-weight: normal;
}
.xin_y4>label{
	margin-left: 35upx;
}
.xin_y4>label>image{
	margin-right: 15upx;
}
.dengji {
	font-weight: bold;
	font-size: 35upx;
	color: #333333;
}
radio {
	transform: scale(0.4);
	/* color:#F54D28;   */
}
.next {
	background-color: #f87d24;
	color: #ffffff;
	text-align: center;
	padding-top: 30upx;
	height: 8%;
	width: 100%;
	position: fixed;
	top: 92%;
	left: 0%;
	font-size: 35upx;
	border-radius: 8px;
}

/* 销售开始 */

	/*左侧边线*/
	.lines{
		height:28upx;
		border-right: 7upx solid  #F86926;
		line-height: 28upx;
		position: relative;
		top:10upx;
	}
	/* 抽屉 */

	.orange {
		height: 29upx;
		width: 7upx;
		background: #F86926;
		position: relative;
		top: 39upx;
		left: 20upx;
		margin-right: 10upx;
	}

	.uni-title {
		font-weight: bolder;
		font-size: 33upx;
		position: relative;
		/* top: -25upx; */
		left: 38upx;
		/* margin-bottom: -30upx; */
	}

	.drawer {
		height: 100%;
	}

	.drawer_selicon {
		/* 单选按钮 */
		width: 20upx;
		height: 20upx;
		float: right;
		position: relative;
		left: 200upx;
		top: -60upx;
	}

	.touxiang {
		/* 头像 */
		height: 100upx;
		width: 100upx;
	}

	.search_xian {
		height: 1upx;
		width: 120%;
		background: #E5E5E5;
		position: relative;
		top: 30upx;
	}

	.search-ico {
		/* 搜索框 */
		width: 40upx;
		height: 40upx;
	}

	.search-text {
		font-size: 14px;
		background-color: #FFFFFF;
		height: 60upx;
		width: 340upx;
		padding-left: 25upx;

	}

	.search-block {
		display: flex;
		flex-direction: row;
		padding-left: 30upx;
		position: relative;
		top: 60upx;

	}

	.search-ico-wapper {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0upx 0upx 0upx 40upx;
		border-bottom-left-radius: 18px;
		border-top-left-radius: 18px;


	}

	.search-ico-wapper1 {
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0upx 40upx 0upx 0upx;
		border-bottom-right-radius: 18px;
		border-top-right-radius: 18px;

	}

	.shadow {
		width: 405upx;
		height: 60upx;
		border-radius: 18px;
		-moz-box-shadow: 0 0 10px #e6e6e6;
		-webkit-box-shadow: 0 0 10px #e6e6e6;
		box-shadow: 0 0 10px #e6e6e6;
		position: relative;
		top: 0upx;
		left: 30upx;
		/* 搜索框结束 */
	}
	.salesManName {
		font-size: 30upx;
		position: relative;
		top: -30upx;
		left: 20upx;
		padding-bottom: -30upx;
	}
	
	.salesManNumber {
		font-size: 25upx;
		position: relative;
		left: 20upx;
		top: -20upx;
		color: #999999;
	}
	
	.chooseSales {
		border-bottom: 1px solid #E6E6E6;
		width: 100%;
	}
	
	.kongbai {
		height: 152upx;
		width: 100%;
	}
	
	.drawer_button {
		position: fixed;
		display: flex;
		justify-content: space-around;
		background-color: #FFFFFF;
		height: 152upx;
		z-index: 400;
		top: 90%;
		width: 100%;
		padding-top: 27upx;
	}
	
	.drawer_quxiao {
		width: 200upx;
		height: 70upx;
		background-color: #1E90FF;
		border-radius: 8px;
		font-size: 28upx;
		color: #FFFFFF;
		line-height: 70upx;
		text-align: center;
	}
	
	.drawer_queding {
		width: 200upx;
		height: 70upx;
		background-color: #F87D24;
		border-radius: 8px;
		font-size: 28upx;
		color: #FFFFFF;
		line-height: 70upx;
		text-align: center;
	}
	/* 抽屉结束 */
	
	
	/* 支付方式   */
	.zhifu {
		position: relative;
		top: 155upx;
		width: 90%;
		height: 400upx;
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 8px;
	}
	.zhifubg{
		padding-top: 25upx;
		padding-left: 30upx;
		padding-right: 30upx;
		box-sizing: border-box;
	}
	.zhifu_zf {
		border-bottom: 1px solid #e5e5e5;
		position: relative;
		width: 100%;
		padding-bottom: 10upx;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}
	.zhifu_image {
		height: 40upx;
		width: 40upx;
		margin-left: 10upx;
		margin-top: 10upx;
		position: relative;
		top: 10upx;
		margin-right: 25upx;
	}

	.zhifu_section {
		height: 20upx;
		width: 20upx;
		position: relative;
		top:10upx;
	}
	
	.bottom {
		width: 100%;
		height: 8%;
		background-color: #FFFFFF;
		position: fixed;
		top: 92%;
		z-index: 10;
	}
	
	/*   底部按钮   */
	.quxiao {
		width: 30%;
		height: 70upx;
		font-size: 28upx;
		position: relative;
		top: 20%;
		text-align: center;
		padding-top: 15upx;
		left: 10%;
		background: #0081FF;
		color: #FFFFFF;
		border-radius: 8px;
	}
	
	.queding {
		width: 30%;
		height: 70upx;
		font-size: 28upx;
		position: relative;
		text-align: center;
		padding-top: 15upx;
		background: #F87D24;
		color: #FFFFFF;
		left: 60%;
		top: -45%;
		border-radius: 8px;
	}
	
	/* 卡的背景图 */
		.card{
		background-size: 100% 100%;
		background-repeat:no-repeat ;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.cardtop{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		
	}
	.cardVip{
		color: #FFFFFF;
		position: relative;
		top: 70upx;
		left: 70upx;
		font-size: 50upx;
	}
	.cardTypeC{
		color: #FFFFFF;
		display: flex;
		justify-content: flex-end;    /* 靠右 */
		position: relative;
		right: 70upx;
		top: 70upx;
		font-size: 45upx;
	
	}
	.cardTypeE{
		color: #FFFFFF;
		display: flex;
		justify-content: flex-end;    /* 靠右 */
		position: relative;
		right: 60upx;
		font-size: 20upx;
		top: 0upx;
		display: none;
	}
	.noCard{
		color: #999999;
		font-size: 40upx;
		position: relative;
		top: -40upx;
		left: 70upx;
	}
	.moneny{
		display: flex;
		justify-content: space-between;
		color: #666666;
		top: -40upx;
	}
	.moneny1{
		position: relative;
		left: 70upx;
		font-size: 30upx;
		top: -40upx;
	}
	.moneny2{
		position: relative;
		right: 60upx;
		top: -70upx;
		font-size: 40upx;
	}
</style>
