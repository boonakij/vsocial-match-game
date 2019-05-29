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
      // TODO: Probably need to add time delay here
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
