tsc.CategoryList = {
		
	// 初始化
	init: function() {
		
		// 初始化事件绑定
		tsc.CategoryList.event();
	},

	// 定义事件绑定	
	event: function() {
		
		// 查询按钮点击事件
		$("#queryBtn").on("click", tsc.CategoryList.doQuery);
		
		// 新建按钮点击事件
		$("#addBtn").on("click", tsc.CategoryList.doAdd);
		
		// 修改按钮点击事件
		$("#doEdit").on("click", tsc.CategoryList.doEdit);
	},
	
	// 查询
	doQuery: function(){
		
		var platformId=$("#platformId").find("option:selected").attr("value");
		
		console.log(platformId);
		
		$.getJSON("/content/articleCategory/list",{"platformId":2}, function(rs) {
		
			// 循环遍历数据
			buildHtmlWithJsonArray('repeat', rs.data, false, false);
	  	});
	},
	
	// 新建
	doAdd: function(id){
		var platformId = $("#platformId").val();
		if(id.type){
			id = null;
		}
		
		$.ajax({
			url: "/content/articleCategory/categoryAdd",
			data: {
				platformId: platformId
			},
			success: function(data){

				var dialog = bootbox.dialog({
					size: "small",
					title: "新增文章分类",
					message: data,
					buttons: {
						save: {
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.CategoryAdd.doSave(function(rs){

						    		if(rs.code == "0"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 关闭对话框
										dialog.modal("hide");
						    		}
						    		// 重新查询
									tsc.CategoryList.doQuery();
						    	});
						    	return false;
						    }
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
						    className: "btn-default",
						}
					}
				});
			}
		});
	},
	
	doSaveSub:function(superiorId){
		
		//创建子分类，页面需要新建，跳页面方法需要新建
		$.ajax({
			url: "/content/articleCategory/categoryAddSub",
			data: {
				articleCategoryId: superiorId
			},
			success: function(data){

				var dialog = bootbox.dialog({
					size: "small",
					title: "新增文章分类",
					message: data,
					buttons: {
						save: {
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.CategoryAdd.doSave(function(rs){

						    		if(rs.code == "0"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 关闭对话框
										dialog.modal("hide");
						    		}
						    		// 重新查询
									tsc.CategoryList.doQuery();
						    	});
						    	return false;
						    }
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
						    className: "btn-default",
						}
					}
				});
			}
		});
	},
	
	// 编辑
	doEdit: function(articleCategoryId){
		
		$.ajax({
			url: "/content/articleCategory/categoryEdit",
			data: {articleCategoryId: articleCategoryId},
			success: function(data){

				var dialog = bootbox.dialog({
					size: "small",
					title: "编辑文章分类",
					message: data,
					buttons: {
						save: {
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.CategoryEdit.doEdit(function(rs){
										
						    		if(rs.code == "0"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 重新查询
										tsc.CategoryList.doQuery();

										// 关闭对话框
										dialog.modal("hide");
						    		}
						    	});
						    	return false;
						    }
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
						    className: "btn-default",
						}
					}
				});
			}
		});
	},

	
	// 删除
	doDelete: function(articleCategoryIds){
		
		// 提交请求
		sweetAlert({
			title: SYS_MSG.MSG_DEL_CONFIRM,
			type: 'info',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},

		function(isConfirm){
			if (isConfirm) {

				$.ajax({
					url: "/content/articleCategory/delete",
					data: {"articleCategoryIds":articleCategoryIds},
					dataType:"json",
					type: 'POST',
					success: function(rs){
						if(rs.code == "0"){
							
							// 提示删除成功
							sweetAlert({
								title: "删除成功！",
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});

						} else if(rs.code == "2"){
							
							// 提示删除成功
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});

						} else {

							// 提示删除失败
							sweetAlert({
								title: "删除失败！",
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}

						// 重新查询
						tsc.CategoryList.doQuery();
					}
				})
			}
		});
	}
};

$(function(){
	tsc.CategoryList.init();
});

