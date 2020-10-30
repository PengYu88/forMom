tsc.DictionaryList = {

	// 初始化
	init: function() {

		// 初始化事件绑定
		tsc.DictionaryList.event();
		
		tsc.DictionaryList.doQuery(1);
		
	},

	// 定义事件绑定
	event: function() {
		// 查询按钮点击事件
		$("#queryBtn").on("click", tsc.DictionaryList.doQuery);

		// 新建按钮点击事件
		//$("#addBtn").on("click", tsc.DictionaryList.doAdd);

	},

	// 查询字典信息
	doQuery: function(page){
		
		if(page.type){
			page = 1;
		}
		// 字典名称
		var dictType = $("#dictType").val();
		// 字典值1名称
		var dictValue1 = $("#dictValue1").val();
		var currentResult = SYS_CONF.PAGE_SIZE * (page - 1);
		var pageSize = SYS_CONF.PAGE_SIZE;
		
		$.getJSON("/content/dictionary/queryDictionaryInfoByPage", {"dictType":dictType,"dictValue1":dictValue1,"currentResult":currentResult,"pageSize":pageSize}, function(rs) {
			// 循环遍历数据
			buildHtmlWithJsonArray('repeat', rs.data, false, false);
			// 设置翻页
			tsc.DictionaryList.doRolePage(page, rs.total);
		});
		tsc.DictionaryList.queryDictMemo();
	},

	//查询分类信息
	queryDictMemo : function (){
		$.getJSON("/content/dictionary/queryDictionaryMemo", function(rs) {
			// 循环遍历数据
			buildHtmlWithJsonArray('dictMemo', rs.data, true, true);
			
		});
	},
	
	doRolePage: function(page, total){
		$('#page-model').bootpag({
			total: Math.ceil(total / SYS_CONF.PAGE_SIZE),
			page: page,
			maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			firstLastUse: true,
			first: SYS_CONF.PAGE_FIRST,
			prev: SYS_CONF.PAGE_PREV,
			next: SYS_CONF.PAGE_NEXT,
			last: SYS_CONF.PAGE_LAST
		}).on("page", function(event, num){

			// 查询
			tsc.DictionaryList.doQuery(num);
			
			tsc.DictionaryList.queryDictMemo();
		});
	},

	// 新增
	doAdd: function(dictType,dictId){

		var param = {"dictType":dictType,
					"dictId":dictId};
		
		$.ajax({
			data:param,
			url: "/content/dictionary/dictionaryAdd",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "字典添加",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {
								
								// 保存
								tsc.DictionaryAdd.doSave(function(rs){

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
										tsc.DictionaryList.doQuery(1);
										
										tsc.DictionaryList.queryDictMemo();

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
	
	//修改字典信息
	doUpdate : function(dictId){

		var param = {"dictId":dictId};
		
		$.ajax({
			data:param,
			url: "/content/dictionary/dictionaryUpdate",
			success: function(data){

				var dialog = bootbox.dialog({
					size: "large",
					title: "字典修改",
					message: data,
					buttons:{
						save:{
							label: SYS_MSG.BTN_SAVE,
							className: "btn-success",
							callback: function() {
								
								// 保存
								tsc.DictionaryUpdate.doUpdate(function(rs){

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
										tsc.DictionaryList.doQuery(1);
										
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
	
	//删除
	doDelet: function(dictId){
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

				$.getJSON("/content/dictionary/deleteDictionary?dictId="+dictId, function(rs){

					if(rs.code == "1"){
						// 提示删除成功
						sweetAlert({
							title: SYS_MSG.MSG_DEL_SUCCESS,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
						// 重新查询
						tsc.ArticleManage.doQuery(1);

					} else {

						// 提示删除失败
						sweetAlert({
							title: rs.desc,
							text: SYS_MSG.MSG_AUOT_CLOSE,
							type: 'success',
							showConfirmButton: false,
							timer: SYS_CONF.ALERT_TIMER,
						});
					}
				});
			}
		});
	},
	
	//查看详情、待写
	doSee: function(){

	}
};

tsc.DictionaryList.init();