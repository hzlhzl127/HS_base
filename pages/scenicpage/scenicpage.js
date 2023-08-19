// pages/scenicpage/scenicpage.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const db = wx.cloud.database();
		const lineC = db.collection('line');
		const scenicCollection = db.collection('scenic');

		scenicCollection.limit(4).get().then(res=>{
			console.log("景点列表请求成功",res)
			this.setData({
				scenicList:res.data
			});
		}).catch(err=>{
			console.error(err);
		})

		lineC.limit(4).get().then(res=>{
			console.log("路线列表请求成功",res)
			this.setData({
				lineList:res.data
			});
		}).catch(err=>{
			console.error(err);
		})
	},

	goDetail:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../scenicpage/Sdetail?id='+e.currentTarget.dataset.id,
		})
	},


})