<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>大华食品批发订单管理系统</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="static/dep/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="static/dep/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
<link href="static/dep/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="static/dep/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGIN STYLES -->
<link href="static/dep/assets/global/plugins/jstree/dist/themes/default/style.min.css" rel="stylesheet" type="text/css"/>
<link href="static/dep/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
<link href="static/dep/assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css"/>
<link href="static/dep/assets/global/plugins/morris/morris.css" rel="stylesheet" type="text/css">
<link href="static/dep/assets/global/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css" />
<link href="static/dep/assets/global/plugins/bootstrap-toastr/toastr.min.css" rel="stylesheet" type="text/css" />
<!-- END PAGE LEVEL PLUGIN STYLES -->
<!-- BEGIN PAGE STYLES -->
<!-- END PAGE STYLES -->
<!-- BEGIN THEME GLOBAL STYLES -->
<!-- DOC: To use 'rounded corners' style just load 'components-rounded.css' stylesheet instead of 'components.css' in the below style tag -->
<link href="static/dep/assets/global/css/components.min.css" rel="stylesheet" type="text/css"/>
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="static/dep/assets/layouts/layout4/css/layout.css" rel="stylesheet" type="text/css" />
<link href="static/dep/assets/layouts/layout4/css/themes/default.css" rel="stylesheet" type="text/css" />
<link href="static/dep/assets/layouts/layout4/css/custom.min.css" rel="stylesheet" type="text/css" />
<link href="jquery.datetimepicker.css" rel="stylesheet" type="text/css" />
<!-- END THEME LAYOUT STYLES -->


<!-- 日期控件 样式 -->
<!-- <link href="static/dep/assets/global/plugins/bootstrap-datetimepicker-eonasdan/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"/> -->

<!-- 提示框 样式 -->
<link rel="stylesheet" href="static/dep/assets/global/plugins/sweetalert/sweetalert.css"/>

<!-- 自定义全局 样式 -->
<link rel="stylesheet" href="static/dep/assets/global/css/global.css"/>


<link rel="stylesheet" href="static/dep/assets/global/css/demo.css"/>
<link rel="stylesheet" href="static/dep/assets/global/css/prettify.css"/>

<link rel="shortcut icon" href="favicon.ico"/>
</head>
<body>
	<!-- BEGIN HEADER -->
	<div class="page-top">
	</div>
	<div class="page-header navbar navbar-static-top height-100 bg-top">
	    <!-- BEGIN HEADER INNER -->
	    <div class="page-header-inner container">
	        <div class="row">
	        	<div class="col-xs-2" style="padding-top: 5px">
	            	<a href="#"><h4>大华食品批发订单管理系统</h4></a>
	            </div>
	        	<div class="col-xs-10">
	        		<div class="page-actions">
						<ul class="nav nav-pills">
							<li class="active">
								<a href="#" data-toggle="tab">我的工作台</a>
							</li>
							<li>
								<a href="#" data-toggle="tab">支付结算</a>
							</li>
						</ul>
					</div>
	        	</div>
	        </div>
	    </div>
	    <!-- END HEADER INNER -->
	</div>
	<!-- END HEADER -->
	<div class="clearfix">
	</div>
	<!-- BEGIN CONTAINER -->
	<div class="container">
		<div class="page-container">
		    <!-- BEGIN SIDEBAR -->
		    <div class="page-sidebar-wrapper">
		        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		        <div class="page-sidebar navbar-collapse collapse">
		            <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
		               <li class="nav-item active open">
		                   <a href="javascript:;" class="nav-link nav-toggle">
		                       <span class="title">票据管理</span>
		                       <span class="selected"></span>
		                       <span class="arrow open"></span>
		                   </a>
		                   <ul class="sub-menu">
		                       <li class="nav-item">
		                           <a href="ReceiptList.action" class="nav-link nav-toggle ajaxify">
		                               <span class="title">票据打印</span>
		                           </a>
		                       </li>
		                       <li class="nav-item">
		                           <a href="queryOrder.action" class="nav-link nav-toggle ajaxify">
		                               <span class="title">对账/批量票据打印</span>
		                           </a>
  		                       </li>
  		                       <li class="nav-item">
		                           <a href="queryHistoryOrder.action" class="nav-link nav-toggle ajaxify">
		                               <span class="title">历史订单</span>
		                           </a>
		                       </li>
		                   </ul>
		               </li>  
		               <li class="nav-item active open">
		                   <a href="javascript:;" class="nav-link nav-toggle">
		                       <span class="title">基础信息</span>
		                       <span class="arrow open"></span>
		                   </a>
		                   <ul class="sub-menu">
		                       <li class="nav-item">
		                           <a href="queryItems.action" class="nav-link nav-toggle ajaxify">
		                               <span class="title">商品管理</span>
		                           </a>
		                       </li>
		                       <li class="nav-item">
		                           <a href="queryClient.action" class="nav-link nav-toggle ajaxify">
		                               <span class="title">客户管理</span>
		                           </a>
		                       </li>
		                   </ul>
		               </li>
		               <li class="nav-item active open">
		                   <a href="https://www.baidu.com" class="nav-link nav-toggle">
		                       <span class="title">库存管理</span>
		                       <span class="arrow open"></span>
		                   </a>
		                   <ul class="sub-menu">
		                       <li class="nav-item">
		                           <a href="https://www.baidu.com" class="nav-link nav-toggle ajaxify">
		                               <span class="title">商品入库</span>
		                           </a>
		                       </li>
		                       <li class="nav-item">
		                           <a href="html/product/list/productList.html" class="nav-link nav-toggle ajaxify">
		                               <span class="title">商品出库</span>
		                           </a>
		                       </li>
		                       <li class="nav-item">
		                           <a href="#" class="nav-link nav-toggle ajaxify">
		                               <span class="title">库存盘点</span>
		                           </a>
		                       </li>
		                   </ul>
		               </li>
		            </ul>
		            <!-- END SIDEBAR MENU -->
		        </div>
		    </div>
		    <!-- END SIDEBAR -->
		    <!-- BEGIN CONTENT -->
		    <div class="page-content-wrapper">
		        <div class="page-content">
		            <!-- BEGIN PAGE CONTENT INNER -->
		            <div class="page-content-body" style="margin-top: -10px">
		            	<img src="welcome2.jpg" height="465px" width="1000px">
		            </div>
		            <!-- END PAGE CONTENT INNER -->
		        </div>
		    </div>
		    <!-- END CONTENT -->
		</div>
	</div>
	<div class="page-bottom">
	</div>
