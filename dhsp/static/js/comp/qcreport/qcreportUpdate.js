tsc.qcreportUpdate = {

    init: function() {
    	// 日期格式化
		var createTime=$("#createTimeHidden").val();
		if (createTime!="") {
			createTime = formatDate($("#createTimeHidden").val(),'yyyy-MM-dd');
	        $('#createTimeInfo').html(createTime);
		}
		
        tsc.qcreportUpdate.event();

        //初始化表单验证
        tsc.qcreportUpdate.validate();
        // 初期隐藏驳回理由
        $("#reason").hide();
        // 默认选择通过
    	tsc.qcreportUpdate.radioDoCheck("status");
    },

    //定义事件绑定
    event: function() {

        $("#auditState").find("input").on("click",tsc.qcreportUpdate.doCheck);


    },
    // status3 → 不通过 的时候显示
    doCheck: function(){
        if($("#status3").prop("checked")){
            $("#reason").show();
        }else{
            $("#reason").hide();
        }
    },
    //提交表单刷新页面
    doSubmit: function(){

    },
    // 表单提交
    confirm: function(callBackFunc){
    	
    	// 表单验证
    	if(!$("#qcreport-edit-form").valid() && $("#status3").prop("checked")){
    		return false;
    	}

    	$('#qcreport-edit-form').ajaxSubmit({
            target: '#qcreport-edit-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
    	
//		var qcreportId = $("#qcreportId").val();
//		var auditState = $("input[name='updateStatus']").val();
//		alert(auditState);
//    	$.ajax({
//    		data: {"qcreportId": qcreportId, "status": 2},	
//    		url: "/comp/qcreport/verifyQcreport",
//    		type: "post",
//			success: function(rs) {
//				callBackFunc(rs);
//			}
//    	});
//		return false;
	},
    //表单验证
    validate: function(){
        $("#qcreport-edit-form").validate({
            ignore: ".ignore",
            rules: {
            	rejectReason: {
            		required: true
                }
            },
        });
    },
    //radioDoCheck
    radioDoCheck:function (name) {
    	// 默认选择通过
    	var value = "2";
		$("input[name='" + name + "']").each(function(){
			if($(this).val() == value){
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
tsc.qcreportUpdate.init();