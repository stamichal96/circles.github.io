const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let Circles = [];
const colors = [
    'rgba(255,255,255,.8)', 'rgba(130,0,130,.5)', 'rgba(15,200,140,.6)', 'rgba(236,250,49,.8)', 'rgba(0,200,200,.8)', 'rgba(0,200,200,.8)', 'rgba(0,0,255,.8)', 'rgba(0,170,10,.8)', 'rgba(170,0,140,.8)', 'rgba(168,0,2,.8)', 'rgba(0,170,170,.8)'
];

let pointer = {
	x: null,
	y: null
}
window.addEventListener('mousemove',
	(e) => {
		pointer.x = e.x;
		pointer.y = e.y;
});

function Circle (x, y, wayX, wayY, size, color){
    this.x = x;
    this.y = y;
    this.wayX = wayX;
    this.wayY = wayY;
    this.size = size;
    this.color = color;
}

Circle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 6, false);
    ctx.fillStyle = this.color;
	ctx.fill();
}

const maxSize = 30;
const minSize = 0;

Circle.prototype.update = function(){
    if (this.x + this.size*4 > canvas.width || this.x - this.size*4 < 0){
			this.wayX = -this.wayX;
	} if (this.y + this.size*4 > canvas.height || this.y - this.size*4 < 0){
		this.wayY = -this.wayY;
	}
    this.x +=this.wayX;
    this.y += this.wayY;

    let pointerRadius = 50;
    if (    pointer.x - this.x < pointerRadius
    &&      pointer.x - this.x >-pointerRadius
    &&      pointer.y - this.y < pointerRadius
    &&      pointer.y - this.y >-pointerRadius) {
	    if (this.size < maxSize){
		    this.size += 2.5;
            this.x -= 1.5;
	    }
    }
    else if (this.size > minSize){
		    this.size -= .1;
    }
    if (this.size < 0) {
        this.size = 0;
    }
    this.draw();
}

start = () => {
    Circles = [];
    console.log(colors[Math.floor(Math.random() * colors.length)]);
    for (let i=0; i<2500; i++){
        let size = 0;
        let x = (Math.random() * ((innerWidth - size * 4) - (size * 4)) + size * 4);
        let y = (Math.random() * ((innerHeight - size * 4) - (size * 4)) + size * 4);
        let wayX = (Math.random() * .4) - .1;
        let wayY = (Math.random() * .4) - .1;
        let color = colors[Math.floor(Math.random() * colors.length)];
        Circles.push(new Circle(x, y, wayX, wayY, size, color));
    }
}

showcase = () => {
	requestAnimationFrame(showcase);
	ctx.clearRect(0,0,innerWidth,innerHeight);

	for (let i = 0; i < Circles.length; i++){
		Circles[i].update();
	}
}
start();
showcase();

window.addEventListener('resize',
	() => {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		start();
	}
);

setInterval(() => {
	pointer.x = undefined;
	pointer.y = undefined;
}, 300);