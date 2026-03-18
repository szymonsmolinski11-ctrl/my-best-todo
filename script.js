const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let score = 0;
let brainrots = [];
let gameRunning = true;

class Brainrot {
    constructor() {
        this.x = Math.random() * (canvas.width - 50);
        this.y = -50;
        this.speed = Math.random() * 3 + 1;
        this.color = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'][Math.floor(Math.random() * 5)];
        this.size = 40;
    }

    update() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.size, this.size);
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.size && mouseY >= this.y && mouseY <= this.y + this.size;
    }
}

function addBrainrot() {
    brainrots.push(new Brainrot());
}

function update() {
    brainrots.forEach(brainrot => brainrot.update());
    brainrots = brainrots.filter(brainrot => brainrot.y < canvas.height + 50);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    brainrots.forEach(brainrot => brainrot.draw());
}

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    brainrots = brainrots.filter(brainrot => {
        if (brainrot.isClicked(mouseX, mouseY)) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            return false;
        }
        return true;
    });
});

setInterval(addBrainrot, 1000);
gameLoop();