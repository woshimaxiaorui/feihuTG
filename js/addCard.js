//  添加购物车模块 作者：MR （ 面向对象方式实现 ）
function goodsDataAddCart(obj, index) {
	
	var oGoodsTemp = null;
	var oCard = new ObjCard();
	if (index == "1" || index == "2") {
		var gname = obj.attr("gname");
		var parice = Number( obj.attr("gparice").replace(/￥/g, "") );
		var gid = obj.attr("gid");
		var url = obj.attr("gsrc");
		oGoodsTemp = new ObjGoods(gid, gname, url, parice);

		if (oCard.goodsList.length == 0) {
			oCard.addCard(oGoodsTemp);
			
		}else{
			var size = oCard.goodsList.length;
			var flag = true;
			for (var i = 0; i < size; i++) {
				// 统计同件商品数量
				if (gid == oCard.goodsList[i]["id"]) {
					var num = oCard.goodsList[i]["number"] + 1;
					oCard.goodsList[i].number = parseInt(num);
					flag = false;
					break;
				}
			}
			if(flag){
				oCard.addCard(oGoodsTemp);
			}
		}
		addCardActionMove(obj,url);
		oCard.setCookie();
	}
	if(index == "2"){
		var txt = obj.attr("uname");
		console.log(txt)
		location.href = "settlement.html?uname="+txt;
	}
}
// 添加购物车动画
function addCardActionMove(obj,url) {
	var startBtn = obj[0];
	var endBtn = document.querySelector("#theShoppingCart");
	//第一步 ： 确定三点坐标
	//起始点
	var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	var startPoint = {
		x: startBtn.offsetLeft + startBtn.offsetWidth / 2,
		y: startBtn.offsetTop - sTop
	}
	//结束点
	var endPoint = {
		x: endBtn.offsetLeft + endBtn.offsetWidth / 2,
		y: endBtn.offsetTop
	}
	//最高点
	var topPoint = {
		x: endPoint.x - 100,
		y: endPoint.y + 50
	}
	//第二步 ：根据三点坐标确定抛物线方程系数 a b  c
	var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x) - (startPoint.y - topPoint.y) * (startPoint.x -
		endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x) - (
		startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));

	var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x -
		startPoint.x);

	var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;

	//第三步 ：创建商品  （dom操作 动态创建）
	var good = document.createElement("div");
	document.body.appendChild(good);
	good.style.width = "100px";
	good.style.height = "100px";
	good.style.background = "url(" + url + ") no-repeat center center";
	good.style.position = "fixed";
	//获取起始点的横纵坐标
	var x = startPoint.x;
	var y = startPoint.y;
	good.style.left = x + "px";
	good.style.top = y + "px";

	//第四步 ： 商品运动  沿着抛物线轨迹开始运动		
	var timer = setInterval(function() {
		x = x + 6;
		if (x < endPoint.x) {
			y = a * x * x + b * x + c;
			good.style.left = x + "px";
			good.style.top = y + "px";
			good.style.width = (good.offsetWidth - 1) + "px";
			good.style.height = (good.offsetHeight - 1) + "px";
		} else {
			clearInterval(timer);
			good.remove();
		}
	}, 10)
	getGoodsNumber();
}
//获取购物车中的商品总数
function getGoodsNumber(){
	var oCart = new ObjCard();
	var arr = [];
	for( obj of oCart.goodsList){
		// console.log(obj)
		arr.push(obj.number);
	}
	
	$("#cardGoodsNum").html(eval(arr.join("+")));
	$("#cardGoodsNum").css("color","red")
}

// 商品对象
function ObjGoods(id, name, url, price) {
	this.id = id,
		this.name = name,
		this.url = url,
		this.price = price,
		this.number = 1
}
//购物车对象
function ObjCard() {
	if (!ObjCard.instance) {
		ObjCard.instance = {
			goodsList: new Array(),
			addCard: function(obj) {
				this.goodsList.push(obj);
			},
// 			forList: function() {
// 				for (key of this.goodsList) {
// 					console.log("Name:" + key["name"]);
// 				}
// 			},
			setCookie : function(){//存入cookie
				var str = "[";
				for(var i = 0;i<this.goodsList.length;i++){
					str+="{";
					for(var key in this.goodsList[i]) {
						var value = this.goodsList[i][key];
						if(key != "number"){
							str+=`"${key}" : "${value}",`
						}else{
							str+=`"${key}" : ${value}`
						}
					}
					if(i != this.goodsList.length-1){
						str+="},";
					}else{
						str+="}";
					}
					
				}
				str+= "]";
				setCookieUtil("GoodsList",str);
			}
		}
	}
	return ObjCard.instance;
}
// var g1 = new ObjGoods(1,"aa","bb",22);
// var g2 = new ObjGoods(2,"cc","ff",2);
// 
// var o1 = new ObjCard();
// var o2 = new ObjCard();
// o1.addCard(g1);
// o2.addCard(g2);
// var o3 = new ObjCard();
// o3.forList();
