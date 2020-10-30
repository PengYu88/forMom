/**
 * 初始化uploadify上传
 * @param imgId 上传成功后 显示上传图片的 img标签的ID
 * @param filePathId 上传成功后 文件存储路径
 * @param webFilePath 文件服务主域名
 * @param fileTypeExts 文件类型 可选 ("file","image","doc") 多个可使用 "," 分隔
 */
function fileUpload(param) {

	var timestamp = (new Date()).valueOf();
	var token = "";
	var language = "cn";
	var domain = "";
	var uploadId,imgId,filePathId,webFilePath,fileTypeExts,callback,fileQueue="fileQueue";
	if(param){
		uploadId = param.uploadId;
		if(param.imgId){imgId = param.imgId}
		if(param.filePathId){filePathId = param.filePathId}
		if(param.webFilePath){webFilePath = param.webFilePath}
		if(param.fileType){fileTypeExts =param.fileType}
		if(param.fileQueue){fileQueue =param.fileQueue}
		if(param.callback){callback = param.callback}
	}
	var uploadBtn = $("#"+uploadId);
	var contextPath = param.contextPath;
	$.getJSON(contextPath+'/getUploadToken?t='+timestamp,
		 function(data){
			var data = $.parseJSON(data);	
			if (data.uploadToken) {
				token = data.uploadToken;
				language = data.language;
				domain = data.domain;
				 uploadBtn.uploadify({
				        'swf': param.swf,
				        'uploader': webFilePath+'/upload.do?action=upload',//后台处理的请求
				        'formData':{moduleFlag:"report","token":token,"domain":domain,"language":language,"fileType":fileTypeExts},//后台参数 json格式
				        'queueID': uploadId + '_fileQueue',//与下面的id对应
				        'buttonClass' : param.buttonClass,
				        'buttonText' : param.buttonText,
				        'queueSizeLimit': 6,
				        'fileTypeExts': fileTypeExts, //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
				   		'fileTypeDesc': 'Any old file you want...',
				        'auto': true,
				        'multi': true,
				        'width': param.width,
				        'height': param.height,
				        'uploadLimit': param.uploadLimit,
				        'fileSizeLimit': '5MB',//文件上传大小限制
//				        'buttonImg': 'erp/js/uploadify/images/choose.png',
				        'onUploadError': function (event, queueID, fileObj, errorObj) {
				            alert(errorObj.type + "Error:" + errorObj.info);
				        },
				        'onSelect': function(fileObj){
						    if (fileObj.size > 5*1024*1024){ 
						    	 layer.alert("上传文件不允许大于5MB", {icon: 2});
							     $("#uploadify").uploadifyCancel(queueID);
							     return false;
						    }
						}, 
						'onSelectError' : function(file) {
				            alert('The file ' + file.name + ' returned an error and was not added to the queue.');
				        },
				        'onUploadComplete': function (fileObj, _path, data) {
				        	// $.cookie('JSESSIONID',token);//跨域传输之后必须设置cookie 否则会丢失此次的session 
				        },
				        'onUploadSuccess':function(fileObj, _path, status){
				        	var obj=$.parseJSON(_path);
				        	
				        	//现在拿到的是临时文件，需要再取一次
				        	$.getJSON(contextPath+'/getFile?uuid='+obj.fileUUIDs[0],function(data){
				    			console.log(data);
				    			//执行回调函数 判断是否有回调函数,如果没有就默认执行
				    			if(callback){
					    			callback(status,fileObj,data);
					    		}else{
					        		console.log('请先设置callback');
					    		}
				        	});
				        }
				    });
			}
	 	 }
	 );
}
