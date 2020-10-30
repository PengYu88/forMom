
tsc.list = {

    init: function() {

        // 初始化事件绑定
        tsc.list.event();
        //初始化时间控件
        tsc.list.datetimepicker();
        // 查询按钮点击事件
        $("#queryBtn").on("click", tsc.list.doQuery);
        // 初始化翻页
        tsc.list.doPage();
    },

    //定义事件绑定
    event: function() {


    },

    //初始化日历控件
    datetimepicker: function () {
        $('.datetimepicker').datetimepicker({
            format : 'YYYY-MM-DD'
        });
    },
    // 查询
    doQuery: function(page){

        if(page.type){
            page = 1;
        }
        
//        var compName = $("#compName").val();
//        var subCompName = $("#subCompName").val();
//        var validStatus = $("#validStatus").val();
//        var applicationDateStart = $("#applicationDateStart").val();
//        var applicationDateEnd = $("#applicationDateEnd").val();
//		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
//		var pageSize=SYS_CONF.PAGE_SIZE;

////        $.getJSON("/subComp/listData", {"type":type,"status":status,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
//		$.getJSON("/subComp/listData", {"compName":compName,"subCompName":subCompName,"validStatus":validStatus,"applicationDateStart":applicationDateStart,"applicationDateEnd":applicationDateEnd,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
//
//            // 设置翻页总数
//            $('#pager').bootpag({
//                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
//            });
//
//            // 设置数据总条数
//            $("#pager-total").text(rs.total);
//            
//            // 循环遍历数据
//            buildHtmlWithJsonArray('repeat', rs.data, false, false);
//        });
		
		
		// 表单提交
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;
		$('#list-query-form').ajaxSubmit({
			target: '#list-query-form',
			dataType: 'json',
			data: {"currentResult":currentResult,"pageSize":pageSize},
			success: function(rs) {

	            // 设置翻页总数
	            $('#pager').bootpag({
	                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
	                page: page
	            });

	            // 设置数据总条数
	            $("#pager-total").text(rs.total);

	            // 循环遍历数据
	            buildHtmlWithJsonArray('repeat', rs.data, false, false);
			}
		});
    },

    // 翻页
    doPage: function(){

        $('#pager').bootpag({
            total: 1,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){

            // 查询
            tsc.list.doQuery(num);
        });
    },
    
    //审核状态
    getCheckHtml: function (type) {
        if(type=='2'){
            return  '<div class="font-green-meadow">通过</div>';
        }else if(type=='1'){
            return  '<div class="font-yellow-gold">待审核</div>';
        }else{
            return '<div class="font-red-thunderbird">不通过</div>';
        }
    },
    //查看关联企业信息
    info:function (subCompId) {
        $.ajax({
            url: "/subComp/info",
            data:{"subCompId":subCompId},
    		type:"get",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "企业信息",
                    message: data,
                    buttons:{
                        cancel:{
                            label: SYS_MSG.BTN_CANCEL,
                            className: "btn-default",
                        }
                    }
                });
            }
        });
    },
    updateComp: function (subCompId) {
        $.ajax({
            url: "/subComp/updateComp",
            data:{"subCompId":subCompId},
    		type:"get",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "企业信息",
                    message: data,
                    buttons:{
                        save:{
                            label: "通过",
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.updateComp.doSave(function(rs){

                                    if(rs.info = "success"){

                                        // 提示保存成功
                                        sweetAlert({
                                            title: SYS_MSG.MSG_SAVE_SUCCESS,
                                            text: SYS_MSG.MSG_AUOT_CLOSE,
                                            type: 'success',
                                            showConfirmButton: false,
                                            timer: SYS_CONF.ALERT_TIMER,
                                        });

                                        // 重新查询
                                        tsc.list.doQuery(1);

                                        // 关闭对话框
                                        dialog.modal("hide");
                                    }
                                });
                                return false;
                            }
                        },
                        noPass:{
                            label: "不通过",
                            className: "btn-default",
                            callback: function() {

                                // 保存
                                tsc.updateComp.noThrough(function(rs){

                                    if(rs.info = "success"){

                                        // 提示保存成功
                                        sweetAlert({
                                            title: SYS_MSG.MSG_SAVE_SUCCESS,
                                            text: SYS_MSG.MSG_AUOT_CLOSE,
                                            type: 'success',
                                            showConfirmButton: false,
                                            timer: SYS_CONF.ALERT_TIMER,
                                        });

                                        // 重新查询
                                        tsc.list.doQuery(1);

                                        // 关闭对话框
                                        dialog.modal("hide");
                                    }
                                });
                                return false;


                            }
                        },
                        cancel:{
                            label: SYS_MSG.BTN_CANCEL,
                            className: "btn-default",
                        }
                    }
                });
            }
        });
    },

    // 查询
    doSave: function(callBackFunc){
        // 表单验证
        if(!$("").valid()){
            return false;
        }

        // 表单提交
        $('#').ajaxSubmit({
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
tsc.list.init();