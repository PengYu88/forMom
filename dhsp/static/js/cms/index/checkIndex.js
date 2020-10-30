tsc.checkIndex = {

    //初始化
    init: function() {


        //表单验证
        tsc.checkIndex.validate();


    },

    //表单验证
    validate: function(){
        //加载数据
        tsc.checkIndex.doQuery();
    },

    //加载数据
    doQuery: function(){

        $.getJSON("data/query_success_detail.json", function(rs){
            //遍历数据
            buildHtmlWithJsonArray('OneData', rs.data, false, false);

        });
    },

    // 保存
    doSave: function (callBackFunc) {

        // 表单验证
        if (!$("#checkIndex-edit-form").valid()) {
            return false;
        }

        // 表单提交
        $('#checkIndex-edit-form').ajaxSubmit({
            target: '#checkIndex-edit-form',
            dataType: 'json',
            success: function (rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },

}

tsc.checkIndex.init();