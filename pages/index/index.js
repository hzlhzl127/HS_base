// index.js
Page({

	data:{
		Sname1:'sort-name-checked',
		Sname2:'sort-name',
		Sname3:'sort-name',
		Sname4:'sort-name',
		show1:true,
		show2:false,
		show3:false,
		show4:false,
		tabar1:'/image/主页 (1).png',
		tabar2:'/image/个人中心.png',
	},

	onShow(){
		const db = wx.cloud.database();
		const scenicCollection = db.collection('scenic');
		const courseC = db.collection('course');
		const lineC = db.collection('line');
		const productC = db.collection('product')
		const newsC = db.collection('news')

		scenicCollection.get().then(res=>{
			console.log("景点列表请求成功",res)
			this.setData({
				scenicList:res.data
			});
		}).catch(err=>{
			console.error(err);
		})

		courseC.limit(4).get().then(res=>{
			console.log("课程列表请求成功",res)
			this.setData({
				courseList:res.data
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

		productC.limit(4).get().then(res=>{
			console.log("文创列表请求成功",res)
			this.setData({
				productList:res.data
			});
		}).catch(err=>{
			console.error(err);
		})

		newsC.limit(4).get().then(res=>{
			console.log("新闻列表请求成功",res)
			this.setData({
				newsList:res.data
			});
		}).catch(err=>{
			console.error(err);
		})


	},

	SnameCheck:function(event){
		this.setData({
			['Sname1']:'sort-name',
			['Sname2']:'sort-name',
			['Sname3']:'sort-name',
			['Sname4']:'sort-name',
		});
		const Id = event.currentTarget.id;
		this.setData({
			['Sname'+Id]:'sort-name-checked',
		});
		this.setData({
			show1:false,
			show2:false,
			show3:false,
			show4:false,
		});
		this.setData({
			['show'+Id]:true,
		});
		
	},

	goLinepage:function(){
		console.log("跳转启动")
		wx.navigateTo({
			url: '../linepage/linepage',
		});
	},

	goScenicpage:function(){
		console.log("跳转启动")
		wx.navigateTo({
			url: '../scenicpage/scenicpage',
		});
	},

	goCoursepage:function(){
		console.log("跳转启动")
		wx.navigateTo({
			url: '../coursepage/coursepage',
		});
	},

	goProductpage:function(){
		console.log("跳转启动")
		wx.navigateTo({
			url: '../productpage/productpage',
		});
	},

	goDetailS:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../scenicpage/Sdetail?id='+e.currentTarget.dataset.id,
		})
	},

	goDetailC:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../coursepage/Cdetail?id='+e.currentTarget.dataset.id,
		})
	},

	goDetailL:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../linepage/Lpage?id='+e.currentTarget.dataset.id,
		})
	},

	goDetailP:function(e){
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
		wx.navigateTo({
			url: '../productpage/Pdetail?id='+e.currentTarget.dataset.id,
		})
	},

	tabar:function (event) {
		const buttonId = event.currentTarget.id;
		if(buttonId==2){
			this.setData({
				tabar2:'/image/个人中心 (1).png',
				tabar1:'/image/主页.png'
			});
			wx.redirectTo({
				url: '../person/person',
			})
		}
		console.log(buttonId);
	},

});
