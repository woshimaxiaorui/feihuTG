// 常用工具方法
// 碰撞检测
function collisionDetection(d1, d2) {
	R1 = d1.offsetWidth + d1.offsetLeft;
	L1 = d1.offsetLeft;
	T1 = d1.offsetTop;
	B1 = d1.offsetHeight + d1.offsetTop;

	R2 = d2.offsetWidth + d2.offsetLeft;
	L2 = d2.offsetLeft;
	T2 = d2.offsetTop;
	B2 = d2.offsetHeight + d2.offsetTop;

	//如果碰不上 返回false 
	if (R1 < L2 || B1 < T2 || T1 > B2 || L1 > R2) {
		return false;
	} else {
		return true;
	}
}

// 根据id获取页面元素
function $id(id) {
	return document.getElementById(id);
}

// 获取范围内的随机整数
function getRandNum(m, n) {
	if (m > n) {
		return Math.round(Math.random() * (m - n) + n);
	} else if (n > m) {
		return Math.round(Math.random() * (n - m) + m);
	} else {
		return "缺少参数";
	}
}
//console.log(getRandNum(9,1));

// 获取随机颜色
function getRandColor(type) {
	if (type === "rgb") {
		return "rgb(" + getRandNum(0, 255) + "," + getRandNum(0, 255) + "," + getRandNum(0, 255) + ")";
	} else {
		var str = "0123456789ABCDEF";
		var colorStr = "#";
		for (var i = 0; i < 6; i++) {
			colorStr += str[getRandNum(0, 15)];
		}
		return colorStr;
	}
}
//console.log(getRandColor());

// 系统时间格式化
function getStringDate(now, noun) {
	noun = noun || "-";
	var y = now.getFullYear();
	var m = timeNumTwo(now.getMonth() + 1);
	var d = timeNumTwo(now.getDate());
	var _h = timeNumTwo(now.getHours());
	var _m = timeNumTwo(now.getMinutes());
	var _s = timeNumTwo(now.getSeconds());
	return y + noun + m + noun + d + " " + _h + ":" + _m + ":" + _s;
}

function timeNumTwo(num) { //格式化各位时间显示
	return num < 10 ? "0" + num : num;
}
//console.log(getStringDate(new Date(),"/"));

function getWeek(num) {
	var str = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	return str[num];
}
// ES6冒泡排序
function maoPao(arr) {
	'use strict'
	for (let j = 0; j < arr.length; j++) {
		for (let i = j; i < arr.length; i++) {
			if (arr[i] < arr[j]) {
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
		}
	}
	return arr;
}


