package cn.itcast.ssm.po;

public class goodsCustom extends goods {
	
	private int count;
	
	private int num;//当前页
	
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

}