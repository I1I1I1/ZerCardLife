<script>
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';

   export default {
    name: 'App',
	data(){
		return{
			
		}
	},
	
  } 


</script>

<style >
	*{
		margin: 0;
		padding: 0;
	}
	.uni-calendar__nav>.uni-calendar__nav-item:last-child{
		color: #E01212;
	}
	.nav{
		height: 75px !important;
		}
	 
	     /* 你的项目css */
	  .content1 {
	   height: 400upx;
	   background: linear-gradient(left, #f54d28, #fb9722);
	   background: -o-linear-gradient(right, #f54d28, #fb9722);
	   background: -moz-linear-gradient(right, #f54d28, #fb9722);
	   background: linear-gradient(to right, #f54d28, #fb9722);
	  }
	  .kaika {
	   color: #ffffff;
	   padding-top: 70upx;
	   font-size: 40upx;
	   text-align: center;
	   font-family: PingFangSC-Regular, sans-serif;
	  }
  .backicon,.plusicon,.downicon,.minusicon,.shopselicon,.clearicon{
  	width: 30upx;
  	height: 30upx;
  }
  .upicon{
	  width: 1upx;
	  height: 40upx;
  }
  .shopicon{
	  width: 45rpx;
	  height: 45rpx;
  }
</style>