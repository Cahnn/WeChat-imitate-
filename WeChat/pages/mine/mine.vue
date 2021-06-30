<template>
	<view>
		<uni-list-item link :to="itmes.src" v-for="(itmes, index) in list" :title="itmes.listName" :thumb="itmes.imge" ></uni-list-item>
		<uni-list>
			<uni-list-item title="添加好友" link to="/pages/friend/addFriend"
					 thumb="/static/mineIcon/addFriend.png"/>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						listName:"建议反馈",
						src:"/pages/mine/retroaction",
						imge:"/static/mineIcon/commend.png",
					},
					{
						listName:"帮助中心",
						src:"/pages/helpCenter/helpCenter",
						imge:"/static/mineIcon/helpCenter.png",
					}
				]
			}
		},
		methods: {
			 goto(url) {
				uni.navigateTo({
					url:url
				})
			}
		},
		components:{
		}
	}
</script>

<style scoped>
.item {
	display: flex;
	width: 100%;
	justify-content: space-between;
	text-align: center;
	line-height: 50rpx;
	background-color: #FFFFFF;
	padding: 20rpx;
	margin: 5rpx 0;
}
</style>

