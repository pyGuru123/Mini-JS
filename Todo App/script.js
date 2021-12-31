const body = document.querySelector('body');
const ctime = document.querySelector('.ctime');
const cdate = document.querySelector('.cdate');
const input = document.querySelector('input');
const add = document.querySelector('button');
const ul = document.querySelector('ul');
const trash = document.querySelector('.fa')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
			'Friday', 'Saturday'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

body.onload = getDateTime();
function getDateTime() {
	let today = new Date();
	let hour = formatTime(today.getHours());
	let minutes = formatTime(today.getMinutes());
	let time = hour + ':' + minutes;
	ctime.textContent = time;

	let day = days[today.getDay()];
	let month = months[today.getMonth()];
	let year = today.getFullYear().toString().substr(-2)
	let date = `${day}, ${month} ${year}`;
	cdate.textContent = date;

	setTimeout(getDateTime, 1000);
}

add.addEventListener('click', addTask);
function addTask() {
	let task = input.value;
	if (task) {
		task = task.charAt(0).toUpperCase() + task.slice(1);
		var li = document.createElement('li');
		li.innerHTML = `${task} <i class="fa fa-trash" job="rem"></i>`;
		ul.appendChild(li);
		input.value = '';
		input.focus();
	}
}

input.addEventListener('keyup', function(event) {
	if (event.keyCode == 13) {
		add.click();
	}
})

ul.addEventListener('click', function(event) {
	element = event.target;
	if (element.attributes.length > 1) {
		if (event.target.attributes.job.value == 'rem') {
			ul.removeChild(element.parentNode)
		}
	}
})

ul.addEventListener('click', function(event) {
	li = event.target;
	if (event.target.tagName == 'LI') {
		let decoration = li.style.textDecoration;
		if (decoration != 'line-through'){
			li.style.textDecoration = 'line-through';
		}
		else {
			li.style.textDecoration = 'none';
		}
	}
})
	
function formatTime(num) {
	return ("0" + num).slice(-2);
}