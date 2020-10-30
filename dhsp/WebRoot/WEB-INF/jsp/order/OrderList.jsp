<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<% 
String sum = request.getAttribute("sum").toString();
String inventorySum = request.getAttribute("inventorySum").toString();
String nowDate = request.getAttribute("nowDate").toString();
%>
<style>
	.caret-change{
		transform:rotate(180deg); 
	}
</style>
<div class="portlet light">
	<div class="portlet-body">
		<div id="searchCondition">
			<form class="form-horizontal" id="-query-form">
				<div class="row">
					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">配送人</label>
							<div class="col-xs-8">
								<select class="form-control" id="deliveryMan" name="deliveryMan" onchange="tsc.OrderList.doQuery()">
									<option>全部</option>
									<option>李宝东</option>
									<option>韩友财</option>
								</select>
							</div>
						</div>
					</div>
					<div class="col-xs-4">
						<div class="form-group form-group-sm">
							<label class="col-xs-3 control-label control-label-sm">配送日期</label>
							<div class="col-xs-9">
								<input type="text" id="datetimepicker1" class="form-control" autocomplete="off" onchange="tsc.OrderList.doQuery()">
								
							</div>
						</div>
					</div>
					<div class="col-xs-4">
						<div class="col-xs-2" style="padding-right: 0;">
							<a href="#" id="addBtn" class="btn btn-primary btn-sm pull-right">新增</a>
						</div>
<!-- 						<div class="col-xs-3" style="padding-left: 0;">
							<a href="#" id="queryBtn" class="btn btn-primary btn-sm pull-right">查询</a>
						</div> -->
					</div>
				</div>
			</form>
		</div>
		<div class="panel panel-primary">
			<div class="panel-heading">
	        	<h3 class="panel-title">您好，当前对账日期为<lable id="dataLabel"></lable>，本次对账的结果如下：</h3>
			</div>
			<div class="panel-body">
				该批订单配送人为<font size="5px" class="font-red" id="delivery"></font>，共完成&nbsp;<font size="5px" class="font-red" id="sumArea">${sum}</font>&nbsp;笔交易，应收入人民币&nbsp;<font size="5px" class="font-red" id="inventorySumArea">${inventorySum}</font>&nbsp;元。请仔细核对订单信息，避免出现错误。
			</div>
   		</div>
		<table class="table table-hover" id="tab">
			<thead>
				<tr>
				    <th>客户名称</th>
				    <th>配送日期</th>
				    <th>订单总额（元）</th>
				    <th>配送人</th>
				    <th>状态</th>
				    <th>操作</th>
				    <th>选择配送人</th>
				</tr>
			</thead>
			<tbody id="tbody">
				<c:forEach items="${itemsList}" var="item">
					<tr>
						<td>${item.orderClient}</td>
						<td>${item.deliveryDate}</td>
						<td>${item.price}</td>
						<c:if test="${item.deliveryMan==1}">
							<td>李宝东</td>
						</c:if>
						<c:if test="${item.deliveryMan==2}">
							<td>韩友财</td>
						</c:if>
						<c:if test="${item.deliveryMan==null}">
							<td></td>
						</c:if>
						<td>${item.orderSts}</td>
						<td>
							<a href="#" onclick="tsc.OrderList.doEdit('${item.orderId}')">修改</a>
				          	<a href="#" onclick="tsc.OrderList.doDelete(${item.orderId})">删除</a>
							<a href="#" onclick="tsc.OrderList.doDeduct(${item.orderId})">扣除</a>
							<a href="#" onclick="tsc.OrderList.doTotal(${item.orderId})">合计</a>
							<a href="#" onclick="tsc.OrderList.doView(${item.orderId})">查看</a>
						</td>
						<td>
							<a id="Btn1" class="btn btn-primary btn-sm" onclick="tsc.OrderList.updateOrderDeliveryMan('1','${item.orderId}')">李宝东</a>
							<a id="Btn2" class="btn btn-primary btn-sm" onclick="tsc.OrderList.updateOrderDeliveryMan('2','${item.orderId}')">韩友财</a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
    	</table>
	</div>
</div>
<script src="OrderList.js" type="text/javascript"></script>
