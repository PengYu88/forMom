package cn.itcast.ssm.service;

import java.util.List;

import cn.itcast.ssm.po.HistoryCostom;
import cn.itcast.ssm.po.HistoryList;


public interface HistoryService {
	
	 
	//插入订单信息
	public void insertHistory(HistoryCostom historyCostom)throws Exception;
	
	
	//查询历史
	public List<HistoryList> findHistoryList(String clientInfo)throws Exception;
	
	public List<HistoryCostom> findHistoryListByOrderId(String orderId) throws Exception;
	
	//查询历史
	public List<HistoryCostom> selectGoodPriceByClient(HistoryCostom historyCostom)throws Exception;
	
	
	//查询历史
	public List<HistoryCostom> findHistory(String updateTime)throws Exception;
	
	
	//删除历史
	public void deleteHistory(HistoryCostom historyCostom)throws Exception;
	
	
	public List<HistoryCostom> findHistoryListById(String orderId)throws Exception;
	
	
	public String findSumById(String orderId)throws Exception;
	
	 
}
