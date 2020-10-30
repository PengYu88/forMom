package cn.itcast.ssm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import cn.itcast.ssm.mapper.configMapperCustom;

import cn.itcast.ssm.po.config;
import cn.itcast.ssm.service.configService;

public class configServiceImpl implements configService{
	
	@Autowired
	private configMapperCustom configMapperCustom;

	@Override
	public config findconfig() throws Exception {
		return configMapperCustom.findconfig();
	}


	@Override
	public void updateconfig(config config) throws Exception {
		configMapperCustom.updateconfig(config);
	}
 

}
