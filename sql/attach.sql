--------------------------------------------------------
--  파일이 생성됨 - 수요일-9월-06-2017   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table ATTACH
--------------------------------------------------------

  CREATE TABLE ATTACH
   (	"FULLNAME" VARCHAR2(150 BYTE), 
	"BNO" NUMBER, 
	"REGDATE" DATE DEFAULT SYSDATE
   );

--------------------------------------------------------
--  Constraints for Table ATTACH
--------------------------------------------------------

  ALTER TABLE ATTACH MODIFY (FULLNAME NOT NULL ENABLE);
 
  ALTER TABLE ATTACH MODIFY (BNO NOT NULL ENABLE);
 
  ALTER TABLE ATTACH ADD PRIMARY KEY (FULLNAME);
