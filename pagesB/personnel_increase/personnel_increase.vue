<template>
	<view class="order  calendar-content">
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">添加员工</view>
			<view class="nav-list"></view>
		</view> 
			

		<view class="contentlist">
			<view class="xinin_x">
				<view>
					<view class="huiyuan_img"  @click="upload">
						<image :src="image" class="huiyuan_img"></image>
					</view>
				</view>
				<view style="width: 100%;">
					<view class="inputfirst">
						<label class="inputlabel">姓名</label>
						<view  class="inputlist"><input type="text" v-model="username" placeholder="请输入姓名(必填)"/></view>
					</view>
					<view class="inputfirst">
						<label class="inputlabel">电话</label>
						<view  class="inputlist"><input type="text" v-model="phonetel" placeholder="请输入手机号(可不填)"/></view>
					</view>
				</view>
				
			</view>
			
			<view class="xinin_x">
				<label class="inputlabel">性别</label>
				<view  class="inputlist">
					<radio-group @change="sexChange" class="xin_y3" v-model="sex">
						<label for="nan" v-for="(sexval, index) in sexvalues" :key="index" @click="sexChange(index)">
							<image :src="isCheckSex==index?iconsel:iconNosel" mode="" class="selicon"></image>
							{{sexval.text}}
						</label>
					</radio-group>
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">状态</label>
				<view  class="inputlist">
					<input type="text" disabled  :value="posstate"/>
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">身份证号</label>
				<view  class="inputlist"><input type="idcard"  v-model="idcardval" placeholder="请输入身份证号"/></view>
			</view>
			
			<view class="xinin_x">
				<label class="inputlabel">入职时间</label>
				<view  class="inputlist"   @click="open">
					<input class="calendar-button" type="text" disabled="true" :value="datepos" placeholder="请选择入职时间"/>
					<image :src="rili" class="rili"  ></image>
				</view>
			</view>
			<view class="xinin_x">
				<label class="inputlabel">账号权限</label>
				<view  class="inputlist">
					<radio-group @change="idChange" class="xin_y3" v-model="idnum">
						<label for="nan" v-for="(idval, index) in idvalues" :key="index" @click="idChange(index)">
							<image :src="isCheckId==index?iconsel:iconNosel" mode="" class="selicon"></image>
							{{idval.text}}
						</label>
					</radio-group>
				</view>
			</view>
			<view class="xinin_x1">
				<label class="inputlabel">员工简介</label>
				<view  class="inputlist">
					<input  class="input" v-if="inputshow" @click="inputfocus" disabled  v-model="memberIntro"  placeholder="请输入员工简介"/>
				    <textarea class="input" @blur="areablur" :focus="focuscheck" v-model="memberIntro" v-if="textareashow" :adjust-position="adjust"/>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="quxiao"><button class="cancel"  @click="cancel">取消</button></view>
			<view class="queding"><button class="save" @click="save">确定</button></view>
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
	data() {
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
			adjust:true,
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
			image:this.httpUrl+'file/static/uptouxiang.png',
			rili:this.httpUrl+'file/static/rili@2x.png',
			fanhuiIcon:'',//返回图片
			openid:'',
			sexvalues:[
				{text:"男性",value:"0"},
				{text:"女性",value:"1"}
			],
			username:'',//姓名
			phonetel:'',//电话
			isCheckSex:0,//性别选中
			isCheckId:0,//权限选中
			sex:'男',//性别
			posstate:'在职',//状态
			idcardval:'',//身份证号
			datepos:'',//入职时间
			idvalues:[
				{text:"普通员工",value:"3"},
				{text:"店长",value:"2"}
			],
			idnum:'3',//权限账号
			memberIntro:'',//员工简介
		}
	},
	onLoad(option) {
		let _this = this;
		_this.openid = option.openid;
		_this.shop_pkid =  option.shop_pkid
		_this.fanhuiIcon = this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png';
		_this.mi_pkid =  uni.getStorageSync('mi_pkid');
		console.log(_this.openid);
		setTimeout(() => {
			this.showCalendar = true
		}, 350);
		// console.log("aaa",phon)
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
			uni.navigateTo({
				url:"../../pages/homelistpage/homelistpage"
			})
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
			console.log('this.isCheckSex',this.isCheckSex)
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
		 // 选择权限
		 idChange(index){
			 this.idnum = this.idvalues[index].value;
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
			   if(_self.username == ''){
				   uni.showToast({
				   	title: '请填写姓名',
				   	duration: 2000,
				   	icon: 'none'
				   });
			   }else if(!tell.test(_self.phonetel) && _self.phonetel !== ''){
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
						title: '请选择入职日期',
						duration: 2000,
						icon: 'none'
				   });
				}
			   else if(_self.memberIntro == ''){
				   uni.showToast({
						title: '请输入简介',
						duration: 2000,
						icon: 'none'
				   });
			   }else if(_self.image == this.httpUrl+'file/static/uptouxiang.png'){
				   				uni.request({
				   			url:_self.httpUrl + '/Jni_EmployeeController/add.xsh',     // 后端api接口
				   			method:'POST',
				   		 data: {
				   			 shop_pkid:_self.shop_pkid,
				   			 openid:_self.openid,
				   			 emp_name:_self.username,
				   			 emp_sex:_self.isCheckSex,
				   			 emp_status:0,  //在职
				   			 emp_phone:_self.phonetel,
				   			 emp_role_pkid:_self.idnum,  //权限
				   			 remark2:_self.idcardval, // 身份证
				   			 remark3:_self.memberIntro,//简介
				   			 remark4:_self.datepos ,//入职日期
							 created_by:_self.mi_pkid //创建人
				   		 }, 
				   		header:{ 'content-type':'application/x-www-form-urlencoded' },
				   		 	success:(res) => {
				   		 		console.log(res)
				   		 		if (res.statusCode == 200){
				   		 			uni.showToast({
				   		 				icon:'success',
				   		 				title:"添加成功...",
				   		 			})
				   		 		}
				   		 		uni.navigateTo({
				   		 			url:'../personnel_management/personnel_management?shop_pkid='+_self.shop_pkid
				   		 		})
				   		 	},error(res1){
				   		 		uni.showToast({
				   		 			title:"添加失败...",
				   		 		})
				   		 	}
				   		 });
			   }else{
				   		uni.uploadFile({
				   		   	url:_self.httpUrl + '/Jni_EmployeeController/addEmployee.xsh',     // 后端api接口
				   		   	filePath: _self.image, // uni.chooseImage函数调用后获取的本地文件路劲
				   		   	name:'EmployeeImage',     //后端通过'file'获取上传的文件对象
				   		   	 formData: {
				   		   		 shop_pkid:_self.shop_pkid,
				   		   		 openid:_self.openid,
				   		   		 emp_name:_self.username,
				   		   		 emp_sex:_self.isCheckSex,
				   		   		 emp_status:0,  //在职
				   		   		 emp_phone:_self.phonetel,
				   		   		 emp_role_pkid:_self.idnum,  //权限
				   		   		 remark2:_self.idcardval, // 身份证
				   		   		 remark3:_self.memberIntro,//简介
				   		   		 remark4:_self.datepos ,//入职日期
								 created_by:_self.mi_pkid //创建人
				   		   	 }, 
				   		   	header:{"Content-Type": "multipart/form-data"},
				   		   	success:(res) => {
				   		   		console.log(res)
				   		   		if (res.statusCode == 200){
				   		   			uni.showToast({
				   		   				icon:'success',
				   		   				title:"添加成功...",
				   		   			})
				   		   		}
				   		   		uni.navigateTo({
				   		   			url:'../personnel_management/personnel_management?shop_pkid='+_self.shop_pkid
				   		   		})
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
/******最外层*****/

.uni-calendar__nav>.uni-calendar__nav-item:last-child{
	color: #E01212;
}
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
		padding-bottom: 130upx;
		box-sizing: border-box;
		
	}
	.contentlist::-webkit-scrollbar{
		width: 0upx;
	}
	
	/**填入信息**/
	.xinin_x{
		display: flex;
		width: 100%;
		line-height: 105upx;
		flex-wrap: nowrap;
		align-items: center;
	}
	.xinin_x:not(:first-child){
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
	    margin-right: 27rpx;
	}
	.xin_y3>label>image{
		margin-right: 25upx;
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
		color: #333333;
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
