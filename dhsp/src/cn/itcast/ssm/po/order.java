package cn.itcast.ssm.po;

public class order {
	
	private String orderId;
	
	private String orderNo;
	
	private String orderClient;
	
	private String orderTime;
	
	private double orderSum;
	
	private String inventorySum; //盘点总金额
	
	private String orderSts;
	
	private String deliveryMan;
	
	private String deliveryDate;

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderClient() {
		return orderClient;
	}

	public void setOrderClient(String orderClient) {
		this.orderClient = orderClient;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public double getOrderSum() {
		return orderSum;
	}

	public void setOrderSum(double orderSum) {
		this.orderSum = orderSum;
	}

	public String getInventorySum() {
		return inventorySum;
	}

	public void setInventorySum(String inventorySum) {
		this.inventorySum = inventorySum;
	}

	public String getOrderSts() {
		return orderSts;
	}

	public void setOrderSts(String orderSts) {
		this.orderSts = orderSts;
	}

	public String getDeliveryMan() {
		return deliveryMan;
	}

	public void setDeliveryMan(String deliveryMan) {
		this.deliveryMan = deliveryMan;
	}

	public String getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	
	
	
}