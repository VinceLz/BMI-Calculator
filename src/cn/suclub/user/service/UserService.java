package cn.suclub.user.service;

import java.sql.SQLException;

import cn.suclub.user.dao.UserDao;
import cn.suclub.user.domain.User;

public class UserService {
			private UserDao userdao=new UserDao();
			
			
	//注册		
	public void regist(User user)
	{
		
		try {
			userdao.regist(user);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		
	}
	//登陆
	public boolean login(String username,String password)
	{
		
		try {
			return userdao.login(username, password);
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		
	}
}
