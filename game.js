const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const gridSize = 20;
const canvasSize = canvas.width;
const snakeColor = 'green';
const foodColor = 'red';

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = generateFood();
let score = 0;

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    moveSnake();
    checkCollision();
    checkFood();
}

function draw() {
    drawBackground();
    drawSnake();
    drawFood();
}

function drawBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasSize, canvasSize);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function checkCollision() {
    const head = snake[0];

    // Check collision with walls
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        resetGame();
    }

    // Check collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function checkFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        food = generateFood();
        snake.push({}); // Add new segment to the snake
    }
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = generateFood();
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Listen to keyboard events
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

// Start the game loop
gameLoop();
