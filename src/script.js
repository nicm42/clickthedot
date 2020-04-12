function clickthedot() {
	//localStorage.clear();
	setupHighScoreText('circle');
	setupHighScoreText('square');
	setupHighScoreText('triangle');
	//Check if there are no high scores and disable the button if there aren't any
	var savedScores = 0;
	$('.score').each(function() {
		if($(this).html() !== '') {
			savedScores++;
		}
	})
	if(savedScores === 0) {
		$('#clear').prop('disabled', true);
	}
	$('#select-shapes').val('');
	$('#select-shapes').change(function() {
		//Hide all the other shapes first, in case they were previously visible
		$('.shape').css('visibility','hidden');
	  $('#'+$(this).val()).css('visibility','visible');
  	$('#shapename').text($(this).val());
		createShape($(this).val());
	});
	$('#reset').click(createShape);
	$('#clear').click(clearScores);
}

function setupHighScoreText(shape) {
	if(localStorage.getItem(shape)) {
		$('#'+shape+'score').html(localStorage.getItem(shape));
	}
}

function createShape(shape) {
	//In case we've done one shape reset anything
	$('#result').html('');
	//Hide all the helpers in case they were previously visible
	$('.helpersvg').css('display','none');
	$('.helper').css('visibility','hidden');
	$('#reset').css('visibility','hidden');	
  var size = getRandomIntInclusive(50, 100);
  //Make both the shape and the helper this size
 	$('.svg').css('width',size);
 	$('.svg').css('height',size);
 	$('.helpersvg').css('width',size);
 	$('.helpersvg').css('height',size);
  $('.svg').css('cursor','pointer'); 
  $('.svg').on('click', function(event) {
    growShape(event.target.id, size);
	});
}

function growShape(shape, size){
	$('.svg').off();
	var transitionTime = getRandomIntInclusive(2, 7)
	$('.svg').animate({
		'width': size * 3,
		'height': size * 3
	}, transitionTime * 1000, function(){
		stopShape(shape, size);
	});
  $('.svg').on('click', function(event) {
  	$('.svg').stop();
    stopShape(shape, size);
	});
}

function stopShape(shape, initialSize) {
	$('.svg').off();
	$('.svg').css('cursor','auto');
	$('.helpersvg').css('display','block');
	$('#helper'+shape).css('visibility','visible');
	var finalSize = $('.svg').width(); //width and height are the same, so we can just use width
	var ratio = (finalSize / initialSize).toFixed(1);
	var resultTextStart = "Missed!";
	if(ratio == 1.9 || ratio == 2.1){
		resultTextStart = "Close!";
	}
	if(ratio == 2.0){
		resultTextStart = "Well done!";
	}
	$('#result').html(resultTextStart + '<br>The ' + shape + ' is now ' + ratio + ' times its original size');
	$('#reset').css('visibility','visible');
	addHighScore(shape, ratio);
}

function addHighScore(shape, score) {
	//First get the current high score for this shape
	//Then check if this is closer to 2.0
	//If it is, then add it to localStorage
	var highScore = localStorage.getItem(shape);
	if (highScore){
		var highestScore = (Math.abs(score-2) < Math.abs(highScore-2)) ? score : highScore;
	} else {
		var highestScore = score;
	}
	$('#clear').prop('disabled', false);
	localStorage.setItem(shape, highestScore);
	$('#'+shape+'score').html(localStorage.getItem(shape));
}

function clearScores() {
	if (confirm("Are you sure you want to clear the closest scores?")) {
		localStorage.clear();
		$('.score').html('');
		$('#clear').prop('disabled', true);
	}
}

//from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}