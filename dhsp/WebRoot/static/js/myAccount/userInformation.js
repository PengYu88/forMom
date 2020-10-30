tsc.userInformation = {

    // 初始化
    init: function() {
        // 初始化事件绑定
        tsc.userInformation.event();
    },

    // 定义事件绑定
    event: function() {
        // 查询按钮点击事件
        $("#queryBtn").on("click", tsc.userInformation.doQuery);

        // 设置邮箱
        $("#setMailBtn").on("click", tsc.userInformation.doUptateMail);

        // 设置邮箱
        $("#setQQBtn").on("click", tsc.userInformation.doUptateQQ);

        $("#setPwdBtn").on("click", tsc.userInformation.doUptatePwd);
        $("#updateBtn").on("click", tsc.userInformation.doUptateTel);
    },

    //更新手机号
    doUptateTel: function(){

        $(".page-content-body").load("/myAccount/mobileEdit",null, null);
    },

    //更新邮箱
    doUptateMail: function(){
    	$(".page-content-body").load("/myAccount/emailEdit", null, null);
    },

    //更新邮箱
    doUptateQQ: function(){
        $(".page-content-body").load("/myAccount/qqEdit", null, null);
    },
    //更新密码
    doUptatePwd: function(){
        $(".page-content-body").load("/myAccount/passwordEdit", null, null);
    },

    // 查询
    doQuery: function(){

        $.getJSON("data/userInformation.json", function(rs) {
            // 循环遍历数据
            buildHtmlWithJsonArray('repeat', rs.data, false, false);
        });
    }
};
tsc.userInformation.init();