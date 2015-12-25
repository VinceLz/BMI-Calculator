package cn.suclub.user.servlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.itcast.servlet.BaseServlet;
import cn.suclub.user.domain.User;
import cn.suclub.user.service.UserService;

public class UserServlet extends BaseServlet {
	private UserService userService=new UserService();
	
		public String ajaxRegist(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			User user=new User();
			user.setUserName(request.getParameter("username"));
			user.setuPassword(request.getParameter("password"));
			SimpleDateFormat data=new SimpleDateFormat("yyyy-MM-dd");
			String data2=data.format(new Date()).toString();
			user.setuTime(data2);
			userService.regist(user);
			response.getWriter().write("true");
			
			return null;
		}
		
		
		//登陆
		public String ajaxlogin(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			String lusername=request.getParameter("lusername");
			String lpassword=request.getParameter("lpassword");
			//进行格式验证
			if(lusername.equals("")||lusername.trim().isEmpty()||lusername.length()<3){
				response.getWriter().write("false");
			}
			if("".equals(lpassword)||lpassword.trim().isEmpty()||lpassword.length()<6){
				response.getWriter().write("false");
			}
			//完成格式验证 ，验证数据
			if(userService.login(lusername, lpassword))
			{
				if(request.getParameter("remember").equalsIgnoreCase("true")){
					Cookie cook=new Cookie("user", lusername+"-"+lpassword);
					cook.setMaxAge(5*365*24*60*60);
					response.addCookie(cook);
				}
				
				response.getWriter().write("true");
			}else{
				response.getWriter().write("false");
			}
			return null;
		}
}
