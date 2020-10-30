//初始化日历控件
$('.datetimepicker').datetimepicker({
    format : 'YYYY-MM-DD'
});

tsc.QCReprotList = {

    // 初始化
    init: function() {

        // 初始化事件绑定
        tsc.QCReprotList.event();
    },

    // 定义事件绑定
    event: function() {

        // 查询按钮点击事件
        $("#queryBtn").on("click", tsc.QCReprotList.doQuery);
        
    },

    // 查询
    doQuery: function(page){

		if(page == null){
			page = 0;
		}
    	
        if(page.type){
            page = 1;
        }
        
        var type = $("#type").val();
        var status = $("#status").val();
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;
        
        $.getJSON("/comp/listData", {"type":type,"status":status,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
            // 设置翻页
            tsc.QCReprotList.doPage(page, rs.total);

            // 循环遍历数据
            buildHtmlWithJsonArray('repeat', rs.data, false, false);
        });
    },
    // 翻页
    doPage: function(page, total){

        $("[name='role-sd-pager']").bootpag({
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
            tsc.QCReprotList.doQuery(num);
    });
    },
    //审核
    doCheckOut: function(){
        // 提交请求
        sweetAlert({
                title: '是否审核？',
                type: 'warning',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: SYS_MSG.BTN_CONFIRM,
                cancelButtonText: SYS_MSG.BTN_CANCEL,
                closeOnConfirm: false,
            },
            function(isConfirm){
                if (isConfirm) {

                    $.getJSON("data/operation_success.json", function(rs){

                        if(rs.code == "1"){
                            // 提示审核成功
                            sweetAlert({
                                title: '审核成功！',
                                text: SYS_MSG.MSG_AUOT_CLOSE,
                                type: 'success',
                                showConfirmButton: false,
                                timer: SYS_CONF.ALERT_TIMER,
                            });

                        } else {
                            // 提示审核失败
                            sweetAlert({
                                title: rs.desc,
                                text: SYS_MSG.MSG_AUOT_CLOSE,
                                type: 'success',
                                showConfirmButton: false,
                                timer: SYS_CONF.ALERT_TIMER,
                            });
                        }

                        // 重新查询
                        tsc.QCReprotList.doQuery(1);
                    });
                }
            });
    },

};

tsc.QCReprotList.init();