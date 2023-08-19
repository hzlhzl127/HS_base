// pages/add/add.js
Page({

	add(){
		wx.cloud.callFunction({
			name:"add",
			data:{
				a:0,
				b:3
			},

			success(res){
				console.log("请求成功",res)
			},
			fail(res){
				console.log("请求失败",res)
			}

		})
	},

	getid(){
		wx.cloud.callFunction({
			name:"getOpenid",
			success(res){
				console.log("获取opid成功",res.result.openid)
			},
			fail(res){
				console.log("获取id失败",res.openid)
			}
		})
	}
})