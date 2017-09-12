


/**
 * jQuery 를 기반으로 하는 유틸입니다.
 * jQuery 와 jQuert-ui 라이브러리가 지정되어 있어야 사용 가능합니다.
 */
var jQueryUtil = {
		
	/**
	 * jquery-ui를 이용한 알림창을 띄웁니다.
	 * 메시지는 값은 필수 입력 되어야 하며, 나머지 파라미터는 미입력 시 기본 값으로 설정 됩니다. 
	 * 
	 * 메서드 실행 시 body 태그의 첫번째 자식 엘리먼트로 id=dialog-alert 태그가 생성 됩니다.
	 * id가 dialog-alert 인 엘리먼트가 이미 존재할 경우 생성하지 않습니다.
	 * 
	 * @param pMessage - 표시할 메시지 입니다. 필수로 입력 되어야 합니다.
	 * @param pTitle - 알림창 상단에 표시되는 제목입니다. 기본값 - '알림'
	 * @param pWidth - 알림창의 너비 값입니다. 기본값 - 300
	 * @param pHeight - 알림창의 높이 값입니다. 기본값 - auto
	 */
	jAlert : function(pMessage, pTitle, pWidth, pHeight) {
		if (pMessage == null || pMessage == "") pMessage ="";
		if (pWidth == null || pWidth == "") pWidth = "300";
		if (pHeight == null || pHeight == "") pHeight = "auto";
		if (pTitle == null || pTitle == "") pTitle ="알림";
		
		if ($('#dialog-alert').size() < 1) 
			$('body').prepend("<div id='dialog-alert' title=''></div>");
		
		
		$('#dialog-alert').dialog({
			modal: true,
			title: pTitle,
			width: pWidth,
			height: pHeight,
			buttons: {
				Ok: function() {
					$(this).dialog( "close" );
				}
			}
		})
		.html('<p>' + pMessage + '</p>')
		.dialog('open');
	}
	
	,
	
	/**
	 * submit 등으로 해당 페이지에서의 처리가 완료되고,
	 * 다른 페이지로 이동 시에 진행 모달 창을 표시.
	 * 
	 * 주의) 페이지 이동 중 오류 발생으로 페이지가 이동 되지 않을 경우, 모달 상태가 계속 진행 되므로
	 * 사용 시 주의를 요한다.
	 */
	progressModal : function() {
		/*
		if ($('#dialog-progress').size() < 1) 
			$('body').prepend("<div id='dialog-progress' title='' ></div>");
		
		$('#dialog-progress').css('background-image', 'url("http://local.dev.ne.kr/libs/css/redmond/images/wait.gif")').css('opacity','0.1');
		
		$('#dialog-progress').dialog({
			modal: true,
			title: '알림2',
			width: "200",
			height: "200",
			closeOnEscape: false,
			position: 'center'
		})
		.append('<img src="/libs/css/redmond/images/wait.gif" />')
		.dialog('open');
		 */
		
		if ($('#progressMask').size() < 1) {
			$('body').prepend("<div id='progressMask' title='' ><p><img id='progressImg' /><p></div>");
		}
	
		var maskWidth = $(document).width();
		var maskHeight = $(document).height();
		
		$('#progressMask')
			.css({'position':'absolute'
			,'left':0
			,'top':0
			,'z-index':9000
			,'background-color':'#aaa'
			,'width':maskWidth
			,'height':maskHeight
			,'opacity':0.4
			,'display':'block'});	  
		
		$('#progressImg')
			.css({
				'background-color':'#fff'
				,'opacity':1.0
				,'margin-top': (maskHeight /2 - 50)
				,'margin-left': (maskWidth /2 - 50)
			});
		
		if ( $('#progressImg').attr() == null || $('#progressImg').attr() == '') {
			$('#progressImg')
			.attr('src', '/libs/css/redmond/images/wait.gif');
		}
			
	}
}

