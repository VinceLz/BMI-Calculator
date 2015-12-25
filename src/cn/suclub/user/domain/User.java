package cn.suclub.user.domain;

import java.util.Date;

public class User {
		private int uId;  //主键
		private String userName;//用户名
		private String uPassword;//密码
		private String uTime; //注册日期
		public int getuId() {
			return uId;
		}
		public void setuId(int uId) {
			this.uId = uId;
		}
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public String getuPassword() {
			return uPassword;
		}
		public void setuPassword(String uPassword) {
			this.uPassword = uPassword;
		}
		public String getuTime() {
			return uTime;
		}
		public void setuTime(String uTime) {
			this.uTime = uTime;
		}
		@Override
		public String toString() {
			return "User [uId=" + uId + ", userName=" + userName
					+ ", uPassword=" + uPassword + ", uTime=" + uTime + "]";
		}
	
}
