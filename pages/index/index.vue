<template>
	<view class="content">	
		<view class="nav">
			<view class="nav-list"></view>
			<view class="nav-list" id="life0">0卡生活</view>
			<view class="nav-list"></view>
		</view>
		<view class="contentview">
			<image :src="imgsrc" mode="" class="logbg"></image>
			<button open-type='getUserInfo' @getuserinfo="wxLogin" type="primary"  withCredentials="true">微信授权登录</button>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				username: '',
				userpwd: '',
				code: '',
				openid: '',
				name: '',
				face: '',
				sign: '',
				imgsrc:this.httpUrl+'file/static/loginbg/loginbg.png'
			}
		},
		onLoad() {
			
			
		},
		methods: {
			getunicode(code) {
				console.log("code",code)
				var me=this;
				  uni.request({
					url: this.weixinUrl+code,
					method: 'GET',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {},
					success(userResult) {
						console.log("userResult",userResult);
						me.openid=userResult.data.openid;
						
						uni.showToast({
							icon:'success',
							title: '登录成功！'
						}); 
						uni.setStorageSync('openid',me.openid);
						uni.navigateTo({
							url:"../home/home?openid="+me.openid
						})
					},
					fail(err) {
						console.log(err)
					}
				});
				
			},
			wxLogin(res1){
				var me = this;
				console.log("res1",res1)
				if(!res1.detail.iv){
					uni.showToast({
						title:"您取消了授权，登录失败",
						icon:"none"
					});
				return false;	
				}
				
			
				// 通过微信开发能力，获得微信用户的基本信息
				
				uni.login({
					provider: "weixin",
					success(loginResult) {
						var code = loginResult.code;
						me.code=code;
						uni.showToast({
							title: '获取许可完毕'
						});
						me.getunicode(code);
					},
					fail() {
						console.log('loginfail!');
						if (timeout != null) {
							clearTimeout(timeout);
							timeout = null;
						}
					}
				});
			}
		}
	}
	
   
</script>

<style>
	body{
		display: flex;
		height: 100%;
	}
	h1{
		font-weight: bold;
		font-size: 45upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 85upx;
	}
	.logbg{
		width: 650upx;
		height: 550upx;
	}
   .content{
	 height: 100%;
	 width: 100%;
	 margin:0 auto;
	 display: -webkit-box;
	  display: -ms-flexbox;
	  display: -webkit-flex; 
	  display: flex;
	  justify-content: flex-start;  /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 */
	  align-items: center;  /* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。 */
	  flex-direction: column;
	  box-sizing: border-box;
   }
   /****导航****/
   .nav{
   	display: flex;
   	height: 60px;
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
   .contentview{
	   display: flex;
	   flex-direction: column;
	   height: 80%;
	   justify-content: space-between;
	   box-sizing: border-box;
	   padding: 20px;
	   padding-top: 150upx;
   }
   button{
	   width: 503upx;
	   border-radius: 60upx;
	   height: 90upx;
	   line-height: 90upx;
	   background: linear-gradient(to right,#F54D28,#FB9723);
   }
</style>
