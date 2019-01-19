function publicSport(obj, json, contant, cellback) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for (var attr in json) {
			var currentValue = 0;
			if (attr === "opacity") {
				currentValue = getStyleValue(obj, attr) * 100;
				// console.log(attr);
			} else {
				currentValue = parseInt(getStyleValue(obj, attr));
			}
			if(contant == "contant"){
				var speed = json[attr] - currentValue > 0 ? 3 : -3;
				if(Math.abs(json[attr] - currentValue) < 3 ){
					currentValue = json[attr];
					speed = 0;
				}
			}else{
				var speed = (json[attr] - currentValue) / 10; //当与目标偏差不足1时
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			}
			
			// console.log(currentValue);
			if (currentValue != json[attr]) { //即使某个属性值已经达到目标值,也不会停下计时器,因为还有未到达的属性可以改变flog的值,那些到达了的也会继续执行,但是值是不会改变的,因为speed值不会变了
				flag = false;
			}
			
			if (attr === "opacity") {
				obj.style[attr] = (currentValue + speed) / 100;
			} else if (attr === "zIndex") {
				obj.style[attr] = json[attr];
			} else {
				obj.style[attr] = currentValue + speed + "px";
			}
		}
		//每次判断是否需要停止计时器
		if (flag) {
			clearInterval(obj.timer);
			if (cellback) {
				cellback();
			}
		}
	}, 20)
}
function publicSportYun(obj, json, spd , cellback) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for (var attr in json) {
			var currentValue = 0;
			if (attr === "opacity") {
				currentValue = getStyleValue(obj, attr) * 100;
				// console.log(attr);
			} else {
				currentValue = parseInt(getStyleValue(obj, attr));
			}
			
			if(spd){
				var speed = spd;
			}else{
				var speed = (json[attr] - currentValue) / 10; 
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			}
			// console.log(currentValue);
			if (currentValue != json[attr]) { //即使某个属性值已经达到目标值,也不会停下计时器,因为还有未到达的属性可以改变flog的值,那些到达了的也会继续执行,但是值是不会改变的,因为speed值不会变了
				flag = false;
			}
			if (attr === "opacity") {
				obj.style[attr] = (currentValue + speed) / 100;
			} else if (attr === "zIndex") {
				obj.style[attr] = json[attr];
			} else {
				obj.style[attr] = currentValue + speed + "px";
			}
		}
		//每次判断是否需要停止计时器
		if (flag) {
			clearInterval(obj.timer);
			if (cellback) {
				cellback();
			}
		}
	}, 20)
}
function getStyleValue(obj, attr) {
	return getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}

