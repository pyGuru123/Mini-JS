const body = document.querySelector('body');
const header = document.querySelector('.header')
const searchdiv = document.querySelector('.searchdiv')
const pinbtn = document.querySelector('.bypin');
const distbtn = document.querySelector('.bydist');
const box = document.querySelector('.box');

states_json = 'https://raw.githubusercontent.com/pyGuru123/Mini-JS/main/CoWin%20Vaccines/states.json'

body.onload = function(){
	pinbtn.click();
}

pinbtn.onclick = function() {
	pinbtn.style.color = 'rgb(120,148,213)';
	pinbtn.style.borderBottomColor = 'rgb(24,72,148)';
	distbtn.style.color = 'rgb(124,126,125)';
	distbtn.style.borderBottomColor = 'rgb(16,25,32)'

	searchbypinDOM();
}

header.onclick = function(){
	location.reload();
}

distbtn.onclick = function() {
	distbtn.style.color = 'rgb(120,148,213)';
	distbtn.style.borderBottomColor = 'rgb(24,72,148)';
	pinbtn.style.color = 'rgb(124,126,125)';
	pinbtn.style.borderBottomColor = 'rgb(16,25,32)'

	searchbydistDOM();
}

function searchbypinDOM() {
	box.innerHTML = `
		<label> Pincode </label>
		<input type="input" class="getpin" placeholder="201010"><br/>
		<label class='labelup'> Date </label>
		<input type="input" class="getdate" placeholder="01-01-2022">
		<label> Dose </label>
		<input type="radio" name="dose" id="dose1" value="dose1"> <span class='radio'>Dose 1</span>
		<input type="radio" class="radio2" name="dose" id="dose2" value="dose1"> <span class='radio'>Dose 2</span>
		<button class='searchpin'> FIND A SLOT </button>
	`;

	var searchbypin = document.querySelector('.searchpin')
	searchbypin.onclick = function() {
		var pin = document.querySelector('.getpin');
		var date = document.querySelector('.getdate');
		var dose1 = document.querySelector('input[id="dose1"]');
		var dose2 = document.querySelector('input[id="dose2"]');
		var dose = ''; 
		if (dose1.checked) {
			dose = dose1.value;
		}
		else if (dose2.checked) {
			dose = dose2.value;
		}

		var apiendpoint = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin.value}&date=${date.value}`;

		if (pin.value.length == 6 && date.value && dose){
			console.log(apiendpoint);
			fetch(apiendpoint)
			.then(response => response.json())
			.then(data => showResult(data, dose));
		}
	}
}

function searchbydistDOM() {
	box.innerHTML = `
		<label> Select State </label>
		<select class="stateselect" id="names" placeholder="select">
			<option value=""> State </option>
		</select>
		<label class="labelup2"> Select District </label>
		<select class="distselect" id="district">Select</select>
		<label class='labelup2'> Date </label>
		<input type="input" class="getdate" placeholder="01-01-2022">
		<label class="distdose"> Dose </label>
		<input type="radio" name="dose" id="dose1" value="dose1"> <span class='radio'>Dose 1</span>
		<input type="radio" class="radio2" name="dose" id="dose2" value="dose1"> <span class='radio'>Dose 2</span>
		<button class='searchdist'> FIND A SLOT </button>
	`;

	var stateslist = document.querySelector('.stateselect');
	var districtslist = document.querySelector('.distselect');
	var searchdist = document.querySelector('.searchdist');

	fetch(states_json)
	.then(response => response.json())
	.then(data => {
		states = data["states"];
		for (var i=0; i<states.length; i++) {
			state = states[i];
			id = state["state_id"];
			state = state["state_name"];
			var option = document.createElement('option')
			option.value = id;
			option.text = state;
			stateslist.appendChild(option)
		}
	})

	stateslist.addEventListener('change', () => {
		state = stateslist.value;
		districtslist.length = 0;
		if (state) {
			let url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state}`

			fetch(url)
			.then(response => response.json())
			.then(data => {
				districts = data["districts"];
				for (var i=0; i<districts.length; i++) {
					district = districts[i];
					id = district["district_id"];
					state = district["district_name"];
					var option = document.createElement('option')
					option.value = id;
					option.text = state;
					districtslist.appendChild(option)
				}
			})
		}
	})

	searchdist.onclick = function() {
		var dist = document.querySelector('.distselect');
		var date = document.querySelector('.getdate');
		var dose1 = document.querySelector('input[id="dose1"]');
		var dose2 = document.querySelector('input[id="dose2"]');

		var dose = ''; 
		if (dose1.checked) {
			dose = dose1.value;
		}
		else if (dose2.checked) {
			dose = dose2.value;
		}

		if (dist.value && date.value && dose){
			var apiendpoint = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${dist.value}&date=${date.value}`
			console.log(apiendpoint);
			fetch(apiendpoint)
			.then(response => response.json())
			.then(data => showResult(data, dose));
		}
	}
}

function showResult(data, dose){
	searchdiv.innerHTML = `
		<p class='available'> Available slots </p>
	`;

	sessions = data["sessions"];
	for (var i=0; i<sessions.length; i++) {
		session = sessions[i];
		available_doses = session[`available_capacity_${dose}`]
		if (available_doses > 0) {
			var result = document.createElement('div')
			result.setAttribute('class', 'result')
			result.innerHTML = `
				<div class='divleft'> 
					<p class="cname">${session["name"]} <span>(${session["fee_type"]})</span></p>
					<p class="address">${session["address"]}, ${session["block_name"]}
				</div>
				<div class="divright">
					<div class="divupper">
						<p>${session["date"]}</p>
						<p class="vaccine">${session["vaccine"]}</p>
						<p>Age ${session["min_age_limit"]}+</p>
					</div>
					<div class="divbelow">
						<p>Book (${available_doses})</p>
					</div>
				</div>						
			`
			searchdiv.appendChild(result);
		}
	}
}