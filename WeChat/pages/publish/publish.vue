<template>
	<!-- touchstart事件：当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发。
	touchmove事件：当手指在屏幕上滑动的时候连续地触发
	touchend事件：当手指从屏幕上离开的时候触发。 -->
	<!--  @touchstart="touchStart" @touchend="touchEnd" -->
	<view class="page">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="这一刻的想法..." v-model="input_content" />
			</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="footer">
				<button type="default" class="feedback-submit" @click="publish">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import image from '@/common/image.js';
	
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				// title: 'choose/previewImage',
				input_content:'',
				imageList: [],
				// reImageList:[],
				
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				
				//侧滑返回start
				startX: 0, //点击屏幕起始位置
				movedX: 0, //横向移动的距离
				endX: 0, //接触屏幕后移开时的位置
				//end
			}
		},
		onUnload() {
			this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 2,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 8;
		},
		
		methods: {
			close(e){
				// 把图片从列表中去掉
			    this.imageList.splice(e,1);
			},
			// 从本地选择图片
			chooseImage: async function() {
				uni.chooseImage({
					// 图片来源
					sourceType: sourceType[this.sourceTypeIndex],  //  sourceTypeIndex=["camera", "album"]，默认从拍照或相册
					// 图片类型
					sizeType: sizeType[this.sizeTypeIndex],  // sizeTypeIndex=['compressed', 'original']  默认压缩或原图
					// count  最多可以选择的图片张数，默认9
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					// 选择成功了就对图片进行压缩
					success: (res) => {
						
						// #ifndef APP-PLUS
						// concat() 方法用于连接两个或多个数组
						console.log("上传图片的res",res)
						this.imageList = this.imageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// #endif
						
						console.log("压缩后的列表",this.imageList)
					}
				})
			},
			async publish(){
				// 对内容判空
				if (!this.input_content) {
					uni.showModal({ content: '内容不能为空', showCancel: false, });
					return;
				}
				
				uni.showLoading({title:'发布中'});
				
				var images = [];
				var reImageList = [];
				for(var i = 0;i < this.imageList.length; i++){
					// 换成一下格式：
					// {
					// 	name: "image-0"
					// 	uri: "blob:http://localhost:8081/03d8882e-7ab0-4a88-ac4d-eba70010a1cb"
					// }
					var image_obj = {name:'image-'+i,uri:this.imageList[i]};  
					images.push(image_obj);
				}
				
				uni.uploadFile({ 
					url: 'http://localhost:3000/uploadfiles',
					files:images, //有files时,会忽略filePath和name
					filePath: '',
					name: '',
					success: (uploadFileRes) => {
						uni.hideLoading();
						let data = uploadFileRes.data
						data = data.replace(/"/g,'')
						data = data.replace('[','')
						data = data.replace(']','')
						console.log(data)
						uni.request({
							url:"http://localhost:3000/published",
							method:'POST',
							data:{
								'input_content':this.input_content,
								'imageList':data
							},
							success: (res) => {
								console.log(res)
							}
						})
						uni.showToast({
							icon:'success',
							title:"发布成功"
						})
						uni.switchTab({
							url:'../discover/discover'
						})
					},
					fail: (e) => {
						console.log("e: " + JSON.stringify(e));
						uni.hideLoading();
						uni.showToast({
							icon:'none',
							title:"发布失败,请检查网络"
						});
					}
				});
			},
			// 放大查看图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			
			
			// 在屏幕上滑动长度大于200就返回上一页，在这好像不起作用
			// touchStart: function(e) {
			// 	// 计算屏幕起始位置
			// 	this.startX = e.mp.changedTouches[0].pageX;
			// },
			
			// touchEnd: function(e) {
			// 	// 计算接触屏幕后移开时的位置
			// 	this.endX = e.mp.changedTouches[0].pageX;
			// 	if (this.endX - this.startX > 200) {
			// 		//关闭当前页面，返回上一页面或多级页面
			// 		uni.navigateBack();
			// 	}
			// }
		}
	}
</script>

<style scoped>
	
	.footer {
		margin-top: 80upx;
	}
	
	.cell-pd {
		padding: 20upx 30upx;
	}

	.uni-textarea {
		width: auto;
		padding: 20upx 25upx;
		line-height: 1.6;
		height: 150upx;
	}
	.uni-list::before {
		height: 0;
	}
	.uni-list:after {
		height: 0;
	}
	.list-pd {
		margin-top: 0;
	}
	.close-view{
	    text-align: center;
		line-height:30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}
	.page {
		width: 750upx;
		height: 100%;
	}
</style>
