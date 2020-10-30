tsc.EditAd = {

    init: function() {

        // 初始化事件绑定
        tsc.EditAd.event();

        //初始化校验
        tsc.EditAd.validate();

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
        $("#-edit-form").validate({
            ignore: ".ignore",
            rules: {
            	name: {
                    required: true
                },
    		    sort: {
    				required: true
    			},
                startTime: {
                    required: true
                },
                endTime: {
                    required: true
                },
            },
        });
    },

    // 表单提交
    doSave: function(callBackFunc){

        // 表单验证
        if(!$("#-edit-form").valid()){
            return false;
        }

        // 表单提交
        $('#-edit-form').ajaxSubmit({
            target: '#-edit-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    }

};


// 初始化
tsc.EditAd.init();