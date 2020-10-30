tsc.AreaList = {

    //页面加载初始化
    init: function() {

        // 初始化输入控件格式
        $(":input").inputmask();

        // 初始化验证器
        tsc.AreaList.validator();

        // 初始化按钮绑定事件
        tsc.AreaList.bindEvent();

        // 功能树树信息初始化
        tsc.AreaList.doCreateTree();
    },

    // 初始化验证器
    validator: function(){
        $("#-form").validate({
            rules: {
            	areaCode: {
                    required: true
                },
                areaName:{
                	required: true
                }
            }
        });
    },

    // 初始化按钮绑定事件
    bindEvent: function(){

        $("#addBtn").on("click", tsc.AreaList.doNew);

        $("#saveBtn").on("click", tsc.AreaList.doSave);

        $("#deleteBtn").on("click", tsc.AreaList.doDelete);

        $("#addRootBtn").on("click",tsc.AreaList.doAddRoot);

    },

    // 初始化组织树状菜单
    doCreateTree: function(){
        $.getJSON("/content/area/queryAreaInfo", function(rs) {
            $("#-tree").jstree({
                "core" : {
                    "multiple": false,
                    "check_callback" : true,
                    "data" : rs.data
                }
            }).on("loaded.jstree", function (event, data) {

            });
        });

        // 树节点左键相应函数(监听)
        $("#-tree").on("select_node.jstree", function (node, selected, event) {

            tsc.AreaList.clear();

            $("#addBtn").attr("disabled", true);
            $("#deleteBtn").attr("disabled", false);
            $("#saveBtn").attr("disabled", false);

            // 标准属性
            $("#column1").val(selected.node.id);
            $("#column2").val(selected.node.text);
            $("#areaId").val(selected.node.data.areaId);
            $("#parentCode").val(selected.node.parent);
            $("#oldAreaCode").val(selected.node.id);
            $("#level").val(selected.node.data.level);

            if(selected.node.data.actionType == "edit"){
                $("#addBtn").attr("disabled", true);
            }else {

                // 判断是否已经达到4级
                if(selected.node.data.level != "4"){
                    $("#addBtn").attr("disabled", false);
                }
            }

        });
    },

    // 新建一级
    doAddRoot: function() {

        var jstree = $("#-tree").jstree(true);

        tsc.AreaList.clear();

        var node_new = jstree.create_node("#", {
            text: '新建顶级',
            parent: "#",
            data: {
                actionType: 'edit',
                level: "0",
            }
        });

        // 清除已选
        if(jstree.get_selected().length > 0){
            var node = jstree.get_node(jstree.get_selected()[0])
            jstree.deselect_node(node);
        }

        // 创建并选中
        jstree.select_node(node_new);
        
        //新建清空id
        $("#areaId").val("");
    },

    // 新建
    doNew: function(){

        var jstree = $("#-tree").jstree(true);

        var node = jstree.get_node(jstree.get_selected()[0])

        tsc.AreaList.clear();

        var node_new = jstree.create_node(node.id, {
            text: '新建下级',
            parent: node.id,
            data: {
                actionType: 'edit',
                status: "1",
                level: parseInt(node.data.level) + 1
            }
        });

        // 清除已选
        jstree.deselect_node(node);

        // 创建并选中
        jstree.select_node(node_new);
        
        //新建清空id
        $("#areaId").val("");

    },

    // 保存
    doSave: function(){

        if(!$("#-form").valid()){
            return false;
        }

        //地区id
        var areaId = $("#areaId").val();
        //原地区代码
        var oldAreaCode = $("#oldAreaCode").val();
        //输入的地区代码
        var areaCode = $("#column1").val();
        
        //若地区id为空表示新建地区信息
        if(areaId == ""){
        	//校验新添加的地区代码不能重复
        	$.getJSON("/content/area/checkAreaCode",{"areaCode":areaCode}, function(rs) {
        		if(rs.data) {
					App.alert({
						container: "#error-alerts",
	                    type: 'danger',
	                    icon: 'warning',
	                    message: '地区代码已存在，请重新填写'
	                });
				}else{
					$('#-form').ajaxSubmit({
			            target: '#-form',
			            dataType: 'json',
			            success: function(data){

			                if(data.code == "0"){

			                    // 提示保存成功
			                    sweetAlert({
			                        title: SYS_MSG.MSG_SAVE_SUCCESS,
			                        text: SYS_MSG.MSG_AUOT_CLOSE,
			                        type: 'success',
			                        showConfirmButton: false,
			                        timer: SYS_CONF.ALERT_TIMER,
			                    });

			                    // 取得组织列表树
			                    var jstree = $("#-tree").jstree(true);

			                    // 取得选中的节点
			                    var node = jstree.get_node(jstree.get_selected()[0]);

			                    // 更新节点数据
			                    node.data.actionType = "add";
			                    node.text = $("#column2").val();

			                    jstree.set_id(node, $("#column1").val());
			                    node.data.areaId = data.data.id;
			                    $("#areaId").val(data.data.id);
			                    $("#oldAreaCode").val($("#column1").val());
			                    
			                    // 重新绘制节点
			                    jstree.redraw($("#column1").val());

			                    // 选中
			                    jstree.select_node($("#column1").val());
			                }
			            }
			        });
				}
        	});
        }
        //地区id不为空表示修改地区数据
        else{
        	//判断地区代码是否进行过修改
        	if(areaCode == oldAreaCode){
        		//地区代码未进行修改直接提交表单
        		$('#-form').ajaxSubmit({
		            target: '#-form',
		            dataType: 'json',
		            success: function(data){

		                if(data.code == "0"){

		                    // 提示保存成功
		                    sweetAlert({
		                        title: SYS_MSG.MSG_SAVE_SUCCESS,
		                        text: SYS_MSG.MSG_AUOT_CLOSE,
		                        type: 'success',
		                        showConfirmButton: false,
		                        timer: SYS_CONF.ALERT_TIMER,
		                    });

		                    // 取得组织列表树
		                    var jstree = $("#-tree").jstree(true);

		                    // 取得选中的节点
		                    var node = jstree.get_node(jstree.get_selected()[0]);

		                    // 更新节点数据
		                    node.data.actionType = "add";
		                    node.text = $("#column2").val();

		                    jstree.set_id(node, $("#column1").val());
		                    node.data.areaId = data.data.id;
		                    $("#areaId").val(data.data.id);
		                    $("#oldAreaCode").val($("#column1").val());
		                    
		                    // 重新绘制节点
		                    jstree.redraw($("#column1").val());

		                    // 选中
		                    jstree.select_node($("#column1").val());
		                }
		            }
		        });
        	}
        	else{
        		//地区代码已经修改，校验输入的地区代码是否与已存在
        		//校验新添加的地区代码不能重复
            	$.getJSON("/content/area/checkAreaCode",{"areaCode":areaCode}, function(rs) {
            		if(rs.data) {
    					App.alert({
    						container: "#error-alerts",
    	                    type: 'danger',
    	                    icon: 'warning',
    	                    message: '地区代码已存在，请重新填写'
    	                });
    				}else{
    					$('#-form').ajaxSubmit({
    			            target: '#-form',
    			            dataType: 'json',
    			            success: function(data){

    			                if(data.code == "0"){

    			                    // 提示保存成功
    			                    sweetAlert({
    			                        title: SYS_MSG.MSG_SAVE_SUCCESS,
    			                        text: SYS_MSG.MSG_AUOT_CLOSE,
    			                        type: 'success',
    			                        showConfirmButton: false,
    			                        timer: SYS_CONF.ALERT_TIMER,
    			                    });

    			                    // 取得组织列表树
    			                    var jstree = $("#-tree").jstree(true);

    			                    // 取得选中的节点
    			                    var node = jstree.get_node(jstree.get_selected()[0]);

    			                    // 更新节点数据
    			                    node.data.actionType = "add";
    			                    node.text = $("#column2").val();

    			                    jstree.set_id(node, $("#column1").val());
    			                    node.data.areaId = data.data.id;
    			                    $("#areaId").val(data.data.id);
    			                    $("#oldAreaCode").val($("#column1").val());
    			                    
    			                    // 重新绘制节点
    			                    jstree.redraw($("#column1").val());

    			                    // 选中
    			                    jstree.select_node($("#column1").val());
    			                }
    			            }
    			        });
    				}
            	});
        	}
        }
    },

    // 删除
    doDelete: function(){

        var jstree = $("#-tree").jstree(true);

        var node = jstree.get_selected()[0];

        // 选中节点有子节点的场合
        if (jstree.is_parent(node)) {
            sweetAlert({
                title: "该组织下有子组织，不能删除",
                text: SYS_MSG.MSG_AUOT_CLOSE,
                type: 'warning',
                showConfirmButton: false,
                timer: SYS_CONF.ALERT_TIMER,
            });
        } else {
            sweetAlert(
                {
                    title: SYS_MSG.MSG_DEL_CONFIRM,
                    type: 'info',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: SYS_MSG.BTN_CONFIRM,
                    cancelButtonText: SYS_MSG.BTN_CANCEL,
                    closeOnConfirm: false
                },
                function(isConfirm){
                    if (isConfirm) {

                        $.ajax({
                            url: "/content/area/delete",
                            data: {
                                "areaId": $("#areaId").val()
                            },
                            dataType:"json",
                            type:"post",
                            success: function(data){

                                var jstree = $("#-tree").jstree(true);
                                var node = jstree.get_selected()[0];
                                jstree.delete_node(node);

                                tsc.AreaList.clear();

                                $("#addBtn").attr("disabled", true);
                                $("#deleteBtn").attr("disabled", true);
                                $("#saveBtn").attr("disabled", true);

                                sweetAlert({
                                    title: SYS_MSG.MSG_DEL_SUCCESS,
                                    text: SYS_MSG.MSG_AUOT_CLOSE,
                                    type: 'success',
                                    showConfirmButton: false,
                                    timer: SYS_CONF.ALERT_TIMER,
                                });
                            }
                        });
                    }
                }
            );
        }
    },

    // 清除
    clear: function (){

        $("#column1").val("");
        $("#column2").val("");
        $("#areaId").val("");
        $("#parentCode").val("");
        $("#oldAreaCode").val("");
        $("#level").val("");
    }
};

$(function() {
    tsc.AreaList.init();
});


