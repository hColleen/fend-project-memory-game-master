//Tutorial from https://www.youtube.com/watch?v=_rUH-sEs68Y&feature=youtu.be

//create card array with fa icons and define variables

let cardArray = ["fa-database", "fa-desktop", "fa-keyboard", "fa-microchip", "fa-save", "fa-laptop", "fa-server", "fa-mobile-alt", "fa-database", "fa-desktop", "fa-keyboard", "fa-microchip", "fa-save", "fa-laptop", "fa-server", "fa-mobile-alt"];


let star = document.getElementsByClassName("stars");
let timer = document.getElementsByClassName("time");
let cardsFlipped = 0;
let matches = 0;

 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//shuffle cards and create deck
 
 function createDeck(card){
	 return '<li class = "mcard" data-card = "${card}"><i class = "fas ${card}"></i></li>';
	 }
 
 //game play
 
function initGame(){
	let deck = document.querySelector(".deck");
	let score = document.querySelector(".moves");
	
	let cardHTML = shuffle(cardArray).map(function(card){
		return createDeck(card);
	});
	moves = 0;
	score.innerText = moves;
	deck.innerHTML = cardHTML.join('');
}

let allCards = document.querySelectorAll(".mcard");
let flippedCards = [];
let moves = 0;

initGame();