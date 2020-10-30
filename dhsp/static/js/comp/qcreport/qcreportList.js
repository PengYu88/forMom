tsc.qcreportList = {

    // 初始化
    init: function() {

        // 初始化事件绑定
        tsc.qcreportList.event();

        tsc.qcreportList.doPage();
        
        
        $('.datetimepicker').datetimepicker({
            format : 'YYYY-MM-DD'
        });
        
		tsc.qcreportList.selectDoClass("qcTypeSearch");
		tsc.qcreportList.selectDoClass("qcStatusSearch");
    },

    // 定义事件绑定
    event: function() {

        // 查询按钮点击事件
        $("#queryBtn").on("click", tsc.qcreportList.doQuery);

    },
    //selectDoClass
    selectDoClass:function (name) {
    	var inputName = "#" + name;
    	$(inputName).attr("class","form-control");
    },
    // 查询
    doQuery: function(page){
    	
        if(page.type){
            page = 1;
        }
        var type = $("#qcTypeSearch").val();
        var status = $("#qcStatusSearch").val();
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;
        
        $.getJSON("/comp/qcreport/listData", {"type":type,"status":status,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
        	// 设置翻页总数
            $('#pager').bootpag({
                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
                page: page
            });

            // 设置数据总条数
            $("#pager-total").text(rs.total);

            // 循环遍历数据
            var rowIndexOffset = currentResult;
            buildHtmlWithJsonArray('repeat', rs.data, false, false, rowIndexOffset);
        });
    },
    // 翻页
    doPage: function(){

        $("#pager").bootpag({
            total: 1,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){

            // 查询
            tsc.qcreportList.doQuery(num);
    });
    },
    
    //查看详情
    doInfo:function(qcreportId){
    	
        $.ajax({
            url: "/comp/qcreport/qcreportInfo",
    		data:{"qcreportId":qcreportId},
    		type:"get",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "查看详情",
                    message: data,
                    buttons:{
                        cancel:{
                            label: "确认",
                            className: "btn-default",
                        }
                    }
                });
            }
        });
    },

    doCheckOut: function(qcreportId){
    	$.ajax({
			url: "/comp/qcreport/qcreportUpdate",
			data:{"qcreportId":qcreportId},
			type:"get",
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "查看详情",
					message: data,
					buttons:{
						confirm:{
							label: "确认",
							className: "btn-success",
							callback: function() {
								
								// 保存
								tsc.qcreportUpdate.confirm(function(rs){

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
										tsc.qcreportList.doQuery(1);
										
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
    }

};

tsc.qcreportList.init();