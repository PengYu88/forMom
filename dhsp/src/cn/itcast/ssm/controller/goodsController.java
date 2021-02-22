package cn.itcast.ssm.controller;

import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.itcast.ssm.po.goodsCustom;
import cn.itcast.ssm.po.goodsQueryVo;
import cn.itcast.ssm.service.goodsService;
import net.sf.json.JSONObject;

 
@Controller
public class goodsController {

	//注入商品管理service
	@Autowired
	private goodsService goodsService;

	//初始化商品查询(跳转页面，查询商品总数)
	@RequestMapping("/queryItems")
	public ModelAndView queryItems(HttpServletRequest request) throws Exception {
		
		request.setCharacterEncoding("UTF-8"); 
		String goodsCode = request.getParameter("goodsCode");
		String goodsName = request.getParameter("goodsName");
		String factory = request.getParameter("factory");
		goodsQueryVo goodsQueryVo = new goodsQueryVo();
		goodsCustom term = new goodsCustom();
		term.setGoodsCode(goodsCode);
		term.setGoodsName(goodsName);
		term.setFactory(factory);
		goodsQueryVo.setGoodsCustom(term);
		List<goodsCustom> count = goodsService.findGoodsCount(goodsQueryVo);
		double sum = count.get(0).getCount();//查询商品总数
		double num = Math.ceil(sum/10);//查询总页数（每页显示10条）
		ModelAndView modelAndView = new ModelAndView();
		request.setAttribute("sum", sum);
		request.setAttribute("num", num);
		modelAndView.setViewName("goods/GoodsList");
		return modelAndView;
	}
	
	//根据查询条件过滤商品信息
	@RequestMapping("/fingGoodsByForm")
	public ModelAndView fingGoodsByForm(HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		request.setCharacterEncoding("UTF-8"); 
		String goodsCode = request.getParameter("goodsCode");
		String pageNum = request.getParameter("num");//获取当前页数
		int n =0;
		if(pageNum!=null&&!pageNum.equals("")){
			n = (int) Double.parseDouble(pageNum);
		}
		String goodsName = request.getParameter("goodsName");
		String factory = request.getParameter("factory");
		goodsQueryVo goodsQueryVo = new goodsQueryVo();
		goodsCustom term = new goodsCustom();
		term.setGoodsCode(goodsCode);
		term.setGoodsName(goodsName);
		term.setFactory(factory);
		term.setNum((n-1)*10);//设置每页数据的起始索引
		goodsQueryVo.setGoodsCustom(term);
		List<goodsCustom> itemsList = goodsService.findGoodsList(goodsQueryVo);
		List<goodsCustom> count = goodsService.findGoodsCount(goodsQueryVo);
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
		return null;
	}
	
	//新增商品
	@RequestMapping("/addGoods")
	public ModelAndView doAdd(HttpServletRequest request) throws Exception{
		ModelAndView modelAndView = new ModelAndView();
		request.setAttribute("flag", "0");
		modelAndView.setViewName("goods/GoodsEdit");
		return modelAndView;
	}
	
	//修改商品
	@RequestMapping("/editGoods")
	public ModelAndView doEdit(HttpServletRequest request) throws Exception{
		String goodsId = request.getParameter("id");
		ModelAndView modelAndView = new ModelAndView();
		goodsQueryVo goodsQueryVo = new goodsQueryVo();
		goodsCustom term = new goodsCustom();
		term.setGoodsId(goodsId);
		goodsQueryVo.setGoodsCustom(term);
		List<goodsCustom> goodsList = goodsService.findGoodsList(goodsQueryVo);
		goodsCustom result = new goodsCustom();
		result = goodsList.get(0);
		request.setAttribute("flag", "1");
 		DecimalFormat df = new DecimalFormat("######0.00");
 		double p1 = result.getGoodsPrice();
 		String p2 = df.format(p1);
 		result.setPrice(p2);
 		modelAndView.addObject("goodsCustom", result);
		modelAndView.setViewName("goods/GoodsEdit");
		return modelAndView;
	}
	
