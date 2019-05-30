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
let n = 18 //Hardcode

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
  var readingTimeOn = false;
  var readingTimeEnd = null;
  var readingTimeLength = 10000;


  $("#gameWonModal-button").click(function() {
    $("#gameWonModal").slideUp(1000, function() {
      location.reload();
    });
  });

  $("#gameStartModal-button").click(function() {
    $("#gameStartModal").slideUp(1000, function() {
    });
  });

  function flipCardUp(card, id) {
    if ($(card).hasClass("flipped")) return;
    $(card).addClass("flipped");
    var cardId = "focused" + id;
    card.setAttribute("id", cardId);
    var translateX = ($(card).position().left + $(card).width()/2) - ($(window).width() * 0.3);
    if (id == 2) {
      translateX = ($(card).position().left + $(card).width()/2) - ($(window).width() * 0.7);
    }
    var translateY = ($(window).height()/2) - ($(card).position().top + $(card).height()/2);
    var selector = "#" + cardId + " .card-inner";
    $(selector).css("transform", 'rotateY(180deg) translate(' + translateX + 'px,' + translateY + 'px) scale(2)');
    // $(card).addClass("focused");
    cardsFlipped.push(card);
  }

  function flipCardDown(card) {
    $(card).find(".cross").fadeIn().delay(1000).fadeOut().delay(readingTimeLength).queue(function() {
      $(card).removeClass("flipped");
      $("#focused1 .card-inner").removeAttr('style');
      $("#focused2 .card-inner").removeAttr('style');
      $("#focused1").removeAttr('style');
      $("#focused2").removeAttr('style');
      card.setAttribute("id", "");
      $(this).dequeue();
    });
  }

  function flipCardsDownNow() {
    $("#focused1").removeClass("flipped");
    $("#focused2").removeClass("flipped");
    $("#focused1 .card-inner").removeAttr('style');
    $("#focused2 .card-inner").removeAttr('style');
    $("#focused1").removeAttr('style');
    $("#focused2").removeAttr('style');
    document.getElementById("focused1").setAttribute("id", "");
    document.getElementById("focused2").setAttribute("id", "");
  }

  function markCardComplete(card) {
    $(card).find(".checkmark").fadeIn().delay(1000).fadeOut(function() {
      $(card).addClass("complete");
      $("#focused1 .card-inner").removeAttr('style');
      $("#focused2 .card-inner").removeAttr('style');
      $("#focused1").removeAttr('style');
      $("#focused2").removeAttr('style');
      $(card).find(".card-inner").css("transform", 'rotateY(180deg)');
      card.setAttribute("id", "");
      if (gameWon()) {
        $("#turnCountLabel").html(turnCount);
        $("#gameWonModal").slideDown(1000);
      }
    });
  }

  function cardsMatch(cardList) {
    // console.log(dict.get($(cardList[0]).find(".card-back-content").html()))
    // console.log($(cardList[1]).data("key"));
    if(dict.get($(cardList[0]).find(".card-back-content").html()) == $(cardList[1]).data("key")){ //Condense this, reads undefined as true
      if(dict.get($(cardList[1]).find(".card-back-content").html()) == $(cardList[0]).data("key")){
        // console.log("returned true");
        return true;
    }
  }
    else{
      return false;
    }
  };

  function gameWon() {
    if ($(".complete").length == $(".card-outer").length) return true;
    return false
  }

  function updateReadingMeter() {
    if (!readingTimeOn) return;
    if (Date.now() < readingTimeEnd) {
      var percentage = 100 * (1 - (readingTimeEnd - Date.now())/readingTimeLength) + "%";
      $("#readingTimerMeterForeground").css("width", percentage);
      return true;
    }
    else {
      $("#readingTimerMeterContainer").fadeOut();
      readingTimeOn = false;
      readingTimeEnd = null;
      return false;
    }
  }

  var timerInterval = null;

  $('.card-outer').click(function() {
    if (readingTimeOn) return;
    if (cardsFlipped.length < 2) {
      flipCardUp(this, cardsFlipped.length + 1);
      setTimeout(function() {
        if (cardsFlipped.length == 2) {
          turnCount++;
          if (cardsMatch(cardsFlipped)) {
            markCardComplete(cardsFlipped[0]);
            markCardComplete(cardsFlipped[1]);
            cardsFlipped = [];
          }
          else {
            if (!readingTimeOn) {
              $("#readingTimerMeterContainer").fadeIn();
              readingTimeOn = true;
              readingTimeEnd = Date.now() + readingTimeLength;
            }
            timerInterval = setInterval(updateReadingMeter, 20);
            flipCardDown(cardsFlipped[0]);
            flipCardDown(cardsFlipped[1]);
            cardsFlipped = []
          }
        }
      }, 2500);
    }
  });

  $(document).click(function() {
    if (readingTimeOn) {
      flipCardsDownNow()
      $("#readingTimerMeterContainer").fadeOut();
      clearInterval(timerInterval);
      readingTimeOn = false;
    }
  })

  // Source: https://stackoverflow.com/questions/2424191/how-do-i-make-an-element-draggable-in-jquery
  function handle_mousedown(e){
    window.my_dragging = {};
    my_dragging.pageX0 = e.pageX;
    my_dragging.pageY0 = e.pageY;
    my_dragging.elem = this;
    my_dragging.offset0 = $(this).offset();
    function handle_dragging(e){
      var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
      var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
      $(my_dragging.elem)
      .offset({top: top, left: left});
    }
    function handle_mouseup(e){
      $('body')
      .off('mousemove', handle_dragging)
      .off('mouseup', handle_mouseup);
    }
    $('body')
    .on('mouseup', handle_mouseup)
    .on('mousemove', handle_dragging);
  }

  $(document).on('click', '#focused1', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '#focused2', function(e) {
    e.stopPropagation();
  });

  $(document).on('mousedown', '#focused1', handle_mousedown);
  $(document).on('mousedown', '#focused2', handle_mousedown);

});
