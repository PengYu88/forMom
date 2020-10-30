tsc.ReceiptList = {
	
	//初始化方法
	init: function() {
		 
		// 初始化事件绑定
		tsc.ReceiptList.event();
		
		// 获取当前系统日期作为订单日期
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var date = date.getDate();
		var nowDate = year+"-"+month+"-"+date
		//$("#orderDate").text(nowDate);
		
		var curDate = new Date();
		var startDate=new Date(curDate.setDate(curDate.getDate()+1)); 
		
		var nextyear = startDate.getFullYear();
		var nextmonth = startDate.getMonth() + 1;
		var nextdate = startDate.getDate();
		var nextnowDate = nextyear+"-"+nextmonth+"-"+nextdate;
		//$("#orderDate").text(nextnowDate);

		
		$.ajax({
			url: "findDeliveryStyle.action",
			type: "post",
			success: function(data){
				if(data.deliveryStyle=='today'){
					$("#orderDate").text(nowDate);
					$("#todayDelivery").attr('checked',true); 
					$("#deliveryLabel").css('color','red'); 
					$("#deliveryLabel").text("注意：配送日期为今天");
				}else{
					$("#orderDate").text(nextnowDate);
					$("#tomorrowDelivery").attr('checked',true); 
					$("#deliveryLabel").css('color','blue'); 
					$("#deliveryLabel").text("注意：配送日期为明天");
				}
			}
		});
	},

	//定义绑定事件
	event: function() {
		
		// 插入按钮初始化绑定事件
		$("#addBtn").on("click", tsc.ReceiptList.doAdd);
		
		// 历史按钮
		$("#historyBtn").on("click", tsc.ReceiptList.queryHistory);
		
		// 初始化表单验证
		tsc.ReceiptList.validate();
		
		// 在客户代码文本框敲回车键客户名称文本框获取焦点
		$("#clientCode").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#clientName")[0].focus();
	           }  
	      });
		
		// 在客户名称文本框敲回车键客户地址文本框获取焦点
		$("#clientName").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#clientAddress")[0].focus();
	           }  
	      });
		
		// 在客户地址文本框敲回车键客户电话文本框获取焦点
		$("#clientAddress").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#clientTelephone")[0].focus();
	           }  
	      });
		
		// 在客户电话文本框敲回车键商品代码文本框获取焦点
		$("#clientTelephone").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#goodsCode")[0].focus();
	           }  
	      });
		
//		// 在商品代码文本框敲回车键商品名称文本框获取焦点
//		$("#goodsCode").keydown(function(e) {  
//	           if (e.keyCode == 13) {  
//	        	   $("#goodsName")[0].focus();
//	           }  
//	      });
		
		// 在商品名称文本框敲回车键商品规格文本框获取焦点
