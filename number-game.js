let answer;
let guess;
let previousGuesses = "";
setup();

var confetti;

function setup(){
	setAnswer();

	// set button listeners
	const submit = document.querySelector("#submitButton");
	submit.addEventListener("click", onSubmitGuess);

	const reset = document.querySelector("#resetButton");
	reset.addEventListener("click", resetGame);
	
	const guessField = document.querySelector("#guessInput");

}

function setAnswer(){
	//choose a random number as answer	
	answer = Math.floor(Math.random()*100)+1;
	
}

let turnNumber = 0;

function resetGame(){
	//generate new random number
	setAnswer();
	//reset turn number to 0
	turnNumber = 0;
	//hide the 'why it's wrong' message

	//clear result
	document.querySelector("#result").innerText = "";

	clearDisplayAnswer();
	
	enableButton();
	
	resetGuesses();

	//stop confetti
	clearConfetti();
}

function resetGuesses(){
		//reset previous guesses
	previousGuesses = "";
	//clear display of previous guesses
	document.querySelector("#previousGuesses").innerText = "";
}

function clearDisplayAnswer(){
	document.querySelector("#theAnswer").innerText = "";

}

function showConfetti(){
	
	//setup confetti generator
	var confettiSettings = { target: 'my-canvas',
											rotate:true,
											props:['line', 'circle']};
	confetti = new ConfettiGenerator(confettiSettings);
	
	confetti.render();
}

function clearConfetti(){
	confetti.clear();
}

//guessField.addEventListener("keyup", grabGuess)

function grabGuess(){
	//grab value of guessInput
	guess = document.querySelector("#guessInput").value;
}

function onSubmitGuess(){
	grabGuess();
	//clear input
	document.querySelector("#guessInput").value = "";
	
	//checks to see if the guess is a number
	//if guess is not a number, it will let the user know and return early
	if(!isGuessANumber(guess)){
		displayInvalidGuess();
		//clear results
		document.querySelector("#result").innerText = "";
		return;
	}
	
	clearDisplayInvalidGuess();
	
	//compare it to the answer aka random number
	//if correct, show 'congrats' message
	if(guess == answer){
		document.querySelector("#result").innerText = "CONGRATS!";
		document.querySelector("#result").style.color = "green";
		showConfetti();
	} else {
		document.querySelector("#result").style.color = "red";
		
		turnNumber = turnNumber + 1;
		
		//if wrong
	//check if this is their 10th guess
		if(turnNumber > 9){
			//if it is, show losing message (function)
			document.querySelector("#result").innerText = "GAME OVER"
			displayAnswer();
			disableButton();
			return;
		}
		//add user's guess to 'previous guesses'
		appendGuess(guess);
		displayGuesses();
		if(guess > answer){
			//show 'why it's wrong' message
			document.querySelector("#result").innerText = "wrong, guess too high";
		} else if (guess < answer){
			document.querySelector("#result").innerText = "wrong, guess too low";
		}	
	}
}

function disableButton(){
	document.querySelector("#submitButton").disabled = true;
}
	
function enableButton(){
	document.querySelector("#submitButton").disabled = false;
}

function appendGuess(guess) {
	previousGuesses = previousGuesses + guess + " ";
	
}

function displayGuesses() {
	if(previousGuesses.length > 0){
		document.querySelector("#previousGuesses").innerText = "Previous Guesses: " + previousGuesses;
	}
}

function displayAnswer(){
	document.querySelector("#theAnswer").innerText = "The answer is " + answer + "!";
}


function isGuessANumber(guess){
	if(Number.isNaN(parseInt(guess)) === true){
		return false;
	} else {
		return true;
	}
}

function displayInvalidGuess(){
	document.querySelector("#invalidGuess").innerText = "Guess must be a number.";
}

function clearDisplayInvalidGuess(){
	document.querySelector("#invalidGuess").innerText = "";
}

document.querySelector("#guessInput").addEventListener("keyup", function(event){
	if(event.keyCode === 13){
		event.preventDefault();
		document.querySelector("#submitButton").click();
	}
});