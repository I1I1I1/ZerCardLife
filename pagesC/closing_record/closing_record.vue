<template>
	<view>
		<view class="main">
			<view class="content">
				<view class="nav">
					<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
					<view class="nav-list" id="life0">结账记录</view>
					<view class="nav-list"></view>
				</view>
				<view class="search-block">
					<view class="search1">
						<view class="search-ico-wapper"><image :src="chongzhiiconsousuoIcon" class="search-ico" mode=""></image></view>
						<input type="text" value="" placeholder="点击输入搜索内容" class="search-text"   v-model="keywords" @input="search(keywords)"/>
					</view>
				</view>
				
				<view class="tab">
					<view class="tabList" v-for="(tabVal, index) in tab" :key="index" @click="choose(index)" >
						<label  :class="{orange:isChooseState === index}" style="margin-right: 10upx;">{{ tabVal.name }}</label> 
						<label for=""><image class="chooseJT" :src="isChooseState==index?shouhuijiantou:xiajiantou" mode=""></image></label>
					</view>
				</view>		
				<view v-if="dateFlag" class="tabSex1">
					<view class="chooseDate">
						<view class="dateLeft" @click="open">
							 <view class="">
							 	{{ beginTime }}
							 </view>
							 <view>开始时间</view>
						</view>
						<!-- <view class="" style="font-size: 80upx;">
							|
						</view> -->
						<view class="dateRight" @click="open1">
							<view class="">{{ endTime }}</view>
							<view class="">结束时间</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="numberInf">
				<view class="show">
					<view class="huiyuan_info"  v-for="(huiyuanVal, index) in huiyuan"  :key="index" @click="huiyuanChange(huiyuanVal)">
						<view class="lists">
							<view class="huiyuan_img">
								<image  class="huiyuan_img" :src="huiyuanVal.image" mode=""></image>
							</view>
							<view class="huiyuan_hanzi">
								<view class="name">
									<lable><image class="sexImg" :src="huiyuanVal.sex=='男'?sexMale:sexFemale"></image></lable>&nbsp;&nbsp;&nbsp;{{ huiyuanVal.name }}
									<lable class="date">{{ huiyuanVal.datepos }}</lable>
									
								</view>
								<view class="phone">
									{{ huiyuanVal.number }} 
								</view>
								<view class="phone1">
									消费金额:<label style="color:#F87D24; margin-right: 70upx;">￥500</label>
									<label>操作人员: 张三</label>
								</view>
							</view>
						</view>
					</view>
				</view>
					
			</view>
			<uni-calendar ref="calendar"  :lunar="tags[0].checked" :disable-before="tags[3].checked" :range="tags[5].checked" :start-date="startDate" :end-date="endDate"  :selected="selected" @confirm="confirm"/>
			<uni-calendar ref="calendar1"  :lunar="tags[0].checked" :disable-before="tags[3].checked" :range="tags[5].checked" :start-date="startDate" :end-date="endDate"  :selected="selected" @confirm="confirm1"/>
		</view>
			
	</view>
</template>

