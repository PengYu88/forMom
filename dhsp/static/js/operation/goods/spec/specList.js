var maxPageNum = 1;
var selPageNum = 1;
var lastOne = 1;

tsc.SpecificationList = {
		
		init: function() {

			// 初始化事件绑定
			tsc.SpecificationList.event();
			tsc.SpecificationList.doPage();
			tsc.SpecificationList.doQuery(1);
	
		},

		//定义事件绑定	
		event: function() {
			//添加
			$("#addBtn").on("click",tsc.SpecificationList.doAdd);

			//查询
			$("#queryBtn").on("click",tsc.SpecificationList.doQuery);
		
		},
		
		doPage: function(){

			$('#attr-pager').bootpag({
				total: 1,
			    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			    firstLastUse: true,
			    first: SYS_CONF.PAGE_FIRST,
		    	prev: SYS_CONF.PAGE_PREV,
			    next: SYS_CONF.PAGE_NEXT,
			    last: SYS_CONF.PAGE_LAST
	        }).on("page", function(event, num){
	        	// 查询
	        	tsc.SpecificationList.doQuery(num);
	        });
		},
		
		// 新增
		doAdd: function(){
			$.ajax({
				url: "/operation/goods/spec/specAdd",
				type: 'POST',
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
							    	tsc.AddProductSpec.doSave(function(rs){
											
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
											if(lastOne == 0){
												tsc.SpecificationList.doQuery(maxPageNum+1);
											}else{
												tsc.SpecificationList.doQuery(maxPageNum);
											}

											// 关闭对话框
								        	dialog.modal("hide");
							    		}
							    		else{
											// 提示保存失败
											sweetAlert({
												title: rs.desc,
												text: SYS_MSG.MSG_AUOT_CLOSE,
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
				},
			});
		},		
	
		// 查询
		doQuery: function(page){
			if(page.type){
				page = 1;
			}
			var currentResult = SYS_CONF.PAGE_SIZE*(page-1);
			var pageSize = SYS_CONF.PAGE_SIZE;
			var attrType = $("#hiddenAttrType").val();
			var attrName = $("#searchName").val();
			
			$.ajax({
				url: "/operation/goods/spec/querySpecByPage",
				data:{attrType:attrType,attrDicName:attrName,currentResult:currentResult,pageSize:pageSize},
				type:'GET',
				dataType: 'json',
				success: function(rs){
				            $('#attr-pager').bootpag({
				                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
				                page:page
				            });
				            // 设置数据总条数
				            $("#pager-total").text(rs.total);
					// 循环遍历数据
				    selPageNum = page;
				    maxPageNum = Math.ceil(rs.total / SYS_CONF.PAGE_SIZE);
				    lastOne = rs.total % SYS_CONF.PAGE_SIZE;
					var rowIndexOffset = currentResult;
					buildHtmlWithJsonArray('SpecificationRepeat', rs.data, false, false ,rowIndexOffset);
				},
			});
				
		},
			
		//编辑规格
		doSpecEdit:function(attrDicId){
			$.ajax({
				url: "/operation/goods/spec/specEdit",
				data:{attrDicId:attrDicId},
				type: 'POST',
				success: function(data){
					var dialog = bootbox.dialog({
						size: "middle",
						title: "编辑规格",
						message: data,
						buttons:{
							save:{
								label: SYS_MSG.BTN_SAVE,
							    className: "btn-success",
							    callback: function() {
							    	
							    	// 保存
							    	tsc.EditProductSpec.doSave(function(rs){
											
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
								        	tsc.SpecificationList.doQuery(selPageNum);
											
											// 关闭对话框
											dialog.modal("hide");
							    		}
							    		else{
											// 提示修改失败
											sweetAlert({
												title: rs.desc,
												text: SYS_MSG.MSG_AUOT_CLOSE,
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
		
		//删除功能	
		doDelet: function(attrDicId){
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
						url: "/operation/goods/spec/deleteBySpecDicId",
						data:{attrDicId:attrDicId},
						type:'POST',
						dataType: 'json',
						success: function(rs){
							
							if(rs.code == "0"){
								// 提示删除成功
								sweetAlert({
									title: SYS_MSG.MSG_DEL_SUCCESS,
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'success',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
								
								//删除后重新查询
								if(lastOne == 1){
									tsc.SpecificationList.doQuery(selPageNum-1);
								}else{
									tsc.SpecificationList.doQuery(selPageNum);
								}
								
							} else {
								// 提示删除失败
								sweetAlert({
									title: rs.desc,
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'error',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
							}
						},
					});	
				}
			});
		},
}
// 初始化
$(function(){
    tsc.SpecificationList.init();
});