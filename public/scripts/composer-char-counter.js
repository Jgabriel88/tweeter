let count = 140;
$(document).ready(function () {
  $('#tweet-text').on('change keypress input', function (event) {
    let remainder = count - $(event.target).val().length;
    $('output.counter').html(remainder);
    if (remainder < 0) {
      $('output.counter').addClass('counterRed');
    } if (remainder > 0) {
      $('output.counter').removeClass('counterRed');
    }
  });
});

