tsc.updateMobile = {

    // 初始化
    init: function() {

        // 初始化表单验证
        tsc.updateMobile.validate();
        // 初始化事件绑定
        tsc.updateMobile.event();
        //自动跳转
        window.setTimeout(tsc.updateMobile.doSkipAccount,10000);
        
    },
    validate: function(){
        $("#updateMobile-form").validate({
            ignore: ".ignore",
            rules: {
            	mobileNo: {
            		required: true,
                    mobile:true
                },
                Message: {
                    required: true
                }
            },
        });
    },
    //发送短信验证码
    doSend: function(){
    	var mobileNo = $("#mobileNo").val();
        $.getJSON("/myAccount/sendMessage", {"mobileNo":mobileNo}, function(rs) {
        	  if(rs.code == 0){
    	            alert("短信验证码发送成功！");
    	        } else {
    	        	alert("短信验证码发送失败！");
    	        }
          });
       
    },
    // 定义事件绑定
    event: function() {

        // 新建按钮点击事件
        $("#nextBtn").on("click", tsc.updateMobile.doFinish);

        // 返回
        $("#backBtn").on("click", tsc.updateMobile.doBack);
        
        // 新建按钮点击事件
        $("#sendBtn").on("click", tsc.updateMobile.doSend);

    },
    
    //下一步
    doFinish: function(){
        // 表单验证
        if(!$("#updateMobile-form").valid()){
            return false;
        }
        // 表单提交
        $('#updateMobile-form').ajaxSubmit({
            target: '#updateMobile-form',
            dataType: 'json',
            success: function(rs) {
                if(rs.code == 0){
                    $(".page-content-body").load("/myAccount/mobileFinish", null, null);
                }
            }
        });
        return false;
    },
    
    //返回
    doBack: function(){
        $(".page-content-body").load("/myAccount/mobileEdit", null, null);
    },

    // 查询
    doQuery: function(page){

        if(page.type){
            page = 1;
        }

        $.getJSON("/myAccount/getEdit", function(rs) {
            // 循环遍历数据
            buildHtmlWithJsonArray('repeat', rs.data, false, false);
        });
    }
};
tsc.updateMobile.init();