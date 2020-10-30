

tsc.AuthList = {
		
		init: function() {
			// 初始化事件绑定
			tsc.AuthList.event();
			tsc.AuthList.doRoleQuery(1);
			
		},

		//定义事件绑定	
		event: function() {
				//角色操作
				$("#roleQueryBtn").on("click",tsc.AuthList.doRoleQuery);
				$("#roleAdd").on("click",tsc.AuthList.doRoleAdd);
				
				$("#user-manage").on("click", tsc.AuthList.doUserTab);
				$("#role-manage").on("click", tsc.AuthList.doRoleQuery);
				$("#orgn-manage").on("click",tsc.AuthList.doOrgTab);
				
		},
		
		doUserTab:function(){
			$(".page-content-body").load("/user/userList", null, null);
		},
		
		doOrgTab:function(){
			$(".page-content-body").load("/org/orgList", null, null);
		},
		
		//角色列表查询
		doRoleQuery: function(page){
			if(page == null || page.type){
				page = 1;
			}
			var roleName=$("#roleName").val();
			var deptId=$("#deptId").val();
			
			var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
			var pageSize=SYS_CONF.PAGE_SIZE;
			$.getJSON("/role/listData", {"roleName":roleName,"deptId":deptId,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
				tsc.AuthList.doRolePage(page, rs.total);
				// 循环遍历数据
				buildHtmlWithJsonArray('roleRepeat', rs.data, false, false);
		  });
		},
		
		//角色列表分页
		doRolePage: function(page, total){

			$('#role-pager').bootpag({
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
	        	tsc.AuthList.doRoleQuery(num);
	        });
		},
		
		doOrgQuery: function(page){
			if(page == null){
				page = 0;
			}
			$.getJSON("data/query_success.json", function(rs) {
				// 循环遍历数据
				buildHtmlWithJsonArray('orgRepeat', rs.data, false, false);
		  });
		},
		
		//新增角色 
		doRoleAdd: function(){
			$.ajax({
				url: "/role/roleAdd",
				type: "post",
				success: function(data){
					console.log(data)
					var dialog = bootbox.dialog({
						size: "large",
						title: "新增角色",
						message: data,
						buttons:{
							save:{
								label: SYS_MSG.BTN_SAVE,
							    className: "btn-success",
							    callback: function() {
							    	// 保存
							    	tsc.RoleEdit.doSave(function(rs){
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
											tsc.AuthList.doRoleQuery(1);
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
		
		doDelete: function(){
				alert("!!");
		},
};

//删除角色信息 by zhaorui
function doRoleDelete(roleId){
	// 提交请求
	sweetAlert({
		title: "是否要删除此角色",
		type: 'warning',
		showConfirmButton: true,
		showCancelButton: true,   
		confirmButtonText: SYS_MSG.BTN_CONFIRM,
		cancelButtonText: SYS_MSG.BTN_CANCEL,
		closeOnConfirm: false,
	},
	function(isConfirm){
		if (isConfirm) {
			$.getJSON("/role/deleteRole",{"roleId":roleId}, function(rs) {
				if(rs.code==0){
					sweetAlert({
						title: SYS_MSG.MSG_DEL_SUCCESS,
						text: SYS_MSG.MSG_AUOT_CLOSE,
						type: 'success',
						showConfirmButton: false,
						timer: SYS_CONF.ALERT_TIMER,
					});
				}else if(rs.code==-1){
					sweetAlert({
						title: "删除失败",
						text: "该角色已经绑定用户，无法删除。",
						type: 'error',
						showConfirmButton: true,
						confirmButtonText: SYS_MSG.BTN_CONFIRM,
						cancelButtonText: "确定",
						
					});
				}
				tsc.AuthList.doRoleQuery(1);
			});
				
			}
		}
	);
	
}

//编辑
function doRoleEdit(roleId){
	$.ajax({
		url: "/role/roleEdit",
		data:{"roleId":roleId},
		type:"post",
		success: function(data){
			var dialog = bootbox.dialog({
				size: "large",
				title: "编辑用户",
				message: data,
				buttons:{
					save:{
						label: SYS_MSG.BTN_SAVE,
					    className: "btn-success",
					    callback: function() {
					    	// 保存
					    	tsc.RoleEdit.doSave(function(rs){
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
									tsc.AuthList.doRoleQuery(1);
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
}
// 初始化
tsc.AuthList.init();