tsc.subAccountEdit = {

    init: function(){

        //表单验证
        tsc.subAccountEdit.validate();
        tsc.subAccountEdit.doCreateTree();
        tsc.subAccountEdit.doIndustryhEdit();
        tsc.subAccountEdit.doRoleEdit();
        tsc.subAccountEdit.doRoleClick();
    },
    //勾选行业
	doIndustryhEdit: function() {

		$(".inudstryHddien .industryHid input[name*=industryhidden]").each(function(){
			
				var industryId=$(this).val();
				//alert(industryId);
				 $(".inudstryRow .industry .industryArray").each(function(){
					var industryIdEdit=$(this).find('input[type*=checkbox]');
					if(industryIdEdit.val() == industryId){
						 industryIdEdit.attr("checked","checked");
					 }
						
					 
				 })
				
			})
			
		},
		
	//勾选岗位
	doRoleEdit: function() {
		var roleIdHidden = $("#roleIdHidden").val();
		$(".roleDIV").each(function(){
			var roleId = $(this).find("input[name*=roleId]");
			if(roleId.val() == roleIdHidden){
				roleId.attr("checked","checked");
			}
		})
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
    	var editFlag = $("#editFlag").val();
		var userId = $("#userId").val();
        $.getJSON("subAccount/treeInfos", {"editFlag" : editFlag, "userId" : userId}, function(rs) {
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

        $("#subAccountEdit-edit-form").validate({
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
        if(!$("#subAccountEdit-edit-form").valid()){
            return false;
        }
        $("#subTreeInfos").val($("#-tree").jstree(true).get_checked());
        // 表单提交
        $('#subAccountEdit-edit-form').ajaxSubmit({
            target: '#subAccountEdit-edit-form',
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
        if(!$("#subAccountEdit-edit-form").valid()){
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


tsc.subAccountEdit.init();