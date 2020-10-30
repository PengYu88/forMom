tsc.RoleEdit = {
		
		init: function() {
			// 初始化事件绑定
			tsc.RoleEdit.event();
			tsc.RoleEdit.doCreateTree();
			//表单验证初始化
			tsc.RoleEdit.validate();
		},
		
		//定义事件绑定	
		event: function() {
		},
	
		// 提交表单刷新页面
		doSubmit: function(){
			
		},
		
		//表单验证
		validate: function(){
      $("#role-edit-form").validate({
        ignore: ".ignore",
        rules: {
        	"roleName": {
                required: true
           },
         	"deptId": {
         		required: true
         	},
         	      
        },
    });		
		},
		
		// 创建分类树
		doCreateTree: function(){
			var editFlag = $("#editflag").val();
			var roleId = $("#roleId").val();
			$.getJSON("role/treeInfos",{"editFlag":editFlag,"roleId":roleId}, function(rs) {
				console.log(rs);
				$("#-tree").jstree({
					"core" : {
			            "check_callback" : true,
			            "data" : rs.data
			        },
			    "plugins":["checkbox"]
						
		        }).on("loaded.jstree", function (event, data) {
		           var treeJson = $('#-tree').jstree(true).get_json(null, {
		              flat: true
		           });
		           
		           for (var i = 0; i < treeJson.length; i++) {
		        	   	  //console.log(treeJson[23]);
			              if (treeJson[i].data.isSelected == "1") {
		                  $('#-tree').jstree("check_node",treeJson[i].id);
		              }
		           }
		        	
				});
			});
			
			// 树节点左键相应函数
			$("#-tree").on("select_node.jstree", function (node, selected, event) {
					
			});
		},
	
		// 表单提交
		doSave: function(callBackFunc){
			// 表单验证
			if(!$("#role-edit-form").valid()){
				return false;
			}
			$("#roleTreeInfos").val($("#-tree").jstree(true).get_checked());
			// 表单提交
			$('#role-edit-form').ajaxSubmit({
				target: '#role-edit-form',
				dataType: 'json',
				success: function(rs) {
					//alert($("#-tree").jstree(true).get_checked());
					callBackFunc(rs);
				}
			});
			return false;
		}		

};

// 初始化
tsc.RoleEdit.init();