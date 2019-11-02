function erase() {
  base_image = baseImage;
  base_image.src = baseImage.src;
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
