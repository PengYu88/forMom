tsc.EditProductAttr = {
		
		init: function() {

			// 初始化事件绑定
			tsc.EditProductAttr.event();
			
			//初始化表单验证
			tsc.EditProductAttr.validate();
			
			//已选行业回显选中
			tsc.EditProductAttr.industryDoCheck();
			
			//已选控件类型回显选中
			tsc.EditProductAttr.controlTypeDoCheck();
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
		
		industryDoCheck: function(){
			var industryIdValue = $("#hiddenIndustryId").val();
			$(".industryId").each(function(){
				if($(this).val() == industryIdValue){
					$(this).attr("checked","checked");
				}
			});
		},
		
		controlTypeDoCheck: function(){
			var controlTypeValue = $("#hiddenControlType").val();
			$("input[name='controlType']").each(function(){
				if($(this).val() == controlTypeValue){
					$(this).attr("checked","checked");
				}
			})
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
tsc.EditProductAttr.init();
