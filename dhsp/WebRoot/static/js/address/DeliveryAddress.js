tsc.DeliveryAddress = {
    
    init: function () {
        
        // 初始化事件绑定
        tsc.DeliveryAddress.event();

        //子账号数据初始化
        tsc.DeliveryAddress.doCountQuery(1);
        
        //翻页
        tsc.DeliveryAddress.doPage();

   },

    // 初始化事件
    event: function () {
        //添加地址
        $("#addBtn").on("click", tsc.DeliveryAddress.doAdd);
    },

  //设置默认地址
    setDefaultAddress: function(deliveryAddressId){
    	$.ajax({
    		url:"address/setDefaultFlag",
    		type:"post",
    		data:{"deliveryAddressId":deliveryAddressId},
    		success: function(data){
				alert("设置成功");
				tsc.DeliveryAddress.doCountQuery(1);
    		}
    	});
    },
    
    //添加地址
    doAdd: function () {
        $.ajax({
            url: "address/addDeliveryAddress",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "添加新地址",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.AddDeliveryAddress.doSave(function(rs){

                                    if(rs.code = "0"){

                                        // 提示保存成功
                                    	alert("保存成功");

                                        // 重新查询
                                        // <子账号>
                                        tsc.DeliveryAddress.doCountQuery(1);

                                        // 关闭对话框
                                        $(".bootbox").remove();
                                        $(".modal-backdrop").remove();
                                    }else {
                                        alert(rs.desc);
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

    //子账号数据查询
    doCountQuery: function(page){
        if(page.type){
            page = 1;
        }
        var currentResult = SYS_CONF.PAGE_SIZE * (page - 1);
		var pageSize = SYS_CONF.PAGE_SIZE;
		
        $.getJSON("address/queryAddress",{"currentResult":currentResult,"pageSize":pageSize}, function(rs) {

            // 设置翻页总数
            $('#Count-pager').bootpag({
                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
                page: page
            });

            // 设置数据总条数
            $("#Count-pager-total").text(rs.total);

            // 循环遍历数据
            buildHtmlWithJsonArray('countRepeat', rs.data, false, false);
        });
    },

    //删除
    doDelet: function(deliveryAddressId){
        // 提交请求
        var result = confirm("确认删除?");

        if (result) {
        	$.ajax({
        		url:"address/deleteAddress",
        		type:"post",
        		data:{"deliveryAddressId" : deliveryAddressId},
        		dataType:"json",
        		success: function(data){
        			console.log(data.code);
        			if (data.code == "0") {
                        // 提示取消成功
                        alert("删除成功");

                    } else {
                        // 提示取消失败
                        alert("删除失败");
                    }
        			tsc.DeliveryAddress.doCountQuery(1);
        		}
        	});
        }
    },
    
    // 翻页
    doPage: function(){

        $('#Count-pager').bootpag({
            total: 1,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){

            // 查询
            tsc.DeliveryAddress.doCountQuery(num);
        });
    },

    //编辑
    doEdit: function (page,deliveryAddressId) {
    	$.ajax({
            url: "address/deliveryAddressEdit",
            data:{"deliveryAddressId" : deliveryAddressId},
            success: function(data){
                var dialog = bootbox.dialog({
                    size: "large",
                    title: "编辑",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.DeliveryAddressEdit.doSave(function(rs){

                                    if(rs.code = "0"){

                                        // 提示保存成功
                                        alert("修改成功");

                                        // 重新查询
                                        // <子账号>
                                        tsc.DeliveryAddress.doCountQuery(1);

                                        // 关闭对话框
                                        $(".bootbox").remove();
                                        $(".modal-backdrop").remove();
                                    }else {
                                        alert(rs.desc);
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

}


tsc.DeliveryAddress.init();