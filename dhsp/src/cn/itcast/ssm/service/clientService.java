package cn.itcast.ssm.service;

import java.util.List;

import cn.itcast.ssm.po.clientAdress;
import cn.itcast.ssm.po.clientCustom;
import cn.itcast.ssm.po.clientQueryVo;
 

/**
 * 
 * <p>Title: clientService</p>
 * <p>Description:客户管理service </p>
 * <p>Company: www.dhc.com.cn</p> 
 * @author	李鹏宇
 * @date	2017-2-18下午23:31:09
 * @version 1.0
 */
public interface clientService {
	
	//客户列表查询
	public List<clientCustom> findClientList(clientQueryVo clientQueryVo)throws Exception;

	//客户数量查询
	public List<clientCustom> findClientCount(clientQueryVo clientQueryVo)throws Exception;
	
	//删除客户信息
	public void deleteClient(clientQueryVo clientQueryVo)throws Exception;
	
	//插入客户信息
	public void insertClient(clientCustom clientCustom)throws Exception;
	
	//修改客户信息
	public void updateClient(clientCustom clientCustom)throws Exception;
	
	

	public List<clientAdress> clientAdress(clientAdress clientQueryVo)throws Exception;
	
}
