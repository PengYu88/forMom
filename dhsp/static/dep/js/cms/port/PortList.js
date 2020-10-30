tsc.PortList = {

    //页面加载初始化
    init: function() {

        // 初始化输入控件格式
        $(":input").inputmask();

        // 初始化验证器
        tsc.PortList.validate();

        // 初始化按钮绑定事件
        tsc.PortList.bindEvent();

        // 功能树树信息初始化
        tsc.PortList.doCreateTree();
        
        //给下拉框设置样式
        $("#column4").attr("class","form-control");
    },

    // 初始化验证器
    validate: function(){
    	
        $("#-form").validate({
        	ignore: ".ignore",
            rules: {
            	areaId: {
                    required: true
                },
                name:{
                	required: true
                },
                useFlag:{
                	required: true
                }
            }
        });
    },

    // 初始化按钮绑定事件
    bindEvent: function(){

        $("#addBtn").on("click", tsc.PortList.doNew);

        $("#saveBtn").on("click", tsc.PortList.doSave);

        $("#deleteBtn").on("click", tsc.PortList.doDelete);

        $("#addRootBtn").on("click",tsc.PortList.doAddRoot);

    },

    // 初始化组织树状菜单
    doCreateTree: function(){
        $.getJSON("/content/port/queryPortInfo", function(rs) {
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

            tsc.PortList.clear();

            $("#addBtn").attr("disabled", true);
            $("#deleteBtn").attr("disabled", false);
            $("#saveBtn").attr("disabled", false);

            // 标准属性
            $("#column1").val(selected.node.id);
            $("#column2").val(selected.node.text);
            $("#column3").val(selected.node.data.portSecondName);
            $("#column4").val(selected.node.data.useFlag);
            $("#id").val(selected.node.data.areaId);
            $("#oldAreaId").val(selected.node.id);
            $("#level").val(selected.node.data.level);
            $("#parentAreaId").val(selected.node.parent);

            if(selected.node.data.actionType == "edit"){
                $("#addBtn").attr("disabled", true);
            }else {
                
                // 判断是否已经达到3级
                if(selected.node.data.level != "3"){
                	$("#addBtn").attr("disabled", false);
                }
            }
            
            if(selected.node.data.level == "3"){
                $("#column3").parent().parent().show();
            }else {
            	$("#column3").parent().parent().hide();
            }
        });
    },

    // 新建一级
    doAddRoot: function() {

        var jstree = $("#-tree").jstree(true);

        tsc.PortList.clear();
        
        var node_new = jstree.create_node("#", {
            text: '新建顶级',
            parent: "#",
            data: {
                actionType: 'edit',
                level: "1",
            }
        });

        // 清除已选
        if(jstree.get_selected().length > 0){
        	var node = jstree.get_node(jstree.get_selected()[0])
        	jstree.deselect_node(node);
        }

        // 创建并选中
        jstree.select_node(node_new);
        
        //将id清空
        $("#id").val("");
    },

    // 新建
    doNew: function(){

        var jstree = $("#-tree").jstree(true);

        var node = jstree.get_node(jstree.get_selected()[0])

        tsc.PortList.clear();
        
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
        
        //将id清空
        $("#id").val("");

    },

    // 保存
    doSave: function(){

    	// 表单验证
		if(!$("#-form").valid()){
			return false;
		}

        
        //港口主键id
        var id = $("#id").val();
        //新输入的地区id
        var areaId = $("#column1").val();
        var oldAreaId = $("#oldAreaId").val();
       
        //若id为空表示新建港口信息
        if(id == ""){
        	//校验添加的地区id不能重复
        	$.getJSON("/content/port/checkAreaCode",{"areaCode":areaId}, function(rs) {
				
				if(rs.data) {
					App.alert({
						container: "#error-alerts",
	                    type: 'danger',
	                    icon: 'warning',
	                    message: '地区ID已存在，请重新填写'
	                });
				} else {
					// 表单提交
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
			                    $("#id").val(data.data.id);
			                    
			                    node.data.useFlag = data.data.useFlag
			                    $("#column4").val(data.data.useFlag);
			                    node.data.portSecondName = data.data.portSecondName;
			                    $("#column3").val(node.data.portSecondName);
			                    $("#oldAreaId").val($("#column1").val());
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
        //id不为空表示修改信息
        else{
        	//若地区id未发生改变，不需校验地区id是否重复
        	if(oldAreaId == areaId){
        		// 表单提交
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
		                    $("#id").val(data.data.id);
		                    
		                    node.data.useFlag = data.data.useFlag
		                    $("#column4").val(data.data.useFlag);
		                    node.data.portSecondName = data.data.portSecondName;
		                    $("#column3").val(node.data.portSecondName);
		                    $("#oldAreaId").val($("#column1").val());

		                    // 重新绘制节点
		                    jstree.redraw($("#column1").val());

		                    // 选中
		                    jstree.select_node($("#column1").val());
		                }
		            }
		        });
        	}else{
        		//校验添加的地区id不能重复
            	$.getJSON("/content/port/checkAreaCode",{"areaCode":areaId}, function(rs) {
    				
    				if(rs.data) {
    					App.alert({
    						container: "#error-alerts",
    	                    type: 'danger',
    	                    icon: 'warning',
    	                    message: '地区ID已存在，请重新填写'
    	                });
    				} else {
    					// 表单提交
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
    			                    $("#id").val(data.data.id);
    			                    
    			                    node.data.useFlag = data.data.useFlag
    			                    $("#column4").val(data.data.useFlag);
    			                    node.data.portSecondName = data.data.portSecondName;
    			                    $("#column3").val(node.data.portSecondName);
    			                    $("#oldAreaId").val($("#column1").val());
    			                    
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
                            url: "/content/port/deletePortById",
                            data: {
                                "id": $("#id").val()
                            },
                            dataType:"json",
                            type:"post",
                            success: function(data){
                                
                            	var jstree = $("#-tree").jstree(true);
                                var node = jstree.get_selected()[0];
                                jstree.delete_node(node);

                                tsc.PortList.clear();

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
        $("#column3").val("");
        $("#column4").val("1");
        $("#level").val("");
        $("#id").val("");
        $("#oldAreaId").val("");
        $("#parentAreaId").val("");
    }
};

$(function() {
    tsc.PortList.init();
});