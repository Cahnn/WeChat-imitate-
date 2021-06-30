<template>
	<view id="moments">

		<view class="home-pic">
			<view class="home-pic-base">
				<view class="top-pic">
					<image class="header" src="../../static/index/test/header06.jpg"></image>
				</view>
				<view class="top-name">{{username}}</view>
			</view>
		</view>

		<view class="moments__post" v-for="(item,index) in list" :key="index" :id="'post-'+index">
			<view class="post-left">
				<image class="post_header" src="../../static/index/test/header06.jpg"></image>
			</view>

			<view class="post_right">
				<text class="post-username">{{username}}</text>
				<view id="paragraph" class="paragraph">{{item.input_content}}</view>
				<!-- 相册 -->
				<view class="thumbnails">
					<!-- v-for='(image, index_images) in item.imageList.replace(/"/g,"").split(",")' -->
					<view :class="item.imageList.length === 1?'my-gallery':'thumbnail'" v-for='(image, index_images) in item.imageList.replace(/"/g,"").split(",")' :key="index_images">
						<image class="gallery_img" lazy-load mode="aspectFill" :src="image" :data-src="image" @tap="previewImage( item.imageList,index_images)"></image>
					</view>
				</view>
				<!-- 资料条 -->
				<view class="toolbar">
					<view class="timestamp">{{item.createdAt}}</view>
				</view>
			</view>
			<!-- 结束 post -->
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>

</template>

<script>
	
	export default {
		data() {
			return {
				posts: [],
				list:[],
				username: '奥奥奥曼',

				index: '',

				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '' ,//可用窗口高度(不计入软键盘)
				
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		computed: {    
			imageList: function () {        
				let imageList = this.item.imageList     
				   console.log("imageList的类型",typeof(imageList))
				return imageList ? imageList.split(',') : []
		    }
		},
		mounted() {
			uni.getStorage({
				key: 'posts',
				success: function (res) {
					console.log(res.data);
					this.posts = res.data;
				}
			});
		},
		onLoad() {
			//获取设备信息
			uni.getSystemInfo({ 
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
			
			// 获取朋友圈数据
			uni.request({
				url:'http://localhost:3000/findAllPublish',
				method:'GET',
				success: (res) => {
					console.log(res.data)
					// let obj = [];
					// for (let i in res.data){
					// 	i.imageList = JSON.parse(i.imageList)
					// 	obj.push(i)
					// }
					this.list = res.data
					
				}
			})
		},
		onShow() {
			//监听窗口尺寸变化,窗口尺寸不包括底部导航栏
			uni.onWindowResize((res) => { 
				if(this.platform === 'ios'){
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				}else{
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
			console.log('onReachBottom');
			this.showLoadMore = true;
			setTimeout(() => {
				//获取数据
				if (this.posts.length < 20){//测试数据
					this.posts = this.posts.concat(this.posts);
				}else{
					this.loadMoreText = "暂无更多";
				}
			}, 1000);
		},
		onPullDownRefresh() { //监听下拉刷新动作
			console.log('onPullDownRefresh');
			// 这里获取数据
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		//监听标题栏点击事件
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.navigateTo('../publish/publish')
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			previewImage(imageList, image_index) {
				var current = imageList[image_index];
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},
			goPublish() {
				uni.navigateTo({
					url: './publish/publish',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/index/index.css");
</style>
