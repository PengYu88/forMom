tsc.AddFloor = {
		
		init: function() {
		
			// 初始化事件绑定
			tsc.AddFloor.bindEvent();
			
			//初始化校验
			tsc.AddFloor.validate();
		},

		//定义事件绑定	
		bindEvent: function() {
			
		},
	
		// 提交表单刷新页面
		doSubmit: function(){
			
		},
		
		validate: function(){
      $("#-edit-form").validate({
			ignore: ".ignore",
			rules: {
				column1: {
				   required: true
			   },
				column2: {
					required: true
				},
				column3: {
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
tsc.AddFloor.init();