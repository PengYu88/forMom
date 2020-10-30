tsc.EditAd = {

	init: function() {

			// 初始化事件绑定
		tsc.EditAd.event();
		
		//初始化校验
		tsc.EditAd.validate();
		
		//初始化日历控件
		$('.datetimepicker').datetimepicker({
			format : 'YYYY-MM-DD HH:mm:ss'
		});			
	},

	// 提交表单刷新页面
	doSubmit: function(){
		
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
	
	//表单验证
	validate: function(){
	  $("#-edit-form").validate({
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
	// 成功上传
	uploadSuccess: function(status,localFile, resp){
		var resp = $.parseJSON(resp);
		if(resp && resp.resultCode == 4){

			var filePaths = resp.filePaths;//文件查看路径
			var originalFileNames = resp.originalFileNames;//原文件名
			var fileType=localFile.type.toLowerCase();
			//for(var i=0;i<filePaths.length;i++){
			if(fileType=='.jpg'||fileType=='.bmp'||fileType=='.gig'||fileType=='.png'||fileType=='.tif'||fileType=='.rgb'||fileType=='.dib'||fileType=='.eps'||fileType=='.jpe'||fileType=='.pcx'||fileType=='.bmp'||fileType=='.gif'||fileType=='.pdf'){
				
				// 初始化
				$(".img-box").remove();
				$("#contractImageUrl").html("");
				
				var str = '<div class="img-box"><img src="' + SYS_CONF.WEB_FILE_PATH + '/' + filePaths[0] + '" width="100%"/></div>';
				var pathSrc ='<input type="hidden" name="picturePath" value="' + filePaths[0] +'">';
				$(".uploadifyp").before(str)
				$("#contractImageUrl").append(pathSrc);
			}
			//}
		}else{
    		alert(resp.resultMsg);
		}
	}

};


// 初始化
tsc.EditAd.init();