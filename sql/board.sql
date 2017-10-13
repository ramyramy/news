--------------------------------------------------------
--  파일이 생성됨 - 수요일-9월-06-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table BOARD
--------------------------------------------------------
CREATE TABLE BOARD
(	
    "BNO" NUMBER, 
	"TITLE" VARCHAR2(200 BYTE), 
	"CONTENT" CLOB, 
	"WRITER" VARCHAR2(255 BYTE), 
	"REGDATE" DATE, 
	"VIEWCNT" NUMBER DEFAULT 0, 
	"REPLYCNT" NUMBER DEFAULT 0, 
	"LINK1" VARCHAR2(200 BYTE), 
	"LINK2" VARCHAR2(200 BYTE)
   );
   
  ALTER TABLE BOARD MODIFY (TITLE NOT NULL ENABLE);
 
  ALTER TABLE BOARD MODIFY (WRITER NOT NULL ENABLE);
 
  ALTER TABLE BOARD ADD PRIMARY KEY (BNO);
   
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (69,'쓰촨성 지진 빠져나온 한국 관광객 ','다음',to_date('17/08/10','RR/MM/DD'),6,1,'http://v.media.daum.net/v/20170810140304952?rcmd=rn',null);
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (71,'박능후 복지장관 "그간 정부가 돌보지 않은 사람들 돌보겠다"','연합뉴스',to_date('17/08/10','RR/MM/DD'),0,0,'http://v.media.daum.net/v/20170810151426006',null);
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (73,'[사실은] ''택시운전사'' 장면 중..시민 조준 사격의 진실은?','sbs',to_date('17/08/10','RR/MM/DD'),0,0,'http://v.media.daum.net/v/20170809212504025',null);
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (75,'北, 이틀째 괌 기지 미사일 사격 위협하는 노림수는','한국일보',to_date('17/08/10','RR/MM/DD'),0,0,'http://v.media.daum.net/v/20170810165008743',null);
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (70,'[날씨] 우산 꼭 챙겨나가세요..내륙 지역 요란한 소나기','sbs',to_date('17/08/10','RR/MM/DD'),1,0,'http://v.media.daum.net/v/20170810081503127',null);
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (72,'삼성-애플-LG ''듀얼카메라폰'' 격돌 예고..차이점은?','뉴스1',to_date('17/08/10','RR/MM/DD'),1,0,'http://v.media.daum.net/v/20170810153742035',null);
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (74,'''부분 절대평가'' 유력..국어·수학 상대평가로 남을듯','머니투데이',to_date('17/08/10','RR/MM/DD'),1,0,'http://v.media.daum.net/v/20170810155951793',null);
Insert into SCOTT.BOARD (BNO,TITLE,WRITER,REGDATE,VIEWCNT,REPLYCNT,LINK1,LINK2) values (84,'[메이크업 트렌드] 여름 취향저격 과즙메이크업 - 레드벨벳 ‘빨간맛’','아이린짱팬',to_date('17/08/11','RR/MM/DD'),2,0,'naver.com',null);
