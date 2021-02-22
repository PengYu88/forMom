package cn.itcast.ssm.po;

public class goodsCustom extends goods {
	
	private int count;
	
	private int num;//当前页
	
	private int ifHasHistory;
	
	private double reduceNum;
	
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

	public int getIfHasHistory() {
		return ifHasHistory;
	}

	public void setIfHasHistory(int ifHasHistory) {
		this.ifHasHistory = ifHasHistory;
	}

	public double getReduceNum() {
		return reduceNum;
	}

	public void setReduceNum(double reduceNum) {
		this.reduceNum = reduceNum;
	}
	

}