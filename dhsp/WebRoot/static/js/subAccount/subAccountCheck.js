tsc.subAccountCheck = {

    init: function(){

        //表单验证
        tsc.subAccountCheck.validate();
        tsc.subAccountCheck.doCreateTree();
        tsc.subAccountCheck.doRoleClick();
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
    	var userId = $("#userId").val();
    	var editFlag = $("#editFlag").val();
        $.getJSON("subAccount/treeInfos",{"userId" : userId, "editFlag" : editFlag}, function(rs) {
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

            // 查询
//            tsc.CategoryList.doQuery(selected.node.id);
        });


    },
    //表单验证
    validate: function(){

        $("#subAccountCheck-edit-form").validate({
            ignore: ".ignore",
            rules: {
                column1: {
                    required: true
                },
                column2: {
                    mobile: true
                }

            },
        });
    },
    
    // 表单提交
    doSave: function(callBackFunc){
        // 表单验证
        if(!$("#subAccountCheck-edit-form").valid()){
            return false;
        }
        $("#subTreeInfos").val($("#-tree").jstree(true).get_checked());
        // 表单提交
        $('#subAccountCheck-edit-form').ajaxSubmit({
            target: '#subAccountCheck-edit-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },
    // 表单提交(不通过)
    noThrough: function(callBackFunc){
        var userId = $("#userId").val();
        // 表单验证
        if(!$("#subAccountCheck-edit-form").valid()){
            return false;
        }

        $.ajax({
        	data:{"userId": userId},
            type: "post",
            url: "/subAccount/noPassword",
            datatype: 'json',
            success: function(rs) {
            	
                callBackFunc(rs);
            }
        });
        return false;
    }

}


tsc.subAccountCheck.init();