function clickthedot() {
	$('#shapes').on('change', createShape); 
}

function createShape() {
  $('.shape').attr('id',$(this).val());
  var size = getRandomIntInclusive(50, 100);
  //Reset all the properties that we're changing on each shape
	  $('.shape').css({
	  	'width': 0,
	  	'height': 0,
	  	'border-left-width': 0,
	  	'border-right-width': 0,
	  	'border-bottom-width': 0
	  });
  if ($(this).val() === 'circle' || $(this).val() === 'square') {
	  $('.shape').css({
	  	'width': size,
	  	'height': size
	  });  	
  } 
  if ($(this).val() === 'star' || 'triangle') {
	  $('.shape').css({
	  	'border-left-width': size/2,
	  	'border-right-width': size/2,
	  	'border-bottom-width': size
	  });
	  if ($(this).val() === 'star') {
	  	$("<style type='text/css'> #star:after{width:0;height:0;border-left:"+size/2+"px solid transparent;border-right:"+size/2+"px solid transparent;border-top:"+size+"px solid #ff7a8a;position:absolute;content:'';top:"+size/3+"px;left:-"+size/2+"px;}</style>").appendTo("#star");
	  }
  } 
}

//from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}