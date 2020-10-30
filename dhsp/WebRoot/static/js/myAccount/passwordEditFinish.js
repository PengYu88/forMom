tsc.passwordEditFinish = {

    // 初始化
    init: function() {


        // 初始化事件绑定
        tsc.passwordEditFinish.event();
    
        window.setTimeout(tsc.passwordEditFinish.doSkipAccount,10000);
       
    },

    // 定义事件绑定
    event: function() {

        // 新建按钮点击事件  
        $("#skipBtn").on("click", tsc.passwordEditFinish.doSkipAccount);

    },
    //提交
    doSkipAccount: function(){
    	  $(".page-content-body").load("/myAccount/userInformation", null, null);
    },
    // 查询
    doQuery: function(page){

        if(page.type){
            page = 1;
        }

        $.getJSON("data/passwordEditFinish.json", function(rs) {
            // 循环遍历数据
            buildHtmlWithJsonArray('repeat', rs.data, false, false);
        });
    }
};
tsc.passwordEditFinish.init();