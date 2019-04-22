// 游戏类
function Game(map, food, snake, block) {
	// 地图实例
	this.map = map;
	// 食物实例
	this.food = food;
	// 蛇实例
	this.snake = snake;
	// 障碍物实例
	this.block = block;
	// 定义定时器
	this.timer = null;
	// 死亡标记
	this.flag = null;
	// 时间间隔，控制速度
	this.time = 250;
	// 分数信号量
	this.fenshu_idx = 0;


	// 初始化，写在最后面
	this.init();
}

// 方法写在原型中prototype
// 初始化的方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderSnake();
	this.renderBlock();
	this.start();
	this.bindEvent();
} 

// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
	// 定义变量简化书写
	var row = this.food.row;
	var col = this.food.col;
	// 通过二维数组中的行(row),列(col)属性找到map中的对应位置
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img + ")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}

// 渲染蛇
Game.prototype.renderSnake = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 设置蛇头部的背景图片
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	this.map.arr[head.row][head.col].style.backgroundSize = "cover";
	// 渲染蛇就是在地图中渲染蛇的每一节身体的坐标元素的背景图片
	for (var i = 1; i < this.snake.arr.length - 1; i++) {
		// 获取蛇的每一个节身体
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.snake.body_pic[0] + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
	// 获取蛇的尾部
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
	this.map.arr[tail.row][tail.col].style.backgroundSize = "cover";
}

// 游戏开始
Game.prototype.start = function() {
	this.flag = true;
	// 备份this
	var me = this;

	// 定义定时函数
	function dingShi() {
		// 移动
		me.snake.move();
		// 检测是否撞墙
		me.checkMap();
		// 检测是否咬到自己
		me.checkSnake();
		// 检测蛇是否撞到障碍物
		me.checkBlock();
		// 检测是否吃到食物
		me.checkFood();
		// 判断游戏是否在进行
		if (me.flag) {
			// 清屏
			me.map.clear();
			// 渲染食物
			me.renderFood();
			// 渲染蛇
			me.renderSnake();
			// 渲染障碍物
			me.renderBlock();
		}
		// 关闭定时器
		clearInterval(me.timer);
		// 如果游戏未结束，重新开启定时器
		if (me.flag) {
			me.timer = setInterval(dingShi, me.time);
		}
	}
	this.timer = setInterval(dingShi, me.time);

}

// 绑定键盘方向事件
Game.prototype.bindEvent = function() {
	// 在一个类的原型方法中，不要使用除了window，document的其它全局变量
	// 备份
	var me = this;
	// 为document绑定onkeydown事件
	document.onkeydown = function(e) {
		// 获取用户按下的方向键
		var code = e.keyCode;
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			// 改变蛇的方向
			me.snake.change(code);
		}
	}
}

// 游戏结束
Game.prototype.gameOver = function() {
	this.flag = false;
	// 停止定时器
	clearInterval(this.timer);
}

// 检测是否撞墙
Game.prototype.checkMap = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 与地图中的row和col进行判断
	if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
		alert("撞到墙，游戏结束");
		// 结束游戏
		this.gameOver();
	}
}

// 检测是否吃到自己
Game.prototype.checkSnake = function() {
	var head = this.snake.arr[this.snake.arr.length - 1];
	for (var i = 0; i < this.snake.arr.length - 1; i++) {
		var one = this.snake.arr[i];
		if (one.row === head.row && one.col === head.col) {
			alert("咬到自己，游戏结束");
			this.gameOver();
			return;
		}
	}
}

// 检测是否吃到食物
Game.prototype.checkFood = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物坐标
	var food = this.food;

	// 判断是否吃到食物
	if (head.row === food.row && head.col === food.col) {
		// 调用蛇生成的方法
		this.snake.growUp();
		// 重置食物
		this.resetFood();
		// 分数加1
		this.fenshu_idx++;
		fenshu.innerHTML = "分数：" + this.fenshu_idx;

		// 时间间隔递减，加快速度
		if (this.time > 190) {
			this.time -= 20;
		} else if (this.time > 130 ) {
			this.time -= 15;
			nadu1.innerHTML = "难度：一般";
			nadu2.style.backgroundColor = "yellow";
		}else if (this.time > 100 ) {
			this.time -= 10;
			nadu1.innerHTML = "难度：困难";
			nadu2.style.backgroundColor = "pink";
		} else if (this.time > 80 ) {
			this.time -= 5;
			nadu1.innerHTML = "难度：噩梦";
			nadu2.style.backgroundColor = "red";
		} else if (this.time > 60 ) {
			this.time -= 5;
			nadu1.innerHTML = "难度：神仙";
			nadu2.style.backgroundColor = "black";
		}
	}
}

// 重置方法
Game.prototype.resetFood = function() {
	// 随机生成row 和 col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);

	// 循环检测食物与蛇的每一节身体
	for (var i = 0; i < this.snake.arr.length; i++) {
		// 获取蛇的一节身体
		var one = this.snake.arr[i];
		if (one.row === row && one.col === col) {
			//食物随机到蛇身上是重新调用函数(递归)
			this.resetFood();
			return;
		}
	}

	// 循环检测食物与障碍物的每一节身体
	for (var i = 0; i < this.block.arr.length; i++) {
		// 获取蛇的一节身体
		var one = this.block.arr[i];
		if (one.row === row && one.col === col) {
			// 食物随机到障碍物中，重新调用函数
			this.resetFood();
			return;
		}
	}
	// 生成食物
	this.food.resetFood(row, col);
}

// 渲染障碍物的方法
Game.prototype.renderBlock = function() {
	// 渲染障碍物可以理解为渲染一条不会动的蛇
	for (var i = 0; i < this.block.arr.length; i++) {
		// 定义变量用于简化书写
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		// 在地图中渲染
		// this.map.arr[row][col].style.backgroundColor = "orange";
		this.map.arr[row][col].style.backgroundImage = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}

// 检测蛇是否撞到障碍物
Game.prototype.checkBlock = function() {
	// 获取蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环判断是否撞到障碍物
	for (var i = 0; i < this.block.arr.length; i++) {
		// 获取障碍物的一节
		var one = this.block.arr[i];
		if (head.row === one.row && head.col === one.col) {
			alert("撞到障碍物，游戏结束");
			// 游戏结束
			this.gameOver();
		}
	}
}