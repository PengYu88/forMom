<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<% 
String flag = request.getAttribute("flag").toString();
%>
<form id="client-edit-form" class="form-horizontal" role="form"  method="post">
	<input type="hidden" id="flag" value="<%=flag%>">
	<div class="form-group">
	    <label for="goodsCode" class="col-xs-4 control-label">客户代码</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editClientCode" name="editClientCode" placeholder="客户代码" maxlength="20" value="${clientCustom.clientCode}" onblur="tsc.ClientEdit.doCheck()">
			<input type="hidden" id="editClientId" value="${clientCustom.clientId}">
	    </div>
	    <div class="col-xs-3">
		<font id="checkFlag" class="font-red" style="display: none;"></font>
    </div>
	</div>
	<div class="form-group">
	    <label for="goodsName" class="col-xs-4 control-label">客户名称</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editClientName" name="editClientName" placeholder="客户名称" maxlength="20" value="${clientCustom.clientName}">
	    </div>
	</div>
	<div class="form-group">
	    <label for="goodsUnit" class="col-xs-4 control-label">送货地址</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editClientAddress" name="editClientAddress" placeholder="送货地址" maxlength="20" value="${clientCustom.clientAddress}">
	    </div>
	</div>
	<div class="form-group">
	    <label for="goodsSpec" class="col-xs-4 control-label">联系电话</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editClientTelephone" name="editClientTelephone" placeholder="联系电话" maxlength="20" value="${clientCustom.clientTelephone}">
	    </div>
	</div>
</form>
<script src="ClientEdit.js" type="text/javascript"></script>