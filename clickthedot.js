//add a start button
let startBtn = document.createElement('button');
startBtn.textContent = "Start";
document.body.appendChild(startBtn);

//add the circle
let dotDiv = document.createElement('div');
dotDiv.className = 'dot';
document.body.appendChild(dotDiv);

//When the user clicks the button, make the dot grow
startBtn.addEventListener('click', event => {
	dotDiv.classList.add('grow');
})

//When the user clicks the dot, stop it growing
dotDiv.addEventListener('click', event => {
	dotDiv.classList.remove('grow');
})
