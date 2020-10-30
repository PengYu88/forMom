tsc.AddAd = {

		init: function() {

				// 初始化事件绑定
			tsc.AddAd.event();
			
			//初始化校验
			tsc.AddAd.validate();
			
			//初始化日历控件
			$('.datetimepicker').datetimepicker({
				format : 'YYYY-MM-DD HH:mm:ss'
			});
		},

		//定义事件绑定	
		event: function() {
			// 图片上传
			fileUpload({
				swf:'static/dep/uploadify/uploadify.swf',
				uploadId:"uploadify",
				imgId:"uploadPicPath",
				filePathId:"contractImageUrl",
				webFilePath: SYS_CONF.WEB_FILE_PATH,
				fileType:"*.gif; *.jpg; *.png;",
				contextPath:"",
				callback: function(status,localFile, resp){
					tsc.EditAd.uploadSuccess(status,localFile, resp);
				}
			});
		},
	
		// 提交表单刷新页面
		doSubmit: function(){
			
		},
		
		//表单验证
		validate: function(){
		  $("#-Add-form").validate({
			ignore: ".ignore",
			rules: {
				name: {
				   required: true
			   },
			   sort: {
					required: true
				},
				startTime: {
					required: true
			  },
			  endTime: {
					required: true
			}
			},
		  });
		},
		
		// 表单提交
		doSave: function(callBackFunc){
			
			// 表单验证
			if(!$("#-Add-form").valid()){
				return false;
			}
			
			// 表单提交
			$('#-Add-form').ajaxSubmit({
				target: '#-Add-form',
				dataType: 'json',
				success: function(rs) {
					callBackFunc(rs);
				}
			});
			return false;
		}
};


// 初始化
tsc.AddAd.init();