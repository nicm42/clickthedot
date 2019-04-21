let container = document.getElementById('container');

//add a start button
let startBtn = document.createElement('button');
startBtn.textContent = "Start";
document.body.insertBefore(startBtn, container);

//add the circle
let dotDiv = document.createElement('div');
dotDiv.className = 'dot';
container.appendChild(dotDiv);

//When the user clicks the button, make the dot grow
startBtn.addEventListener('click', event => {
	dotDiv.classList.add('grow');
})

//When the user clicks the dot, stop it growing
//And keep a count of the width
let widthWhenClicked;
dotDiv.addEventListener('click', event => {
	widthWhenClicked = dotDiv.offsetWidth;
	dotDiv.classList.remove('grow');
	//Work out how much bigger the dot was when clicked in comparison to when it started
	//Add text saying this to the page
	let startWidth = 100;
	let ratio = widthWhenClicked / startWidth;
	container.insertAdjacentHTML('beforebegin','<div id="result">' + `Result is ${ratio}` + '</div>')
})
