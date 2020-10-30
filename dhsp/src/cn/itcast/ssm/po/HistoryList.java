package cn.itcast.ssm.po;

import java.util.List;

public class HistoryList {
	 private List<HistoryCostom> historyCostoms;
	 private String clientInfo;
	 private String updateTime;
	 private String priceSum;
	 
	public List<HistoryCostom> getHistoryCostoms() {
		return historyCostoms;
	}
	public void setHistoryCostoms(List<HistoryCostom> historyCostoms) {
		this.historyCostoms = historyCostoms;
	}
	public String getClientInfo() {
		return clientInfo;
	}
	public void setClientInfo(String clientInfo) {
		this.clientInfo = clientInfo;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getPriceSum() {
		return priceSum;
	}
	public void setPriceSum(String priceSum) {
		this.priceSum = priceSum;
	}
	 
 
	
}