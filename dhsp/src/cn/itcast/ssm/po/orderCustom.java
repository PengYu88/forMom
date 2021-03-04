package cn.itcast.ssm.po;

import java.util.List;

public class orderCustom extends order {
	
	private int count;
	
	private double ordreCount;
	
	private String price;
	
	private int num;//当前页
	
	private List<HistoryCostom> historyCostoms;

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

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

	public List<HistoryCostom> getHistoryCostoms() {
		return historyCostoms;
	}

	public void setHistoryCostoms(List<HistoryCostom> historyCostoms) {
		this.historyCostoms = historyCostoms;
	}
	
	
}