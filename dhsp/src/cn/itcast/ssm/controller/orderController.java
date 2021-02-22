package cn.itcast.ssm.controller;

import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.itcast.ssm.po.HistoryCostom;
import cn.itcast.ssm.po.goodsCustom;
import cn.itcast.ssm.po.goodsQueryVo;
import cn.itcast.ssm.po.orderCustom;
import cn.itcast.ssm.po.orderQueryVo;
import cn.itcast.ssm.service.orderService;
import cn.itcast.ssm.service.HistoryService;
import cn.itcast.ssm.service.goodsService;
import net.sf.json.JSONObject;

 
@Controller
public class orderController {

	//注入订单管理Service
	@Autowired
	private orderService orderService;
	
	
	@Autowired
	private HistoryService historyService;
	
	@Autowired
	private goodsService goodsService;

	//订单列表查询
	@RequestMapping("/queryOrder")
	public ModelAndView queryOrder(HttpServletRequest request) throws Exception {
		 SimpleDateFormat sdf1=new SimpleDateFormat("yyyy-MM-dd");
		 Date date=new Date();
		 String deliveryDate = sdf1.format(date);
		 orderQueryVo orderQueryVo = new orderQueryVo();
		orderCustom term = new orderCustom();
		term.setDeliveryDate(deliveryDate);
		orderQueryVo.setOrderCustom(term);
		String nowDate = getNowDate();
		List<orderCustom> itemsList = orderService.findOrderList(orderQueryVo);
		for(int i=0;i<itemsList.size();i++){
			if(itemsList.get(i).getOrderSts().toString()=="0"||"0".endsWith(itemsList.get(i).getOrderSts().toString())){
				itemsList.get(i).setOrderSts("已合计");
			}else{
				itemsList.get(i).setOrderSts("已扣除");
			}
		}
		
		List<orderCustom> count = orderService.findOrderCount(orderQueryVo);
		
		List<orderCustom> inventorySumList = orderService.findInventorySum(orderQueryVo);
		
		int sum = count.get(0).getCount();
		
		String inventorySum = inventorySumList.get(0).getInventorySum();
		
		ModelAndView modelAndView = new ModelAndView();
		 	 
		modelAndView.addObject("itemsList", itemsList);
		
		request.setAttribute("sum", sum);
		
		request.setAttribute("inventorySum", inventorySum);
		
		request.setAttribute("nowDate", nowDate);
	 
		modelAndView.setViewName("order/OrderList");

		return modelAndView;

	}
	
	//根据条件过滤订单信息
	@RequestMapping("/queryOrderByForm")
	public ModelAndView fingClientByForm(HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		String nowDate = getNowDate();
		request.setCharacterEncoding("UTF-8"); 
		String deliveryMan = request.getParameter("deliveryMan");
		String orderClient = request.getParameter("orderClient");
		String deliveryDate = request.getParameter("deliveryDate");
		orderQueryVo orderQueryVo = new orderQueryVo();
		orderCustom term = new orderCustom();
		term.setDeliveryMan(deliveryMan);
		term.setOrderClient(orderClient);
		term.setDeliveryDate(deliveryDate);
		orderQueryVo.setOrderCustom(term);
		
		List<orderCustom> itemsList = orderService.findOrderList(orderQueryVo);
		for(int i=0;i<itemsList.size();i++){
			if(itemsList.get(i).getOrderSts().toString()=="0"||"0".endsWith(itemsList.get(i).getOrderSts().toString())){
				itemsList.get(i).setOrderSts("已合计");
			}else{
				itemsList.get(i).setOrderSts("已扣除");
			}
		}
		
		List<orderCustom> count = orderService.findOrderCount(orderQueryVo);
		
		List<orderCustom> inventorySumList = orderService.findInventorySum(orderQueryVo);
		
		int sum = count.get(0).getCount();
		
		String inventorySum = inventorySumList.get(0).getInventorySum();
		
		JSONObject jsonObject = new JSONObject();
		PrintWriter writer = null;
		response.setContentType("text/json");
		response.setCharacterEncoding("UTF-8");
		writer = response.getWriter();
		jsonObject.put("itemsList", itemsList);
		jsonObject.put("sum", sum);
		jsonObject.put("inventorySum", inventorySum);
		jsonObject.put("nowDate", nowDate);
		writer.println(jsonObject.toString());
		writer.flush();
		writer.close();
		return null;
		
	}
	
