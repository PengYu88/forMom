component = {};

auth = {};

tsc = {};

main = {
		
	init : function() {
		// 初始化事件绑定
		main.bindEvent();
		// 加载工作台页面
		$(".page-content-body").load("/contentDefault", null, null);
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
		cache: false, 
        error: function(jqXHR, textStatus, error) {
            switch (jqXHR.status) {
                case 400: // 错误请求，如语法错误
                case 405: // 用户在Request-Line字段定义的方法不允许
                case 415: // 请求资源不支持请求项目格式
                        alert('40x错误');
                    break;
                case 401: // 请求授权失败，既登录失败
                        alert('登录失败');
                    break;
                case 403: // 请求不允许，无访问权限，Session过期
                        alert('跳转到登录页');
                    break;
                case 404: // 没有发现文件、查询或URl
                    alert('找不到页面');
                    break;
                case 413: // 请求的资源大于服务器允许的大小
                    alert('文件大小超过服务器限制');
                    break;
                case 500: // 服务器产生内部错误
                        alert('服务器内部错误');
                    break;
                default:
                    var response = $.parseJSON(jqXHR.responseText);
                    if(response) {
                        alert('未知错误:' + response.desc);
                    }
                    break;
            }
        }
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
		