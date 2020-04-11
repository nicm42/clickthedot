"use strict";

function clickthedot() {
  //localStorage.clear();
  setupHighScoreText('circle');
  setupHighScoreText('square');
  setupHighScoreText('triangle');
  $('#shapes').val('');
  $('#shapes').change(function () {
    //Hide all the other shapes first, in case they were previously visible
    $('.shape').css('visibility', 'hidden');
    $('#' + $(this).val()).css('visibility', 'visible');
    $('#shapename').text($(this).val());
    createShape($(this).val());
  });
  $('#reset').click(createShape);
}

function setupHighScoreText(shape) {
  if (localStorage.getItem(shape)) {
    $('#' + shape + 'score').html(localStorage.getItem(shape));
  }
}

function createShape(shape) {
  //In case we've done one shape reset anything
  $('#result').html(''); //Hide all the helpers in case they were previously visible
  //$('.helper').css('visibility','hidden');

  $('#reset').css('visibility', 'hidden');
  var size = getRandomIntInclusive(50, 100); //Make both the shape and the helper this size
  //if(shape === 'square') {

  $('.svg').attr('width', size);
  $('.svg').attr('height', size);
  $('.helpersvg').attr('width', size);
  $('.helpersvg').attr('height', size); //}

  /*if(shape === 'circle') {
   	$('.shape').attr('r',size/2);
  	$('.helper').attr('r',size/2);
  }
  if(shape === 'triangle') {
  	var points = [size/2, 0, size, size, 0, size].toString('');
  	console.log(points);
  	$('.shape').attr('points',points);
  	$('.helper').attr('points',points);
  }*/

  $('.shape').css('cursor', 'pointer');
  $('.shape').on('click', function (event) {
    growShape(event.target.id, size);
  });
}

function growShape(shape, size) {
  $('.shape').off();
  var transitionTime = getRandomIntInclusive(2, 7);
  $('.svg').animate({
    'width': size * 3,
    'height': size * 3
  }, transitionTime * 1000, function () {
    stopShape(shape, size);
  });
  $('.shape').on('click', function (event) {
    $('.svg').stop();
    stopShape(shape, size);
  });
}

function stopShape(shape, initialSize) {
  $('.shape').off();
  $('.shape').css('cursor', 'auto');
  $('.helpersvg').css('display', 'block');
  var finalSize = $('.svg').width(); //width and height are the same, so we can just use width

  var ratio = (finalSize / initialSize).toFixed(1);
  var resultTextStart = "Missed!";

  if (ratio == 1.9 || ratio == 2.1) {
    resultTextStart = "Close!";
  }

  if (ratio == 2.0) {
    resultTextStart = "Well done!";
  }

  $('#result').html(resultTextStart + '<br>The ' + shape + ' is now ' + ratio + ' times its original size');
  $('#reset').css('visibility', 'visible');
  addHighScore(shape, ratio);
}

function addHighScore(shape, score) {
  //First get the current high score for this shape
  //Then check if this is closer to 2.0
  //If it is, then add it to localStorage
  var highScore = localStorage.getItem(shape);

  if (highScore) {
    var highestScore = Math.abs(score - 2) < Math.abs(highScore - 2) ? score : highScore;
  } else {
    var highestScore = score;
  }

  localStorage.setItem(shape, highestScore);
  $('#' + shape + 'score').html(localStorage.getItem(shape));
} //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}