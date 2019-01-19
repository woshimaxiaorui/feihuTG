//Cookie工具封装

//根据key获取value值
function getCookieUtil(key){
	var str = document.cookie;
	if(str){
		//开始获取cookie
		str = str.replace(/\s+/g,"");//空格替换成空字符串
		var strArr = str.split(";");
		for(var i = 0;i<strArr.length;i++){
			if( strArr[i].split("=")[0] === key ){
				return strArr[i].split("=")[1];
			}
		}
		return "";
	}
	return "";
}
//根据key,value值存入cookie
function setCookieUtil(key,value,day){
	if(day){
		var nowtime = new Date();
		nowtime.setData(nowtime.getDate()+day);
		document.cookie = `${key}=${value};expiser=${nowtime}`;
	}else{
		document.cookie = `${key}=${value}`;
	}
}
//根据key删除cookie
function delCookieUtil(key){
	setCookieUtil(key,"",-1);//或者下面方式
// 	 var str = document.cookie;
// 	 if(str){
// 		 str = str.replace(/\s+/g,"");
// 		 var strArr = str.split(";");//["key=value","key2=value2"]
// 		 for(var i =0;i<strArr.length;i++){
// 			 if( strArr[i].split("=")[0] === key ){
// 				document.cookie = `${strArr[i].split("=")[0]}=""`;
// 				return true;
// 			 }
// 		 }
// 		 return false;
// 	 }
// 	 return false;
	
}