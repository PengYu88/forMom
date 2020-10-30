tsc.NewsCenter = {

    init: function () {

        //初始化绑定事件
        tsc.NewsCenter.event();

        //查询数据
        tsc.NewsCenter.doQuery(1);

        tsc.NewsCenter.doPage();
        
    },

    event: function () {



    },

    //发展资质
    doQuery: function(page){
        if(page.type){
            page = 1;
        }
        
        var currentResult = SYS_CONF.PAGE_SIZE * (page - 1);
		var pageSize = SYS_CONF.PAGE_SIZE;

        $.getJSON("messageCenter/findMessageList",{"currentResult":currentResult,"pageSize":pageSize}, function(rs) {

            // 设置翻页总数
            $('#pager').bootpag({
                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
                page: page
            });

            // 设置数据总条数
            $("#pager-total").text(rs.total);

            // 循环遍历数据
            buildHtmlWithJsonArray('newsRepeat', rs.data, false, false);
        });
        //查未读消息
        tsc.NewsCenter.queryUnReadNotice();
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
            tsc.NewsCenter.doQuery(num);
            tsc.NewsCenter.queryUnReadNotice();
        });
    },

    //查询未读消息
    queryUnReadNotice: function(){
    	$.getJSON("messageCenter/queryUnReadNum",function(rs){
    		console.log(rs.data);
    	});
    },
    //删除历程
    doNewsDelet: function(){
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

}

tsc.NewsCenter.init();