</body>
<!-- END BODY -->

<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="static/dep/assets/global/plugins/respond.min.js"></script>
<script src="static/dep/assets/global/plugins/excanvas.min.js"></script> 
<script src="static/dep/assets/global/plugins/ie8.fix.min.js"></script> 
<script src="static/dep/assets/global/scripts/es5-shim.min.js"></script> 
<script src="static/dep/assets/global/scripts/es5-sham.min.js"></script> 
<script src="static/dep/assets/global/scripts/es6-promise.min.js"></script> 
<![endif]-->
<script src="static/dep/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="static/dep/assets/global/plugins/icheck/icheck.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jstree/dist/jstree.min.js" type="text/javascript"></script>  
<script src="static/dep/assets/global/plugins/jquery-bootpag/jquery.bootpag.js" type="text/javascript"></script>
<!-- 日期控件 -->
<script src="static/dep/assets/global/plugins/moment.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>

<script src="static/dep/assets/global/plugins/moment-with-locales.min.js" type="text/javascript"></script>
<!-- <script src="static/dep/assets/global/plugins/bootstrap-datetimepicker-eonasdan/bootstrap-datetimepicker.min.js" type="text/javascript"></script> -->

<script src="static/dep/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="static/dep/assets/global/scripts/app.min.js" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="static/dep/assets/layouts/layout4/scripts/layout.js" type="text/javascript"></script>
<script src="static/dep/assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
<script src="static/dep/assets/layouts/global/scripts/quick-nav.min.js" type="text/javascript"></script>
<!-- END THEME LAYOUT SCRIPTS -->

<!-- JS语言定数设置 -->
<script src="static/dep/assets/global/scripts/message.js" type="text/javascript"></script>

<!-- 系统定数设置 -->
<script src="static/dep/assets/global/scripts/config.js" type="text/javascript" ></script>

<!-- 文件上传插件 -->
<script src="static/dep/upload.js" type="text/javascript"></script>  
<script src="static/dep/uploadify/jquery.uploadify.js" type="text/javascript"></script>

<!-- 提示框控件 -->
<script src="static/dep/assets/global/plugins/sweetalert/sweetalert.min.js" type="text/javascript"></script>

<!-- js 表单控件 -->
<script src="static/dep/assets/global/plugins/jquery.form.js" type="text/javascript"></script>

<!-- js 校验工具类 -->
<script src="static/dep/assets/global/plugins/jquery-validation/js/jquery.bootstrap.validate.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jquery-validation/js/jquery.validate.method.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jquery-validation/js/localization/messages_zh.js" type="text/javascript"></script>

<!-- Form格式化JSON -->
<script src="static/dep/assets/global/plugins/jquery-serialize-json/jquery.serializejson.min.js" type="text/javascript"></script>

<!-- 循环遍历组件 -->
<script src="static/dep/htmlBuilder.js" type="text/javascript"></script>
<script src="static/dep/htmlBuilderHelper.js" type="text/javascript"></script>

<!-- 日期格式化插件 -->
<script src="static/dep/assets/global/plugins/dateFormat.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jquery.dateFormat.js" type="text/javascript"></script>

<script src="jquery.datetimepicker.full.js" type="text/javascript"></script>


    <script src="static/js/prettify.js" type="text/javascript"></script>
 
    <script src="static/js/mockjax.js" type="text/javascript"></script>
    <!-- <script src="static/js/bootstrap-typeahead.js" type="text/javascript"></script> -->
    <script src="static/js/bootstrap3-typeahead.js" type="text/javascript"></script>

<script type="text/javascript">
	var CONTENT_PAGE = '';
</script>

<script src="main.js" type="text/javascript"></script>
<!-- END JAVASCRIPTS -->
</html>