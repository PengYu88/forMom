tsc.DeliveryAddressEdit = {

    // 初始化
    init: function() {
        //表单验证
        tsc.DeliveryAddressEdit.validate();

        //事件绑定
        tsc.DeliveryAddressEdit.event();
        
    },

    //事件绑定
    event: function () {

        // 省市区 联动
    	$("#nation").on("change", tsc.DeliveryAddressEdit.changeProvince);
        $("#province").on("change", tsc.DeliveryAddressEdit.changeCity);
        $("#city").on("change", tsc.DeliveryAddressEdit.changeArea);
    },


    //表单验证
    validate: function(){

        $("#-edit-form").validate({
            ignore: ".ignore",
            rules: {
            	receiverName: {
                    required: true
                },
                compName: {
                    required: true
                },
                addressCountry: {
                    required: true
                },
                addressProvince: {
                    required: true
                },
                addressCity: {
                    required: true
                },
                addressDistrict: {
                    required: true
                },
                addressDetail: {
                    required: true
                },
                postcodes: {
                    required: true
                },
                celllphoneNum: {
                    required: true
                }
            },
        });
    },

  //获取省下拉区域
    changeProvince :function(){
        $.ajax({
            url: "address/queryAreaInfo",
            data: {
            	"areaCode" : $("#nation").val()
            },
            dataType:"json",

            success:function(rs){
                $("#province").empty();
                $("#province").prepend("<option value=''>省</option>");
                for(var i=0;i<rs.data.length;i++){
                    $("#province").append("<option value='" + rs.data[i].areaCode + "' >" + rs.data[i].areaName + "</option>");
                };
                $("#city").empty();
                $("#city").prepend("<option value=''>市</option>");
                $("#area").empty();
                $("#area").prepend("<option value=''>区</option>");
            }
        });
    },
    //获取市下拉区域
    changeCity :function(){
        $.ajax({
            url: "address/queryAreaInfo",
            data: {
            	"areaCode" : $("#province").val()
            },
            dataType:"json",

            success:function(rs){
                $("#city").empty();
                $("#city").prepend("<option value=''>市</option>");
                for(var i=0;i<rs.data.length;i++){
                    $("#city").append("<option value='" + rs.data[i].areaCode + "' >" + rs.data[i].areaName + "</option>");
                };
                $("#area").empty();
                $("#area").prepend("<option value=''>区</option>");
            }
        });
    },
  //获取区下拉区域
    changeArea :function(){
        $.ajax({
            url: "address/queryAreaInfo",
            data: {
            	"areaCode" : $("#city").val()
            },
            dataType:"json",

            success:function(rs){
                $("#area").empty();
                $("#area").prepend("<option value=''>区</option>");
                for(var i=0;i<rs.data.length;i++){
                    $("#area").append("<option value='" + rs.data[i].areaCode + "' >" + rs.data[i].areaName + "</option>");
                };
            }
        });
    },


    // 企业状态表单提交
    doSave: function(callBackFunc){
        // 表单验证
        if(!$("#-edit-form").valid()){
            return false;
        }

        // 表单提交
        $('#-edit-form').ajaxSubmit({
            target: '#-edit-form',
            dataType: 'json',
            type : "post",
            success: function(rs) {
                callBackFunc(rs);
            }
        });
        return false;
    },

};

tsc.DeliveryAddressEdit.init();
