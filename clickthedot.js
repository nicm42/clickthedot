/* TODO
	need reset button
	leave space for the result message, otherwise dot moves down on click
	maybe show its original size so you can see the difference
	if it grows to 3 times size then keep it that size
	and add message to say they didn't click
	take a random amount of time to grow it
 */

const container = document.getElementById('container');

//add the circle
const dotDiv = document.createElement('div');
dotDiv.className = 'dot';
container.appendChild(dotDiv);

//set up the initial size of the dot
let size = getRandomIntInclusive(50, 150);
let size3 = size * 3;
dotDiv.style.width = size + 'px';
dotDiv.style.height = size + 'px';

//When the user clicks the dot, make the dot grow
dotDiv.addEventListener('click', growDot);

function growDot(){
	dotDiv.classList.add('transition');
	//set up the transition limit - 3 times the size should be enough
	dotDiv.style.width = size3 + 'px';
	dotDiv.style.height = size3 + 'px';
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
	//stop it from growing by setting transition-property to none, but using a class
	dotDiv.classList.add('noTransition');
	//Work out how much bigger the dot was when clicked in comparison to when it started
	//Add text saying this to the page
	//widthWhenClicked = heightWhenClicked so we can just use one
	//however it's a number + px, so we need to strip off the px part
	let startWidth = size;
	let widthNumber = widthWhenClicked.substring(0,widthWhenClicked.length-2);
	let ratio = (widthNumber / startWidth).toFixed(2);
	//Text will depend on how close to 2.0 ratio is
	let resultTextStart = "Missed!";
	if(ratio >= 1.9 && ratio <= 2.1){
		resultTextStart = "Close!";
	}
	const result = document.getElementById('result');
	result.innerHTML = `${resultTextStart}  When you clicked it, the dot was  ${ratio} times its original size`;
	//now stop this event, otherwise it'll fire twice for every click
	dotDiv.removeEventListener('click', stopDot, false);
}

//from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}