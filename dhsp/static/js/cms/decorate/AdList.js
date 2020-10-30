tsc.AdList = {
		
	init: function() {
			
		// 初始化事件绑定
		tsc.AdList.event();
		

		//初始化分页
		tsc.AdList.doPage();
	},

	//定义事件绑定	
	event: function() {
		$("#doEdit").on("click",tsc.AdList.doEdit);
		$("#doAdd").on("click",tsc.AdList.doAdd);
		$("#addFloor").on("click",tsc.AdList.doAddFloor);
		$("#addBlock").on("click",tsc.AdList.doAddBlock);
		$("#addAd").on("click",tsc.AdList.doAddAd);
		$("#addPAd").on("click",tsc.AdList.doAddPAd);
		$("#addFAd").on("click",tsc.AdList.doAddFAd);
		$("#page").on("change",tsc.AdList.changePage);
	},
	
	// 查询
	doQuery: function(page,id){
		
		if(page.type){
			page = 1;
		}
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;
		
		$.getJSON("/content/decorate/listAd",{"code":id,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
			
			// 设置翻页总数
			$('#ad-pager').bootpag({
				total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
			});

			// 循环遍历数据
			buildHtmlWithJsonArray("adRepeat", rs.data, false, false);
		});
	},

	//分页
	doPage: function(page, total){

		$('#ad-pager').bootpag({
			total: 1,
		    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
		    firstLastUse: true,
		    first: SYS_CONF.PAGE_FIRST,
	    	prev: SYS_CONF.PAGE_PREV,
		    next: SYS_CONF.PAGE_NEXT,
		    last: SYS_CONF.PAGE_LAST
        }).on("page", function(event, num){
        	// 查询
        	tsc.AdList.doQuery(num);
        });
	},

	//新建页面
	doAdd:function(){
		$.ajax({
			url: "/content/decorate/addPage",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "新增",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.AddPage.doSave(function(rs){

									if(rs.code == "0"){

										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 重新查询
										tsc.AdList.doQuery(1);

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

	//编辑
	doEdit:function(){
		$.ajax({
			url: "/content/decorate/editPage",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "编辑",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.EditPage.doSave(function(rs){
										
						    		if(rs.code == "0"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 重新查询
										tsc.AdList.doQuery(1);
										
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

	//建楼层
	doAddFloor:function(){
		$.ajax({
			url: "/content/decorate/addFloor",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "新增楼层",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.AddFloor.doSave(function(rs){
										
						    		if(rs.code == "0"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 重新查询
										tsc.AdList.doQuery(1);
										
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
	
	//建模块
	doAddBlock:function(){
		var platformId=$("#platformId").val();
		$.ajax({
			url: "content/decorate/addBlock",
			data: {"platformId":platformId},
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "新增模块",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	// 保存
						    	tsc.AddBlock.doSave(function(rs){
						    		if(rs.code == "0"){
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});				
										// 重新查询
										tsc.AdList.doQuery(1);			
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

	//建图片广告
	doAddAd:function(){
		var code=$("#code").val();
		var classify=$("#classify").val();
		$.ajax({
			url: "content/decorate/addAd",
			data: {"decorateCode":code,"classify":classify},
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "新增图片广告",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.AddAd.doSave(function(rs){
										
						    		if(rs.code == "0"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										// 重新查询
										tsc.AdList.doQuery(1);
										
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

	//新增产品广告
	doAddPAd:function(){
		//TODO 根据行业查商品分类
		var platformId=$("#platformId").val();
		var code=$("#code").val();
		var classify=$("#classify").val();
		$.ajax({
			url: "content/decorate/addPAd",
			data: {"decorateCode":code,"classify":classify,"platformId":platformId},
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "新增产品广告",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.AddPAd.doSave(function(rs){

									if(rs.code == "0"){

										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 重新查询
										tsc.AdList.doQuery(1);

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

	//新增文字广告
	doAddFAd:function(){
		var code=$("#code").val();
		var classify=$("#classify").val();
		$.ajax({
			url: "content/decorate/addFAd",
			data: {"decorateCode":code,"classify":classify},
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "新增文字广告",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.AddFAd.doSave(function(rs){

									if(rs.code == "0"){

										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 重新查询
										tsc.AdList.doQuery(1);

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
	//编辑广告
	doEditAd:function(adId,classify){
		var url = null;
		if(classify == 1){
			url = "editFAd";
		}else if(classify == 2){
			url = "editAd";
		}else if(classify == 3){
			url = "editPAd";
		};
		$.ajax({
			url: "/content/decorate/"+url,
			data: {"adId":adId},
			type: 'GET',
			success: function(data){
				var dialog = bootbox.dialog({
					size: "large",
					title: "编辑广告",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
						    className: "btn-success",
						    callback: function() {
						    	
						    	// 保存
						    	tsc.EditAd.doSave(function(rs){
										
						    		if(rs.code == "0"){
						    			
						    			// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});
										
										var code=$("#code").val();
										
										// 重新查询
										tsc.AdList.doQuery(1,code);
										
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

	//停用组织
	doDelet: function(id){
		// 提交请求
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
					url: "/content/decorate/deleteAd",
					data: {"adId":id},
					dataType:"json",
					type: 'POST',
					success: function(rs){
						
						if(rs.code == "0"){
							// 提示停用成功
							sweetAlert({
								title: SYS_MSG.MSG_DEL_SUCCESS,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
							
						} else {

							// 提示停用失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						
						var code=$("#code").val();
						
						// 重新查询
						tsc.AdList.doQuery(1,code);
					
					}});
			}
		});
	},

	// 创建分类树t
// 初始化组织树状菜单
	doCreateTree: function(){
		var platformId=$("#platformId").val();
		var parentCode=$("#page").val();
		$.getJSON("/content/decorate/list",{"parentCode":parentCode,"platformId":platformId}, function(rs) {
			$("#-tree").html("");
			$("#-tree").jstree({
				"core" : {
					"check_callback" : true,
					"data" : rs.data,
				},

			}).on("loaded.jstree", function (event, data) {
				
				var treeJson = $('#-tree').jstree(true).get_json(null, {
					flat: true
				});
				//获取树中携带的信息
				for (var i = 0; i < treeJson.length; i++) {
					if (treeJson[i].data.isSelected == "1") {
						$('#-tree').jstree("check_node",treeJson[i].id);
					}
				}
			});
		});

		// 树节点左键相应函数(监听)
		$("#-tree").on("select_node.jstree", function (node, selected, event) {


			$("#addFAd").attr("style","display: none")
			$("#addAd").attr("style","display: none")
			$("#addPAd").attr("style","display: none")
			if(selected.node.data.classify == 1){
				$("#addFAd").attr("style","")
			}else if(selected.node.data.classify == 2){
				$("#addAd").attr("style","")
			}else if(selected.node.data.classify == 3){
				$("#addPAd").attr("style","")
			};
			$("#code").val(selected.node.id);
			$("#classify").val(selected.node.data.classify);
			//获取节点id
			var id = selected.node.id;
			tsc.AdList.doQuery(1,id);


		});
	},

	//修改下拉框重新刷新树
	changePage:function(){
		var p1=$("#page").find("option:selected").attr("id");
		$("#-tree").remove();
		$(".portlet-body").append("<div id='-tree'></div>");
		tsc.AdList.doCreateTree();
	},
	
	//根据平台修改页面信息
	getPage:function(){
		$("#-tree").remove();
		$(".portlet-body").append("<div id='-tree'></div>");
		var platformId=$("#platformId").find("option:selected").attr("value");
		$.ajax({
			url: "/content/decorate/listByPlatform",
			data: {"platformId":platformId,"type":1},
			dataType:"json",
			type: 'GET',
			success: function(rs){
				$( " #page").empty();
				$( " #page").prepend("<option value=''>请选择</option>");
				for(var i=0;i<rs.data.length;i++){
					$(" #page").append("<option value='" + rs.data[i].code + "' >" + rs.data[i].name + "</option>");
				};
			}
		});
	}
};


// 初始化
tsc.AdList.init();