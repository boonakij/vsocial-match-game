//Created by Boon and Brady

function Shuffle(array) {//Shuffle function borrowed from Stack Overflow
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
};

let ImageAssignment = function(card, key){ //Assignment of image to card based on key provided
    $(card).find(".card-back-content").html('');
    let card_back = card.getElementsByClassName('card-back-content');
    $(card).find(".card-back").css("background-image", "url(" + dict.get(key) + ")");
    $(card).data("key", dict.get(key));
};

let KeyListCreation = function(dict){ //Creation of list of keys based on dictionary
  let keys = new Array();
  for(let key of dict.keys()){
    keys.push(key);
  }
  return keys;
};

var cards= document.getElementsByClassName('card-outer');

//Terms to populate with
let dict = new Map();
dict.set('dog',"./images/dog.jpeg")
    .set('cat',"./images/cat.jpeg");


// let n = prompt("How many cards would you like to play with?");
let n = 12 //Hardcode

let random = new Array();//Creation of random array to distribute
for(let i = 0; i < n; i++){
  random.push(i);
};
Shuffle(random);

let keys = KeyListCreation(dict); //creation of list of keys

//Random loading of terms,
window.onload = function(){

 do{
   let int = Math.floor(Math.random() * keys.length);
   let card1 = cards[random.pop()];
   $(card1).find(".card-back-content").html(keys[int]);

   card2 = cards[random.pop()];
   ImageAssignment(card2,$(card1).find(".card-back-content").html());
  }
  while(random.length != 0);
};

/////////////////////////////////////////////////////////

$( document ).ready(function() {
  var cardsFlipped = [];
  var turnCount = 0;

  $("#gameWonModal-button").click(function() {
    $("#gameWonModal").slideUp(1000, function() {
      location.reload();
    });
  });

  $("#gameStartModal-button").click(function() {
    $("#gameStartModal").slideUp(1000, function() {
    });
  });


  function flipCardUp(card) {
    if ($(card).hasClass("flipped")) return;
    $(card).addClass("flipped");
    cardsFlipped.push(card);
  }

  function flipCardDown(card) {
    $(card).find(".cross").fadeIn().delay(1000).fadeOut(function() {
      $(card).removeClass("flipped");
    });
  }

  function markCardComplete(card) {
    $(card).find(".checkmark").fadeIn().delay(1000).fadeOut(function() {
      $(card).addClass("complete");
      if (gameWon()) {
        $("#turnCountLabel").html(turnCount);
        $("#gameWonModal").slideDown(1000);
      }
    });
  }

  function cardsMatch(cardList) {
    console.log(dict.get($(cardList[0]).find(".card-back-content").html()))
    console.log($(cardList[1]).data("key"));
    if(dict.get($(cardList[0]).find(".card-back-content").html()) == $(cardList[1]).data("key")){ //Condense this, reads undefined as true
      if(dict.get($(cardList[1]).find(".card-back-content").html()) == $(cardList[0]).data("key")){
        console.log("returned true");
        return true;
    }
  }
    else{
      return false;
    }
  };

  function gameWon() {
    console.log($(".complete").length);
    console.log($(".card-outer").length);
    if ($(".complete").length == $(".card-outer").length) return true;
    return false
  }

  $('.card-outer').click(function() {
    console.log(cardsFlipped);
    if (cardsFlipped.length < 2) {
      flipCardUp(this);
      setTimeout(function() {
        if (cardsFlipped.length == 2) {
          turnCount++;
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
