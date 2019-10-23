<template>
	<view class="">
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">员工信息</view>
			<view class="nav-list"></view>
		</view>
		<view class="bascinfo">
			<view class="touxiangicon"   @click="upload">
				<image  class="huiyuan_img" :src="image" mode=""></image>
			</view>
			<view class="user">
				<input type="text" class="username"  v-model="username" placeholder="输入姓名"/><img :src="usersex" class="usersexicon">
			</view>
			<view class="telphone">
				<input type="text" class="tel"  v-model="userphone" placeholder="输入手机号"/>
			</view>
		</view>
		<view class="contentlist">
			
			<view class="xinin_x">
				<label class="inputlabel">状态</label>
				<view  class="inputlist">
					<!-- <input type="text"   :value="posstate"/> -->
					{{ posstate }}
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">身份证号</label>
				<view  class="inputlist"><input type="idcard"   v-model="idcardval" placeholder="请输入身份证号"/></view>
			</view>
			
			<view class="xinin_x">
				<label class="inputlabel">入职时间</label>
				<view  class="inputlist"   @click="open">
					<input class="calendar-button" type="text" disabled="true" :value="datepos" placeholder="请选择入职时间"/>
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">账号权限</label>
				<view  class="inputlist">
					<!-- <radio-group @change="idChange" class="xin_y3" v-model="idnum">
						<label for="nan" v-for="(idval, index) in idvalues" :key="index" @click="idChange(index)">
							<image :src="isCheckId==index?iconsel:iconNosel" mode="" class="selicon"></image>
							{{idval.text}}
						</label>
					</radio-group> -->
					{{poscheck}}
				</view>
			</view>
			<view class="xinin_x1">
				<label class="inputlabel">员工简介</label>
				<view  class="inputlist">
					<input  class="input" v-if="inputshow" @focus="inputfocus"  v-model="memberIntro"  placeholder="请输入员工简介"/>
					<textarea class="input" @blur="areablur" :focus="focuscheck" v-model="memberIntro" v-if="textareashow" />
				</view>
			</view>
		
		</view>
		<view class="bottom">
			<view class="quxiao"><button class="cancel"  @click="cancel">取消</button></view>
			<view class="queding"><button class="save" @click="save">保存</button></view>
		</view>
		<uni-calendar ref="calendar" :lunar="tags[0].checked" :disable-before="tags[3].checked" :range="tags[5].checked" :start-date="startDate" :end-date="endDate" :date="date" :selected="selected" @confirm="confirm"/>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	var _self;
	export default {
	 components: {
		uniCalendar
	 },
	data(){
		function getDate(date, AddMonthCount = 0, AddDayCount = 0) {
			if (typeof date !== 'object') {
				date = date.replace(/-/g, '/')
			}
			let dd = new Date(date)
			dd.setMonth(dd.getMonth() + AddMonthCount) // 获取AddDayCount天后的日期
			dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
			let y = dd.getFullYear()
			let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
			let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
			return y + '-' + m + '-' + d
		}
		let tags = [{
				id: 0,
				name: '农历',
				checked: false,
				attr: 'lunar'
			},
			{
				id: 1,
				name: '开始日期(' + getDate(new Date(), -1) + ')',
				checked: false,
				value: getDate(new Date(), -1),
				attr: 'startDate'
			},
			{
				id: 2,
				name: '结束日期(' + getDate(new Date(), 2) + ')',
				value: getDate(new Date(), 2),
				checked: false,
				attr: 'endDate'
			},
			{
				id: 3,
				name: '禁用今天之前的日期',
				checked: false,
				attr: 'disableBefore'
			},
			{
				id: 4,
				name: '自定义当前日期(' + getDate(new Date(), 1) + ')',
				value: getDate(new Date(), 1),
				checked: false,
				attr: 'date'
			},
			{
				id: 5,
				name: '范围选择',
				checked: false,
				attr: 'range'
			},
			{
				id: 6,
				name: '打点',
				value: [{
						date: getDate(new Date(), 0, -1),
						info: '打卡'
					},
					{
						date: getDate(new Date(), 0),
						info: '签到',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: getDate(new Date(), 0, 1),
						info: '已打卡'
					}
				],
				checked: false,
				attr: 'selected'
			}
		]
		return {
			textareashow:false,
			inputshow:true,
			focuscheck:true,
			percent:0,
			loading:false,
			disabled:false,
			tags,
			date: '',
			startDate: '',
			endDate: '',
			timeData: {
				clockinfo: '',
				date: '',
				fulldate: '',
				lunar: '',
				month: '',
				range: '',
				year: ''
			},
			selected: [],
			infoShow: false,
			showCalendar: false,
			iconsel:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-sel@3x.png",
			iconNosel:this.httpUrl+"file/static/settle/jiezhang-icon-anniu-nor@3x.png",
			fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',
			jiezhangiconcgtishi:this.httpUrl+'file/static/jiezhang_success/jiezhang-icon-cgtishi.png',
			
			shop_pkid:"",//店铺id
			image:this.httpUrl+'file/static/uptouxiang.png',
			username:'',//员工姓名
			usersex:this.httpUrl+'file/static/xingbie.png',
			userphone:'',//电话号
			isCheckSex:0,//性别选中
			isCheckId:0,//权限选中
			sex:'女',//性别
			posstate:'在职',//职位状态
			idcardval:'',//身份证号
			datepos:'',//入职时间
			idvalues:[
				{text:"普通员工",value:"3"},
				{text:"店长",value:"2"}
			],//职位
			poscheck:'普通员工',
			idnum:'',//权限账号
			memberIntro:'',//员工简介
			iconcheck:0//头像是否改变
		}
	},
	onLoad(option) {
		console.log("员工列表",option)
		let _this = this;
		_this.emp_pkid = option.emp_pkid;
		_this.created_by = option.mi_pkid;
		_this.shop_pkid = option.shop_pkid;//店铺id
		_this.username = option.username;//员工姓名
		_this.idnum = option.posi;//权限账号
		_this.userphone = option.number;//电话号
		if(_this.userphone == '未填写手机号'){
			_this.userphone = "";
		}
		_this.sex = option.sex;//性别
		_this.posstate = option.posstate;//职位状态
		_this.idcardval = option.idcardval;//身份证
		_this.datepos = option.datepos;//入职时间
		_this.memberIntro = option.memberIntro;//员工简介
		_this.image = option.image;
		console.log("option.image1",option.image)
		console.log(typeof option.image)
		if(option.image == null || option.image == "0"){
			console.log("option.image2",option.image)
			console.log(2222222)
			_this.image =_this.httpUrl+'file/static/uptouxiang.png';
			console.log("_this.image1",_this.image)
		}
		
		setTimeout(() => {
			this.showCalendar = true;
		}, 350);
		if(this.sex == "男"){
			this.usersex = this.httpUrl+'file/static/xingbie.png';
		}else{
			this.usersex = this.httpUrl+'file/static/xingbie1.png';
		}
		
		if(this.idnum == "2"){
			this.isCheckId = 1;
			this.poscheck = "店长";
		}else if(this.idnum == "3"){
			this.isCheckId = 0;
			this.poscheck = "普通员工";
		}
	},
	methods: {
		inputfocus(){
			this.inputshow = false;
			this.textareashow = true;
			this.focuscheck = true;
		},
		areablur(){
			this.inputshow = true;
			this.textareashow = false;
		},
		back(){
			uni.navigateBack({
				delta:1
			});
		},
		 yearChange(e){
			console.log(e)
			this.areatext = e.detail.value;
		},
		cancel(){
			uni.navigateBack({
				delta:1
			}) 
		},
		 //性别选择
		 sexChange(index){
			 this.sex = this.sexvalues[index].value;
		 	this.isCheckSex = index;
		 },
		 //入职时间选择
		 toggle(index, item) {
		 	this.tags[index].checked = !item.checked
		 	this.reckon()
		 },
		 open() {
		 	this.reckon();
		 	this.$refs.calendar.open();
		 },
		 reckon() {
		 	if (this.tags[1].checked) {
		 		this.startDate = this.tags[1].value;
		 	} else {
		 		this.startDate = '';
		 	}
		 	if (this.tags[2].checked) {
		 		this.endDate = this.tags[2].value;
		 	} else {
		 		this.endDate = '';
		 	}
		 	if (this.tags[4].checked) {
		 		this.date = this.tags[4].value;
		 	} else {
		 		this.date = '';
		 	}
		 	if (this.tags[6].checked) {
		 		this.selected = this.tags[6].value;
		 	} else {
		 		this.selected = [];
		 	}
		 },
		 confirm(e) {
		 	console.log('confirm 返回:', e);
			this.getDate(e.fulldate);
		 	this.infoShow = true;
		 },
		 getDate(date, AddMonthCount = 0, AddDayCount = 0) {
		 	if (typeof date !== 'object') {
		 		date = date.replace(/-/g, '/');
		 	}
		 	let dd = new Date(date)
		 	dd.setMonth(dd.getMonth() + AddMonthCount); // 获取AddDayCount天后的日期
		 	dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
		 	let y = dd.getFullYear();
		 	let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 ;// 获取当前月份的日期，不足10补0
		 	let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
		 	this.datepos = y + '-' + m + '-' + d;
		 },
		 retract() {
		 	this.infoShow = !this.infoShow;
		 },
		 idChange(index){
			 this.idnum = this.idvalues[index].value;
			 console.log(this.idnum)
		 	this.isCheckId = index;
		 },
		 //上传头像
		upload(){
		   _self = this;
		   uni.chooseImage({
		    count: 1,
		    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		    sourceType: ['album'], //从相册选择
		    success: function (res) {
		     const tempFilePaths = res.tempFilePaths;
			 _self.image = tempFilePaths[0];
			 console.log("tempFilePaths[0]",tempFilePaths[0])
		     _self.iconcheck = 1;//改变
		    },
		    error : function(e){
		     console.log(e);
		    }
		   });
		  },
		  save(){
			   let _self = this;
			   console.log("_self.image",_self.image)
			   let idcardreg = _self.idcardreg; // 正则身份证
			   let tell = _self.tell; //手机号验证
			   console.log(_self.idnum)
			   if(_self.username == ''){
				   uni.showToast({
						title: '请填写姓名',
						duration: 2000,
						icon: 'none'
				   });
			   }else if(!tell.test(_self.userphone) && _self.userphone != ''){
				   uni.showToast({
						title: '请填写正确手机号',
						duration: 2000,
						icon: 'none'
				   });
			   }else if(!idcardreg.test(_self.idcardval)){
					 uni.showToast({
						title: '请填写正确身份证',
						duration: 2000,
						icon: 'none'
					 });
			   }else if(_self.datepos == ''){
				   uni.showToast({
						title: '请选择入职时间',
						duration: 2000,
						icon: 'none'
				   });
			   }else if(_self.memberIntro == ''){
				   uni.showToast({
						title: '请填写员工简介',
						duration: 2000,
						icon: 'none'
				   });
			   }
			   else if(_self.iconcheck == 0){
				uni.request({ 
					url:_self.httpUrl + '/Jni_EmployeeController/update.xsh',     // 后端api接口
					method:'POST',
				 data: {
					 // shop_pkid:_self.shop_pkid,
					 // openid:_self.openid,
					 emp_name:_self.username,
					 emp_sex:_self.isCheckSex,
					 // emp_status:_self.posstate,  //在职
					 emp_phone:_self.userphone,
					 emp_role_pkid:_self.idnum,  //权限
					 remark2:_self.idcardval, // 身份证
					 remark3:_self.memberIntro,//简介
					 remark4:_self.datepos ,//入职日期
					 updated_by:_self.created_by, //创建人
					 emp_pkid:_self.emp_pkid,//员工主键
				 }, 
				header:{ 'content-type':'application/x-www-form-urlencoded' },
					success:(res) => {
						console.log(res)
						if (res.statusCode == 200){
							uni.showToast({
								icon:'success',
								title:"修改成功...",
							})
						}
						setTimeout(() => {
							uni.navigateTo({
								url:'../personnel_management/personnel_management?shop_pkid='+_self.shop_pkid
							})
						}, 2000);
						
					},error(res1){
						uni.showToast({
							title:"添加失败...",
						})
					}
				 });
			   }else{
				uni.uploadFile({
					url:_self.httpUrl + '/Jni_EmployeeController/updateEmployee.xsh',     // 后端api接口
					filePath: _self.image, // uni.chooseImage函数调用后获取的本地文件路劲
					name:'EmployeeImage',     //后端通过'file'获取上传的文件对象
					 formData: {
						 // shop_pkid:_self.shop_pkid,
						 // openid:_self.openid,
						 emp_name:_self.username,
						 emp_sex:_self.isCheckSex,
						 // emp_status:_self.posstate,  //在职
						 emp_phone:_self.userphone,
						 emp_role_pkid:_self.idnum,  //权限
						 remark2:_self.idcardval, // 身份证
						 remark3:_self.memberIntro,//简介
						 remark4:_self.datepos ,//入职日期
						 updated_by:_self.created_by, //创建人
						 emp_pkid:_self.emp_pkid,//员工主键
					 }, 
					header:{"Content-Type": "multipart/form-data"},
					success:(res) => {
						console.log(res)
						if (res.statusCode == 200){
							uni.showToast({
								icon:'success',
								title:"修改成功...",
							})
						}
						setTimeout(()=>{
							uni.navigateTo({
								url:'../personnel_management/personnel_management?shop_pkid='+_self.shop_pkid
							})
						},2000)
						
					},error(res1){
						uni.showToast({
							title:"添加失败...",
						})
					}
			   });
			
			}
			
		}
	}
	
};
</script>

