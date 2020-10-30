tsc.DictionaryAdd = {

	// 初始化
	init: function() {
		tsc.DictionaryAdd.validate();
	},

	// 定义事件绑定
	event: function() {

	},

	//表单验证
	validate: function(){
		$("#dictonary-form").validate({
			ignore: ".ignore",
			rules: {
				dictType: {
		               required: true
		           },
		           dictName: {
		         			required: true
		         	},
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
	doSave: function(callBackFunc){
		 
		// 表单验证
		if(!$("#dictonary-form").valid()){
			return false;
		}
		
		//获取表单分类标识
		var dictTypeFlag = $("#dictTypeFlag").val();
		//字典类型
		var dictType = $("#dictType1").val();
		//字典代码
		var dictCode = $("#dictCode").val();
		
		//新建已有类型字典
		if(dictTypeFlag == "1") {
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
					$('#dictonary-form').ajaxSubmit({
						target: 'dictonary-form',
						dataType: 'json',
						type:'post',
						success: function(rs) {
							callBackFunc(rs);
						}
					});
				}
			});
		}
		//新建未有类型字典
		else {
			//验证字典类型
			$.getJSON("/content/dictionary/checkDictionaryInfo?dictType="+dictType, function(rs) {
				
				if(rs.data) {
					App.alert({
						container: "#error-alerts",
	                    type: 'danger',
	                    icon: 'warning',
	                    message: '字典类型已存在，请重新填写'
	                });
				} else {
					// 表单提交
					$('#dictonary-form').ajaxSubmit({
						target: 'dictonary-form',
						dataType: 'json',
						type:'post',
						success: function(rs) {
							callBackFunc(rs);
						}
					});
				}
			});
		}
		
		return false;
	}


};

tsc.DictionaryAdd.init();