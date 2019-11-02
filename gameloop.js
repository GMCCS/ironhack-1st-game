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
let paddleHeight = 100;
let leftPaddle = makeRect(
  paddleWidth,
  canvas.height / 2 - paddleHeight / 2,
  paddleWidth,
  paddleHeight,
  7,
  "black"
);
let rightPaddle = makeRect(
  canvas.width - paddleWidth - 20,
  canvas.height / 2 - paddleHeight / 2,
  paddleWidth,
  paddleHeight,
  7,
  "black"
);

// Keep track of the score
let leftScore = 0;
let rightScore = 0;

// Create the ball
let ballLength = 10;
let ballSpeed = 20;
let ball = makeRect(0, 0, ballLength, ballLength, ballSpeed, "black");

// Modify the ball object to have two speed properties, one for X and one for Y
ball.sX = ballSpeed;
ball.sY = ballSpeed / 2;

//Randomize initial direction
if (Math.random() > 0.5) {
  ball.sY *= 1;
}
//Randomize initial direction
if (Math.random() > 0.5) {
  ball.sX *= 1;
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

  // ctx.fillStyle = "#000000";
  // ctx.font = "24px Graduate";
  // ctx.textAlign = "center";

  if (rightScore === 10) {
    ctx.fillText("Sporting wins!", canvas.width / 2, canvas.height / 2);
  } else if (leftScore === 10) {
    ctx.fillText("Benfica wins!", canvas.width / 2, canvas.height / 2);
  }
}

// Clear the canvas
function erase() {
  
  base_image = new Image();
  base_image.src = "/images/Screenshot 2019-10-22 at 21.45.19.png";
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0);

    //Now for the white lines to create the field
    ctx.fillStyle = "white";
    ctx.fillRect(400, 0, 5, 750); //middle white line

    // inner rectangles

    ctx.fillRect(0, 280, 40, 5); //left goal - in upper horizontal line
    ctx.fillRect(0, 470, 40, 5); // left goal - in bottom horizontal line
    ctx.fillRect(40, 280, 5, 195); //left goal - in vertical line

    ctx.fillRect(760, 280, 40, 5); //right goal - in upper horizontal line
    ctx.fillRect(760, 470, 40, 5); // right goal - in bottom horizontal line
    ctx.fillRect(760, 280, 5, 195); //right goal - in vertical linne

    //outside rectangles

    ctx.fillRect(0, 135, 130, 5); //left goal - out upper horizontal line
    ctx.fillRect(0, 615, 130, 5); // left goal - out bottom horizontal line
    ctx.fillRect(130, 135, 5, 485); //left goal - out vertical line

    ctx.fillRect(680, 150, 120, 5); //right goal - out upper horizontal line
    ctx.fillRect(680, 600, 120, 5); // right goal - out bottom horizontal line
    ctx.fillRect(680, 150, 5, 455); //right goal - out vertical line

    ctx.beginPath();
    ctx.arc(85, canvas.height / 2, 5, 0, 2 * Math.PI); // penalti left goal
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(720, canvas.height / 2, 5, 0, 2 * Math.PI); // penalti right goal
    ctx.fill();
    ctx.closePath();

    // mid field circle out
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 5;
    ctx.arc(400, 375, 85, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // mid field circle inner
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.lineWidth = 5;
    ctx.arc(402.5, 375, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    //upper left corner
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 5;
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //upper right corner
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 5;
    ctx.arc(800, 0, 25, 0, 1 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //bottom left corner
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 5;
    ctx.arc(0, 750, 25, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //bottom right corner
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 5;
    ctx.arc(800, 750, 25, 0, 1.5 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //left half 25m circle
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 5;
    ctx.arc(50, canvas.height / 2, 115, 0.75, 1.75 * Math.PI, true);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    //right half 25m circle

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 5;
    ctx.arc(764, canvas.height / 2, 115, 2.35, 1.25 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
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
  // Bounce the ball off the top/bottom
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
  if (ball.x < leftPaddle.x)  {
    rightScore++;
    resetBall();
    ball.sY *= -1;
  } else if (ball.x + ball.w > rightPaddle.x + rightPaddle.w) {
    leftScore++;
    resetBall();
    ball.sX *= -1;
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
