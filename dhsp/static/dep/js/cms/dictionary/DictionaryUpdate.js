tsc.DictionaryUpdate = {

	// 初始化
	init: function() {

		tsc.DictionaryUpdate.validate();
	},

	// 定义事件绑定
	event: function() {

	},

	//表单验证
	validate: function(){
		$("#dictonary-edit-form").validate({
			ignore: ".ignore",
			rules: {
		         	dictCode: {
						required: true,
						digits:true
					},
					dictValue1: {
						required: true
					}
			},
		});
	},


	// 表单提交
	doUpdate: function(callBackFunc){
		
		// 表单验证
		if(!$("#dictonary-edit-form").valid()){
			return false;
		}
		
		//字典类型
		var dictType = $("#dictType1").val();
		//新输入字典代码1
		var dictCode = $("#dictCode").val();
		//原字典代码2
		var dictCode2 = $("#dictCode2").val();
		
		//新建未有类型字典
		if(dictCode2 != dictCode) {
			//验证字典类型与字典代码不能完全相同
			$.getJSON("/content/dictionary/checkDictCodeAndType?dictType="+dictType+"&dictCode="+dictCode, function(rs) {
				
				if(rs.data) {
					App.alert({
						container: "#error-alerts",
	                    type: 'danger',
	                    icon: 'warning',
	                    message: '字典代码已存在，请重新填写'
	                });
				} else {
					// 表单提交
					$('#dictonary-edit-form').ajaxSubmit({
						target: 'dictonary-edit-form',
						dataType: 'json',
						type:'post',
						success: function(rs) {
							callBackFunc(rs);
						}
					});
				}
			});
		} else {
			// 表单提交
			$('#dictonary-edit-form').ajaxSubmit({
				target: 'dictonary-edit-form',
				dataType: 'json',
				type:'post',
				success: function(rs) {
					callBackFunc(rs);
				}
			});
		}
		return false;
	}


};

tsc.DictionaryUpdate.init();