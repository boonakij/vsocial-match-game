//Created by Boon, Brady, Ben 5/29/19

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

let AnswerAssignment = function(card, key){ //Assignment of image to card based on key provided
    $(card).find(".card-back-content").html(dict.get(key));

    let card_back = card.getElementsByClassName('card-back-content');

    var answers = cardNums.get(dict.get(key));
    $(card).addClass(answers);

    $(card).data("key", dict.get(key));
};

let KeyListCreation = function(dict){ //Creation of list of keys based on dictionary
  let keys = new Array();
  for(let key of dict.keys()){
    keys.push(key);
  }
    Shuffle(keys);
  return keys;
};

var cards= document.getElementsByClassName('card-outer');

//Terms to populate with
let dict = new Map();
dict.set('Which of the following is NOT one of the 5 key facial features? Eyes, nose, mouth, forehead, or tilt of head',"Nose")
    .set("If I were sharing the main idea, staying on topic,and matching my facial expression to what I was saying, would I be the speaker or the listener?", "Speaker")
    .set("What are at least 2 of the listener’s skills?", "Respond to the speaker and face their direction, use appropriate eye contact, use appropriate body control and proximity, wait for the speaker to finish talking before you respond")
    .set("What are 2 benefits of learning how to share ideas?", "Problems can be solved and relationships can be developed and maintained")
    .set("What are 2 ways you can respond to someone who is sharing an idea?", "Verbally (comment or question) or nonverbally (e.g., nod your head)")
    .set("Which of the following is NOT a clue used to read someone’s emotion? Facial expressions, how smart they are, volume/tone, or body language/gestures", "How smart they are")
    .set("Why is it important to read the 3 clues?", "So you know what emotion others are showing and how to respond to them")
    .set("Why is it important that your 3 clues match what you are saying?", "So others can read your emotion")
    .set("When talking with someone, what are 2 reasons why you should look at his/her face?", "Helps us know his/her emotion and shows the person you are listening");

let cardNums = new Map();
cardNums.set('Which of the following is NOT one of the 5 key facial features? Eyes, nose, mouth, forehead, or tilt of head', "question1")
    .set("Nose", "answer1")
    .set("If I were sharing the main idea, staying on topic,and matching my facial expression to what I was saying, would I be the speaker or the listener?", "question2")
    .set("Speaker", "answer2")
    .set("What are at least 2 of the listener’s skills?", "question3")
    .set("Respond to the speaker and face their direction, use appropriate eye contact, use appropriate body control and proximity, wait for the speaker to finish talking before you respond", "answer3")
    .set("What are 2 benefits of learning how to share ideas?", "question4")
    .set("Problems can be solved and relationships can be developed and maintained", "answer4")
    .set("What are 2 ways you can respond to someone who is sharing an idea?", "question5")
    .set("Verbally (comment or question) or nonverbally (e.g., nod your head)", "answer5")
    .set("Which of the following is NOT a clue used to read someone’s emotion? Facial expressions, how smart they are, volume/tone, or body language/gestures", "question6")
    .set("How smart they are", "answer6")
    .set("Why is it important to read the 3 clues?", "question7")
    .set("So you know what emotion others are showing and how to respond to them", "answer7")
    .set("Why is it important that your 3 clues match what you are saying?", "question8")
    .set("So others can read your emotion", "answer8")
    .set("When talking with someone, what are 2 reasons why you should look at his/her face?", "question9")
    .set("Helps us know his/her emotion and shows the person you are listening", "answer9");

// let n = prompt("How many cards would you like to play with?");
let n = 18; //Hardcode
let random = new Array();//Creation of random array to distribute
for(let i = 0; i < n; i++){
  random.push(i);
};

Shuffle(random);

let keys = KeyListCreation(dict); //creation of list of keys
Shuffle(keys);

let GameStart = function(){
  var cards= document.getElementsByClassName('card-outer');
};

