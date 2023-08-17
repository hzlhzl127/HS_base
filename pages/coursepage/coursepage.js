// pages/coursepage/coursepage.js
Page({

	data: {

	},

	onLoad(options) {
		const db = wx.cloud.database();
		const courseC = db.collection('course');

		courseC.get().then(res=>{
			console.log("路线列表请求成功",res)
			this.setData({
				courseList:res.data
			});
		}).catch(err=>{
			console.error(err);
		})
	},

	goDetail:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../coursepage/Cdetail?id='+e.currentTarget.dataset.id,
		})
	},
})