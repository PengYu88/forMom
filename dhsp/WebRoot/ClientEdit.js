tsc.ClientEdit = {
		
	// 初始化
	init: function() {
		// 初始化事件绑定
		tsc.ClientEdit.event();

		// 初始化表单验证
		tsc.ClientEdit.validate();
		
	},

	//定义事件绑定
	event: function() {
		var flag = $("#flag").val();
		if(flag=='1'){
			$("#editClientCode").attr("disabled","true");
		}
	},
	
	//客户代码重复校验
	doCheck:function(){
		var clientCode = $("#editClientCode").val();
		$.ajax({
			url: "queryClientForReceipt.action",
			type: "post",
			data: {"clientCode":clientCode},
			success: function(data){
				if(data.itemsList[0]!=null){
					$("#checkFlag").text(clientCode+"号客户已经存在，请重新输入！");
					$("#checkFlag").css("display","inline");
					$("#editClientCode").val("");
				}else{
					$("#checkFlag").css("display","none");
				}
			}
		});
	},

	//表单验证
	validate: function(){
		$("#client-edit-form").validate({
			ignore: ".ignore",
			rules: {
				editClientCode: {
					required: true
				},
				editClientName: {
					required: true
				}   
			},
		});			
	},
	
	// 保存
	doSave: function(callBackFunc){
		var clientCode = $("#editClientCode").val();
		var clientName = $("#editClientName").val();
		var clientAddress = $("#editClientAddress").val();
		var clientTelephone = $("#editClientTelephone").val();
		// 表单验证
		if(!$("#client-edit-form").valid()){
			return false;
		}
		// 提交
		$.ajax({ 
			url: "doAddClientSave.action",
			type: "post",
			data: {
				"clientCode":clientCode,
				"clientName":clientName,
				"clientAddress":clientAddress,
				"clientTelephone":clientTelephone
				},
			dataType:"json",
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	},
	
	// 修改
	doUpdate: function(callBackFunc){
		var clientId = $("#editClientId").val();
		var clientCode = $("#editClientCode").val();
		var clientName = $("#editClientName").val();
		var clientAddress = $("#editClientAddress").val();
		var clientTelephone = $("#editClientTelephone").val();
		// 表单验证
		if(!$("#client-edit-form").valid()){
			return false;
		}
		// 提交
		$.ajax({ 
			url: "doUpdateClientSave.action",
			type: "post",
			data: {
				"clientId":clientId,
				"clientCode":clientCode,
				"clientName":clientName,
				"clientAddress":clientAddress,
				"clientTelephone":clientTelephone
				},
			dataType:"json",
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	}
};

tsc.ClientEdit.init();