const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 300;
const HEIGHT = 500;
const CELLSIZE = 20;
const ROWS = (HEIGHT - 120) / CELLSIZE;
const COLS = WIDTH / CELLSIZE;

const FIGURES = {
		'I' : [[1, 5, 9, 13], [4, 5, 6, 7]],
        'Z' : [[4, 5, 9, 10], [2, 6, 5, 9]],
        'S' : [[6, 7, 9, 10], [1, 5, 6, 10]],
        'L' : [[1, 2, 5, 9], [0, 4, 5, 6], [1, 5, 9, 8], [4, 5, 6, 10]],
        'J' : [[1, 2, 6, 10], [5, 6, 7, 9], [2, 6, 10, 11], [3, 5, 6, 7]],
        'T' : [[1, 4, 5, 6], [1, 4, 5, 9], [4, 5, 6, 9], [1, 5, 6, 9]],
        'O' : [[1, 2, 5, 6]]
	}

const TYPES = ['I', 'Z', 'S', 'L', 'J', 'T', 'O']
const FPS = 24;

const COLORS = {
	1 : '#4ec1f6',
	2 : '#1da110',
	3 : '#ad06c8',
	4 : '#fc5b7a'
}

// Canvas Update *****************************************************

let tetris = new Tetris(ROWS, COLS);
tetris.new_figure();

let counter = 0;
let move_down = false;
let can_move = true;

function updateCanvas() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	// drawGrid();

	counter += 1;
	if (counter > 10000) {
		counter = 0
	}

	if (can_move) {
		if ((counter % (FPS / (tetris.level * 2)) == 0) || move_down) {
			if (!tetris.gameover) {
				tetris.go_down();
			}
		}
	}

	// drawing grid values
	for (let y=0; y<ROWS; y++) {
		for (let x=0; x<COLS; x++) {
			if (tetris.board[y][x] > 0) {
				val = tetris.board[y][x];
				color = COLORS[val];
				drawCell(x*CELLSIZE, y*CELLSIZE, CELLSIZE, CELLSIZE, color);
			}
			
		}
	}

	// drawing falling objects
	for (let i=0; i<4; i++) {
		for (let j=0; j<4; j++) {
			if (tetris.figure.image().includes(i*4+j)) {
				var color = COLORS[tetris.figure.color];
				var x = CELLSIZE * (tetris.figure.x + j);
				var y = CELLSIZE * (tetris.figure.y + i);
				drawCell(x, y, CELLSIZE, CELLSIZE, color)
			}
		}
	}

	// HUD
	drawCell(0, HEIGHT-120, WIDTH, 120, '#1F194C');
	drawCell(0, 0, WIDTH, HEIGHT, '#1F194C', true);

	for (let i=0; i<4; i++) {
		for (let j=0; j<4; j++) {
			if (tetris.next.image().includes(i*4+j)) {
				var color = COLORS[tetris.next.color];
				var x = CELLSIZE * (tetris.next.x + j - 4);
				var y = HEIGHT - 100 + CELLSIZE * (tetris.next.y + i);
				drawCell(x, y, CELLSIZE, CELLSIZE, color)
			}
		}
	}

	drawText(tetris.score, 42, '#ffe900', WIDTH-50, HEIGHT-60);
	drawText('TETRIS', 20, '#ffe900', WIDTH/2-30, HEIGHT-10);
}

var interval = setInterval(updateCanvas, 1000/FPS);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Event Handling ****************************************************

function keyDown(event) {
	if (event.key == 'ArrowLeft') {
		tetris.go_side(-1);
	}
	if (event.key == 'ArrowRight') {
		tetris.go_side(1);
	}
	if (event.key == 'ArrowUp') {
		tetris.rotate();
	}
	if (event.key == 'ArrowDown') {
		move_down = true;
	}
	if (event.key == ' ') {
		tetris.go_space();
	}
	if (event.key == 'r' || event.key == 'R') {
		tetris = new Tetris(ROWS, COLS);
		tetris.new_figure();
	}
}

function keyUp() {
	if (event.key == 'ArrowDown') {
		move_down = false;
	}
} 

// Objects ***********************************************************

