tsc.qcreportInfo = {

    // 初始化
    init: function() {
    	// 日期格式化
		var createTime=$("#createTimeHidden").val();
		if (createTime!="") {
			createTime = formatDate($("#createTimeHidden").val(),'yyyy-MM-dd');
	        $('#createTimeInfo').html(createTime);
		}
        // 初始化事件绑定
        tsc.qcreportInfo.event();
        
        tsc.qcreportInfo.doHide();
    },

    // 定义事件绑定
    event: function() {
        
    },

    //控制理由隐藏显示
    doHide: function(){

        if($("#QCStat").attr("state")== "3"){
        	$("#QCAuditReason").show();
        }else{
        	$("#QCAuditReason").hide();
        }

    }
};

tsc.qcreportInfo.init();
