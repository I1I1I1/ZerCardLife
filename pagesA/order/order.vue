<template>
	<view class="order">
		<view class="nav">
			<view class="nav-list" @click="back"><image :src="fanhuiIcon" mode="" class="backicon"></image></view>
			<view class="nav-list" id="life0">0卡生活</view>
			<view class="nav-list"></view>
		</view>
		<!----员工弹框---->
		<view class="Zao" v-show="isShow"></view>
		<view class="Zaos" v-show="isshopsShow" @click="shopShow"></view>
		<!----服务------>
		<view class="memberContent"  v-show="isServeShow">
			<view class="members">
				<!------标题------>
				<view class="titlemem">
					请选择员工
				</view>
				<!------内容------>
				<view class="memInput">
					<view class="ZGtitle">
						主工
						<image class="downicon" :src="xzygiconjiantouIcon" mode="" id="downDir"></image>
					</view>
					<view>
						<picker  @change="bindPickerChange" class="memberpic" :value="index" :range="array" :disabled="memDis">
							<input type="text" placeholder="请选择员工" :disabled="true" class="memberSel" v-model="membervalue">
							<label class="titleZGsel" v-show="zgshow">请选择主工</label>
						</picker>
					</view>
					<view class="ZGtitle">
						助理(可不选)
						<image class="downicon" :src="xzygiconjiantouIcon" mode="" id="downDir1"></image>
					</view>
					<view>
						<picker  @change="assistantPickerChange" class="memberpic" :value="index" :range="array">
							<input type="text" placeholder="请选择助理" :disabled="true" class="memberSel" v-model="assistantvalue"/>
						</picker>
					</view>
					
				</view>
			    <!-------按钮-------->
				<view class="btnbg">
					<button class="qx" @click="servcancel()">取消</button>
					<button class="qd" @click="serveok">确定</button>
				</view>
			</view>
		</view>	
		<!----产品------>
		<view class="memberContent"  v-show="isProductShow">
			<view class="membersproduct">
				<!------标题------>
				<view class="titlemem">
					请选择员工
				</view>
				<!------内容------>
				<view class="memInput">
					<view class="ZGtitle">
						第一销售员
						<image class="downicon" :src="xzygiconjiantouIcon" mode="" id="downDir"></image>
					</view>
					<view>
						<picker  @change="bindPickerChange" class="memberpic" :value="index" :range="array"  :disabled="memDis">
							<input type="text" placeholder="请选择员工" :disabled="true" class="memberSel" v-model="membervalue"/>
							<label class="titleZGsel" v-show="zgshow">请选择主工</label>
						</picker>
					</view>
					<view class="ZGtitle">
						第二销售员(可不选)
						<image class="downicon" :src="xzygiconjiantouIcon" mode="" id="downDir1"></image>
					</view>
					<view>
						<picker  @change="assistantPickerChange" class="memberpic" :value="index" :range="array">
							<input type="text" placeholder="请选择助理" :disabled="true" class="memberSel" v-model="assistantvalue"/>
						</picker>
					</view>
					<view class="ZGtitle">
						本次销售数量
					</view>
					<view>
						<input type="number" class="memberSel" placeholder="本次销售数量" v-model="selnum"/>
						<label class="titleZGsel" v-show="selnumshow">请输入本次销售数量</label>
					</view>
					
				</view>
			    <!-------按钮-------->
				<view class="btnbg">
					<button class="qx" @click="produccancel">取消</button>
					<button class="qd" @click="productok">确定</button>
				</view>
			</view>
		</view>	
		<!----类别弹框---->
		<view class="typeContent"  v-show="isTypeShow">
			<view class="members">
				<!------标题------>
				<view class="titlemem">
					添加类别
				</view>
				<!------内容------>
				<view class="memInput">
					<view class="ZGtitle">
						服务类别/产品类别
						<image class="downicon" :src="xzygiconjiantouIcon" mode="" id="downDir"></image>
					</view>
					<view>
						<picker  @change="typeChange" class="memberpic" :value="index" :range="typeServe">
							<input type="text" placeholder="添加服务类别" :disabled="true" class="memberSel" v-model="typevalue"/>
							<label class="titleZGsel" v-show="typeshow">请选择服务类别</label>
						</picker>
					</view>
					<view>
						<label>类别名称</label>
						<input type="text" placeholder="请输入类别名称"  class="memberSel" v-model="typenamevalue"/>
						<label class="titleZGsel" v-show="typenameshow">请输入类别名称</label>
					</view>
					
				</view>
			    <!-------按钮-------->
				<view class="btnbg">
					<button class="qx" @click="typecancel">取消</button>
					<button class="qd" @click="typeok">确定</button>
				</view>
			</view>
		</view>
		
		<!---路由选项卡---->
		<view class="orderCheck">
			<view v-for="(item, index) in navList" :key="index" class="checklist"  @click="tabClick(index,item)">
				<label  :class="{ current: tabCurrentIndex === index }">{{ item.text }}</label> 
			</view>
		</view>
		<!--订单详情-->
			<!--服务-->
			<view  class="orderInfo" v-show="tabId===0">
				<view class="Menu">
					<view v-for="(item,index) in menuList" :key="item.gtPkid" class="lists orderlist"  :class="{ MenuCurrent: tabOrderIndex === index }"  @click="orderClick(index,item.gtPkid)">
						<label>{{ item.text }}</label>
					</view>
				</view>
				<view class="orderlists">
					<view class="orderTable"  :key="index" v-for="(orderdes,index) in orderDes">
						<view class="orderPosition" > 
							 <image :src="orderdes.imgurl" mode=""  class="productIcon"></image>
						</view>
						<view class="orderPosition orderDes">
							<view>   
								<view class="title">{{orderdes.title}}</view>
								<view class="des">{{orderdes.des}}</view>
							</view>	
							<view class="text-price">￥{{orderdes.price}}</view>
						</view>
						<view class="orderPosition plusorder"  @click="addServe(orderdes)">
							<image class="plusicon" :src="homeiconjiahaonorIcon" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
			<!--产品-->
			<view  class="orderInfo"  v-show="tabId===1">
				<view class="Menu">
					<view v-for="(item, index) in productList" :key="index" class="lists productList"  :class="{ MenuCurrent: tabOrderIndex === index }"  @click="orderClick(index,item.gtPkid)">
						<label>{{item.text}}</label>
					</view>
				</view>
				<view class="productlists">
					<view class="orderTable"  :key="index" v-for="(productdes,index) in productDes">
						<view class="orderPosition"> 
							 <image :src="productdes.imgurl" mode="" class="productIcon"></image>
						</view>
						<view class="orderPosition orderDes">
							<view>   
								<view class="title">{{productdes.title}}</view>
								<view class="des">{{productdes.des}}</view>
							</view>	
							<view class="text-price">￥{{productdes.price}}</view>
						</view>
						<view class="orderPosition plusorder"  @click="addProjuct(productdes)">
							<image class="plusicon" :src="homeiconjiahaonorIcon" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-------购物车列表------>
			<view class="shopCars"  :style="{top:shopnumpercent+'%'}" v-show="gwcIsShow">
				<view class="shopTable">
					<view class="shopClass">购物车</view>
					<view class="clear" @click="clearshop">
						<label class="shopClass"><image class="clearicon" :src="guciconqingkongIcon" mode=""></image>清空</label>
					</view>
				</view>
				<view class="shopCarslist" :style="{height:shopnums+'upx'}">
					
					<view  class="shopCarslistscroll" v-for="(datalist,index) in datas" :key="index">
						<view class="shopList">
							<view class="shopdatalist">
								<view class="shopdatatitle">
									<view class="shoptitle">{{datalist.title}}</view>
									<view class="shoptext">主工:{{datalist.text}}</view>
								</view>
								<view class="shopnum">
									<view>
										<image class="minusicon" :src="gwciconjianhaoIcon" mode=""  @click="minus(index)"></image>
										<label class="datanum">{{datalist.num}}</label>
										<image class="plusicon plusshop" :src="homeiconjiahaonorIcon" mode="" @click="plus(index)"></image>
										
									</view>
									<view class="pricecolor">
										￥{{datalist.price}}
									</view>
								</view>
							</view>
							<view class="delshop"  @click="shopListClick(index)">
								删除
							</view>
						</view>  
					</view>
					
				</view>
				
			</view>
		<!--结账服务-->
		<view class="foot">
			<view class="foots shop" @click="startShopCar" :class="[totalPrice==='未选购服务' ?  grays:oranges]">
				<image class="shopicon" :src="[totalPrice==='未选购服务' ?  gwciconnor:gwciconsel]" mode=""></image>
			</view>
			<view class="foots footlist">
				<view class="footer priceTotal" :class="[totalPrice==='未选购服务' ?  classGray:classRed]">
					<label v-show="totalPrice ==='未选购服务'">{{totalPrice}}</label>
					<label v-show="totalPrice !=='未选购服务'">￥{{totalPrice}}</label>
				</view>
				<view class="footer settle" @click="orderDown">
					<button class="btn" :class="[totalPrice==='未选购服务' ?  grays:oranges]">下单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var gtpkid="";
	
	export default {
		data() {
			return {
				guciconqingkongIcon:this.httpUrl+'file/static/order/guc-icon-qingkong.png',
				gwciconjianhaoIcon:this.httpUrl+'file/static/order/gwc-icon-jianhao.png',
				homeiconjiahaonorIcon:this.httpUrl+'file/static/order/home-icon-jiahao-nor.png',
				xzygiconjiantouIcon:this.httpUrl+'file/static/order/xzyg-icon-jiantou.png',
				fanhuiIcon:this.httpUrl+'file/static/order/jiehznag-icon-fanhui.png',//返回图片
				memDis:false,//判断主工是否可选择操作
				gtPkid:"",//获取左侧列表某项id索引
				gwciconnor:this.httpUrl+'file/static/order/home-icon-gwc-nor.png',
				gwciconsel:this.httpUrl+'file/static/order/home-icon-gwc-sel.png',
				classGray:'gray',
				classRed:'redorange',
				oranges:'oranges',
				grays:'grays',
				pricetotalSave:0,
				isshopsShow:false,//购物车遮罩
				gwcIsShow:false,//购物车列表是否显示
				zgshow:false,//主工提醒
				selnumshow:false,//销售量提醒
				typeshow:false,//类别提醒
				typenameshow:false,//类别名称提醒
				isShow:false,//遮罩是否显示
				isTypeShow:false,//类别是否显示
				isServeShow:false,//服务员工是否显示
				isProductShow:false,//产品员工是否显示
				isServeOrProduct:"",//判断是服务还是产品
				tabCurrentIndex: 0,//选项卡角标
				tabOrderIndex:0,//服务产品添加内容角标
				tabId:0, //服务产品角标
				membervalue:"",//员工名称主工
				memberid:"",//主工id
				selnum:1,//产品销售量
				assistantvalue:"",//助理名称
				assistantid:"",//助理id
				typevalue:"",//类别选择
				typenamevalue:"",//类别名称
				timeprice:0,//临时存储额度
				timetitle:"",//临时存服务产品标题
				totalPrice:"未选购服务",//总额
				totaltime:0,
				totalarray:[],
				array: [],
				typeServe:["服务","产品"],
				navList: [
						{
							text: '服务'
						},
						{
							text: '产品'
						}
					],
				//服务菜单
				menuList: [],
				goods_pkid:"",//服务id
				//服务内容
				orderDes:[],	
				//产品菜单
				productList: [
					
				],	
				shopnums:185,//购物车自增高度
				shopnumpercent:70,//购物车自减top位移
				//产品内容
				productDes:[
					
				],		
				datas:[],//购物车收集内容
				shop_pkid:"",//店铺Id
				emp_pkid:"",//创建人id
				emp_role_pkid:"",//角色id
				memberidArr:[]//人员Id
			}
		},
		onLoad(options) {
			let _this = this;
			console.log(options)
			_this.shop_pkid = options.shop_pkid;
			_this.emp_pkid = options.emp_pkid; 
			_this.emp_role_pkid = options.emp_role_pkid; 
			//左侧列表挂载
			_this.menuContent();
			
			//获取员工(主工，助力)
			uni.request({
				url: _this.httpUrl+'Jni_EmployeeController/selectEmployee.xsh?shop_pkid='+_this.shop_pkid,
				method: 'GET',
				//header: {'content-type': "application/x-www-form-urlencoded"},
				success(res) {
					console.log("获取员工",res.data.obj)
					let data = res.data.obj;
					_this.array = ['-请选择-'];
					_this.memberidArr = [];
					for(var i=0;i<data.length;i++){
					_this.array.push(data[i].emp_name);
					_this.memberidArr.push(data[i].emp_pkid);
					}
				},
				fail(err) { 
					console.log("响应失败",err);
				}
			});
		},
		
		filters:{
			keepnums(value){
				let tempVal = parseFloat(value).toFixed(3)
				let realVal = tempVal.substring(0, tempVal.length - 1)
				return realVal;
			}
			
		},
		methods: {
	
			//左侧菜单
			menuContent(){
				let _this = this;
				uni.request({
					url: _this.httpUrl+'Jni_Goods_TypeController/selectGoodsType.xsh?shop_pkid='+_this.shop_pkid,
					method: 'GET',
					//header: {'content-type': "application/x-www-form-urlencoded"},
					success(res) {
						console.log("res",res)
						let data1 = res.data.obj1;
						let data2 = res.data.obj2;
						_this.menuList = [];
						_this.productList = [];
						for(var i=0;i<data1.length;i++){
							console.log("gtname",data1[i].gt_name)
							_this.menuList.push({text:data1[i].gt_name,gtPkid:data1[i].gt_pkid})
						}
						for(var i=0;i<data2.length;i++){
							console.log("gtname",data2[i].gt_name)
							_this.productList.push({text:data2[i].gt_name,gtPkid:data2[i].gt_pkid})
						}
						//tabId
						if(_this.tabId == 0){
							_this.gtPkid = data1[0].gt_pkid;
							_this.shop_pkid = data1[0].shop_pkid;
						}else{
							_this.gtPkid = data2[0].gt_pkid;
							_this.shop_pkid = data2[0].shop_pkid;
						}
						
						let gtpkid = _this.gtPkid;
						
						_this.serveContent(gtpkid);
					},
					fail(err) { 
						console.log("响应失败",err);
					}
				});
			},
			//右侧内容
			serveContent(gtpkid){
				let _this = this;
				console.log("111",gtpkid)
				//服务内容遍历挂载
				uni.request({
					url: _this.httpUrl+'Jni_GoodsController/selectGoods.xsh?gt_pkid='+gtpkid,
					method: 'GET',
					//header: {'content-type': "application/x-www-form-urlencoded"},
					
					success(res) {
						console.log("resww",res)
						let data = res.data.obj;
						_this.orderDes=[];
						_this.productDes = [];
						/* {
							title:"精细洗发",
							des:"精细服务，滋养头皮",
							imgurl:"../../static/fuwu/home-img-fuwu.png",
							price:30
						}, */
						for(var i=0;i<data.length;i++){
							if(_this.tabId == 0){
								_this.orderDes.push({
														title:data[i].goods_name,
														des:data[i].remark,
														imgurl:data[i].goods_image,
														price:data[i].standard_price,
														goods_pkid:data[i].goods_pkid,
													})
							}else{
								_this.productDes.push({
														title:data[i].goods_name,
														des:data[i].remark,
														imgurl:data[i].goods_image,
														price:data[i].standard_price,
														goods_pkid:data[i].goods_pkid,
													});
							}
						
						}
					},
					fail(err) { 
						console.log("响应失败",err)
					}
				})
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.tabId = index;
				this.tabOrderIndex = 0;
				this.menuContent();
			},
			//左侧菜单
			orderClick(index,gtPkid) {
				var _this = this;
				_this.tabOrderIndex = index;
				_this.gtPkid = gtPkid;
				gtpkid = gtPkid;
				_this.serveContent(gtpkid)
				console.log("index",index)
				console.log("gtPkid",gtPkid)
			},
			//添加服务
			addServe(e){
					console.log("服务添加",e)
				this.timeprice = e.price;
				this.timetitle= e.title;
				this.goods_pkid = e.goods_pkid;
				console.log(this.timeprice,this.timetitle)
				this.isShow = true;
				this.isServeShow=true;
				this.isServeOrProduct="服务";
			},
			//添加产品
			addProjuct(e){
			
				this.timeprice= e.price;
				this.timetitle=e.title;
				this.goods_pkid = e.goods_pkid;
				console.log(this.timeprice,this.timetitle)
				
				this.isShow = true;
				this.isProductShow=true;
				this.isServeOrProduct="产品"
			},
			//减去购物车中某产品数量-1
			minus(index){
				if(this.totalPrice !== "未选购服务"){
					console.log("asdsadasd")
				   
					if(this.datas[index].num >= 1 && Number(this.totalPrice)>0){
						  console.log(this.datas[index].num)
					  this.datas[index].num--;
					  this.datas[index].price=this.datas[index].num*this.datas[index].tprice;
					  this.datas[index].price=parseFloat(this.datas[index].price).toFixed(2);
					  this.totalPrice -=this.datas[index].tprice;
					  this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
					}
					if(this.datas[index].num < 1){
						this.datas.splice(index,1);
					}
					this.memDis = true;
					if(this.shopnums != 185 && this.shopnumpercent != 70){
						this.shopnums -=195;
						this.shopnumpercent += 12;
					}
				}
				if(this.totalPrice == 0){
					this.datas = [];
					this.totalPrice = "未选购服务";
					this.memDis = false;
					this.membervalue="";
				}
				console.log(index)
			},
			//添加购物车中某产品数量+1
			plus(index){
				this.totalarray = [];
				this.datas[index].num++;
				console.log("dataslength",this.datas,this.datas.length,index)
				console.log("pricenum",this.datas[index].num)
				let price=Number(this.datas[index].num)*Number(this.datas[index].tprice);
				this.datas[index].price = parseFloat(price).toFixed(2);
				console.log("total",this.datas[index].price)
				
				
				let totalprice = 0;
				for(let k in this.datas){
					this.totalarray.push(this.datas[k].price);
				}
				
				console.log("this.totalarray",this.totalarray)
				for(let l in this.totalarray){
					totalprice +=Number(this.totalarray[l]);
				}
				console.log("totalprice",parseFloat(totalprice).toFixed(2));
				this.totalPrice = parseFloat(totalprice).toFixed(2);
				this.memDis = true;
				if(this.totalPrice=="未选购服务"){
					this.totalPrice = 0;
					this.memDis = false;
				}
			},
			
			//服务员工确定
			serveok(){
				let _this = this;
				if(this.membervalue !== ""){
					this.isShow = false;
						this.isProductShow=false;
						this.isServeShow=false;
					
					this.totalarray = [];
					this.zgshow = false;
					this.datas.push({title:this.timetitle,text:this.membervalue,memberid:this.memberid,assistantvalue:this.assistantvalue,assistantid:this.assistantid,num:1,price:this.timeprice,tprice:this.timeprice,goods_pkid:this.goods_pkid});
					this.assistantvalue="";
					
					let totalprice = 0;
					for(let k in this.datas){
						this.totalarray.push(this.datas[k].price);
					}
					
					console.log("this.totalarray",this.totalarray)
					for(let l in this.totalarray){
						totalprice +=Number(this.totalarray[l]);
					}
					console.log("totalprice",parseFloat(totalprice).toFixed(2));
					this.totalPrice = parseFloat(totalprice).toFixed(2);
					this.memDis = true;
					if(this.totalPrice=="未选购服务"){
						this.memDis = false;
						this.totalPrice = 0;
						this.membervalue="";
					}
					
					console.log("长度："+this.datas.length)
					if(this.datas.length>1 && this.shopnums < 585){
						this.shopnums +=195;
						this.shopnumpercent -= 12;
					}
				
					
					console.log("shopnums",this.shopnums)
					
					
					
				}else{
					this.zgshow = true;
				}
			},
			//产品员工确定
			productok(){
				let _this = this;
				if(this.membervalue !== ""){
					this.zgshow = false;
					if(this.selnum !==""){
						this.isShow = false;
					
							this.isProductShow=false;
					
							this.isServeShow=false;
						
						let num = this.selnum;
						num = parseInt(num);
						this.totalarray = [];
						this.zgshow = false;
						this.datas.push({title:this.timetitle,text:this.membervalue,memberid:this.memberid,assistantvalue:this.assistantvalue,assistantid:this.assistantid,num:num,price:this.timeprice*num,tprice:this.timeprice,goods_pkid:this.goods_pkid});
						
						this.assistantvalue="";
						
						let totalprice = 0;
						for(let k in this.datas){
							this.totalarray.push(this.datas[k].price);
						}
						
						console.log("this.totalarray",this.totalarray)
						for(let l in this.totalarray){
							totalprice +=Number(this.totalarray[l]);
						}
						console.log("totalprice",parseFloat(totalprice).toFixed(2));
						this.totalPrice = parseFloat(totalprice).toFixed(2);
						
						
						
						this.assistantvalue="";
						this.selnumshow=false;
						this.selnum=1;
						this.memDis = true;
						if(this.totalPrice=="未选购服务"){
							this.totalPrice = 0;
							this.memDis = false;
							this.membervalue="";
						}
						
						if(this.datas.length>1 && this.shopnums < 585){
							console.log("1sssss")
							_this.shopnums +=195;
							_this.shopnumpercent -= 12;
						}
					}else{
						this.selnumshow=true;
					}
				}else{
					this.zgshow = true;
				}
			},
			
			
			//服务员工取消
			servcancel(){
				this.isShow = false;
				this.isProductShow=false;
				this.isServeShow=false;
				this.zgshow = false;
				this.selnumshow=false;
				
				this.assistantvalue="";
				this.timetitle="";
				if(this.totalPrice==0){
					this.totalPrice = "未选购服务";
					this.membervalue="";
				}
			},
			//产品员工取消
			produccancel(){
				this.isShow = false;
				this.isProductShow=false;
				this.isServeShow=false;
				this.zgshow = false;
				this.selnumshow=false;
				
				this.assistantvalue="";
				this.timetitle="";
				if(this.totalPrice==0){
					this.totalPrice = "未选购服务";
					this.membervalue="";
				}
			},
			//员工选择
			bindPickerChange(e) {
				console.log("员工选择",e,"this.array",this.array,"_this.memberidArr",this.memberidArr)
				this.membervalue = this.array[e.target.value];
				this.memberid = this.memberidArr[e.target.value-1];
				if(this.membervalue === '-请选择-'){
					this.membervalue = '';
					this.memberid = '';
				}
				console.log('picker发送选择改变，携带值为', this.membervalue,this.memberid)
			},
			assistantPickerChange(e) {
				this.assistantvalue = this.array[e.target.value];
				this.assistantid = this.memberidArr[e.target.value-1];
				if(this.assistantvalue === '-请选择-'){
					this.assistantvalue = '';
					this.assistantid = '';
				} 
				console.log('picker发送选择改变，携带值为', this.assistantvalue,this.assistantid)
			},
			//类别增加弹框
			typeplus(){
				this.isShow = true;
				this.isTypeShow=true;
			},
			//类别选择
			typeChange(e){
				this.typevalue = this.typeServe[e.target.value];
				if(this.typevalue === '-请选择-'){
					this.typevalue = '';
				}
				console.log('picker发送选择改变，携带值为', this.typevalue)
			},
			//类别确定
			typeok(){
				
				if(this.typevalue !== ""){
					this.typeshow = false;
					if(this.typenamevalue !== ""){
						this.isShow = false;
						this.isTypeShow=false;
						this.typenameshow = false;
						this.typevalue="";
						this.typenamevalue="";
					}else{
						this.typenameshow = true;
					}
				}else{
					this.typeshow = true;
				}
			},
			//类别取消
			typecancel(){
				this.isShow = false;
				this.isTypeShow=false;
				this.typeshow = false;
				this.typenameshow = false;
				this.typevalue="";
				this.typenamevalue="";
			},
			//开启购物车列表
			startShopCar(){
				
					this.gwcIsShow = !this.gwcIsShow;
					this.isshopsShow = !this.isshopsShow;
			},
			//购物车列表任意删除某一项
			shopListClick(index){
				let _this = this;
				let price=parseFloat(this.datas[index].price).toFixed(2);
				console.log("price",price)
				this.totalPrice -=price;
				this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
				
					if(_this.shopnums != 185 && _this.shopnumpercent != 70){
						_this.shopnums -=195;
						_this.shopnumpercent += 12;
					}
					
			
				
				uni.showToast({
					title:"删除"+this.datas[index].title+"成功！",
					icon:"none"
				});
				this.memDis = true;
				this.$delete(this.datas,index);
				if(this.totalPrice==0){
					this.totalPrice = "未选购服务";
					this.memDis = false;
					this.membervalue="";
					return false;
				}
			},
			//清空购物车
			clearshop(){
				this.datas=[];
				this.gwcIsShow = false;
				this.isshopsShow = false;
				console.log(this.datas)
				uni.showToast({
					title:"成功清空购物车！",
					icon:"none"
				});
				this.totalPrice=0;
				this.memDis = true;
				if(this.totalPrice==0){
					this.totalPrice = "未选购服务";
					this.memDis = false;
					this.membervalue="";
				}
			
					this.shopnums =185;
					this.shopnumpercent = 70;
				
			},
			shopShow(){
				this.gwcIsShow = false;
				this.isshopsShow = false;
			},
			//下单
			orderDown(){
				let _this = this;
				console.log("datas",_this.datas,"总价：",_this.totalPrice,"店铺编号id:",_this.shop_pkid)
				let detail_num = "";//数量
				let goods_pkid = "";//商品主键
				let goods_name = "";//商品名称
				let standard_price = "";//标准价
				let sell_id = "";//主销售
				let auxiliary_id = "";//副销售
				let totalPrice = _this.totalPrice;//总价
				let shop_pkid = _this.shop_pkid;//店铺编号id
				
				//let memberid ="";
				//let assistantid = "";
				let orderArr = [];
			if(this.totalPrice == "未选购服务"){
				uni.showToast({
					title:"请添加购物车！",
					icon:"none"
				});
				return false;
			}
				for(let k in _this.datas){
					detail_num = _this.datas[k].num;
					goods_pkid = _this.datas[k].goods_pkid;
					standard_price = _this.datas[k].price;
					sell_id = _this.datas[k].memberid;
					auxiliary_id = _this.datas[k].assistantid;
					goods_name = _this.datas[k].title;
					let lowest_price = Number(standard_price)/Number(detail_num);
					orderArr.push({
						detail_num,
						goods_pkid,
						goods_name,
						standard_price,
						lowest_price,
						sell_id,
						auxiliary_id,
						remark:"q"
					})
				}
				let obj = JSON.stringify(orderArr);
				console.log(_this.httpUrl+'Jni_Order_InfoController/addOrderInfo.xsh?jsonData='+obj+'&shop_pkid='+shop_pkid+'&psort_type='+totalPrice)
				uni.request({
					url: _this.httpUrl+'Jni_Order_InfoController/addOrderInfo.xsh',
					method: 'POST',
					header: {'content-type': "application/x-www-form-urlencoded"},
					data:{
						jsonData:obj,
						shop_pkid:shop_pkid,
						psort_type:totalPrice,
						// order_num:
						// payed_money:
						// created_by:
					},
					success(res) {
						console.log("下单",res)
							uni.showToast({
								title:"下单成功！",
								icon:"success"
							});
							setTimeout(()=>{
								uni.navigateTo({
									url:"/pagesA/orderList/orderList?shop_pkid="+_this.shop_pkid+"&emp_pkid="+_this.emp_pkid+"&emp_role_pkid="+_this.emp_role_pkid
								})
							},2000)
					},
					fail(err) { 
						console.log("响应失败",err)
					}
				})
				
			},
			
		}
		
	}
