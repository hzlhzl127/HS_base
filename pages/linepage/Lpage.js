// pages/linepage/Lpage.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		arrayImg: [],
		id:'',
		back:'back-to',
		phoneNum:'',
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const db = wx.cloud.database();
		const lineC = db.collection('line');
		let id  = this.data.id;
		this.setData({
			id:options.id
		})
		let phoneNum = this.data.phoneNum
		console.log("拿到的id",id)
		lineC.doc(options.id).get().then(res => {
			console.log("景点详情活动", res);
			this.setData({
				lines: res.data,
				arrayImg: [res.data.img1, res.data.img2, res.data.img3],
				phoneNum:res.data.phone
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
    const urls = this.data.arrayImg.map(item => item);
    wx.previewImage({
      current: urls[index],
      urls: urls
    });
	},
	

	checked(){
		this.setData({
			back:'back-to-checked'
		})
	},

	collect() {

		let use = wx.getStorageSync('User')
		if(!use._id){
			wx.showToast({
				title: '请登录',
				icon:'error'
			})
			return;
		}

		let id = this.data.id;
		console.log('点击收藏拿到的id', id)
	
		const db = wx.cloud.database();
		const user = db.collection('use');
		user.doc(use._id).update({
			data: {
				myLine: db.command.push([id])
			}
		}).then(res => {
			console.log("景点详情活动", res);
			wx.showToast({
				title: '收藏成功',
			})
		}).catch(err => {
			console.log("添加数据失败，错误码：", err.errCode);
			console.log("错误信息：", err.errMsg);
		});

		this.setData({
			back:'back-to'
		})
	},

	phone(){
		let phoneNum = this.data.phoneNum
		wx.makePhoneCall({
			phoneNumber: phoneNum,
		})
	}
})