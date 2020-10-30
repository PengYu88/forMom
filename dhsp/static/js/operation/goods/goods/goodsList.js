tsc.GoodsList = {
		init: function() {

			// 初始化事件绑定
			tsc.GoodsList.event();
			tsc.GoodsList.doPage();
			tsc.GoodsList.doQuery(1);

			//初始化日历控件
			$('.datetimepicker').datetimepicker({
				format : 'YYYY-MM-DD'
			});
		},

		//定义事件绑定
		event: function() {
			//查询按钮点击事件
			$("#queryBtn").on("click",tsc.GoodsList.doQuery);
			//行业下拉框联动事件
			$("#industryId").on("change",tsc.GoodsList.industryIdChange);
			//分类联动事件
			$(".jqGoodsCategoryGrade").on("change",tsc.GoodsList.goodsCategoryGrade);
		},
		
		//行业值变化触发事件
		industryIdChange: function(){
			//获取当前行业id
			var industryId = $(this).val();
			//清空一级分类
			$("#goodsCategoryGrade1Id").empty();
       	 	$("<option value=''>请选择</option>").appendTo($("#goodsCategoryGrade1Id"));
			//通过行业ID获取行业下分类列表
		    $.ajax({
	             type: "GET",  
	             url: "/operation/goods/goods/findCategoryListByIndustryId",
	             data: {industryId:industryId},
	             dataType: "json",
	             success : function(rs, textStatus) {
	            	 //动态加载一级分类下的分类数据
	            	 for(var i=0; i< rs.data.length; i++){
	            		 //分类id
	            		 var goodsCateId = rs.data[i].goodsCateId;
	            		 //分类名称
	            		 var goodsCateName = rs.data[i].goodsCateName;
	            		 //把分类放入一级分类下
	            		 $("<option value='"+goodsCateId+"'>"+goodsCateName+"</option>").appendTo($("#goodsCategoryGrade1Id"));
	            	 }
	            	 
	             },  
	             error : function() {  
	                alert("ajax失败！");  
	             }  
            });  
		},
		
		//分类联动事件
		goodsCategoryGrade: function(){
			//获取当前分类级别
			var grade = $(this).attr("grade");
			//计算下级分类级别
			var nextGrade = parseInt(grade) + 1;
			//获取当前选中分类的ID
			var categoryId = $(this).val();
			//清空下一级分类的内容
			$("#goodsCategoryGrade"+nextGrade+"Id").empty();
       	 	$("<option value=''>请选择</option>").appendTo($("#goodsCategoryGrade"+nextGrade+"Id"));
       	 	
		    $.ajax({
	             type: "GET",  
	             url: "/operation/goods/category/findNextChildens",  
	             data: {id:categoryId},
	             dataType: "json",
	             success : function(rs, textStatus) {  
	            	//动态加载下一级分类下的分类数据
	            	 for(var i=0; i< rs.data.length; i++){
	            		 //分类id
	            		 var goodsCateId = rs.data[i].goodsCateId;
	            		 //分类名称
	            		 var goodsCateName = rs.data[i].goodsCateName;
	            		 //把分类放入一级分类下
	            		 $("<option value='"+goodsCateId+"'>"+goodsCateName+"</option>").appendTo($("#goodsCategoryGrade"+nextGrade+"Id"));
	            	 }
	             },  
	             error : function() {  
	                alert("ajax失败！");  
	             }  
            });  
		},
		
		//分页
		doPage: function(){

			$('#goods-pager').bootpag({
				total: 1,
			    maxVisible: SYS_CONF.PAGE_MAX_SIZE,
			    firstLastUse: true,
			    first: SYS_CONF.PAGE_FIRST,
		    	prev: SYS_CONF.PAGE_PREV,
			    next: SYS_CONF.PAGE_NEXT,
			    last: SYS_CONF.PAGE_LAST
	        }).on("page", function(event, num){
	        	// 查询
	        	console.info(num);
	        	tsc.GoodsList.doQuery(num);
	        });
		},

		// 查询
		doQuery: function(page){

			if(page.type){
				page = 1;
			}
			
			var currentResult = SYS_CONF.PAGE_SIZE*(page-1);
			var pageSize = SYS_CONF.PAGE_SIZE;
			
			//定义查询分页参数
			
			var queryData = {};
			queryData["currentResult"] = currentResult;
			queryData["pageSize"] = pageSize;
			
			//行业ID
			if($("#industryId").val() != ""){
				queryData["industryId"] = $("#industryId").val();
			}
			//一级分类ID
			if($("#goodsCategoryGrade1Id").val() != ""){
				queryData["goodsCategoryGrade1Id"] = $("#goodsCategoryGrade1Id").val();
			}
			//二级分类ID
			if($("#goodsCategoryGrade2Id").val() != ""){
				queryData["goodsCategoryGrade2Id"] = $("#goodsCategoryGrade2Id").val();
			}
			//三级分类ID
			if($("#goodsCategoryGrade3Id").val() != ""){
				queryData["goodsCategoryGrade3Id"] = $("#goodsCategoryGrade3Id").val();
			}
			//四级分类ID
			if($("#goodsCategoryGrade4Id").val() != ""){
				queryData["goodsCategoryGrade4Id"] = $("#goodsCategoryGrade4Id").val();
			}
			//五级分类ID
			if($("#goodsCategoryGrade5Id").val() != ""){
				queryData["goodsCategoryGrade5Id"] = $("#goodsCategoryGrade5Id").val();
			}
			//公司名称
			if($("#storeName").val() != ""){
				queryData["storeName"] = $("#storeName").val();
			}
			//店铺状态
			if($("#storeStatus").val() != ""){
				queryData["storeStatus"] = $("#storeStatus").val();
			}
			//商品名称
			if($("#goodsName").val() != ""){
				queryData["goodsName"] = $("#goodsName").val();
			}
			//创建时间start
			if($("#createTimeStart").val() != ""){
				queryData["createTimeStart"] = $("#createTimeStart").val();
			}
			//创建时间end
			if($("#createTimeEnd").val() != ""){
				queryData["createTimeEnd"] = $("#createTimeEnd").val();
			}
			//上架时间start
			if($("#appearTimeStart").val() != ""){
				queryData["appearTimeStart"] = $("#appearTimeStart").val();
			}
			//上架时间end
			if($("#appearTimeEnd").val() != ""){
				queryData["appearTimeEnd"] = $("#appearTimeEnd").val();
			}
			//下架时间start
			if($("#withdrawTimeStart").val() != ""){
				queryData["withdrawTimeStart"] = $("#withdrawTimeStart").val();
			}
			//下架时间end
			if($("#withdrawTimeEnd").val() != ""){
				queryData["withdrawTimeEnd"] = $("#withdrawTimeEnd").val();
			}

			$.getJSON("/operation/goods/goods/queryGoodsByPage", queryData, function(rs) {

				console.info(rs);
				$('#goods-pager').bootpag({
	                total: Math.ceil(rs.total / SYS_CONF.PAGE_SIZE),
	                page:page
	            });
	            // 设置数据总条数
	            $("#pager-total").text(rs.total);
				// 循环遍历数据
				var rowIndexOffset = currentResult;
				buildHtmlWithJsonArray('goodsRepeat', rs.data, false, false ,rowIndexOffset);
			});
		},
		
		//产品上架
		doOnSale: function(){
			// 提交请求
			sweetAlert({
				title: SYS_MSG.MSG_ONSALE_CONFIRM,
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
			function(isConfirm){
				if (isConfirm) {
					$.getJSON("data/operation_success.json", function(rs){

						if(rs.code == "1"){
							// 提示上架成功
							sweetAlert({
								title: SYS_MSG.MSG_ONSALE_SUCCESS,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});

						} else {

							// 提示上架失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}

						// 重新查询
						tsc.GoodsList.doQuery(1);
					});
				}
			});
		},

		//产品下架
		doOffSale: function(){
			// 提交请求
			sweetAlert({
				title: SYS_MSG.MSG_OFFSALE_CONFIRM,
				type: 'warning',
				showConfirmButton: true,
				showCancelButton: true,
				confirmButtonText: SYS_MSG.BTN_CONFIRM,
				cancelButtonText: SYS_MSG.BTN_CANCEL,
				closeOnConfirm: false,
			},
			function(isConfirm){
				if (isConfirm) {
					$.getJSON("data/operation_success.json", function(rs){

						if(rs.code == "1"){
							// 提示下架成功
							sweetAlert({
								title: SYS_MSG.MSG_OFFSALE_SUCCESS,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});

						} else {

							// 提示下架失败
							sweetAlert({
								title: rs.desc,
								text: SYS_MSG.MSG_AUOT_CLOSE,
								type: 'success',
								showConfirmButton: false,
								timer: SYS_CONF.ALERT_TIMER,
							});
						}

						// 重新查询
						tsc.GoodsList.doQuery(1);
					});
				}
			});
		},
		//查看商品详情
		doProductInfo: function(){

		}
};
// 初始化
tsc.GoodsList.init();