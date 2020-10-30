tsc.AddBlock = {

		init: function() {
		
				// 初始化事件绑定
			tsc.AddBlock.bindEvent();
			
			//表单验证
			tsc.AddBlock.validate();
		},

		//定义事件绑定	
		bindEvent: function() {
			
		},
	
		// 提交表单刷新页面
		doSubmit: function(){
			
		},
		
		validate: function(){
      $("#-add-form").validate({
			ignore: ".ignore",
			rules: {
				name: {
				    required: true
			    },
			    classify: {
					required: true
				}
			},
		  });
		},
		
		// 表单提交
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
		}				

};


// 初始化
tsc.AddBlock.init();