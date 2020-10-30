<style>
	.caret-change{
		transform:rotate(180deg); 
	}
	.toAddClass {
		cursor: pointer;
	}
	tr.toAddClass :HOVER{
	background-color: #e9ecf3;
}
</style>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<div class="portlet light">
	<div class="portlet-body">
		<!--高级查询搜索-->
		<div id="searchCondition">
			<form class="form-horizontal" id="receipt-query-form" action="data/query_purchase_order_page_1.json" type="post">
				<div class="row">
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">客户检索</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="clientSearch" name="clientCode" type="text" class="form-control" onchange="tsc.ReceiptList.doClientQuery()" autocomplete="off">
							</div>
						</div>
					</div>
					<div class="col-xs-1" style="padding-right: 0;">
						<a href="#" id="historyBtn" class="btn btn-primary btn-sm pull-right">历史交易</a>
					</div>
					<div class="col-xs-3" style="display:none">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">收货到站</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="logisticsArrival" name="logisticsArrival" type="text" class="form-control">
							</div>
						</div>
					</div>
					<div class="col-xs-3" style="display:none">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">所属地区</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="district" name="district" type="text" class="form-control">
							</div>
						</div>
					</div>

		 			<div class="col-xs-3" style="display:none">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">客户名称</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="clientName" name="clientName" type="text" class="form-control">
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">电话</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="clientTelephone" name="clientTelephone" type="text" class="form-control">
							</div>
						</div>
					</div>
					<div class="col-xs-6">
						<div class="form-group form-group-sm">
							<label class="col-xs-2 control-label control-label-sm">收货地址</label>
							<div class="col-xs-10" style="padding-right: 0px; padding-left: 0px;">
								<input id="clientAddress" name="clientAddress" type="text" class="form-control">
							</div>
						</div>
					</div>
					<div class="col-xs-3" style="display:none">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">提货地址</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="pickupAdress" name="pickupAdress" type="text" class="form-control">
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">商品条码</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="goodsCode" name="goodsCode" type="text" class="form-control" onchange="tsc.ReceiptList.doGoodsQueryForCode()" autocomplete="off">
							</div>
						</div>
					</div>
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">商品名称</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="goodsName" name="goodsName" type="text" class="form-control" onchange="tsc.ReceiptList.doGoodsQueryForName()" autocomplete="off">
							</div>
						</div>
					</div>
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">商品规格</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="goodsSpec" name="goodsSpec" type="text" class="form-control" autocomplete="off">
							</div>
						</div>
					</div>
					
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">订货数量</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="amount" name="amount" type="text" class="form-control" onblur="tsc.ReceiptList.doCompute()" autocomplete="off">
							</div>
						</div>
					</div>
					
				</div>
				<div class="row">
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">单位</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="goodsUnit" name="goodsUnit" type="text" class="form-control" autocomplete="off">
							</div>
						</div>
					</div>
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">商品单价</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="goodsPrice" name="goodsPrice" type="text" class="form-control" placeholder="例：100.00" onblur="tsc.ReceiptList.doCompute()" autocomplete="off">
							</div>
						</div>
					</div>
				<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">金额</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="sum" name="sum" type="text" class="form-control" readonly="readonly" placeholder="0.00" autocomplete="off">
							</div>
						</div>
					</div>
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">备注</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="remark" name="remark" type="text" class="form-control" autocomplete="off">
							</div>
						</div>
					</div>
					<div class="col-xs-3">
						<div class="form-group form-group-sm">
							<label class="col-xs-4 control-label control-label-sm">生产厂家</label>
							<div class="col-xs-8" style="padding-right: 0px; padding-left: 0px;">
								<input id="factory" name="factory" type="text" class="form-control" autocomplete="off">
							</div>
						</div>
					</div>
				</div>
				<div class="row">
				<div class="col-xs-4">
				<input id="ifSave" type="checkbox" checked> 保存订单
				</div>
					<div class="col-xs-5" style="padding-right: 0;">
					<label>
						 <input type="radio" name="optionsRadios" id="todayDelivery" onclick="tsc.ReceiptList.changeDelivery('today')">
						   今日配送
						 </label>
						 <label>
						    <input type="radio" name="optionsRadios" id="tomorrowDelivery"  onclick="tsc.ReceiptList.changeDelivery('tomorrow')">
						   明日配送
						 </label>
						 
						 <font size="5px" id="deliveryLabel"></font>
					</div>
					<div class="col-xs-1" style="padding-right: 0;">
						<a href="#" id="addBtn" class="btn btn-primary btn-sm pull-right">插入</a>
					</div>
					<div class="col-xs-1" style="padding-left: 0;">
						<a href="#" id="printBtn" onclick="prn1_print()" class="btn btn-primary btn-sm pull-right">打印</a>
