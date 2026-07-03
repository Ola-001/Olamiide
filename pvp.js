// ==============================
// ELEMENTS
// ==============================

const player1Roll = document.getElementById("player1Roll");
const player2Roll = document.getElementById("player2Roll");
const resetButton = document.getElementById("resetButton");

const player1Dice1 = document.getElementById("player1Dice1");
const player1Dice2 = document.getElementById("player1Dice2");

const player2Dice1 = document.getElementById("player2Dice1");
const player2Dice2 = document.getElementById("player2Dice2");

const player1TotalEl = document.getElementById("player1Total");
const player2TotalEl = document.getElementById("player2Total");

const player1WinsEl = document.getElementById("player1Wins");
const player2WinsEl = document.getElementById("player2Wins");
const drawsEl = document.getElementById("draws");

const attemptsEl = document.getElementById("attempts");
const winnerEl = document.getElementById("winner");
const turnEl = document.getElementById("turn");

// ==============================
// VARIABLES
// ==============================

let player1Wins = 0;
let player2Wins = 0;
let draws = 0;
let rounds = 0;

let player1Score = 0;
let player2Score = 0;

let gameOver = false;
let currentTurn = 1; // 1 = player1, 2 = player2

// ==============================
// DICE ICONS
// ==============================

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
// CORE FUNCTIONS
// ==============================

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDice(el, value) {
    el.innerHTML = `<i class="fa-solid ${diceIcons[value]}"></i>`;
}

function animateDice(d1, d2) {
    updateDice(d1, rollDice());
    updateDice(d2, rollDice());
}

// ==============================
// FAIR START SYSTEM
// ==============================

function decideStarter() {
    currentTurn = Math.random() < 0.5 ? 1 : 2;

    if (currentTurn === 1) {
        turnEl.textContent = "Player 1 Starts";
        player1Roll.disabled = false;
        player2Roll.disabled = true;
    } else {
        turnEl.textContent = "Player 2 Starts";
        player1Roll.disabled = true;
        player2Roll.disabled = false;
    }
}

// ==============================
// PLAYER 1 TURN
// ==============================

player1Roll.addEventListener("click", () => {
    if (gameOver || currentTurn !== 1) return;

    player1Roll.disabled = true;
    player2Roll.disabled = true;

    turnEl.textContent = "Player 1 Rolling...";

    player1Dice1.classList.add("rolling");
    player1Dice2.classList.add("rolling");

    const animation = setInterval(() => {
        animateDice(player1Dice1, player1Dice2);
    }, 100);

    setTimeout(() => {
        clearInterval(animation);

        player1Dice1.classList.remove("rolling");
        player1Dice2.classList.remove("rolling");

        const d1 = rollDice();
        const d2 = rollDice();

        updateDice(player1Dice1, d1);
        updateDice(player1Dice2, d2);

        player1Score = d1 + d2;
        player1TotalEl.textContent = player1Score;

        currentTurn = 2;

        turnEl.textContent = "Player 2 Turn";
        player2Roll.disabled = false;

    }, 1200);
});

// ==============================
// PLAYER 2 TURN
// ==============================

player2Roll.addEventListener("click", () => {
    if (gameOver || currentTurn !== 2) return;

    player2Roll.disabled = true;

    turnEl.textContent = "Player 2 Rolling...";

    player2Dice1.classList.add("rolling");
    player2Dice2.classList.add("rolling");

    const animation = setInterval(() => {
        animateDice(player2Dice1, player2Dice2);
    }, 100);

    setTimeout(() => {
        clearInterval(animation);

        player2Dice1.classList.remove("rolling");
        player2Dice2.classList.remove("rolling");

        const d1 = rollDice();
        const d2 = rollDice();

        updateDice(player2Dice1, d1);
        updateDice(player2Dice2, d2);

        player2Score = d1 + d2;
        player2TotalEl.textContent = player2Score;

        rounds++;
        attemptsEl.textContent = rounds;

        // ==============================
        // WIN LOGIC
        // ==============================

        if (player1Score > player2Score) {
            player1Wins++;
            winnerEl.textContent = "Player 1 Wins Round";
        } 
        else if (player2Score > player1Score) {
            player2Wins++;
            winnerEl.textContent = "Player 2 Wins Round";
        } 
        else {
            draws++;
            winnerEl.textContent = "Draw";
        }

        player1WinsEl.textContent = player1Wins;
        player2WinsEl.textContent = player2Wins;
        drawsEl.textContent = draws;

        // ==============================
        // MATCH END (FIRST TO 7)
        // ==============================

        if (player1Wins >= 7) {
            winnerEl.textContent = "PLAYER 1 WINS MATCH!";
            gameOver = true;
            player1Roll.disabled = true;
            player2Roll.disabled = true;
            return;
        }

        if (player2Wins >= 7) {
            winnerEl.textContent = "PLAYER 2 WINS MATCH!";
            gameOver = true;
            player1Roll.disabled = true;
            player2Roll.disabled = true;
            return;
        }

        currentTurn = 1;
        turnEl.textContent = "Player 1 Turn";
        player1Roll.disabled = false;

    }, 1200);
});

// ==============================
// RESET GAME
// ==============================

resetButton.addEventListener("click", () => {

    player1Wins = 0;
    player2Wins = 0;
    draws = 0;
    rounds = 0;

    player1Score = 0;
    player2Score = 0;

    gameOver = false;

    player1WinsEl.textContent = 0;
    player2WinsEl.textContent = 0;
    drawsEl.textContent = 0;
    attemptsEl.textContent = 0;

    player1TotalEl.textContent = 0;
    player2TotalEl.textContent = 0;

    winnerEl.textContent = "None";

    player1Roll.disabled = false;
    player2Roll.disabled = true;

    const resetIcon = `<i class="fa-solid fa-dice-one"></i>`;

    player1Dice1.innerHTML = resetIcon;
    player1Dice2.innerHTML = resetIcon;
    player2Dice1.innerHTML = resetIcon;
    player2Dice2.innerHTML = resetIcon;

    decideStarter();
});

// ==============================
// INIT GAME
// ==============================

decideStarter();