let file = "./wordlist.txt"
	var wordList

	var dont_use_æøå = false
	var replace_æøå = true
	var add_number = false
	var capitalize_word = false
	var amount = 5
	var seperator = '-'

	// Returns random word from wordlist
	// Trims before return
	function randomWord(array){
		return array[Math.floor(Math.random() * wordList.length)].trim();
	}

	// Select and transform word if required
	function generateWord(array){
		word = randomWord(array)
		const conditions = ["æ", "ø", "å"];
		if(dont_use_æøå && conditions.some(el => word.includes(el))){
			if(replace_æøå){		
				word = word.replace(/æ/g,'ae')
				word = word.replace(/ø/g,'oe')
				word = word.replace(/å/g,'aa')
			}else{
				while(conditions.some(el => word.includes(el))){
					word = randomWord(array)
				}
			}
		}
		return word.toLowerCase()
	}

	// Return ransom integer between two numbers, both included
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
	}

	// Capitalize first letter of word
	function capitalize(word){
		return word.charAt(0).toUpperCase() + word.slice(1)
	}

	// Generate full passphrase
	function generatePassphrase(){
		var randomWordPosition //Random position to add number
		var phrase = ""

		// Check if number is required and find random position for number
		if(add_number){
			randomWordPosition = getRandomIntInclusive(0, amount-1)
		}

		// Capitalize word if required
		if(capitalize_word){
			result = capitalize(result)
		}
	
		// For required amount of words in passphrase, loop word generation
		for (let i = 0; i < amount; i++) {

			result = generateWord(wordList)

			if(capitalize_word){
				result = capitalize(result)
			}

			if(add_number&&randomWordPosition==i){
				randomNumber = getRandomIntInclusive(0,9)
				result += randomNumber
			}

			phrase += result

			if(i<amount-1){
				phrase += seperator
			}
		}
		//console.log(zxcvbn(phrase))
		document.getElementById("passphrase").innerHTML = phrase;
	}

	function useÆØÅ(){
		dont_use_æøå = false
		generatePassphrase()	
	}

	function replaceÆØÅ(){
		dont_use_æøå = true;
		replace_æøå = true
		generatePassphrase();
	}

	function changeSeperator(){
		seperator = document.getElementById('seperator').value
		generatePassphrase();
	}

	function noUseÆØÅ(){
		dont_use_æøå = true;
		replace_æøå = false
		generatePassphrase();
	}

	function changePassphraseFontSize(words){
		passphrase = document.getElementById('passphrase')
		size = "2rem"
		if(words > 6 && words < 10){
			size = "1.75rem"
		}else if(words > 9 && words < 16){
			size = "1.5rem"
		}else if(words > 15 && words < 21){
			size = "1.25rem"
		}
		passphrase.style.fontSize = size
	}

	function changeWordAmount(){
		wordAmount = document.getElementById('wordRange').value
		document.getElementById('rangeval').innerText = wordAmount
		amount = wordAmount
		generatePassphrase()	
		changePassphraseFontSize(amount)
	}

	function useNumber(){
		add_number = !add_number;
		generatePassphrase();
	}

	function capitalizeSetting(){
		capitalize_word = !capitalize_word;
		generatePassphrase();
	}

	function clearCopyButton(){
		document.getElementById('copy').classList.remove('btn-success');
		document.getElementById('copy').classList.add('btn-outline-secondary');
		document.getElementById('copyIcon').classList.remove('bi-clipboard2-check');
		document.getElementById('copyIcon').classList.add('bi-clipboard2');	
		document.getElementById('copyText').textContent = ' Kopiér'
	}

	function copyEvent(){
        var str = document.getElementById('passphrase').innerHTML;
		navigator.clipboard.writeText(str)
		document.getElementById('copy').classList.remove('btn-outline-secondary');
		document.getElementById('copy').classList.add('btn-success');
		document.getElementById('copyIcon').classList.remove('bi-clipboard2');
		document.getElementById('copyIcon').classList.add('bi-clipboard2-check');		
		document.getElementById('copyText').textContent = ' Kopieret!'
		setTimeout(clearCopyButton, 2000);
    }

	async function getText(file) {
		let x = await fetch(file);
		let y = await x.text();
		//document.getElementById("passphrase").innerHTML = y;
		
		wordList = y.split('\n');
		generatePassphrase()	 		
	}

	getText(file)