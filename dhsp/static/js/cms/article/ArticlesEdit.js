tsc.ArticlesEdit = {

	// 初始化
	init: function() {

		$(".summernote").summernote({
			height: 350,
			lang: 'zh-CN'
		});
		
		/*var articleContent=$("#articleContent").val();
		$("#content").code(articleContent);*/
		
		// 图片上传
		fileUpload({
			swf:'static/dep/uploadify/uploadify.swf',
			uploadId:"uploadify-summernote",
			webFilePath: SYS_CONF.WEB_FILE_PATH,
			fileType:"*.gif; *.jpg; *.png;",
			contextPath:"",
			callback: function(status,localFile, resp){
				resp = $.parseJSON(resp);
				for(var i=0;i<resp.filePaths.length;i++){
					$(".summernote").summernote('insertImage', SYS_CONF.WEB_FILE_PATH + resp.filePaths[i]);
				}
				$(".summernote").focus();
			}
		});

		// 初始化表单验证
		tsc.ArticlesEdit.validate();
		
		var platformId=$("#platformId").val();
		var categoryId=$("#categoryId").val();
		$.ajax({
			url: "/content/articleCategory/listByPlatform",
			data: {"platformId":platformId},
			dataType:"json",
			type: 'GET',
			success: function(rs){
				$( " #articleCategoryId").empty();
				for(var i=0;i<rs.data.length;i++){
					$(" #articleCategoryId").append("<option value='" + rs.data[i].articleCategoryId + "' >" + rs.data[i].name + "</option>");
				};
				$(" #articleCategoryId").val(categoryId);
			}
		});
	},

	//定义事件绑定
	event: function() {

	},

	// 表单验证
	validate: function(){
		$("#ArticlesEdit-edit-form").validate({
			ignore: ".ignore",
			rules: {
				name: {
					required: true
				},
				articleCategoryId: {
					required: true
				},
			}
		});
	},
	
	// 保单提交
	doSave: function(callBackFunc){
		
		// 表单验证
		if(!$("#ArticlesEdit-edit-form").valid()){
			return false;
		}

		var isPublish = $("#isPublish").prop('checked');
		var top = $("#top").prop('checked');
	    if(top == true){
	      $("#top").val(1); 
	    }else{
		  $("#top").val(0); 
	    };
	    if(isPublish == true){
	      $("#isPublish").val(1); 
	    }else{
		  $("#isPublish").val(0); 
	    };
	    /*$("#content").val($('.summernote').code());*/
		// 表单提交
		$('#ArticlesEdit-edit-form').ajaxSubmit({
			target: '#ArticlesEdit-edit-form',
			dataType: 'json',
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	}
};

$(function(){
	tsc.ArticlesEdit.init();
})
