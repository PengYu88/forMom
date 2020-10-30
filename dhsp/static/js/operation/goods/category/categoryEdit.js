tsc.CategoryEdit = {
		
	// 初始化
	init: function() {
		
		// 初始化表单验证
		tsc.CategoryEdit.validate();
	},

	// 表单验证
	validate: function(){
		$("#category-edit-form").validate({
			rules: {
				column1: {
					required: true
				}
			}
		});
	},
	
	// 查询
	doSave: function(callBackFunc){
		
		// 表单验证
		if(!$("#category-edit-form").valid()){
			return false;
		}
		
		// 表单提交
		$('#category-edit-form').ajaxSubmit({
			target: '#category-edit-form',
			dataType: 'json',
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	},
};

$(function(){
	tsc.CategoryEdit.init();
});