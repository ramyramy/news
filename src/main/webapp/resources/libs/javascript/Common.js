String.prototype.ltrim = function() {
    var re = /\s*((\S+\s*)*)/;
    return this.replace(re, "$1");
};

String.prototype.rtrim = function() {
	var re = /((\s*\S+)*)\s*/;
	return this.replace(re, "$1");
};

String.prototype.trim = function() {
	return this.ltrim().rtrim();
};

var Common = {
	
	/**
	 * 파리미터로 받은 태그명과 동일한 부모 노드 중 가장 가까운 노드를 반환 합니다.
	 * 노드를 찾을 수 없을 경우 null 을 리턴 합니다.
	 * @param tagName
	 */
	getLastParentByTagName : function(obj, tagName) {
		// alert('Common.getLastParentByTagName');
		var currentObj = obj;
		var destObj = null;
		

		tagName = tagName.toUpperCase();
		
		currentObj = currentObj.parentNode;
		while( currentObj.tagName != "BODY" || currentObj.tagName != "TABLE" || currentObj.tagName != null ) {
			
			if ( currentObj.tagName == tagName ) { //  엘리멘트를 찾았다면 루프 중단
				destObj = currentObj;
				break;
			}
			
			currentObj = currentObj.parentNode;
		}
		
		if (destObj != null) {
			return destObj;
		} else {
			return null;
		}
	}	 
	,
	/**
	 * 문자열을 바이트 길이를 리턴 합니다.
	 * 
	 * @param str
	 * @returns {Number}
	 */
	strRealLength : function(str) {
		var real_length = 0;
		var len = str.length;

		for (var i = 0; i < len; i++) {
			ch = str.charCodeAt(i);
			if (ch >= 0xFFFFFF) {
				real_length += 4;
			}
			else if (ch >= 0xFFFF) {
				real_length += 3;
			}
			else if (ch >= 0xFF) {
				real_length += 2;
			}
			else {
				real_length++;
			}
		}

		return real_length;
	}
	,
	
	/**
	 * 문자열를 지정한 길이메 맞게 컷팅해서 반환합니다.
	 * 아스키 코드를 제외한 문자는 실질적으로 두자리를 차지하는 경우가 대부분이므로 아스키 코드가 아닌 경우에는 
	 * 인코딩에 상관 없이 2자리로 계산합니다.
	 * @param str
	 * @param length
	 * @param tail
	 * @returns
	 */
	cutString : function(str, length, tail) {
		if (this.isEmpty(str)) return '';
		
		//Debugger.log('length : ' + length);
		//Debugger.log('strRealLength : ' + this.strRealLength(str));
		
		if (this.strRealLength(str) <= length) return str;
		
		var realLength = 0;
		var skipLength = 0;
		var i = 0;
		while(skipLength < length) {
			realLength++;
			
			ch = str.charCodeAt(i++);
			if (ch >= 0xFFFFFF) {
				skipLength += 2;
			} else if (ch >= 0xFFFF) {
				skipLength += 2;
			} else if (ch >= 0xFF) {
				skipLength += 2;
			} else {
				skipLength++;
			};
			
			//Debugger.log('length : ' + length);
			//Debugger.log('skipLength : ' + skipLength);
		}
		
		return str.substring(0, realLength) + tail;
		
	}
	
	,
	selCheckboxList : function(checkboxObjs) {
		//alert(checkboxObjs.length);
		if (!checkboxObjs) {
			alert("체크박스를 찾을 수 없습니다.");
			return null;
		}
		
		if (checkboxObjs.length == 1) {
			if (jQuery(checkboxObjs).attr('checked') == true) {
				return checkboxObjs;
			} else{
				return null;
			}
		} else {
			var checkedObjs = new Array();
			jQuery(checkboxObjs).each(function(){
				if (jQuery(this).attr('checked') == true) {
					checkedObjs.push(jQuery(this));
				}
			});
			
			//alert(checkedObjs.length);
			if (checkedObjs.length == 1) return checkedObjs[0];
			else return checkedObjs;
		}
	}
	

	
	/**
	 * 지정된 체크박스를 모두 체크하거나 체크 해제합니다.
	 * 
	 */
	, setAllCheck : function(srcCb, cbName) {
		
		
		var status = jQuery(srcCb).attr('checked') == 'checked' ?  true : false;
		
		jQuery('input[name=' + cbName + ']').each(function() {
			jQuery(this).attr('checked', status); 
		});
	
	}
	
	, chkNull : function(str) {
	    str = str.replace(/\s/g, '');
	    return (str.length==0);
	}
	
	, rtrim : function( str ) {
		for ( var i = str.length-1 ; i>=0 ; i-- ) {
			if ( str.charAt(i) == ' ' ) str = str.substring(0,i);
			else break;
		}
		return str;
	}
	
	, ltrim : function( str ) {
		for (var i = 0 ; i<str.length ; i++ ) {
			if ( str.charAt(i) == ' ' ) str = str.substring(1);
			else break;
		}
		return str;
	}
	
	, trim : function (str) {
		str = this.rtrim( str );
		str = this.ltrim( str );
		
		return str;
	}
	
	, isEmpty : function(value)
	{
		if(value==null || this.ltrim(this.rtrim(value)) =="" ) return true;
		return false;
	}
	
	, moveTo : function(value) {
		if (this.isEmpty(value)) return;
		
		location.href=value;
	}
	
	,  format3digit : function(num){
		var str = "";
		var hstr = "";
		num=num+"";
		if(num.length != 0){ 
			if(num.indexOf("-") != -1){
				hstr = "-";
				num = num.substring(1, num.length);
			}
	 		num = num*1;           
			num = num+"";    
			while(num.length > 3){
				str = "," +num.substring(num.length-3,num.length) + str;
				num = num.substring(0,num.length-3);

			}
			str = hstr + num + str;
		}
		else{
			str = "0";
		}
		return str;
	}
	
	,
	
	radioValue : function(rdoArr) {
		if (rdoArr == null || rdoArr.length <= 0) return "";
		if (rdoArr[0].getAttribute("type") != "radio") return "";
		
		var ret = "";
		for (var i = 0; i < rdoArr.length; i++) {
			if (rdoArr[i].checked == true) {
				ret = rdoArr[i].value; 
				break;
			}
		}
		
		return ret;
		
	}
	
	,
	/**
	 * 입력된 라디오 버튼 모음 중 지정된 value의 버튼으로 선택되도록 설정
	 */
	setRadioButton : function(radioButtons, value) {
		if (radioButtons == null || radioButtons.length <= 0) return;
		if (radioButtons[0].getAttribute("type") != "radio") return;
		if (Common.isEmpty(value)) return;
		
		for (var i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].value == value) {
				radioButtons[i].setAttribute("checked", "checked");
				break;
			}
		}
		
		return;
	}
	
	,
	
	/**
	 * 다중 input 태그의 value 값들을 추출하여 반환합니다.
	 * 단, 체크박스나 라디오 버튼일 경우 true / false 로 반환합니다.
	 */
	getInputValues : function(inputEl) {
		var values = new Array();
		
		if (inputEl == null) return values;
		
		jQuery(inputEl).each(function() {
			if (jQuery(this).prop('tagName').toUpperCase() == 'INPUT') {
				if (jQuery(this).prop('type').toUpperCase() == 'CHECKBOX' || jQuery(this).prop('type').toUpperCase() == 'RADIO') {
					values.push(jQuery(this).prop('checked'));
				} else {
					values.push(jQuery(this).val());
				}
			}
		});
		
		return values;
	}
	
	,
	
	/**
	 * checkbox 중 check 된 값들만 추출합니다
	 */
	getCheckedValues : function(inputEl) {
		var values = new Array();
		
		if (inputEl == null) return value;
		
		jQuery(inputEl).each(function() {
			if (jQuery(this).prop('tagName').toUpperCase() == 'INPUT') {
				if (jQuery(this).prop('type').toUpperCase() == 'CHECKBOX' || jQuery(this).prop('type').toUpperCase() == 'RADIO') {
					if (jQuery(this).prop('checked'))
						values.push(jQuery(this).val());
				} 
			}
		});
		
		return values;
	}
	,
	
	getCheckedRadioButtonValue : function(inputEl) {
		var value = '';
		
		if (inputEl == null) return '';
		
		jQuery(inputEl).each(function() {
			if (jQuery(this).prop('tagName').toUpperCase() == 'INPUT') {
				if (jQuery(this).prop('type').toUpperCase() == 'RADIO') {
					if (jQuery(this).prop('checked'))
						value = jQuery(this).val();
				} 
			}
		});
		
		return value;
	}
	,
	
	writeCookie : function(name, value, date) {
		var expires = "";
		
		var date = new Date();
		date.setTime(date.getTime() + (date * 1000 * 60 * 60 * 24));
		expires = "; expires=" + date.toUTCString();
		
		document.cookie = name + "=" + encodeURI(value) + expires + "; path=/";
		
		//Debugger.log("cookie : " +  name + "=" + value + expires + "; path=/");
	}
	
	, 
	
	readCookie : function(name) {
		var searchName = name + "=";
		var cookieSerial =  document.cookie.split('; ').join(';');
		var cookies = cookieSerial.split(";");
		//Debugger.log("document.cookie : " + document.cookie);
		//Debugger.log("cookies.length : " + cookies.length);
		var value = null;
		for (var i = 0; i < cookies.length; i++) {
			
			var c = cookies[i];
			//Debugger.log("readCookie : " + c);
			//Debugger.log("c.indexOf(" + searchName + ") : " + c.indexOf(searchName));
			if (c.indexOf(searchName) == 0)  
				value = c.substring(searchName.length, c.length);	

		}  
		value = decodeURI(value);
		if (value == 'null') value = null;
		
		return value;
	}
	
	, 
	eraseCookie : function(name) {
		this.writeCookie(name, "", -1);
	}
	
	,
	
	importJs : function(fileUri) {
		if (this.isEmpty(fileUri)) return;
		
		var tag = "";
		tag += '<script type="text/javascript" src="' + fileUri + '"></script>';
		
		//alert(tag);
		
		jQuery('head').append(tag);
		
	}
	
	,
	
	shortenTextByByte : function(str, length) {
		if (this.isEmpty(str)) return "";
		
		var lengthByByte = 0;
		var lengthByStr = 0;
		
		for (var i = 0; i < str.length; i++) {
			lengthByStr = i;
			ch = str.charCodeAt(i);
			if (ch >= 0xFFFFFF) {
				lengthByByte += 4;
				
			}
			else if (ch >= 0xFFFF) {
				lengthByByte += 3;
			}
			else if (ch >= 0xFF) {
				lengthByByte += 2;
			}
			else {
				lengthByByte++;
			}
			
			if (lengthByByte > length) break;
		}
		
		var returnStr = str.substring(0, lengthByStr +1);
		if (lengthByStr + 1 < str.length) returnStr += " ..";
		return returnStr;
		
	},
	
	/**
	 * 폼에 속한 엘리멘트를 이름을 기준으로 로딩합니다.
	 * @param form
	 * @param elName
	 */
	getFormEl : function(form, elName) {
		return jQuery('input[name=' + elName + ']', form);
	},
	
	/**
	 * select 엘리멘트의 option 엘리멘트를 생성합니다.
	 * keyValueData = { "data" :
	 * 							[
	 * 								{"key" : "option's value1", "value" : "options label1" },
	 * 								{"key" : "option's value2", "value" : "options label2" },
	 * 								{"key" : "option's value3", "value" : "options label3" },
	 * 							]
	 * 						  }
	 */
	makeOptionEls : function(keyValueData) {
		if (keyValueData == null) return "";
		
		var optionElTemplate = "<option value='{value}'>{label}</option>";
		
		var renderer = "";
		for (var i = 0; i < keyValueData.data.length; i++) {
			var _data = keyValueData.data[i];
			renderer += optionElTemplate.replace("{value}", _data.key).replace("{label}", _data.value);
		}
		
		return renderer;
	},
	
	makeOptionEl : function(value, label, selected) {
		var optionElTemplate = "<option value='{value}' {selected}>{label}</option>";
		
		var renderer = optionElTemplate.replace("{value}", value).replace("{label}", label);
		if (selected == true) renderer = this.replaceAll(renderer, '{selected}', 'selected=selected');
		else renderer = this.replaceAll(renderer, '{selected}', '');
		
		return renderer;
	}
	,
	/**
	 * 조건에 맞는 모든 문자열을 치환합니다.
	 * @param str
	 */
	replaceAll : function(str, s1, s2) {
		return str.split(s1).join(s2);
	},
	
	/**
	 * 스트링을 boolean  값으로 반환합니다.
	 * 기본적으로 'true'이면 true를 'false'이면 false를 반환하나, 실질적으로 'true' 가 아닌 경우엔 false를 반환합니다.
	 * @param str
	 * @returns {Boolean}
	 */
	parsBoolean : function(str) {
		var bool = false;
		if ( str != null && str.toLowerCase() == 'true') bool = true;
		
		return bool;
	},
	
	/**
	 * 폼의 각 인풋 값을 가져 옵니다.
	 * @param form
	 * @param name
	 */
	getFormValue : function(formElId, name) {
		var formEl = jQuery(formElId);
		var value = '';
		
		//Debugger.log('name : ' + name);
		//Debugger.log('inputEl : ' +  JSON.stringify(jQuery('input[name=' + name +']', formEl)) );
		if ( jQuery('input[name=' + name +']', formEl).length > 0) {
			
			var inputEl = jQuery('input[name=' + name +']', formEl);
			
			//Debugger.log('InputEl name : ' + jQuery(inputEl).attr('name'));
			//Debugger.log('InputEl type : ' + jQuery(inputEl).attr('type'));
			
			var type = jQuery(inputEl).attr('type').toLowerCase();
			var size = jQuery(inputEl).length;
			
			Debugger.trace('type', type);
			
			if (type == 'text' || type == 'hidden' || type == 'password') {
				if (size == 1) value = jQuery(inputEl).val();
				else {
					var valArr = new Array();
					jQuery(inputEl).each(function(){
						varArr.push(jQuery(this).val());
					});
					value = valArr;
				}
			} else if (type == 'radio') {
				jQuery(inputEl).each(function(){
					if (jQuery(this).prop('checked') == true)
						value = jQuery(this).val();
				});
			} else if (type == 'checkbox') {
				//Debugger.trace('checkbox size', inputEl.length);
				if (inputEl.length == 1) {
					if (jQuery(inputEl).prop('checked') == true)
						value = jQuery(inputEl).val();
				} else {
					var values = new Array();
					jQuery(inputEl).each(function(){
						if (jQuery(this).prop('checked') == true)
							values.push(jQuery(this).val());
					});
					if (values.length > 0) value = values;
				}
				
			}
		} else if ( jQuery('textarea[name=' + name +']', formEl).length > 0) {
			value = jQuery('textarea[name=' + name +']', formEl).val();
		} else if ( jQuery('select[name=' + name + ']', formEl).length > 0) {
			value = jQuery('select[name=' + name + ']', formEl).val();
		}
		
		if (value == 'null') value = null;

		return value;
	}
	,
	setFormValue : function(formElId, name, value) {
		var formEl = jQuery(formElId);
		
		//Debugger.log('start setFormValue');

		
		if ( jQuery('input[name=' + name +']', formEl).length > 0) {
			var inputEl = jQuery('input[name=' + name +']', formEl);
			var type = jQuery(inputEl).attr('type').toLowerCase();
			var size = jQuery(inputEl).length;
			if (type == 'text' || type == 'hidden' || type == 'password') {
				jQuery(inputEl).val(value);
			} else if (type == 'checkbox' || type == 'radio') {
				Debugger.trace('checkbox size', inputEl.length);
				if (inputEl.length == 1) {
					jQuery(inputEl).prop('checked', false);
					//Debugger.trace('value', value);
					//Debugger.trace('jQuery(inputEl).val()', jQuery(inputEl).val());
					if (jQuery(inputEl).val() == value.toString()) jQuery(inputEl).prop('checked', true);
				} else {
					jQuery(inputEl).each(function(){
						jQuery(this).prop('checked', false);
						if (value instanceof Array) {
							for (var i = 0; i < value.length; i++) {
								if (jQuery(this).val() == value[i].toString()) {
									jQuery(this).prop('checked', true);
									break;
								}
							}
						} else {
							if (jQuery(this).val() == value) jQuery(this).prop('checked', true);
						}
					});
				}
			}
			
		} else if ( jQuery('textarea[name=' + name +']', formEl).length > 0) {
			jQuery('textarea[name=' + name +']', formEl).val(value);
		} else if ( jQuery('select[name=' + name + ']', formEl).length > 0) {
			jQuery('select[name=' + name + ']', formEl).val(value);
		}
		
	}
	, nullToBlank : function(str) {
		if (str == null) return '';
		
		return str;
	}
	, getParamerValue : function(name) {
		
		var search = jQuery(location).attr('search')
		
		if (Common.isEmpty(search)) return '';
		
		search = search.replace('?', '');
		paramKeyValues = search.split('&');
		for (var i = 0; i < paramKeyValues.length; i++) {
			var keyValue = paramKeyValues[i].split('=');
			if (keyValue[0] == name) return decodeURIComponent(Common.replaceAll(keyValue[1], '+', ' '));
		}
		
		return '';
	}
	, getMaxWidth : function(width) {
		var screenWidth = jQuery(window).width();
		if (width < screenWidth) return width;
		else return screenWidth;
	}
	, getMaxHeight : function(height) {
		var screenHeight = jQuery(window).height();
		if (height < screenHeight) return height;
		else return screenHeight;
	}
	
	, getRandomColor : function() {
		var r1 = Math.floor(Math.random() * 16);
		var r2 = Math.floor(Math.random() * 16);
		var g1 = Math.floor(Math.random() * 16);
		var g2 = Math.floor(Math.random() * 16);
		var b1 = Math.floor(Math.random() * 16);
		var b2 = Math.floor(Math.random() * 16);
		
		var color = '#' + r1.toString(16) + r2.toString(16) + g1.toString(16) + g2.toString(16)  + b1.toString(16) + b2.toString(16);
		//Debugger.log('color : ' + color);
		return color;
	}
	
	, getYears : function(length, pos) {
		
		var today = new Date();
		var year = Number(today.format('Y'));
		var years = new Array();
		
		year = year - (length - (length -pos));
		for (var i = 0; i < length; i++) {
			years.push(year++);
		}
		
		return years;
	}
	
};