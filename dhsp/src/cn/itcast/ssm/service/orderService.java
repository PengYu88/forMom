package cn.itcast.ssm.service;

import java.util.List;

import cn.itcast.ssm.po.orderCustom;
import cn.itcast.ssm.po.orderQueryVo;

/**
 * 
 * <p>Title: goodsService</p>
 * <p>Description:今日盘点service </p>
 * <p>Company: www.itcast.com</p> 
 * @author	李鹏宇
 * @date	2017-2-20下午3:48:09
 * @version 1.0
 */
public interface orderService {
	
	//订单列表查询
	public List<orderCustom> findOrderList(orderQueryVo orderQueryVo)throws Exception;
	
	//订单列表查询
	public List<orderCustom> findOrderListPage(orderQueryVo orderQueryVo)throws Exception;

	//订单数量查询
	public List<orderCustom> findOrderCount(orderQueryVo orderQueryVo)throws Exception;
	
	//订单总金额查询（合计部分）
	public List<orderCustom> findInventorySum(orderQueryVo orderQueryVo)throws Exception;
 
	//插入订单信息
	public void insertOrder(orderCustom orderCustom)throws Exception;
	
	//更改订单状态（扣除和合计）
	public void updateOrderSts(orderCustom orderCustom)throws Exception;
	
	//删除订单
	public void deleteOrder(orderCustom orderCustom)throws Exception;
	
	//修改订单
	public void updateOrder(orderCustom orderCustom)throws Exception;

	//查询最大订单Id
    	public int findMaxOrderId()throws Exception;
    	
    //更改订单状态（扣除和合计）
    public void updateOrderDeliveryMan(orderCustom orderCustom)throws Exception;
	 
}
