/* The "Classy Lady Hang Now Word Guess" Game -- name by Adi Kamdar */

var letters = [];
var progress = [];
var guessed = [];
var deathCount;
var triesLeft;
var imgArray = ["file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman.gif ", "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman1.png", "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman2.png", "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman3.png", "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman4.png", "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman5.png", "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman6.png"];
var listWords = [];
 
// Do I need to wrap this in:
jQuery(document).ready(function(){
	startFresh();
})



// set the placement for the image

// event listeners
$("#word-submit-button").on('click', function(e){
	e.preventDefault();
	var word = $('#word').val();
	console.log(word);
	friendGame(word);
})

$("#guess-submit-button").on('click', function(e){
	e.preventDefault();
	var letter = $('#letter').val();
	console.log(letter);
	makeGuess(letter);
})


    $('#word-form').show();


// game functions

// game start
function startFresh(){
	letters = [];
	progress = [];
	guessed = [];
	deathCount = 0;
	triesLeft = 6;
	imgArray = [
	"file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman.gif ", 
	"file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman1.png",
	 "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman2.png", 
	 "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman3.png", 
	 "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman4.png", 
	 "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman5.png", 
	 "file:///C:/Users/Emily%20Gasca/src/_HangLady/static/img/hangman6.png"];
	listWords = ['the', 'your', 'daily', 'ritual', 'coffee'];
    $('#word-form').hide();
    $('#guess-form').hide();
	$("#play-again-butt").hide();
	// window.opener.location.reload();
}

// modifications
function modifyDiv(divName, newText, add) {
    var div = document.getElementById(divName);
    if (add==1) {
    div.innerHTML += newText;
    }
    else {
    	div.innerHTML = newText;
    }
}

function modifyImg(imgIdx) {
	var ladyImage = document.getElementsByTagName('img')[0];
	ladyImage.src = imgArray[imgIdx];
	console.log(ladyImage.src);
}

//game logics
function pickRandomWord() {
	/*
	import a dictionary? scrape something?
	perhaps pick "subjects" of words you could guess
	 */
	var random = Math.floor(Math.random()*10);
	if (random < listWords.length && random >= 0) {
		return listWords[random];	 	
	} else {
		return pickRandomWord();
	}
}

function makeWordArray(str) {
	// iterate through the word to pop it into an array
    var wordLength = str.length;
	for (var i = 0; i < wordLength; i++) {
		// console.log("Word started as: " + word);
    	var letter = str.slice(0, 1);
    	letters.push(letter);
    	progress.push(letter);
        // console.log(letters);
        str = str.substring(1);
      	// console.log("Word ends as: " + word);
	}
}

function changeProgress(word, length, first) {
	// iterate for length of word to add 
	newProgress = "<ul>"
	for (var i = 0; i < length; i++) {
    	if (first == true) {
    		progress.push('_');
    		newProgress += "<li>_</li>";
    	}
    	else {
    		newProgress += "<li>";
    		newProgress += word[i];
    		newProgress += "</li>";
		}
	}
	newProgress += "</ul>"
	console.log(progress)
	modifyDiv("prog-display", newProgress)
	checkStatus();
}

function makeString(array) {
	var string = '';
	for (var i = 0; i < array.length; i++) {
		string += array[i]; 
		if (array[i] == '_') {
			string += ' ';
		}
	}
	return string;
}

function checkStatus() {
	console.log("checking", progress)
	//if you dead
	if (deathCount > 5) {
		$("#guess-form").hide();
		modifyDiv("tries-until-death", "0");
		modifyDiv("notes", "Oy, that's 6 wrong guesses and ya died. D: Press 'New Game' to play again!", 0);
	}
	
	//if all are guessed, DONE WOO
	if (allGuessed() == true) {
		$("#guess-form").hide();
		modifyDiv("notes", "You guessed all the letters! Your word was: " + makeString(letters) + " Press 'New Game' to play again.", 0);
	}
}

function makeGuess(letterGuess) {
	// if guessed incorrectly 5 times, DEADZONE.
	checkStatus();
	modifyDiv("notes", "What letter would you like to guess?", 0);
	
	if ((isLetter(letterGuess) == false) && (guess.length == 1)) {
		modifyDiv("notes", "That's not a single letter. Please try again!", 0);
		makeGuess();
	}

	// check to see if the letter is already guessed so they don't duplicate tries and die early
	if (letterGuessed(letterGuess) == true) {
		modifyDiv("notes", "You already guessed that letter! It doesn't count as a death-inducing guess, so try again.", 0);
		makeGuess();
	}
	// FINALLY you can just use the letter for a guess
	else {
		guessed.push(letterGuess);
		guessLetter(letterGuess);
	}
}

