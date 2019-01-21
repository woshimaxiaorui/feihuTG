window.onload = function(){

	var url = window.location.href;
	var flag_login = url.indexOf("uname");
	var index_num = url.indexOf("=");
	if(flag_login != -1){
		var utxt = url.substr(index_num + 1,url.length);
		
		var str = utxt+"您好，欢迎访问飞虎 <a href='login.html'>退出</a>";
		$("#login_show").html(str);
		$('a[href|="index.html"]').attr("href","index.html?uname="+utxt);
	}
	
	
	
	$("#myAccount").hover(function(){
		console.log($("#myAccount_list"));
		$("#myAccount_list").css("display","block").addClass("account");
		$(this).addClass("account");
	},function(){
		$("#myAccount_list").css("display","none");
		$(this).removeClass("account");
	})
	$("#myAccount_list").on("mouseenter","li",function(){
		$("#myAccount_list").css("display","block").addClass("account");
		$("#myAccount").addClass("account");
	})
	$("#myAccount_list").on("mouseleave","li",function(){
		$("#myAccount_list").css("display","none");
		$("#myAccount").removeClass("account");
	})
	$("#map").hover(function(){
		// console.log($("#myAccount_list"));
		$("#map_list").css("display","block").addClass("account");
		$(this).addClass("account");
	},function(){
		$("#map_list").css("display","none");
		$(this).removeClass("account");
	})
	$("#map_list").on("mouseenter","li",function(){
		$("#map_list").css("display","block").addClass("account");
		$("#map").addClass("account");
	})
	$("#map_list").on("mouseleave","li",function(){
		$("#map_list").css("display","none");
		$("#map").removeClass("account");
	})
	
	// banner 左侧菜单数据
	var menu_left_str = "";
	$.ajax({
		type:"get",
		url:"data/type.json?time="+new Date().getTime(),
		datatype:"json",
		success:function(res){
			if(res){
				$.each(res,function(key){
					menu_left_str += "<li><span class='iconfont'>"+ key +"</span><a href='goods_list.html'>"+ res[key] +"</a></li>";
				})
				$(".menu_left").find("ul").html(menu_left_str);
			}else{
				console.log("没有数据！");
			}
			
			
		}
	})
	
	// 请求banner 大轮播图数据
	var setlist = null;
	$.ajax({
		type:"get",
		url:"data/banner.json?time="+new Date().getTime(),
		datatype:"json",
		success:function(res){
			if(res){
				var str = "";
				var str2="";
				var offNum = 350;
				$.each(res,function(i){
					if(i == "0"){
						str+="<li class='showbanner' style='background: url(images/banner/"+res[i]["img"]+") center 0px;'></li>";
						str2+="<li class='showbannerbtn showbtn' style='left:"+ (i*45+offNum) +"px;'></li>";
					}else{
						str+="<li class='showbanner' style='background: url(images/banner/"+res[i]["img"]+") center 0px;'></li>";
						str2+="<li class='showbannerbtn' style='left:"+ (i*45+offNum) +"px;'></li>";
					}
				})
				$(".banner_content").find("ul").html(str);
				$(".banner_content").find("ol").html(str2);
				bannerShow(res);
				setlist = res;
			}
		}
	})
	var bannerShowTimer = null;
	function bannerShow(res){
		var index = 0;
		bannerShowTimer = setInterval(function(){
			if(index == res.length){
				index = 0;
			}
			changeShow(index);
			index++;
		},3000)
	}
	
	$("#banner_content ol").on("mouseover","li",function(){
			clearInterval(bannerShowTimer);
			var $i = $(this).index();
			changeShow($i);
	}).on("mouseout","li",function(){
			
		var index = $(this).index();
		bannerShowTimer = setInterval(function(){
			if(index == setlist.length){
				index = 0;
			}
			changeShow(index);
			index++;
		},3000)
	})
	function changeShow(index){
		var $uLi = $(".banner_content ul").find("li");
		var $oLi = $(".banner_content ol").find("li");
		$uLi.eq(index-1).fadeIn(800).siblings().fadeOut(800);
		$oLi.eq(index).addClass("showbtn").siblings().removeClass("showbtn");												
	}
	
	//内容区
	$(".contentleftp").hover(function(){
		
		$(this).animate({"opacity":0.8},100);
	},function(){
		
		$(this).animate({"opacity":1},100);
	})
	$(".contentbottomp").hover(function(){
		$(this).animate({"opacity":0.7},100);
	},function(){
		$(this).animate({"opacity":1},100);
	})
	//标题
	$.ajax({
		type:"get",
		url:"data/content_title.json?time="+new Date().getTime(),
		datatype:"json",
		success:function(res){
			var $divArea = $(".goods_area");
			$.each(res,function(i){
				
				var $divType = $("<div class='goods_type'>");
				$divArea.append($divType);
				
				var $divTitle = $("<div class='title' id='goods_title'>");
				$divType.append($divTitle);
				var url ="url(images/goodsarea/"+ res[i]["titleImg"] +")";
				$divTitle.css("background",url);
				
				var $p = $("<p>");
				$divTitle.append($p);
				
				for( key of res[i]["title"]){
					var $a = $("<a>"+ key +"</a>");
					$p.append($a);
				}
				var $a1 = $("<a>更多>></a>");
				$p.append($a1);
				
			})
			contentLeft()//加载左侧数据
		}
	})
	
	//左侧
	function contentLeft(){
		$.ajax({
			type:"get",
			url:"data/content_left.json?time="+new Date().getTime(),
			datatype:"json",
			success:function(res){
				
				$.each(res,function(i){
					var $divLeft = $("<div class='left' >");
					$(".goods_type").eq(i).append($divLeft);
					var $p = $("<p></p>");
					$divLeft.append($p);
					var str = "<img src='images/goodsarea/"+res[i]['left'][0]+"' class='contentleftp'>";
					$p.html(str);
					var $p1 = $("<p></p>");
					$divLeft.append($p1);
					var str1 = "<img src='images/goodsarea/"+res[i]['left'][1]+"' class='contentleftp'>";
						str1+= "<img src='images/goodsarea/"+res[i]['left'][2]+"' class='contentleftp'>";
					$p1.html(str1);
				})
				contentRight();//加载右侧数据
			}
		})	
	}
	
	//右侧
	function contentRight(){
		$.ajax({
			type : "get",
			url : "data/content_right.json?time="+new Date().getTime(),
			datatype : "json",
			success : function(res){
				
				$.each(res,function(i){
					var divRight = $("<div class='right'>");
					$(".goods_type").eq(i).append(divRight);
					var str = "";
					for(key of res[i]["right"]){
						str+=`<div class="li_good">
								<img src="images/goodsarea/${key}" class="contentleftp">
								<a >赛嘉 segao 智能声波</a>
								<span>$99</span>
							</div>`;
					}
					divRight.html(str);
				})
				contentBottom();//加载底部数据
			}
		})
	}
	
	//底部图片
	function contentBottom(){
		$.ajax({
			type : "get",
			url : "data/content_bottom.json?time="+new Date().getTime(),
			datatype : "json",
			success : function(res){
				
				$.each(res,function(i){
					var divBottom = $("<div class='bottom'>");
					$(".goods_type").eq(i).append(divBottom);
					var str = "";
					for(key of res[i]["bottom"]){
						str+="<a href=''><img src='images/goodsarea/"+ key +"' class='contentbottomp'></a>";
					}
					divBottom.html(str);
				})
				
			}
		})
	}
	
	//内容结束
	
	//底部
	$(".foot_bg").on("mouseover","dd",function(){
		$(this).css("color","red");
	}).on("mouseout","dd",function(){
		$(this).css("color","#ccc");
	})
}