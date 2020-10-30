<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<% 
String sum = request.getAttribute("sum").toString();
String webpath = request.getContextPath();
%>
<style>
	.caret-change{
		transform:rotate(180deg); 
	}
</style>
<link href="Pager.css" rel="stylesheet" type="text/css" />
<script src="jquery.pager.js" type="text/javascript"></script>
<div class="portlet light">
	<div class="portlet-body">
		<div id="searchCondition">
			<form class="form-horizontal" id="-query-form">
			<input type="hidden" id ="num" value="${num}">
			<input type="hidden" id ="nowPage">
				<div class="row">
					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-3 control-label control-label-sm">商品代码</label>
							<div class="col-xs-9">
								<input id="goodsCode" name="goodsCode" type="text" class="form-control" placeholder="请输入商品代码">
							</div>
						</div>
					</div>
					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-3 control-label control-label-sm">商品名称</label>
							<div class="col-xs-9">
								<input id="goodsName" name="goodsName" type="text" class="form-control" placeholder="请输入商品名称">
							</div>
						</div>
					</div>
<!-- 					<div class="col-xs-4"> -->
<!-- 						<div class="form-group form-group-sm"> -->
<!-- 							<label class="col-xs-3 control-label control-label-sm">生产厂家</label> -->
<!-- 							<div class="col-xs-9"> -->
<!-- 								<input id="factory" name="factory" type="text" class="form-control" placeholder="请输入生产厂家"> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
				</div>
				<div class="row" style="padding-bottom: 10px;">
					<div class="col-xs-10">
					</div>
					<div class="col-xs-1" style="padding-right: 0;">
						<a href="#" id="addBtn" class="btn btn-primary btn-sm pull-right">新增</a>
					</div>
					<div class="col-xs-1" style="padding-left: 0;">
						<a href="#" id="queryBtn" class="btn btn-primary btn-sm pull-right" onclick="tsc.GoodsList.doQuery(1)">查询</a>
					</div>
				</div>
			</form>
		</div>
		<table class="table table-hover">
			<thead>
				<tr>
				    <th>商品条码</th>
				    <th>商品名称</th>
				    <th>商品规格</th>
 				    <th>生产厂家</th>
				    <th>商品单位</th>
				    <th>单价（元）</th>
				    <th>备注</th>
				    <th>操作</th>
				</tr>
			</thead>
			<tbody id="tbody">
			</tbody>
    	</table>
	</div>
	<!--分页-->
	<div class="row">
		<div class="col-xs-2"></div>
		<div class="col-xs-8" id="pager" style="padding-left: 20%;"></div>
		<div class="col-xs-2">
			<div class="pull-right margin-top-5">
				<h5>共 <span id="pager-total" style="text-align:center">${sum}</span> 条数据</h5>
			</div>
		</div>
	</div>
</div>
<script src="GoodList.js" type="text/javascript"></script>
