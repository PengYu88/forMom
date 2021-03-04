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
									<option>董连双</option>
									<option>韩友才</option>
									<option>空</option>
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
<!-- 						<div class="col-xs-2" style="padding-right: 0;">
							<a href="#" id="addBtn" class="btn btn-primary btn-sm pull-right">新增</a>
						</div> -->
 						<div class="col-xs-4" style="padding-left: 0;">
							<a href="#" id="printBtn" class="btn btn-primary btn-sm pull-right" value="to test2" onclick="tsc.OrderList.doPrint()">打印对账单</a>
						</div>
 						<div class="col-xs-4" style="padding-left: 0;">
							<a href="#" id="printOrderBtn" class="btn btn-primary btn-sm pull-right" value="to test2" onclick="tsc.OrderList.doPrintOrder()">批量打印订单</a>
						</div>
<!--  						<div class="col-xs-3" style="padding-left: 0;">
							<a href="#" id="printOrderBtn" class="btn btn-primary btn-sm pull-right" value="to test2" onclick="tsc.OrderList.prn1_print()">打印订单</a>
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
					<th><input id="checkAll" type="checkbox" onclick="tsc.OrderList.check()"></th>
					<th>订单流水号</th>
				    <th>客户名称</th>
				    <th>开票时间</th>
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
						<td><input name="orderList" type="checkbox" value='${item.orderNo}' class="check_cb"></td>
						<td>${item.orderNo}</td>
						<td>${item.orderClient}</td>
						<td>${item.orderTime}</td>
						<td>${item.deliveryDate}</td>
						<td>${item.price}</td>
						<c:if test="${item.deliveryMan==1}">
							<td>董连双</td>
						</c:if>
						<c:if test="${item.deliveryMan==2}">
							<td>韩友才</td>
						</c:if>
						<c:if test="${item.deliveryMan==0}">
							<td></td>
						</c:if>
						<td>${item.orderSts}</td>
						<td>
							<a href="#" onclick="tsc.OrderList.doEdit('${item.orderId}')">修改</a>
				          	<a href="#" onclick="tsc.OrderList.doDelete(${item.orderId})">作废</a>
							<a href="#" onclick="tsc.OrderList.doDeduct(${item.orderId})">扣除</a>
							<a href="#" onclick="tsc.OrderList.doTotal(${item.orderId})">合计</a>
							<a href="#" onclick="tsc.OrderList.queryHistory(${item.orderNo})">查看</a>
						</td>
						<td>
							<a id="Btn1" class="btn btn-primary btn-sm" onclick="tsc.OrderList.updateOrderDeliveryMan('1','${item.orderId}')">董连双</a>
							<a id="Btn2" class="btn btn-primary btn-sm" onclick="tsc.OrderList.updateOrderDeliveryMan('2','${item.orderId}')">韩友才</a>
						</td>
					</tr>
				</c:forEach>
			</tbody>
    	</table>
	</div>
	<div id=printDiv>	
</div>
</div>

<script src="OrderList.js" type="text/javascript"></script>
<script src="LodopFuncs.js"></script>
<script type="text/javascript"> 
/* 	var LODOP; //声明为全局变量 
	function prn1_print() {
		var o = document.getElementById("printDiv");
		var h = o.offsetHeight; //高度
		//alert(h)
		if(h>4200){
			alert("太长啦，少选几家吧！")
			return
		}
		CreateOneFormPage();
		LODOP.SET_PRINT_PAGESIZE(3,2100,100,"");//这里3表示纵向打印且纸高“按内容的高度”；1385表示纸宽138.5mm；45表示页底空白4.5mm
		LODOP.PREVIEW();
		//LODOP.PRINT();  
	};
	function CreateOneFormPage(){
		LODOP=getLodop();
		LODOP.ADD_PRINT_HTM(0,20,715,1000,document.getElementById("printDiv").innerHTML);
	}; */
</script> 
