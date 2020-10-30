

tsc.orgList = {
		
		init: function() {
		
				// 初始化事件绑定
			tsc.orgList.event();
			tsc.orgList.doOrgQuery(1);
			tsc.orgList.doOrgPage();
		},

		//定义事件绑定	
		event: function() {
				
				//组织操作
				$("#orgQuery").on("click",tsc.orgList.doOrgQuery);
				$("#orgAdd").on("click",tsc.orgList.doOrgAdd);
				
				$("#user-manage").on("click", tsc.orgList.doUserTab);
				$("#role-manage").on("click", tsc.orgList.doRoleTab);
				$("#orgn-manage").on("click",tsc.orgList.doOrgQuery);
		},
		
		
		doUserTab:function(){
			$(".page-content-body").load("/user/userList", null, null);
		},
		doRoleTab:function(){
			$(".page-content-body").load("/role/roleList", null, null);
		},
		
		doOrgQuery: function(page){
			if(page.type){
				page = 1;
			}
			var name = $("input[name=name]").val();
			var createName = $("input[name=createName]").val();
			var currentResult = SYS_CONF.PAGE_SIZE*(page - 1);
			var pageSize = SYS_CONF.PAGE_SIZE;
			var json = {name : name, createName : createName, "currentResult" : currentResult, "pageSize" : pageSize};
			$.getJSON("org/findOrgList", json, function(rs) {
				
				// 设置翻页总数
				$('#org-pager').bootpag({
					total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
				});
				// 设置数据总条数
				$("#pager-total-org").text(rs.total);
				// 设置翻页
				//tsc.orgList.doOrgPage(page, rs.total);
				// 循环遍历数据
				var rowIndexOffset = currentResult;
				buildHtmlWithJsonArray('orgRepeat', rs.data, false, false, rowIndexOffset);
		  });
		},
		
		doOrgPage: function(page, total){

			$('#org-pager').bootpag({
				total: 1,
			    //page: page,
			    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			    leaps: false,
			    firstLastUse: true,
			    first: SYS_CONF.PAGE_FIRST,
		    	prev: SYS_CONF.PAGE_PREV,
			    next: SYS_CONF.PAGE_NEXT,
			    last: SYS_CONF.PAGE_LAST
	        }).on("page", function(event, num){
	        	
	        	// 查询
	        	tsc.orgList.doOrgQuery(num);
	        });
		},

		// 新增组织
		doOrgAdd: function(){	
			$.ajax({
				type: "post",
				url: "org/orgAdd",
				success: function(data){

					var dialog = bootbox.dialog({
						size: "large",
						title: "新增组织",
						message: data,
						buttons:{
							save:{
								label: SYS_MSG.BTN_SAVE,
							    className: "btn-success",
							    callback: function() {
							    	
							    	// 保存
							    	tsc.orgAdd.doSave(function(rs){
											
							    		if(rs.code == 0){
							    			
							    			// 提示保存成功
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_SUCCESS,
												text: SYS_MSG.MSG_AUOT_CLOSE,
												type: 'success',
												showConfirmButton: false,
												timer: SYS_CONF.ALERT_TIMER,
											});
											
											// 重新查询
											tsc.orgList.doOrgQuery(1);
											
											// 关闭对话框
											dialog.modal("hide");
							    		}else{
							    			// 提示保存失败
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_FAILED,
												text: "添加的部门已存在",
												type: 'error',
												showConfirmButton: false,
												timer: SYS_CONF.ALERT_TIMER,
											});
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
		
		
		
		
		
	
		
		doDelete: function(){
				alert("!!");
		},
};

//编辑组织
function doOrgEdit(departmentId, name){
		$.ajax({
			type: "post",
			data: {departmentId: departmentId, name: name},
			url: "org/orgEdit",
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "编辑组织",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.orgEdit.doSave(function(rs){				
						    		if(rs.code == 0){
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 重新查询
										tsc.orgList.doOrgQuery(1);
										
										// 关闭对话框
										dialog.modal("hide");
						    		}else{
						    			// 提示保存失败
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_FAILED,
											text: "修改的部门已存在",
											type: 'error',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
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
	
}
//停用与启用组织
function changeOrgStatus(departmentId, status){
	if(status == 1){
		status = 0;
		sweetAlert({
			title: "是否要停用此组织",
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true,   
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},
		function(isConfirm){
			if (isConfirm) {
				$.ajax({
					type: "post",
					data: {"departmentId" : departmentId, "status" : status},
					url: "org/changeStatus",
					success: function(data){
						// 提示停用成功
						sweetAlert({
							title: SYS_MSG.MSG_SHUTDOWN_SUCCESEE,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
						// 重新查询
						tsc.orgList.doOrgQuery(1);
					}
				});
			}
			}
		);
		
	}else{
		status = 1;
		sweetAlert({
			title: "是否要启用此组织",
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true,   
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},
		function(isConfirm){
			if (isConfirm) {
				$.ajax({
					type: "post",
					data: {"departmentId" : departmentId, "status" : status},
					url: "org/changeStatus",
					success: function(data){
						// 提示停用成功
						sweetAlert({
							title: SYS_MSG.MSG_SHUTUP_SUCCESEE,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
						// 重新查询
						tsc.orgList.doOrgQuery(1);
					}
				});
				}
			}
		);
	}
}
// 初始化
$(function(){
	tsc.orgList.init();
})
