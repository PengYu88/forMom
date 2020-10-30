tsc.userAdd = {
		
		init: function() {
		
			checkAll();
		    
			// 初始化事件绑定
			tsc.userAdd.bindEvent();
			
			tsc.userAdd.validate();
		},

		//定义事件绑定	
		bindEvent: function() {
			
				$("#submit").on("click", tsc.userAdd.doSubmit);
		},
	
		// 提交表单刷新页面
		doSubmit: function(){
			
		},
		 //表单验证
	     validate: function(){
	           $("#user-add-form").validate({
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
	 		        	 mail: true
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
		if(!$("#user-add-form").valid()){
				return false;
			}
			// 表单提交
			$('#user-add-form').ajaxSubmit({
				target: '#user-add-form',
				dataType: 'json',
				success: function(rs) {
					callBackFunc(rs);
					
				}
			});
			return false;
		}				

};


// 初始化
tsc.userAdd.init();

function checkAll(){
	 $("#checkAdm").click(function(){
		 		if(this.checked){
          $("#checkAdmList :checkbox").each(function () {  
            $(this).attr("checked", !$(this).attr("checked"));  
          });  
		 		}
	 });
	 $("#checkTec").click(function(){
	 		if(this.checked){
       $("#checkTecList :checkbox").each(function () {  
         $(this).attr("checked", !$(this).attr("checked"));  
       });  
	 		}
	 });
	 $("#checkChina").click(function(){
	 		if(this.checked){
      $("#checkChinaList :checkbox").each(function () {  
        $(this).attr("checked", !$(this).attr("checked"));  
      });  
	 		}
	 });
}