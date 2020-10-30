tsc.qqEdit = {

    // 初始化
    init: function() {
 
    	// 初始化表单验证
        tsc.qqEdit.validate();
        // 初始化事件绑定
        tsc.qqEdit.event();
        // 默认查询
        tsc.qqEdit.doQuery();
    },
    //表单验证
    validate: function(){
        $("#updatQQ-form").validate({
            ignore: ".ignore",
            rules: {
            	qq: {
                    required: true,
                    number:true
                }
            },
        });
    },
    
    // 定义事件绑定
    event: function() {

        // 新建按钮点击事件
        $("#skipBtn").on("click", tsc.qqEdit.doSkipAccount);
        // 新建按钮点击事件
        $("#submitBtn").on("click", tsc.qqEdit.doSubmit);

    },
    //
    doSkipAccount: function(){
        $(".page-content-body").load("/myAccount/userInformation", null, null);
    },

    //提交
    doSubmit: function(){
        
    	// 表单验证
        if(!$("#updatQQ-form").valid()){
            return false;
        }
        var qq = $("#qq").val();
        $.getJSON("/myAccount/doQqEdit", {"qq": qq}, function(rs){
	        if(rs.code == 0){
	            alert(rs.desc);
	            tsc.qqEdit.doQuery();
	           /* $(".page-content-body").load("html/accountSet/myAccount/UpdateQQ.html", null, null);*/
	        } else {
	        	alert(rs.desc);
	        }
        });
       /* // 提交请求
        sweetAlert({
                title: '是否提交',
                type: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: SYS_MSG.BTN_CONFIRM,
                cancelButtonText: SYS_MSG.BTN_CANCEL,
                closeOnConfirm: false,
            },
            function(isConfirm){
                if (isConfirm) {
                    var qq = $("#qq").val();
                    $.getJSON("/myAccount/doQqEdit",{"qq": qq}, function(rs){

                        if(rs.code == "1"){
                            // 提示冻结成功
                            sweetAlert({
                                title: '提交成功',
                                text: SYS_MSG.MSG_AUOT_CLOSE,
                                type: 'success',
                                showConfirmButton: false,
                                timer: SYS_CONF.ALERT_TIMER,
                            });

                        } else {
                            sweetAlert({
                                title: rs.desc,
                                text: SYS_MSG.MSG_AUOT_CLOSE,
                                type: 'success',
                                showConfirmButton: false,
                                timer: SYS_CONF.ALERT_TIMER,
                            });
                        }
                    });
                   tsc.qqEdit.doQuery();  
                }
            });*/
    },
    // 查询
    doQuery: function(){

	   $.getJSON("/myAccount/getEdit", function(rs) {
	       $("#qqNumber").html(rs.data.qq);
	   });
}
};
tsc.qqEdit.init();