// pages/productpage/productpage.js
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
		const productC = db.collection('product');

		productC.get().then(res=>{
			console.log("路线列表请求成功",res)
			this.setData({
				productList:res.data
			});
		}).catch(err=>{
			console.error(err);
		})
	},

	goDetail:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../productpage/Pdetail?id='+e.currentTarget.dataset.id,
		})
	},
})