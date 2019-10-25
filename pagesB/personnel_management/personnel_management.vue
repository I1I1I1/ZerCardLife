<template>
	<view class="bodys">
		<view class="heads">
			<view class="nav">
				<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
				<view class="nav-list" id="life0">人事管理</view>
				<view class="nav-list"></view>
			</view>
			<view class="search-block">
				<view class="search1">
					<view class="search-ico-wapper"><image :src="chongzhiiconsousuoIcon" class="search-ico" mode=""></image></view>
					<input type="text" value="" placeholder="点击输入搜索内容" class="search-text" :disabled="searchcheck"  v-model="selectEmpInfo" @input="search(selectEmpInfo)"/>
				</view>
			</view>
		</view>
	
		<view class="show">
			<view class="huiyuan_info"  v-for="(huiyuanVal, index) in huiyuan"  :key="index" @click="huiyuanChange(huiyuanVal)">
				<view class="lists">
					<view class="huiyuan_img">
						<image  class="huiyuan_img" :src="huiyuanVal.image" mode=""></image>
					</view>
					<view class="huiyuan_hanzi">
						<view class="name">
							{{ huiyuanVal.name }}&nbsp;<label class="pos" :style="{backgroundColor:huiyuanVal.color}">{{ huiyuanVal.posi }}</label>
						</view>
						<view class="phone">
							{{ huiyuanVal.number }} 
						</view>
					</view>
				</view>
				<view style="color: rgba(102, 102, 102, 0.6); font-size: 1.2rem;">
					<image :src="rightDirIcon" class="toRightIndex"></image>
				</view>
			</view>
			
		</view>
		<view class="v1"></view>	
		<view class="foot" @click="newMember" v-show="footshow">
			<button class="btn">新增员工</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			footshow:false,
			fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',
			chongzhiiconsousuoIcon:this.httpUrl+'file/static/chongzhi_sousuo/chongzhi-icon-sousuo@2x.png',
			rightDirIcon:this.httpUrl+'file/static/home/rightDir.png',
			huiyuan: [
				
			],
			huiyuanget: [
				
			],
			shop_pkid:'',
			openid:'',
			keywords:'',
			selectEmpInfo:'' ,// 搜索内容
			emp_role_pkid:'',
			searchcheck:false
		};
	},
	onLoad(option) {
		console.log(option)
		let _this = this;
		_this.openid = uni.getStorageSync('openid');
		_this.shop_pkid = option.shop_pkid;
		_this.mi_pkid =  option.mi_pkid;//uni.getStorageSync('mi_pkid');
		_this.emp_role_pkid = uni.getStorageSync('emp_role_pkid');
		let shop_name =  uni.getStorageSync('personinfo').shop_name;
		let selectEmpInfo = "";
		
		uni.request({
			 url: _this.httpUrl + 'Jni_EmployeeController/selectEmployee.xsh',
			 method: 'POST',
			 header:{ 'content-type':'application/x-www-form-urlencoded' },
			 data:{
				 shop_pkid:_this.shop_pkid,
				 selectEmpInfo:selectEmpInfo
			 },
			 success(res){
				 console.log('resssss',res)
				 let arrmem = res.data.obj;
				
				 setTimeout(function() {
					  console.log(typeof _this.emp_role_pkid)
				
				 if(_this.emp_role_pkid == "2"){
					  for(let i=0; i < arrmem.length;i++){
							 console.log("1a")
							  let emp_pkid = arrmem[i].emp_pkid;
							  let image = arrmem[i].remark1;//头像
							  let name = arrmem[i].emp_name;//姓名
							  let posicheck = arrmem[i].emp_role_pkid;
							  let posi=posicheck=="2"?'店长':'员工';
							  let number = arrmem[i].emp_phone; //手机号
							  if(number == null){
								number = '未填写手机号';
							  }
							  let sexcheck = arrmem[i].emp_sex;
							  let sex=sexcheck=="1"?'女':'男';
							  let posstatecheck = arrmem[i].emp_status;
							  let posstate=posstatecheck=="1"?'离职':'在职';
							  let idcardval = arrmem[i].remark2; //身份证号
							  let datepos = arrmem[i].updated_date; //入职日期
							  let memberIntro = arrmem[i].remark3;
							  let openid = arrmem[i].openid;
							  
							  
							  if(posi == '店长'){
								 _this.huiyuan.push({emp_pkid,image,name,posi,number,'color':'#F98124',posicheck,sex,posstate,idcardval,datepos,memberIntro,openid,shop_name});
								 _this.huiyuanget.push({emp_pkid,image,name,posi,number,'color':'#F98124',posicheck,sex,posstate,idcardval,datepos,memberIntro,openid,shop_name});
							  }else{
								 _this.huiyuan.push({emp_pkid,image,name,posi,number,'color':'#1E90FF',posicheck,sex,posstate,idcardval,datepos,memberIntro,openid,shop_name}); 
								  _this.huiyuanget.push({emp_pkid,image,name,posi,number,'color':'#1E90FF',posicheck,sex,posstate,idcardval,datepos,memberIntro,openid,shop_name}); 
							  }
					}
					_this.footshow =true;
					_this.searchcheck = false;
				 }
				 
				 if(_this.emp_role_pkid == "3"){
					  for(let i=0; i < arrmem.length;i++){
							let openid = arrmem[i].openid;
							 if(_this.openid == arrmem[i].openid){
								_this.huiyuan = [];
								 console.log(arrmem[i].emp_role_pkid)
								console.log("aaadsdsdsd",_this.huiyuan)
								let emp_pkid = arrmem[i].emp_pkid;
								let image = arrmem[i].remark1;
								let name = arrmem[i].emp_name;
								let posicheck = arrmem[i].emp_role_pkid;
								let posi=posicheck=="2"?'店长':'员工';
								let number = arrmem[i].emp_phone;
								if(number == null){
									number = '未填写手机号';
								}
								let sexcheck = arrmem[i].emp_sex;
								let sex=sexcheck=="1"?'女':'男';
								let posstatecheck = arrmem[i].emp_status;
								let posstate=posstatecheck=="1"?'离职':'在职';
								let idcardval = arrmem[i].remark2;
								let datepos = arrmem[i].updated_date;
								let memberIntro = arrmem[i].remark3;
								_this.huiyuan.push({emp_pkid,image,name,posi,number,'color':'#1E90FF',posicheck,sex,posstate,idcardval,datepos,memberIntro,openid,shop_name}); 
								_this.huiyuanget.push({emp_pkid,image,name,posi,number,'color':'#1E90FF',posicheck,sex,posstate,idcardval,datepos,memberIntro,openid,shop_name}); 
								
							 }
							 
						}	
					 	_this.footshow =false;
						_this.searchcheck =true;
				 }
					 
				  }, 100);
			 }, 
			 fail(err){
				 console.log("响应失败",err)
			 }
		})
		
	},
	methods: {
		back(){
			uni.switchTab({
				url:"/pages/homelistpage/homelistpage"
			})
		},
		newMember(){
			let _this = this;
			uni.scanCode({
			success: function (res) {
				console.log("结果",res);
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
					let openid = res.result;
							uni.showToast({
								title:"加载中...",
								icon:"loading"
							});
							setTimeout(()=>{
								uni.navigateTo({
									url:"../personnel_increase/personnel_increase?shop_pkid="+_this.shop_pkid + '&openid=' + openid
								})
							},2000)
						}  // 扫码的
					})  // 扫码的
			
			
		},
		huiyuanChange(huiyuanVal){
			console.log("hui",huiyuanVal)
			let emp_pkid = huiyuanVal.emp_pkid;
			let image =  huiyuanVal.image;
			let username = huiyuanVal.name;
			let posi = huiyuanVal.posi;
			let number = huiyuanVal.number;
			let sex = huiyuanVal.sex;
			let posstate = huiyuanVal.posstate;
			let idcardval = huiyuanVal.idcardval;
			let datepos = huiyuanVal.datepos;
			let memberIntro = huiyuanVal.memberIntro;
			let mi_pkid = this.mi_pkid;
			let openid = huiyuanVal.openid;
			let shop_name = huiyuanVal.shop_name;
			let posicheck = huiyuanVal.posicheck;
			
			
			
			uni.showToast({
				title:"加载中...",
				icon:"loading"
			});
			/* if(posi=="店长"){
				posi ="2";
			}else if(posi=="员工"){
				posi ="3";
			} */
			
			setTimeout(()=>{
				uni.navigateTo({
					url:"../memberInfo/memberInfo?shop_pkid="+this.shop_pkid
					+"&username="+username
					+"&posi="+posicheck
					+"&number="+number
					+"&sex="+sex
					+"&posstate="+posstate
					+"&idcardval="+idcardval
					+"&datepos="+datepos
					+"&memberIntro="+memberIntro
					+"&image="+ image
					+"&emp_pkid="+ emp_pkid
					+"&mi_pkid=" + mi_pkid
					+"&openid="+openid
					+"&shop_name="+shop_name
				})
			},2000)
		},
		
		// 所搜
		search(selectEmpInfo){
			let _this = this;
			 _this.huiyuan = _this.huiyuanget.filter(Val => {
				if(Val.name.includes(_this.selectEmpInfo)){
					 _this.huiyuan.push(Val);
					return  _this.huiyuan;
				}
			})
		}
	}
	
};
</script>

