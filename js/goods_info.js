window.onload = function(){
	
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
	}
	
	// 初始化购物车中的商品数量
	initCartGoodsNum();
	function initCartGoodsNum(){
		// alert(1);
		var str = getCookieUtil("GoodsList");
		if(str == ""){
			return;
		}
		var json = JSON.parse(str);
		var arr = [];
		for( obj of json){
			// console.log(obj)
			arr.push(obj.number);
		}
		$("#cardGoodsNum").html(eval(arr.join("+")));
		$("#cardGoodsNum").css("color","red")
	}
	
}