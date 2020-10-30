package cn.itcast.ssm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.itcast.ssm.mapper.clientMapperCustom;
import cn.itcast.ssm.po.clientCustom;
import cn.itcast.ssm.po.clientQueryVo;
import cn.itcast.ssm.service.clientService;
import cn.itcast.ssm.po.clientAdress;

public class clientServiceImpl implements clientService{
	
	//注入客户管理数据库mapper
	@Autowired
	private clientMapperCustom clientMapperCustom;

	//客户列表查询
	@Override
	public List<clientCustom> findClientList(clientQueryVo clientQueryVo) throws Exception {
		
		return clientMapperCustom.findClientList(clientQueryVo);
		
	}

	//客户数量查询
	@Override
	public List<clientCustom> findClientCount(clientQueryVo clientQueryVo) throws Exception {
		
		return clientMapperCustom.findClientCount(clientQueryVo);
		
	}

	//删除客户信息
	@Override
	public void deleteClient(clientQueryVo clientQueryVo) throws Exception {
		
		clientMapperCustom.deleteClient(clientQueryVo);
		
	}

	//插入客户信息
	@Override
	public void insertClient(clientCustom clientCustom) throws Exception {
		
		clientMapperCustom.insertClient(clientCustom);
		
	}

	//修改客户信息
	@Override
	public void updateClient(clientCustom clientCustom) throws Exception {
		
		clientMapperCustom.updateClient(clientCustom);
		
	}

	@Override
	public List<clientAdress> clientAdress(clientAdress clientAdress)throws Exception {
		return clientMapperCustom.findClientAdress(clientAdress);
	}

}
