tsc.indexList = {

	init : function() {

		tsc.indexList.event();

		//初始化日历控件
		$('.datetimepicker').datetimepicker({
			format : 'YYYY-MM-DD'
		});

		//初始化页签
		tsc.indexList.doPage();
	},
	
	event : function() {

		// 新建按钮点击事件
		$("#addBtn").on("click", tsc.indexList.doAdd);

		//导入文件
		$("#importBtn").on("click", tsc.indexList.doImport);

		//查询
		$("#QueryBtn").on("click", tsc.indexList.doQuery);
	},

	// 查询
	doQuery: function(page){

		if(page.type){
			page = 1;
		}

		// 表单提交
		$('#-query-form').ajaxSubmit({
			target: '#-query-form',
			dataType: 'json',
			success: function(rs) {

				// 设置翻页总数
				$('#Qu_Pager').bootpag({
					total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
					page: page
				});

				// 设置数据总条数
				$("#pager-total").text(rs.total);

				// 循环遍历数据
				buildHtmlWithJsonArray('Qu_Repeat', rs.data, false, false);
			}
		});
	},

	// 翻页
	doPage: function(page, total){

		$('#Qu_Pager').bootpag({
			total: 1,
			maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			firstLastUse: true,
			first: SYS_CONF.PAGE_FIRST,
			prev: SYS_CONF.PAGE_PREV,
			next: SYS_CONF.PAGE_NEXT,
			last: SYS_CONF.PAGE_LAST
		}).on("page", function(event, num){

			// 查询
			tsc.indexList.doQuery(num);
		});
	},

	// 新增指数
	doAdd : function(){

		$.ajax({
			url: "/content/index/addIndex",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "新增",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.AddQuotation.doSave(function(rs){
										
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
										tsc.indexList.doQuery(1);

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

	//导入
	doImport: function () {

		$.ajax({
			url: "html/content/indexList/ImportQuotation.html",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "导入指数",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.ImportQuotation.doSave(function(rs){

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
										tsc.indexList.doQuery(1);

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


	// 查看详情
	doCheckOut : function(){

		$.ajax({
			url: "html/content/indexList/CheckOutQuotation.html",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "查看",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.CheckOutQuotation.doSave(function(rs){

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
										tsc.indexList.doQuery(1);

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

	// 编辑
	doEdit : function(){

		$.ajax({
			url: "html/content/indexList/QuotationEdit.html",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "编辑",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.QuotationEdit.doSave(function(rs){

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
										tsc.indexList.doQuery(1);

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

	//删除角色
	doDelet: function(){
		// 提交请求
		sweetAlert({
				title: SYS_MSG.MSG_DELETE_CONFIRM,
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
			function(isConfirm){
				if (isConfirm) {

					$.getJSON("data/operation_success.json", function(rs){

						if(rs.code == "0"){
							// 提示删除成功
							sweetAlert({
								title: SYS_MSG.MSG_DEL_SUCCESS,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});

						} else {

							// 提示删除失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}

						// 重新查询
						tsc.indexList.doQuery(1);
					});
				}
			});
	},

	//保存
	doDetailSave: function() {

			// 保存
			tsc.indexList.doSave(function(rs){

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
					tsc.indexList.doQuery(1);

				}
			});
			return false;
	},

};

tsc.indexList.init();