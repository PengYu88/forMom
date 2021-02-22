<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>大华食品对账单</title>
</head>
<body>
<table align="center" width="900" border=0>
	<th><font size="5" face="微软雅黑" id="titleDate"></font><font face="微软雅黑" size="5">对账单</font></th>
</table>
<br>
<table align="left" width="500" border=0>
	<th><font size="4">配送人：<lable id="titleDeliveryMan"></lable></font></th>
</table>
<table align="left" width="500" border=0>
	<th><font size="4">已合计金额：<lable id="totalPrice"></lable></font></th>
</table>
<table align="center" width="900" border=1 style="border:solid 1px black;border-collapse:collapse;">
<thead>
	<th><font size="4" face="宋体">订单流水号</font></th>
	<th><font size="4" face="宋体">客户名称</font></th>
	<th><font size="4" face="宋体">开票时间</font></th>
	<th><font size="4" face="宋体">配送日期</font></th>
	<th><font size="4" face="宋体">订单总额（元）</font></th>
	<th><font size="4" face="宋体">订单状态</font></th>
</thead>
<tbody id="tbody">
</tbody>
</table>
</body>
<script src="static/dep/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="static/dep/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>

<script type="text/javascript">
var pare=window.opener;
var what=pare.document.getElementById("datetimepicker1"); 
var deliveryMan =pare.document.getElementById("deliveryMan");
var dateObj = pare.document.getElementById("dataLabel");
var inventorySumAreaObj = pare.document.getElementById("inventorySumArea");
var deliveryManParm = "";
if(deliveryMan.value == "董连双"){
	deliveryManParm = 1
}else if(deliveryMan.value == "韩友才"){
	deliveryManParm = 2
}else {
	deliveryManParm = ""
}
$.ajax({
	url: "queryOrderByForm.action",
	type: "post",
	data: {"deliveryDate":what.value,"deliveryMan":deliveryManParm},
	success: function(data){
		
		$("#titleDate").text(dateObj.innerHTML);
		$("#titleDeliveryMan").text(deliveryMan.value);
		$("#totalPrice").text(inventorySumAreaObj.innerHTML);
		
		var list = data.itemsList;
		var outHtml="";
		for(i=0;i<list.length;i++){
			outHtml=outHtml+"<tr>";
			outHtml=outHtml+"<td><font size='5' face='宋体'>"+list[i].orderNo+"</font></td>";
			outHtml=outHtml+"<td><font size='5' face='宋体'>"+list[i].orderClient+"</font></td>";
			outHtml=outHtml+"<td><font size='5' face='宋体'>"+list[i].orderTime+"</font></td>";
			outHtml=outHtml+"<td><font size='5' face='宋体'>"+list[i].deliveryDate+"</font></td>";
			outHtml=outHtml+"<td><font size='5' face='宋体'>"+list[i].price+"</font></td>";
			outHtml=outHtml+"<td><font size='5' face='宋体'>"+list[i].orderSts+"</font></td>";
			outHtml=outHtml+"</tr>";
		}
		document.getElementById('tbody').innerHTML=outHtml; 		 
	}
});

</script>
</html>