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
<!-- 					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-3 control-label control-label-sm">配送日期</label>
							<div class="col-xs-9">
								<input type="text" id="datetimepicker1" class="form-control" autocomplete="off" onchange="tsc.OrderList.doQuery()">
							</div>
						</div>
					</div> -->
					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-3 control-label control-label-sm">客户名称</label>
							<div class="col-xs-9">
								<input id="clientName" name="clientName" type="text" class="form-control"  autocomplete="off"  placeholder="请输入客户名称">
							</div>
						</div>
					</div>
					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-3 control-label control-label-sm">流水号</label>
							<div class="col-xs-9">
								<input id="orderNo" name="orderNo" type="text" class="form-control"  autocomplete="off"  placeholder="请输入订单流水号">
							</div>
						</div>
					</div>
				</div>
				<div class="row" style="padding-bottom: 10px;">
					<div class="col-xs-10">
					</div>
					<div class="col-xs-1" style="padding-left: 0;">
						<a href="#" id="queryBtn" class="btn btn-primary btn-sm pull-right" onclick="tsc.HistoryList.doQuery(1)">查询</a>
					</div>
				</div>
			</form>
		</div>
		<table class="table table-hover">
			<thead>
				<tr>
				    <th>订单流水号</th>
				    <th>客户名称</th>
				    <th>开票时间</th>
				    <th>配送日期</th>
				    <th>订单状态</th>
				    <th>总金额</th>
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
<script src="HistoryList.js" type="text/javascript"></script>
