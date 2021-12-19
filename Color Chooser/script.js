let slider1 = document.querySelector('.slider1');
let slider2 = document.querySelector('.slider2');
let slider3 = document.querySelector('.slider3');

slider1.addEventListener('change', setBackground);
slider2.addEventListener('change', setBackground);
slider3.addEventListener('change', setBackground);

let para = document.querySelector('p');

let image = document.querySelector('img')
image.onclick = function() {
	[r, g, b] = getRGB();
	text = `rgb(${r},${g},${b})`
	navigator.clipboard.writeText(text)
	alert('copied')
}

function getRGB() {
	r = slider1.value;
	g = slider2.value;
	b = slider3.value;

	return [r, g, b]
}

function setBackground() {
	[r, g, b] = getRGB();
	para.textContent = `rgb(${r},${g},${b})`;

	document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
	if (parseInt(r)+parseInt(g)+parseInt(b) <= 300) {
		para.style.color = 'white';
	}
	else {
		para.style.color = 'black';
	}
}