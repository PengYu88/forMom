/**
 * 根据模板render列表
 */
function buildHtmlWithJsonArray(clazz,json,removeTemplate,remainItems,rowIndexOffset,callback){
    var temp = $('.'+clazz);

    var subCatagory = temp.parent();
    var dhtml = temp[0].outerHTML;
    //var temp = $(first);
    var copy=$(dhtml);
    temp.removeClass(clazz);
    temp.remove();
    if(!remainItems){
        $(subCatagory).empty();
    }
    for(var i=0;i<json.length;i++){
        //temp[0]表示dom元素
        var html = buildHtmlWithJson(temp[0],json[i] ,i+1, rowIndexOffset);
        subCatagory.append(html);
    }
    
    
    var runscripts = subCatagory.find('[script=true]');
    runscripts.each(function(index,obj){
        // if(index>0){
            var val="";
            try{
                val = eval(obj.textContent);
                if(obj.tagName=='INPUT'){
                    obj.value = val;        
                }else{
                    // obj.textContent = val;  
                    obj.innerHTML = val;  
                }
            }catch(e){
                console.log(e);
                console.log(obj.textContent);
                obj.textContent = "";
            }
            $(obj).attr('script','false');
        // }
    });

    if(!removeTemplate){
        copy.css('display','none');
        subCatagory.prepend(copy);
    }

    if (callback) {
        callback();
    }
}
function buildHtmlWithJson(temp,json , rowIndex, rowIndexOffset){
    temp.style.display='';
    var dhtml = temp.outerHTML;
    var dataItem = $(temp).attr('data-item');
    for(var key in json){
        var v = json[key];
        if(v==null){
            v="";
        }
        dhtml = dhtml.replace("$[rowIndex]",rowIndexOffset+rowIndex);
        if(dataItem){
        	key = dataItem+"."+key;
        }
        // dhtml = dhtml.replace(/\$\[name\]/g,v);
        dhtml = dhtml.replace(new RegExp("\\$\\["+key+"\\]","gm"),v);
    }
    var subCatagory = $(dhtml);
    
    var cIfs = subCatagory.find('cif');
    cIfs.each(function(index,obj){
        $(obj).parent().html(processCIf(obj));
    });
    return subCatagory[0].outerHTML;
}

function processCIf(cIf){
	var cifParent = $(cIf).parent();
	var result = $(cifParent[0].outerHTML);
	result.empty();
	for(var i=0;i<cifParent.children().length;i++){
    	var elem = cifParent.children()[i];
    	if(elem.tagName!='CIF'){
    		result.append(elem.outerHTML);
    	}else{
    		var script = $(elem).attr('test');
            try{
                if(eval(script)){
                	result.append($(elem).html());
                }
            }catch(e){
            	console.error(e);
            }
    	}
    }
	return result.html();
}