function allGuessed() {
	for (var i = 0; i < progress.length; i++) {
		if (progress[i] == '_') {
			console.log(progress[i])
			console.log("found a _");
			return false;
		}
	}
	console.log("found no _")
	return true;
}

function isLetter(guess) {
	var onlyLetters = /^[a-zA-Z]+$/.test(guess);
	if (onlyLetters == false) {
		return false;
	}
	return true;
}

function letterGuessed(guess) {
	for (var i = 0; i < guessed.length; i++) {
		if (guessed[i] == guess) { return true;	}
	}
	return false;
}

function guessLetter(letter) {
	var foundOne = false;
	
	for (var i = 0; i < letters.length; i++) {
		if (letters[i] == letter) {
			if (foundOne == false) {
				modifyDiv("notes", "You've guessed a letter! '" + letter + "' is in the word.", 0);
				modifyLetter(letter, 1);
				foundOne = true;
			}
			// place the guessed word in the array
			progress[i] = letter;
			changeProgress(progress.slice(0,progress.length/2), progress.length/2, 0)
		}
	}
	if (foundOne == true) {
		foundOne = false;
	}
	else {
		triesLeft--;
		deathCount++;
		modifyDiv("notes", "I'm sorry, '" + letter + "' wasn't in the word. You have " + triesLeft + " tries left.", 0);
		modifyDiv("tries-until-death", triesLeft);
		modifyImg(deathCount);
		modifyLetter(letter, 0);
	checkStatus();
	}
}

function modifyLetter(letter, success) {
	// if success == 1, then the guess was good
	if (success == 1) {
		// so turn that letter green and bold it
		$("#" + letter).css("color", "green");
		$("#" + letter).css("font-weight", "bold");
	}
	// else success == 0, so the guess was wrong
	else {
		// so turn that letter red and strikethrough it
		$("#" + letter).css("color", "red");
		$("#" + letter).css("text-decoration", "line-through");
	}
}

function playAgain() {
	$("#guess-form").hide();
	$("#play-again-butt").show();
}

function friendPrompt() {
	modifyDiv("notes", "Alright, guesser, don't look! Word keeper, what shall the guesser try to guess? Type it in the box and hit submit.", 0)
    $('#word-form').show();
}

function friendGame(word) {
	// var word = prompt("Alright, guesser, don't look! Word keeper, what shall the guesser try to guess?", "Type guess here").toLowerCase();
	if (isLetter(word) == false) { 
		modifyDiv("notes", "Sorry, that's NOT a word. Try again!")
	}
	else {
		$('#word-form').hide();
		playGame(word);
	}
}

function randGame() {
	var word = pickRandomWord().toLowerCase();
	playGame(word);
}

function playGame(word) {
	var firstGo = true;
	modifyDiv("start-up", "")
	changeProgress(word, word.length, firstGo);
	makeWordArray(word);
	modifyDiv("notes", "<br/><br/>We've got the magic word.", 0)
    $('#guess-form').show();
}

function gallows() {
}

function popRules() {
	
}

// function Card(img, bunch, id, reverse) {
//   var self = this;
  
//   this.img     = img;
//   this.bunch   = bunch;
//   this.id      = id;
//   this.reverse = reverse;

//   this.suit    = Math.floor(id / self.bunch.board.deck.cardSuit);
//   this.number  = Math.floor(id % self.bunch.board.deck.cardSuit) + 1;
//   this.color   = Math.floor(id / self.bunch.board.deck.cardSuit) % 2;

//   this.img.card = self;

// function makeCard(); 
// 	  this.createCard = function(bunch, id) {
// 	    var reverse = bunch.initialCardReverse();
// 	    var img     = self.createCardImg(bunch, id, reverse);
// 	    var card    = new Card(img, bunch, id, reverse);
	    
// 	    bunch.addCard(card);
// 	    self.div.appendChild(img);
// 	  }

// 	this.createCardImg = function(bunch, id, reverse) {
// 	    var zIndex  = bunch.initialCardZIndex();
// 	    var left    = bunch.initialCardLeft();
// 	    var top     = bunch.initialCardTop();
// 	    var width   = self.deck.cardWidth;
// 	    var height  = self.deck.cardHeight;
// 	    var src     = self.deck.cardSrc(id, reverse);
	    
// 	    return( createImg("card" + String(id), "card", zIndex, left, top, width, height, src) );
// 	  }


// event handler listens for computer randomized button
// calls pickRandomWord();
// use js to make event handler that listens for a "play game button" to be pressed 
// form that shows up ONLY once or keep prompt?
