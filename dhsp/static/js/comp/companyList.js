tsc.companyList = {
	// 初始化
	init: function() {

		// 初始化事件绑定
		tsc.companyList.event();
		// 初始化翻页
		tsc.companyList.doPage();
		
		tsc.companyList.selectDoClass("businessScopeSearch");
		tsc.companyList.selectDoClass("validStatusSearch");
		tsc.companyList.selectDoClass("compCategorySearch");
		tsc.companyList.selectDoClass("compLevelSearch");
	},

	// 定义事件绑定
	event: function() {
		//日历绑定
		$('.datetimepicker').datetimepicker({
			format : 'YYYY-MM-DD'
		});

		// 查询按钮点击事件
		$("#queryBtn").on("click", tsc.companyList.doQuery);

	},

    //selectDoClass
    selectDoClass:function (name) {
    	var inputName = "#" + name;
    	$(inputName).attr("class","form-control");
    },
	
	// 查询
	doQuery: function(page){

		if(page == null){
			page = 0;
		}
		
		if(page.type){
			page = 1;
		}

		var businessScope=$("#businessScopeSearch").val();
		var compName=$("#compNameSearch").val();
		var compLevel=$("#compLevelSearch").val();
		var compCategory=$("#compCategorySearch").val();
		var validStatus=$("#validStatusSearch").val();
		var createTimeStart=$("#createTimeStart").val();
		var createTimeEnd=$("#createTimeEnd").val();
		var currentResult=SYS_CONF.PAGE_SIZE*(page-1);
		var pageSize=SYS_CONF.PAGE_SIZE;
		
		if (createTimeStart > createTimeEnd) {
			$("#error-alerts").show();
			App.alert({
	            container: "#error-alerts",
	            type: 'danger',
	            icon: 'warning',
	            message: '结束日期在开始日期之前，请重新填写'
	        });
		}
		else {
			$("#error-alerts").hide();
		}
		
		$.getJSON("/comp/listData", {
			"businessScope":businessScope,
			"compName":compName,
			"compLevel":compLevel,
			"compCategory":compCategory,
			"validStatus":validStatus,
			"createTimeStart":createTimeStart,
			"createTimeEnd":createTimeEnd,
			"currentResult":currentResult,"pageSize":pageSize}, function(rs) {

			// 设置翻页总数
			$('#pager').bootpag({
				total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
			});

			// 设置数据总条数
			$("#pager-total").text(rs.total);

			// 循环遍历数据
			buildHtmlWithJsonArray('repeat', rs.data, false, false);
		});
	},

	// 翻页
	doPage: function(){

		$('#pager').bootpag({
			total: 1,
			maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			firstLastUse: true,
			first: SYS_CONF.PAGE_FIRST,
			prev: SYS_CONF.PAGE_PREV,
			next: SYS_CONF.PAGE_NEXT,
			last: SYS_CONF.PAGE_LAST
		}).on("page", function(event, num){

			// 查询
			tsc.companyList.doQuery(num);
		});
	},

	//支付状态
//	getPayHtml:function (type) {
//		if(type=='1'){
//			return  '<div class="font-blue"><i class="fa fa-check"></i></div>';
//		}else{
//			return  '<div class="font-red-mint"><i class="fa fa-close"></i></div>';
//		}
//	},
	//签章状态店铺
	getSignHtml:function (type) {
		if(type=='1'){
			return  '<div class="font-blue"><i class="fa fa-check"></i></div>';
		}else if(type=='0'){
			return  '<div class="font-red-mint"><i class="fa fa-close"></i></div>';
		}else{
			return '--';
		}
	},
	//查看公司信息
	companyView :function (compId) {
		
		var param = {"compId":compId};
		
		$.ajax({
			data:param,
			url: "/comp/companyInfo",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "企业信息",
					message: data,
					buttons:{
						cancel:{
							label: SYS_MSG.BTN_CANCEL,
							className: "btn-default",
						}
					}
				});
			}
		});
	},
	//修改时状态
	companyEdit: function(compId){
		var param = {"compId":compId, "updateMode":1};
		$.ajax({
			data:param,
			url: "/comp/companyCheck",
				success: function(data){

					var dialog = bootbox.dialog({
						size: "large",
						title: "企业信息",
						message: data,
						buttons:{
							save:{
								label: SYS_MSG.BTN_SAVE,
								className: "btn-success",
								callback: function() {

									// 保存
									tsc.companyCheck.doEdit(function(rs){

										if(rs.info = "success"){

											// 提示保存成功
											sweetAlert({
												title: SYS_MSG.MSG_SAVE_SUCCESS,
												text: SYS_MSG.MSG_AUOT_CLOSE,
												type: 'success',
												showConfirmButton: false,
												timer: SYS_CONF.ALERT_TIMER,
											});

											// 重新查询
											tsc.companyList.doQuery(1);

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
	//变更状态
	change: function(compId){
		var param = {"compId":compId, "updateMode":2};
		
		$.ajax({
			data:param,
			url: "/comp/companyCheck",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "企业信息",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.companyCheck.doChange(function(rs){

									if(rs.info = "success"){

										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 重新查询
										tsc.companyList.doQuery(1);

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
	//冻结账号
	doFreeze: function(compId){
		// 提交请求
		sweetAlert({
				title: '是否冻结',
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
			    		data: {"compId": compId, "status": 0},	
			    		url: "/comp/updateCompanyStatus",
			    		type: "post",
						success: function(rs) {
						if(rs.info = "success"){
							// 提示冻结成功
							sweetAlert({
								title: '冻结成功',
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						} else {
							alert(456);
							// 提示冻结失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						// 重新查询
						tsc.companyList.doQuery(1);
						}
					});
				}
			});
	},
	//解冻账号
	doUnfreeze: function(compId){
		// 提交请求
		sweetAlert({
				title: '是否解冻',
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
			    		data: {"compId": compId, "status": 1},	
			    		url: "/comp/updateCompanyStatus",
			    		type: "post",
						success: function(rs) {
						if(rs.info = "success"){
							// 提示冻结成功
							sweetAlert({
								title: '解冻成功',
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						} else {
							// 提示冻结失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}
						// 重新查询
						tsc.companyList.doQuery(1);
						}
					});
				}
			});
	},
	//关闭店铺
	closeShop: function(compId){
		sweetAlert({
				title: '是否关闭',
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
			    		data: {"compId": compId, "shopStatus": 0},	
			    		url: "/comp/updateShopStatus",
			    		type: "post",
						success: function(rs) {
							if(rs.info = "success"){
								// 提示停用成功
								sweetAlert({
									title: '关闭成功',
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

							// 重新查询
							tsc.companyList.doQuery(1);
						}
			    	});
					
				}
			});
	},
	//开启店铺
	openShop: function(compId){
		sweetAlert({
				title: '是否开启',
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
			    		data: {"compId": compId, "shopStatus": 1},	
			    		url: "/comp/updateShopStatus",
			    		type: "post",
						success: function(rs) {
							if(rs.info = "success"){
								// 提示停用成功
								sweetAlert({
									title: '开启成功',
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

							// 重新查询
							tsc.companyList.doQuery(1);
						}
			    	});
				}
			});
	},
	//审核页面
	companyCheck: function (compId) {
		
		var param = {"compId":compId, "updateMode":3};
		
		$.ajax({
			data:param,
			url: "/comp/companyCheck",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "企业信息",
					message: data,
					buttons:{
						save:{
							label: "通过",
							className: "btn-success",
							callback: function() {

								// 保存
								tsc.companyCheck.doConfirm(2, function(rs){

									if(rs.info = "success"){

										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 重新查询
										tsc.companyList.doQuery(1);

										// 关闭对话框
										dialog.modal("hide");
									}
								});
								return false;
							}
						},
						noPass:{
							label: "不通过",
							className: "btn-default",
							callback: function() {

								// 保存
								tsc.companyCheck.doUnConfirm(3, function(rs){

									if(rs.info = "success"){

										// 提示保存成功
										sweetAlert({
											title: SYS_MSG.MSG_SAVE_SUCCESS,
											text: SYS_MSG.MSG_AUOT_CLOSE,
											type: 'success',
											showConfirmButton: false,
											timer: SYS_CONF.ALERT_TIMER,
										});

										// 重新查询
										tsc.companyList.doQuery(1);

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
	}

};

tsc.companyList.init();