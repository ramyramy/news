package kr.co.web.dao;

import java.util.Date;

import kr.co.web.dto.LoginDTO;
import kr.co.web.vo.UserVO;

public interface UserDAO {

	public UserVO login(LoginDTO dto) throws Exception;

	public void keepLogin(String uid, String sessionId, Date next);

	public UserVO checkUserWithSessionKey(String value);
}