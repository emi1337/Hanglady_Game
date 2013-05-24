/* The "Classy Lady Hang Now Word Guess" Game -- name by Adi Kamdar */

/* fixes: I'm sorry, 'undefined' wasn't in the word. --> if you do same guess twice it successfully doesn't throw it into the count but then it thinks it ISN'T correct, so it marks you off a life. */

var letters = [];
var progress = [];
var guessed = [];
var deathCount;
var triesLeft;
var imgArray = [];


// Do I need to wrap this in:
jQuery(document).ready(function(){
	startFresh();
})

function startFresh(){
	letters = [];
	progress = [];
	guessed = [];
	deathCount = 0;
	triesLeft = 6;
	imgArray = [
	"../static/img/lady0.png", 
	"../static/img/lady1.png", 
	"../static/img/lady2.png", 
	"../static/img/lady3.png", 
	"../static/img/lady4.png", 
	"../static/img/lady5.png"];
    $('#word-form').hide();
    $('#guess-form').hide();
	$("#play-again-butt").hide();
	$('#num-tries-butt').show();
	$('#start-options').hide();
}

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

$("#five-chances-butt").on('click', function(e){
	e.preventDefault();
	imgArray = [
	"../static/img/lady0.png", 
	"../static/img/lady1.png", 
	"../static/img/lady2.png", 
	"../static/img/lady3.png", 
	"../static/img/lady4.png", 
	"../static/img/lady5.png", 
	"../static/img/lady.png"]
	triesLeft = 5;
	modifyDiv("tries-until-death", triesLeft);
	console.log("FIVE CHANCES");
	$('#num-tries-butt').hide();
	$('#start-options').show();
})

$("#six-chances-butt").on('click', function(e){
	e.preventDefault();
	imgArray = [
	"../static/img/lady0.png", 
	"../static/img/lady1.png", 
	"../static/img/lady2.png", 
	"../static/img/lady3.png", 
	"../static/img/lady4.png", 
	"../static/img/lady5.png", 
	"../static/img/lady6.png", 
	"../static/img/lady.png"];
	triesLeft = 6;
	modifyDiv("tries-until-death", triesLeft);
	console.log("SIX CHANCES");
	$('#num-tries-butt').hide();
	$('#start-options').show();
})

$("#seven-chances-butt").on('click', function(e){
	e.preventDefault();
	imgArray = [
	"../static/img/lady0.png", 
	"../static/img/lady1.png", 
	"../static/img/lady2.png", 
	"../static/img/lady3.png", 
	"../static/img/lady3b.png", 
	"../static/img/lady4.png", 
	"../static/img/lady5.png", 
	"../static/img/lady6.png", 
	"../static/img/lady.png"];
	triesLeft = 7;
	modifyDiv("tries-until-death", triesLeft);
	console.log("SEVEN CHANCES");
	$('#num-tries-butt').hide();
	$('#start-options').show();
})


// game functions

