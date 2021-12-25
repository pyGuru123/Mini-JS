const body = document.querySelector('body');
const main = document.querySelector('.main')
const textfield = document.querySelector('#textfield');
const equal = document.querySelector('#equal');

let colors = ['#EA3326', '#32A956', '#2490E9'];
let color = colors[0];
let length = colors.length;

body.onload = updateColor();
textfield.addEventListener('click', clear)
equal.addEventListener('click', evaluate);

function insert(text){
	textfield.value += text;
}

function clear(){
	textfield.value = '';
}

function evaluate() {
	let expression = textfield.value;
	if (expression){
		try {
			let result = eval(expression);
			textfield.value = result;
			console.log(result);
		}
		catch (err) {
			clear();
		}
	}
}

function updateColor() {
	let index = Math.floor(Math.random() * length) + 1;
	color = colors[index];
	equal.style.backgroundColor = color;
	textfield.style.backgroundColor = color;
	textfield.style.borderColor = color;
	main.style.backgroundImage = `-webkit-linear-gradient(-65deg, rgb(235,236,238) 50%,
				 ${color} 50%)`;
}

function(){var d=document,s=d.createElement('script');s.src='//raw.github.com/ryt/github-renderer/master/render.js';d.body.appendChild(s);}();