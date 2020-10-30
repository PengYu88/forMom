tsc.supplyListCoal = {
		
	// 初始化
	init: function() {
		//初始化日历控件
		$('.datetimepicker').datetimepicker({
			format : 'YYYY-MM-DD'
		});

		// 初始化事件绑定
		tsc.supplyListCoal.event();
		
		//初始化分页
		tsc.supplyListCoal.doPage();
	},

	// 定义事件绑定	
	event: function() {
		
		// 查询按钮点击事件
		$("#queryBtn").on("click", tsc.supplyListCoal.doQuery);
		// 查询按钮点击事件
		
	},
	
	// 查询
	doQuery: function(page){
		
		if(page.type){
			page = 1;
		}
		
		var industryCode = $("#industryCode").val();
		var releaseTime = $("#releaseTime").val();
		var endTime = $("#endTime").val();
		var misdeedsDown = $("#misdeedsDown").val();
		var demandCode = $("#demandCode").val();
		
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;
		$.getJSON("/demand/coalList", {"industryCode":industryCode,"releaseTime":releaseTime,"endTime":endTime,"upDownCode":1,"misdeedsDown":misdeedsDown,"demandCode":1,"pageSize":pageSize,"currentResult":currentResult}, function(rs) {
			
			// 设置翻页总数
			$('#pager-1').bootpag({
				total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
				page: page
			});
			
			// 设置数据总条数
			$("#pager-total1").text(rs.total);
			
			// 循环遍历数据
			buildHtmlWithJsonArray('repeat1', rs.data, false, false);
            
	  	});
    },
	
	
	// 翻页
	doPage: function(page, total){

		$('#pager-1').bootpag({
			total: 1,
		    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
		    firstLastUse: true,
		    first: SYS_CONF.PAGE_FIRST,
	    	prev: SYS_CONF.PAGE_PREV,
		    next: SYS_CONF.PAGE_NEXT,
		    last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){
        	
        	// 查询
        	tsc.supplyListCoal.doQuery(num);
        });
	},
	
	// 翻页
	
	
	//删除供求
	doSdDelete: function(demandId){
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
				
		    	$.ajax({
		    		data: {"demandId": demandId},
		    		url: "/demand/updateCoal",
		    		type: "post",
					success: function(rs) {
						
					if(rs.info = "success"){
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
					tsc.supplyListCoal.doQuery(1);
	   					}
				});
			}
		});
	},
	
	//上架
	doSdUp: function(demandId){
		// 提交请求
		sweetAlert({
			title: '是否上架？',
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
		    		data: {"demandId": demandId,"MisdeedsDown": 0},
		    		url: "/demand/updateMisdeedsDown",
		    		type: "post",
					success: function(rs) {
						if(rs.info = "success"){
							// 提示上架成功
							sweetAlert({
								title: '上架成功！',
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
							
						} else {

							// 提示上架失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						tsc.supplyListCoal.doQuery(1);
					}

		    	});		
			}
		});
	},
	
	//下架
	doSdDown: function(demandId){
		// 提交请求
		sweetAlert({
			title: '是否下架？',
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
		    		data: {"demandId": demandId,"MisdeedsDown": 1},
		    		url: "/demand/updateMisdeedsDown",
		    		type: "post",
					success: function(rs) {
						if(rs.info = "success"){
							// 提示下架成功
							sweetAlert({
								title: '下架成功！',
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
							
						} else {

							// 提示下架失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						tsc.supplyListCoal.doQuery(1);
					}

		    	});		
			}
		});
	}
};

tsc.supplyListCoal.init();