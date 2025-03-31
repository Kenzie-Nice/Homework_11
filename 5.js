const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

class GameObject {
    constructor(x, y, size, color, speed, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.isPlayer = isPlayer;
        this.dx = isPlayer ? 0 : speed;
        this.dy = isPlayer ? 0 : speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    move() {
        if (!this.isPlayer) {
            this.x += this.dx;
            this.y += this.dy;

            // Reverse direction if hitting edges
            if (this.x <= 0 || this.x + this.size >= canvas.width) this.dx *= -1;
            if (this.y <= 0 || this.y + this.size >= canvas.height) this.dy *= -1;
        }
    }

    checkCollision(other) {
        return (
            this.x < other.x + other.size &&
            this.x + this.size > other.x &&
            this.y < other.y + other.size &&
            this.y + this.size > other.y
        );
    }
}

const player = new GameObject(200, 200, 30, "blue", 4, true);
const enemy = new GameObject(100, 100, 40, "red", 2);
const keys = {};

window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

function movePlayer() {
    if (keys["ArrowUp"] && player.y > 0) player.y -= player.speed;
    if (keys["ArrowDown"] && player.y + player.size < canvas.height) player.y += player.speed;
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x + player.size < canvas.width) player.x += player.speed;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    movePlayer();
    enemy.move();

    if (player.checkCollision(enemy)) {
        document.body.style.backgroundColor = "lightgray";
        player.size += 5;
        enemy.size += 5;
    }

    player.draw();
    enemy.draw();
    requestAnimationFrame(update);
}

// Start background music
document.getElementById("bg-music").play();
update();
