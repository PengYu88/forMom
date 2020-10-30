var sttrList = [];
var specList = [];
var sttrOld = [];
var specOld = [];
var checkIndexAttr = 0;
var checkIndexSpec = 0;
var selectedNode = null;
var attrDicMapIds  = [];
var specDicMapIds  = [];
tsc.CategoryList = {


	init: function() {


		// 初始化事件绑定
		tsc.CategoryList.event();

		// 初始化商品分类
		tsc.CategoryList.doQuery();
	},

	//定义事件绑定
	event: function() {

		// 添加商品分类
		$("#addCatgBtn").on("click", tsc.CategoryList.doAddCatg);

		// 添加商品属性
		$("#addAttrBtn").on("click", tsc.CategoryList.doAddAttr);

		// 编辑商品属性
		$("#editAttrBtn").on("click", tsc.CategoryList.doEditAttr);
		
		// 保存商品属性
		$("#saveAttrBtn").on("click", tsc.CategoryList.doSaveAttr);

		// 删除商品属性
		$("#deleteAttrBtn").on("click", tsc.CategoryList.doDeleteAttr);

		//添加商品规格
		$("#addSpecBtn").on("click", tsc.CategoryList.doAddSpec);
		
		//编辑规格
		$("#editSpecBtn").on("click", tsc.CategoryList.doEditSpec);
		
		//保存规格
		$("#saveSpecBtn").on("click", tsc.CategoryList.doSaveSpec);

		//删除规格
		$("#deleteSpecBtn").on("click", tsc.CategoryList.doDeleteSpec);

		//全选属性
		$("#allCheckAttr").on("click",tsc.CategoryList.doAllCheckAttr);

		//全选属性
		$("#allCheckSpec").on("click",tsc.CategoryList.doAllCheckSpec);
		
	},

	// 查询商品分类
	doQuery: function(){

		$.getJSON("/operation/goods/category/findCategoryTree", function(rs) {
		//$.getJSON("data/tree_data.json", function(rs) {
			$("#category-tree").jstree({
				"core" : {
					"check_callback" : true,
					"data" : rs.data
				},
				"contextmenu":{         
				    "items": function($node) {
				        var tree = $("#category-tree").jstree(true);
				        return {
				            "Create": {
				                "separator_before": false,
				                "separator_after": false,
				                "label": "新增分类",
				                "action": function (obj) { 
				                	tsc.CategoryList.doAddCatg($node);
				                }
				            },
				            "Rename": {
				                "separator_before": false,
				                "separator_after": false,
				                "label": "编辑分类",
				                "action": function (obj) { 
				                	tsc.CategoryList.doEditCatg($node);
				                }
				            },                         
				            "Remove": {
				                "separator_before": false,
				                "separator_after": false,
				                "label": "删除分类",
				                "action": function (obj) { 
				                	tsc.CategoryList.doDeleteCatg($node);
				                }
				            }
				        };
				    }
				},
				"plugins" : ["contextmenu"]
			}).on("loaded.jstree", function (event, data) {
				
			});
		});

		// 树节点左键相应函数
		$("#category-tree").on("select_node.jstree", function (node, selected, event) {

			selectedNode = selected.node;
			// 查询商品属性
			tsc.CategoryList.doQueryAttr(selected.node.id);
			
			// 查询商品规格
			tsc.CategoryList.doQuerySpec(selected.node.id);
		});
	},
	
	// 新增商品分类
	doAddCatg: function(node){
		var categoryId = node.id;
		var isChild = node.data.isLastChildGrade;
		if(isChild == 1){
			sweetAlert({
				title: "该分类已是最后一级分类",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		if(categoryId.indexOf('industry')>-1){
			categoryId = "";
		}
		$.ajax({
			url: "/operation/goods/category/categoryAdd",
			data: "goodsCateId="+categoryId+"&industryId="+node.data.industryId,
			contentType:"application/text;charset=UTF-8",
			success: function(data){
				var dialog = bootbox.dialog({
					size: "small",
					title: "新增商品分类",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {
								// 保存商品分类
								tsc.CategoryAdd.doSave(function(rs){
									if(rs.code == 0){
										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 更新树
										var jstree = $("#category-tree").jstree(true);
										var oldNode = jstree.get_selected(true);
										var parentNode = jstree.get_node(oldNode[0]);
										var parentId;
										var node_new;
										if(parentNode){
											parentId = parentNode.id;
											node_new = jstree.create_node(parentId, {
												//使用传递的数据
												id:rs.data.goodsCateId,
												text: rs.data.goodsCateName,
												parent: parentId,
												data: {
													"grade":rs.data.grade,
													"industryId":rs.data.industryId,
													"orders":rs.data.orders,
													"isLastChildGrade":rs.data.isLastChildGrade
												}
											});
										}
										// 清除已选
										jstree.deselect_node(node);
										// 创建并选中
										jstree.select_node(node_new);
										// 关闭对话框
										dialog.modal("hide");
									}else{
										sweetAlert({
											title: rs.desc,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'warning',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										return false;
									}
								});
								return false;
							}
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
						}
					}
				});
			}
		});
	},

	// 编辑商品分类
	doEditCatg: function(node){
		
		var categoryId = node.id;
		if(categoryId.indexOf('industry')>-1){
			categoryId = "";
			sweetAlert({
				title: "大类不允许编辑",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		var data = {
				"goodsCateId":categoryId,
				"goodsCateName":node.text,
				"orders":node.data.orders,
				"industryId":node.data.industryId,
				"grade":node.data.grade
		}
		console.log(JSON.stringify(data));
		$.ajax({
			url: "/operation/goods/category/categoryEdit",
			data: data,
			//contentType:"application/json",
			success: function(data){
				var dialog = bootbox.dialog({
					size: "small",
					title: "编辑商品分类",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {
								// 保存（编辑）商品分类
								tsc.CategoryEdit.doSave(function(rs){
									if(rs.code == 0){
										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 更新树
										var jstree = $("#category-tree").jstree(true);
										var oldNode = jstree.get_selected(true);
										var node = jstree.get_node(oldNode[0]);
										//使用传递的数据
										node.text = rs.data.goodsCateName;
										// 清除已选
										jstree.deselect_node(node);
										jstree.redraw(node.id);
										// 关闭对话框
										dialog.modal("hide");
									}else{
										sweetAlert({
											title: rs.desc,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'warning',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										return false;
									}
								});
								return false;
							}
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
						}
					}
				});
			}
		});
	},

	//删除商品分类
	doDeleteCatg: function(node){
		var categoryId = node.id;
		if(categoryId.indexOf('industry')>-1){
			categoryId = "";
			sweetAlert({
				title: "大类不允许删除",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		var jstree = $("#category-tree").jstree(true);
		var node = jstree.get_selected(true)[0];
		// 选中节点有子节点的场合
		if (jstree.is_parent(node)) {
			sweetAlert({
				title: "该分类下有子分类，不能删除",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		
		sweetAlert({
			title: SYS_MSG.MSG_DEL_CONFIRM,
			type: 'warning',
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: SYS_MSG.BTN_CONFIRM,
			cancelButtonText: SYS_MSG.BTN_CANCEL,
			closeOnConfirm: false,
		},
		
		function(isConfirm){
			if (isConfirm) {
				$.ajax({
					url:"/operation/goods/category/delete",
					data: "id="+node.id+"&grade="+node.data.grade,
					type:"post",
					dataType:"json",
					success:function(data){
						if(data.code == 0){
							// 提示取消成功
							sweetAlert({
								title: SYS_MSG.MSG_SAVE_SUCCESS,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
							var jstree = $("#category-tree").jstree(true);
							var node = jstree.get_selected(true);
							//console.log(node[0]);
							jstree.delete_node(node[0]);
							// 设置初始节点
							jstree.select_node(node[0].parent);
						} else {
							// 提示取消失败
							sweetAlert({
								title: "",
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
					}
				});
			}
		});
	},
	
	//添加商品属性
	doAddAttr: function(){
		var categoryId = selectedNode.id;
		//判断分类是否大类
		if(categoryId.indexOf('industry')>-1){
			categoryId = selectedNode.data.industryId;
			sweetAlert({
				title: "大类不允许添加属性",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		var industryId = selectedNode.data.industryId;
		
		$.ajax({
			url: "/operation/goods/categoryattrmap/attributePopup",
			data:"industryId="+industryId+"&categoryId="+categoryId,
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "选择商品属性",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SELECT,
							className: "btn-success",
							callback: function() {
								// 选择
								tsc.AttributePopup.doSelect(function(rs){
									if(rs.code == 0){
										var list = [];
										for(var i=0;i<rs.data.length;i++){
											var rowData = {
												attrDicId: rs.data[i].attrDicId,
												attrDicName: rs.data[i].attrDicName,
												controlType: rs.data[i].controlType,
												attrType: rs.data[i].attrType,
												industryId: rs.data[i].industryId,
												//isInherit: "新增",
											};
											sttrList.data.add(rowData);
										}
										// 循环遍历数据
										buildHtmlWithJsonArray("attrRepeat", sttrList.data, false, false);
									}
									// 关闭对话框
									dialog.modal("hide");
								});
								return false;
							}
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
						}
					}
				});
			}
		});
	},
	
	//删除商品属性
	doDeleteAttr: function(){
		var rowData;
		var categoryId = selectedNode.id;
		//判断分类是否大类
		if(categoryId.indexOf('industry')>-1){
			categoryId = selectedNode.data.industryId;
			sweetAlert({
				title: "大类不允许删除属性",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		var selectRowNum = 0;
		// 取得属性值
		$("#attr-list tbody tr").each(function(i){
			rowData="";
			if(i!=0){
			// 已选择
				if($(this).find("input[type=checkbox]").is(':checked')){
					rowData += "{"; 
					$(this).find("td").each(function(i){
						if($(this).attr("data-prop") == "catAttrDicId"){
							rowData +='"'+$(this).attr("data-prop")+'":'+$(this).attr("data-value")+'';
							rowData += ",";
						}
						if($(this).attr("data-prop") == "attrDicId"){
							rowData +='"'+$(this).attr("data-prop")+'":'+$(this).attr("data-value")+'';
						}
						if($(this).attr("data-prop") == "attrType"){
							if($(this).attr("data-value")==0){
								sweetAlert({
									title: "基本行业属性不允许删除",
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'warning',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
								return false;
							}
						}
						if($(this).attr("data-prop") == "isInherit"){
							if($(this).attr("data-value")==0){
								sweetAlert({
									title: "继承父级属性不允许删除",
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'warning',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
								return false;
							}
						}
					});
					selectRowNum++;
					rowData += "}";
					attrDicMapIds.push(JSON.parse(rowData));
				}
			}
		});
		// 如果没有选择记录
		if(selectRowNum == 0){
			sweetAlert({
				title: SYS_MSG.TITLE_RECORD_SELECT,
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}

		sweetAlert({
				title: SYS_MSG.MSG_DEL_CONFIRM,
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
			function(isConfirm){
				var data = {
					"goodsCategoryId":categoryId,
					"removeList":attrDicMapIds
				};
				console.log(attrDicMapIds);
				if (isConfirm) {
					$.ajax({
						url:"/operation/goods/categoryattrmap/batchUpdate",
						data: JSON.stringify(data),
						method:"POST",
						dataType:"json",
						contentType:"application/json",
						success:function(rs){
							if(rs.code == "0"){
								// 提示取消成功
								sweetAlert({
									title: SYS_MSG.MSG_DEL_SUCCESS,
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'success',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
								var list = [];
								
								for(var i=0 ; i< sttrList.data.length;i++){
									console.log(attrDicMapIds.length);
									for(var j = 0 ; j < attrDicMapIds.length;j++){
										var id = attrDicMapIds[j].catAttrDicId;
										
										if(sttrList.data[i].catAttrDicId == id){
											sttrList.data.remove(sttrList.data[i]);
										}
									} 
								}
								//console.log(sttrList.data);
								buildHtmlWithJsonArray("attrRepeat", sttrList.data, false, false);
								attrDicMapIds=[];
							} else {
								// 提示取消失败
								sweetAlert({
									title: rs.desc,
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'success',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
							}
						}
					});
				}else{
					attrDicMapIds=[];
				}
			});
	},
	
	// 编辑商品属性
	doEditAttr: function(){
		var categoryId = selectedNode.id;
		var selectRowNum = 0;
		// 取得属性值
		var paramData = "";
		$("#attr-list tbody tr").each(function(i){
			if(i>0){
				// 已选择
				if($(this).find("input[type=checkbox]").is(':checked')){
					
					$(this).find("td").each(function(i){
						paramData += $(this).attr("data-prop")+"="+$(this).attr("data-value")+"&";
					});
					selectRowNum++;
				}
			}
		});
		// 如果没有选择记录
		if(selectRowNum == 0){
			sweetAlert({
				title: SYS_MSG.TITLE_RECORD_SELECT,
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		
		// 如果选择多条记录
		if(selectRowNum > 1){
			sweetAlert({
				title: SYS_MSG.TITLE_NO_MORE_RECORD_SELECT,
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		console.log(paramData);
		$.ajax({
			url: "/operation/goods/categoryattrmap/attributeEdit",
			data: paramData,
			success: function(data){
				var dialog = bootbox.dialog({
					title: "编辑商品属性",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {
								// 保存商品属性
								tsc.AttributeEdit.doSave(function(rs){
									console.log(rs);
									if(rs.code == "0"){
										tsc.CategoryList.doQueryAttr(categoryId);
										// 关闭对话框
										dialog.modal("hide");
									}
								});
								return false;
							}
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
						}
					}
				});
			}
		});
	},

	// 查询商品属性
	doQueryAttr: function(id){
		var url = "/operation/goods/categoryattrmap/findBoundAttrDic?categoryId="+id;
		//判断分类是否大类
		if(id.indexOf('industry')>-1){
			id = selectedNode.data.industryId;
			url = "/operation/goods/categoryattrmap/findIndustryAttr?industryId="+id;
		}
	
		$.getJSON(url, function(rs) {
			// 循环遍历数据
			sttrList = jQuery.extend(true,{},rs);
			sttrOld  = jQuery.extend(true,{},rs);
			if(rs.code == "-1" ){
				buildHtmlWithJsonArray("attrRepeat", [], false, false);	
			}else{
				buildHtmlWithJsonArray("attrRepeat", rs.data, false, false);
			}
		});
	},
	// 全选商品属性
	doAllCheckAttr: function(){
		checkIndexAttr++;
		$("#attr-list tbody tr").each(function(){
			if(checkIndexAttr % 2){
				$(this).find("input[type=checkbox]").attr("checked",true);
			}else{
				$(this).find("input[type=checkbox]").attr("checked",false);
			}
		});
	},
	// 全选商品规格
	doAllCheckSpec: function(){
		checkIndexSpec++;
		$("#spec-list tbody tr").each(function(){
			if(checkIndexSpec % 2){
				$(this).find("input[type=checkbox]").attr("checked",true);
			}else{
				$(this).find("input[type=checkbox]").attr("checked",false);
			}
		});
	},
	
	// 添加商品规格
	doAddSpec: function(){
		var categoryId = selectedNode.id;
		//判断分类是否大类
		if(categoryId.indexOf('industry')>-1){
			categoryId = selectedNode.data.industryId;
			sweetAlert({
				title: "大类不允许添加规格",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		var industryId = selectedNode.data.industryId;
		$.ajax({
			url: "/operation/goods/categoryattrmap/specPopup",
			data:"industryId="+industryId+"&categoryId="+categoryId,
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "选择商品规格",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SELECT,
							className: "btn-success",
							callback: function() {
								// 选择
								tsc.SpecPopup.doSelect(function(rs){
									if(rs.code == 0){
										var list = [];
										for(var i=0;i<rs.data.length;i++){
											var rowData = {
												attrDicId: rs.data[i].attrDicId,
												attrDicName: rs.data[i].attrDicName,
												controlType: rs.data[i].controlType,
												attrType: rs.data[i].attrType,
												industryId: rs.data[i].industryId,
												//isInherit: "新增",
											};
											specList.data.add(rowData);
										}
										// 循环遍历数据
										buildHtmlWithJsonArray("specRepeat", specList.data, false, false);
									}
									// 关闭对话框
									dialog.modal("hide");
								});
								return false;
							}
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
						}
					}
				});
			}
		});
	},
	
	//删除商品规格
	doDeleteSpec: function(){
		var rowData;
		var categoryId = selectedNode.id;
		//判断分类是否大类
		if(categoryId.indexOf('industry')>-1){
			categoryId = selectedNode.data.industryId;
			sweetAlert({
				title: "大类不允许删除规格",
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});
			return false;
		}
		var selectRowNum = 0;

		// 取得属性值
		$("#spec-list tbody tr").each(function(i){
			rowData="";
			if(i!=0){
				// 已选择
				if($(this).find("input[type=checkbox]").is(':checked')){
					rowData += "{"; 
					$(this).find("td").each(function(i){
						if($(this).attr("data-prop") == "catAttrDicId"){
							rowData +='"'+$(this).attr("data-prop")+'":'+$(this).attr("data-value")+'';
							rowData += ",";
						}
						if($(this).attr("data-prop") == "attrDicId"){
							rowData +='"'+$(this).attr("data-prop")+'":'+$(this).attr("data-value")+'';
						}
						if($(this).attr("data-prop") == "attrType"){
							if($(this).attr("data-value")==0){
								sweetAlert({
									title: "行业规格不允许删除",
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'warning',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
								return false;
							}
						}
						if($(this).attr("data-prop") == "isInherit"){
							if($(this).attr("data-value")==0){
								sweetAlert({
									title: "继承父级规格不允许删除",
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'warning',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
								return false;
							}
						}
					});
					selectRowNum++;
					rowData += "}";
					specDicMapIds.push(JSON.parse(rowData));
				}
			}
		});
		// 如果没有选择记录
		if(selectRowNum == 0){
			sweetAlert({
				title: SYS_MSG.TITLE_RECORD_SELECT,
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});

			return false;
		}


		sweetAlert({
				title: SYS_MSG.MSG_DEL_CONFIRM,
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
			function(isConfirm){
				var data = {
						"goodsCategoryId":categoryId,
						"removeList":specDicMapIds
					};
				if (isConfirm) {
					$.ajax({
						url:"/operation/goods/categoryattrmap/batchUpdate",
						//data:"{\"goodsCategoryId\":4,\"removeList\":[{\"catAttrDicId\":135}]}",
						data: JSON.stringify(data),
						method:"POST",
						dataType:"json",
						contentType:"application/json",
						success:function(rs){
							if(rs.code == "0"){
								// 提示取消成功
								sweetAlert({
									title: SYS_MSG.MSG_DEL_SUCCESS,
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'success',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
								var list = [];
								
								for(var i=0 ; i< specList.data.length;i++){
									for(var j = 0 ; j < specDicMapIds.length;j++){
										var id = specDicMapIds[j].catAttrDicId;
										
										if(specList.data[i].catAttrDicId == id){
											specList.data.remove(specList.data[i]);
										}
									} 
								}
								buildHtmlWithJsonArray("specRepeat", specList.data, false, false);
								specDicMapIds=[];
							} else {
								// 提示取消失败
								sweetAlert({
									title: rs.desc,
									text: SYS_MSG.MSG_AUOT_CLOSE,
									type: 'success',
									showConfirmButton: false,
									timer: SYS_CONF.ALERT_TIMER,
								});
							}
						}
					});
				}else{
					attrDicMapIds=[];
				}
			});
	},
	
	// 编辑商品规格
	doEditSpec: function(){
		var categoryId = selectedNode.id;
		var selectRowNum = 0;
		// 取得属性值
		var paramData = "";
		$("#spec-list tbody tr").each(function(i){
			if(i>0){
				// 已选择
				if($(this).find("input[type=checkbox]").is(':checked')){
					
					$(this).find("td").each(function(i){
						paramData += $(this).attr("data-prop")+"="+$(this).attr("data-value")+"&";
					});
					selectRowNum++;
				}
			}
		});
		// 如果没有选择记录
		if(selectRowNum == 0){
			sweetAlert({
				title: SYS_MSG.TITLE_RECORD_SELECT,
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});

			return false;
		}
		// 如果选择多条记录
		if(selectRowNum > 1){

			sweetAlert({
				title: SYS_MSG.TITLE_NO_MORE_RECORD_SELECT,
				text: SYS_MSG.MSG_AUOT_CLOSE,
				type: 'warning',
				showConfirmButton: false,
				timer: SYS_CONF.ALERT_TIMER,
			});

			return false;
		}
		console.log(paramData);
		$.ajax({
			url: "/operation/goods/categoryattrmap/specEdit",
			data: paramData,
			success: function(data){
				var dialog = bootbox.dialog({
					title: "编辑商品规格",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {
								// 保存
								tsc.SpecEdit.doSave(function(rs){
									console.log(rs);
									if(rs.code == "0"){
										tsc.CategoryList.doQuerySpec(categoryId);
										// 关闭对话框
										dialog.modal("hide");
									}
								});
								return false;
							}
						},
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
						}
					}
				});
			}
		});
	},
	
	// 查询商品规格
	doQuerySpec: function(id){
		var url ="";
		//判断分类是否大类
		if(id.indexOf('industry')>-1){
			buildHtmlWithJsonArray("specRepeat", [], false, false);	
			return false;
		}else{
			url = "/operation/goods/categoryattrmap/findBoundSpec?categoryId="+id;
		}
	
		$.getJSON(url, function(rs) {
			// 循环遍历数据
			specList = jQuery.extend(true,{},rs);
			specOld  = jQuery.extend(true,{},rs);
			if(rs.code == "-1" ){
				buildHtmlWithJsonArray("specRepeat", [], false, false);	
			}else{
				buildHtmlWithJsonArray("specRepeat", rs.data, false, false);
			}
		});
	
	},
	
	// 保存商品属性
	doSaveAttr: function(){
		var categoryId = selectedNode.id;
		var attrUpList = jQuery.extend(true,{},sttrList);
		for(var i = 0; i< sttrOld.data.length; i++){
			attrUpList.data.remove(sttrOld.data[i]);
		}
		var data = {
				"goodsCategoryId":categoryId,
				"addList":attrUpList.data
			};
		//console.log(JSON.stringify(data));
		$.ajax({
			url:"/operation/goods/categoryattrmap/batchUpdate",
			data: JSON.stringify(data),
			method:"POST",
			dataType:"json",
			contentType:"application/json",
			success: function(rs){
	    		if(rs.code == "0"){
	    			// 提示保存成功
					sweetAlert({
						title: SYS_MSG.MSG_SAVE_SUCCESS,
						text: SYS_MSG.MSG_AUOT_CLOSE,
						type: 'success',
						showConfirmButton: false,
						timer: SYS_CONF.ALERT_TIMER,
					});
					tsc.CategoryList.doQueryAttr(categoryId);
				} else {
	    			// 提示保存失败
					sweetAlert({
						title: rs.desc,
						text: SYS_MSG.MSG_AUOT_CLOSE,
						type: 'error',
						showConfirmButton: false,
						timer: SYS_CONF.ALERT_TIMER,
					});
					
				}
			}
		});
	},

	// 保存商品规格
	doSaveSpec: function(){
		var categoryId = selectedNode.id;
		var specUpList = jQuery.extend(true,{},specList);
		for(var i = 0; i< specOld.data.length; i++){
			specUpList.data.remove(specOld.data[i]);
		}
		var data = {
				"goodsCategoryId":categoryId,
				"addList":specUpList.data
			};
		console.log(data);
		$.ajax({
			url:"/operation/goods/categoryattrmap/batchUpdate",
			data: JSON.stringify(data),
			method:"POST",
			dataType:"json",
			contentType:"application/json",
			success: function(rs){
	    		if(rs.code == "0"){
	    			// 提示保存成功
					sweetAlert({
						title: SYS_MSG.MSG_SAVE_SUCCESS,
						text: SYS_MSG.MSG_AUOT_CLOSE,
						type: 'success',
						showConfirmButton: false,
						timer: SYS_CONF.ALERT_TIMER,
					});
					tsc.CategoryList.doQuerySpec(categoryId);
				} else {
	    			// 提示保存失败
					sweetAlert({
						title: rs.desc,
						text: SYS_MSG.MSG_AUOT_CLOSE,
						type: 'error',
						showConfirmButton: false,
						timer: SYS_CONF.ALERT_TIMER,
					});
					
				}
			}
		});
	},

};

$(function(){
	tsc.CategoryList.init();
});


Array.prototype.remove = function(val) {
	var catAttrDicId = val.catAttrDicId;
	for(var index = 0; index< this.length; index++){
		if(catAttrDicId == this[index].catAttrDicId){
			this.splice(index, 1);
			break;
		}
	}
};

//删除自身数据
Array.prototype.removeSelf = function(val) {
	var index = this.indexOf(val);
	console.log(index);
	if (index > -1) {
		alert(123);
		this.splice(index, 1);
	}
};

Array.prototype.add = function(val) {
	this.splice(0,0,val);
};

