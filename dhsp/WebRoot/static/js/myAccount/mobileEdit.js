tsc.mobileEdit = {
	// 初始化
	init: function() {
		
		// 初始化表单验证
        tsc.mobileEdit.validate();
		// 初始化事件绑定
		tsc.mobileEdit.event();
	
	},
	
	//表单验证
    validate: function(){
        $("#mobileEdit-form").validate({
            ignore: ".ignore",
            rules: {
            	Message: {
                    required: true
                }
            },
        });
    },
    
    // 定义事件绑定
    event: function() {
        
    	// 下一步按钮点击事件
        $("#nextBtn").on("click", tsc.mobileEdit.doNewNum);
    	// 发送按钮点击事件
        $("#sendBtn").on("click", tsc.mobileEdit.doSend);
    },
    
    //发送短信验证码  
    doSend: function(mobileNo){
    	  $.getJSON("/myAccount/sendMessage", {"mobileNo":mobileNo}, function(rs) {
    		  if(rs.code == 0){
  	            alert("短信验证码发送成功！");
  	        } else {
  	        	alert("短信验证码发送失败！");
  	        }
          });
    },
    
	//进入下一步
    doNewNum: function(){
        // 表单验证
        if(!$("#mobileEdit-form").valid()){
            return false;
        }
        // 表单提交
        $('#mobileEdit-form').ajaxSubmit({
            target: '#mobileEdit-form',
            dataType: 'json',
            success: function(rs) {
                if(rs.code == 0){
                    $(".page-content-body").load("/myAccount/updateMobile", null, null);
                }
            }
        });
        return false;
    }
};
tsc.mobileEdit.init();