<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<div style="height: 350px; overflow:scroll">
<hr style=" height:2px;border:none;border-top:2px dotted #185598;" />

<c:forEach items="${name}" var="cart">
<div>
	<h5><b>交易时间：${cart.updateTime}</b></h5>
	<input id="clientInfo" value="${cart.clientInfo}" style="display:none">
	<input id="updateTime" value="${cart.updateTime}" style="display:none">
	<table class="table table-hover">
		<thead>
			<tr>
			    <th>商品条码</th>
			    <th>品名</th>
			    <th>规格</th>
			    <th>单位</th>
			    <th>数量</th>
			    <th>价格</th>
			    <th>货款金额</th>
			</tr>
		</thead>
		<tbody id="tbody">
		<c:forEach items="${cart.historyCostoms}" var="historyCostoms">
			<tr>
				<td>${historyCostoms.goodsCode}</td>
				<td>${historyCostoms.goodsName}</td>
				<td>${historyCostoms.goodsSpec}</td>
				<td>${historyCostoms.goodsUnit}</td>
				<td>${historyCostoms.goodsQuantity}</td>
				<td>${historyCostoms.goodsPrice}</td>
				<td>${historyCostoms.goodsTotal}</td>
			</tr>
		</c:forEach>
		</tbody>
	</table>
	<!-- <a href="#" id="deleteBtn" onclick="tsc.OrderEdit.doDeleteHistory()" class="btn btn-primary btn-sm pull-right">删除</a> -->
	<h5><b>货款总计（人民币）：${cart.priceSum} 元</b></h5>
	<hr style=" height:2px;border:none;border-top:2px dotted #185598;" />
</div>
</c:forEach>

</div>
		
<script src="OrderEdit.js" type="text/javascript"></script>