const container = document.getElementById('container');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset');

//add the circle
const dotDiv = document.createElement('div');
dotDiv.className = 'dot';
container.appendChild(dotDiv);

//add the helperDot, which shows original size once clicked
const helperDot = document.createElement('div');
helperDot.className = 'helperDot';
container.appendChild(helperDot);
helperDot.style.visibility = 'hidden';

let initialSize = setUpDot();

resetButton.addEventListener('click', resetDot);

function setUpDot(){
	let size = getRandomIntInclusive(50, 100);
	dotDiv.style.width = size + 'px';
	dotDiv.style.height = size + 'px';
	//show the dot is clickable using the cursor
	dotDiv.style.cursor = "pointer";
	//When the user clicks the dot, make the dot grow
	dotDiv.addEventListener('click', growDot);
	//if the dot has got to 3 times the size, add a message to result
	//we can just re-use stopDot for this
	dotDiv.addEventListener('transitionend', stopDot);
	return size;
}

function growDot(){
	dotDiv.classList.add('transition');
	//set up the transition limit - 3 times the size should be enough
	let size3 = initialSize * 3;
	dotDiv.style.width = size3 + 'px';
	dotDiv.style.height = size3 + 'px';
	//add the transition time
	let transitionTime = getRandomIntInclusive(2, 7)
	dotDiv.style.transitionDuration = transitionTime+"s";
	//When the user clicks the dot again, stop it growing
	dotDiv.addEventListener('click', stopDot, false);
}

function stopDot(event){
	//get the width and height now and set it to be that, so it appears to be paused,
	//otherwise it skips to end of transition
	let computedStyle = window.getComputedStyle(dotDiv);
	let widthWhenClicked = computedStyle.getPropertyValue('width');
	let heightWhenClicked = computedStyle.getPropertyValue('height');
	dotDiv.style.width = widthWhenClicked;
	dotDiv.style.height = heightWhenClicked;
	//stop it from growing any more by removing the transition
	dotDiv.classList.remove('transition');
	//Show the helper dot
	helperDot.style.width = initialSize + 'px';
	helperDot.style.height = initialSize + 'px';
	helperDot.style.visibility = 'visible';
	//Work out how much bigger the dot was when clicked in comparison to when it started
	//Add text saying this to the page
	//widthWhenClicked = heightWhenClicked so we can just use one
	//however it's a number + px, so we need to strip off the px part
	let widthNumber = widthWhenClicked.substring(0,widthWhenClicked.length-2);
	let ratio = (widthNumber / initialSize).toFixed(1);
	//Text will depend on how close to 2.0 ratio is
	let resultTextStart = "Missed!";
	if(ratio == 1.9 || ratio == 2.1){
		resultTextStart = "Close!";
	}
	if(ratio == 2.0){
		resultTextStart = "Well done!";
	}
	result.innerHTML = `${resultTextStart}<br>The dot is now  ${ratio} times its original size`;
	//show reset button
	resetButton.style.visibility = 'visible';
	//now stop this event, otherwise it'll fire twice for every click
	dotDiv.removeEventListener('click', stopDot, false);
	//also need to remove the growDot listener, so they have to rest to play again
	dotDiv.removeEventListener('click', growDot);
	//change the cursor back to an arrow, so it doesn't look like the dot is clickable
	dotDiv.style.cursor = "auto";
}

function resetDot(){
	//remove the text in result, hide the rest button
	result.innerHTML = "&nbsp;";
	resetButton.style.visibility = 'hidden';
	helperDot.style.visibility = 'hidden';
	//make the dot smaller again
	dotDiv.style.removeProperty("transition-duration");
	initialSize = setUpDot();
}

//from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}