	//扣除订单
	@RequestMapping("/doDeductOrder")
	public void doDeductOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8"); 
			String orderId = request.getParameter("id");
			orderCustom orderCustom = new orderCustom();
			orderCustom.setOrderId(orderId);
			orderCustom.setOrderSts("1");
			orderService.updateOrderSts(orderCustom);
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Exception in doDeductOrder of orderController");
		}
	}
	
	//新增订单
	@RequestMapping("/addOrder")
	public ModelAndView doAddOrder(HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("order/OrderEdit");
		return modelAndView;
	}
	
	//合计订单
	@RequestMapping("/doTotalOrder")
	public void doTotalOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8"); 
			String orderId = request.getParameter("id");
			orderCustom orderCustom = new orderCustom();
			orderCustom.setOrderId(orderId);
			orderCustom.setOrderSts("0");
			orderService.updateOrderSts(orderCustom);
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Exception in doDeductOrder of orderController");
		}
	}
	
	//删除订单
	@RequestMapping("/doDeleteOrder")
	public void doDeleteOrder(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8"); 
			String orderId = request.getParameter("id");
			orderCustom orderCustom = new orderCustom();
			orderCustom.setOrderId(orderId);
			orderService.deleteOrder(orderCustom);
			//HistoryCostom historyCostom = new HistoryCostom();
			//historyCostom.setOrderId(orderId);
			//historyService.deleteHistory(historyCostom);
			
			List<HistoryCostom> orderList = historyService.findHistoryListById(orderId);
			
			for(HistoryCostom historyCostom:orderList) {
				historyCostom.getGoodsName();
				historyCostom.getGoodsQuantity();
				goodsCustom g = new goodsCustom();
				g.setGoodsName(historyCostom.getGoodsName());
				g.setReduceNum(Double.parseDouble(historyCostom.getGoodsQuantity()));
				goodsService.increaseGoods(g);
			}
			
			JSONObject jsonObject = new JSONObject();
			PrintWriter writer = null;
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			writer = response.getWriter();
			jsonObject.put("message", "success");
			writer.println(jsonObject.toString());
			writer.flush();
			writer.close();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Exception in doDeleteOrder of orderController");
		}
	}
	
	//获取当前日期
	public String getNowDate(){
		Calendar c = Calendar.getInstance();//可以对每个时间域单独修改
		int year = c.get(Calendar.YEAR); 
		int month = c.get(Calendar.MONTH)+1; 
		int date = c.get(Calendar.DATE); 
		String now = ""+year+"年"+month + "月" + date +"日";
		return now;
	}
	
	//修改订单
	@RequestMapping("/editOrder")
	public ModelAndView editOrder(HttpServletRequest request) throws Exception{
		String orderId = request.getParameter("id");
		ModelAndView modelAndView = new ModelAndView();
		orderQueryVo orderQueryVo = new orderQueryVo();
		orderCustom term = new orderCustom();
		term.setOrderId(orderId);
		orderQueryVo.setOrderCustom(term);
		List<orderCustom> orderList = orderService.findOrderList(orderQueryVo);
		orderCustom result = new orderCustom();
		result = orderList.get(0);
 		DecimalFormat df = new DecimalFormat("######0.00");
 		double p1 = result.getOrderSum();
 		String p2 = df.format(p1);
 		result.setPrice(p2);
 		modelAndView.addObject("orderCustom", result);
 		modelAndView.setViewName("order/OrderEdit");
		return modelAndView;
	}
	
	//保存修改订单
	@RequestMapping("/doUpdateOrderSave")
	public void doUpdateClientSave(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8"); 
			String orderId = request.getParameter("orderId");
			String orderClient = request.getParameter("orderClient");
			String deliveryDate = request.getParameter("deliveryDate");
			double ordreSum = Double.parseDouble(request.getParameter("ordreSum"));
			orderCustom orderCustom = new orderCustom();
			orderCustom.setOrderId(orderId);
			orderCustom.setOrderClient(orderClient);
			orderCustom.setOrderSum(ordreSum);
			orderCustom.setDeliveryDate(deliveryDate);
			orderService.updateOrder(orderCustom);
			JSONObject jsonObject = new JSONObject();
			PrintWriter writer = null;
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			writer = response.getWriter();
			jsonObject.put("message", "success");
			writer.println(jsonObject.toString());
			writer.flush();
			writer.close();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Exception in doUpdateClientSave of clientController");
		}
	}

	@RequestMapping("/queryMaxOrderId")
	public void queryMaxOrderId(HttpServletRequest request,HttpServletResponse response) throws Exception {
		int maxOrderId = orderService.findMaxOrderId();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("maxOrderId", maxOrderId+1);
		PrintWriter writer = null;
		response.setContentType("text/json");
		response.setCharacterEncoding("UTF-8");
		writer = response.getWriter();
		jsonObject.put("message", "success");
		writer.println(jsonObject.toString());
		writer.flush();
		writer.close();
	}
	
	//修改配送人
	@RequestMapping("/updateOrderDeliveryMan")
	public void updateOrderDeliveryMan(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8"); 
			String orderId = request.getParameter("orderId");
			String deliveryMan=URLDecoder.decode(request.getParameter("deliveryMan"),"utf-8");
			orderCustom orderCustom = new orderCustom();
			orderCustom.setOrderId(orderId);
			orderCustom.setDeliveryMan(deliveryMan);
			orderService.updateOrderDeliveryMan(orderCustom);
			JSONObject jsonObject = new JSONObject();
			PrintWriter writer = null;
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			writer = response.getWriter();
			jsonObject.put("message", "success");
			writer.println(jsonObject.toString());
			writer.flush();
			writer.close();
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Exception in doUpdateClientSave of clientController");
		}
	}
	
	
	//订单列表查询
		@RequestMapping("/queryHistoryOrder")
		public ModelAndView queryHistoryOrder(HttpServletRequest request) throws Exception {
			SimpleDateFormat sdf1=new SimpleDateFormat("yyyy-MM-dd");
			orderQueryVo orderQueryVo = new orderQueryVo();
			List<orderCustom> itemsList = orderService.findOrderList(orderQueryVo);
			List<orderCustom> count = orderService.findOrderCount(orderQueryVo);
			List<orderCustom> inventorySumList = orderService.findInventorySum(orderQueryVo);
			int sum = count.get(0).getCount();
			String inventorySum = inventorySumList.get(0).getInventorySum();
			ModelAndView modelAndView = new ModelAndView();
			modelAndView.addObject("itemsList", itemsList);
			request.setAttribute("inventorySum", inventorySum);
			double num = Math.ceil(sum/10);//查询总页数（每页显示10条）
			request.setAttribute("sum", sum);
			request.setAttribute("num", num);
			modelAndView.setViewName("history/HistoryList");
			return modelAndView;

		}
		
		//根据查询条件过滤商品信息
		@RequestMapping("/queryHistoryOrderForm")
		public void queryHistoryOrderForm(HttpServletRequest request,HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("UTF-8"); 
			String pageNum = request.getParameter("num");//获取当前页数
			String clientName = request.getParameter("clientName");
			String orderNo = request.getParameter("orderNo");
			int n =0;
			if(pageNum!=null&&!pageNum.equals("")){
				n = (int) Double.parseDouble(pageNum);
			}
			orderQueryVo orderQueryVo = new orderQueryVo();
			orderCustom term = new orderCustom();
			term.setOrderClient(clientName);
			term.setOrderNo(orderNo);
			term.setNum((n-1)*10);//设置每页数据的起始索引
			orderQueryVo.setOrderCustom(term);
			List<orderCustom> itemsList = orderService.findOrderListPage(orderQueryVo);
	
			for(int i=0;i<itemsList.size();i++){
				if(itemsList.get(i).getOrderSts().toString()=="0"||"0".endsWith(itemsList.get(i).getOrderSts().toString())){
					itemsList.get(i).setOrderSts("已合计");
				}else if(itemsList.get(i).getOrderSts().toString()=="1"||"1".endsWith(itemsList.get(i).getOrderSts().toString())){
					itemsList.get(i).setOrderSts("已扣除");
				} else {
					itemsList.get(i).setOrderSts("已作废");
				}
			}
			
			List<orderCustom> count = orderService.findOrderCount(orderQueryVo);
			double sum = count.get(0).getCount();
			JSONObject jsonObject = new JSONObject();
			PrintWriter writer = null;
			double num = Math.ceil(sum/10);
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			writer = response.getWriter();
			jsonObject.put("itemsList", itemsList);
			jsonObject.put("sum", sum);
			jsonObject.put("num", num);
			writer.println(jsonObject.toString());
			writer.flush();
			writer.close();
		}
		
		@RequestMapping("/findHistoryListById")
		public void findHistoryListById(HttpServletRequest request,HttpServletResponse response) throws Exception {
			request.setCharacterEncoding("UTF-8"); 
			String Id = "799";//获取当前页数
			List<HistoryCostom> itemsList = historyService.findHistoryListById(Id);
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			PrintWriter writer = null;
			writer = response.getWriter();
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("itemsList", itemsList);
			writer.println(jsonObject.toString());
			writer.flush();
			writer.close();
		}

}
