// 地图类
function Map(row, col, width, height) {
	// 行属性
	this.row = row;
	// 列属性
	this.col = col;
	// 总宽
	this.width = width;
	// 总高
	this.height = height;
	// 添加一个大盒子
	this.dom = document.createElement("div");
	// 添加(二维)数组用于方便确定食物位置
	this.arr = [];
}

// 方法写在原型中prototype
// 渲染地图
Map.prototype.fill = function() {
	for (var j = 0; j < this.row; j++) {
		// 创建数组存储每一行中的全部列元素
		var row_arr = [];
		// 创建行容器，盛放创建出来的列元素
		var row_dom = document.createElement("div");
		// 给row_dom添加行类名
		row_dom.className = "row"; 
		// 循环创建每一行的列元素
		for (var i = 0; i < this.col; i++) {
			// 创建列元素
			var col_dom = document.createElement("span");
			// 给col_dom添加类名
			col_dom.className = "grid";
			// 追加列元素到行中
			row_dom.appendChild(col_dom);
			// 将创建出来的每一个小方格元素追加到行数组中
			row_arr.push(col_dom);
		}
		// 每一行追加到大盒子dom中
		this.dom.appendChild(row_dom);
		// 将row_arr放入到自身的arr属性中
		this.arr.push(row_arr);
		// 给dom添加类名
		this.dom.className = "box";
	}
	// 上树
	document.body.appendChild(this.dom);
}

// 清屏
Map.prototype.clear = function() {
	// 循环清除地图中的背景颜色
	for (var i = 0; i < this.arr.length; i++) {
		for (var j = 0; j < this.arr[i].length; j++) {
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}