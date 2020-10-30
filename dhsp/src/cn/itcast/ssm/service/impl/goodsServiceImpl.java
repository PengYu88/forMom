package cn.itcast.ssm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import cn.itcast.ssm.mapper.goodsMapperCustom;
import cn.itcast.ssm.po.clientAdress;
import cn.itcast.ssm.po.goodsCustom;
import cn.itcast.ssm.po.goodsQueryVo;
import cn.itcast.ssm.service.goodsService;

public class goodsServiceImpl implements goodsService{
	
	//注入商品管理数据库mapper
	@Autowired
	private goodsMapperCustom goodsMapperCustom;

	//商品列表查询
	@Override
	public List<goodsCustom> findGoodsList(goodsQueryVo goodsQueryVo) throws Exception {
		
		return goodsMapperCustom.findGoodsList(goodsQueryVo);
		
	}

	//商品数量查询
	@Override
	public List<goodsCustom> findGoodsCount(goodsQueryVo goodsQueryVo) throws Exception {
		
		return goodsMapperCustom.findGoodsCount(goodsQueryVo);
		
	}
	 
	//修改商品
	@Override
	public void updateGoods(goodsCustom goodsCustom) throws Exception {
		
		goodsMapperCustom.updateGoods(goodsCustom);
		
	}

	//新增商品
	@Override
	public void insertGoods(goodsCustom goodsCustom) throws Exception {
		
		goodsMapperCustom.insertGoods(goodsCustom);
		
	}

	//删除商品
	@Override
	public void deleteGoods(goodsQueryVo goodsQueryVo) throws Exception {
		
		goodsMapperCustom.deleteGoods(goodsQueryVo);
		
	}

	@Override
	public List<clientAdress> goodsCode(goodsQueryVo goodsQueryVo) throws Exception {
		return goodsMapperCustom.goodsCode(goodsQueryVo);
	}
	
	@Override
	public List<clientAdress> goodsName(goodsQueryVo goodsQueryVo) throws Exception {
		return goodsMapperCustom.goodsName(goodsQueryVo);
	}

}
