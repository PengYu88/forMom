tsc.passwordEdit = {

    // 初始化
    init: function() {

    	// 初始化表单验证
        tsc.passwordEdit.validate();
        // 初始化事件绑定
        tsc.passwordEdit.event();

    },
    
    //表单验证
    validate: function(){
        $("#passwordEdit-form").validate({
            ignore: ".ignore",
            rules: {
            	newPasswordCheck : {
                  	  equalTo: "#newPassword",
                      required: true
                  }
            },
        });
    },
    
    // 定义事件绑定
    event: function() {

        // 下一步按钮点击事件
        $("#nextBtn").on("click", tsc.passwordEdit.doNext);

    },
    
  //下一步
    doNext: function(){
        // 表单验证验证没有
        if(!$("#passwordEdit-form").valid()){
            return false;
        }
        // 表单提交
        $('#passwordEdit-form').ajaxSubmit({
            target: '#passwordEdit-form',
            dataType: 'json',
            success: function(rs) {
                if(rs.info = "success"){
                    $(".page-content-body").load("/myAccount/passwordEditFinish", null, null);
                }
            }
        });
        return false;
    },
    
};
tsc.passwordEdit.init();