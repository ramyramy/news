function Map() {
	this.keys = new Object(); // key[value index]
	this.keyIndex = new Array();
	this.values = new Array();
	
	/**
	 * 맵에 새로운 데이터를 입력합니다.
	 * key 값이 기존에 존재할 경우 key에 해당하는 value 값을 update 합니다.
	 */
	this.put = function(key, value) {
		
//		if ( this.keys[key] == null || this.keys[key] == 'undefined' ) {
		if ( ! this.keys.hasOwnProperty(key)  || this.keys[key] == null ) {
			this.keys[key] = this.values.length;
			this.values.push(value);
			this.keyIndex.push(key);
		}  else {
			this.values[this.keys[key]] = value;
		}

	};
	
	/**
	 * 맵에 등록된 데이터를 index 에 의해서 반환합니다.
	 */
	this.get = function(idx) {
		if (this.values.length > idx) {
			return this.values[idx];
		} else {
			return null;
		}
	};
	
	/**
	 * 맵에 등록된 데이터를 key 에 의 반환합니다.
	 */
	this.pop = function(key) {
		return this.values[this.keys[key]];
	};
	
	/**
	 * 맵에 등록되 데이터를 key를 이용헤서 제거합니다.
	 */
	this.remove = function(key) {

		if ( ! this.keys.hasOwnProperty(key)  || this.keys[key] == null ) return;
		//alert('dfsd');
		
		var idx = this.keys[key];
				
		var newKeyIndex = new Array();
		var newValues = new Array();
		
		//Debugger.log('key = ' + key);
		this.keys[key] = null;
		

		for (var i = 0; i < (this.keyIndex.length - 1); i++) {
			Debugger.log(' i  = ' + i + ' idx = ' + idx);
			if (i < idx) {
				newKeyIndex.push(this.keyIndex[i]);
				newValues.push(this.values[i]);
			} else if ( i >= idx) {
				newKeyIndex.push(this.keyIndex[i + 1]);
				newValues.push(this.values[i + 1]);
			}
			
			//Debugger.log("newKeyIndex : " + newKeyIndex[i]);
			//Debugger.log("this.keyIndex : " + this.keyIndex[i]);
		}
		
		this.keyIndex = newKeyIndex;
		this.values = newValues;

		this.keys = new Object();
		for (var i = 0; i < this.keyIndex.length; i++) {
			this.keys[this.keyIndex[i]] = i;
		}
		
				
		/*
		for (var i = 0; i< this.keyIndex.length; i++) {
			Debugger.log('keIndex[' + i + '] = ' + this.keyIndex[i]);
			Debugger.log('key[' + this.keyIndex[i] + '] = ' + this.key[this.keyIndex[i]]);
		}
		
		for (var i = 0; i< this.values.length; i++) {
			Debugger.log('values[' + i + '] = ' + this.values[i].fileName);
		}
		*/
		
	};
	
	/**
	 * 맵에 등록되어 있는 데이터를 크기를 반환합니다.
	 */
	this.size = function() {
		return this.values.length;
	};
	
	/**
	 * 맵에 등록된어 있는 데이터를 리스트로 반환합니다.
	 * 키값은 반환되지 않습니다.
	 */
	this.list = function() {
		return this.values;
	};
	
	this.isContains = function(key) {
		
		if ( this.keys.hasOwnProperty(key)  || this.keys[key] != null ) {
			return true;
		} else {
			return false;
		}
	};
	
	/**
	 * 맵을 복제 합니다.
	 */
	this.clone = function() {
		
		var _map = new Map();
		
		_map.keys = this.keys;
		_map.keyIndex = this.keyIndex;
		_map.values = this.values;
		
		return _map;
	};
	
	/**
	 * 맵의 내용을 초기화 합니다.
	 */
	this.initialize = function() {
		this.keys = new Object();
		this.keyIndex = new Array();
		this.values = new Array();
	};
	
}