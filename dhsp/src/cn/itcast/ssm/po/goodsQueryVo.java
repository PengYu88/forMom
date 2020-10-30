package cn.itcast.ssm.po;

public class goodsQueryVo {

	//商品信息
	private goods goods;
	
	//为了系统可扩展性，对原始po进行扩展
	private goodsCustom goodsCustom;

	public goods getGoods() {
		return goods;
	}

	public void setGoods(goods goods) {
		this.goods = goods;
	}

	public goodsCustom getGoodsCustom() {
		return goodsCustom;
	}

	public void setGoodsCustom(goodsCustom goodsCustom) {
		this.goodsCustom = goodsCustom;
	}
	
}