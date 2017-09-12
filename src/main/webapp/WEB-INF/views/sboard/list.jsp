<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page session="false"%>
<%@include file="../include/header.jsp"%>
<%@include file="../include/left_menu.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>News</title>
<header>
		<div class="wrap1">
			<span class='green_window1'>
				<button type='button' class='btn btn-default'>
					<a href="/">메인</a>
				</button>
			</span>
		</div>
	</header> 
<!-- Main content -->
<section class="content">
	<div class="row">
		<!-- left column -->


		<div>
			<!-- general form elements -->
			<div class='box'>
				<div class="box-header with-border">
					<h3 class="box-title">뉴스 게시판</h3>
				</div>

				<!-- 	<div class='box-body'>  <div class="container">-->

				<div class="container">		
				<span class='green_window2'>		
					<select class="form-control" name="searchType">
						
						<option value="n"
							<c:out value="${cri.searchType == null?'selected':''}"/>>
							선택</option>
						<option value="t"
							<c:out value="${cri.searchType eq 't'?'selected':''}"/>>
							Title</option>
						<option value="c"
							<c:out value="${cri.searchType eq 'c'?'selected':''}"/>>
							Content</option>
						<option value="w"
							<c:out value="${cri.searchType eq 'w'?'selected':''}"/>>
							Writer</option> 
					
						<div class='box-body'>	
						
							 <input type='text'	class='input_text' name='keyword' id="keywordInput"	value='${cri.keyword }'>
						
						
						<%-- <input type="text" name='keyword' id="keywordInput"
						value='${cri.keyword }'> --%>
					 
						<button class="btn btn-primary" id='searchBtn'>조회</button>
						<button class="btn btn-primary" id='newBtn'>등록</button>
						</span>	
	</div>	
				</div>


				<div class="box">
					<div class="box-header with-border">
						<h3 class="box-title"></h3>
					</div>
					<div class="box-body">
						<table class="table table-bordered">
							<tr>
								<th style="width: 80px">번호</th>
								<th style="width: 150px">제목</th>
								<th style="width: 150px">글쓴이</th>
								<th style="width: 100px">등록일</th>
								<th style="width: 80px">조회수</th>
							</tr>

							<c:forEach items="${list}" var="boardVO">

								<tr>
									<td>${boardVO.bno}</td>
									<td><a
										href='/sboard/readPage${pageMaker.makeSearch(pageMaker.cri.page) }&bno=${boardVO.bno}'>
											${boardVO.title} <strong>[ ${boardVO.replycnt} ]</strong>
									</a></td>
									<td>${boardVO.writer}</td>
									<%-- <td><fmt:formatDate pattern="yyyy-MM-dd HH:mm" --%>
									<td><fmt:formatDate pattern="yyyy-MM-dd"
											value="${boardVO.regdate}" /></td>
									<td><span class="badge bg-red">${boardVO.viewcnt }</span></td>
								</tr>

							</c:forEach>

						</table>
					</div>
				  
					<div class="box-footer">

						<div class="text-center">
							<ul class="pagination">

								<c:if test="${pageMaker.prev}">
									<li><a
										href="list${pageMaker.makeSearch(pageMaker.startPage - 1) }">&laquo;</a></li>
								</c:if>

								<c:forEach begin="${pageMaker.startPage }"
									end="${pageMaker.endPage }" var="idx">
									<li
										<c:out value="${pageMaker.cri.page == idx?'class =active':''}"/>>
										<a href="list${pageMaker.makeSearch(idx)}">${idx}</a>
									</li>
								</c:forEach>

								<c:if test="${pageMaker.next && pageMaker.endPage > 0}">
									<li><a
										href="list${pageMaker.makeSearch(pageMaker.endPage +1) }">&raquo;</a></li>
								</c:if>

							</ul>
						</div>

					</div>
				 
				</div>
			</div>
			 

		</div>
		 
</section>
 


<script>
	var result = '${msg}';

	if (result == 'SUCCESS') {
		alert("처리가 완료되었습니다.");
		location.replace(self.location);
	}
</script>

<script>
	$(document).ready(
			function() {

				$('#searchBtn').on(
						"click",
						function(event) {

							self.location = "list"
									+ '${pageMaker.makeQuery(1)}'
									+ "&searchType="
									+ $("select option:selected").val()
									+ "&keyword=" + $('#keywordInput').val();

						});

				$('#newBtn').on("click", function(evt) {

					self.location = "register";

				});

			});
</script>
<%@include file="../include/footer.jsp"%>