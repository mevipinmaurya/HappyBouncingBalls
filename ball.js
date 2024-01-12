const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mySound;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const particlesArray = [];

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener("click", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    for (let i = 0; i < 1; i++) {
        particlesArray.push(new Particles());
    }
    // console.log(mouse);
})

class Particles {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = canvas.width / 2;
        // this.y = canvas.height / 2;
        this.size = Math.random() * 20 + 1;
        this.speedX = Math.random() * 10 - 1.5;
        this.speedY = Math.random() * 10 - 1.5;

        // To produce the sound whenever the ball hits the window edges
        mySound = new sound("bounce.mp3");
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.speedX > canvas.width - this.size || this.x + this.speedX < this.size) {
            mySound.play();
            this.speedX = -this.speedX;
        }
        if (this.y + this.speedY > canvas.height - this.size || this.y + this.speedY < this.size) {
            mySound.play();
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.beginPath();
        // ctx.fillStyle = "rgb(138, 31, 210)";
        ctx.fillStyle = "whitesmoke";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}


const handle = () => {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handle();
    requestAnimationFrame(animate);
}

animate();

// Function to produce sound whenever the balls hits the window edges
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


// Note :
// produce a sound whenever the balls touches the window edges
// produce random colors for all balls 