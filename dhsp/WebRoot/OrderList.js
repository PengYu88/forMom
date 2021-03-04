tsc.OrderList = {

	init: function() {
	
		var LODOP; //声明为全局变量
		
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
		}else if(deliveryMan=="空"){
			deliveryMan = "0"
		}else{
			deliveryMan = "3"
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
	
	

	doPrint: function(){
		window.open("print.jsp")
	},
	
	prn1_print: function() {
		var o = document.getElementById("printDiv");
		var h = o.offsetHeight; //高度
		//alert(h)
		if(h>4200){
			sweetAlert({
				title: '太长啦，少选几家吧！',
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'success',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return
		}
		tsc.OrderList.CreateOneFormPage();
		LODOP.SET_PRINT_PAGESIZE(3,2100,100,"");//这里3表示纵向打印且纸高“按内容的高度”；1385表示纸宽138.5mm；45表示页底空白4.5mm
		LODOP.PREVIEW();
		//LODOP.PRINT();  
	},
	
	CreateOneFormPage: function(){
		LODOP=getLodop();
		LODOP.ADD_PRINT_HTM(0,20,715,1000,document.getElementById("printDiv").innerHTML);
	},
	

	doPrintOrder: function(){
		var orderNoStr = "";
		var outHtml="";
		var checkednum = $("input:checked");
		   for ( var i = 0; i < checkednum.length; i++) {
			   if(checkednum[i].value!='on'){
			   	  orderNoStr = orderNoStr+checkednum[i].value + ","
			   }
   			}
   			$.ajax({
			url: "batchPrint.action",
			type: "post",
			data: {"orderNoStr":orderNoStr},
			success: function(data){
				console.log(data)
				for(var i=0;i<data.itemsList.length;i++){
					outHtml=outHtml+"<h1 align='center'>订 货 单</h1>";
					outHtml=outHtml+"<table style='width: 100%;'>";
					outHtml=outHtml+"<td width='15%'><label id='orderDate'>"+data.itemsList[i].deliveryDate+"</label></td>";
					outHtml=outHtml+"<td width='36%'>订货单位：<font id='name' size='4'>"+data.itemsList[i].orderClient+"</font></td>";
					outHtml=outHtml+"<td width='28%'>地址：<label id='adress'></label></td>";
					outHtml=outHtml+"<td width='21%'>电话：<label id='telephone'></label></td>";
					outHtml=outHtml+"</tr>";
					outHtml=outHtml+"</table>";
					outHtml=outHtml+"<table id='orderTable'  border='1' style='border:solid 1px black;border-collapse:collapse;width: 100%;'>";
					outHtml=outHtml+"<thead>";
					outHtml=outHtml+"<tr>";
					outHtml=outHtml+"<th width='6%' style='text-align: center;'>代码</th>";
					outHtml=outHtml+"<th width='19%' style='text-align: center;'>品名</th>";
					outHtml=outHtml+"<th width='8%' style='text-align: center;'>规格</th>";
					outHtml=outHtml+"<th width='15%' style='text-align: center;'>生产厂家</th>";
					outHtml=outHtml+"<th width='8%' style='text-align: center;'>单位</th>";
					outHtml=outHtml+"<th width='8%' style='text-align: center;'>数量</th>";
					outHtml=outHtml+"<th width='10%' style='text-align: center;'>单价</th>";
					outHtml=outHtml+"<th width='10%' style='text-align: center;'>金额</th>";
					outHtml=outHtml+"<th width='15%' style='text-align: center;'>备注</th>";
					outHtml=outHtml+"</tr>";
					outHtml=outHtml+"</thead>";
					outHtml=outHtml+"<tbody>";
					for(var j=0;j<data.itemsList[i].historyCostoms.length;j++){
						var obj = data.itemsList[i].historyCostoms[j];
						outHtml=outHtml + "<tr class='toAddClass' style='border:solid 1px black;text-align: center;'><td>"+obj.goodsCode+"</td><td>"+obj.goodsName+"</td><td>"+obj.goodsSpec+"</td><td>"+obj.goodsFactory+"</td><td>"+obj.goodsUnit+"</td><td>"+obj.goodsQuantity+"</td><td>"+obj.goodsPrice+"</td><td class='sum'>"+obj.goodsTotal+"</td><td>"+obj.goodsRemark+"</td></tr>"
					}
					outHtml=outHtml+"</tbody>";
					outHtml=outHtml+"</table>";
					outHtml=outHtml+"<table style='border:solid 1px black;border-collapse:collapse;width: 100%;'>";
					outHtml=outHtml+"<tr>";
					outHtml=outHtml+"<td width='75%'>货款总计（人民币）：大写：<span id='chineseTotal'>"+tsc.OrderList.fmoney2(data.itemsList[i].price)+"</span></td>";
					outHtml=outHtml+"<td width='25%' style='text-align: center;'>小写：<span id='total'>"+data.itemsList[i].price+"</span> 元</td>";
					outHtml=outHtml+"</tr>";
					outHtml=outHtml+"</table>";
					outHtml=outHtml+"<table style='width: 100%;'>";
					outHtml=outHtml+"<tr>";
					outHtml=outHtml+"<td width='50%'>供货单位：台安县大华食品批发部</td>";
					outHtml=outHtml+"<td width='25%' style='text-align: center;'>结算方式：__________</td>";
					outHtml=outHtml+"<td width='25%' style='text-align: center;'>收货人：___________</td>";
					outHtml=outHtml+"</tr>";
					outHtml=outHtml+"<tr>";
					outHtml=outHtml+"<td width='50%'>电话：0412-4848519&nbsp;&nbsp;&nbsp;&nbsp;0412-4824595</td>";
					outHtml=outHtml+"<td width='50%' colspan='2'>&nbsp;&nbsp;订单流水号：<font id='number'>"+data.itemsList[i].orderNo+"</font></td>";
					outHtml=outHtml+"</tr>";
					outHtml=outHtml+"</table>";
					outHtml=outHtml+"<hr>";
				}
				document.getElementById('printDiv').innerHTML=outHtml;
				tsc.OrderList.prn1_print()
			}
		});
	},
	
	getTdValue:function(){
		var tableId = document.getElementById("tab"); 
		var str = ""; 
		for(var i=1;i<tableId.rows.length;i++){ 
			var flag = tableId.rows[i].cells[7].innerHTML
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
	
	check:function(){
       var bool = $("#checkAll").is(":checked");//判断全选按钮是否为全选，true
        $(".check_cb").each(function(){//循环给复选框赋值
            this.checked = bool;
        });
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
		outHtml=outHtml+"<td><input name='orderList' type='checkbox' value="+list[i].orderNo+" class='check_cb'></td>";
		outHtml=outHtml+"<td>"+list[i].orderNo+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderClient+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderTime+"</td>";
		outHtml=outHtml+"<td>"+list[i].deliveryDate+"</td>";
		outHtml=outHtml+"<td>"+list[i].price+"</td>";
		outHtml=outHtml+"<td>"+deliceryMan+"</td>";
		outHtml=outHtml+"<td>"+list[i].orderSts+"</td>";
		outHtml=outHtml+"<td><a onclick='tsc.OrderList.doEdit("+list[i].orderId+")'>修改</a>&nbsp;"
						+"<a onclick='tsc.OrderList.doDelete("+list[i].orderId+")'>作废</a>&nbsp;<a onclick='tsc.OrderList.doDeduct("+list[i].orderId+")'>扣除</a>&nbsp;<a onclick='tsc.OrderList.doTotal("+list[i].orderId+")'>合计</a>&nbsp;<a onclick='tsc.OrderList.queryHistory("+list[i].orderId+")'>查看</a></td><td><a id='Btn1' class='btn btn-primary btn-sm' onclick='tsc.OrderList.updateOrderDeliveryMan(1,"+list[i].orderId+")'>董连双</a><a id='Btn2' class='btn btn-primary btn-sm' onclick='tsc.OrderList.updateOrderDeliveryMan(2,"+list[i].orderId+")'>韩友才</a></td>";
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
	
	
		// 数字转汉字
	fmoney2:function (money)   
	{   
		 var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
		  var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
		  var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
		  var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
		  var cnInteger = "整"; //整数金额时后面跟的字符
		  var cnIntLast = "元"; //整型完以后的单位
		  var maxNum = 999999999999999.9999; //最大处理的数字
		  var IntegerNum; //金额整数部分
		  var DecimalNum; //金额小数部分
		  var ChineseStr = ""; //输出的中文金额字符串
		  var parts; //分离金额后用的数组，预定义
		  if (money == "") {
		    return "";
		  }
		  money = parseFloat(money);
		  if (money >= maxNum) {
		    alert('超出最大处理数字');
		    return "";
		  }
		  if (money == 0) {
		    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
		    return ChineseStr;
		  }
		  money = money.toString(); //转换为字符串
		  if (money.indexOf(".") == -1) {
		    IntegerNum = money;
		    DecimalNum = '';
		  } else {
		    parts = money.split(".");
		    IntegerNum = parts[0];
		    DecimalNum = parts[1].substr(0, 4);
		  }
		  if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
		    var zeroCount = 0;
		    var IntLen = IntegerNum.length;
		    for (var i = 0; i < IntLen; i++) {
		      var n = IntegerNum.substr(i, 1);
		      var p = IntLen - i - 1;
		      var q = p / 4;
		      var m = p % 4;
		      if (n == "0") {
		        zeroCount++;
		      } else {
		        if (zeroCount > 0) {
		          ChineseStr += cnNums[0];
		        }
		        zeroCount = 0; //归零
		        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
		      }
		      if (m == 0 && zeroCount < 4) {
		        ChineseStr += cnIntUnits[q];
		      }
		    }
		    ChineseStr += cnIntLast;
		    //整型部分处理完毕
		  }
		  if (DecimalNum != '') { //小数部分
		    var decLen = DecimalNum.length;
		    for (var i = 0; i < decLen; i++) {
		      var n = DecimalNum.substr(i, 1);
		      if (n != '0') {
		        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
		      }
		    }
		  }
		  if (ChineseStr == '') {
		    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
		  } else if (DecimalNum == '') {
		    ChineseStr += cnInteger;
		  }
		  return ChineseStr;
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