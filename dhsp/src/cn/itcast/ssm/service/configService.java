package cn.itcast.ssm.service;

import cn.itcast.ssm.po.config;
 
public interface configService {
	
	public config findconfig()throws Exception;

	public void updateconfig(config config)throws Exception;
}
