const submit = document.getElementById("submit");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const form = document.getElementById("form");
const game = document.getElementById("game");
const message = document.querySelector(".message");

let currentPlayer = "x";
let playerOne = "";
let playerTwo = "";

const winPatterns = [
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"],
    ["1","4","7"],
    ["2","5","8"],
    ["3","6","9"],
    ["1","5","9"],
    ["3","5","7"]
];

submit.addEventListener("click", function () {
    playerOne = player1.value;
    playerTwo = player2.value;

    form.style.display = "none";
    game.style.display = "block";

    message.textContent = `${playerOne}, you're up`;
});

document.querySelectorAll(".cell").forEach(cell => {

    cell.addEventListener("click", function () {

        if (cell.textContent !== "") return;

        cell.textContent = currentPlayer;

        if (checkWinner()) {
            const winner = currentPlayer === "x" ? playerOne : playerTwo;
            message.textContent = `${winner} congratulations you won!`;
            return;
        }

        if (currentPlayer === "x") {
            currentPlayer = "o";
            message.textContent = `${playerTwo}, you're up`;
        } else {
            currentPlayer = "x";
            message.textContent = `${playerOne}, you're up`;
        }

    });

});

function checkWinner() {

    for (let pattern of winPatterns) {

        const a = document.getElementById(pattern[0]).textContent;
        const b = document.getElementById(pattern[1]).textContent;
        const c = document.getElementById(pattern[2]).textContent;

        if (a !== "" && a === b && b === c) {
            return true;
        }

    }

    return false;
}