	//保存新增商品
	@RequestMapping("/doAddSave")
	public void doAddSave(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8"); 
			String goodsCode = request.getParameter("goodsCode");
			String goodsName = request.getParameter("goodsName");
			String goodsSpec = request.getParameter("goodsSpec");
			String factory = request.getParameter("factory");
			String goodsUnit = request.getParameter("goodsUnit");
			String priceFlag = request.getParameter("goodsPrice").toString();
			double goodsPrice;
			if(priceFlag==null||"".equals(priceFlag)){
				goodsPrice = 0;
			}else{
				goodsPrice = Double.parseDouble(request.getParameter("goodsPrice"));
			}
			String goodsRemark = request.getParameter("goodsRemark");
			String goodsQuantity = request.getParameter("goodsQuantity");
			goodsCustom goodsCustom = new goodsCustom();
			goodsCustom.setGoodsCode(goodsCode);
			goodsCustom.setGoodsName(goodsName); 
			goodsCustom.setGoodsSpec(goodsSpec);
			goodsCustom.setFactory(factory);
			goodsCustom.setGoodsUnit(goodsUnit);
			goodsCustom.setGoodsPrice(goodsPrice);
			goodsCustom.setGoodsRemark(goodsRemark);
			goodsCustom.setGoodsQuantity(Double.parseDouble(goodsQuantity));
			goodsService.insertGoods(goodsCustom);
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
		}
		
	}
	
	//保存修改商品
	@RequestMapping("/doUpdateSave")
	public void doUpdateSave(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8");
			String goodsId = request.getParameter("goodsId");
			String goodsCode = request.getParameter("goodsCode");
			String goodsName = request.getParameter("goodsName");
			String goodsSpec = request.getParameter("goodsSpec");
			String factory = request.getParameter("factory");
			String goodsUnit = request.getParameter("goodsUnit");
			String priceFlag = request.getParameter("goodsPrice").toString();
			double goodsPrice;
			if (priceFlag == null || "".equals(priceFlag)) {
				goodsPrice = 0;
			} else {
				goodsPrice = Double.parseDouble(request.getParameter("goodsPrice"));
			}
			String goodsRemark = request.getParameter("goodsRemark");
			String goodsQuantity = request.getParameter("goodsQuantity");
			goodsCustom goodsCustom = new goodsCustom();
			goodsCustom.setGoodsId(goodsId);
			goodsCustom.setGoodsCode(goodsCode);
			goodsCustom.setGoodsName(goodsName);
			goodsCustom.setGoodsSpec(goodsSpec);
			goodsCustom.setFactory(factory);
			goodsCustom.setGoodsUnit(goodsUnit);
			goodsCustom.setGoodsPrice(goodsPrice);
			goodsCustom.setGoodsRemark(goodsRemark);
			goodsCustom.setGoodsQuantity(Double.parseDouble(goodsQuantity));
			goodsService.updateGoods(goodsCustom);
			JSONObject jsonObject = new JSONObject();
			PrintWriter writer = null;
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			writer = response.getWriter();
			jsonObject.put("message", "success");
			writer.println(jsonObject.toString());
			writer.flush();
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//删除商品
	@RequestMapping("/doDelete")
	public void doDelete(HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			String goodsId = request.getParameter("id");
			goodsQueryVo goodsQueryVo = new goodsQueryVo();
			goodsCustom goodsCustom = new goodsCustom();
			goodsCustom.setGoodsId(goodsId);
			goodsQueryVo.setGoodsCustom(goodsCustom);
			goodsService.deleteGoods(goodsQueryVo);
			JSONObject jsonObject = new JSONObject();
			PrintWriter writer = null;
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			writer = response.getWriter();
			jsonObject.put("message", "success");
			writer.println(jsonObject.toString());
			writer.flush();
			writer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
