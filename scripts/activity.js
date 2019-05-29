//Created by Boon and Brady
var cards= document.getElementsByClassName('card-outer');

//Terms to populate with
let dict = new Map();

dict.set('dog',"./images/dog.jpeg")
    .set('cat',"./images/cat.jpeg");

//HardCoded, come back to fix later
let terms = ['dog','dog','dog','dog','dog','dog','cat','cat','cat','cat','cat','cat',];

console.log(dict);
console.log(terms);

//Random loading of terms,
//Random loading of temrms,
window.onload = function(){
 for(let card of cards){
   let int = Math.floor(Math.random() * terms.length); //HardCode Value)
   console.log(terms[int])
   $(card).find(".card-back-content").html(terms[int]);
   terms.splice(int,1);
 }
 ImageAssignment();
};

let ImageAssignment = function(){
  for(let card of cards){
    let card_back = card.getElementsByClassName('card-back-content');
    console.log(dict.get($(card_back).html()));
    $(card).find(".card-back").css("background-image", "url(" + dict.get($(card_back).html()) + ")");
    console.log($(card).find(".card-back").css("background-image"));
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
    $(card).removeClass("flipped");
  }

  function markCardComplete(card) {
    $(card).addClass("complete");
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
