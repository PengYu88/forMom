tsc.GoodsEdit = {
		
	// 初始化
	init: function() {
		
		// 初始化事件绑定
		tsc.GoodsEdit.event();

		// 初始化表单验证
		tsc.GoodsEdit.validate();
	},

	//定义事件绑定
	event: function() {
		var flag = $("#flag").val();
		if(flag=='1'){
			$("#editGoodsCode").attr("disabled","true");
		}
		// 插入毫升符号
		$("#addMl").on("click", tsc.GoodsEdit.doAddMl);
		
		// 插入乘号
		$("#addMuti").on("click", tsc.GoodsEdit.addMuti);
		
		var Unit = $("#Unit").val();
		
		$("#editGoodsUnit").val(Unit);
	},
	
	//商品代码重复校验
	doCheck:function(){
		var goodsCode = $("#editGoodsCode").val();
		$.ajax({
			url: "queryGoodsForReceipt.action",
			type: "post",
			data: {"goodsCode":goodsCode},
			success: function(data){
				if(data.itemsList[0]!=null){
					$("#checkFlag").text(goodsCode+"号商品已经存在，请重新输入！");
					$("#checkFlag").css("display","inline");
					$("#editGoodsCode").val("");
				}else{
					$("#checkFlag").css("display","none");
				}
			}
		});
	},

	//表单验证
	validate: function(){
		$("#goods-edit-form").validate({
			ignore: ".ignore",
			rules: {
				editGoodsCode: {
					required: false
				},
				editGoodsName: {
					required: true
				},
				editGoodsPrice: {
					isMoney: true
				}    
			},
		});			
	},
	
	// 表单提交
	doSave: function(callBackFunc){
		var goodsCode = $("#editGoodsCode").val();
		var goodsName = $("#editGoodsName").val();
		var goodsSpec = $("#editGoodsSpec").val();
		var factory = $("#editFactory").val();
		var goodsUnit = $("#editGoodsUnit").val();
		var goodsPrice = $("#editGoodsPrice").val();
		var goodsRemark = $("#editGoodsRemark").val();
		var goodsQuantity = $("#goodsQuantity").val();
		// 表单验证
		if(!$("#goods-edit-form").valid()){
			return false;
		}
		// 提交
		$.ajax({ 
			url: "doAddSave.action",
			type: "post",
			data: {
				"goodsCode":goodsCode,
				"goodsName":goodsName,
				"goodsSpec":goodsSpec,
				"factory":factory,
				"goodsUnit":goodsUnit,
				"goodsPrice":goodsPrice,
				"goodsRemark":goodsRemark,
				"goodsQuantity":goodsQuantity
				},
			dataType:"json",
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	},
	
	//插入毫升符号
	doAddMl:function(){
		var editGoodsSpec = $("#editGoodsSpec").val();
		$("#editGoodsSpec").val(editGoodsSpec+"ml");
	},
	
	//插入×号
	addMuti:function(){
		var editGoodsSpec = $("#editGoodsSpec").val();
		$("#editGoodsSpec").val(editGoodsSpec+"×");
	},
	
	// 修改
	doUpdate: function(callBackFunc){
		var goodsId = $("#editGoodsId").val();
		var goodsCode = $("#editGoodsCode").val();
		var goodsName = $("#editGoodsName").val();
		var goodsSpec = $("#editGoodsSpec").val();
		var factory = $("#editFactory").val();
		var goodsUnit = $("#editGoodsUnit").val();
		var goodsPrice = $("#editGoodsPrice").val();
		var goodsRemark = $("#editGoodsRemark").val();
		var goodsQuantity = $("#goodsQuantity").val();
		// 表单验证
		if(!$("#goods-edit-form").valid()){
			return false;
		}
		// 提交
		$.ajax({ 
			url: "doUpdateSave.action",
			type: "post",
			data: {
				"goodsId":goodsId,
				"goodsCode":goodsCode,
				"goodsName":goodsName,
				"goodsSpec":goodsSpec,
				"factory":factory,
				"goodsUnit":goodsUnit,
				"goodsPrice":goodsPrice,
				"goodsRemark":goodsRemark,
				"goodsQuantity":goodsQuantity
				},
			dataType:"json",
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	}
};
tsc.GoodsEdit.init();