var deletList = [];
tsc.SpecEdit = {
		
		init: function() {

			// 初始化事件绑定
			tsc.SpecEdit.event();
			// 初始化表单验证
			tsc.SpecEdit.validate();
		},
		
		//定义事件绑定	
		event: function() {

			// 添加属性值
			$("#addSpecValBtn").on("click", tsc.SpecEdit.doAddSpecVal);
		},
		

		// 表单验证
		validate: function(){
			$("#category-edit-form").validate({
				rules: {
					attrVal: {
						required: true
					}
				}
			});
		},
		
		// 添加属性值
		doAddSpecVal: function(){
			buildHtmlWithJsonArray("specValRepeat", [{}], false, true);
		},
		
		// 删除属性值
		doRemoveSpecVal: function(obj){
			deletList.push($(obj).parent().parent().attr("specValId"));
			$(obj).parent().parent().parent().remove();
		},
		
		doRemoveSpecValChild: function(obj){
			
			$(obj).parent().parent().remove();
		},
		// 保存
		doSave: function(callBackFunc){	
			
			$("#back-val div input[name='attrVal']").each(function(){
				if($(this).val() == ""){
				/*	sweetAlert({
						title: "属性值不能为空",
						text: SYS_MSG.MSG_AUOT_CLOSE,
						type: 'warning',
						showConfirmButton: false,
						timer: SYS_CONF.ALERT_TIMER,
					});*/
					tsc.SpecEdit.doRemoveSpecValChild(this);
				}
			});
			$("#new-val div input[name='attrVal']").each(function(){
				if($(this).val() == ""){
					tsc.SpecEdit.doRemoveSpecValChild(this);
				}
			});
				
			
			// 表单验证
			if(!$("#specmap-edit-form").valid()){
				return false;
			}
			if(deletList.length>0){
				var index =0;
				$(deletList).each(function(){
					$("#hide-remove-id").append("<input type=\"hidden\" id=\"removeId\" name=\"removeId\" value=\""+deletList[index]+"\">");
					index++;
				});
			}
			
			console.log($("#specmap-edit-form").serialize());
			// 表单提交
			$('#specmap-edit-form').ajaxSubmit({
				target: '#specmap-edit-form',
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
    tsc.SpecEdit.init();
})

