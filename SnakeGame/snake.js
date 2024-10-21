const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
let snake = [{ x: 160, y: 160 }];
let food = generateFood();
let direction = 'RIGHT';
let score = 0;
let gameInterval;
let speed = 200;

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'UP':
            head.y -= gridSize;
            break;
        case 'DOWN':
            head.y += gridSize;
            break;
        case 'LEFT':
            head.x -= gridSize;
            break;
        case 'RIGHT':
            head.x += gridSize;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        speed = Math.max(50, speed - 10); // Increase speed
        scoreDisplay.textContent = score;
        food = generateFood(); // Spawn new food
    } else {
        snake.pop(); // Remove the last segment
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    return { x, y };
}

function checkCollisions() {
    const head = snake[0];

    // Wall collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Self-collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    if (checkCollisions()) {
        clearInterval(gameInterval);
        alert('Game Over! Press "Restart" to play again.');
        return;
    }
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    const key = event.key.toUpperCase();
    if (key === 'W' && direction !== 'DOWN') direction = 'UP';
    if (key === 'S' && direction !== 'UP') direction = 'DOWN';
    if (key === 'A' && direction !== 'RIGHT') direction = 'LEFT';
    if (key === 'D' && direction !== 'LEFT') direction = 'RIGHT';
}

function startGame() {
    snake = [{ x: 160, y: 160 }];
    food = generateFood();
    direction = 'RIGHT';
    score = 0;
    scoreDisplay.textContent = score;
    speed = 200;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
}

document.addEventListener('keydown', changeDirection);
restartBtn.addEventListener('click', startGame);

// Start the game initially
startGame();
