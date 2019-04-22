// 食物类
function Food(x, y, img) {
	// 食物的x位置
	this.row = x;
	// 食物的y位置
	this.col = y;
	// 图片的索引
	this.img = img;
}

// 重置食物
Food.prototype.resetFood = function(row, col) {
	this.row = row;
	this.col = col;
}