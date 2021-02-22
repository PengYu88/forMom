tsc.OrderList = {

	init: function() {
		
		// 初始化事件绑定
		tsc.OrderList.event();
		$("#delivery").text("全部");
        //初始化日历控件
		$('#datetimepicker1').datetimepicker({
			timepicker:false,
			format:'Y-m-d'
		});
		
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var date = date.getDate();
		var nowDate = year+"-"+month+"-"+date
		$("#datetimepicker1").val(nowDate);
		
		var deliveryDate = $("#datetimepicker1").val();
		$("#dataLabel").text(deliveryDate);
		
	},

	//定义绑定事件
	event: function() {
		// 查询按钮
		$("#queryBtn").on("click", tsc.OrderList.doQuery);
		
		tsc.OrderList.getTdValue();
		
		// 新建按钮
		$("#addBtn").on("click", tsc.OrderList.doAdd);
		

	},

	// 查询
	doQuery: function(){
		var deliveryMan = $("#deliveryMan").val();
		var deliveryDate = $("#datetimepicker1").val();
		$("#delivery").text(deliveryMan);
		$("#dataLabel").text(deliveryDate);
		if(deliveryMan=="董连双"){
			deliveryMan = "1"
		}else if(deliveryMan=="韩友才"){
			deliveryMan = "2"
		}else{
			deliveryMan = ""
		}
		$.ajax({
			url: "queryOrderByForm.action",
			type: "post",
			data: {"deliveryMan":deliveryMan,"deliveryDate":deliveryDate},
			success: function(data){ 
				tsc.OrderList.doTable(data);
				$("#sumArea").text(data.sum);
				$("#inventorySumArea").text(data.inventorySum);
				$("#nowDate").text(data.nowDate);
				tsc.OrderList.getTdValue();
			}
		});
	},
	
	
		// 查询
	doPrint: function(){
		window.open("print.jsp")
	},
	
	getTdValue:function(){
		var tableId = document.getElementById("tab"); 
		var str = ""; 
		for(var i=1;i<tableId.rows.length;i++){ 
			var flag = tableId.rows[i].cells[6].innerHTML
			if(flag=='已合计'){
			}else{
				tableId.rows[i].cells[0].style.color = 'red';
				tableId.rows[i].cells[1].style.color = 'red';
				tableId.rows[i].cells[2].style.color = 'red';
				tableId.rows[i].cells[3].style.color = 'red';
				tableId.rows[i].cells[4].style.color = 'red';
			}
		} 
	},
	
	//插入表格
	doTable:function(data){
		var list = data.itemsList;
		var outHtml="";
		for(i=0;i<list.length;i++){
		var deliceryMan = "";
		if(list[i].deliveryMan==1){
			deliceryMan = "董连双"
		}else if(list[i].deliveryMan==2){
			deliceryMan = "韩友才"
		}else{
			deliceryMan = ""
		}
		outHtml=outHtml+"<tr>";
		outHtml=outHtml+"<td>"+list[i].orderNo+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderClient+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderTime+"</td>";
		outHtml=outHtml+"<td>"+list[i].deliveryDate+"</td>";
		outHtml=outHtml+"<td>"+list[i].price+"</td>";
		outHtml=outHtml+"<td>"+deliceryMan+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderSts+"</td>";
		outHtml=outHtml+"<td><a onclick='tsc.OrderList.doEdit("+list[i].orderId+")'>修改</a>&nbsp;"
						+"<a onclick='tsc.OrderList.doDelete("+list[i].orderId+")'>作废</a>&nbsp;<a onclick='tsc.OrderList.doDeduct("+list[i].orderId+")'>扣除</a>&nbsp;<a onclick='tsc.OrderList.doTotal("+list[i].orderId+")'>合计</a>&nbsp;<a onclick='tsc.OrderList.queryHistory("+list[i].orderId+")'>查看</a></td><td><a id='Btn1' class='btn btn-primary btn-sm' onclick='tsc.OrderList.updateOrderDeliveryMan(1,"+list[i].orderId+")'>董连双</a><a id='Btn2' class='btn btn-primary btn-sm' onclick='tsc.OrderList.updateOrderDeliveryMan(2,"+list[i].orderId+")'>韩友才</a></td>";
		outHtml=outHtml+"</tr>";
		}
		document.getElementById('tbody').innerHTML=outHtml; 
	},
	
	// 修改
	doEdit: function(id){	
		$.ajax({
			url: "editOrder.action",
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
						    	tsc.OrderEdit.doUpdate(function(rs){

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
											tsc.OrderList.doQuery();
										
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
	
	
	doView: function(id){	
		$.ajax({
			url: "viewHistoryById.action",
			type: "post",
			data: {"orderId":id},
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: $("#clientSearch").val(),
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
 
	//删除
	doDelete: function(id){
		// 提交请求
		sweetAlert({
			title: '确定要作废该条订单信息吗？',
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true,   
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},
		function(isConfirm){
			if (isConfirm) {
				$.getJSON("doDeleteOrder.action",{"id":id},function(rs){
					if(rs.message == "success"){
						sweetAlert({
							title: '作废成功！',
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
					tsc.OrderList.doQuery();
				});
			}
		});
	},	
	
	reEdit:function(id){
		window.open("http://localhost:8080/dhsp/main.jsp#")
	},
	
	//扣除订单
	doDeduct:function(id){
		$.getJSON("doDeductOrder.action",{"id":id},function(rs){
			tsc.OrderList.doQuery();
			sweetAlert({
				title: '扣除成功，该订单将不参与盘点！',
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'success',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
		});
	},
	
	//合计订单
	doTotal:function(id){
		$.getJSON("doTotalOrder.action",{"id":id},function(rs){
			tsc.OrderList.doQuery();
			sweetAlert({
				title: '合计成功，该订单将参与盘点！',
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'success',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
		});
	},
	
	//合计订单
	updateOrderDeliveryMan:function(deliveryMan,id){
		$.getJSON("updateOrderDeliveryMan.action",{"deliveryMan":encodeURI(deliveryMan,"utf-8"),"orderId":id},function(rs){
			tsc.OrderList.doQuery();
		});
	},
	
	// 新建订单页面
	doAdd: function(){				
		$.ajax({
			url: "addOrder.action",
			success: function(data){
				var dialog = bootbox.dialog({
					title: "新增订单信息",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.OrderEdit.doSave(function(rs){

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
											tsc.OrderList.doQuery();
										
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
	tsc.OrderList.init();
});