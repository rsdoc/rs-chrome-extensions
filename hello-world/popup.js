$(function () {
  // select input elements first
  $('#name').keyup(function () {
    $('#greet').text(`Hello ${$('#name').val()}`);
  });
});
