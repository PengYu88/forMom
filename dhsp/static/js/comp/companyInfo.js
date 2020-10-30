tsc.companyInfo= {

    // 初始化
    init: function() {

		var foundingTime=$("#foundingTimeInfoHidden").val();
		if (foundingTime!="") {
			foundingTime = formatDate($("#foundingTimeInfoHidden").val(),'yyyy-MM-dd');
	        $('#foundingTimeInfo').html(foundingTime);
		}

    	tsc.companyInfo.radioDoCheck("compLevelInfo");
    	tsc.companyInfo.radioDoDisabled("compLevelInfo");
    	
    	tsc.companyInfo.radioDoCheck("compCategoryInfo");
    	tsc.companyInfo.radioDoDisabled("compCategoryInfo");
    	
    	tsc.companyInfo.checkboxDoCheck("businessScopeInfo");
    	tsc.companyInfo.radioDoDisabled("businessScopeInfo");
    	
    	tsc.companyInfo.radioDoCheck("customizationInfo");
    	tsc.companyInfo.radioDoDisabled("customizationInfo");
    	
    	tsc.companyInfo.radioDoCheck("qualityControlInfo");
    	tsc.companyInfo.radioDoDisabled("qualityControlInfo");
    	
    	tsc.companyInfo.checkboxDoCheck("agementSystemAuthenticationInfo");
    	tsc.companyInfo.radioDoDisabled("agementSystemAuthenticationInfo");
    	
    	tsc.companyInfo.radioDoCheck("contactPersonSexInfo");
    	tsc.companyInfo.radioDoDisabled("contactPersonSexInfo");

    	tsc.companyInfo.selectDoDisabled("addressProvinceInfo");
    	tsc.companyInfo.selectDoDisabled("addressCityInfo");
    	
    	tsc.companyInfo.selectDoDisabled("staffsNumInfo");
    	tsc.companyInfo.selectDoDisabled("businessVolumeInfo");
    	tsc.companyInfo.selectDoDisabled("exportsInfo");
    	tsc.companyInfo.selectDoDisabled("areaCodeInfo");
    	tsc.companyInfo.selectDoDisabled("invoiceTypeInfo");
    },

    // 查询
    doSave: function(callBackFunc){
        // 表单验证
        if(!$("#-edit-form").valid()){
            return false;
        }

        // 表单提交
        $('#-edit-form').ajaxSubmit({
            target: '#-edit-form',
            dataType: 'json',
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },
    formatfoundingTime:function (foundingTime) {
		if (foundingTime!="") {
			return foundingTime = formatDate(foundingTime,'yyyy-MM-dd');
		}
    },
    //初始化关联企业
    query:function (page) {
        if(page.type){
            page = 1;
        }

        $.getJSON("data/relEnterprise.json", function(rs) {

            // 循环遍历数据
            buildHtmlWithJsonArray('plRepeat', rs.data, false, false);
        });
    },
    //radioDoCheck
    radioDoCheck:function (name) {
    	var inputName = "#" + name + "Hidden";
    	var value = $(inputName).val();
		$("input[name='" + name + "']").each(function(){
			if($(this).val() == value){
				$(this).attr("checked","checked");
			}
		})
    },
    //radioDoDisabled
    radioDoDisabled:function (name) {
		$("input[name='" + name + "']").each(function(){
			$(this).attr("disabled","disabled");
		})
    },
    //selectDoDisabled
    selectDoDisabled:function (name) {
    	var inputName = "#" + name;
    	$(inputName).attr("disabled","disabled");
    	$(inputName).attr("class","form-control");
    },
    //checkboxDoCheck
    checkboxDoCheck:function (name) {
    	var inputName = "#" + name + "Hidden";
    	var value = $(inputName).val();
    	var valueList = value.split(",");
		$("input[name='" + name + "']").each(function(){
			if(valueList.indexOf($(this).val()) >= 0){
				$(this).attr("checked","checked");
			}
		})
    }
//    ,
//    //显示图片
//    phView: function(){
//
//        $.ajax({
//            url: "html/customer/enterprise/PhotoView.html",
//
//            success: function(data){
//
//                var dialog = bootbox.dialog({
//                    size: "large",
//                    title: '图片标题',
//                    message: data,
//                    buttons:{
//                        cancel:{
//                            label: SYS_MSG.BTN_CANCEL,
//                            className: "btn-default",
//                         }
//                    }
//                });
//            }
//        });
//    },
//    //显示三证图片
//    phThreeView :function () {
//        $.ajax({
//            url: "html/customer/enterprise/PhotoThreeView.html",
//
//            success: function(data){
//
//                var dialog = bootbox.dialog({
//                    size: "large",
//                    title: '图片标题',
//                    message: data,
//                    buttons:{
//                        cancel:{
//                            label: SYS_MSG.BTN_CANCEL,
//                            className: "btn-default",
//                        }
//                    }
//                });
//            }
//        });
//    },
//    //显示图片
//    doViewPhoto: function(obj){
//
//        var imgTitle = $(obj).find("img").attr("alt");
//        var imgUrl = $(obj).find("img").attr("src");
//
//        $.ajax({
//            url: "/company/PhotoView.vm",
//            data: {
//                "imgUrl": imgUrl
//            },
//            success: function(data){
//                var dialog = bootbox.dialog({
//                    size: "large",
//                    title: imgTitle,
//                    message: data,
//                    buttons:{
//                        cancel:{
//                            label: SYS_MSG.BTN_CANCEL,
//                            className: "btn-default",
//                        }
//                    }
//                });
//            }
//        });
//    }
};

tsc.companyInfo.init();