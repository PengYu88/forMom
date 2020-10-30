tsc.mobileFinish = {

    // 初始化
    init: function() {

        // 初始化事件绑定
        tsc.mobileFinish.event();
        window.setTimeout(tsc.mobileFinish.doSkipAccount,10000);
    },

    // 定义事件绑定
    event: function() {
         
        $("#skipBtn").on("click", tsc.mobileFinish.doSkipAccount);

    },
    
    //跳转至我的账户
    doSkipAccount: function(){
        $(".page-content-body").load("/myAccount/userInformation", null, null);
    } 
    
};
tsc.mobileFinish.init();