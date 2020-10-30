tsc.userEdit = {
		
		init: function() {
		// 初始化事件绑定
			tsc.userEdit.event();
			tsc.userEdit.doRolehEdit();
			tsc.userEdit.doIndustryhEdit();
	        tsc.userEdit.validate();
		},
		//定义事件绑定	
		event: function() {
			
			 $("#submit").on("click", tsc.userEdit.doSubmit);
		},
	
		// 提交表单刷新页面
		doSubmit: function(){
			
		},
		//已选行业勾选 by zhangchao
		doIndustryhEdit: function() {

		$(".row .col-xs-12 input[name*=industryhidden]").each(function(){
			
				var industryId=$(this).val();
				 $(".row  .industryIdAndNameArrayDiv").each(function(){
					var industryIdEdit=$(this).find('input[name*=industryIdAndNameArray]');
					if(industryIdEdit.val() == industryId){
						 industryIdEdit.attr("checked","checked");
					 }
						
					 
				 })
				
			})
			
		},
		//已选角色勾选 by zhangchao
		doRolehEdit: function() {
			
			$(".row .col-xs-12 input[name*=rolehidden]").each(function(){
			
				var roleId=$(this).val();
				 
				 $(".row .roleEditArray .roleArray ").each(function(){
					 var roleIdEdit=$(this).find('input[name*=roleIdArray]');	
					 if(roleIdEdit.val() == roleId){
						 roleIdEdit.attr("checked","checked");
					 }
						
					 
				 })
				
			})
			
		},
	   //表单验证
       validate: function(){
       	
           $("#user-edit-form").validate({
             ignore: ".ignore",
             rules: {
            	 account: {
                    required: true
                } , 
                 departmentIdAndName: {
	                required: true
	            } ,
	             name: {
		            required: true
		            } ,
		         email:{
		        	 email: true
		         },
		         phone:{
		        	 mobile: true
		         },
		         qq:{
		        	 qq: true
		         }
              },    
            
           });	        	
         },
		// 表单提交
		doSave: function(callBackFunc){
			
			// 表单验证
			if(!$("#user-edit-form").valid()){
				return false;
			}
			
			// 表单提交
			$('#user-edit-form').ajaxSubmit({
				target: '#user-edit-form',
				dataType: 'json',
				success: function(rs) {
					callBackFunc(rs);
					
				}
			});
			return false;
		}		

};

// 初始化
tsc.userEdit.init();