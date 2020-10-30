tsc.orgAdd = {
        
        init: function() {
            // 初始化事件绑定
            tsc.orgAdd.event();
            //初始化表单验证
            tsc.orgAdd.validate();
        },

        //定义事件绑定    
        event: function() {
            
        },
    
        // 提交表单刷新页面
        doSubmit: function(){
            
        },
        //表单验证
         validate: function(){
        	
            $("#org-edit-form").validate({
              ignore: ".ignore",
              rules: {
              	name: {
                     required: true
                 }      
              },
          });	        	
          },
    
        // 表单提交
        doSave: function(callBackFunc){
            
            // 表单验证
            if(!$("#org-edit-form").valid()){
                return false;
            }
            
            // 表单提交
            $('#org-edit-form').ajaxSubmit({
                target: '#org-edit-form',
                dataType: 'json',
                success: function(rs) {
                    callBackFunc(rs);
                }
            });
            return false;
        }       

};

// 初始化
tsc.orgAdd.init();