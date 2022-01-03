const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let colors = ['#FAAB1C', '#2490E9', '#32A956', '#FF5956'];
let length = colors.length
var color = get_color();

var x = WIDTH / 2;
var y = HEIGHT / 2;
var ball = new Ball(x, y, 10);

var paddleWidth = 80;
var paddleHeight = 10;
var paddle = new Paddle(paddleWidth, paddleHeight);

var rows = 4
var cols = 4
var bwidth = 60;
var bheight = 15;
var bpadding = 10;
var leftOffset = 8;
var topOffset = 25;
var bricks = [];
for (let r=0; r<rows; r++) {
	for (let c=0; c<cols; c++) {
		var x = leftOffset + c * (bpadding +  bwidth);
		var y = topOffset + r * (bpadding + bheight);
		var brick = new Brick(x, y, bwidth, bheight);
		bricks.push(brick);
	}
}

var score = 0;
var lives = 3;

// Canvas Update function

function updateCanvas() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	ball.draw();
	ball.update();
	paddle.draw();
	drawScore(score);
	drawLives(lives);

	if (score == rows*cols) {
		endGame('You Won!');
	}

	for (let b = 0; b < bricks.length; b++){
		if (bricks[b].isalive) {
			if (bricks[b].hasCollided(ball)) {
				bricks[b].isalive = false;
				ball.dy *= -1;
				score++;
			}
			bricks[b].draw();
		}
	}
}

var interval = setInterval(updateCanvas, 10);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('mousemove', mouseMove)

// Game Objects

function Ball(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.dx = 2;
	this.dy = -2;

	this.draw = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

	this.update = () => {
		this.x += this.dx;
		this.y += this.dy;

		if (this.x + this.dx < this.radius || this.x + this.dx > WIDTH - this.radius) {
			this.dx *= -1
		}

		if (this.y + this.dy < this.radius) {
			this.dy *= -1;
		}
		else if (this.y + this.dy > HEIGHT - this.radius- paddle.height) {
			if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
				this.dy *= -1;
			}
		}
		
		if (this.y + this.dy >= HEIGHT) {
			lives--;
			if (lives <= 0) {
				endGame('Game Over')
			}
			else {
				ball.x = WIDTH / 2;
				ball.y = HEIGHT / 2;
				paddle.x = WIDTH / 2 - paddle.width / 2;
			}
		}
	}
}

function Paddle(width, height) {
	this.width = width;
	this.height = height;

	this.x = WIDTH / 2 - this.width / 2;
	this.y = HEIGHT - this.height;
	this.speed = 8;
	this.moveLeft = false;
	this.moveRight = false;

	this.draw = () => {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

	this.update = () => {
		if (this.moveLeft) {
			if (this.x + this.speed > 0) {
				this.x -= this.speed;
			}
		}

		if (this.moveRight) {
			if (this.x + paddle.width < WIDTH) {
				this.x += this.speed;	
			}
		}
	}
}

function Brick(x, y, width, height) {
	this.x = x;
	this.y  =y;
	this.width = width;
	this.height = height;
	this.isalive = true;

	this.draw = () => {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

	this.hasCollided = (ball) => {
		if (ball.x > this.x && ball.x < this.x + this.width &&
			ball.y > this.y && ball.y < this.y + this.height) {
			return true;
		}

		return false;
	}
}

// Functions & Event Handlers

function drawScore(score) {
	ctx.font = '16px Arial';
	ctx.fillStyle = "#0095DD";
	ctx.fillText(`Score : ${score}`, leftOffset, 18);
}

function drawLives(lives) {
	ctx.font = '16px Arial';
	ctx.fillStyle = "#0095DD";
	ctx.fillText(`Lives : ${lives}`, WIDTH-10*leftOffset, 18);
}

function endGame(msg) {
	alert(msg);
	document.location.reload();
	clearInterval(interval);
	score = 0;
	lives = 0;
}

function keyDown(event) {
	if (event.key == 'ArrowLeft') {
		paddle.moveLeft = true;
	}

	else if (event.key == 'ArrowRight') {
		paddle.moveRight = true;
	}

	paddle.update();
}

function keyUp(event) {
	if (event.key == 'ArrowLeft') {
		paddle.moveLeft = false;
	}

	else if (event.key == 'ArrowRight') {
		paddle.moveRight = false;
	}
	paddle.update();
}

function mouseMove(event) {
	var relx = event.clientX - canvas.offsetLeft;
	if (relx > 0 && relx < WIDTH) {
		paddle.x = relx - paddle.width / 2;
	}
}

function get_color() {
	let index = Math.floor(Math.random() * length) + 1;
	color = colors[index];
	return color;
}

function print() {
	console.log(arguments)
}