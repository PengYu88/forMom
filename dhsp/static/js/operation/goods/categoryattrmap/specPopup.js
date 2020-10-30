var checkIndexSpec = 0;
tsc.SpecPopup = {
    init: function() {
        // 初始化事件绑定
        tsc.SpecPopup.event();
        // 初始化查询
        tsc.SpecPopup.doQuery(1);
    },

    // 定义事件绑定
    event: function() {
        // 查询按钮事件
        $("#-popup-query-form #queryBtn").on("click", tsc.SpecPopup.doQuery);
        
      //全选
		$("#allUnboundCheckSpec").on("click",tsc.SpecPopup.doAllUnboundCheckSpec);
    },

    // 查询
    doQuery: function(page){
        if(page.type){
            page = 1;
        }
        $.getJSON("data/query_success_page_" + "1" + ".json", function(rs) {
            // 循环遍历数据
            buildHtmlWithJsonArray('-popup-repeat', rs.data, true, false);
        });
    },

    // 翻页
    doPage: function(){
        $('#-popup-pager').bootpag({
            total: 1,
            maxVisible: SYS_CONF.PAGE_MAX_SIZE,
            firstLastUse: true,
            first: SYS_CONF.PAGE_FIRST,
            prev: SYS_CONF.PAGE_PREV,
            next: SYS_CONF.PAGE_NEXT,
            last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){
            // 查询
            tsc.SpecPopup.doQuery(num);
        });
    },
    // 选择
    doSelect: function(callBackFunc){
        var list = [];
        $("#specunbound-list tbody tr").each(function(){
            // 已选择
            if($(this).find("input[type=checkbox]").is(':checked')){
                var rowData = "{";
                $(this).find("td").each(function(i){
                    if(i == 0){
                        rowData += '"' + $(this).attr("data-prop") + '":"' + $(this).attr("data-value") + '"';
                    } else {
                        rowData += ', "' + $(this).attr("data-prop") + '":"' + $(this).attr("data-value") + '"';
                    }
                });
                rowData += "}";
                list.push(JSON.parse(rowData));
            }
        });
        callBackFunc({
            code: "0",
            data: list
        });
    },
    
  //全选
    doAllUnboundCheckSpec: function(){
    	checkIndexSpec++;
    	$("#specunbound-list tbody tr").each(function(){
    		if(checkIndexSpec % 2){
    			$(this).find("input[type=checkbox]").attr("checked",true);
    		}else{
    			$(this).find("input[type=checkbox]").attr("checked",false);
    		}
    	});
    },
};


$(function(){
    tsc.SpecPopup.init();
});