<style>
	@import "../../colorui/main.css";
    @import "../../colorui/icon.css";
	html,body,.bodys{
		width:100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
.heads{
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
.show{
	flex: 4;
	width: 100%;
	height:100%;
	overflow: hidden;
	overflow-y: auto;
	padding-left:40upx;
	padding-right:40upx;
	padding-top: 35upx;
	padding-bottom: 55upx;
	box-sizing:border-box ;
}
.v1{
	flex: 1;
	width: 100%;
}
.lists{
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	
}

.huiyuan_info{
	width: 100%;
	height: 220upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
    box-shadow:  1px 1px 5px 2px rgba(29, 29, 29, 0.11);
	border-radius: 4pt;
	padding: 30upx;
	margin-bottom: 40upx;
}
.show_head{
	font-size: 25upx;
	color: #999999;
}

.huiyuan_img{
	height: 130upx;
	width: 130upx;
	border-radius: 50%;
	margin-right: 30upx;
}
.pos{
	display: inline-block;
	width: 31pt;
	height: 14pt;
	line-height: 14pt;
	background: #F98124;
	text-align: center;
	border-radius: 2pt;
	color: #fff;
	margin-left: 20upx;
}
.phone{
	color: rgba(153, 153, 153, 1);
	margin-top: 30upx;
}
.toRightIndex{
		width: 30upx;
		height: 30upx;
		color: #666666;
	}
/**底部**/
	.foot{
		background-color: #FAFAFA;
		width: 100%;
		
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		position: fixed;
		bottom: 0;
		padding-bottom: 30px;
		box-sizing: border-box;
	}
	.foots{
		flex: 1;
	}
	.btn{
		width: 100%;
		height: 90upx;
		background-color: #F87D24;
		color: #fff;
		font-weight: bolder;
		border-radius: 4pt;
		border: transparent;
		line-height: 90upx;
		font-size: 1rem;
	}
</style>
