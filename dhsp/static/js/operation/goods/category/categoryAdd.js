tsc.CategoryAdd = {
		
	// 初始化
	init: function() {
		
		// 初始化表单验证
		tsc.CategoryAdd.validate();
	},

	// 表单验证
	validate: function(){
		$("#category-add-form").validate({
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
		if(!$("#category-add-form").valid()){
			return false;
		}
		
		// 表单提交
		$('#category-add-form').ajaxSubmit({
			target: '#category-add-form',
			dataType: 'json',
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	},
};

$(function(){
	tsc.CategoryAdd.init();
});