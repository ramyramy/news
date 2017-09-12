function FileUplaoder(fileUploadUrl) {
	
	this.allowedFilExtArr = null;
	this.fileSizeLimit = 1024 * 1024 * 100; // 100MB
	this.fileUploadUrl = fileUploadUrl;	// 파일 업로드 웹소켓 url
	this.wsocket = null;
	
	this.origFileName = null;	// 첨부 파일
	
	this.onUploading = false; // 업로드 중 여부
	
	this.targetFileNameEl = null;	// 사용자가 첨부한 파일명을 담을 input 태그
	this.targetFileTempNameEl = null; // 업로드된 파일명을 담을 input 태그
	
	this.setAllowedFileExtArr = function(arr) {
		this.allowedFilExtArr = arr;
	}
	
	this.setFileSizeLimit = function(limit) {
		this.fileSizeLimit = limit;
	}
	
	this.setFileUploadUrl = function(url) {
		this.fileUploadUrl = url;
	}
	
	this.wsConnect = function() {
		var _this = this;
		
		this.wsocket = new WebSocket(this.fileUploadUrl);
		Debugger.log("wsocket : " + this.wsocket);
		Debugger.log("origFileName : " + this.origFileName);
		
		_this.onUploading = true;
		
		this.wsocket.onmessage = function(evt) {
			Debugger.log("Recieved message from websocket server.");
			
			var data = evt.data;
			Debugger.log("data : " + data);
			Debugger.log("origFileName : " + _this.origFileName);
			Debugger.log("wsocket : " + _this.wsocket);
			
			jQuery(_this.targetFileNameEl).val(_this.origFileName);
			jQuery(_this.targetFileTempNameEl).val(data);
			
			_this.wsocket.close();
			
			_this.onUploading = false;
		}
		
		this.wsocket.onclose = function(evt) {
			Debugger.log("Websocket closed");
			Debugger.log("Websocket Code : " + evt.code);
			Debugger.log("Websocket reason : " + evt.reason);
			
			if (evt.code != 1000) {
				if (evt.code == 1001) {
					// 웹브라우져 닫힘. 무시
				} else if (evt.code == 1009) {
					// 파일 사이즈 큼
					alert('파이  사이즈가 너무 큽니다.');
				} else {
					alert('이미지 업로드에 실패하였습니다.(' + evt.code +').\n\r' + evt.reason);
				}
				
			}
			
			_this.onUploading = false;
		}
		
	}
	
	
	this.upload = function(fileEl, targetFileNameEl,  targetFileTempNameEl) {
		var _this = this;
		if (fileEl == null) {
			Debugger.log('File element is null.');
			return;
		}
		
		var files = fileEl.files;
		var file = null;
		
		if (files) {
			file = files[0];
		} else {
			alert("Please input file for upload.");
			Debugger.log("Upload file is null.");
			return;
		}
		
		Debugger.log("File name : " + file.name);
		Debugger.log("File size : " + file.size);
		
		var fileExt = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLowerCase();
		Debugger.log("File Ext : " + fileExt);
		
		if (this.allowedFilExtArr != null) {
			var allowedFile = false;
			for (var i = 0; i < this.allowedFileExtArr.length; i++) {
				if (fileExt == this.imageFileExtArr[i]) {
					allowedFile = true;
					break;
				}
			}
			
			if (! allowedFile) {
				alert("File is not image file.");
				return;
			}
		}
		
		if (file.size > this.fileSizeLimit) {
			alert("Please select file size under 100MB.");
			return;
		}
	
		this.origFileName = file.name;
		this.targetFileNameEl = targetFileNameEl;
		this.targetFileTempNameEl = targetFileTempNameEl;
		
		if (this.wsocket) this.wsocket.close();
		this.wsConnect();
		
		var _this = this;
		this.wsocket.onopen = function(evt) {
			
			var reader = new FileReader();
			Debugger.log("Before read to file.");
			reader.readAsArrayBuffer(file);
			Debugger.log("After read to file.");
			reader.onload = function() {
				Debugger.log("Starting file send to server.");
				_this.wsocket.send(reader.result);
				Debugger.log("End file send to server.");
			}
		}
		
	}
};
