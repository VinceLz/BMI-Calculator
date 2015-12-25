package cn.suclub.user.dao;

import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import cn.itcast.jdbc.TxQueryRunner;
import cn.suclub.user.domain.User;

public class UserDao {
	
	private QueryRunner qr=new TxQueryRunner();
	
	public void regist(User user) throws SQLException
	{
		String sql="insert into user(userName,uPassword,uTime) values(?,?,?)";
		Object [] param={user.getUserName(),user.getuPassword(),user.getuTime()};
		qr.update(sql, param);
	}
	
	public boolean login(String username,String password) throws SQLException{
		String sql="select * from user where userName=? and uPassword=?";
		User user=qr.query(sql, new BeanHandler<User>(User.class),username,password);
		if(user==null){
			return false;
		}
		return true;
	}
}
