tsc.ArticleList = {
		
	// 初始化
	init: function() {

		// 初始化事件绑定
		tsc.ArticleList.event();
		
		// 初始化翻页
		tsc.ArticleList.doPage();
	},

	// 定义事件绑定	
	event: function() {
		
		// 查询按钮点击事件
		$("#queryBtn").on("click", tsc.ArticleList.doQuery);
		
		// 新建按钮点击事件
		$("#addBtn").on("click", tsc.ArticleList.doAdd);
		
		// 编辑按钮点击事件
		$("#editBtn").on("click", tsc.ArticleList.doEdit);
		
		// 编辑按钮点击事件
		$("#platformId").on("change", tsc.ArticleList.doEdit);

	},

	// 查询
	doQuery: function(page){

		if(page.type){
			page = 1;
		}

		var platformId=$("#platformId").val();
		var name=$("#contentName").val();
		var articleCategoryId=$("#articleCategoryId").val();
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;
		
		$.getJSON("/content/article/list",{"platformId":platformId,"name":name,"articleCategoryId":articleCategoryId,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
			
			// 设置翻页总数
			$('#pager').bootpag({
				total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
				page: page
			});
			
			// 设置数据总条数
			$("#pager-total").text(rs.total);

			// 循环遍历数据
			buildHtmlWithJsonArray('repeat', rs.data, false, false);
		});
	},

	// 翻页
	doPage: function(){

		$('#pager').bootpag({
			total: 1,
			maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			firstLastUse: true,
			first: SYS_CONF.PAGE_FIRST,
			prev: SYS_CONF.PAGE_PREV,
			next: SYS_CONF.PAGE_NEXT,
			last: SYS_CONF.PAGE_LAST
		}).on("page", function(event, num){
			// 查询
			tsc.ArticleList.doQuery(num);
		});
	},
	
	// 新建
	doAdd: function(){
		
		var platformId=$("#platformId").find("option:selected").attr("value");
	
		$.ajax({
			data: {"platformId": platformId},	
			url: "content/article/articlesAdd",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "新增文章",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.ArticlesAdd.doSave(function(rs){
										
						    		if(rs.code = "1"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 重新查询
										tsc.ArticleList.doQuery(1);

										// 关闭对话框
										$(".bootbox").remove();
										$(".modal-backdrop").remove();
						    		}
						    	});
						    	return false;
						    }
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
						    className: "btn-default",
							callback: function() {
								
								// 关闭对话框
								$(".bootbox").remove();
								$(".modal-backdrop").remove();
							}
						}
					}
				});
			}
		});
	},

	// 编辑
	doEdit: function(articleContentId){
		var platformId=$("#platformId").find("option:selected").attr("value");
		$.ajax({
			data: {"articleContentId": articleContentId,"platformId": platformId},	
			url: "content/article/articlesEdit",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "编辑文章",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.ArticlesEdit.doSave(function(rs){

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
										tsc.ArticleList.doQuery(1);

										// 关闭对话框
										$(".bootbox").remove();
										$(".modal-backdrop").remove();
									}
								});
								return false;
							}
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
							callback: function() {
								
								// 关闭对话框
								$(".bootbox").remove();
								$(".modal-backdrop").remove();
							}
						}
					}
				});
			}
		});
	},

	//删除
	doDelete: function(articleContentId){
		
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
					url: "content/article/delete",
					data: {"articleContentId":articleContentId},
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
						tsc.ArticleList.doQuery(1);
					}
				})
			}
		});
	},

	//置顶
	doTop: function(articleContentId){
		
		// 提交请求
		sweetAlert({
			title: "是否置顶？",
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
					url: "content/article/update",
					data: {"articleContentId": articleContentId,"top": 1},
					dataType:"json",
					type: 'POST',
					success: function(rs){
						if(rs.code == "0"){
							
							// 提示置顶成功
							sweetAlert({
								title: "置顶成功！",
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});

						} else {

							// 提示删除失败
							sweetAlert({
								title: "置顶失败！",
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'error',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}

						// 重新查询
						tsc.ArticleList.doQuery(1);
					
					}
				})
			}
		});
	},

	//取消置顶
	doTopCanel: function(articleContentId){
		
		// 提交请求
		sweetAlert({
			title: "是否取消置顶？",
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
					url: "content/article/update",
					data: {"articleContentId": articleContentId,"top": 0},
					dataType:"json",
					type: 'POST',
					success: function(rs){
						if(rs.code == "0"){
							
							// 提示置顶成功
							sweetAlert({
								title: "取消置顶成功！",
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});

						} else {

							// 提示删除失败
							sweetAlert({
								title: "取消置顶失败！",
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'error',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}

						// 重新查询
						tsc.ArticleList.doQuery(1);
					
					}
				})
			}
		});
	},
	getCategory:function(){
		var platformId=$("#platformId").find("option:selected").attr("value");
		$.ajax({
			url: "/content/articleCategory/listByPlatform",
			data: {"platformId":platformId},
			dataType:"json",
			type: 'GET',
			success: function(rs){
				$( " #articleCategoryId").empty();
				$( " #articleCategoryId").prepend("<option value=''>请选择</option>");
				for(var i=0;i<rs.data.length;i++){
					$(" #articleCategoryId").append("<option value='" + rs.data[i].articleCategoryId + "' >" + rs.data[i].name + "</option>");
				};
			}
		});
	}

};


$(function(){
	tsc.ArticleList.init();
});