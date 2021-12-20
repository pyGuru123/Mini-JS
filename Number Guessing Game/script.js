let width = 500;
let height = 300;

let number = genRandom();
let guesses = ' ';
let numGuess = 10;

let box = document.querySelector('.main')
let input = document.querySelector('input')
let button = document.querySelector('.submit')

let previous = document.querySelector('.previous')
let result = document.querySelector('.result')
let span = document.querySelector('span')

button.onclick = function() {
	if (previous.textContent == ' ') {
		previous.textContent = 'Previous guesses: '
	}

	if (numGuess > 0) {
		value = input.value;
		input.value = '';

		if (value == '') {
			value = '0'
		}

		if (value == number) {
			result.textContent = 'You guessed it right';
			result.style.backgroundColor = 'rgb(35,134,54)';
			previous.textContent = previous.textContent + `${value} `
			gameOver();
		}
		else if (value < number) {
			result.textContent = 'Wrong! Last guess was too Low!'
			result.style.backgroundColor = 'rgb(255, 0, 0)';
			previous.textContent = previous.textContent + `${value} `
		}
		else {
			result.textContent = 'Wrong! Last guess was too High!'
			result.style.backgroundColor = 'rgb(255, 0, 0)';
			previous.textContent = previous.textContent + `${value} `
		}

		numGuess -= 1
		span.textContent = numGuess
		input.focus()

		if (numGuess == 0) {
			result.textContent = '!!!GAME OVER!!!'
			result.style.backgroundColor = 'rgb(255, 0, 0)';
			gameOver()
		}
	}
}

function genRandom() {
	num = Math.random();
	return parseInt(num * 100) + 1
}

function gameOver() {
	input.disabled = true;
	button.disabled = true;
	reset = document.createElement('button');
	reset.textContent = 'Start New Game';
	reset.style.marginLeft = `${width/2 - 35}px`;
	box.append(reset);
	reset.addEventListener('click', restartGame);
}

function restartGame() {
	number = genRandom();
	numGuess = 10

	input.disabled = false;
	button.disabled = false;

	previous.textContent = ' ';
	result.textContent = '';
	result.style.backgroundColor = 'rgb(255,0,120)';

	reset.parentNode.removeChild(reset);
	span.textContent = numGuess
}