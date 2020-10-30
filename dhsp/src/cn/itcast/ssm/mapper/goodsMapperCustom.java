package cn.itcast.ssm.mapper;

import java.util.List;

import cn.itcast.ssm.po.clientAdress;
import cn.itcast.ssm.po.goodsCustom;
import cn.itcast.ssm.po.goodsQueryVo;

public interface goodsMapperCustom {
	
	//商品列表查询
    public List<goodsCustom> findGoodsList(goodsQueryVo goodsQueryVo)throws Exception;

	//商品数量查询
	public List<goodsCustom> findGoodsCount(goodsQueryVo goodsQueryVo)throws Exception;

	//新增商品
	public void insertGoods(goodsCustom goodsCustom)throws Exception;
	
	//删除商品
	public void deleteGoods(goodsQueryVo goodsQueryVo)throws Exception;
	
	//修改商品
	public void updateGoods(goodsCustom goodsCustom)throws Exception;

	public List<clientAdress> goodsCode(goodsQueryVo goodsQueryVo)throws Exception;

	public List<clientAdress> goodsName(goodsQueryVo goodsQueryVo)throws Exception;
	
}