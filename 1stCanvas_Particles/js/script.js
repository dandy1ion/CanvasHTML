const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); //draw on canvas in 2d
//console.log(canvas);
//console.log(ctx); //object with global canvas settings
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; //see class Particle line 50
let hue = 0;

//redraw everytime resize event occurs(keeps correct sizing)
window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//put drawing here to keep it on screen when resizing
	//ctx.fillStyle = 'white';
	//ctx.fillRect(10, 20, 150, 50);
});

//draw circle every time we click somewhere on canvas
const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("click", function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
	//drawCircle();
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle());
	}
});

//create a simple paintbrush
canvas.addEventListener("mousemove", function () {
	mouse.x = event.x;
	mouse.y = event.y;
	//drawCircle();
	//make trail smaller with i < smaller # or larger with i < larger #
	for (let i = 0; i < 5; i++) {
		particlesArray.push(new Particle());
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		//this.x = Math.random() * canvas.width;
		//this.y = Math.random() * canvas.height;
		this.size = Math.random() * 15 + 1; //each particle will be a random size between 1 & 6
		this.speedX = Math.random() * 3 - 1.5; //each particle moves slightly different speed/frame
		this.speedY = Math.random() * 3 - 1.5; //random # between plus 1 and minus 1
		this.color = `hsl(` + hue + `,100%, 50%)`; //remove this and use hsl on fillStyle for diffrent effect
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1; //shrink as they move
	}
	draw() {
		ctx.fillStyle = this.color; //`hsl(` + hue + `,100%, 50%)`; //another way to declare colors (hue saturation lightness)
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

// function init() {
// 	for (let i = 0; i < 100; i++) {
// 		particlesArray.push(new Particle());
// 	}
// }
// init();
//console.log(particlesArray);

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();
		if (particlesArray[i].size <= 0.3) {
			particlesArray.splice(i, 1); //delete one particle
			console.log(particlesArray.length); //check if particles being removed correctly
			i--;
		}
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
	//take out clearRect if want each particle to leave a trail
	//ctx.clearRect(0, 0, canvas.width, canvas.height); //clear full canvas
	//drawCircle();
	//put in a fade out instead of a clear
	ctx.fillStyle = "rgba(0, 0, 0, 0.02)"; //if use 'black' same as clearing canvas
	//the smaller the opacity number the more trail effect you get
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticles(); //simple particle system animation
	hue++; //control how fast/slow the colors change (hue+=5 is fast/hue+=0.5 is slow)
	requestAnimationFrame(animate); //creating a loop
}
animate();
