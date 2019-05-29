//Created by Boon and Brady
var cards = document.getElementsByClassName('card-back-content');

//iteration and splicing



let terms = []
for(var i = 0; i < 6; i++){
  terms.push('dog', 'cat');
};

alert(terms);


window.onload = function(){
 for(let card of cards){
   let int = Math.floor(Math.random() * terms.length);
   $(card).html(terms[int]);
   terms.splice(int,1);
   console.log(card.text);
 }
};

$( document ).ready(function() {
  var cardsFlipped = []

  function flipCardUp(card) {
    $(card).addClass("flipped");
    cardsFlipped.push(card);
  }

  function flipCardDown(card) {
    $(card).removeClass("flipped");
  }

  function cardsMatch(cardList) {
    // TODO: check if cardlist match
    return false;
  }

  $('.card-outer').click(function() {
    if (cardsFlipped.length < 2) {
      flipCardUp(this);
      setTimeout(function() {
        if (cardsFlipped.length == 2) {
          if (cardsMatch(cardsFlipped)) {
            // Good condition
          }
          else {
            flipCardDown(cardsFlipped[0]);
            flipCardDown(cardsFlipped[1]);
            cardsFlipped = []
          }
        }
      }, 2500);
    }
  });
});
