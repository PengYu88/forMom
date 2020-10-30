package cn.itcast.ssm.controller;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.itcast.ssm.po.clientCustom;
import cn.itcast.ssm.po.clientQueryVo;
import cn.itcast.ssm.service.clientService;
import net.sf.json.JSONObject;

@Controller
public class clientController {

	//注入客户管理service
	@Autowired
	private clientService clientService;

	//初始化客户查询
	@RequestMapping("/queryClient")
	public ModelAndView queryItems(HttpServletRequest request) throws Exception {
		
		List<clientCustom> count = clientService.findClientCount(null);
		
		double sum = count.get(0).getCount();
		
		double num = Math.ceil(sum/10);//查询总页数（每页显示10条）
		
		ModelAndView modelAndView = new ModelAndView();
		 
		request.setAttribute("sum", sum);
		
		request.setAttribute("num", num);
	 
		modelAndView.setViewName("client/ClientList");

		return modelAndView;

	}
	
	//根据查询条件过滤客户信息
	@RequestMapping("/fingClientByForm")
	public ModelAndView fingClientByForm(HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		request.setCharacterEncoding("UTF-8"); 
		String clientCode = request.getParameter("clientCode");
		String clientName = request.getParameter("clientName");
		String pageNum = request.getParameter("num");//获取当前页数
		int n =0;
		if(pageNum!=null&&!pageNum.equals("")){
			n = (int) Double.parseDouble(pageNum);
		}
		clientQueryVo clientQueryVo = new clientQueryVo();
		clientCustom term = new clientCustom();
		term.setClientCode(clientCode);
		term.setClientName(clientName);
		term.setNum((n-1)*10);//设置每页数据的起始索引
		clientQueryVo.setClientCustom(term);
		
		List<clientCustom> itemsList = clientService.findClientList(clientQueryVo);
		
		List<clientCustom> count = clientService.findClientCount(clientQueryVo);
		
		double sum = count.get(0).getCount();
		double num = Math.ceil(sum/10);
		JSONObject jsonObject = new JSONObject();
		PrintWriter writer = null;
		response.setContentType("text/json");
		response.setCharacterEncoding("UTF-8");
		writer = response.getWriter();
		jsonObject.put("itemsList", itemsList);
		jsonObject.put("sum", sum);
		jsonObject.put("num", num);
		writer.println(jsonObject.toString());
		writer.flush();
		writer.close();
		return null;
		
	}
	
	//新增客户信息
	@RequestMapping("/doAddClient")
	public ModelAndView doAddClient(HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("client/ClientEdit");
		request.setAttribute("flag", "0");
		return modelAndView;
	}
	
	//保存新增客户信息
	@RequestMapping("/doAddClientSave")
	public void doAddClientSave(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8"); 
			String logisticsArrival = request.getParameter("logisticsArrival");
			String district = request.getParameter("district");
			String clientName = request.getParameter("clientName");
			String clientAddress = request.getParameter("clientAddress");
			String clientTelephone = request.getParameter("clientTelephone");
			String pickupAdress = request.getParameter("pickupAdress");
			clientCustom clientCustom = new clientCustom();
			clientCustom.setLogisticsArrival(logisticsArrival);
			clientCustom.setDistrict(district);
			clientCustom.setClientName(clientName);
			clientCustom.setClientAddress(clientAddress);
			clientCustom.setClientTelephone(clientTelephone);
			clientCustom.setPickupAdress(pickupAdress);
			clientService.insertClient(clientCustom);
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
			System.out.println("Exception in doAddClientSave of clientController");
		}
		
	}
	
	//保存修改客户信息
	@RequestMapping("/doUpdateClientSave")
	public void doUpdateClientSave(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8");
			String clientId = request.getParameter("clientId");
			String logisticsArrival = request.getParameter("logisticsArrival");
			String district = request.getParameter("district");
			String clientName = request.getParameter("clientName");
			String clientAddress = request.getParameter("clientAddress");
			String clientTelephone = request.getParameter("clientTelephone");
			String pickupAdress = request.getParameter("pickupAdress");
			clientCustom clientCustom = new clientCustom();
			clientCustom.setClientId(clientId);
			clientCustom.setLogisticsArrival(logisticsArrival);
			clientCustom.setDistrict(district);
			clientCustom.setClientName(clientName);
			clientCustom.setClientAddress(clientAddress);
			clientCustom.setClientTelephone(clientTelephone);
			clientCustom.setPickupAdress(pickupAdress);
			clientService.updateClient(clientCustom);
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
	
	//删除客户信息
	@RequestMapping("/doClientDelete")
	public void doClientDelete(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String clientId = request.getParameter("id");
		clientQueryVo clientQueryVo = new clientQueryVo();
		clientCustom clientCustom = new clientCustom();
		clientCustom.setClientId(clientId);
		clientQueryVo.setClientCustom(clientCustom);
		clientService.deleteClient(clientQueryVo);
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
	
	//修改客户信息
	@RequestMapping("/editClient")
	public ModelAndView doEditClient(HttpServletRequest request) throws Exception{
		String clientId = request.getParameter("id");
		ModelAndView modelAndView = new ModelAndView();
		clientQueryVo clientQueryVo = new clientQueryVo();
		clientCustom term = new clientCustom();
		term.setClientId(clientId);
		clientQueryVo.setClientCustom(term);
		List<clientCustom> clientList = clientService.findClientList(clientQueryVo);
		clientCustom result = new clientCustom();
		result = clientList.get(0);
		request.setAttribute("flag", "1");
 		modelAndView.addObject("clientCustom", result);
		modelAndView.setViewName("client/ClientEdit");
		return modelAndView;
	}

}