<style>
	.username{
		width: 155rpx;
		text-align: right;
		padding-right: 6upx;
		box-sizing: border-box;
	}
	.tel{
		width: 180rpx;
	}
.uni-calendar__nav>.uni-calendar__nav-item:last-child{
		color: #E01212;
	}
/****导航****/
	.contentlist{
		padding:0 40upx 110upx 40upx;	
		box-sizing: border-box;
		border-bottom: 40upx solid #f0f0f0;
	}
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

   .bascinfo{
	   background: url(../../static/bejing1.png);
	   background-repeat: no-repeat;
	   background-size: 100% 100%;
	   height: 325upx;
	   width: 100%;
	   display: flex;
	   flex-direction: column;
	   justify-content: flex-start;
	   align-items: center;
	   box-sizing: border-box;
   }
   .touxiangicon{
	   width: 100%;
	   display: flex;
	   justify-content: center;
   }
   .usersexicon{
   	width: 22upx;
   	height: 22upx;
   	position: relative;
   	left: 10upx;	
   }
   .user,.telphone{
	   position: relative;
	   left:-20upx;
   }
.user{
	display: flex;
	font-size: 0.8rem;
	color: #fff;
	align-items: center;
	padding-top: 15upx;
	box-sizing: border-box;
	width: 100%;
	justify-content: center;
	left: -58upx;
}


