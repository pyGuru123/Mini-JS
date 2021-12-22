let button = document.querySelector('button')
let span = document.querySelector('.quote')
let h5 = document.querySelector('h5')

let api_endpoint = 'https://api.quotable.io/random'
let quote, author, color='#6C757D';

let colors = ['#FAAB1C', '#2490E9','#E46E63', '#6C757D', '#75D5FD',
			  '#32A956', '#367055']
let length = colors.length

button.addEventListener('click', get_quote)
button.onmouseover = function() {
	button.style.backgroundColor = color;
	button.style.border = `1px solid ${color}`
}
button.onmouseout = function() {
	button.style.backgroundColor = 'rgb(100,182,172)';
	button.style.border = `1px solid rgb(100,182,172)`
}

function get_quote() {
	let content;
	fetch(api_endpoint)
	.then(response => response.json())
	.then(data => update_quote(data));
	update_color();
}

function update_quote(data) {
	quote = '  ' + data['content'];
	author = '- ' + data['author']
	span.textContent = quote;
	h5.textContent = author;
}

function update_color() {
	let index = Math.floor(Math.random() * length) + 1;
	color = colors[index];
	document.body.style.backgroundColor = color;
}