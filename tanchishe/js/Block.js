// 障碍物类
function Block(img) {
	// 障碍物的坐标属性
	this.arr = [
		// 障碍1
		{row: 2, col: 23},
		{row: 2, col: 24},
		{row: 3, col: 23},
		{row: 3, col: 24},
		// 障碍2
		{row: 7, col: 12},
		{row: 7, col: 13},
		{row: 7, col: 14},
		{row: 8, col: 14},
		{row: 9, col: 14},
		{row: 10, col: 14},
		{row: 11, col: 14},
		{row: 12, col: 14},
		{row: 12, col: 15},
		{row: 12, col: 16},
		{row: 12, col: 17},
		// 障碍3
		{row: 12, col: 3},
		{row: 13, col: 3},
		{row: 13, col: 4},
		{row: 14, col: 4},
	];
	// 图片属性
	this.img = img;
}