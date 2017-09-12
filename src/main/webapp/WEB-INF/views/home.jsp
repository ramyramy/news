<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@include file="include/header.jsp"%>
<%@include file="include/left_menu.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>News</title>
 <script type="text/javascript">

 function search() {
	 var word = document.getElementById("search");
     console.log("검색이 되어라 얍!");

     if(word.value==''){
         alert("검색어를 입력해 주세요.");        
     }else{
        location.href='/search?query='+word.value;
        console.log(word.value);
     }
 }
 
 $(function(){
	 
	 document.body.onkeypress = function(event){
 		 if (event.keyCode == '13') {
			 search(); 
		 }	 	 
	  }	 
	    $("#btn").on("click", function(){
	       search();	         
	    })
	 }) 
	 
</script>
</head>
<body>
	<header>
		<div class="wrap1">
			<span class='green_window1'>
			<!-- 	<button type='button' class='btn btn-default'>
					<a href="/user/login">로그인</a>
				</button> 
			-->
			</span>
		</div>
		<div class="wrap">
			<span class='green_window'> 
			<input type='text' id='search' class='input_text' style='color:black' />
			</span>

			<button id="btn" class="btn btn-primary">검색</button>
		</div> 
	</header>


	<nav>
		<div class="wrap">
			<ul class="nav nav-tabs">
				<li><a href="/" class="on">헤드라인</a></li>
			<!-- 	<li><a href="/search">검색</a></li> -->
				<li><a href="/sboard/list">게시판</a></li>
			</ul>
		</div>
	</nav>


	<!-- Main content -->
	<section class="content" id="contents">
		<div class="row">
			<div class="box-body">
				<table class="table table-bordered">
					<tr>
						<th style="width: 50px">제목</th>
						<th style="width: 200px">요약내용</th>
						<th style="width: 50px">원본링크</th>
						<th style="width: 50px">게시날짜</th>
					</tr>

					<c:forEach items="${first_news}" var="news">

						<tr>
							<td><a href='${news.link}'>${news.title}</a></td>
							<td>${news.description}</td>
							<td><a href='${news.originallink}'>${news.originallink}</a></td>
							<td>${news.pubDate }</td>
						</tr>

					</c:forEach>

				</table>
			</div>

		</div>
		<!-- /.row -->
	</section>
	<!-- /.content -->

	<%@include file="include/footer.jsp"%>