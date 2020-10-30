package cn.itcast.ssm.po;

public class orderCustom extends order {
	
	private int count;
	
	private double ordreCount;
	
	private String price;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public double getOrdreCount() {
		return ordreCount;
	}

	public void setOrdreCount(double ordreCount) {
		this.ordreCount = ordreCount;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}
	
}