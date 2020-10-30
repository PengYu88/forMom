tsc.GoodsList = {
	init: function() {
		
		// 初始化事件绑定
		tsc.GoodsList.event();
		tsc.GoodsList.doQuery(1);
		var num = $("#num").val();
		$("#pager").pager({ pagenumber: 1, pagecount: num, buttonClickCallback:tsc.GoodsList.PageClick });
		$("#nowPage").val(1);
	},
	
	
	//定义绑定事件
	event: function() {
		
		// 新建按钮
		$("#addBtn").on("click", tsc.GoodsList.doAdd);

	},
	
	PageClick: function(pageclickednumber) {
		var num = $("#num").val();
        $("#pager").pager({ pagenumber: pageclickednumber, pagecount: num, buttonClickCallback: tsc.GoodsList.PageClick });
        tsc.GoodsList.doQuery(pageclickednumber);
        $("#nowPage").val(pageclickednumber);
    },
    
	// 查询
	doQuery: function(num){ 
		var goodsCode = $("#goodsCode").val();
		var goodsName = $("#goodsName").val();
		var factory = $("#factory").val();
		$.ajax({
			url: "fingGoodsByForm.action",
			type: "post",
			data: {"goodsCode":goodsCode,"goodsName":goodsName,"factory":factory,"num":num},
			success: function(data){
				tsc.GoodsList.doTable(data);
				$("#pager-total").text(data.sum);
				$("#num").val(data.num);
				$("#pager").pager({ pagenumber: num, pagecount: data.num, buttonClickCallback:tsc.GoodsList.PageClick });
			}
		});
	},
	
	//插入表格
	doTable:function(data){
		var list = data.itemsList;
		var outHtml="";
		for(i=0;i<list.length;i++){
		outHtml=outHtml+"<tr>";
		outHtml=outHtml+"<td>"+list[i].goodsCode+"</td>";
		outHtml=outHtml+"<td>"+list[i].goodsName+"</td>";
		outHtml=outHtml+"<td>"+list[i].goodsSpec+"</td>";
		outHtml=outHtml+"<td>"+list[i].factory+"</td>";
		outHtml=outHtml+"<td>"+list[i].goodsUnit+"</td>";
		outHtml=outHtml+"<td>"+list[i].price+"</td>";
		outHtml=outHtml+"<td>"+list[i].goodsRemark+"</td>";
		outHtml=outHtml+"<td><a id='editBtn' onclick='tsc.GoodsList.doEdit("+list[i].goodsId+")'>修改</a>&nbsp;"
						+"<a id='editBtn' onclick='tsc.GoodsList.doDelete("+list[i].goodsId+")'>删除</a></td>";
		outHtml=outHtml+"</tr>";
		}
		document.getElementById('tbody').innerHTML=outHtml; 
	},
	
	// 修改
	doEdit: function(id){	
		$.ajax({
			url: "editGoods.action",
			data: {"id":id},
			success: function(data){
				var dialog = bootbox.dialog({
					title: "修改商品信息",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.GoodsEdit.doUpdate(function(rs){

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
											tsc.GoodsList.doQuery(nowPage);
										
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
			title: '确定要删除该条商品信息吗？',
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true,   
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},
		function(isConfirm){
			if (isConfirm) {
				$.getJSON("doDelete.action",{"id":id},function(rs){
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
					tsc.GoodsList.doQuery(1);
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
											tsc.GoodsList.doQuery(1);
										
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
	tsc.GoodsList.init();
});