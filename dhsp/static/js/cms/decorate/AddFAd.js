tsc.AddFAd = {

    init: function() {

        // 初始化事件绑定
        tsc.AddFAd.event();

        //初始化校验
        tsc.AddFAd.validate();

        //初始化日历控件
        $('.datetimepicker').datetimepicker({
            format : 'YYYY-MM-DD HH:mm:ss'
        });
    },

    //定义事件绑定
    event: function() {

    },

    // 提交表单刷新页面
    doSubmit: function(){

    },

    //表单验证
    validate: function(){
        $("#-Add-form").validate({
            ignore: ".ignore",
            rules: {
                column1: {
                    required: true
                },
                column2: {
                    required: true
                },
                column3: {
                    required: true
                },
                column5: {
                    required: true
                }
            },
        });
    },

    // 表单提交
    doSave: function(callBackFunc){

        // 表单验证
        if(!$("#-Add-form").valid()){
            return false;
        }

        // 表单提交
        $('#-Add-form').ajaxSubmit({
            target: '#-Add-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    }

};


// 初始化
tsc.AddFAd.init();