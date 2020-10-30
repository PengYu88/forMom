tsc.ImportQuotation = {

    // 初始化
    init: function () {

        // 初始化表单验证
        tsc.ImportQuotation.validate();

    },

    // 表单验证
    validate: function () {
        $("#ImportQuotation-edit-form").validate({
            ignore: ".ignore",
            rules: {

            }
        });
    },

    // 保存
    doSave: function (callBackFunc) {

        // 表单验证
        if (!$("#ImportQuotation-edit-form").valid()) {
            return false;
        }

        // 表单提交
        $('#ImportQuotation-edit-form').ajaxSubmit({
            target: '#ImportQuotation-edit-form',
            dataType: 'json',
            success: function (rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },

};

tsc.ImportQuotation.init();