.telphone{
	font-size: 0.75rem;
	color: #fff;
	align-items: center;
	position: relative;
	top: 10upx;
}
.huiyuan_img{
	height: 130upx;
	width: 130upx;
	border-radius: 50%;
	margin-right: 30upx;
}
/**填入信息**/
	.xinin_x{
		display: flex;
		width: 100%;
		line-height: 105upx;
		flex-wrap: nowrap;
		align-items: center;
	}
	.xinin_x{
		 border-bottom: 1px solid #E5E5E5; 
	}
	.inputfirst{
		width: 100%;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	.inputfirst{
		border-bottom: 1px solid #E5E5E5;
	}
	.huiyuan_img{
		height: 180upx;
		width: 180upx;
		border-radius: 50%;
		margin-right: 30upx;
	}
	.xin_y3 {
		position: relative;
		font-weight: normal;
		font-size: 0.8rem;
	}
	.xin_y3>label{
	    margin-right: 15rpx;
	}
	.xin_y3>label>image{
		margin-right: 15upx;
	}
	.selicon{
		width: 20upx;
		height: 20upx;
	}
	.inputlabel{
		flex: 1;
		color: #333333;
		font-size: 0.8rem;
		white-space: nowrap;
	}
	.inputlist{
		font-size: 0.8rem;
		flex:4;
		box-sizing: border-box;
		white-space: nowrap;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #999;
		padding-left: 10upx;
		box-sizing: border-box;
	}
	.rili{
		width: 40upx;
		height: 40upx;
		position: relative;
		left: -30upx;
	}
	.xinin_x1{
		display: flex;
		width: 100%;
		line-height: 105upx;
		flex-wrap: nowrap;
		align-items: center;
		border-bottom: 1px solid #E5E5E5;
	}
    .input{
		height: 105upx;
		width: 90%;
		overflow: auto;
		line-height: 105upx;
		position: relative;
		top:0upx;
		z-index: 0;
		text-overflow:ellipsis;
		
	}
	.input::-webkit-scrollbar{
		width: 0upx;
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
	.uni-calendar__nav{
		z-index: 10000;
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
		box-sizing: border-box;
		padding-bottom: 12pt;
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
