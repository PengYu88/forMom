var checkIndexAttr = 0;
tsc.AttributePopup = {
		
	init: function() {
		
		// 初始化事件绑定
		tsc.AttributePopup.event();
		
		// 初始化分页
		tsc.AttributePopup.doPage();
		
		// 初始化查询
		tsc.AttributePopup.doQuery(1);
	},

	// 定义事件绑定	
	event: function() {
		
		// 查询按钮事件
		$("#-popup-query-form #queryBtn").on("click", tsc.AttributePopup.doQuery);
		
		//全选属性
		$("#allUnboundCheckAttr").on("click",tsc.AttributePopup.doAllUnboundCheckAttr);
	},

	// 查询
	doQuery: function(page){
		
		if(page.type){
			page = 1;
		}

		$.getJSON("data/query_success_page_" + page + ".json", function(rs) {
			
			// 设置翻页总数
			$('#attrunbound-popup-pager').bootpag({
				total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
			});
			
			// 循环遍历数据
			buildHtmlWithJsonArray('attrunbound-popup-repeat', rs.data, true, false);
		});
	},
	
	// 翻页
	doPage: function(){

		$('#attrunbound-popup-pager').bootpag({
			total: 1,
			maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			firstLastUse: true,
			first: SYS_CONF.PAGE_FIRST,
			prev: SYS_CONF.PAGE_PREV,
			next: SYS_CONF.PAGE_NEXT,
			last: SYS_CONF.PAGE_LAST
		}).on("page", function(event, num){
			
			// 查询
			tsc.AttributePopup.doQuery(num);
		});
	},
		
	// 选择
	doSelect: function(callBackFunc){
		var list = [];
		$("#attrunbound-list tbody tr").each(function(){
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
	
	// 全选
	doAllUnboundCheckAttr: function(){
		checkIndexAttr++;
		$("#attrunbound-list tbody tr").each(function(){
			if(checkIndexAttr % 2){
				$(this).find("input[type=checkbox]").attr("checked",true);
			}else{
				$(this).find("input[type=checkbox]").attr("checked",false);
			}
		});
	},
};


$(function(){
	tsc.AttributePopup.init();
});