//Random loading of terms,
window.onload = function(){

 do{
     key = keys.pop();

   let card1 = cards[random.pop()];
   $(card1).find(".card-back-content").html(key);

     var questions = cardNums.get(key);
    $(card1).addClass(questions);

   card2 = cards[random.pop()];

   AnswerAssignment(card2, key);
  }
  while(random.length != 0);
};

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
    $("#gameWonModal").slideUp(1000);
    for(card in cardsFlipped){
      flipCardDown(card); //Currently working on this
    }
    GameStart();

  });

  $("#gameStartModal-button").click(function() {
    $("#gameStartModal").slideUp(1000, function() {
    });
  });

  function flipCardUp(card, id) {
    if ($(card).hasClass("flipped")) return;
    $(card).addClass("flipped");
    var cardId = "focused" + id;
    var checkExisting = document.getElementById(cardId);
    if(checkExisting){
      $(checkExisting).removeAttr(cardId);
    }
    card.setAttribute("id", cardId);
    var translateX = ($(card).position().left + $(card).width()/2) - ($(window).width() * 0.3);
    if (id == 2) {
      translateX = ($(card).position().left + $(card).width()/2) - ($(window).width() * 0.7);
    }
    var translateY = ($(window).height()/2) - ($(card).position().top + $(card).height()/2);
    var selector = "#" + cardId + " .card-inner";
    $(selector).css("transform", 'rotateY(180deg) translate(' + translateX + 'px,' + translateY + 'px) scale(2)');
    cardsFlipped.push(card);
  }

  function flipCardsDown(card) {
      while(cardsFlipped.length != 0){
          card = cardsFlipped.pop();
          $(card).removeClass("flipped");
    $("#focused1 .card-inner").removeAttr('style');
    $("#focused2 .card-inner").removeAttr('style');
    $("#focused1").removeAttr('style');

    $("#focused2").removeAttr('style');
    card.setAttribute("clicked", "false");
    var name = card.getAttribute("id");
    card.setAttribute("id", "");
      }
        }

    function checkCards(card){
      if (!$(card).find('.cross').is(':animated') && !(card.getAttribute("clicked")=="true")) {
        card.setAttribute("clicked", "true")
        $(card).find(".cross").stop().fadeIn("slow", function() {
          $(this).fadeOut("slow", function() {
          });
        });
      }
    }


  function flipCardsDownNow() {
    $("#focused1").removeClass("flipped");
    $("#focused2").removeClass("flipped");
    $("#focused1 .card-inner").removeAttr('style');
    $("#focused2 .card-inner").removeAttr('style');
    $("#focused1").removeAttr('style');
    $("#focused2").removeAttr('style');
    for (var i = 0; i < cardsFlipped.length; i++) {
      cardsFlipped[i].setAttribute("clicked", "false");
    }
    cardsFlipped = cardsFlipped.filter(function(elem){
       return elem != document.getElementById("focused1");
    });
    cardsFlipped = cardsFlipped.filter(function(elem){
       return elem != document.getElementById("focused2");
    });
    document.getElementById("focused1").setAttribute("id", "");
    document.getElementById("focused2").setAttribute("id", "");
  }

  function markCardComplete(card) {
    $(card).find(".checkmark").fadeIn().delay(1000).fadeOut(function() {
      if (!$(card).hasClass("complete")) {
        $(card).addClass("complete");
        $("#focused1 .card-inner").removeAttr('style');
        $("#focused2 .card-inner").removeAttr('style');
        // $("#focused1").removeAttr('style');
        // $("#focused2").removeAttr('style');
        $(".complete").removeAttr("style");
        $(card).find(".card-inner").css("transform", 'rotateY(180deg)');
        card.setAttribute("id", "");
        cardsFlipped = cardsFlipped.filter(function(elem){
           return elem != card;
        });
        if (gameWon()) {
          $("#turnCountLabel").html(turnCount);
          $("#gameWonModal").slideDown(1000);
        }
      }
    });
  }

  function cardsMatch(cardList) {
    if(dict.get($(cardList[0]).find(".card-back-content").html()) == $(cardList[1]).data("key")){
      if(dict.get($(cardList[1]).find(".card-back-content").html()) == $(cardList[0]).data("key")){
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
        flipCardsDown(cardsFlipped);
      return false;
    }
  }

  var timerInterval = null;

  $('.card-outer').click(function() {
    if (readingTimeOn) return;
    if (cardsFlipped.length < 2 && !cardsFlipped.includes(this)) {
      flipCardUp(this, cardsFlipped.length + 1);
      if (cardsFlipped.length == 1) {
        turnCount++;
      }
      setTimeout(function() {
        if (cardsFlipped.length == 2) {
          if (cardsMatch(cardsFlipped)) {
            markCardComplete(cardsFlipped[0]);
            markCardComplete(cardsFlipped[1]);
          }
          else {
            if (!readingTimeOn) {
              $("#readingTimerMeterContainer").fadeIn();
              readingTimeOn = true;
              readingTimeEnd = Date.now() + readingTimeLength;
            }
            timerInterval = setInterval(updateReadingMeter, 20);
            checkCards(cardsFlipped[0]);
            checkCards(cardsFlipped[1]);
          }
        }
      }, 2500);
    }
  });

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

  $(document).on('mousedown', '#focused1 .card-inner', handle_mousedown);
  $(document).on('mousedown', '#focused2 .card-inner', handle_mousedown);

  $(document).on('click', '#focused1', function(e) {
    e.stopPropagation();
  });

  $(document).on('click', '#focused2', function(e) {
    e.stopPropagation();
  });

  $(document).click(function() {
    if (readingTimeOn) {
      flipCardsDownNow()
      $("#readingTimerMeterContainer").fadeOut();
      clearInterval(timerInterval);
      readingTimeOn = false;
    }
  })

});