<script>
	import uniCalendar from "@/components/uni-calendar/uni-calendar";
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
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',
				chongzhiiconsousuoIcon:this.httpUrl+'file/static/chongzhi_sousuo/chongzhi-icon-sousuo@2x.png',
				rightDirIcon:this.httpUrl+'file/static/home/rightDir.png',
				sexMale:'../../static/closing_record/male@2x.png',//性别标识
				sexFemale:'../../static/closing_record/remale@2x.png',//性别标识
				xiajiantou:'../../static/membMang/xiajiantou@2x.png',//下箭头
				shouhuijiantou:'../../static/membMang/shouhuijiantou@2x.png',//上箭头
				isChooseState:0,//筛选角标
				sexFlag:false,
				ageFlag:false,
				dateFlag:false,
				insert:false,
				huiyuan: [
					
				],
				shop_pkid:'',
				tab:[
					{name:'全部'},
					{name:'日期'}
				],
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
				beginTime:'',
				endTime:'',
				
			};
		},
		onLoad(option) {
			let _this = this;
			_this.shop_pkid = option.shop_pkid;
			_this.created_by = option.emp_name;
			
			let arrmem = [
				{image:'../../static/membMang/touxiang@2x.png',name:'张三',posi:'青年',posstate:'在职',number:'18584515611',sex:'男',idcardval:'11111',datepos:'2018-05-05',memberIntro:'我是张三'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'少年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'中年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'老年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'张三',posi:'青年',posstate:'在职',number:'18584515611',sex:'男',idcardval:'11111',datepos:'2018-05-05',memberIntro:'我是张三'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'少年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'中年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'老年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'张三',posi:'青年',posstate:'在职',number:'18584515611',sex:'男',idcardval:'11111',datepos:'2018-05-05',memberIntro:'我是张三'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'少年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'中年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'},
				{image:'../../static/membMang/touxiang@2x.png',name:'王红',posi:'老年',posstate:'在职',number:'13583515621',sex:'女',idcardval:'22222',datepos:'2018-05-05',memberIntro:'我是王红'}
			]
			
			for(let i=0; i < arrmem.length;i++){
				let image = arrmem[i].image;
				let name = arrmem[i].name;
				let posi = arrmem[i].posi;
				let number = arrmem[i].number;
				let sex = arrmem[i].sex;
				let sexImg = arrmem[i].sexImg;
				let posstate = arrmem[i].posstate;
				let idcardval = arrmem[i].idcardval;
				let datepos = arrmem[i].datepos;
				let memberIntro = arrmem[i].memberIntro;
				if(posi == "青年"){
					_this.huiyuan.push({image,name,posi,number,'color':'#FF9955',sex,posstate,idcardval,datepos,memberIntro});
				}else if(posi == "少年"){
					_this.huiyuan.push({image,name,posi,number,'color':'#FF7D55',sex,posstate,idcardval,datepos,memberIntro});
				}else if(posi == "中年"){
					_this.huiyuan.push({image,name,posi,number,'color':'#559DFF',sex,posstate,idcardval,datepos,memberIntro});
				}else if(posi == "老年"){
					_this.huiyuan.push({image,name,posi,number,'color':'#5589FF',sex,posstate,idcardval,datepos,memberIntro});
				}
			
			}
			console.log(arrmem)
			
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			// 点击筛选
			choose(index){
				let _this = this;
				console.log(index)
				_this.isChooseState = index;
				
				if(_this.isChooseState == 0){
					_this.dateFlag = false;
				}else if(_this.isChooseState == 1){
					_this.dateFlag = !_this.dateFlag;
				}
				console.log("isChooseState",_this.isChooseState)
			},
			// 日历组件
			toggle(index, item) {
				this.tags[index].checked = !item.checked
				this.reckon()
			},
			toggle1(index, item) {
				this.tags[index].checked = !item.checked
				this.reckon1()
			},
			open() {
				this.reckon();
				this.$refs.calendar.open();
			},
			open1() {
				this.reckon1();
				console.log(this.$refs)
				this.$refs.calendar1.open();
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
			reckon1() {
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
						// this.beginTime = e.fulldate
				this.infoShow = true;
			},
			confirm1(e) {
				console.log('confirm1 返回:', e);
						this.getDate1(e.fulldate);
						// this.endTime = e.fulldate
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
				this.beginTime = y + '/' + m + '/' + d;
			},
			getDate1(date, AddMonthCount = 0, AddDayCount = 0) {
				if (typeof date !== 'object') {
					date = date.replace(/-/g, '/');
				}
				let dd = new Date(date)
				dd.setMonth(dd.getMonth() + AddMonthCount); // 获取AddDayCount天后的日期
				dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
				let y = dd.getFullYear();
				let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 ;// 获取当前月份的日期，不足10补0
				let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
				this.endTime = y + '/' + m + '/' + d;
			},
			retract() {
				this.infoShow = !this.infoShow;
			},
			// 日历组件结束
		}
	}
</script>

<style>
	@import "../../colorui/main.css";
    @import "../../colorui/icon.css";
	
html,body,.main{
		height: 100%;
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
	width: 100%;
	height: 100%;
	overflow: hidden;
	overflow-y: auto;
	padding-left:40upx;
	padding-right:40upx;
	padding-top: 35upx;
	padding-bottom: 35upx;
	box-sizing:border-box ;
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
	margin-top: 12upx;
}
.phone1{
	color: #333333;
	margin-top: 12upx;
}
.huiyuan_hanzi{
	position: relative;
	top: 5upx;
}
.toRightIndex{
		width: 30upx;
		height: 30upx;
		color: #666666;
		position: relative;
		top:35upx;
		left: -13px;
	}
/* 性别标识 */
.tab{
	display: flex;
	flex-direction: row;
}
.tabList{
	display: flex;
	flex-direction: row;
	margin-right: 150rpx;
	margin-left: 150rpx;
	white-space: nowrap;
}
.chooseJT{
	width: 16upx;
	height: 16upx;
}
.sexImg{
	height: 22upx;
	width: 22upx; 
	margin-right: 10upx;
}
.date{
	margin-left: 220upx;
	font-size: 26upx;
	color: #666666;
	font-weight:500;
	white-space: nowrap;
}
.orange{
	color: #F76526;
}
.tabSex{
	margin-top: 50upx;
}
.tabSex > view{
	height: 80upx;
	line-height: 80upx;
	margin: 0upx 90upx;
	color: #1D1D1D;
	border-top:1upx solid #E5E5E5;
}
/* 框 */
.numberInf{
	height: 100%;
	overflow-y: scroll;
}


.tabSex1{
	height: auto;
	margin-top: 20upx;
	box-shadow:0px 1px 0px 0px rgba(0, 0, 0, 0.13);
	background: #fff;
	border-radius:0px 0px 16px 16px;
	position: fixed;
	display: flex;
	flex-direction: column;
	width: 100%;
	white-space: nowrap;
	z-index: 20;
}
.chooseDate{
	display: flex;
	flex-direction: row; 
	justify-content: space-between;
	width: 100%;
	font-size:30upx;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height: 70upx;
	color: #1D1D1D;
	border-top:1upx solid #E5E5E5;
	padding: 0upx 100upx;
}
.dateLeft{
	flex: 1;
	text-align: left;
	/* border: 1px solid red; */
}
.dateRight{
	flex: 1;
	/* border: 1px solid red; */
	height: 50upx;
	text-align: right;
}
</style>
