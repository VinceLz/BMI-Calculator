<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="mobile-web-app-capable" content="yes"/>
    <meta name="apple-touch-fullscreen" content="yes"/>
    <meta name="apple-mobile-web-app-title" content="BMI测试">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="browsermode" content="application">
    <meta name="x5-page-mode" content="app">
    <link rel="shortcut icon" href="imgs/icon/active_love_144X114.png">
    <title>BMI测试</title>
    <link rel="apple-touch-icon" href="imgs/icon/active_love_144X114.png">
    <link rel="bookmark" href="imgs/icon/active_love_144X114.png">
    <link rel="stylesheet" href="style/font-awesome.min.css">
    <link rel="stylesheet" href="style/reset.css">
    <link rel="stylesheet" href="style/main.css">
    <script src="script/jquery-2.1.4.min.js"></script>
    <script src="script/velocity.min.js"></script>
    <script src="script/velocity.ui.min.js"></script>
    <script src="script/main.js"></script>
    <script src="script/countUp.min.js"></script>
    <script src="script/jquery.validate.min.js"></script>
    <!--<script src="script/messages_zh.js"></script>-->
    <script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cspan id='cnzz_stat_icon_1256445810'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1256445810' type='text/javascript'%3E%3C/script%3E"));</script>
	<script>
		$(function(){
		
			$("#regist").click(function(){
				
				var username=$("#accout").val();
				var password=$("#password").val();
				
		$.ajax({
		url:"/BMI-Calculator/UserServlet",
		data:{method:"ajaxRegist",username:username,password:password},
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(result){
			if(result){
					alert("注册成功");
			}else{
			alert("注册失败");
			}
				
		}
	});
			
			});
		//登陆
		$("#login").click(function(){
				
				var lusername=$("#login_username").val();
				var lpassword=$("#login_password").val();
				var cook=$("#check-box").is(':checked');
				
			$.ajax({
			url:"/BMI-Calculator/UserServlet",
		data:{method:"ajaxlogin",lusername:lusername,lpassword:lpassword,remember:cook},
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(result){
		if(result){
			//需要跳转到主页 待定1！
					alert("登陆成功");
			}else{
			alert("登陆失败,请检查您的账号/密码。欢迎注册");
			}
				
			
				
		}
			
			
			
			
			});
		
		});	
		
		
		
		});
	
	
	</script>

</head>
<body>
<div class="overlay_region">
    <div class="login_region">
        <i class="fa fa-times"></i>
        <div class="login_container">
            <h2>Log in</h2>
            <% Cookie []cook=request.getCookies();
            		String username="";
            		String password="";
 	           			for(int i=0;i<cook.length;i++)
 	           			{
 	           				Cookie c=cook[i];
 	           				if(c!=null)
 	           				{
 	           					
 	           					if(c.getName().equals("user"))
 	           					{
 	           						String value=c.getValue();
 	           						String []arr=value.split("-");
 	           						username=arr[0];
 	           						password=arr[1];
 	           					}
 	           				}
 	           			}
            %>
            <form action="#" id="login_form" method="post">
                <input type="text" class="login_text_input" value="<%=username %>"  placeholder="Account" id="login_username" name="account">
                <input type="password" class="login_password_input" value="<%=password %>" placeholder="Password" id="login_password" name="password">
                <span id="login-error-info"></span>
                <span class="quick-switch">Don't have an account? Click here to sign up.</span>
                <label class="remember_me_label" for="check-box">
                    <input type="checkbox" checked="checked" value="cook" id="check-box">
                    <span class="remember-me-form-control">
                        <i class="fa fa-check check-active"></i>
                    </span>
                    Remember me
                </label>
                <div class="rest_password">
                    <a href="#">Rest Password</a>
                </div>
                <p class="submit-button">
                    <button type="submit" class="login-btn submit-btn submit" id="login" value="Log In">Log In</button>
                </p>
            </form>
        </div>
    </div>
    <div class="signup_region">
        <i class="fa fa-times"></i>
        <div class="signup_container">
            <h2>Sign up</h2>
            <form action="#" id="signup_form" method="post">
                <input type="text" class="signup_text_input"  id="accout" placeholder="New Name" name="account">
               
                <input type="password" class="signup_password_input" placeholder="Password" id="password" name="password">
                <span id="signup-error-info"></span>
                <span class="quick-switch">Already have an account? Click here to log in.</span>
                <p class="submit-button">
                    <button type="submit" id="regist" class="signup-btn submit-btn" value="Sign Up Free">Sign Up</button>
                </p>
            </form>
        </div>
    </div>
</div>
<div class="header">
    <div class="title">
        <div class="header_banner">
            <h1 class="suc_logo fl">LogIn</h1>
        </div>
        <a href="#" class="menu">
            <i class="fa fa-bars"></i>
        </a>
    </div>
    <nav class="header_content">
        <a href="#">About</a>
        <a href="#">FQA</a>
    </nav>
</div>
<div class="buddy">
    <div class="content com-width">
        <ul class="info_content">
            <li class="age_info">
                <h3>年龄</h3>
                <input type="number" name="age" step='1' min="1" max="100">
            <span>
                <i class="fa fa-female"></i>
                <i class="line">|</i>
                <i class="fa fa-male"></i>
            </span>
            </li>
            <li class="height_info">
                <h3>身高</h3>
                <input type="number" name="height" min="1" max="250">
                <span>CM</span>
            </li>
            <li class="weight_info">
                <h3>体重</h3>
                <input type="number" name="weight" min="1" max="200">
                <span>KG</span>
            </li>
        </ul>
        <div class="hr_25px"></div>
        <div class="result_content">
            <div class="top_result">
                <h3>结果</h3>
                <span id="resultText">0.0</span>
                <i class="fa fa-venus-mars"></i>
            </div>
            <div class="bottom_result">
                <i class="fa fa-caret-down"></i>
            </div>
        </div>
        <div class="hr_25px"></div>
        <ul class="range_info">
            <li class="li_1">
                <h3>体重不足</h3>
                <span>&lt; 0</span>
            </li>
            <li class="li_2">
                <h3>体重正常</h3>
                <span>0 - 0</span>
            </li>
            <li class="li_3">
                <h3>超重</h3>
                <span>0 - 0</span>
            </li>
            <li class="li_4">
                <h3>肥胖</h3>
                <span>0 - 0</span>
            </li>
            <li class="li_5">
                <h3>病态肥胖</h3>
                <span>&gt; 0</span>
            </li>
            <li>
                <div class="ideal_weight">
                    <h3>理想体重（kg）</h3>
                    <span>0 - 0</span>
                </div>
            </li>
        </ul>
    </div>
    <div class="footer">
        <div class="copyright">
            <h2>A Pilot Program by <span class="suc_logo_footer">Suclub</span></h2>
        </div>
        <div class="social-links">
            <a href="#">
                <i class="fa fa-wechat"></i>
            </a>
            <a class="margin_left_20px " href="https://github.com/lewis-geek/BMI-Calculator" target="_blank">
                <i class="fa fa-github"></i>
            </a>
            <a class="margin_left_20px " href="http://m.weibo.cn/u/2702499024" target="_blank">
                <i class="fa fa-weibo"></i>
            </a>
        </div>
    </div>
</div>
</body>
</html>
