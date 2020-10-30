tsc.info = {

    init: function() {

        // 初始化事件绑定
        tsc.info.event();

    },

    //定义事件绑定
    event: function() {


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
tsc.info.init();