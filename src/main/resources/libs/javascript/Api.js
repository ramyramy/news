function Api(url, paramObj, method, callbackFunc) {
	
	this.url = url;
	this.paramObj = paramObj;
	this.method = method.toLowerCase();
	this.callbackFunc = callbackFunc;
	
	this.submit = function() {
		var _this = this;
		
		var contentType = "application/json; charset=utf-8";
		var tranditional = false;
		
		if (paramObj == null) paramObj = { };
		var data = paramObj;
		
		if (method == 'post' || method == 'put') {
			data = JSON.stringify(paramObj);
		}
		if (method == 'get') 
			tranditional = true;
		
		tranditional = true;
		jQuery.ajax({
			type: method ,
			dataType : "json" ,
			url : url ,
			contentType : contentType,
			traditional : tranditional,
			data : data,
			async : true ,
			success : function(data) {
				if (console) console.log('data : ' + JSON.stringify(data));
				//if (console) console.dir(data);
				
				
				if (data.code == 200) {
					_this.callbackFunc(data.data);
				} else {			
					if (console) console.log("data.code : " + data.code);
					if (console) console.log("data.message : " + data.message);
					if (console) console.log("data.extMessage : " + data.extMessage);
					if (console) console.log("data.date : " + data.date);
				}
			} ,
			error : function(xhr, status, err) {
				if (console) console.log("xhr.status : " + xhr.status);
				if (console) console.log("status : "  + status);
				if (console) console.log("err : "  + err);
				alert('오류가 발생하였습니다.');
			} 
		});
	}
	
	
};
