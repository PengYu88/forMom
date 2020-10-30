
tsc.EditAd = {

    init: function() {

        // 初始化事件绑定
        tsc.EditAd.event();

        //初始化校验
        tsc.EditAd.validate();

        tsc.EditAd.doQuery(1);
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
    // 查询
    doQuery: function(page){

        if(page.type){
            page = 1;
        }

        $.getJSON("data/query_success_page_" + page + ".json", function(rs) {

            tsc.EditAd.doPage(page, rs.total);
            // 循环遍历数据
            buildHtmlWithJsonArray("productRepeat", rs.data, false, false);
        });
    },

    doPage: function(page, total){

        $('#product-pager').bootpag({
            total: Math.ceil(total / SYS_CONF.PAGE_SIZE),
            page: page,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){
            // 查询
            tsc.EditAd.doQuery(num);
        });
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
    		    }
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