<!-- 						<a href="#" onclick="tsc.ReceiptList.doInsertHistory()" class="btn btn-primary btn-sm pull-right">打印</a> -->
					</div>
				</div>
			</form>
		</div>
		 		<div id="printArea">
			<h1 align="center">订 货 单</h1>
			<table style="width: 100%;">
				<tr>
					<td width="17%"><label id="orderDate"></label></td>
					<td width="34%">订货单位：<font id="name" size="4"></font></td>
					<td width="28%">地址：<label id="adress"></label></td>
					<td width="21%">电话：<label id="telephone"></label></td>
				</tr>
			</table>
			<table id="orderTable"  border="1" style="border:solid 1px black;border-collapse:collapse;width: 100%;">
				<thead>
					<tr>
					    <th width="6%" style="text-align: center;">代码</th>
					    <th width="19%" style="text-align: center;">品名</th>
					    <th width="8%" style="text-align: center;">规格</th>
					    <th width="15%" style="text-align: center;">生产厂家</th>
					    <th width="8%" style="text-align: center;">单位</th>
					    <th width="8%" style="text-align: center;">数量</th>
					    <th width="10%" style="text-align: center;">单价</th>
					    <th width="10%" style="text-align: center;">金额</th>
					    <th width="15%" style="text-align: center;">备注</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
	    	</table>
	    	<table style="border:solid 1px black;border-collapse:collapse;width: 100%;">
				<tr>
		    		<td width="75%">货款总计（人民币）：大写：<span id="chineseTotal"></span></td>
		    		<td width="25%" style="text-align: center;">小写：<span id="total">0</span> 元</td>
	    		</tr>
	    	</table>
	    	<table style="width: 100%;">
	    		<tr>
		    		<td width="50%">供货单位：台安县大华食品批发部</td>
		    		<td width="25%" style="text-align: center;">结算方式：__________</td>
		    		<td width="25%" style="text-align: center;">收货人：___________</td>
	    		</tr>
	    		<tr>
		    		<td width="50%">电话：0412-4848519&nbsp;&nbsp;&nbsp;&nbsp;0412-4824595</td>
		    		<td width="50%" colspan="2">&nbsp;&nbsp;订单流水号：<font id="number"></font></td>
	    		</tr>
	    	</table>
		</div>
	</div>
</div>
<script src="LodopFuncs.js"></script>
<script src="ReceiptList.js" type="text/javascript"></script>
<script type="text/javascript"> 
	var LODOP; //声明为全局变量 
	function prn1_print() {
		$("#totalNumTitle").text($("#amountTotal").text()+"件");
		$("#number").text(tsc.ReceiptList.doQueryMaxId());
		CreateOneFormPage();
		LODOP.PREVIEW();
		tsc.ReceiptList.doInsert();
		var isChecked = $('#ifSave').prop('checked');
		if(isChecked==true){
			tsc.ReceiptList.doInsertHistory()
		}
	};
	function CreateOneFormPage(){
		LODOP=getLodop();
		LODOP.ADD_PRINT_HTM(18,20,715,1000,document.getElementById("printArea").innerHTML);
	};	                     
</script> 
<script type="text/javascript"> 
function displayResult(item, val, text) {
    console.log(item);
    $('.alert').show().html('You selected <strong>' + val + '</strong>: <strong>' + text + '</strong>');
}
$(function () {
	var clientArray=new Array();
	var goodsArray=new Array();
	var goodsNameArray=new Array();
	
	$.ajax({
		url: "findClientAdress.action",
		type: "post",
		async: false,
		success: function(data){
			clientArray = data.itemsList;
		}
	});
	
	$.ajax({
		url: "findGoodsCode.action",
		type: "post",
		async: false,
		success: function(data){
			goodsArray = data.itemsList;
		}
	});
	
	$.ajax({
		url: "findGoodsName.action",
		type: "post",
		async: false,
		success: function(data){
			goodsNameArray = data.itemsList;
		}
	});

    $('#clientSearch').typeahead({
    	source:clientArray,
        itemSelected: displayResult
    });
    
    $('#goodsCode').typeahead({
    	source:goodsArray,
        itemSelected: displayResult
    });
    
    $('#goodsName').typeahead({
    	source:goodsNameArray,
        itemSelected: displayResult
    });
    
});

</script> 
<style>
	#orderTable{
		width: 100%;
	}
</style>
