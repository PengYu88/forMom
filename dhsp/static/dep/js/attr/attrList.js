tsc.AttributeList = {
		
		init: function() {

			// 初始化事件绑定
			tsc.AttributeList.event();
			tsc.AttributeList.doQuery();
		},

		//定义事件绑定	
		event: function() {
			//添加
			$("#addBtn").on("click",tsc.AttributeList.doAdd);

			//查询
			$("#queryBtn").on("click",tsc.AttributeList.doQuery);
			
			
			
		},
		
		doPage: function(page, total){

			$('#attr-pager').bootpag({
				total: Math.ceil(total / SYS_CONF.PAGE_SIZE),
			    page: page,
			    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			    firstLastUse: true,
			    first: SYS_CONF.PAGE_FIRST,
		    	prev: SYS_CONF.PAGE_PREV,
			    next: SYS_CONF.PAGE_NEXT,
			    last: SYS_CONF.PAGE_LAST
	        }).on("page", function(event, num){
	        	// 查询
	        	tsc.AttributeList.doQuery(num);
	        });
		},
		
		// 新增
		doAdd: function(){				
			$.ajax({
				url: "/attr/attrAdd",
				success: function(data){

					var dialog = bootbox.dialog({
						size: "middle",
						title: "新增",
						message: data,
						buttons:{
							save:{
								label: SYS_MSG.BTN_SAVE,
							    className: "btn-success",
							    callback: function() {
							    	
							    	// 保存
							    	tsc.EditProductAttr.doSave(function(rs){
											
							    		if(rs.info = "success"){
							    			
							    			// 提示保存成功
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_SUCCESS,
												text: SYS_MSG.MSG_AUOT_CLOSE,
												type: 'success',
												showConfirmButton: false,
												timer: SYS_CONF.ALERT_TIMER,
											});
											
											// 重新查询
											tsc.AttributeList.doQuery();
											
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
	
		// 提交表单刷新页面
		doQuery: function(page){
			if(page == null){
				page = 0;
			}			
			$.getJSON("/attr/queryAttrByPage", function(rs) {
				
				tsc.AttributeList.doPage(page, rs.total);
				// 循环遍历数据
				buildHtmlWithJsonArray('AttributeRepeat', rs.data, false, false);
		  });
		},

		//编辑属性
		doAttrEdit:function(attrDicId){
			$.ajax({
				url: "/attr/attrEdit",
				data:{attrDicId:attrDicId},
				type: 'POST',
				success: function(data){
					var dialog = bootbox.dialog({
						size: "middle",
						title: "编辑属性",
						message: data,
						buttons:{
							save:{
								label: SYS_MSG.BTN_SAVE,
							    className: "btn-success",
							    callback: function() {
							    	
							    	// 保存
							    	tsc.EditProductAttr.doSave(function(rs){
											
							    		if(rs.info = "success"){
							    			
							    			// 提示保存成功
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_SUCCESS,
												text: SYS_MSG.MSG_AUOT_CLOSE,
												type: 'success',
												showConfirmButton: false,
												timer: SYS_CONF.ALERT_TIMER,
											});
											
											// 重新查询
											tsc.AttributeList.doQuery();
											
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
		
		//删除功能
		doDelet: function(){
			// 提交请求
			sweetAlert({
				title: SYS_MSG.MSG_DEL_CONFIRM,
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
						
						if(rs.code == "1"){
							// 提示取消成功
							sweetAlert({
								title: SYS_MSG.MSG_DEL_SUCCESS,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
							
						} else {

							// 提示取消失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						
						// 重新查询
						tsc.AttributeList.doQuery(1);
					});					
				}
			});
		}		
};
// 初始化
tsc.AttributeList.init();