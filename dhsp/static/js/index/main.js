component = {};

auth = {};

tsc = {};

main = {
		
	init : function() {
		
		// 初始化事件绑定
		main.bindEvent();
		
		// 加载工作台页面
		$(".page-content-body").load("/content", null, null);
	},

	//定义事件绑定	
	bindEvent : function() {
		
		// 个人信息菜单事件
		// $("#userInfoMenu").on("click", main.doUserInfo);
	},
};

$(function(){
	
    
	//关闭AJAX缓存
	$.ajaxSetup ({
		cache: false 
	});
	
	//加载等待效果,禁止ajax执行过程中的其他页面操作
	/*
	$(document).ajaxStart(function () {
		$().showLoading();
	}).ajaxStop(function () {
		$().hideLoading();
	});
	*/
	
	//防止form多次提交
    $('form').on('submit', function () {
    	$().showLoading();
    });
    
	main.init();
})	
		