var deletList = [];
tsc.AttributeEdit = {
		
	init: function() {

		// 初始化事件绑定
		tsc.AttributeEdit.event();
		// 初始化表单验证
		tsc.AttributeEdit.validate();
	},
	
	//定义事件绑定	
	event: function() {

		// 添加属性值
		$("#addAttrValBtn").on("click", tsc.AttributeEdit.doAddAttrVal);
	},
	

	// 表单验证
	validate: function(){
		$("#category-edit-form").validate({
			rules: {
				column1: {
					required: true
				}
			}
		});
	},
	
	// 添加属性值
	doAddAttrVal: function(){
		
		
		buildHtmlWithJsonArray("attrValRepeat", [{}], false, true);
	},
	
	// 删除属性值
	doRemoveAttrVal: function(obj){
		
		deletList.push($(obj).parent().parent().attr("attrValId"));
		$(obj).parent().parent().parent().remove();
	},
	
	doRemoveAttrValChild: function(obj){
		
		$(obj).parent().parent().remove();
	},
	// 保存
	doSave: function(callBackFunc){
		
		$("#back-val div input[name='attrVal']").each(function(){
			if($(this).val() == ""){
				/*sweetAlert({
					title: "属性值不能为空",
					text: SYS_MSG.MSG_AUOT_CLOSE,
					type: 'warning',
					showConfirmButton: false,
					timer: SYS_CONF.ALERT_TIMER,
				});
				return false;*/
				tsc.AttributeEdit.doRemoveAttrValChild(this);
			}
		});
		$("#new-val div input[name='attrVal']").each(function(){
			if($(this).val() == ""){
				tsc.AttributeEdit.doRemoveAttrValChild(this);
			}
		});
			
		
		// 表单验证
		if(!$("#attrmap-edit-form").valid()){
			return false;
		}
		if(deletList.length>0){
			var index =0;
			$(deletList).each(function(){
				$("#hide-remove-id").append("<input type=\"hidden\" id=\"removeId\" name=\"removeId\" value=\""+deletList[index]+"\">");
				index++;
			});
		}
		
		console.log($("#attrmap-edit-form").serialize());
		// 表单提交
		$('#attrmap-edit-form').ajaxSubmit({
			target: '#attrmap-edit-form',
			method:"POST",
			dataType:"json",
			success: function(rs) {
				callBackFunc(rs);
			}
		});
		return false;
	}
};

// 初始化
$(function(){
	tsc.AttributeEdit.init();
})

