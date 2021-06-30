<template>
	<view>
		<uni-collapse>
			<uni-collapse-item v-for="(item,index) in text" :title="item.txt">
				<view class="text">{{item.text}}</view>
			</uni-collapse-item>
		</uni-collapse>
		<view class="footer">
			<a href="#">联系人工客服</a>
			<p>在线时间：工作日9:00-12:00 13:00-18:00</p>
		</view>
	</view>
</template>

<script>
	import helpData from "../../common/help/help.js"
	export default {
		data() {
			return {
				text:helpData
			}
		},
		methods: {
		}
	}
</script>

<style>
.text{
	color: #888888;
	font-size: 14px;
	margin: 0 0 10rpx 20rpx;
}
.footer{
	width: 100%;
	position: absolute;
	bottom: 20rpx;
	border-top: 1rpx solid #F8F8F8;
	padding-top: 300rpx;
	text-align: center;
}
.footer a{
	color: #007AFF;
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	padding: 40rpx 0 20rpx;
	text-decoration: none;
}
.footer p{
	text-align: center;
	padding-bottom: 24rpx;
}
</style>
