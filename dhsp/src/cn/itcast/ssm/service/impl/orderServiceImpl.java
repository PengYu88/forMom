package cn.itcast.ssm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.itcast.ssm.mapper.orderMapperCustom;
import cn.itcast.ssm.po.orderCustom;
import cn.itcast.ssm.po.orderQueryVo;
import cn.itcast.ssm.service.orderService;

public class orderServiceImpl implements orderService{
	
	//注入订单订单数据库mapper
	@Autowired
	private orderMapperCustom orderMapperCustom;

	//插入订单信息
	@Override
	public void insertOrder(orderCustom orderCustom) throws Exception {
		
		orderMapperCustom.insertOrder(orderCustom);
		
	}

	//订单列表查询
	@Override
	public List<orderCustom> findOrderList(orderQueryVo orderQueryVo) throws Exception {
		
		return orderMapperCustom.findOrderList(orderQueryVo);
		
	}

	//订单数量查询
	@Override
	public List<orderCustom> findOrderCount(orderQueryVo orderQueryVo) throws Exception {
		
		return orderMapperCustom.findOrderCount(orderQueryVo);
		
	}

	//订单总金额查询（合计部分）
	@Override
	public List<orderCustom> findInventorySum(orderQueryVo orderQueryVo) throws Exception {
		
		return orderMapperCustom.findInventorySum(orderQueryVo);
		
	}

	//更改订单状态（扣除和合计）
	@Override
	public void updateOrderSts(orderCustom orderCustom) throws Exception {
		
		orderMapperCustom.updateOrderSts(orderCustom);
		
	}

	//删除订单
	@Override
	public void deleteOrder(orderCustom orderCustom) throws Exception {
		
		orderMapperCustom.deleteOrder(orderCustom);
		
	}

	//修改订单
	@Override
	public void updateOrder(orderCustom orderCustom) throws Exception {
		
		orderMapperCustom.updateOrder(orderCustom);
		
	}
	@Override
	public int findMaxOrderId() throws Exception {
		return orderMapperCustom.findMaxOrderId();
	}

	@Override
	public void updateOrderDeliveryMan(orderCustom orderCustom) throws Exception {
		orderMapperCustom.updateOrderDeliveryMan(orderCustom);
	}

	@Override
	public List<orderCustom> findOrderListPage(orderQueryVo orderQueryVo) throws Exception {
		return orderMapperCustom.findOrderListPage(orderQueryVo);
	}

}