function Tetramino(x, y) {
	this.x = x;
	this.y = y;
	this.type = TYPES[random(TYPES.length-1)];
	this.shape = FIGURES[this.type]
	this.color = random(1, 4);
	this.rotation = 0;

	this.image = function() {
		return this.shape[this.rotation];
	}

	this.rotate = function() {
		this.rotation = (this.rotation + 1) % this.shape.length;
	}
}

function Tetris(rows, cols) {
	this.rows = rows;
	this.cols = cols;
	this.score = 0;
	this.level = 1;
	this.board = createBoard();
	this.next = null;
	this.gameover = false;

	this.new_figure = function() {
		if (this.next == null){
			this.next = new Tetramino(5, 0);
		}

		this.figure = this.next;
		this.shadow = this.figure;
		this.next = new Tetramino(5, 0);
	}

	this.intersects = function() {
		intersection = false;
		for (let i=0; i<4; i++) {
			for (let j=0; j<4; j++) {
				if (this.figure.image().includes(i*4+j)) {
					if ((i+this.figure.y > this.rows-1) ||
					   (j+this.figure.x > this.cols-1) ||
					   (j+this.figure.x < 0) ||
					   (this.board[i + this.figure.y][j + this.figure.x] > 0)) {
					   		intersection = true;
				   }
				}
			}
		}
		return intersection;
	}

	this.removeLine = function() {
		var rerun = false;
		for (let y=ROWS-1; y>0; y--) {
			var is_full = true;
			for (let x=0; x<COLS; x++) {
				if (this.board[y][x] == 0) {
					is_full = false;
				}
			}
			if (is_full) {
				this.board.splice(y, 1);
				this.board.unshift(createArray());
				this.score += 1;
				if (this.score % 10 == 0) {
					this.level += 1
				} 
				rerun = true;
			}
		}
		if (rerun) {
			this.removeLine();
		}

	}

	this.freeze = function() {
		for (let i=0; i<4; i++) {
			for (let j=0; j<4; j++) {
				if (this.figure.image().includes(i*4+j)) {
					var y = i+this.figure.y;
					var x = j+this.figure.x;
					this.board[y][x] = this.figure.color;
				}
			}
		}
		this.removeLine();
		this.new_figure();
		if (this.intersects()) {
			this.gameover = true;
		}
	}

	this.go_space = function() {
		while (!this.intersects()) {
			this.figure.y += 1;
		}
		this.figure.y -= 1;
		this.freeze();
	}

	this.go_down = function() {
		this.figure.y += 1;
		if (this.intersects()) {
			this.figure.y -= 1;
			this.freeze();
		}
	}

	this.go_side = function(dx) {
		this.figure.x += dx;
		if (this.intersects()) {
			this.figure.x -= dx;
		}
	}

	this.rotate = function() {
		rotation = this.figure.rotation;
		this.figure.rotate();
		if (this.intersects()) {
			this.figure.rotation = rotation;
		}
	}
}

// Functions *********************************************************

function drawLine(x1, y1, x2, y2) {
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawCell(x, y, w, h, color, stroke=false) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = color;
	if (!stroke){
		ctx.fill();
		ctx.strokeStyle = '#fff';
		ctx.stroke();
	}
	else {
		ctx.strokeStyle = color;
		ctx.stroke();
	}
	ctx.closePath();
}

function drawGrid() {
	for (let i=0; i<ROWS+1; i++) {
		drawLine(0, CELLSIZE*i, WIDTH, CELLSIZE*i);
	}
	for (let j=0; j<COLS; j++) {
		drawLine(CELLSIZE*j, 0, CELLSIZE*j, HEIGHT-120);
	}
}

function drawText(text, size, color, x, y) {
	ctx.font = `${size}px "Jura", sans-serif`;
	ctx.fillStyle = color;
	ctx.fillText(`${text}`, x, y);
}

function createArray() {
	array = []
	for (let i=0; i<COLS; i++){
		array[i] = 0;
	}
	return array
}

function createBoard() {
	var board = [];
		for (let i=0; i<ROWS; i++) {
			board.push(createArray());
		}
	return board;
}

function random(min, max) {
	if (arguments.length == 1) {
		max = arguments[0] + 1;
		min = 0;
	}
	return Math.floor(Math.random() * (max)) + min
}

function print() {
	for (value of arguments) {
		console.log(value);
	}
}