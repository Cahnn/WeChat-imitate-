<template>
	<view>
		<txl @ev="evFunc" :datas="datas"></txl>
	</view>
</template>

<script>
	import txl from "../../components/yt-txl/index.vue"
	export default {
		data() {
			let datas = []
			return {
				datas:datas
			}
		},
		methods: {
			evFunc(data){
				console.log(data)
			},
			async getUsers(){
				uni.request({
				    url: 'http://localhost:3000/findAllUser', 
				    method:'get',
				    success: (res) => {
						console.log(res.data)
						this.datas = res.data
				    }
				})
			}
		},
		components:{
			txl
		},
		onLoad() {
			this.getUsers()
		}
	}
</script>

<style>

</style>
