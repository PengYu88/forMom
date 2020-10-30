tsc.selectRegion = {

    init: function() {

        // 初始化事件绑定
        tsc.selectRegion.event();
        tsc.selectRegion.checkboxDoCheck("majorMarketsInfo");
        tsc.selectRegion.regionCheck();
        $("#regionCheck").find("input").on("click",tsc.selectRegion.regionCheck);
    },

    //定义事件绑定
    event: function() {
    	
    	var fullName = '';
    	$('label input[name="majorMarketsInfo"]').each(function(){
    		var htm = $(this).parents("label").html().split(">");
			fullName+=','+htm[1];
			$(this).attr("fullname",htm[1]);
    	});
    	if (fullName.length > 0) {
    		fullName=fullName.substring(1);
		}
    	
    	$('label input[name="majorMarketsInfo"]').each(function(){
    		$(this).parents("label").attr("class","col-xs-2");
    	});

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
    },

    //选择地区
    regionCheck: function () {

        var pl = "";
        var length = 0;
        $("#regionCheck").find("input").each(function () {

            if($(this).prop("checked") == true){
                length = length + 1;
                if(pl == ""){
                    pl = $(this).attr("fullname");
                }else{
                    pl = pl + "  --  " +  $(this).attr("fullname");
                }
            }
            if($(this).prop("checked") == false){
                $(this).attr("disabled",false);
            }
        });
        //选择地区不能多于10
        if(length >= 10){

            $("#regionCheck").find("input").each(function () {
                if($(this).prop("checked") == false){
                    $(this).attr("disabled",true);
                }
            });


        }

        $("#placed").html(pl);

    },

    //表单验证
    validate: function(){

        $("#select-region-form").validate({

            ignore: ".ignore",
            rules: {

            },
        });
    },

    // 表单提交
    doSave: function(callBackFunc){
        // 表单验证
        if(!$("#select-region-form").valid()){
            return false;
        }
        
        var majorMarketsInfo='';
        var majorMarketsInfoName='';
        $("input[name='majorMarketsInfo']").each(function(){
			if($(this).attr("checked") == "checked"){
				majorMarketsInfo+=','+$(this).val();
				majorMarketsInfoName+=','+$(this).attr("fullname");
			}
		})
		if (majorMarketsInfo.length > 0) {
			majorMarketsInfo=majorMarketsInfo.substring(1);
			majorMarketsInfoName = majorMarketsInfoName.substring(1);
		}
        
		$('#majorMarkets').val(majorMarketsInfo);
		$('#majorMarketsName').val(majorMarketsInfoName);
		
		var rs = '';
        callBackFunc(rs);
    }
};
// 初始化
tsc.selectRegion.init();