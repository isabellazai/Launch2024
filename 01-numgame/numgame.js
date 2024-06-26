const guess = document.getElementById("guess");
const report = document.getElementById("report");


let MINNUM=0;
let MAXNUM = 100;

let secret;

var myConfetti = confetti.create(null, {
    resize: true,
    useWorker: true
});

function loadGame() {
    guess.max = MAXNUM;
    guess.min= MINNUM;

    secret = Math.random();
    let range = MAXNUM - MINNUM + 1;
    secret = secret * range;
    secret = secret + MINNUM;
    secret = Math.floor(secret); // Convert float to integer
}

function makeGuess() {
    let myGuess = parseInt(guess.value); // GET FROM DOCUMENT!
    if (myGuess==secret) {
        report.innerHTML += `<br>${myGuess} is correct!`;
        myConfetti ({
            particleCount: 200,
            spread: 360
        })
    }
    else if (myGuess < secret) {
        report.innerHTML += `<br>${myGuess} is too small`;
    } 
    else {
        report.innerHTML += `<br>${myGuess} is too big`;

    }
}

