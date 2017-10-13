--------------------------------------------------------
--  파일이 생성됨 - 수요일-9월-06-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table REPLY
--------------------------------------------------------

CREATE TABLE REPLY
   (	"RNO" NUMBER, 
	"BNO" NUMBER, 
	"REPLYTEXT" VARCHAR2(200 BYTE), 
	"REPLYER" VARCHAR2(200 BYTE), 
	"REGDATE" DATE, 
	"UPDATEDATE" DATE
   );
   
  ALTER TABLE REPLY MODIFY (REPLYTEXT NOT NULL ENABLE);
 
  ALTER TABLE REPLY MODIFY (REPLYER NOT NULL ENABLE);
 
  ALTER TABLE REPLY ADD PRIMARY KEY (RNO);
   
   
Insert into SCOTT.REPLY (RNO,BNO,REPLYTEXT,REPLYER,REGDATE,UPDATEDATE) values (46,67,'거부할거야','거부거부',to_date('17/08/10','RR/MM/DD'),null);
Insert into SCOTT.REPLY (RNO,BNO,REPLYTEXT,REPLYER,REGDATE,UPDATEDATE) values (47,67,'정말인고야?','정말?',to_date('17/08/10','RR/MM/DD'),null);
Insert into SCOTT.REPLY (RNO,BNO,REPLYTEXT,REPLYER,REGDATE,UPDATEDATE) values (45,65,'그르게...어떻게 되려나','걱정인형',to_date('17/08/10','RR/MM/DD'),null);
Insert into SCOTT.REPLY (RNO,BNO,REPLYTEXT,REPLYER,REGDATE,UPDATEDATE) values (50,69,'다행이네요!!!','작성자',to_date('17/08/31','RR/MM/DD'),to_date('17/08/31','RR/MM/DD'));
