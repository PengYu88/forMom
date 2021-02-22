package cn.itcast.ssm.mapper;

import java.util.List;

import cn.itcast.ssm.po.orderCustom;
import cn.itcast.ssm.po.orderQueryVo;

public interface orderMapperCustom {

	//插入订单信息
	public void insertOrder(orderCustom orderCustom)throws Exception;
	
	//查询订单列表
    public List<orderCustom> findOrderList(orderQueryVo orderQueryVo)throws Exception;
    
    
	//查询订单列表
    public List<orderCustom> findOrderListPage(orderQueryVo orderQueryVo)throws Exception;

    //查询订单数量
	public List<orderCustom> findOrderCount(orderQueryVo orderQueryVo)throws Exception;
	
	//查询订单总金额（已合计）
	public List<orderCustom> findInventorySum(orderQueryVo orderQueryVo)throws Exception;
	
	//修改订单状态（扣除和合计）
	public void updateOrderSts(orderCustom orderCustom)throws Exception;
	
	//删除订单
	public void deleteOrder(orderCustom orderCustom)throws Exception;
	
	//修改订单
	public void updateOrder(orderCustom orderCustom)throws Exception;

	//查询最大订单Id
    	public int findMaxOrderId()throws Exception;
    	
    //修改订单状态（扣除和合计）
    public void updateOrderDeliveryMan(orderCustom orderCustom)throws Exception;
	
}