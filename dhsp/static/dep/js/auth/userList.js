
tsc.userList = {
		
		init: function() {
		
			// 初始化事件绑定
			tsc.userList.event();
			tsc.userList.doQuery(1);
		},

		//定义事件绑定	
		event: function() {
			
				//用户添加
				$("#userAdd").on("click", tsc.userList.doUserAdd);
				$("#userEdit").on("click", tsc.userList.doUserEdit);
				$("#queryBtn").on("click", tsc.userList.doQuery);
				
				
				$("#user-manage").on("click", tsc.userList.doQuery);
				$("#role-manage").on("click", tsc.userList.doRoleTab);
				$("#orgn-manage").on("click", tsc.userList.doOrgTab);
				
			
		},
		
		doOrgTab:function(){
			$(".page-content-body").load("/org/orgList", null, null);
		},
		doRoleTab:function(){
			$(".page-content-body").load("/role/roleList", null, null);
		},
		
		//用户查询
		doQuery: function(page){
			
			
			if(page.type){
				page = 1;
			}
			var account=$("#account").val();
			var name=$("#name").val();
			var industryId=$("#industryId").val();
			var industryname=$("#industryname").val();
			var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
			var pageSize=SYS_CONF.PAGE_SIZE;
			$.getJSON("/user/findUserList", {"account":account,"name":name,"industryId":industryId,"currentResult":currentResult,"pageSize":pageSize},function(rs){
			
				tsc.userList.doUserPage(page, rs.total);
				// 循环遍历数据
				buildHtmlWithJsonArray('userRepeat', rs.data, false, false);
			
		  });
		},
		
		// 翻页
		doUserPage: function(page, total){
            
			$('#user-pager').bootpag({
				total: Math.ceil(total / SYS_CONF.PAGE_SIZE),
			    page: page,
			    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			    leaps: false,
			    firstLastUse: true,
			    first: SYS_CONF.PAGE_FIRST,
		    	prev: SYS_CONF.PAGE_PREV,
			    next: SYS_CONF.PAGE_NEXT,
			    last: SYS_CONF.PAGE_LAST
	        }).on("page", function(event, num){
	        	// 查询
	        	
	        	tsc.userList.doQuery(num);
	        });
		},
	
		// 新增
		doUserAdd: function(){				
			$.ajax({
				url: "/user/userAdd",
				success: function(data){
					var dialog = bootbox.dialog({
						size: "large",
						title: "新增企业",
						message: data,
						buttons:{
							save:{
							
								label: SYS_MSG.BTN_SAVE,
							    className: "btn-success",
							    callback: function() {
							    	
							    	// 保存
							    	tsc.userAdd.doSave(function(rs){
							    	
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
											tsc.userList.doQuery(1);
											
											// 关闭对话框
											dialog.modal("hide");
							    		}
							    		else{
							    			
							    			// 提示保存失败
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_FAILED,
												text: "添加的账号已存在",
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

};
//停用信息 by zhangchao
function doUserStatus(userId,status){
	if(status==1)
		{
		 status=0;
			sweetAlert({
				title: "是否要停用此角色",
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,   
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
		function(isConfirm){
			if (isConfirm) {
				$.getJSON("/user/setStatus",{"userId":userId,"status":status}, function(rs) {
					
					if(rs.code == 0){
						sweetAlert({
							title: SYS_MSG.MSG_SHUTDOWN_SUCCESEE,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
					}
					else{
						sweetAlert({
							title: "停用失败",
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'error',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
					}
					tsc.userList.doQuery(1);
				});
					
				}
			}
		);
		}
	else{
		 status=1;
			sweetAlert({
				title: "是否要启用此角色",
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,   
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
		function(isConfirm){
			if (isConfirm) {
				$.getJSON("/user/setStatus",{"userId":userId,"status":status}, function(rs) {
					if(rs.code == 0){
						sweetAlert({
							title: SYS_MSG.MSG_SHUTUP_SUCCESEE,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
					}
					else{
						sweetAlert({
							title: "启用失败",
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'error',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
					}
					tsc.userList.doQuery(1);
				});
					
				}
			}
		);
	 }
	

}

//编辑 byzhangchao
function doUserEdit(userId){
	
$.ajax({
		data: {userId: userId},	
		url: "/user/userEdit",
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
					    	tsc.userEdit.doSave(function(rs){
					    		
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
									tsc.userList.doQuery(1);
									
									// 关闭对话框
									dialog.modal("hide");
					    		}
					    		else{
						    			// 提示保存失败
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_FAILED,
											text: "添加的账号已存在",
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


// 初始化
tsc.userList.init();