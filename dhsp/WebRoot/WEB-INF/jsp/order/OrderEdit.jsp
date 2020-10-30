<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<form id="order-edit-form" class="form-horizontal" role="form" action="doAddSave.action" method="post">
	<div class="form-group">
	    <label for="editOrderClient" class="col-xs-4 control-label">客户名称</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editOrderClient" name="editOrderClient" placeholder="客户名称" maxlength="20" value="${orderCustom.orderClient}">
			<input type="hidden" id="editOrderId" value="${orderCustom.orderId}">
	    </div>
	</div>
	<div class="form-group">
	    <label for="editOrderSum" class="col-xs-4 control-label">订单总额（元）</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editOrderSum" name="editOrderSum" placeholder="订单总额（元）" maxlength="10" value="${orderCustom.price}">
	    </div>
	</div>
	<div class="form-group">
	    <label for="deliveryDate" class="col-xs-4 control-label">送货日期</label>
	    <div class="col-xs-5">
			<input class="form-control" readonly type="text" id="deliveryDate" name="deliveryDate" class="form-control" autocomplete="off" value="${orderCustom.deliveryDate}">
	    </div>
	   	<div class="col-xs-3">
			<a id="today" class="btn btn-primary btn-sm" onclick="tsc.OrderEdit.setDeliveryDate('today')">今天</a>
			<a id="tommrrow" class="btn btn-primary btn-sm" onclick="tsc.OrderEdit.setDeliveryDate('tommrrow')">明天</a>
	    </div>
	</div>
</form>
<script src="OrderEdit.js" type="text/javascript"></script>