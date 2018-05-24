//Tutorial from https://youtube.com/watch?v=c_ohDPWmsM0 and http://www.developphp.com/video/JavaScript/Memory-Game-Programming-Tutorial

document.addEventListener("DOMContentLoaded", function(event) {});

//create card array with fa icons and define variables

let cardArray = ["fa-database", "fa-desktop", "fa-keyboard", "fa-microchip", "fa-save", "fa-laptop", "fa-server", "fa-mobile-alt", "fa-database", "fa-desktop", "fa-keyboard", "fa-microchip", "fa-save", "fa-laptop", "fa-server", "fa-mobile-alt"];

let score = document.getElementsByClassName("moves");
let star = document.getElementsByClassName("stars");
let timer = document.getElementsByClassName("time");
let cardsFlipped = 0;
let flippedCards = [];
let moves = 0;
let matches = 0;
let mcard = document.getElementsByClassName("mcard");
 
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
 
 function createDeck(){
	 cardsFlipped = 0;
	 let output = '';
	 shuffle(cardArray);
	 for (let i = 0; i < cardArray.length; i++){
		 $(".deck").append('<li class="mcard" id = "tile_'+[i]+' "onclick ="flipCards(this,\' '+cardArray[i]+'\')"><i class="fas ' + cardArray[i] + '></i></li>');
	 }
	// $(".deck").innerHTML = output;
}
 createDeck();
 
 //game play
 
 function flipCards(tile,val){
	 if (tile.innerHTML == "" && flippedCards.length < 2){
		 tile.classList.add("open", "show");
		 if (flippedCards.length == 0){
			 flippedCards.push(val);
		} else if (flippedCards.length == 1){
			flippedCards.push(val);
			if (flippedCards[0] == flippedCards[1]){
				matches +=2;
				moves ++;
				flippedCards = [];
				if (matches == cardArray.length){
					alert("Board cleared");
				} else {
					function flip2back(){
						flippedCards[0].removeClass('open show');
						flippedCards[1].removeClass('open show');
						flippedCards = [];
					}
						setTimeout(flip2back, 500);
				}
			}
		}
	 }
 }