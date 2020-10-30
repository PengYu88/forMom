package cn.itcast.ssm.po;

public class orderQueryVo {

	//商品信息
	private order order;
	
	//为了系统可扩展性，对原始po进行扩展
	private orderCustom orderCustom;
	

	public order getOrder() {
		return order;
	}

	public void setOrder(order order) {
		this.order = order;
	}

	public orderCustom getOrderCustom() {
		return orderCustom;
	}

	public void setOrderCustom(orderCustom orderCustom) {
		this.orderCustom = orderCustom;
	}

	
}