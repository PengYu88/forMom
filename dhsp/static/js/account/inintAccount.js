tsc.inintAccount = {
		
	// 初始化
	init: function() {
		//初始化日历控件
		$('.datetimepicker').datetimepicker({
			format : 'YYYY-MM-DD hh:mm:ss'
		});
		// 初始化事件绑定
		tsc.inintAccount.event();
		// 初始化翻页
		tsc.inintAccount.doPage();
		tsc.inintAccount.doQuery(1);
	},

	// 定义事件绑定	
	event: function() {
		
		// 查询按钮点击事件
		$("#queryBtn").on("click", tsc.inintAccount.doQuery);
		 
	},
	
	// 查询
	doQuery: function(page){
		if(page.type){
			page = 1;
		}
		var mobileNo=$("#mobileNo").val();
		var beginRegisterTime=$("#beginRegisterTime").val();
		var endRegisterTime=$("#endRegisterTime").val();
		var realName=$("#realName").val();
		var companyName=$("#companyName").val();
		var dutyIdArray =[];    
		  $('input[name="dutyIdArray"]:checked').each(function(){    
			  dutyIdArray.push($(this).val()); 
		  });
		var status = $("#status").val();
		var dutyIdString = dutyIdArray.toString();
		var beginRegisterTimeString = beginRegisterTime.toString();
		var endRegisterTimeString = endRegisterTime.toString();
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;		
		$.getJSON("/account/findAccountList",{"endRegisterTimeString":endRegisterTimeString, "beginRegisterTimeString":beginRegisterTimeString , "dutyIdString":dutyIdString,"status":status,"mobileNo":mobileNo, "endRegisterTime":endRegisterTime,"beginRegisterTime":beginRegisterTime,"realName":realName,"companyName":companyName,"currentResult":currentResult,"pageSize":pageSize},function(rs) {
			
			// 设置翻页总数
			$('#role-account-pager').bootpag({
				total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
			});
			
			// 设置数据总条数
			$("#pager-total").text(rs.total);

			// 循环遍历数据
			buildHtmlWithJsonArray('repeat', rs.data, false, false);
	  	});
	},
	
	// 翻页
	doPage: function(page, total){

		$('#role-account-pager').bootpag({
			total: 1,
		    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
		    firstLastUse: true,
		    first: SYS_CONF.PAGE_FIRST,
	    	prev: SYS_CONF.PAGE_PREV,
		    next: SYS_CONF.PAGE_NEXT,
		    last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){
        	
        	// 查询
        	tsc.inintAccount.doQuery(num);
        });
	},
	 
	//冻结或解冻账号 
	doFreeze: function(status,userId){
		if(status==1){
			// 提交请求
			sweetAlert({
				title: '是否冻结',
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,   
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
			function(isConfirm){
				if (isConfirm) {
					status = 4;
					$.getJSON("/account/setStatus",{status:status,userId:userId}, function(rs){
						if(rs.code == 0){
							// 提示冻结成功
							sweetAlert({
								title: '冻结成功',
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						} else {
							// 提示冻结失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'error',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						// 重新查询
						tsc.inintAccount.doQuery(1);
						tsc.inintAccount.doPage();
					});
				}
			});
		}else{
			// 提交请求
			sweetAlert({
				title: '是否解冻',
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,   
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
			function(isConfirm){
				if (isConfirm) {
					 status = 1;
					$.getJSON("/account/setStatus", {status:status, userId:userId},function(rs){
						
						if(rs.code == 0){
							// 提示解冻成功
							sweetAlert({
								title: '解冻成功',
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						} else {
							// 提示解冻失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'error',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						// 重新查询
						tsc.inintAccount.doQuery(1);
						tsc.inintAccount.doPage();
					});
				}
			});
		}
	},
	
	//重置
	doReset: function(userId,mobileNo){
		// 提交请求
		sweetAlert({
			title: '确定将密码重置为123456吗？',
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true,   
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},
		function(isConfirm){
			if (isConfirm) {
				
				$.getJSON("/account/resetPassword",{userId:userId, mobileNo:mobileNo}, function(rs){
					
					if(rs.code == "0"){
						sweetAlert({
							title: '重置成功！',
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
						
					} else {
						sweetAlert({
							title: rs.desc,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'error',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
					}
					// 重新查询
					tsc.inintAccount.doQuery(1);
					tsc.inintAccount.doPage();
				});
			}
		});
	} 
};
tsc.inintAccount.init();