//		$("#goodsName").keydown(function(e) {  
//	           if (e.keyCode == 13) {  
//	        	   $("#goodsSpec")[0].focus();
//	           }  
//	      });
		
		// 在商品规格文本框敲回车键生产厂家文本框获取焦点
		$("#goodsSpec").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#factory")[0].focus();
	           }  
	      });
		
		// 在生产厂家文本框敲回车键商品单位文本框获取焦点
		$("#factory").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#goodsUnit")[0].focus();
	           }  
	      });
		
		// 在商品单价文本框敲回车键订货数量文本框获取焦点
		$("#goodsUnit").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#goodsPrice")[0].focus();
	           }  
	      });
		
		// 在商品单价文本框敲回车键订货数量文本框获取焦点
		$("#goodsPrice").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#amount")[0].focus();
	           }  
	      });
		
		// 在订货数量文本框敲回车键备注文本框获取焦点
		$("#amount").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#remark")[0].focus();
	           }  
	      });
		
		// 在备注文本框敲回车键调用插入方法
		$("#remark").keydown(function(e) {  
	           if (e.keyCode == 13) {  
	        	   $("#goodsCode")[0].focus();
	        	   tsc.ReceiptList.doAdd();
	           }  
	      });

	},
	
	//表单验证
	validate: function(){
		$("#receipt-query-form").validate({
			ignore: ".ignore",
			rules: {
				amount: {
					isAmount: true,
					required: true
				},
				goodsPrice: {
					isMoney: true,
					required: true
				}
			},
		});			
	},
	
	//商品信息查询
	doGoodsQueryForCode: function(){ 
		var goodsCode = $("#goodsCode").val()
		$.ajax({
			url: "queryGoodsForReceipt.action",
			type: "post",
			data: {"goodsCode":goodsCode},
			success: function(data){
				if(data.itemsList[0]==null){
					return
				}
//				if(data.itemsList[0]==null){
//					sweetAlert({
//						title: "无此商品，请重新输入！",
//						text: SYS_MSG.MSG_AUOT_CLOSE,
//						type: 'warning',
//						showConfirmButton: false,
//						timer: SYS_CONF.ALERT_TIMER,
//					});
//					$("#goodsCode").val("");
//				}
				$("#goodsCode").val(data.itemsList[0].goodsCode);
				$("#goodsName").val(data.itemsList[0].goodsName);
				$("#goodsSpec").val(data.itemsList[0].goodsSpec);
				$("#factory").val(data.itemsList[0].factory);
				$("#goodsUnit").val(data.itemsList[0].goodsUnit);
				$("#goodsPrice").val(data.itemsList[0].price.replace(/,/g, ""));
				$("#remark").val(data.itemsList[0].goodsRemark);
			}
		});
	},
	
	
	changeDelivery: function(method){
		
		// 获取当前系统日期作为订单日期
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var date = date.getDate();
		var nowDate = year+"-"+month+"-"+date
		//$("#orderDate").text(nowDate);
		
		var curDate = new Date();
		var startDate=new Date(curDate.setDate(curDate.getDate()+1)); 
		
		var nextyear = startDate.getFullYear();
		var nextmonth = startDate.getMonth() + 1;
		var nextdate = startDate.getDate();
		var nextnowDate = nextyear+"-"+nextmonth+"-"+nextdate;
		
		if(method=='today'){
			$("#orderDate").text(nowDate);
			$("#deliveryLabel").text("注意：配送日期为今天");
			$("#deliveryLabel").css('color','red'); 
		}else{
			$("#orderDate").text(nextnowDate);
			$("#deliveryLabel").text("注意：配送日期为明天");
			$("#deliveryLabel").css('color','blue'); 
		}
		
		$.ajax({
			url: "updateDeliveryStyle.action",
			type: "post",
			data: {"method":method},
			success: function(data){
			}
		});
	},
	
	//商品信息查询
	doGoodsQueryForName: function(){ 
		var goodsName = $("#goodsName").val();
		var clientSearch = $("#clientSearch").val();
		$.ajax({
			url: "queryGoodsForReceipt.action",
			type: "post",
			data: {"goodsName":goodsName,"clientSearch":clientSearch},
			success: function(data){
				if(data.itemsList[0]==null){
					return
				}
//				if(data.itemsList[0]==null){
//					sweetAlert({
//						title: "无此商品，请重新输入！",
//						text: SYS_MSG.MSG_AUOT_CLOSE,
//						type: 'warning',
//						showConfirmButton: false,
//						timer: SYS_CONF.ALERT_TIMER,
//					});
//					$("#goodsCode").val("");
//				}
				$("#goodsCode").val(data.itemsList[0].goodsCode);
				$("#goodsName").val(data.itemsList[0].goodsName);
				$("#goodsSpec").val(data.itemsList[0].goodsSpec);
				$("#factory").val(data.itemsList[0].factory);
				$("#goodsUnit").val(data.itemsList[0].goodsUnit);
				$("#goodsPrice").val(data.itemsList[0].price.replace(/,/g, ""));
				$("#remark").val(data.itemsList[0].goodsRemark);
				$("#amount")[0].focus();
			}
		});
	},
	
	
	doCopy: function(){
		var demo1 = $("#demo1").val();
		$("#demo2").val("建平");
	},
	
	
	//客户信息查询
	doClientQuery: function(){
		var clientName = $("#clientSearch").val();
		if(clientName==undefined){
			return
		}
		$.ajax({
			url: "queryClientForReceipt.action",
			type: "post",
			data: {"clientName":clientName},
			success: function(data){
				if(data.itemsList[0]==null){
					sweetAlert({
						title: "无此客户，请重新输入！",
						text: SYS_MSG.MSG_AUOT_CLOSE,
						type: 'warning',
						showConfirmButton: false,
						timer: SYS_CONF.ALERT_TIMER,
					});
				}
				$("#clientName").val(data.itemsList[0].clientName);
				$("#clientAddress").val(data.itemsList[0].clientAddress);
				$("#clientTelephone").val(data.itemsList[0].clientTelephone);
				$("#logisticsArrival").val(data.itemsList[0].logisticsArrival);
				$("#district").val(data.itemsList[0].district);
				$("#pickupAdress").val(data.itemsList[0].pickupAdress);
				$("#goodsName")[0].focus();
			}
		});
	},
	
	//计算
	doCompute: function(){
		// 表单验证
		if(!$("#receipt-query-form").valid()){
			$("#sum").val("0.00");
			return false;
		}
		var goodsName = $("#goodsName").val();
		var goodsSpec = $("#goodsSpec").val();
		var goodsPrice = $("#goodsPrice").val().replace(/,/g, "");
		var amount = $("#amount").val();
		$("#sum").val(tsc.ReceiptList.fmoney(goodsPrice*amount,2));
	},
	
	//自动生成订单流水号
	doRunningNum:function(){
		var todayDate=new Date();
		var year=todayDate.getFullYear();
		var date=todayDate.getDate();
		if(date<10){
			date = "0" + date;
		}
		var month=todayDate.getMonth()+1;
		if(month<10){
			month = "0" + month;
		}
		var hour=todayDate.getHours();
		if(hour<10){
			hour = "0" + hour;
		}
		var mininutes=todayDate.getMinutes();
		if(mininutes<10){
			mininutes = "0" + mininutes;
		}
		var seconds=todayDate.getSeconds();
		if(seconds<10){
			seconds = "0" + seconds;
		}
		var ran=Math.round((Math.random())*10000);
		if(ran<1000){
			ran = "0"+ran;
		}
		var runningNum = ""+year+""+""+month+""+""+date+""+""+""+hour+""+""+mininutes+""+""+seconds+""+""+ran;
		return runningNum;
	},
	
	// 插入
	doAdd: function(){
		// 表单验证
		if(!$("#receipt-query-form").valid()){
			$("#sum").val("0.00");
			return false;
		}
		$("#name").text($("#clientName").val());
		$("#arrival").text($("#logisticsArrival").val());
		$("#area").text($("#district").val());
		$("#consignee").text($("#clientName").val());
		$("#telephone").text($("#clientTelephone").val());
		$("#adress").text($("#clientAddress").val());
		$("#pickup").text($("#pickupAdress").val());
		var goodsCode = $("#goodsCode").val();
		var goodsName = $("#goodsName").val();
		var goodsUnit = $("#goodsUnit").val();
		var goodsSpec = $("#goodsSpec").val();
		var goodsPrice = $("#goodsPrice").val();
		var factory = $("#factory").val();
		var amount = $("#amount").val();
		var remark = $("#remark").val();
		$("#sum").val(tsc.ReceiptList.fmoney(goodsPrice*amount,2));
		var sum = $("#sum").val();
		$("#orderTable tbody").append('<tr class="toAddClass" style="border:solid 1px black;text-align: center;"><td>'+goodsCode+'</td><td>'+goodsName+'</td><td>'+goodsSpec+'</td><td>'+factory+'</td><td>'+goodsUnit+'</td><td>'+amount+'</td><td>'+goodsPrice+'</td><td class="sum">'+sum+'</td><td>'+remark+'</td></tr>');
		$(".toAddClass").on("dblclick", tsc.ReceiptList.doDelete);
		var total = 0 
		$('#orderTable tr').each(function(){ 
			$(this).find('td:eq(7)').each(function(){ 
				total += parseFloat($(this).text().replace(/,/g, "")); 
			}); 
		});
		var total2 = tsc.ReceiptList.fmoney(total,2).replace(/,/g, "");
		
		var amountTotal = 0
		$('#orderTable tr').each(function(){ 
			$(this).find('td:eq(5)').each(function(){ 
				amountTotal += parseInt($(this).text().replace(/,/g, "")); 
			}); 
		});
		$("#total").text(tsc.ReceiptList.fmoney(total,2));
		
		$("#amountTotal").text(amountTotal);
		$("#chineseTotal").text(tsc.ReceiptList.fmoney2(parseFloat(total2)));
		$("#goodsCode").val("");
		$("#goodsName").val("");
		$("#goodsSpec").val("");
		$("#factory").val("");
		$("#goodsUnit").val("");
		$("#goodsPrice").val("");
		$("#amount").val("");
		$("#sum").val("");
		$("#remark").val("");
		
		$("#goodsName")[0].focus();
	},
	
	//生成订单信息传入后台
	doInsert: function(){
		var orderNo = $("#number").text();
		var deliverDate = $("#orderDate").text();
		var orderClient = $("#name").text();
		var consignee = $("#consignee").text();
		var ordreSum = $("#total").text().replace(/,/g, "");
		// 提交
		$.ajax({ 
			url: "doAddOrder.action",
			type: "post",
			data: {
				"orderNo":orderNo,
				"orderClient":orderClient,
				"ordreSum":ordreSum,
				"deliverDate":deliverDate,
				},
			dataType:"json",
			success: function() {
			}
		});
	},
	//生成订单信息传入后台
	doInsertHistory: function(){
		var orderNo = $("#number").text().replace(/,/g, "");
		var orderClient = $("#consignee").text().replace(/,/g, "");
		var count = 0;
		var historyList = [];
		$('#orderTable tr').each(function(){
			count++;
			if(count!=1){
				var obj = {};
				obj.clientInfo = $("#clientSearch").val();
				obj.goodsCode = $(this).find('td:eq(0)').text();
				obj.goodsName = $(this).find('td:eq(1)').text();
				obj.goodsSpec = $(this).find('td:eq(2)').text();
				obj.goodsUnit = $(this).find('td:eq(4)').text();
				obj.goodsQuantity = $(this).find('td:eq(5)').text().replace(/,/g, "");
				obj.goodsPrice = $(this).find('td:eq(6)').text().replace(/,/g, "");
				obj.goodsTotal = $(this).find('td:eq(7)').text().replace(/,/g, "");
				obj.goodsRemark = $(this).find('td:eq(8)').text();
				obj.orderId = $("#number").text();
				historyList[count]=obj;
			}
		});
		
		
		$.ajax({ 
			url: "doAddHistory.action",
			type: "post",
			data: {"historyJson":JSON.stringify(historyList)},
			dataType:"json",
			success: function() {
			}
		});
		
	},
	
	//删除
	doDelete: function(){
		$(this).remove();
		var total = 0 
		$('#orderTable tr').each(function() { 
		$(this).find('td:eq(7)').each(function(){ 
			total += parseFloat($(this).text().replace(/,/g, "")); 
		}); 
		});
		$("#total").text(tsc.ReceiptList.fmoney(total,2));
		var total2 = tsc.ReceiptList.fmoney(total,2).replace(/,/g, "");
		var amountTotal = 0
		$('#orderTable tr').each(function(){ 
			$(this).find('td:eq(5)').each(function(){ 
				amountTotal += parseInt($(this).text().replace(/,/g, "")); 
			}); 
		});
		$("#amountTotal").text(amountTotal);
		$("#total").text(tsc.ReceiptList.fmoney(total,2));
		$("#chineseTotal").text(tsc.ReceiptList.fmoney2(parseFloat(total2)));
	},

	//最大ID
	doQueryMaxId: function(){
		var maxId = 0;
		$.ajax({
			url: "queryMaxOrderId.action",
			async: false,
			type: "post",
			success: function(data){
				maxId = data.maxOrderId;
			}
		});
		return maxId;
	},
	
	
	// 金额格式化
	fmoney:function (s, n){   
	   n = n > 0 && n <= 20 ? n : 2;   
	   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
	   var l = s.split(".")[0].split("").reverse(),   
	   r = s.split(".")[1];   
	   t = "";   
	   for(i = 0; i < l.length; i ++ )   
	   {   
	      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
	   }   
	   return t.split("").reverse().join("") + "." + r;   
	},
	
	// 查看历史页面
	queryHistory: function(){
		var clientSearch = $("#clientSearch").val();
		$.ajax({
			url: "viewHistory.action",
			type: "post",
			data: {"clientSearch":clientSearch},
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
	deleteAll: function(){
		if(window.confirm('你确定要清空吗？')){
			$.ajax({
				url: "deleteHistory.action",
				type: "post",
				success: function(){
					alert("清空成功！")
				}
			});
         }else{
        }
		// 提交请求
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
	}
}

// 页面初始化
$(function(){
	tsc.ReceiptList.init();
});