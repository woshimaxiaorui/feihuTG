window,onload = function(){
	
	change_type_list_ul_show();
	function change_type_list_ul_show(){
		$(".type_list_ul_show").prev().css("color","red")
							   .find("span").css("background","url(images/goods_list/minus_img.png)")
							   .prop("show",true);
	}
	
	$(".type_list").on("click","span",function(){
		console.log($(this).parent().next())
		if($(this).prop("show")){
			console.log($(this).prop("show"))
			$(this).css("background","url(images/goods_list/plus_img.png)");
			$(this).parent().css("color","#9a9a9a").next().removeClass("type_list_ul_show"); 
			$(this).prop("show",false);
		}else{
			console.log(222,$(this).prop("show"))
			$(this).css("background","url(images/goods_list/minus_img.png)");
			$(this).parent().css("color","red").next().addClass("type_list_ul_show"); 
			$(this).prop("show",true);
		}
		
		
	})
	
	
	var nav = document.getElementById("head_main");
	window.onscroll = function(){
		//获取页面滚走的距离
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		console.log(sTop);
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