//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);

let currentPlayer = "X";
let player1, player2;
const boardState = Array(9).fill(null);

function startGame() {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";

  document.getElementById("player-input").style.display = "none";
  document.getElementById("game-board").style.display = "block";
  document.getElementById("turn-message").textContent = `${player1}, you're up!`;
  
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

function handleCellClick(e) {
  const cell = e.target;
  const cellId = parseInt(cell.id) - 1;

  if (!boardState[cellId]) {
    boardState[cellId] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
      document.getElementById("turn-message").textContent = 
        `${currentPlayer === "X" ? player1 : player2}, congratulations you won!`;
      endGame();
    } else if (boardState.every(cell => cell)) {
      document.getElementById("turn-message").textContent = "It's a draw!";
      endGame();
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("turn-message").textContent =
    `${currentPlayer === "X" ? player1 : player2}, you're up!`;
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],           // diagonals
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => boardState[index] === currentPlayer);
  });
}

function endGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
}
