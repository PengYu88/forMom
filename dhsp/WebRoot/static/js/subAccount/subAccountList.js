tsc.subAccountList = {

    // 初始化
    init: function() {
        // 初始化事件绑定
        tsc.subAccountList.event();
      //数据加载
        tsc.subAccountList.doSubAccountQuery(1);
     // 初始化翻页
		tsc.subAccountList.doSubAccountPage();
    },

    //定义绑定事件
    event: function() {

        //新增按钮
        $("#Sub_AddBtn").on("click", tsc.subAccountList.doSubAccountAdd);

        
    },

    // 数据加载
    doSubAccountQuery: function(page){
        if(page.type){
            page = 1;
        }
        var currentResult = SYS_CONF.PAGE_SIZE*(page - 1);
		var pageSize = SYS_CONF.PAGE_SIZE;
		var json = {"currentResult" : currentResult, "pageSize" : pageSize};
        $.getJSON("subAccount/findSubAccountList", json, function(rs) {
         // 设置翻页总数
			$('#Sub_paper').bootpag({
				total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
				page: page
			});
            // 设置数据总条数
			$("#pager-total").text(rs.total);
			
            // 循环遍历数据
            buildHtmlWithJsonArray('Sub_repeat', rs.data, false, false);
        });
    },

    // 翻页
    doSubAccountPage: function(page, total){

        $('#Sub_paper').bootpag({
        	total: 1,
		    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
		    firstLastUse: true,
		    first: SYS_CONF.PAGE_FIRST,
	    	prev: SYS_CONF.PAGE_PREV,
		    next: SYS_CONF.PAGE_NEXT,
		    last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){
            // 查询
            tsc.subAccountList.doSubAccountQuery(num);
        });
    },

    // 审核
    doCheck: function(userId){
        $.ajax({
        	type:"post",
        	data: {userId: userId},
            url: "/subAccount/subAccountCheck",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "审核",
                    message: data,
                    buttons:{
                        pass:{
                            label: "通过",
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.subAccountCheck.doSave(function(rs){

                                    if(rs.code == 0){

                                        // 提示保存成功
                                       alert("审核通过");

                                        // 重新查询
                                        tsc.subAccountList.doSubAccountQuery(1);

                                        // 关闭对话框
                                        dialog.modal("hide");
                                    }else{
                                    	alert("失败");
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
                                tsc.subAccountCheck.noThrough(function(rs){
                                	var json = JSON.parse(rs);
                                    if(json.code == 0){

                                        // 提示保存成功
                                    	alert("审核不通过");

                                        // 重新查询
                                        tsc.subAccountList.doSubAccountQuery(1);

                                        // 关闭对话框
                                        dialog.modal("hide");
                                    }else{
                                    	alert("失败");
                                    }
                                });
                                return false;


                            }
                        },
                        cancel:{
                            label: SYS_MSG.BTN_CANCEL,
                            className: "btn-default",
                            callback: function() {
                                // 关闭对话框
                                $(".bootbox").remove();
                                $(".modal-backdrop").remove();
                            }
                        }
                    }
                });
            }
        });
    },

    //新建
    doSubAccountAdd: function() {
        $.ajax({
        	type: "post",
            url: "/subAccount/subAccountAdd",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "新建",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.subAccountAdd.doSave(function(rs){

                                    if(rs.code == 0){

                                        // 提示保存成功
                                    	alert("保存成功");

                                        // 重新查询
                                        tsc.subAccountList.doSubAccountQuery(1);

                                        // 关闭对话框
                                        dialog.modal("hide");
                                    }else{
                                    	// 提示保存失败
                                    	alert("添加的用户已存在");
									
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


    //查看
    doLookUp: function(userId) {
        $.ajax({
            type:"post",
            data: {userId: userId},
            url: "/subAccount/subAccountEdit",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "查看",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.subAccountEdit.doSave(function(rs){

                                    if(rs.code == 0){

                                    	alert("保存成功");

                                        // 重新查询
                                        tsc.subAccountList.doSubAccountQuery(1);

                                        // 关闭对话框
                                        dialog.modal("hide");
                                    }else{
                                    	alert("保存失败");
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

    //查看(2)
    doView: function(userId) {
        $.ajax({
        	type:"post",
            data: {userId: userId},
            url: "/subAccount/subAccountEdit",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "查看",
                    message: data,
                    buttons:{
                        cancel:{
                            label: SYS_MSG.BTN_CANCEL,
                            className: "btn-default",
                            callback: function() {
                                // 关闭对话框
                                $(".bootbox").remove();
                                $(".modal-backdrop").remove();
                            }
                        }
                    }
                });
            }
        });
    },
    

    //重置密码
    doPassWord: function (userId, mobileNo) {

        var result = confirm('是否重置');
        if(result){
            $.getJSON("/subAccount/resetPassword", {"userId" : userId, "mobileNo" : mobileNo}, function(rs){

                if(rs.code == 0){
                    alert("重置成功");
                }else {
                    alert("重置失败");
                }
            });

        }else{

        }
    },


    //移除
    doRemove: function(userId){
        // 提交请求
    	var result = confirm('是否移除');
                if (result) {
                    $.getJSON("/subAccount/removeAccount", {"userId" : userId}, function(rs){

                        if(rs.code == 0){
                            // 提示移除成功
                        	alert("移除成功");
                        } else {

                            // 提示移除失败
                        	alert("移除失败");
                        }

                        // 重新查询
                        tsc.subAccountList.doSubAccountQuery(1);
                    });
                }
    },

    //删除
    doDelet: function(userId){
        // 提交请求
    	var result = confirm('是否删除');
                if (result) {
                    $.getJSON("/subAccount/deleteAccount", {"userId" : userId}, function(rs){

                        if(rs.code == 0){
                            // 提示删除成功
                        	alert("删除成功");

                        } else {

                            // 提示删除失败
                        	alert("删除失败");
                        }

                        // 重新查询
                        tsc.subAccountList.doSubAccountQuery(1);
                    });
                }
    },

};

tsc.subAccountList.init();