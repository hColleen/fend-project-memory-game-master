//Tutorial from https://www.youtube.com/watch?v=_rUH-sEs68Y&feature=youtu.be
//Modal styling from https://www.w3schools.com/howto/howto_css_modals.asp

//create card array with fa icons and define variables
var cards = ["fa-database", "fa-desktop", "fa-keyboard", "fa-microchip", "fa-save", "fa-laptop", "fa-server", "fa-mobile-alt", "fa-database", "fa-desktop", "fa-keyboard", "fa-microchip", "fa-save", "fa-laptop", "fa-server", "fa-mobile-alt"];
var star = document.querySelectorAll(".fa-star");
var rate = 3;
var timer = document.querySelector(".time");
var cardsFlipped = 0;
var score = document.querySelector(".moves");
var reset = document.querySelector(".restart");
var openCards = [];
var moves = 0;
var time;
var timerCount = false;
var seconds = 0;
var modal = document.getElementById("winModal");
var close = document.getElementsByClassName("close")[0];
var modalText = document.querySelector("#modalText");
var modalRestart = document.querySelector(".modalRestart");

 
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

//create HTML for cards
function generateCard(card){
	 return `<li class = "card" data-card = "${card}"><i class = "fas ${card}"></i></li>`;
}

 //generate cards, shuffle them, reset timer, move counter, and rating
function initGame(){
	var deck = document.querySelector(".deck");

	var cardHTML = shuffle(cards).map(function(card) {
		return generateCard(card);
	});
	moves = 0;
	score.innerText = moves;
	seconds = 0;
	timer.innerHTML = seconds;
	resetTime();
	resetStar();
	deck.innerHTML = cardHTML.join('');
	playGame();
	modal.style.display = "none";
	cardsFlipped = 0;
}

//reset number of stars
function resetStar(){
	star[0].style.visibility = "visible";
	star[1].style.visibility = "visible";
	rate = 3;
}

//timer
function countTime(){
	timerCount = true;
	time = setInterval(function(){
		timer.innerHTML = seconds;
		seconds ++;
	}, 1000);
}

//reset timer
function resetTime(){
	clearInterval(time);
	seconds = 0;
	timer.innerHTML = seconds;
	timerCount = false;
}

function winModalDisplay(){
	modal.style.display = "block";
	if (rate === 3){
	modalText.innerHTML = ('You cleared the board in '+seconds+' seconds. You\'ve got a super harddrive <i class = "fas fa-hdd"></i><br /> 3 star rating <i class = "fas fa-star"></i> <i class = "fas fa-star"></i> <i class = "fas fa-star"></i>');
	} else if (rate === 2){
	modalText.innerHTML = ('You cleared the board in '+seconds+' seconds. You might need an upgrade <i class = "fas fa-download"></i><br /> 2 star rating <i class = "fas fa-star"></i> <i class = "fas fa-star"></i>');
	} else {
	modalText.innerHTML = ('You cleared the board in '+seconds+' seconds. You might need more memory <i class = "fas fa-memory"></i><br /> 1 star rating <i class = "fas fa-star"></i>');
	}
	close.onclick = function(){
	modal.style.display = "none";
	};
	window.onclick = function(event){
	if(event.target == modal){
		modal.style.display = "none";
		}
	};
}

//game play function
function playGame(){
	//create all card variable after cards are created
	var allCards = document.querySelectorAll(".card");
	allCards.forEach(function(card){
		card.addEventListener('click', function(e){
			//check if card open, or matched
			if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){
					//start timer if not started
					if (timerCount === false){
						countTime();
					}
					//show cards
					card.classList.add('open', 'show');
					openCards.push(card);
					//if two cards open, compare
					if (openCards.length == 2){
						if (openCards[0].dataset.card == openCards[1].dataset.card){
							openCards[0].classList.add('match');
							openCards[1].classList.add('match');
							cardsFlipped += 2;
							openCards = [];
							
							//check game end state
							if (cardsFlipped === cards.length){
								clearInterval(time);
								winModalDisplay();
							}
						} else {
							//flip cards back
							setTimeout(function(){
								openCards.forEach(function(card){
									card.classList.remove('open', 'show');
								});
								openCards = [];
							}, 700);
						}
						
					//move counter an star ranking
					moves += 1;
					score.innerText = moves;
					if (moves > 16){
						star[0].style.visibility = "hidden";
						rate = 2;
					}
					if (moves > 24){
						star[1].style.visibility = "hidden";
						rate = 1;
					}
				}
			}
		});
	});
}

//create cards, set move counter and time to zero
initGame();

	//reset game
	reset.addEventListener('click', function(event){
		initGame();
	});
	
	modalRestart.addEventListener('click', function(event){
		initGame();
	});