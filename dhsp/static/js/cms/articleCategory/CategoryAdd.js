tsc.CategoryAdd = {
		
	// 初始化
	init: function() {
		
		// 初始化表单验证
		tsc.CategoryAdd.validate();
		
	},

	// 表单验证
	validate: function(){
		$("#-add-form").validate({
			rules: {
				name: {
					required: true
				},
				categoryCode: {
					required: true
				},
			}
		});
	},
	
	// 查询
	doSave: function(callBackFunc){
		
		// 表单验证
		if(!$("#-add-form").valid()){
			return false;
		}
		
		// 表单提交
		$('#-add-form').ajaxSubmit({
			target: '#-add-form',
			dataType: 'json',
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	},
};

tsc.CategoryAdd.init();