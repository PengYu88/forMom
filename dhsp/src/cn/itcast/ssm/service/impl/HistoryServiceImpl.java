package cn.itcast.ssm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.itcast.ssm.mapper.HistoryMapperCustom;
import cn.itcast.ssm.po.HistoryCostom;
import cn.itcast.ssm.po.HistoryList;
import cn.itcast.ssm.service.HistoryService;

public class HistoryServiceImpl implements HistoryService{
	
	//注入订单订单数据库mapper
	@Autowired
	private HistoryMapperCustom historyMapperCustom;

	@Override
	public void insertHistory(HistoryCostom historyCostom) throws Exception {
		historyMapperCustom.insertHistory(historyCostom);
	}

	@Override
	public List<HistoryList> findHistoryList(String clientInfo) throws Exception {
		
		return historyMapperCustom.findHistoryList(clientInfo);
	}
	
	@Override
	public List<HistoryCostom> findHistoryListByOrderId(String orderId) throws Exception {
		
		return historyMapperCustom.findHistoryListByOrderId(orderId);
	}

	@Override
	public List<HistoryCostom> findHistory(String updateTime) throws Exception {
		return historyMapperCustom.findHistory(updateTime);
	}

	@Override
	public void deleteHistory(HistoryCostom historyCostom) throws Exception {
		historyMapperCustom.deleteHistory(historyCostom);
	}

	@Override
	public List<HistoryCostom> selectGoodPriceByClient(HistoryCostom historyCostom) throws Exception {
		return historyMapperCustom.selectGoodPriceByClient(historyCostom);
	}

	 

}
