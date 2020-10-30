tsc.EnterpriseWebsite = {

    // 初始化
    init: function () {

        // 初始化事件绑定
        tsc.EnterpriseWebsite.event();

        //企业档案表单验证
        tsc.EnterpriseWebsite.validate();

        tsc.EnterpriseWebsite.doDevPage();

        tsc.EnterpriseWebsite.doIntelPage();

        tsc.EnterpriseWebsite.doDynamicPage();

    },

    //定义绑定事件
    event: function () {

        // 设置分类
        $("#setCataBtn").on("click", tsc.EnterpriseWebsite.doCata);

        // 设置模板
        $("#setModelBtn").on("click", tsc.EnterpriseWebsite.doModel);

        //确认发布
        $("#saveBtn").on("click", tsc.EnterpriseWebsite.doSubmit);

        // 新建动态
        $("#addDynamic").on("click", tsc.EnterpriseWebsite.doAddDynamic);

        // 新增历程
        $("#addDev").on("click", tsc.EnterpriseWebsite.doAddDev);

        // 新增资质
        $("#addIntel").on("click", tsc.EnterpriseWebsite.doAddIntel);

        // logo上传
        fileUpload({
            swf:'static/dep/uploadify/uploadify.swf',
            uploadId:"uploadify11",
            imgId:"uploadPicPath11",
            filePathId:"contractImageUrl11",
            webFilePath: SYS_CONF.WEB_FILE_PATH,
            fileType:"*.gif; *.jpg; *.png;",
            contextPath:"",
            callback: function(status,localFile, resp, logo){
                tsc.EnterpriseWebsite.uploadSuccess(status,localFile, resp, logo);
            }
        });

        // logo上传
        fileUpload({
            swf:'static/dep/uploadify/uploadify.swf',
            uploadId:"uploadify22",
            imgId:"uploadPicPath22",
            filePathId:"contractImageUrl22",
            webFilePath: SYS_CONF.WEB_FILE_PATH,
            fileType:"*.gif; *.jpg; *.png;",
            contextPath:"",
            callback: function(status,localFile, resp, bg){
                tsc.EnterpriseWebsite.uploadSuccess(status,localFile, resp, bg);
            }
        });

        //初始化企业动态
        tsc.EnterpriseWebsite.doDynamicQuery(1);

        //初始化发展历程
        tsc.EnterpriseWebsite.doDevQuery(1);

        //初始化企业资质
        tsc.EnterpriseWebsite.doIntelQuery(1);
    },

    // logo上传
    uploadSuccess: function(status,localFile, resp, logo){

        var resp = $.parseJSON(resp);
        if(resp && resp.resultCode == 4){

            var filePaths = resp.filePaths;//文件查看路径
            var originalFileNames = resp.originalFileNames;//原文件名
            var fileType=localFile.type.toLowerCase();
            //for(var i=0;i<filePaths.length;i++){
            if(fileType=='.jpg'||fileType=='.bmp'||fileType=='.gig'||fileType=='.png'||fileType=='.tif'||fileType=='.rgb'||fileType=='.dib'||fileType=='.eps'||fileType=='.jpe'||fileType=='.pcx'||fileType=='.bmp'||fileType=='.gif'||fileType=='.pdf'){

                // 初始化
                $(".img-box").remove();

                if(logo){
                    $("#contractImageUrl11").html("");
                }else {
                    $("#contractImageUrl22").html("");
                }

                var str = '<div class="img-box"><img src="' + SYS_CONF.WEB_FILE_PATH + '/' + filePaths[0] + '" width="100%"/></div>';
                var pathSrc ='<input type="hidden" name="imageUrl" value="' + filePaths[0] +'">';
                $(".uploadifyp").before(str)

                if(logo){
                    $("#contractImageUrl11").append(pathSrc);
                }else {
                    $("#contractImageUrl22").append(pathSrc);
                }
            }

        }else{
            alert(resp.resultMsg);
        }
    },

    //////////////////////////////////////1: 企业档案/////////////////////////////////////


    //设置分类信息
    doCata: function () {

        $.ajax({
            url: "html/enterpriseInformation/enterpriseWebsite/setCata.html",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "分类管理",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.doCata.doSave(function(rs){

                                    if(rs.code = "0"){

                                        // 提示保存成功
                                        alert("保存成功");

                                        // 重新查询
                                        //tsc..doQuery(1);

                                        // 关闭对话框
                                        $(".bootbox").remove();
                                        $(".modal-backdrop").remove();
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

    //设置模板
    doModel: function(){

        $.ajax({
            url: "html/enterpriseInformation/enterpriseWebsite/SetModel.html",
            success: function(data){
                var dialog = bootbox.dialog({
                    size: "large",
                    title: "模板管理",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.SetModel.doSave(function(rs){

                                    if(rs.code = "0"){

                                        // 提示保存成功
                                        alert("保存成功");

                                        $("#modelName").html("模板名称");

                                        $("#modelBg").css({"background-color":"blue"});

                                        // 关闭对话框
                                        dialog.modal("hide");
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
                        }
                    }
                });
            }
        });
    },

    //表单验证
    validate: function(){

        $("#-edit-form").validate({
            ignore: ".ignore",
            rules: {
                column1: {
                    maxlength: 300
                }
            }
        });
    },

    //确认发布
    doSubmit: function () {

        // 表单验证
        if(!$("#-edit-form").valid()){
            return false;
        }

        var result = confirm('确认保存?');

        if(result) {
            // 表单提交
            $('#-edit-form').ajaxSubmit({
                target: '#-edit-form',
                dataType: 'json',
                success: function (rs) {

                    if (rs.code = "0") {

                        // 提示保存成功
                        alert("保存成功");
                    } else {

                        alert(rs.desc);

                    }

                }
            });
        }
        return false;
    },


    //////////////////////////////////////2:企业动态/////////////////////////////////////

    //企业动态数据
    doDynamicQuery: function(page){
        if(page.type){
            page = 1;
        }

        $.getJSON("data/query_success.json", function(rs) {

            // 设置翻页总数
            $('#Dynamic-pager').bootpag({
                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
                page: page
            });

            // 设置数据总条数
            $("#Dynamic-pager-total").text(rs.total);

            // 循环遍历数据
            buildHtmlWithJsonArray('dynamicRepeat', rs.data, false, false);
        });
    },

    // 翻页
    doDynamicPage: function(){

        $('#Dynamic-pager').bootpag({
            total: 1,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){

            // 查询
            tsc.EnterpriseWebsite.doDynamicQuery(num);
        });
    },

    // 新建动态
    doAddDynamic: function(){

        $.ajax({
            url: "html/enterpriseInformation/enterpriseWebsite/AddRelated.html",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "企业动态",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.AddRelated.doSave(function(rs){

                                    if(rs.code = "0"){

                                        // 提示保存成功
                                        alert("保存成功");

                                        // 重新查询
                                        tsc.EnterpriseWebsite.doDynamicQuery(1);

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

    //删除动态
    doDynamicDelet: function(){
        // 提交请求
       var result = confirm("确认删除?");

            if (result) {
                $.getJSON("data/operation_success.json", function (rs) {

                    if (rs.code == "0") {
                        // 提示取消成功
                        alert("删除成功");

                    } else {

                        // 提示取消失败
                        alert(rs.desc);
                    }

                    // 重新查询
                    tsc.EnterpriseWebsite.doDynamicQuery(1);
                });
            }
    },
    //////////////////////////////////////3:发展历程/////////////////////////////////////


    //发展历程
    doDevQuery: function(page){
        if(page.type){
            page = 1;
        }

        $.getJSON("data/query_success.json", function(rs) {

            // 设置翻页总数
            $('#Dev-pager').bootpag({
                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
                page: page
            });

            // 设置数据总条数
            $("#Dev-pager-total").text(rs.total);
            // 循环遍历数据
            buildHtmlWithJsonArray('devRepeat', rs.data, false, false);
        });
    },

    // 翻页
    doDevPage: function(){

        $('#Dev-pager').bootpag({
            total: 1,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){

            // 查询
            tsc.EnterpriseWebsite.doDevQuery(num);
        });
    },

    // 新建历程
    doAddDev: function(){

        $.ajax({
            url: "html/enterpriseInformation/enterpriseWebsite/AddRelated.html",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "发展历程",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.AddRelated.doSave(function(rs){

                                    if(rs.code = "0"){

                                        // 提示保存成功
                                        alert("保存成功");

                                        // 重新查询
                                        tsc.EnterpriseWebsite.doDevQuery(1);

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

    //删除历程
    doDevDelet: function(){
        // 提交请求
        var result = confirm('确认删除?');

        if(result){
            $.getJSON("data/operation_success.json", function(rs){

                if(rs.code == "0"){
                    // 提示取消成功
                    alert("删除成功");

                } else {

                    // 提示取消失败
                    alert(re.desc);
                }

                // 重新查询
                tsc.EnterpriseWebsite.doDevQuery(1);
            });
        }
    },


    /////////////////////////////////////4:/企业资质/////////////////////////////////////

    //企业资质
    doIntelQuery: function(page){
        if(page.type){
            page = 1;
        }

        $.getJSON("data/query_success.json", function(rs) {

            // 设置翻页总数
            $('#Intel-pager').bootpag({
                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
                page: page
            });

            // 设置数据总条数
            $("#Intel-pager-total").text(rs.total);

            // 循环遍历数据
            buildHtmlWithJsonArray('IntelRepeat', rs.data, false, false);
        });
    },

    // 翻页
    doIntelPage: function(){

        $('#Intel-pager').bootpag({
            total: 1,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){

            // 查询
            tsc.EnterpriseWebsite.doIntelQuery(num);
        });
    },

    // 新建资质
    doAddIntel: function(){

        $.ajax({
            url: "html/enterpriseInformation/enterpriseWebsite/AddIntel.html",
            success: function(data){

                var dialog = bootbox.dialog({
                    size: "large",
                    title: "企业资质",
                    message: data,
                    buttons:{
                        save:{
                            label: SYS_MSG.BTN_SAVE,
                            className: "btn-success",
                            callback: function() {

                                // 保存
                                tsc.AddIntel.doSave(function(rs){

                                    if(rs.code = "0"){

                                        // 提示保存成功
                                        alert("保存成功");

                                        // 重新查询
                                        tsc.EnterpriseWebsite.doIntelQuery(1);

                                        // 关闭对话框
                                        $(".bootbox").remove();
                                        $(".modal-backdrop").remove();
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

    //删除资质
    doIntelDelet: function(){

        // 提交请求
        var result = confirm('确认删除?');

        if(result){
            $.getJSON("data/operation_success.json", function(rs){

                if(rs.code == "0"){
                    // 提示取消成功
                    alert("删除成功");

                } else {

                    // 提示取消失败
                    alert(rs.desc);
                }

                // 重新查询
                tsc.EnterpriseWebsite.doIntelQuery(1);
            });
        }
    },

    //显示图片
    doViewPhoto: function(obj){

        var imgTitle = $(obj).find("img").attr("alt");
        var imgUrl = $(obj).find("img").attr("src");

        $.ajax({
            url: "html/enterpriseInformation/enterpriseWebsite/PhotoView.html",
            data: {
                imgUrl: imgUrl
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
    },

}

tsc.EnterpriseWebsite.init();