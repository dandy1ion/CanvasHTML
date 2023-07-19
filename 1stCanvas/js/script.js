const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //draw on canvas in 2d
//console.log(canvas);
//console.log(ctx); //object with global canvas settings
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; //see class Particle line 50

//redraw everytime resize event occurs(keeps correct sizing)
window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//put drawing here to keep it on screen when resizing
	//ctx.fillStyle = 'white';
	//ctx.fillRect(10, 20, 150, 50);
});

//Rectangle:
//ctx.fillStyle = 'white';
//ctx.fillRect(10, 20, 150, 50);

//draw circle every time we click somewhere on canvas
const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("click", function (event) {
	mouse.x = event.x;
	// console.log(event); //click event object
	mouse.y = event.y;
	//drawCircle();
});

//create a simple paintbrush
canvas.addEventListener("mousemove", function () {
	mouse.x = event.x;
	mouse.y = event.y;
	//drawCircle();
});

// function drawCircle() {
// 	ctx.fillStyle = "blue";
// 	ctx.beginPath();
// 	ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
// 	ctx.fill();
// }
//drawCircle();

class Particle {
	constructor() {
		//this.x = mouse.x;
		//this.y = mouse.y;
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.random() * 5 + 1; //each particle will be a random size between 1 & 6
		this.speedX = Math.random() * 3 - 1.5; //each particle moves slightly different speed/frame
		this.speedY = Math.random() * 3 - 1.5; //random # between plus 1 and minus 1
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	draw() {
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
		ctx.fill();
	}
}

function init() {
	for (let i = 0; i < 100; i++) {
		particlesArray.push(new Particle());
	}
}
init();
//console.log(particlesArray);

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();
	}
}

//Circle:
//ctx.fillStyle = "blue"; //take this out if you only want an outline
//ctx.strokeStyle = "red"; //use with stroke
//ctx.lineWidth = 10; //use with stroke
//ctx.beginPath();
//ctx.arc(130, 100, 50, 0, Math.PI * 2);
//ctx.fill(); //take this out if you only want an outline
//ctx.stroke(); //outline

//interactive fun
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); //clear full canvas
	//drawCircle();
	handleParticles(); //simple particle system animation
	requestAnimationFrame(animate); //creating a loop
}
animate();
