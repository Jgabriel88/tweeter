$(document).ready(function() {
  $('#tweetsContainer').on('mouseover', function() {
    $('#tweetsContainer header .userId').removeClass('userIdOut').addClass('userIdIn');
  });
  $('#tweetsContainer').on('mouseout', function() {
    $('#tweetsContainer header .userId').removeClass('userIdIn').addClass('userIdOut');
  });
});