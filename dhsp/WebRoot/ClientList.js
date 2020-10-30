tsc.ClientList = {

	init: function() {
		 
		// 初始化事件绑定
		tsc.ClientList.event();
		tsc.ClientList.doQuery(1);
		var num = $("#num").val();
		$("#pager").pager({ pagenumber: 1, pagecount: num, buttonClickCallback:tsc.ClientList.PageClick });

	},

	//定义绑定事件
	event: function() {
		
		// 新建按钮
		$("#addBtn").on("click", tsc.ClientList.doAdd);
	},
	
	//翻页点击事件
	PageClick :  function(pageclickednumber) {
		var num = $("#num").val();
        $("#pager").pager({ pagenumber: pageclickednumber, pagecount: num, buttonClickCallback: tsc.ClientList.PageClick });
        tsc.ClientList.doQuery(pageclickednumber);
        $("#nowPage").val(pageclickednumber);
    },

	// 查询
	doQuery: function(num){ 
		var clientCode = $("#clientCode").val();
		var clientName = $("#clientName").val();
		$.ajax({
			url: "fingClientByForm.action",
			type: "post",
			data: {"clientCode":clientCode,"clientName":clientName,"num":num},
			success: function(data){ 
				tsc.ClientList.doTable(data);
				$("#num").val(data.num);
				$("#pager-total").text(data.sum);
				$("#pager").pager({ pagenumber: num, pagecount: data.num, buttonClickCallback: tsc.ClientList.PageClick });
			}
		});
	},
	
	//插入表格
	doTable:function(data){
		var list = data.itemsList;
		var outHtml="";
		for(i=0;i<list.length;i++){
		outHtml=outHtml+"<tr>";
		outHtml=outHtml+"<td>"+list[i].clientCode+"</td>";
		outHtml=outHtml+"<td>"+list[i].clientName+"</td>";
		outHtml=outHtml+"<td>"+list[i].clientAddress+"</td>";
		outHtml=outHtml+"<td>"+list[i].clientTelephone+"</td>";
		outHtml=outHtml+"<td><a id='editBtn' onclick='tsc.ClientList.doEdit("+list[i].clientId+")'>修改</a>&nbsp;"
						+"<a id='editBtn' onclick='tsc.ClientList.doDelete("+list[i].clientId+")'>删除</a></td>";
		outHtml=outHtml+"</tr>";
		}
		document.getElementById('tbody').innerHTML=outHtml; 
	},
	
	// 修改
	doEdit: function(id){	
		$.ajax({
			url: "editClient.action",
			data: {"id":id},
			success: function(data){
				var dialog = bootbox.dialog({
					title: "修改客户信息",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.ClientEdit.doUpdate(function(rs){

						    		if(rs.message == "success"){
						    			
						    			// 提示保存成功
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_SUCCESS,
												text: SYS_MSG.MSG_AUOT_CLOSE,
												type: 'success',
												showConfirmButton: false,
												timer: SYS_CONF.ALERT_TIMER,
											});
										
										// 重新查询
											var nowPage = $("#nowPage").val();
											tsc.ClientList.doQuery(nowPage);
										
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
	
	//删除
	doDelete: function(id){
		// 提交请求
		sweetAlert({
			title: '确定要删除该条客户信息吗？',
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true,   
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},
		function(isConfirm){
			if (isConfirm) {
				
				$.getJSON("doClientDelete.action", {"id":id},function(rs){
					
					if(rs.message == "success"){
						sweetAlert({
							title: '删除成功！',
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
						
					} else {
						sweetAlert({
							title: rs.desc,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
					}
					// 重新查询
					tsc.ClientList.doQuery(1);
				});
			}
		});
	},
	
	// 新建客户页面
	doAdd: function(){				
		$.ajax({
			url: "doAddClient.action",
			success: function(data){

				var dialog = bootbox.dialog({
					title: "新增客户信息",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.ClientEdit.doSave(function(rs){

						    		if(rs.message == "success"){
						    			
						    			// 提示保存成功
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_SUCCESS,
												text: SYS_MSG.MSG_AUOT_CLOSE,
												type: 'success',
												showConfirmButton: false,
												timer: SYS_CONF.ALERT_TIMER,
											});
										
										// 重新查询
											tsc.ClientList.doQuery(1);
										
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
}

$(function(){
	tsc.ClientList.init();
});