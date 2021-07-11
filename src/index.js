let context = document.getElementById("canvas").getContext("2d");

let box = 32; 
let snakeSize = 16;

let snake = []; 
snake.push({
  x: 8 * box,
  y: 8 * box
});

let direction = "right";

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function fillBackground() {
  context.fillStyle = "tomato";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for(i = 0; i < snake.length; i++) {
    context.fillStyle = "#2d2d2d";
    context.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize)
  }
}

function drawFood() {
  context.fillStyle = "#FFFFFF";
  context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

document.addEventListener('keydown', movement);

function movement(event) {
  if(event.keyCode == 37 && direction != "right" || event.keyCode == 65 && direction != "right") direction = "left";
  if(event.keyCode == 38 && direction != "down" || event.keyCode == 87 && direction != "down") direction = "up";
  if(event.keyCode == 39 && direction != "left" || event.keyCode == 68 && direction != "left") direction = "right";
  if(event.keyCode == 40 && direction != "up" || event.keyCode == 83 && direction != "up") direction = "down";
}

function startGame() {
  if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for(i = 1; i < snake.length; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('Game over :(\n\nPress OK and Wait  for 3 seconds the page will reload')
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    }
  }

  fillBackground();
  createSnake();
  drawFood();

  let snakeMoveX = snake[0].x;
  let snakeMoveY = snake[0].y;

  if(direction == "right") snakeMoveX += box;
  if(direction == "left") snakeMoveX -= box;
  if(direction == "up") snakeMoveY -= box;
  if(direction == "down") snakeMoveY += box;

  if(snakeMoveX != food.x || snakeMoveY != food.y) {
    snake.pop();
  } else {
   food.x = Math.floor(Math.random() * 15 +1) * box; 
   food.y = Math.floor(Math.random() * 15 +1) * box; 
  }

  let incrementSnake = {
    x: snakeMoveX,
    y: snakeMoveY
  }

  snake.unshift(incrementSnake);
}

let game = setInterval(startGame, 100);