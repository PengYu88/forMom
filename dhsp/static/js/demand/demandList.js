tsc.demandList = {
		
	// 初始化
	init: function() {
		
		//初始化日历控件
		$('.datetimepicker').datetimepicker({
			format : 'YYYY-MM-DD'
		});

		// 初始化事件绑定
		tsc.demandList.event();
		tsc.demandList.doInit("/demand/demandListCoal");
	},

	// 定义事件绑定	
	event: function() {
		$("#_sd_form a").on("click", function(){
			$("#_sd_form_content").load($(this).attr("href"));
        });
	},
	
	doInit:function(data){
		$("#_sd_form_content").load(data);
	}
	// 查询
	
	//删除供求
	
	//上架
};

tsc.demandList.init();