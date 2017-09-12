<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>News</title>
<link
	href='https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css'
	rel='stylesheet' type='text/css'>
<link href='${pageContext.request.contextPath}/resources/assets/style.css' rel='stylesheet' type='text/css'>
 
  </head>
  <body>
    <div class='main-content' id='main'>
      
      
    </div>
    <!-- div#main -->
    <div class='main-navbar main-navbar-fixed-top' id='main-navbar'>
      <div class='main-navbar-content'>
        <div class='icon left' id='toggle-sidebar'>
   <%--        <img alt='menu' height='24px' src='${pageContext.request.contextPath}/resources/assets/arrow-pointing-to-right.png' width='24px'> --%>
               <img alt='menu' height='24px' src='${pageContext.request.contextPath}/resources/assets/menu32@64.png' width='24px'>
        </div>
      </div>
    </div>
    <!-- div#main-navbar -->
    <div class='main-sidebar main-sidebar-left' id='main-sidebar'>
      <div class='main-sidebar-wrapper'>
        <div class='section1'>
            <ul1>
              <li1 class='close-sb'>
                <h3><a href='?query=정치'>정치</a></h3>
              </li1>
              <li1 class='close-sb'>
                <h3><a href='?query=경제'>경제</a></h3>
              </li1>
              <li1 class='close-sb'>
                <h3><a href='?query=한국'>한국</a></h3>
              </li1>
              <li1 class='close-sb'>
                <h3><a href='?query=건강'>건강</a></h3>
              </li1>
              <li1 class='close-sb'>
                <h3><a href='?query=해외'>해외</a></h3>
              </li1>
         	  <li1 class='close-sb'>
                <h3><a href='?query=과학기술'>과학기술</a></h3>
              </li1>	
              <li1 class='close-sb'>
                <h3><a href='?query=연예'>연예</a></h3>
              </li1>
              <li1 class='close-sb'>
                <h3><a href='?query=스포츠'>스포츠</a></h3>
              </li1>
            </ul1>         
        </div>
      </div>
    </div>
    <!-- div#main-sidebar -->
  <!--   <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js'></script> -->
    <script src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'></script>
    <script src='${pageContext.request.contextPath}/resources/libs/javascript/jquery.simple-sidebar.min.js'></script>
    <script>
      $(document).ready(function() {
      	$('#main-sidebar').simpleSidebar({
      		opener: '#toggle-sidebar',
      		wrapper: '#main',
      		animation: {
      			easing: 'easeOutQuint'
      		},
      		sidebar: {
      			align: 'left',
      			closingLinks: '.close-sb'
      		},
      		sbWrapper: {
      			display: true
      		}
      	})
      })
    </script>
  </body>
</html>