function toggleRules() {
	$('#rules').toggle();
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

function modifyStory() {
	if (imgArray[deathCount] == "../static/img/lady1.png") {
		modifyDiv("story", "Ahhh, the lady's head has been transported to the gallows! But she's not...not dead yet. I promise.")
	}
	else if (imgArray[deathCount] == "../static/img/lady2.png") {
		modifyDiv("story", "Oh no, now her torso is there! Stop screwing up your word. WHY DON'T YOU PSYCHICALLY KNOW THE ANSWERS?!")
	}
	else if (imgArray[deathCount] == "../static/img/lady3.png") {
		modifyDiv("story", "Aaaand there goes her left arm. But you still have a chance to save her, because it's magic that doesn't kill her until her whole body is uhhhh transported to the--okay, YOU try to explain the logic of this game without sounding insane...")
	}
	else if (imgArray[deathCount] == "../static/img/lady3b.png") {
		modifyDiv("story", "And her right!")
	}
	else if ((imgArray[deathCount] == "../static/img/lady4.png") && imgArray[deathCount-1] != "../static/img/lady3b.png") {
		modifyDiv("story", "And her right!")
	}
	else if ((imgArray[deathCount] == "../static/img/lady4.png") && imgArray[deathCount-1] == "../static/img/lady3b.png") {
		modifyDiv("story", "Oh, now she has her umbrella and/or walking stick with her. So NATURALLY that means she's closer to death--<b>it's why Mary Poppins would sporadically look grim.</b>")
	}
	else if ((imgArray[deathCount] == "../static/img/lady5.png") && (triesLeft > 0))  {
		modifyDiv("story", "I know in hangman, the legs get added one at a time, but she's a LADY who happens to be in a DRESS. Have some respect, my goodness.<br/><br/>Also she's not dead yet because she doesn't have her purse/lunchbox yet. Shut up.")
	}
	else if ((imgArray[deathCount] == "../static/img/lady5.png") && (triesLeft < 1))  {
		modifyDiv("story", "I know in hangman, the legs get added one at a time, but she's a LADY who happens to be in a DRESS. Have some respect, my goodness. <br/><br/>Also, you failed.")
	}
	else if ((imgArray[deathCount] == "../static/img/lady6.png") && (triesLeft < 1)) {
		modifyDiv("story", "<br/><br/> Oh, you failed.")
	}
}

//game logics
function pickRandomWord() {
	var random = Math.floor(Math.random()*376);
	if (random < listWords.length && random >= 0) {
		console.log(random)
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
	modifyStory();
	//if you dead
	if (triesLeft < 1) {
		$("#guess-form").hide();
		modifyDiv("tries-until-death", "0");
		modifyDiv("notes", "Oy, that's 6 wrong guesses and ya died her. D: The word was " + makeString(letters) + ".<br/><br/>Press 'New Game' to play again!", 0);
	}
	
	//if all are guessed, DONE WOO
	if (allGuessed() == true) {
		$("#guess-form").hide();
		modifyImg(imgArray.length-1);
		modifyDiv("notes", "You guessed all the letters! Your word was: " + makeString(letters) + ".<br/><br/> Press 'New Game' to play again.", 0);
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
		if (triesLeft == 1)	{
			modifyDiv("notes", "I'm sorry, '" + letter + "' wasn't in the word. You have " + triesLeft + " try left.", 0);
		}
		else {
			modifyDiv("notes", "I'm sorry, '" + letter + "' wasn't in the word. You have " + triesLeft + " tries left.", 0);
		}
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
	modifyDiv("start-up", "");
	modifyImg(0);
	changeProgress(word, word.length, firstGo);
	makeWordArray(word);
	modifyDiv("notes", "<br/><br/>We've got the magic word.", 0)
    $('#guess-form').show();
}

function gallows() {
}

function popRules() {
	
}


var listWords = ['attracted', 'candid', 'simplicity', 'marvelous','familiarity', 'ancient', 'armor', 'restfulness', 'company', 'together', 'modest', 'people', 'being', 'shown', 'through', 'began', 'which', 'interested', 'talked', 'along', 'softly', 'pleasantly', 'flowingly', 'seemed', 'drift', 'imperceptibly', 'world', 'remote', 'forgotten', 'country', 'gradually', 'spell', 'among', 'specters', 'shadows', 'antiquity', 'holding', 'speech', 'relic', 'exactly', 'would', 'speak', 'nearest', 'personal', 'friends', 'enemies', 'familiar', 'neighbors', 'spoke', 'bedivere', 'ganis', 'launcelot', 'galahad', 'other', 'great', 'names', 'table', 'unspeakably', 'faded', 'musty', 'presently', 'turned', 'might', 'weather', 'common', 'matter', 'transmigration', 'souls', 'transposition', 'epochs', 'bodies', 'heard', 'little', 'interested', 'answer',  'moment', 'silence', 'immediately', 'interrupted', 'droning', 'voice', 'salaried', 'century', 'round', 'belonged', 'knight', 'sagramor', 'desirous', 'observe', 'chainmail', 'breast',  'accounted', 'supposed', 'bullet', 'since', 'invention', 'firearms', 'perhaps', 'maliciously', 'soldiers."', 'acquaintance', 'smiled', 'modern', 'smile', 'general', 'centuries', 'muttered', 'apparently', 'himself', 'after', 'pause', 'added', 'myself', 'recovered', 'electric', 'surprise', 'remark', 'evening', 'steeped', 'dream', 'olden', 'while', 'windows', 'roared', 'eaves', 'corners', 'dipped', 'thomas', "malory's", 'enchanting', 'feast', 'prodigies', 'adventures', 'breathed', 'fragrance', 'obsolete', 'dreamed', 'again', 'midnight', 'length', 'another', 'nightcap', 'follows', 'reposeful', 'summer', 'landscape', 'lovely', 'dream', 'lonesome', 'sunday', 'smell', 'flowers', 'buzzing', 'insects', 'twittering', 'birds', 'there', 'people', 'wagons', 'nothing', 'going', 'mainly', 'winding', 'hoofprints', 'faint', 'trace', 'wheels', 'either', 'grass', 'wheels', 'apparently', 'broad', 'presently', 'years', 'cataract', 'golden', 'streaming', 'shoulders', 'along', 'around', 'poppies', 'sweet', 'outfit', 'walked', 'indolently', 'peace', 'reflected', 'innocent', 'circus', 'attention', 'startled', 'fantastic', 'every', 'indifferently', 'might', 'couple', 'happened', 'notice', 'change', 'hands', 'turned', 'stone', 'mouth', 'dropped', 'stared', 'timorously', 'picture', 'astonished', 'curiosity', 'touched', 'stood', 'gazing', 'stupefied', 'fascination', 'corner', 'should', 'instead', 'other', 'consider', 'spectacle', 'totally', 'overlook', 'merits', 'respect', 'another', 'puzzling', 'thing', 'display', 'magnanimity', 'surprising', 'young', 'thought', 'moved', 'approached', 'signs', 'began', 'appear', 'intervals', 'passed', 'wretched', 'cabin', 'thatched', 'small', 'fields', 'garden', 'patches', 'indifferent', 'state', 'cultivation', 'brawny', 'coarse', 'uncombed', 'their', 'faces', 'animals', 'women', 'towlinen', 'below', 'sandal', 'collar', 'girls', 'always', 'naked', 'nobody', 'seemed', 'these', 'talked', 'fetched', 'families', 'noticed', 'fellow', 'except', 'humble', 'salutation', 'response', 'pains', 'substantial', 'windowless', 'houses', 'scattered', 'among', 'wilderness', 'cabins', 'streets', 'crooked', 'alleys', 'unpaved', 'troops', 'children', 'played', 'noise', 'roamed', 'rooted', 'contentedly', 'reeking', 'wallow', 'middle', 'thoroughfare', 'suckled', 'family', 'distant', 'blare', 'military', 'music', 'noble', 'cavalcade', 'wound', 'glorious', 'plumed', 'helmets', 'flashing', 'flaunting', 'banners', 'doublets', 'horsecloths', 'gilded', 'spearheads', 'through', 'swine', 'brats', 'joyous', 'shabby', 'gallant', 'followed', 'alley',  'climbing', 'climbing',  'gained', 'breezy', 'height', 'where', 'castle', 'exchange', 'bugle', 'blasts', 'parley', 'walls', 'men-at-arms', 'hauberk', 'morion', 'marched', 'forth', 'halberd', 'shoulder', 'under', 'flapping', 'figure', 'dragon', 'displayed', 'great', 'gates', 'flung', 'drawbridge', 'lowered', 'swept', 'forward', 'frowning', 'arches', 'following', 'found', 'ourselves', 'paved', 'court', 'towers', 'turrets', 'stretching', 'sides', 'dismount', 'greeting', 'ceremony', 'running', 'intermingling', 'colors', 'altogether', 'pleasant', 'confusion'];
