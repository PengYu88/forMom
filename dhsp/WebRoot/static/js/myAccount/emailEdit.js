tsc.emailEdit = {

    // 初始化
    init: function() {
    	// 初始化表单验证
        tsc.emailEdit.validate();
        // 初始化事件绑定
        tsc.emailEdit.event();
        // 默认查询
        tsc.emailEdit.doQuery();    
         
    },
    //表单验证
    validate: function(){
        $("#updatemail-form").validate({
            ignore: ".ignore",
            rules: {
            	mail: {
                    required: true,
                    email:true
                }
            },
        });
    },
    // 定义事件绑定
    event: function() {

        // 新建按钮点击事件
        $("#skipBtn").on("click", tsc.emailEdit.doSkipAccount);
        // 新建按钮点击事件
        $("#submitBtn").on("click", tsc.emailEdit.doSubmit);

    },
    //
    doSkipAccount: function(){
        $(".page-content-body").load("/myAccount/userInformation", null, null);
    },

    //提交
    doSubmit: function(){
    	
    	// 表单验证
        if(!$("#updatemail-form").valid()){
            return false;
        }
        var mail = $("#mail").val();
        $.getJSON("/myAccount/doEmailEdit",{"mail":mail}, function(rs){
        	alert(rs.code);
	        if(rs.code == 0){
	            alert(rs.desc);
	            tsc.emailEdit.doQuery();
	        } else {
	        	alert(rs.desc);
	        }
        });
    },
    // 查询
    doQuery: function(){

        $.getJSON("/myAccount/getEdit", function(rs) {
            $("#email").html(rs.data.mail);
        });
    }
};

tsc.emailEdit.init();
