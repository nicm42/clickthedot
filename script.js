"use strict";

function clickthedot() {
  //localStorage.clear();
  setupHighScoreText('circle');
  setupHighScoreText('square');
  setupHighScoreText('triangle');
  $('#shapes').val('');
  $('#shapes').change(function () {
    $('.shape').attr('id', $(this).val()); //$('.helper').attr('id','helper'+$(this).val());

    $('#shapename').text($(this).val());
    createShape();
  });
  $('#reset').click(createShape);
}

function setupHighScoreText(shape) {
  if (localStorage.getItem(shape)) {
    $('#' + shape + 'score').html(localStorage.getItem(shape));
  }
}

function createShape() {
  var shape = $('.shape').attr('id'); //In case we've done one shape reset anything

  $('#result').html(''); //Remove and re-add helper as might have had two from triangle and now need only one for circle and square

  $('.helper').remove();
  $('<div class="helper" id="helper' + shape + '"></div>').appendTo('#container');
  $('.helper').css('display', 'none');
  $('#reset').css('visibility', 'hidden');
  var size = getRandomIntInclusive(50, 100); //Reset all the properties that we're changing on each shape

  $('.shape').css({
    'width': 0,
    'height': 0,
    'border-left-width': 0,
    'border-right-width': 0,
    'border-bottom-width': 0
  });
  $('.helper').css({
    'width': 0,
    'height': 0,
    'border-width': '2px'
  });

  if (shape === 'circle' || shape === 'square') {
    $('.shape').css({
      'width': size,
      'height': size
    });
    $('.helper').css({
      'width': size,
      'height': size
    });
  }

  if (shape === 'triangle') {
    $('.shape').css({
      'border-left-width': size / 2,
      'border-right-width': size / 2,
      'border-bottom-width': size
    });
    $('.helper').css({
      'border-left-width': size / 2,
      'border-right-width': size / 2,
      'border-bottom-width': size
    }); //Making a hollow triangle with dynamic width and height is hard
    //So instead we'll add another helper triangle, this time a bit smaller and shapeColour
    //so it'll look like we just have a triangle with a border
    //borders = 2 each

    $('<div class="helper" id="helpertriangle2"></div>').appendTo('#helpertriangle');
    $('#helpertriangle2').css({
      'border-left-width': size / 2 - 4,
      'border-right-width': size / 2 - 4,
      'border-bottom-width': size - 4,
      'left': (size / 2 - 4) * -1,
      'top': 2
    });
  }

  $('.shape').css('cursor', 'pointer');
  $('.shape').on('click', function (event) {
    growShape(event.target.id, size);
  });
}

function growShape(shape, size) {
  $('.shape').off();
  var transitionTime = getRandomIntInclusive(2, 7);

  if (shape === 'circle' || shape === 'square') {
    $('.shape').animate({
      'width': size * 3,
      'height': size * 3
    }, transitionTime * 1000, function () {
      stopShape(shape, size);
    });
  }

  if (shape === 'triangle') {
    $('.shape').animate({
      'border-left-width': size / 2 * 3,
      'border-right-width': size / 2 * 3,
      'border-bottom-width': size * 3
    }, transitionTime * 1000, function () {
      stopShape(shape, size);
    });
  }

  $('.shape').on('click', function () {
    $('.shape').stop(true);
    $('.shape').off();
    stopShape(shape, size);
  });
}

function stopShape(shape, initialSize) {
  $('.shape').off();
  $('.shape').css('cursor', 'auto');
  $('.helper').css('display', 'block');
  var finalSize;

  if (shape === 'circle' || shape === 'square') {
    finalSize = $('.shape').width();
  }

  if (shape === 'triangle') {
    finalSize = parseInt($('.shape').css('border-bottom-width')); //borders return with a px
  }

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