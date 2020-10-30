tsc.updateComp = {

    init: function() {

        // 初始化事件绑定
        tsc.updateComp.event();
        //初始化表单验证
        tsc.updateComp.validate();


    },

    //定义事件绑定
    event: function() {


    },

    // 表单验证
    validate: function(){
        $("#Auditing-form").validate({
            rules: {
            	rejecteReason: {
                    required: true
                }
            }
        });
    },
    // 表单提交(通过)
    doSave: function(callBackFunc){
		var subCompId = $("#subCompId").val();
		var rejecteReason = $("#rejecteReason").val();
    	$.ajax({
    		data: {"subCompId": subCompId, "rejecteReason": rejecteReason},	
    		url: "/subComp/verify",
    		type: "post",
			success: function(rs) {
				callBackFunc(rs);
			}
    	});
		return false;
	},
    // 表单提交(不通过)
	noThrough: function(callBackFunc){
        // 表单验证
        if(!$("#Auditing-form").valid()){
            return false;
        }
		var subCompId = $("#subCompId").val();
		var rejecteReason = $("#rejecteReason").val();
    	$.ajax({
    		data: {"subCompId": subCompId, "rejecteReason": rejecteReason},	
    		url: "/subComp/unVerify",
    		type: "post",
			success: function(rs) {
				callBackFunc(rs);
			}
    	});
		return false;
	},
    //显示图片
    doViewPhoto: function(obj){

        var imgTitle = $(obj).find("img").attr("alt");
        var url = $(obj).find("img").attr("src");

        $.ajax({
            url: "/subComp/photoView",
            data: {
                "url": url
            },
            success: function(data){
                var dialog = bootbox.dialog({
                    size: "large",
                    title: imgTitle,
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
    }







};
// 初始化
tsc.updateComp.init();