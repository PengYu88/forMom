
tsc.AddPAd = {

    init: function() {

        // 初始化事件绑定
        tsc.AddPAd.event();

        //初始化校验
        tsc.AddPAd.validate();

        tsc.AddPAd.doQuery(1);
        //初始化日历控件
        $('.datetimepicker').datetimepicker({
            format : 'YYYY-MM-DD HH:mm:ss'
        });
        tsc.AddPAd.getGrade2Id();
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

            tsc.AddPAd.doPage(page, rs.total);
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
            tsc.AddPAd.doQuery(num);
        });
    },
    //表单验证
    validate: function(){
        $("#-Add-form").validate({
            ignore: ".ignore",
            rules: {
                column1: {
                    required: true
                },
                column2: {
                    required: true
                },
                column3: {
                    required: true
                },
                column5: {
                    required: true
                }
            },
        });
    },

    // 表单提交
    doSave: function(callBackFunc){

        // 表单验证
        if(!$("#-Add-form").valid()){
            return false;
        }

        // 表单提交
        $('#-Add-form').ajaxSubmit({
            target: '#-Add-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },
	getGrade1Id:function(){
		var goodsCategoryGrade1Id=$("#goodsCategoryGrade1Id").find("option:selected").attr("value");
		console.log(goodsCategoryGrade1Id);
		$.ajax({
			url: "/operation/goods/category/findCategoryByIndustryId",
			data: {"id":goodsCategoryGrade1Id},
			dataType:"json",
			type: 'GET',
			success: function(rs){
				$( " #goodsCategoryGrade1Id").empty();
				$( " #goodsCategoryGrade1Id").prepend("<option value=''>请选择</option>");
				for(var i=0;i<rs.data.length;i++){
					$(" #goodsCategoryGrade1Id").append("<option value='" + rs.data[i].goodsCateId + "' >" + rs.data[i].goodsCateName + "</option>");
				};
			}
		});
	},
	getGrade2Id:function(){
		var goodsCategoryGrade1Id=$("#goodsCategoryGrade1Id").find("option:selected").attr("value");
		console.log(goodsCategoryGrade1Id);
		$.ajax({
			url: "/operation/goods/category/findNextChildens",
			data: {"id":goodsCategoryGrade1Id},
			dataType:"json",
			type: 'GET',
			success: function(rs){
				$( " #goodsCategoryGrade1Id").empty();
				$( " #goodsCategoryGrade1Id").prepend("<option value=''>请选择</option>");
				for(var i=0;i<rs.data.length;i++){
					$(" #goodsCategoryGrade1Id").append("<option value='" + rs.data[i].goodsCateId + "' >" + rs.data[i].goodsCateName + "</option>");
				};
			}
		});
	}


};


// 初始化
tsc.AddPAd.init();