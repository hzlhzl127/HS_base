// pages/productpage/Pdetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		arrayImg: [],
		products: {
			student: [],
			star:[] // 保存学生图片链接的数组
    }
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const db = wx.cloud.database();
		const productC = db.collection('product');

		productC.doc(options.id).get().then(res => {
			console.log("景点详情活动", res);
			this.setData({
				products: res.data,
				arrayImg: [res.data.img1, res.data.img2, res.data.img3]
			});
	
			console.log(this.data.arrayImg); // 使用 this.data.arrayImg 而不是直接使用 arrayImg
		}).catch(err => {
			console.log(err);
		});
	},


	goScenicpage:function(){
		console.log("跳转启动")
		wx.navigateBack({
			delta: 1, // 返回的页面数，如果是1，则表示返回上一个页面
		});
	},

	previewImage: function (event) {
		const index = event.currentTarget.dataset.index;
    const urls = this.data.products.star
    wx.previewImage({
      current: urls[index],
      urls: urls
    });
	},
	

	preview: function (event) {
    const index = event.currentTarget.dataset.index;
    const urls = this.data.products.student;
    wx.previewImage({
      current: urls[index],
      urls: urls
    });
  }
})