</script>

<style>
 /* @import url("../../static/iconfont/iconfont.css"); */
    #downDir,#downDir1{
		position: relative;
		top:74upx;
	}
	.gray{
		color: #999999;
		font-size: 0.65rem;
		position: relative;
		left: 60upx;
		top:-30rpx;
	}
	.redorange{
		color: #F87D24;
		font-weight: bold;
		font-size: 1.2rem;
	}
	.grays{
		background-color: #999999;
	}
	.oranges{
		background-color: #F87D24;
	}
	/**提醒**/
	.titleZGsel{
		color: #FF7500;
	}
    /***遮罩层***/
	.Zao{
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: 0.2;
		z-index: 5;
		position: fixed;
	}
	.Zaos{
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: 0.2;
		z-index: 3;
		position: fixed;
	}
	.memberContent{
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 6;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		
	}
	.typeContent{
		height: 100%;
		width: 100%;
		position: fixed;
		z-index: 6;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
	}
	.members{
		width: 552upx;
		height: 525upx;
		background-color: #fff;
		border-radius: 8pt !important;
		opacity: 1 !important;
		position: relative;
		top:-60upx;
		font-size: 0.9rem;
		font-weight: 580;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		box-shadow: 0upx 0upx 30upx #999;
	}
	.membersproduct{
		width: 552upx;
		height: 685upx;
		background-color: #fff;
		border-radius: 8pt !important;
		opacity: 1 !important;
		position: relative;
		top:-60upx;
		font-size: 0.9rem;
		font-weight: 580;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		box-shadow: 0upx 0upx 30upx #999;
	}
	/****弹框标题***/
	.titlemem{
		height:30upx;
		border-bottom: 1px solid #E5E5E5;
		padding-top: 20upx;
		padding-bottom: 30upx;
		text-align: center;
	}
	/***弹框输入内容***/
	.memInput{
		padding: 20upx 40upx 0upx 40upx;
	}
	.memInput>view{
		margin-bottom: 15upx;
	}
	.memberSel{
		border: 1px solid #999;
		border-radius: 4pt;
		display: inline-block;
		width: 100%;
	}
	.ZGtitle{
		display: flex;
		justify-content: space-between;
	}
	/*****按钮*****/
	.btnbg{
		display: flex;
		flex-wrap: nowrap;
		padding: 0;
	}
	.btnbg>button{
		flex:1;
		color: #fff;
		font-weight: bold;
		border-radius: 8pt;
		
	}
	.qx{
		border:transparent !important;
		background-color: #1E90FF;
		border-top-left-radius: 0pt !important;
		border-top-right-radius: 0pt !important;
		border-bottom-right-radius: 0pt !important;
	}
	.qd{
		border:transparent !important;
		background-color:#F87D24;
		border-top-right-radius: 0pt !important;
		border-top-left-radius: 0pt !important;
		border-bottom-left-radius: 0pt !important;
	}
	.btnbg{
		border-radius: 8pt;
	}
	
	.order{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	/****导航****/
	/* .nav{
		display: flex;
		height: 55pt;
		background: linear-gradient(to right,#F54D28,#FB9723);
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: bolder;
		padding-top: 37upx;
		flex-wrap: nowrap;
		padding-left: 25upx;
		width: 100%;
	
	} */
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
		left: 20upx;
	}
	/**选项卡**/
	.orderCheck{
		display: flex;
		justify-content: center;
		align-items: flex-end;
		color: #999;
		font-weight: bolder;
		flex-wrap: nowrap;
		border-bottom: 1px solid #E5E5E5;
	    font-size: 32upx;
		padding-top: 40upx;
	}
	.checklist{
		flex: 1;
		text-align: center;
		padding-bottom: 20upx;
	}
	
	.current{
		color: #F75E26;
		padding-bottom: 13upx;
		border-bottom: 4px solid #F75E26;
		
	}
	/**列表详情**/
	.orderInfo{
	  display: flex;	
	  flex-wrap: nowrap;
	  justify-content: center;
	}
	/**菜单及详情**/
	html,body,.order,.orderInfo{
		box-sizing: border-box;
		height: 100%;
	}
	/**左侧菜单**/
	.Menu{
		flex: 1;
		text-align: center;
		font-size: 28upx;
		color: #A9A9A9;
		background-color: #F0F0F0;
		overflow: auto;
	}
	.Menu::-webkit-scrollbar{
		width: 0upx;
	}
	
	.MenuCurrent{
		color: #F75E26;
		background-color: #fff;
	}
	.plus{
		display: flex;
	}
	.lists{
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
	.plusicon{
		margin-right: 22upx;
		margin-left: 4;
	}
	/**右侧详情**/
	.orderlists,.productlists{
		flex: 3;
		padding-top: 15upx;
		box-sizing: border-box;
		overflow: auto;
	}
	.orderlists::-webkit-scrollbar,.productlists::-webkit-scrollbar{
		width: 0upx;
	}
	.productIcon{
		width: 90pt;
		height: 70pt;
	}
	.orderTable{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
	}
	.orderPosition{
		flex:3;
		height: 70pt;
	}
	.title{
		font-size: 30upx;
		flex-wrap: nowrap;
		font-weight: 500;
		margin-bottom: 5upx;
	} 
	.des{
		font-size: 22upx;
		flex-wrap: nowrap;
		color: #999999;
	} 
	.orderDes{
		flex: 3;
		height: 70pt;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding-top: 8upx;
	}
	.text-price{
		font-size: 11pt;
		flex-wrap: nowrap;
		color: #F75E26;
	}
	
	.plusorder{
		flex:1;
		height: 70pt;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	
	/***购物图标**/
	.shop{
		border:5pt solid #616161;
		width: 80upx;
		height:80upx;
		border-radius: 50%;
		text-align: center;
		position: absolute;
		left: 45upx;
		top:-35%;
		justify-content: center;
		align-items: center;
		display: flex;
	    box-shadow: 0upx 0upx 20upx #484848;
	}
	.shopicon{
		position: relative;
		left: -0.1%;
	}
	/***购物车收集**/
	.shopCars{
		position: fixed;
	
		width: 100%;
		background-color: #fff !important;
		z-index: 4;
	}
	.shopCarslist{
		display: block;
		overflow: auto;
		overflow-x: hidden;
		padding: 0;
		box-sizing: border-box;
		background-color: #fff !important;
		max-height: 685upx;
		min-height: 185upx;
	}
	.shopCarslist::-webkit-scrollbar{
		width: 0upx;
	}
	.shopCarslistscroll{
		display: block;
		overflow: hidden;
		overflow-x: auto;
		padding: 0;
		box-sizing: border-box;
		background-color: #fff !important;
	}
	.shopCarslistscroll::-webkit-scrollbar{
		width: 0upx;
	}
	.shopList{
		height: 142upx;
		width: 120%;
		box-sizing: border-box;
		border-bottom: 1px solid #E5E5E5;
	
		overflow-x: auto;
		overflow-y: hidden !important;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	
	
	.shopdatalist{
		width: 100%;
		height: 142upx;
		font-size: 0.7rem;
		padding: 22upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	
	.delshop{
		width: 20%;
		height: 142upx;
		line-height: 142upx;
		text-align: center;
		background-color: #F65528;
		color: #fff;
	}
	.shopTable{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		background-color: #EDEEF1;
		align-items: center;
		padding: 20upx;
		color: #666666;
		
	}
	.shopClass{
		font-size: 0.8rem;
		
	}
	.clearicon{
		position: relative;
		top:4upx;
		left: -4upx;
	}
	.clear{
		position: relative;
		top:-3upx;
		
	}
	.shoptitle{
		color: #333333;
		font-weight: 800;
		margin-bottom: 15upx;
		font-size: 0.9rem;
	}
	.shoptext{
		color: #666666;
		font-size: 0.7rem;
	}
	
	/**底部**/
	.foot{
		background-color: #FAFAFA;
		width: 100%;
		height: 140upx;
		padding: 0;
		box-sizing: border-box;
		align-items: center;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		z-index: 4;
		position: fixed;
		top:90%;
	}
	.foots{
		flex: 1;
	}
	.footlist{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		align-items: center;
		padding: 0;
	}
	.footer{
		flex: 1;
		justify-content: center;
		display: flex;
		height: auto;
		box-sizing: border-box;
		align-items: center;
	}
	
	
	.pricecolor{
		color: #F87D24;
		text-align: right;
		padding-right: 30upx;
		padding-top: 10upx;
		box-sizing: border-box;
	}
	.plusshop{
		position: relative;
		top:2upx;
	}
	.datanum{
		margin-left: 15upx;
		margin-right: 15upx;
		position: relative;
		top:-3upx;
	}
	.totals{
		position: relative;
		top:-7upx;
	}
	
	.btn{
		width: 85pt;
		height: 85upx;
		color: #fff;
		font-weight: bold;
		border-radius: 4pt;
		border: transparent;
		line-height: 85upx;
		font-size: 1rem;
		position: relative;
		left: 40rpx;
	}
	
</style>
