<template>
	<view>
		<input class="uni-input" v-model="form.name" focus="true" placeholder="姓名" />
		<input class="uni-input" v-model="form.companyName" focus placeholder="公司名称" />
		<image v-if="form.img" :src="form.img" mode=""></image>
		<button type="default" @click="upload" class="btn">上传图片</button>
		<button type="default" @click="submit" class="btn">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:'',
					companyName:'',
					img:''
				}
			}
		},
		methods: {
			// 上传图片
			upload(){
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url:'http://localhost:3000/uploadfile',
							filePath:tempFilePaths[0],
							name:'file',
							success:(uploadFileRes) => {
								console.log(uploadFileRes.data);
								this.form.img = uploadFileRes.data
							}
						})
					}
				})
			},
			// 提交表单
			submit(){
				console.log(this.form)
				uni.request({
					url:'http://localhost:3000/addFri',
					method:"POST",
					data:this.form,
					success: (res) => {
						uni.switchTab({
							url:'/pages/friend/friend'
						});
						uni.showToast({
							title:"添加成功",
							icon:"success"
						})
					}
				})
			}
		}
	}
</script>

<style>
.uni-input{
	margin: 40rpx 60rpx;
}
.btn{
	width: 200rpx;
	display: inline-block;
	margin: 20rpx 65rpx;
}
</style>
