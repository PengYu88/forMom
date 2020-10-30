tsc.addIndex = {

    // 初始化
    init: function () {

        // 初始化表单验证
        tsc.addIndex.validate();
        //初始化日历控件
        $('.datetimepicker').datetimepicker({
            format : 'YYYY-MM-DD'
        });
    },

    // 表单验证
    validate: function () {
        $("#addIndex-edit-form").validate({
            ignore: ".ignore",
            rules: {

            }
        });
    },

    // 保存
    doSave: function (callBackFunc) {

        // 表单验证
        if (!$("#addIndex-edit-form").valid()) {
            return false;
        }

        // 表单提交
        $('#addIndex-edit-form').ajaxSubmit({
            target: '#addIndex-edit-form',
            dataType: 'json',
            success: function (rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },

};

tsc.addIndex.init();