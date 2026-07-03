// ==============================
// ELEMENTS
// ==============================

const rollButton = document.getElementById("rollButton");
const resetButton = document.getElementById("resetButton");

const playerDice1 = document.getElementById("playerDice1");
const playerDice2 = document.getElementById("playerDice2");

const computerDice1 = document.getElementById("computerDice1");
const computerDice2 = document.getElementById("computerDice2");

const attempts = document.getElementById("attempts");
const winner = document.getElementById("winner");

const playerWinsEl = document.getElementById("playerWins");
const computerWinsEl = document.getElementById("computerWins");
const drawsEl = document.getElementById("draws");

// ==============================
// VARIABLES
// ==============================

let attemptCount = 0;

let playerWins = 0;
let computerWins = 0;
let draws = 0;

let gameOver = false;

const diceIcons = [
    "",
    "fa-dice-one",
    "fa-dice-two",
    "fa-dice-three",
    "fa-dice-four",
    "fa-dice-five",
    "fa-dice-six"
];

// ==============================
// FUNCTIONS
// ==============================

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDice(element, number) {
    element.innerHTML = `<i class="fa-solid ${diceIcons[number]}"></i>`;
}

function animateDice() {
    updateDice(playerDice1, rollDice());
    updateDice(playerDice2, rollDice());
    updateDice(computerDice1, rollDice());
    updateDice(computerDice2, rollDice());
}

// ==============================
// ROLL BUTTON
// ==============================

rollButton.addEventListener("click", () => {

    if (gameOver) return;

    rollButton.disabled = true;

    attemptCount++;
    attempts.textContent = attemptCount;

    winner.textContent = "Rolling...";

    playerDice1.classList.add("rolling");
    playerDice2.classList.add("rolling");
    computerDice1.classList.add("rolling");
    computerDice2.classList.add("rolling");

    const animation = setInterval(animateDice, 100);

    setTimeout(() => {

        clearInterval(animation);

        playerDice1.classList.remove("rolling");
        playerDice2.classList.remove("rolling");
        computerDice1.classList.remove("rolling");
        computerDice2.classList.remove("rolling");

        const player1 = rollDice();
        const player2 = rollDice();
        const computer1 = rollDice();
        const computer2 = rollDice();

        updateDice(playerDice1, player1);
        updateDice(playerDice2, player2);
        updateDice(computerDice1, computer1);
        updateDice(computerDice2, computer2);

        const playerTotal = player1 + player2;
        const computerTotal = computer1 + computer2;

        // ==============================
        // WINNER LOGIC
        // ==============================

        if (player1 === 6 && player2 === 6) {

            playerWins++;

            winner.textContent = "Player Double Six! +1 Win";

        } else if (computer1 === 6 && computer2 === 6) {

            computerWins++;

            winner.textContent = "Computer Double Six! +1 Win";

        } else if (playerTotal > computerTotal) {

            playerWins++;

            winner.textContent = "Player Wins Round";

        } else if (computerTotal > playerTotal) {

            computerWins++;

            winner.textContent = "Computer Wins Round";

        } else {

            draws++;

            winner.textContent = "Draw Round";

        }

        // update scoreboard
        playerWinsEl.textContent = playerWins;
        computerWinsEl.textContent = computerWins;
        drawsEl.textContent = draws;

        // ==============================
        // CHECK GAME OVER
        // ==============================

        if (playerWins >= 10) {

            winner.textContent = "PLAYER WINS THE GAME (FIRST TO 10)";

            gameOver = true;
            rollButton.disabled = true;

        } else if (computerWins >= 10) {

            winner.textContent = "COMPUTER WINS THE GAME (FIRST TO 10)";

            gameOver = true;
            rollButton.disabled = true;

        } else {

            rollButton.disabled = false;

        }

    }, 1500);
});

// ==============================
// RESET BUTTON
// ==============================

resetButton.addEventListener("click", () => {

    attemptCount = 0;
    playerWins = 0;
    computerWins = 0;
    draws = 0;
    gameOver = false;

    attempts.textContent = 0;
    playerWinsEl.textContent = 0;
    computerWinsEl.textContent = 0;
    drawsEl.textContent = 0;

    winner.textContent = "None";

    rollButton.disabled = false;

    const resetIcon = '<i class="fa-solid fa-dice-one"></i>';

    playerDice1.innerHTML = resetIcon;
    playerDice2.innerHTML = resetIcon;
    computerDice1.innerHTML = resetIcon;
    computerDice2.innerHTML = resetIcon;
});