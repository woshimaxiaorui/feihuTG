window.onload = function(){
	
	//根据参数显示注册或者登陆
	var url = window.location.href;
	var flag_register = url.indexOf("flag");
	if(flag_register != -1){
		$("#register_div").addClass("show").siblings().removeClass("show");
		$(".yzm span").html(getYz()).css({"color":getRandColor()});
		
	}else{
		$("#login_div").addClass("show").siblings().removeClass("show");
	}
	
	
	// 注册验证
	// register_uname register_upass register_upass2 register_uemail register_yz 
	var flagRegisterUname = null;
	$("#register_uname").blur(function(){
		var txt = $(this).val();
		//用户名正则，4到16位（字母，数字，下划线，减号）
		var reg = /^[a-zA-Z0-9_-]{4,16}$/;
		if(reg.test(txt)){
			flagRegisterUname = true;
			$("#s1").html("Ok").css("color","green");
		}else{
			flagRegisterUname = false;
			$("#s1").html("格式：4到16位（字母，数字，下划线，减号）").css("color","red");
		}
	})
	
	var flagRegisterUpass = null;
	$("#register_upass").blur(function(){
		var txt = $(this).val();
		////密码正则，6到18位
		var reg = /^.{6,18}$/;
		if(reg.test(txt)){
			flagRegisterUpass = true;
			$("#s2").html("Ok").css("color","green");
		}else{
			flagRegisterUpass = false;
			$("#s2").html("格式：6到18位字符").css("color","red");
		}
	})
	
	var flagRegisterUpass2 = null;
	$("#register_upass2").blur(function(){
		var txt = $(this).val();
		////密码强度正则，6到18位
		var txt2 = $("#register_upass").val();
		if(txt == txt2 && txt2 != ""){
			flagRegisterUpass2 = true;
			$("#s3").html("Ok").css("color","green");
		}else{
			flagRegisterUpass2 = false;
			$("#s3").html("格式：两次输入的密码不一致").css("color","red");
		}
	})
	var flagRegisterUemail = null;
	$("#register_uemail").blur(function(){
		var txt = $(this).val();
		////邮箱格式正则
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if(reg.test(txt)){
			flagRegisterUemail = true;
			$("#s4").html("Ok").css("color","green");
		}else{
			flagRegisterUemail = false;
			$("#s4").html("邮箱格式不正确").css("color","red");
		}
	})
	
	var flagRegisterYz = null;
	$("#register_yz").blur(function(){
		// console.log(getYz())
		var txt = $(this).val();
		//验证码是否匹配
		var txt2 = $(".yzm span").html();
		if(txt2 == txt){
			flagRegisterYz = true;
			$("#s5").html("Ok").css("color","green");
		}else{
			flagRegisterYz = false;
			$("#s5").html("验证码不正确").css("color","red");
		}
	})
	
	$(".yzm a").click(function(){
		$(".yzm span").html(getYz()).css({"color":getRandColor()});
	})
	
	function getYz(){
		var txt = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
 'j', 'k','l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var str = "";
		for(var i=0;i<6;i++){
			str += txt[getRandNum(0,txt.length-1)];
		}
		return str;
	}
	
	
	
	// 注册，存入cookie
	$("#register_btn").click(function(){
		if( flagRegisterUname && flagRegisterUpass &&flagRegisterUpass2&&flagRegisterUemail && flagRegisterYz){
			var uname = $("#register_uname").val();
			var upass = $("#register_upass").val();
			// console.log(uname,upass)
			setCookieUtil(uname, upass);
			location.href = "login.html";
		}
	})
	
	// 登录部分
	// 验证登录信息
	var flagLuname = false;
	$("#login_uname").blur(function(){
		var txt = $(this).val();
		//用户名正则，4到16位（字母，数字，下划线，减号）
		var reg = /^[a-zA-Z0-9_-]{4,16}$/;
		if(reg.test(txt)){
			$("#login_s1").html("OK").css("color","green");
			flagLuname = true;
		}else{
			$("#login_s1").html("必填").css("color","red");
			flagLuname = false;
		}
	})
	var flagLupass = false;
	$("#login_upass").blur(function(){
		var txt = $(this).val();
		//用户名正则，4到16位（字母，数字，下划线，减号）
		var reg = /^.{6,18}$/;;
		if(reg.test(txt)){
			$("#login_s2").html("OK").css("color","green");
			flagLupass = true;
		}else{
			$("#login_s2").html("必填").css("color","red");
			flagLupass = false;
		}
	})
	
	$("#submit_login").click(function(){
		if(flagLupass && flagLuname){
			var uname = $("#login_uname").val();
			var upass = $("#login_upass").val();
			if(getCookieUtil(uname) == upass){
				location.href = "index.html?uname="+uname;
			}
		}
	})
	
}