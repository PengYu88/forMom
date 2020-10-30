package cn.itcast.ssm.mapper;

import cn.itcast.ssm.po.config;

public interface configMapperCustom {
	
	public config findconfig()throws Exception;

	public void updateconfig(config config)throws Exception;

	
}