// pages/person/person.js
Page({

	/**
	 * 页面的初始数据
	 */
	data:{
		tabar2:'/image/个人中心 (1).png',
		tabar1:'/image/主页.png',
		user: {},
		openid:'',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		let use = wx.getStorageSync('User')
		this.setData({
			user:use
		})
		console.log("我的user",this.data.user)
	},

/*底部栏*/
	tabar:function (event) {
		const buttonId = event.currentTarget.id;
		if(buttonId==1){
			this.setData({
				tabar1:'/image/主页 (1).png',
				tabar2:'/image/个人中心.png'
			});
			wx.redirectTo({
				url: '../index/index',
			})
		}
		console.log(buttonId);
	},


	getUserProfile(e) {
		let openid = this.data.openid
		wx.getUserProfile({
			desc: '用于完善会员资料',
			success: (res) => {
				this.setData({
					user: res.userInfo,
				});
				console.log("取得用户信息", this.data.user);
	
				wx.cloud.callFunction({
					name: "getOpenid",
					success: (res) => {
						this.setData({
							openid: res.result.openid,
						});
						console.log("获取opid成功", this.data.openid);
						console.log("取得用户信息", this.data.user);
						// 在获取 openid 和 user 后再执行添加用户信息操作
	
					},
					fail: (res) => {
						console.log("获取id失败", res.openid);
					},
				});

				const num = Math.floor(Math.random() * 9000) + 1000;;


				wx.cloud.database().collection('use').where({
					_openid: openid // 假设你要查询的用户名是 'user123'
				}).get().then((res) => {
					if (res.data.length === 0) {
						console.log("未找到匹配的记录，不执行修改操作");
						
						wx.cloud.database().collection('use').add({
							data:{
								name:'微信用户'+num,
								avatarUrl:'https://636c-cloud2-4gqi5owse657a3cc-1318330947.tcb.qcloud.la/%E5%BA%94%E7%94%A8%E5%9B%BE%E6%A0%87/%E5%BE%AE%E4%BF%A1.png?sign=4899bb73bef7ec70f6016c1e1bab0768&t=1691223450'
							}
						}).then((res)=>{

							console.log("添加用户成功",res)

							wx.cloud.database().collection('use').where({
								_openid: openid // 假设你要查询的用户名是 'user123'
							}).get().then((res)=>{
								wx.setStorageSync('User',res.data[0])
								this.setData({
									user:res.data[0]
								})
							})
						})
					}
				}).catch((error) => {
					console.error("查询记录失败", error);
					// 处理错误
				});



				// wx.cloud.database().collection('use').where({
				// 	_openid: openid // 假设你要查询的用户名是 'user123'
				// }).update({
				// 	data:{
				// 		name:this.data.user.nickName,
				// 		avatarUrl:this.data.user.avatarUrl,
				// 	}
				// }).then((res)=>{
				// 	console.log("用户信息更新成功",res)
				// })


				wx.cloud.database().collection('use').where({
					_openid: openid // 假设你要查询的用户名是 'user123'
				}).get().then((res)=>{
					wx.setStorageSync('User',res.data[0])
					this.setData({
						user:res.data[0]
					})
				})
				
			},

		});
		
	},
	

	loginOut(){
		wx.removeStorage({
			key: 'User',
		})
		this.setData({
			user:{

			}
		})
	},

	myjoin(){
		wx.navigateTo({
			url: '../person/myCollect',
		})
	}



})