$( document ).ready(function() {

  function flipCard(card) {
    $(card).toggleClass("flipped");
  }

  $('.card-outer').click(function() {
    flipCard(this);
  });

});
