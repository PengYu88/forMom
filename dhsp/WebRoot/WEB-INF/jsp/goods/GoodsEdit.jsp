<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<% 
String flag = request.getAttribute("flag").toString();
%>
<form id="goods-edit-form" class="form-horizontal" role="form" action="doAddSave.action" method="post">
	<input type="hidden" id="flag" value="<%=flag%>">
	<div class="form-group">
	    <label for="editGoodsCode" class="col-xs-4 control-label">商品条码</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editGoodsCode" name="editGoodsCode" placeholder="商品条码" maxlength="20" value="${goodsCustom.goodsCode}">
			<input type="hidden" id="editGoodsId" value="${goodsCustom.goodsId}">
	    </div>
	    <div class="col-xs-3">
			<font id="checkFlag" class="font-red" style="display: none;"></font>
	    </div>
	</div>
	<div class="form-group">
	    <label for="editGoodsName" class="col-xs-4 control-label">商品名称</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editGoodsName" name="editGoodsName" placeholder="商品名称" maxlength="20" value="${goodsCustom.goodsName}">
	    </div>
	</div>
	<div class="form-group">
		<label for="editGoodsSpec" class="col-xs-4 control-label">商品规格</label>
		<div class="col-xs-5">
			<input class="form-control" id="editGoodsSpec" name="editGoodsSpec" placeholder="商品规格" maxlength="20" value="${goodsCustom.goodsSpec}">
		</div>
		<div class="col-xs-1">
			<a href="#" class="btn blue btn-sm" id="addMl">ml</a>
		</div>
		<div class="col-xs-1">
			<a href="#" class="btn blue btn-sm" id="addMuti">×</a>
		</div>
	</div>
	<div class="form-group">
	    <label for="editGoodsUnit" class="col-xs-4 control-label">商品单位</label>
	    <div class="col-xs-5">
			<%-- <input class="form-control" id="editGoodsUnit" name="editGoodsUnit" placeholder="商品单位" maxlength="20" value="${goodsCustom.goodsUnit}"> --%>
			<input type="hidden" value="${goodsCustom.goodsUnit}" id="Unit">
			<select class="form-control" id="editGoodsUnit" name="editGoodsUnit">
				<option>箱</option>
				<option>袋</option>
				<option>条</option>
				<option>提</option>
				<option>盒</option>	
				<option>瓶</option>
				<option>对</option>
				<option>罐</option>
				<option>包</option>
			</select>
	    </div>
	</div>
	<div class="form-group">
	    <label for="editGoodsPrice" class="col-xs-4 control-label">单价（元）</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editGoodsPrice" name="editGoodsPrice" placeholder="单价" maxlength="10" value="${goodsCustom.price}">
	    </div>
	</div>
	<div class="form-group">
	    <label for="editGoodsRemark" class="col-xs-4 control-label">备注</label>
	    <div class="col-xs-5">
			<input class="form-control" id="editGoodsRemark" name="editGoodsRemark" placeholder="备注" maxlength="30" value="${goodsCustom.goodsRemark}">
	    </div>
	</div>
	<div class="form-group">
	    <label for="goodsQuantity" class="col-xs-4 control-label">库存数量</label>
	    <div class="col-xs-5">
			<input class="form-control" id="goodsQuantity" name="goodsQuantity" placeholder="库存数量" maxlength="10" value="${goodsCustom.goodsQuantity}">
	    </div>
	</div>
</form>
<script src="GoodsEdit.js" type="text/javascript"></script>
