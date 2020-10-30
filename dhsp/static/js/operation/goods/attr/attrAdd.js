tsc.AddProductAttr = {
		
		init: function() {

			// 初始化事件绑定
			tsc.AddProductAttr.event();
			
			//初始化表单验证
			tsc.AddProductAttr.validate();

		},
		//定义事件绑定	
		event: function() {
			
		},
	
		// 提交表单刷新页面
		doSubmit: function(){
			
		},

		validate: function(){
		  $("#-edit-form").validate({
			ignore: ".ignore",
			rules: {
				attrCode: {
					required: true
				},
				attrDicName: {
					required: true
				},
				industryId: {
					required: true
				},
				controlType: {
					required: true
				},
				attrMemo: {
					required: true
				}
				
			},
		  });
		},
		
		// 表单提交
		doSave: function(callBackFunc){
			
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
		}
};
// 初始化
tsc.AddProductAttr.init();
