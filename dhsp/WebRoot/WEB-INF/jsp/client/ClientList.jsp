<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<% 
String sum = request.getAttribute("sum").toString();
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
							<label class="col-xs-3 control-label control-label-sm">客户代码</label>
							<div class="col-xs-9">
								<input id="clientCode" name="clientCode" type="text" class="form-control" placeholder="请输入客户代码">
							</div>
						</div>
					</div>
					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-3 control-label control-label-sm">客户名称</label>
							<div class="col-xs-9">
								<input id="clientName" name="clientName" type="text" class="form-control" placeholder="请输入客户名称">
							</div>
						</div>
					</div>
				</div>
				<div class="row" style="padding-bottom: 10px;">
					<div class="col-xs-10">
					</div>
					<div class="col-xs-1" style="padding-right: 0;">
						<a href="#" id="addBtn" class="btn btn-primary btn-sm pull-right">新增</a>
					</div>
					<div class="col-xs-1" style="padding-left: 0;">
						<a href="#" id="queryBtn" class="btn btn-primary btn-sm pull-right" onclick="tsc.ClientList.doQuery(1)">查询</a>
					</div>
				</div>
			</form>
		</div>
		<table class="table table-hover">
			<thead>
			  <tr>
			    <th>客户代码</th>
			    <th>客户名称</th>
			    <th>地址</th>
			    <th>联系电话</th>
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
<script src="ClientList.js" type="text/javascript"></script>
