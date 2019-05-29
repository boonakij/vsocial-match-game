//Created by Boon and Brady
var cards = document.getElementsByClassName('card-back-content');

//Terms to populate with
let terms = []
for(var i = 0; i < 6; i++){
  terms.push('dog', 'cat');
};

//Random loading of temrms,
window.onload = function(){
 for(let card of cards){
   let int = Math.floor(Math.random() * terms.length);
   $(card).html(terms[int]);
   terms.splice(int,1);
 }
};


$( document ).ready(function() {
  var cardsFlipped = []

  function flipCardUp(card) {
    if ($(card).hasClass("flipped")) return;
    $(card).addClass("flipped");
    cardsFlipped.push(card);
  }

  function flipCardDown(card) {
    $(card).find(".cross").fadeIn().delay(1000).fadeOut(function() {
      $(card).removeClass("flipped");
    });
    // $(card).removeClass("flipped");
  }

  function markCardComplete(card) {
    $(card).find(".checkmark").fadeIn().delay(1000).fadeOut(function() {
      $(card).addClass("complete");
    });
  }

  function cardsMatch(cardList) {
    if($(cardList[0]).find(".card-back-content").html() == $(cardList[1]).find(".card-back-content").html()){
      return true;
    }
    else{
      return false;
    }
};

  $('.card-outer').click(function() {
    console.log(cardsFlipped);
    if (cardsFlipped.length < 2) {
      flipCardUp(this);
      setTimeout(function() {
        if (cardsFlipped.length == 2) {
          if (cardsMatch(cardsFlipped)) {
            markCardComplete(cardsFlipped[0]);
            markCardComplete(cardsFlipped[1]);
            cardsFlipped = [];
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
