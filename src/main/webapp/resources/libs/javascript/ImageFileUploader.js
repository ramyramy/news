function ImageFileUploader(fileUploadUrl, temptImageViewUrl) {
	
	this.imageFileExtArr = new Array('jpg', 'jpeg', 'bmp', 'png', 'gif', 'tiff');
	this.fileSizeLimit = 1024 * 1024 * 100; // 100MB
	this.temptImageViewUrl = temptImageViewUrl;
	this.fileUploadUrl = fileUploadUrl;	// 파일 업로드 웹소켓 url
	this.wsocket = null;
	
	this.origFileName = null;	// 첨부 파일
	
	this.targetImageViewEl = null;	// 업로드된 이미지를 표시할 img 태크
	this.targetImageNameEl = null;	// 사용자가 첨부할 파일명을 담을 input 태그
	this.targetImageTempNameEl = null; // 업로드된 이미지 파일명을 담을 input 태그
	
	this.setImageFileExtArr = function(arr) {
		this.imageFileExtArr = arr;
	}
	
	this.setFileSizeLimit = function(limit) {
		this.fileSizeLimit = limit;
	}
	
	this.setTempImageViewSrc = function(src) {
		this.temptImageViewSrc = src;
	}
	
	this.setFileUploadUrl = function(url) {
		this.fileUploadUrl = url;
	}
	
	this.wsConnect = function() {
		this.wsocket = new WebSocket(this.fileUploadUrl);
		Debugger.log("wsocket : " + this.wsocket);
		Debugger.log("origFileName : " + this.origFileName);
		
		var _this = this;
		this.wsocket.onmessage = function(evt) {
			Debugger.log("Recieved message from websocket server.");
			
			var data = evt.data;
			Debugger.log("data : " + data);
			Debugger.log("origFileName : " + _this.origFileName);
			Debugger.log("wsocket : " + _this.wsocket);
			
			jQuery(_this.targetImageViewEl).attr('src', _this.temptImageViewUrl + data);
			jQuery(_this.targetImageNameEl).val(_this.origFileName);
			jQuery(_this.targetImageTempNameEl).val(data);
			
			_this.wsocket.close();
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
		}
		
	}
	
	
	this.upload = function(fileEl, targetImageViewEl, targetImageNameEl,  targetImageTempNameEl) {
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
		
		var allowedFile = false;
		for (var i = 0; i < this.imageFileExtArr.length; i++) {
			if (fileExt == this.imageFileExtArr[i]) {
				allowedFile = true;
				break;
			}
		}
		
		if (! allowedFile) {
			alert("File is not image file.");
			return;
		}
		
		if (file.size > this.fileSizeLimit) {
			alert("Please select file size under 10MB.");
			return;
		}
		
		this.origFileName = file.name;
		this.targetImageViewEl = targetImageViewEl;
		this.targetImageNameEl = targetImageNameEl;
		this.targetImageTempNameEl = targetImageTempNameEl;
		
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
