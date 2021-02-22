package cn.itcast.ssm.mapper;

import java.util.List;

import cn.itcast.ssm.po.HistoryCostom;
import cn.itcast.ssm.po.HistoryList;

public interface HistoryMapperCustom {
	
	public void insertHistory(HistoryCostom historyCostom)throws Exception;
	
	
	public List<HistoryList> findHistoryList(String clientInfo)throws Exception;
	
	
	public List<HistoryCostom> selectGoodPriceByClient(HistoryCostom historyCostom)throws Exception;
	
	
	public List<HistoryCostom> findHistory(String updateTime)throws Exception;
	
	public List<HistoryCostom> findHistoryListByOrderId(String orderId)throws Exception;
	
	
	public void deleteHistory(HistoryCostom historyCostom)throws Exception;
	
	
	public List<HistoryCostom> findHistoryListById(String orderId)throws Exception;
	
	
	public String findSumById(String orderId)throws Exception;
	
	
}