const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const ctx = gameboard.getContext("2d");

let boardWidth = 500;
let boardHeight = 500;
let paddleSpin = 1.5; // >= 0.0
let paddleForce = 1.1; // >= 1.0
let paddleWidth = 25;
let paddleLength = 100;
let ballRadius = 12.5;

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;

function resetGame() {
    clearInterval(intervalID); // CODE
    gameboard.width = boardWidth;
    gameboard.height = boardHeight;
    

    scoreL = 0;
    scoreR = 0;

   updateScore();
   resetPaddles();
   resetBall();
   nextTick(); 

}

function resetPaddles() {
    paddleL = new Paddle(0, 0, paddleLength, paddleWidth, "blue");
    paddleR = new Paddle(boardWidth-paddleWidth, 0, paddleLength, paddleWidth, "purple");// CODE
}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, -5, -2, ballRadius, "white");
}

function clearBoard() {
    ctx.fillStyle = " pink";
    ctx.fillRect(0,0, boardWidth, boardHeight);
}

function draw() {
    clearBoard();
    ball.draw(ctx);
   paddleL.draw(ctx);
   paddleR.draw(ctx);
}

function pauseGame() {
    clearInterval(intervalID);
}

function resumeGame() {
    nextTick(); 
}

let intervalID;

function nextTick() {
    intervalID = setTimeout(
        () => {
            paddleL.move();
            if (cpucheck.checked) {
                paddleR.moveCPU(ball);
            } else {
                paddleR.move();
            }
            ball.bounceWall();
            if (ball.bouncePaddleL(paddleL)) score("right");
            if (ball.bouncePaddleR(paddleR)) score("left");
            ball.move();
           draw()
           nextTick(); // CODE
        }, 10
    );
}

function score(player) {
   if (player == "left") scoreL++; // CODE
   if (player == "right") scoreR++;
   

   updateScore();
   resetBall();

}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    
        if (scoreL -scoreR > 10) paddleL.l = 75;
        if (scoreR - scoreL > 10 ) paddleR.l = 75; 
    

    scoreboard.innerHTML = `${scoreL} : ${scoreR}`;

}