const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

reset.addEventListener("click", restartGame);

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach(box => box.textContent = "");
    displayCurrentPlayer();
}

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

function handleBoxClick(event) {
    const box = event.target;
    const boxIndex = Array.from(boxes).indexOf(box);
    if (gameState[boxIndex] !== "" || !gameActive) {
        return;
    }
    gameState[boxIndex] = currentPlayer;
    box.textContent = currentPlayer;
    checkResult();
    if (gameActive) { 
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        displayCurrentPlayer();
    }
}

function displayCurrentPlayer() {
    let currentPlayerElement = document.querySelector('.currentPlayer');
    if (gameActive) {
        currentPlayerElement.innerText = `Current Player: ${currentPlayer}`;
    } else {
        currentPlayerElement.innerText = ""; 
    }
}

function displayWinner(winner) {
    let currentPlayerElement = document.querySelector('.currentPlayer');
    if (winner) {
        currentPlayerElement.innerText = `Winner: ${winner}`;
    } else {
        currentPlayerElement.innerText = "It's a draw!";
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        displayWinner(currentPlayer); 
        return;
    }

    if (!gameState.includes("")) {
        gameActive = false;
        displayWinner(null); 
        return;
    }
}

function initializeGame() {
    boxes.forEach(box => box.addEventListener("click", handleBoxClick));
    displayCurrentPlayer();
}

document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
});
