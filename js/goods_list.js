window,onload = function(){
	
	var url = window.location.href;
	var flag_login = url.indexOf("uname");
	var index_num = url.indexOf("=");
	var utxt = "";
	if(flag_login != -1){
		utxt = url.substr(index_num + 1,url.length);
		
		var str = utxt+"您好，欢迎访问飞虎 <a href='login.html'>退出</a>";
		$("#login_show").html(str);
		
		$('a[href|="index.html"]').attr("href","index.html?uname="+utxt);
		$('a[href|="goods_list.html"]').attr("href","goods_list.html?uname="+utxt);
		$('a[href|="settlement.html"]').attr("href","settlement.html?uname="+utxt);
		$('a[uname]').attr("uname",utxt);
		console.log($('a[uname]'));
	}
	
	
	change_type_list_ul_show();
	function change_type_list_ul_show(){
		$(".type_list_ul_show").prev().css("color","red")
							   .find("span").css("background","url(images/goods_list/minus_img.png)")
							   .prop("show",true);
	}
	
	// 初始化购物车中的商品数量
	initCartGoodsNum();
	function initCartGoodsNum(){
		var str = getCookieUtil("GoodsList");
		if(str == ""){
			return;
		}
		var json = JSON.parse(str);
		
		var arr = [];
		for( obj of json){
			// console.log("对象",obj);
			new ObjCard().goodsList.push(obj);
			arr.push(obj.number);
		}
		$("#cardGoodsNum").html(eval(arr.join("+")));
		$("#cardGoodsNum").css("color","red")
	}
	
	$(".type_list").on("click","span",function(){
		// console.log($(this).parent().next())
		if($(this).prop("show")){
			// console.log($(this).prop("show"))
			$(this).css("background","url(images/goods_list/plus_img.png)");
			$(this).parent().css("color","#9a9a9a").next().removeClass("type_list_ul_show"); 
			$(this).prop("show",false);
		}else{
			// console.log(222,$(this).prop("show"))
			$(this).css("background","url(images/goods_list/minus_img.png)");
			$(this).parent().css("color","red").next().addClass("type_list_ul_show"); 
			$(this).prop("show",true);
		}
		
	})
	
	
	var nav = document.getElementById("head_main");
	window.onscroll = function(){
		//获取页面滚走的距离
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		// console.log(sTop);
		var h = 140;
		if( sTop > h ){
			nav.style.position = "fixed";
			nav.style.top = 0;
			nav.style.width = "100%";
			nav.style.zIndex = 10;
			
		}else{
			nav.style.position = "";
			nav.style.margin = "";
			nav.style.zIndex ="";
			nav.style.width = "";
		}
	}
}