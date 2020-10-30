package cn.itcast.ssm.service;

import java.util.List;

import cn.itcast.ssm.po.clientAdress;
import cn.itcast.ssm.po.goodsCustom;
import cn.itcast.ssm.po.goodsQueryVo;

/**
 * 
 * <p>Title: goodsService</p>
 * <p>Description:商品管理service </p>
 * <p>Company: www.itcast.com</p> 
 * @author	李鹏宇
 * @date	2017-2-20下午3:48:09
 * @version 1.0
 */
public interface goodsService {
	
	//商品列表查询
	public List<goodsCustom> findGoodsList(goodsQueryVo goodsQueryVo)throws Exception;

	//商品数量查询
	public List<goodsCustom> findGoodsCount(goodsQueryVo goodsQueryVo)throws Exception;
	
	//修改商品
	public void updateGoods(goodsCustom goodsCustom)throws Exception;

	//新增商品
	public void insertGoods(goodsCustom goodsCustom)throws Exception;
	
	//删除商品
	public void deleteGoods(goodsQueryVo goodsQueryVo)throws Exception;

	public List<clientAdress> goodsCode(goodsQueryVo goodsQueryVo) throws Exception;
	
	public List<clientAdress> goodsName(goodsQueryVo goodsQueryVo) throws Exception;
}
