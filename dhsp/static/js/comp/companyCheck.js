tsc.companyCheck= {

    // 初始化
    init: function() {
    	
		var foundingTime=$("#foundingTimeHidden").val();
		if (foundingTime!="") {
			foundingTime = formatDate($("#foundingTimeHidden").val(),'yyyy-MM-dd');
	        $('#foundingTime').val(foundingTime);
		}
    	tsc.companyCheck.radioDoCheck("compLevel");
    	tsc.companyCheck.radioDoCheck("compCategory");
    	tsc.companyCheck.radioDoCheck("customization");
    	tsc.companyCheck.radioDoCheck("contactPersonSex");
    	tsc.companyCheck.radioDoCheck("qualityControl");
    	
    	tsc.companyCheck.checkboxDoCheck("businessScope");
    	tsc.companyCheck.checkboxDoCheck("agementSystemAuthentication");
    	
    	tsc.companyCheck.selectDoClass("addressProvince");
    	tsc.companyCheck.selectDoClass("addressCity");
    	tsc.companyCheck.selectDoClass("staffsNum");
    	tsc.companyCheck.selectDoClass("businessVolume");
    	tsc.companyCheck.selectDoClass("exports");
    	tsc.companyCheck.selectDoClass("areaCode");
    	tsc.companyCheck.selectDoClass("invoiceType");
    	
		var updateMode=$("#updateMode").val();
		var validStatus=$("#validStatus").val();
		if (1 == updateMode) {
			$('#rejecteReason').attr("disabled","disabled");
			//认证后不能修改企业名称、营业执照号、三证、授权书
			if (2 == validStatus) {
				$('#compName').attr("disabled","disabled");
				$('#businessLicense').attr("disabled","disabled");
				//三证、授权书attr("disabled","disabled");
			}
		}
		else if (2 == updateMode) {
			//变更时只能修改企业名称、三证。
			$("input").attr("disabled","disabled");
			$("textarea").attr("disabled","disabled");
			$("select").attr("disabled","disabled");
			$("#choicePlaceBtn").attr("disabled","disabled");
			
			$('#compName').removeAttr("disabled");
			
			$('#compId').removeAttr("disabled");
			$('#validStatus').removeAttr("disabled");
			$('#updateMode').removeAttr("disabled");
			//三证removeAttr("disabled");
			
			$("#businessScopeSearch").removeAttr("disabled");
			$("#compNameSearch").removeAttr("disabled");
			$("#compLevelSearch").removeAttr("disabled");
			$("#compCategorySearch").removeAttr("disabled");
			$("#validStatusSearch").removeAttr("disabled");
			$("#createTimeStart").removeAttr("disabled");
			$("#createTimeEnd").removeAttr("disabled");	
		}
		else if (3 == updateMode) {
			//审核时可修改企业名称，可设置公司等级，不通过需要录入审核意见，其他信息不可修改。
			$("input").attr("disabled","disabled");
			$("textarea").attr("disabled","disabled");
			$("select").attr("disabled","disabled");
			$("#choicePlaceBtn").attr("disabled","disabled");
			
			$('#compName').removeAttr("disabled");
			$("input[name='compLevel']").each(function(){
				$(this).removeAttr("disabled");
			})
			$('#rejecteReason').removeAttr("disabled");
			
			$('#compId').removeAttr("disabled");
			$('#validStatus').removeAttr("disabled");
			$('#updateMode').removeAttr("disabled");
			
			$("#businessScopeSearch").removeAttr("disabled");
			$("#compNameSearch").removeAttr("disabled");
			$("#compLevelSearch").removeAttr("disabled");
			$("#compCategorySearch").removeAttr("disabled");
			$("#validStatusSearch").removeAttr("disabled");
			$("#createTimeStart").removeAttr("disabled");
			$("#createTimeEnd").removeAttr("disabled");			
		}
		// 初始化事件绑定
		tsc.companyCheck.event();
    	
        // 初始化表单验证
        tsc.companyCheck.validate();
    },
     //定义事件绑定
    event: function() {

        //日历绑定
        $('.datetimepicker').datetimepicker({
            format : 'YYYY-MM-DD'
        });

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
                tsc.companyCheck.uploadSuccess(status,localFile, resp);
            }
        });
        
        //绑定联动
        $('#addressProvince').on("change",tsc.companyCheck.onChange);
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
                var pathSrc ='<input type="hidden" name="logo" value="' + filePaths[0] +'">';
                $(".uploadifyp").before(str)
                $("#contractImageUrl").append(pathSrc);
            }
            //}
        }else{
            alert(resp.resultMsg);
        }
    },
    //联动点击事件
    onChange: function () {
        $.ajax({
            url: "comp/queryAreaInfo",
            data: {
            	"areaCode" : $("#addressProvince").val(),
                "nextLevelNum" : 1
            },
            dataType:"json",
            success:function(rs){
                $("#addressCity").empty();
                $("#addressCity").prepend("<option value=''>请选择</option>");
                for(var i = 0; i < rs.data.length; i++){
                    $("#addressCity").append("<option value='" + rs.data[i].areaCode + "' >" + rs.data[i].areaName + "</option>");
                }
            }
        });
    },
    // 表单验证
    validate: function(){
        $("#companyCheck-form").validate({
            rules: {
            	compName: {
                    required: true
                },
                addressProvince: {
                    required: true
                },
                addressCity: {
                    required: true
                },
                addressDetail:{
                    required:true
                },
                mainProducts: {
                    required: true
                },
                foundingTime: {
                    required: true
                },
                registeredCapital: {
                    required: true
                },
                businessLicense: {
                    required: true
                },
                box:{
                    required:true,
                    minlength:1
                },
                comp_category:{
                    required:true,
                    minlength:1
                },
                description: {
                    required: true
                },
                contactPersonName: {
                    required: true
                },
                areaCode: {
                    required: true
                },
                invoiceCompName: {
                    required: true
                },
                invoiceAddress: {
                    required: true
                },
                invoiceType: {
                    required: true
                },
                taxIdentityNumber: {
                    required: true
                },
                accountsBank: {
                    required: true
                },
                invoiceTel: {
                    required: true
                }
            }
        });
    },
    //radioDoCheck
    radioDoCheck:function (name) {
    	var inputName = "#" + name + "Hidden";
    	var value = $(inputName).val();
		$("input[name='" + name + "']").each(function(){
			if($(this).val() == value){
				$(this).attr("checked","checked");
			}
		})
    },
    //checkboxDoCheck
    checkboxDoCheck:function (name) {
    	var inputName = "#" + name + "Hidden";
    	var value = $(inputName).val();
    	var valueList = value.split(",");
		$("input[name='" + name + "']").each(function(){
			if(valueList.indexOf($(this).val()) >= 0){
				$(this).attr("checked","checked");
			}
		})
    },
    //selectDoClass
    selectDoClass:function (name) {
    	var inputName = "#" + name;
    	$(inputName).attr("class","form-control");
    },
    //选择地区
    choicePlace: function(){
    	var majorMarkets=$("#majorMarkets").val();
        $.ajax({
            url: "/comp/selectRegion",
            data: {"majorMarkets": majorMarkets},	
            success: function(rs){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "请选择地区(您最多能选择10项)",
                    message: rs,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.selectRegion.doSave(function(rs){
                                	dialog.modal("hide");
                                });
                                return false;
                            }
                        },
                        cancel:{
                            label: SYS_MSG.BTN_CANCEL,
                            className: "btn-default",
                        }
                    }
                });
            }
        });
    },
    // 编辑
    doEdit: function(callBackFunc){
        // 表单验证
        if(!$("#companyCheck-form").valid()){
            return false;
        }
		$('#updateMode').val(1);
        // 表单提交
        $('#companyCheck-form').ajaxSubmit({
            target: '#companyCheck-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },
    // 变更
    doChange: function(callBackFunc){
        // 表单验证
        if(!$("#companyCheck-form").valid()){
            return false;
        }
		$('#updateMode').val(2);
        // 表单提交
        $('#companyCheck-form').ajaxSubmit({
            target: '#companyEdit-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },
    // 通过
	doConfirm: function(validStatus, callBackFunc){
         //表单验证
         if(!$("#companyCheck-form").valid()){
             return false;
         }
		$('#validStatus').val(validStatus);
		$('#updateMode').val(3);
        // 表单提交
        $('#companyCheck-form').ajaxSubmit({
            target: '#companyCheck-form',
            dataType: 'json',
			type:'post',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },
    // 表单提交(不通过)
    doUnConfirm: function(validStatus, callBackFunc){
    	
    	$("#validStatus").val(validStatus);
		$('#updateMode').val(3);
        // 表单验证
        if(''==$("#rejecteReason").val()){
			$("#error-alerts-rejecteReason").show();
			App.alert({
	            container: "#error-alerts-rejecteReason",
	            type: 'danger',
	            icon: 'warning',
	            message: '请填写审核意见'
	        });
            return false;
        }
        if(!$("#companyCheck-form").valid()){
            return false;
        }
        $('#companyCheck-form').ajaxSubmit({
            target: '#companyCheck-form',
            dataType: 'json',
			type:'post',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    }
};

tsc.companyCheck.init();