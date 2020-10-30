tsc.subAccountAdd = {

    init: function(){
    	// 初始化事件绑定
		tsc.subAccountAdd.event();
        //表单验证
        tsc.subAccountAdd.validate();
        $("input[name = roleId]:first").attr("checked", true);
        //树
        tsc.subAccountAdd.doCreateTree();
        tsc.subAccountAdd.doRoleClick();
    },
    
    //定义事件绑定	
	event: function() {
		$("#submit").on("click", tsc.subAccountAdd.doSubmit);
	},

	// 提交表单刷新页面
	doSubmit: function(){
		
	},	
	doRoleClick: function(){
		$("input[name = roleId]").click(function(){
			var roleId  = $(this).val();
			$("#-tree").remove();
		    $("#addTree").append("<div id='-tree'></div>");
			var addFlag = $("#addFlag").val();
			$.getJSON("subAccount/treeInfos", {"roleId" : roleId, "addFlag" : addFlag}, function(rs) {
	        	console.log(rs);
	       
	            $("#-tree").jstree({
	                "core" : {
	                    "check_callback" : true,
	                    "data" : rs.data
	                },
	                "plugins": ["checkbox"]
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

		})
	},

    // 创建分类树
    doCreateTree: function () {
    	var roleId = $("input[name = roleId]:checked").val();
    	var addFlag = $("#addFlag").val();
        $.getJSON("subAccount/treeInfos", {"roleId" : roleId, "addFlag" : addFlag}, function(rs) {
        	console.log(rs);
            $("#-tree").jstree({
                "core" : {
                    "check_callback" : true,
                    "data" : rs.data
                },
                "plugins": ["checkbox"]
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

    //表单验证
    validate: function(){

        $("#subAccountAdd-edit-form").validate({
            ignore: ".ignore",
            rules: {
                "realName": {
                    required: true
                },
                "mobileNo": {
                	required: true,
                    mobile: true
                }
            },
        });
    },

    // 表单提交
    doSave: function(callBackFunc){

        // 表单验证
        if(!$("#subAccountAdd-edit-form").valid()){
            return false;
        }
        $("#subTreeInfos").val($("#-tree").jstree(true).get_checked());

        // 表单提交
        $('#subAccountAdd-edit-form').ajaxSubmit({
            target: '#subAccountAdd-edit-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    }

}

tsc.subAccountAdd.init();

