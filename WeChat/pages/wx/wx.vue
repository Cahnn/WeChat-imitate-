<template>
	<view>
		<view class="flex clickBtn" v-for="(item,index) in users">
			<view class="clickBtn-image">
				<image :src="item.img"></image>
			</view>
			<view class="clickBtn-span">
				<span>{{item.name}}</span>
				<p>{{item.mess}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				users:[]
			}
		},
		methods: {
			async getUser(){
				uni.request({
					url:'http://localhost:3000/findAllUser',
					method:"GET",
					success: (res) => {
						console.log(res)
						this.users = res.data
					}
				})
			}
		},
		onLoad() {
			this.getUser()
		}
	}
</script>

<style scoped>
	.flex {
	    display: flex;
	    align-items: center;
	}
	.clickBtn {
		margin-top: 15rpx;
		height: 100rpx;
		border-radius: 5rpx;
	}
	.clickBtn .clickBtn-image image {
		border: 1rpx solid #f0f0f0;
		width: 90rpx;
		height: 90rpx;
		margin: 50rpx 10rpx;
		border-radius: 5rpx;
	}
	.clickBtn .clickBtn-span {
		/* font-size: 36rpx; */
		/* font-weight: 700; */
		width: 80%;
		/* height: 85rpx; */
		/* padding: 0 10rpx; */
		background-color: #ffffff;
		border-bottom: 1rpx solid #f0f0f0;
	}
	span{
		font-size: 16px;
	}
	p{
		font-size: 14px;
	}
</style>
