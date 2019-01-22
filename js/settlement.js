window.onload = function(){
	
	getGoodsList();
	function getGoodsList(){
		var str = getCookieUtil("GoodsList");
		if(str == ""){
			//显示没有商品
			return;
		}
		var json = JSON.parse(str);
		
		var $otable = $("#list_table");
		var moneySum = 0;
		for( obj of json){
			// console.log(obj)
			var $otr = $("<tr></tr>");
			$otable.append($otr);
			
			var $otd = $("<td></td>");
			$otr.append($otd);
			var $input = $("<input type='checkbox' name='' id='' value='' class='goods_check' checked='checked'/>");
			$otd.append($input);
			
			var $otd2 = $("<td id='show_goods_list'></td>");
			$otr.append($otd2);
			
			var $div1 = $("<div class='col_img'></div>")
			var $div2 = $("<div class='col_name'></div>")
			var $div3 = $("<div class='col_quantity'></div>")
			var $div4 = $("<div class='col_price'></div>")
			var $div5 = $("<div class='col_total'></div>")
			var $div6 = $("<div class='col_op'></div>")
			
			$otd2.append($div1)
				 .append($div2)
				 .append($div3)
				 .append($div4)
				 .append($div5)
				 .append($div6);
				
			$div1.html("<img src='"+ obj.url +"' >"); 
			$div2.html("<a href=''>"+ obj.name +"</a>");
			var inputtxt ="<input type='button' name='' id='' value='-' class='good_num_sub' />";
			    inputtxt +="<input type='text' name='' id='' value='"+ obj.number +"' class='good_num' />";
				inputtxt +="<input type='button' name='' id='' value='+' class='good_num_add' />"
			$div3.html(inputtxt);
			$div4.html("￥"+obj.price);
			var sum = Math.floor( obj.price * obj.number *100) /100 ;
			moneySum += sum;
			// console.log(obj.price,obj.number)
			$div5.html("￥"+sum);
			$div6.html("<a href=''>删除</a>");
			
			
// 			<td id="show_goods_list">
// 				<div class="col_img">
// 
// 				</div>
// 				<div class="col_name">
// 
// 				</div>
// 				<div class="col_quantity">
// 
// 				</div>
// 				<div class="col_price">
// 
// 				</div>
// 				<div class="col_total">
// 
// 				</div>
// 				<div class="col_op">
// 					<a href="">删除</a>
// 				</div>
// 			</td>
		}
		
		var $otrFoot = $("<tr id='moneySum_txt'><td colspan='2'>总金额 : ￥"+ moneySum  +"</td></tr>");
		$otable.append($otrFoot);
		$otrFoot.addClass("td_foot");
	}
	
	
	$(".col_quantity").on("click",".good_num_sub",function(){
		var $number  = $(this).next().val();
		$number--;
		if($number == 0){
			return;
		}
		$(this).next().val($number);
		var price =   Number( $(this).parent().next().html().replace(/￥/g, "") ) ;
		aggregatePrice($(this),$number,price)
		return false;
	})
	$(".col_quantity").on("click",".good_num_add",function(){
		var $number  = Number( $(this).prev().val() );
		$number++;
		$(this).prev().val($number);
		var price =  Number( $(this).parent().next().html().replace(/￥/g, "") ) ;
		aggregatePrice($(this),$number,price)
		return false;
	})
	
	function aggregatePrice($obj,num,unitPrice){
		var sum = Math.floor( num * unitPrice *100 ) / 100 ;
		$obj.parent().next().next().html("￥"+sum);
		show_moneySum_txt();
	}
	
	//更新总价格
	function show_moneySum_txt(){
		var sum = 0;
		$(".col_total").each(function(i){
			if(i != 0){
				sum += Number(  $(this).html().replace(/￥/g,"") );
			}
		})
		sum = Math.floor( sum * 100 ) /100;
		$("#moneySum_txt").find("td").html("总金额 : ￥"+sum);
		
	}
}