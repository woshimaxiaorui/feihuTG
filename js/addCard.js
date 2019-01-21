//  添加购物车模块 作者：MR （ 面向对象方式实现 ）
function getHtmlGoodsData(obj,index){
	var oGoodsTemp = null;
	var oCard = new ObjCard();
	if(index == "1"){
		var gname = $(".ui_pattribute").find("p").eq(0).find("a").html();
		var parice = Number( $("#ui_pattribute_price").find("span").html().replace(/￥/g,"") );
		var gid = obj.attr("gid");
		var url = $(".ui_pimg").find("a").find("img").attr("src");
		oGoodsTemp = new ObjGoods(gid,gname,url,parice);
		
		if(oCard.goodsList.length > 0){
			var size = oCard.goodsList.length;
			for(var i = 0;i < size;i++){
				// 统计同件商品数量
				if(gid == oCard.goodsList[i]["id"]){
					var num = oCard.goodsList[i]["number"] +1;
					oCard.goodsList[i].number = num;
					console.log(oCard.goodsList[i]);
					return;
				}
			}	
		}else{
			oCard.addCard(oGoodsTemp);
		}
	}
}



// 商品对象
function ObjGoods(id,name,url,price){
	this.id = id,
	this.name = name,
	this.url = url,
	this.price = price,
	this.number = 0, 
	this.show = function(){
		console.log("商品id:"+this.id," url:"+this.url," price:"+this.price," name:"+this.name);
	}
}
//购物车对象
function ObjCard(){
	if(!ObjCard.instance){
		ObjCard.instance = {
			goodsList : new Array(),
			addCard : function(obj){
				this.goodsList.push(obj);
			},
			forList : function(){
				for( key of this.goodsList){
					console.log("Name:"+key["name"]);
				}
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



