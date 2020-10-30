package cn.itcast.ssm.po;

public class clientQueryVo {

	//商品信息
	private client client;
	
	//为了系统可扩展性，对原始po进行扩展
	private clientCustom clientCustom;

	public client getClient() {
		return client;
	}

	public void setClient(client client) {
		this.client = client;
	}

	public clientCustom getClientCustom() {
		return clientCustom;
	}

	public void setClientCustom(clientCustom clientCustom) {
		this.clientCustom = clientCustom;
	}
}