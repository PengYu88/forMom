tsc.OrderEdit = {
		
	// 初始化
	init: function() {
		// 初始化事件绑定
		tsc.OrderEdit.event();

		// 初始化表单验证
		tsc.OrderEdit.validate();
/*		
		$('#deliveryDate').datetimepicker({
			autoclose:true,//加上这个参数
			language: "zh-CN",
			step: 15,
			format:'Y-m-d'
		});*/
	},

	//定义事件绑定
	event: function() {
	},
	
	//表单验证
	validate: function(){
		$("#order-edit-form").validate({
			ignore: ".ignore",
			rules: {
				editOrderClient: {
					required: true
				},
				editOrderSum: {
					required: true,
					isMoney: true
				}   
			},
		});			
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
	 
	// 表单提交
	doSave: function(callBackFunc){
		var orderNo = tsc.OrderEdit.doRunningNum();
		var orderClient = $("#editOrderClient").val();
		var ordreSum =  $("#editOrderSum").val();
		var deliveryDate =  $("#deliveryDate").val();
		// 表单验证
		if(!$("#order-edit-form").valid()){
			return false;
		}
		// 提交
		$.ajax({ 
			url: "doAddOrder.action",
			type: "post",
			data: {
				"orderNo":orderNo,
				"orderClient":orderClient,
				"ordreSum":ordreSum,
				"deliverDate":deliveryDate,
				},
			dataType:"json",
			success: function(rs) {
				callBackFunc(rs);
			}
		});
	},
	
	setDeliveryDate: function(p){
		
		
		// 获取当前系统日期作为订单日期
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var date = date.getDate();
		var nowDate = year+"-"+month+"-"+date;
		 
		
		var curDate = new Date();
		var startDate=new Date(curDate.setDate(curDate.getDate()+1)); 
		
		var nextyear = startDate.getFullYear();
		var nextmonth = startDate.getMonth() + 1;
		var nextdate = startDate.getDate();
		var nextnowDate = nextyear+"-"+nextmonth+"-"+nextdate;
		
		if(p=='today'){
			$("#deliveryDate").val(nowDate);
		}else{
			$("#deliveryDate").val(nextnowDate);
		}
	},
	
	doDeleteHistory: function(){
		if(window.confirm('你确定要删除吗？')){
			var clientInfo = $("#clientInfo").val();
			var updateTime = $("#updateTime").val();
			$.ajax({ 
				url: "deleteHistory.action",
				type: "post",
				data: {
					"clientInfo":clientInfo,
					"updateTime":updateTime,
					},
				dataType:"json",
				success: function() {
					alert("删除成功！")
				}
			});
         }else{
        }
	},
	
	// 修改
	doUpdate: function(callBackFunc){
		var orderId = $("#editOrderId").val();
		var orderClient = $("#editOrderClient").val();
		var ordreSum =  $("#editOrderSum").val();
		var deliveryDate =  $("#deliveryDate").val();
		// 表单验证
		if(!$("#order-edit-form").valid()){
			return false;
		}
		// 提交
		$.ajax({ 
			url: "doUpdateOrderSave.action",
			type: "post",
			data: {
				"orderId":orderId,
				"orderClient":orderClient,
				"ordreSum":ordreSum,
				"deliveryDate":deliveryDate,
				},
			dataType:"json",
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	}
};

tsc.OrderEdit.init();