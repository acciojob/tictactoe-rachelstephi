//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "x";
let currentName = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (!player1 || !player2) return;

    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    currentPlayer = "x";
    currentName = player1;

    message.textContent = `${player1}, you're up`;
});

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || gameOver) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWinner();

        if (winner) {
            const winnerName = currentPlayer === "x" ? player1 : player2;

            winner.forEach(i => {
                cells[i].classList.add("winner");
            });

            message.textContent = `${winnerName}, congratulations you won!`;
            gameOver = true;
            return;
        }

        if (board.every(value => value !== "")) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        if (currentPlayer === "x") {
            currentPlayer = "o";
            currentName = player2;
        } else {
            currentPlayer = "x";
            currentName = player1;
        }

        message.textContent = `${currentName}, you're up`;
    });
});

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return combo;
        }
    }

    return null;
}