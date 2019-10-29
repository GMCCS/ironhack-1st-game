let canvas = document.getElementById("canvas-board");
let ctx = canvas.getContext("2d");

// Key Codes
let W = 87;
let S = 83;
let UP = 38;
let DOWN = 40;

// Keep track of pressed keys
let keys = {
  W: false,
  S: false,
  UP: false,
  DOWN: false
};

// Create a rectangle object - for paddles, ball, etc
function makeRect(x, y, width, height, speed, color) {
  if (!color) color = "#000000";
  return {
    x: x,
    y: y,
    w: width,
    h: height,
    s: speed,
    c: color,
    draw: function() {
      ctx.fillStyle = this.c;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  };
}

// Create the paddles
let paddleWidth = 20;
let paddleHeight = 80;
let leftPaddle = makeRect(
  paddleWidth,
  canvas.height / 2,
  paddleWidth,
  paddleHeight,
  5,
  "red"
);
let rightPaddle = makeRect(
  canvas.width - paddleWidth - 20,
  canvas.height / 2,
  paddleWidth,
  paddleHeight,
  5,
  "green"
);

// Keep track of the score
let leftScore = 0;
let rightScore = 0;

// Create the ball
let ballLength = 10;
let ballSpeed = 6;
let ball = makeRect(0, 0, ballLength, ballLength, ballSpeed, "yellow");

// Modify the ball object to have two speed properties, one for X and one for Y
ball.sX = ballSpeed;
ball.sY = ballSpeed / 2;

//Randomize initial direction
if (Math.random() > 0.5) {
  ball.sX *= 1;
}
//Randomize initial direction
if (Math.random() > 0.5) {
  ball.sY *= 1;
}

// Reset the ball's position and speed after scoring
function resetBall() {
  ball.x = canvas.width / 2 - ball.w / 2;
  ball.y = canvas.height / 2 - ball.w / 2;
  ball.sX = ballSpeed;
  ball.sY = ballSpeed / 2;
}

// Bounce the ball off of a paddle
function bounceBall() {
  // Increase and reverse the Y speed
  if (ball.sX > 0) {
    ball.sX += 1;

    // Add some "spin"
    if (keys.UP) {
      ball.sY -= 1;
    } else if (keys.DOWN) {
      ball.sY += 1;
    }
  } else {
    ball.sX -= 1;

    // Add some "spin"
    if (keys.W) {
      ball.sY -= 1;
    } else if (keys.S) {
      ball.sY += 1;
    }
  }
  ball.sX *= -1;
}

// Listen for keydown events
canvas.addEventListener("keydown", function(e) {
  if (e.keyCode === W) {
    keys.W = true;
  }
  if (e.keyCode === S) {
    keys.S = true;
  }
  if (e.keyCode === UP) {
    keys.UP = true;
  }
  if (e.keyCode === DOWN) {
    keys.DOWN = true;
  }
});

// Listen for keyup events
canvas.addEventListener("keyup", function(e) {
  if (e.keyCode === W) {
    keys.W = false;
  }
  if (e.keyCode === S) {
    keys.S = false;
  }
  if (e.keyCode === UP) {
    keys.UP = false;
  }
  if (e.keyCode === DOWN) {
    keys.DOWN = false;
  }
});

// Show the menu
function menu() {
  erase();
  //show the field with Start
  backgroundGrass();
}

// Start the game
function startGame() {
  // Don't accept any more clicks
  canvas.removeEventListener("click", startGame);

  // Put the ball in place
  resetBall();

  // Kick off the game loop
  draw();
}

// Show the end game screen
function endGame() {
  erase();
  ctx.fillStyle = "#000000";
  ctx.font = "24px Graduate";
  ctx.textAlign = "center";
  let winner = 1;
  if (rightScore === 10) winner = 2;
  ctx.fillText(
    "Player " + winner + " wins!",
    canvas.width / 2,
    canvas.height / 2
  );
}

// Clear the canvas
function erase() {
  ctx.fillStyle = "#FFFFFF";

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Main draw loop
function draw() {
  erase();
  // Move the paddles
  if (keys.W) {
    leftPaddle.y -= leftPaddle.s;
  }
  if (keys.S) {
    leftPaddle.y += leftPaddle.s;
  }
  if (keys.UP) {
    rightPaddle.y -= rightPaddle.s;
  }
  if (keys.DOWN) {
    rightPaddle.y += rightPaddle.s;
  }
  // Move the ball
  ball.x += ball.sX;
  ball.y += ball.sY;
  // Bounce the ball off the left/right
  if (ball.y < 0 || ball.y + ball.h > canvas.height) {
    ball.sY *= -1;
  }
  // Don't let the paddles go off screen
  [leftPaddle, rightPaddle].forEach(function(paddle) {
    if (paddle.y < 0) {
      paddle.y = 0;
    }
    if (paddle.y + paddle.h > canvas.height) {
      paddle.y = canvas.height - paddle.h;
    }
  });
  // Bounce the ball off the paddles
  if (
    ball.y + ball.h / 2 >= leftPaddle.y &&
    ball.y + ball.h / 2 <= leftPaddle.y + leftPaddle.h
  ) {
    if (ball.x <= leftPaddle.x + leftPaddle.w) {
      bounceBall();
    }
  }
  if (
    ball.y + ball.h / 2 >= rightPaddle.y &&
    ball.y + ball.h / 2 <= rightPaddle.y + rightPaddle.h
  ) {
    if (ball.x + ball.w >= rightPaddle.x) {
      bounceBall();
    }
  }

  // Score if the ball goes past a paddle
  if (ball.x < leftPaddle.x) {
    rightScore++;
    resetBall();
    ball.sY *= -1;
  } else if (ball.x + ball.w > rightPaddle.x + rightPaddle.w) {
    leftScore++;
    resetBall();
    ball.sY *= -1;
  }

  // Draw the paddles and ball
  leftPaddle.draw();
  rightPaddle.draw();
  ball.draw();

  // Draw the scores
  ctx.fillStyle = "#000000";
  ctx.font = "24px Graduate";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + leftScore, 0, 20);
  ctx.textAlign = "right";
  ctx.fillText("Score: " + rightScore, canvas.width, 20);

  // End the game or keep going
  if (leftScore === 10 || rightScore === 10) {
    endGame();
  } else {
    window.requestAnimationFrame(draw);
  }
}

// Show the menu to start the game

menu();

canvas.focus();
