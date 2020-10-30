tsc.editIndex = {

    //初始化
    init: function() {


        //表单验证
        tsc.editIndex.validate();


    },

    //表单验证
    validate: function(){
        //加载数据
        tsc.editIndex.doQuery();
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
        if (!$("#editIndex-edit-form").valid()) {
            return false;
        }

        // 表单提交
        $('#editIndex-edit-form').ajaxSubmit({
            target: '#editIndex-edit-form',
            dataType: 'json',
            success: function (rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },

}

tsc.editIndex.init();