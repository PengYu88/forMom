package cn.itcast.ssm.mapper;

import java.util.List;

import cn.itcast.ssm.po.clientAdress;
import cn.itcast.ssm.po.clientCustom;
import cn.itcast.ssm.po.clientQueryVo;

public interface clientMapperCustom {
	
	//客户列表查询
    public List<clientCustom> findClientList(clientQueryVo clientQueryVo)throws Exception;

    //客户数量查询
	public List<clientCustom> findClientCount(clientQueryVo clientQueryVo)throws Exception;
	
	//插入客户信息
	public void insertClient(clientCustom clientCustom)throws Exception;
	
	//删除客户信息
	public void deleteClient(clientQueryVo clientQueryVo)throws Exception;
	
	//修改客户信息
	public void updateClient(clientCustom clientCustom)throws Exception;
	
	
	public List<clientAdress> findClientAdress(clientAdress clientAdress)throws Exception;
	
	
	
}