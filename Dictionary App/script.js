const input = document.querySelector('input')
const button = document.querySelector('button')
const result = document.querySelector('.result')

var msg = new SpeechSynthesisUtterance();

button.onclick = function() {
	var word = input.value;
	if (word) {
		var url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
		fetch(url)
			.then(response => response.json())
			.then(data => update_result(word, data));
	}
}

function update_result(word,data) {
	console.log(data);
	var phonetic = data[0]["phonetics"][0]["text"]
	var partofspeech = data[0]["meanings"][0]["partOfSpeech"]
	var definition = data[0]["meanings"][0]["definitions"][0]['definition']
	var example = data[0]["meanings"][0]["definitions"][0]['example']
	result.innerHTML = `
			<h3>${word}</h3>
			<span>
				<i class="fas fa-volume-up"></i>
			</span>
			<p class='pos'>${partofspeech} / ${phonetic} /</p>
			<p class='meaning'>${definition}</p>
			<p class='example'>${example}</p>
		`

	var i = document.querySelector('i');
	i.addEventListener('click', function() {
		speak(word);
	})
}

function speak(text) {
	msg.text = text;
	window.speechSynthesis.speak(msg);
}