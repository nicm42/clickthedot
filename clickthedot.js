/* TODO
	dot keep its size when it's clicked
	maybe show its original size so you can see the difference
	then need reset button
	if it grows to 300px then keep it that size
	and add message to say they didn't click
 */

const container = document.getElementById('container');

//add the circle
const dotDiv = document.createElement('div');
dotDiv.className = 'dot';
container.appendChild(dotDiv);

//When the user clicks the dot, make the dot grow
dotDiv.addEventListener('click', growDot);

function growDot(){
	//first remove previous result (if there is one)
	dotDiv.classList.add('grow');
	//When the user clicks the dot again, stop it growing
	//And keep a count of the width
	let widthWhenClicked;
	dotDiv.addEventListener('click', stopDot, false);
}

function stopDot(event){
	widthWhenClicked = dotDiv.offsetWidth;
	dotDiv.classList.remove('grow');
	//Work out how much bigger the dot was when clicked in comparison to when it started
	//Add text saying this to the page
	let startWidth = 100;
	let ratio = widthWhenClicked / startWidth;
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