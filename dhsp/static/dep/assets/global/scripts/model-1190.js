$(function() {

	// 初始化模态框宽度设置
	$(".modal-lg").css({
		width: 1190
	});

	// 初始化模态框内容部分增加纵向滚动条
	$(".modal-lg .bootbox-body").slimScroll({
		height: ($(window).height() - SYS_CONF.DIALOG_CONTENT_HEIGHT)
	});
});