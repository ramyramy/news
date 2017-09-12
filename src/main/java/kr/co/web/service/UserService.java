package kr.co.web.service;

import java.util.Date;

import kr.co.web.dto.LoginDTO;
import kr.co.web.vo.UserVO;

public interface UserService {

	  public UserVO login(LoginDTO dto) throws Exception;

	  public void keepLogin(String uid, String sessionId, Date next)throws Exception;
	  
	  public UserVO checkLoginBefore(String value);  
	}
