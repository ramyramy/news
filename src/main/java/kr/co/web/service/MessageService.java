package kr.co.web.service;

import kr.co.web.vo.MessageVO;

public interface MessageService {

	  public void addMessage(MessageVO vo) throws Exception;

	  public MessageVO readMessage(String uid, Integer mno) throws Exception;
	}
