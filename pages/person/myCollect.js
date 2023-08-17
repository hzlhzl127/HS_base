// pages/person/myCollect.js
Page({

	data: {
		myLine:[],
		myCourse:[]
	},

	onLoad(options) {
		let user = wx.getStorageSync('User')
		const db = wx.cloud.database();
		const lineC = db.collection('line');
		const courseC = db.collection('course');
		const UserC = db.collection('use');
	

		UserC.where({
			_id:user._id
		}).get().then(res=>{
			this.setData({
				myLine:res.data[0].myLine,
				myCourse:res.data[0].myCourse
			})
			
			console.log("我得到的列表",this.data.myLine)


			lineC.where({
				_id: db.command.in(this.data.myLine)
			}).get().then(res=>{
				console.log("路线列表请求成功",res)
				this.setData({
					LineList:res.data
				});
				console.log("拿到的数据",res.data)
			}).catch(err=>{
				console.error(err);
			})

			courseC.where({
				_id:db.command.in(this.data.myCourse)
			}).get().then(res => {
				console.log("景点详情活动", res);
				this.setData({
					courseList: res.data,
				});
			}).catch(err => {
				console.log(err);
			});


		}).catch(err=>{
			console.error(err);
		})

	


	},

	LgoDetail:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../linepage/Lpage?id='+e.currentTarget.dataset.id,
		})
	},

	SgoDetail:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../coursepage/Cdetail?id='+e.currentTarget.dataset.id,
		})
	},
})