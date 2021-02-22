tsc.HistoryList = {
	init: function() {
		
		// 初始化事件绑定
		tsc.HistoryList.event();
		tsc.HistoryList.doQuery(1);
		var num = $("#num").val();
		$("#pager").pager({ pagenumber: 1, pagecount: num, buttonClickCallback:tsc.HistoryList.PageClick });
		$("#nowPage").val(1);
	},
	
	
	//定义绑定事件
	event: function() {
		
		// 新建按钮
		$("#addBtn").on("click", tsc.HistoryList.doAdd);

	},
	
	PageClick: function(pageclickednumber) {
		var num = $("#num").val();
        $("#pager").pager({ pagenumber: pageclickednumber, pagecount: num, buttonClickCallback: tsc.HistoryList.PageClick });
        tsc.HistoryList.doQuery(pageclickednumber);
        $("#nowPage").val(pageclickednumber);
    },
    
	// 查询
	doQuery: function(num){
		var orderDate = $("#orderDate").val();
		var clientName = $("#clientName").val();
		var orderNo = $("#orderNo").val();
		$.ajax({
			url: "queryHistoryOrderForm.action",
			type: "post",
			data: {"orderDate":orderDate,"orderNo":orderNo,"clientName":clientName,"num":num},
			success: function(data){
				tsc.HistoryList.doTable(data);
				$("#pager-total").text(data.sum);
				$("#num").val(data.num);
				$("#pager").pager({ pagenumber: num, pagecount: data.num, buttonClickCallback:tsc.HistoryList.PageClick });
			}
		});
	},
	
	//插入表格
	doTable:function(data){
		var list = data.itemsList;
		var outHtml="";
		for(i=0;i<list.length;i++){
		outHtml=outHtml+"<tr>";
		outHtml=outHtml+"<td>"+list[i].orderNo+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderClient+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderTime+"</td>";
		outHtml=outHtml+"<td>"+list[i].deliveryDate+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderSts+"</td>";
		outHtml=outHtml+"<td>"+list[i].price+"</td>";
		outHtml=outHtml+"<td><a id='editBtn' onclick='tsc.HistoryList.queryHistory("+list[i].orderNo+")'>查看详情</a>&nbsp;";
		outHtml=outHtml+"</tr>";
		}
		document.getElementById('tbody').innerHTML=outHtml; 
	},
	
		// 查看历史页面
	queryHistory: function(orderNo){
		$.ajax({
			url: "viewHistoryById.action",
			type: "post",
			data: {"orderNo":orderNo},
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: $("#orderNo").val(),
					message: data,
					buttons:{
						cancel:{
							label: SYS_MSG.BTN_CLOSE,
						    className: "btn-default",
						}
					}
				});
			}
		});
	},
	
	
	
	// 新建商品页面
	doAdd: function(){				
		$.ajax({
			url: "addGoods.action",
			success: function(data){

				var dialog = bootbox.dialog({
					title: "新增商品信息",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.GoodsEdit.doSave(function(rs){

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
											tsc.HistoryList.doQuery(1);
										
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
	tsc.HistoryList.init();
});