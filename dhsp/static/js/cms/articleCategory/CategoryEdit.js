tsc.CategoryEdit = {
		
	// 初始化
	init: function() {
		
		// 初始化表单验证
		tsc.CategoryEdit.validate();
	},

	// 表单验证
	validate: function(){
		$("#-edit-form").validate({
			rules: {
				column1: {
					required: true
				}
			}
		});
	},
	
	// 查询
	doEdit: function(callBackFunc){
		
		// 表单验证
		if(!$("#-edit-form").valid()){
			return false;
		}
		
		// 表单提交
		$('#-edit-form').ajaxSubmit({
			target: '#-edit-form',
			dataType: 'json',
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	},
};

tsc.CategoryEdit.init();