<script setup>
import { ref } from 'vue'
import GameCell from './GameCell.vue'

let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const history = [ board.map(row => row.slice()) ];
const currentHistoryIndex = ref(0);
let currentSign           = 'X';
let winner                = null;

const boardDiv      = ref(null);
const timeTravelDiv = ref(null);
const playAgainBtn  = ref(null);

const winningCombinations = [
  // rows
  [ { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 } ],
  [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 } ],
  [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 } ],
  // columns
  [ { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 } ],
  [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 } ],
  [ { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 } ],
  // diagonals
  [ { row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 } ],
  [ { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 } ]
];

const cellClick = (row, col) => {
  if (history[currentHistoryIndex.value][row][col]) {
    return;
  }
  board[row][col] = currentSign;
  // erase last history entries if user plays after cancel
  if (currentHistoryIndex.value !== history.length - 1) {
    history.length = currentHistoryIndex.value + 1;
  }
  // map & slice return new arrays, for [history] not to stock references
  history.push(board.map((array) => array.slice()));
  moveCurrentHistoryIndexBy(1);
  checkIfPlayerWon();
}

const moveCurrentHistoryIndexBy = (offset) => {
  currentHistoryIndex.value += offset;
  // map & slice return new arrays, for [board] not to stock references
  board = history[currentHistoryIndex.value].map((array) => array.slice());
  currentSign = currentSign == 'X' ? 'O' : 'X';
}

const checkIfPlayerWon = () => {
  winningCombinations.forEach ((coords) => {
    const cell0 = board[coords[0].row][coords[0].col];
    const cell1 = board[coords[1].row][coords[1].col];
    const cell2 = board[coords[2].row][coords[2].col];
    if (cell0 && cell0 === cell1 && cell0 === cell2) {
      winner = cell0;
      highlightWinningLine(coords);
      stopGame();
    }
  })
}

const highlightWinningLine = (coords) => {
  coords.forEach ((coord) => {
    const cell  = document.getElementById(`${coord.row}${coord.col}`);
    cell.classList.add('winning-cell');
  })
}

const stopGame = () => {
  boardDiv.value.classList.add('stop-game');
  timeTravelDiv.value.classList.add('d-none');
  playAgainBtn.value.classList.remove('d-none');
}

const playAgain = () => {
  window.location.reload();
}
</script>

<template>
  <div ref="boardDiv">
    <div class="row">
      <GameCell id="00" @click="cellClick(0, 0)" :content="board[0][0]" />
      <GameCell id="01" @click="cellClick(0, 1)" :content="board[0][1]" />
      <GameCell id="02" @click="cellClick(0, 2)" :content="board[0][2]" />
    </div>
    <div class="row">
      <GameCell id="10" @click="cellClick(1, 0)" :content="board[1][0]" />
      <GameCell id="11" @click="cellClick(1, 1)" :content="board[1][1]" />
      <GameCell id="12" @click="cellClick(1, 2)" :content="board[1][2]" />
    </div>
    <div class="row">
      <GameCell id="20" @click="cellClick(2, 0)" :content="board[2][0]" />
      <GameCell id="21" @click="cellClick(2, 1)" :content="board[2][1]" />
      <GameCell id="22" @click="cellClick(2, 2)" :content="board[2][2]" />
    </div>
  </div>

  <div ref="timeTravelDiv">
    <!-- cancel button -->
    <button
      :disabled="currentHistoryIndex === 0"
      @click="moveCurrentHistoryIndexBy(-1)"
    >
      &larr;
    </button>
    <!-- redo button -->
    <button
      :disabled="currentHistoryIndex === history.length - 1"
      @click="moveCurrentHistoryIndexBy(1)"
    >
      &rarr;
    </button>
  </div>
  <div ref="playAgainBtn" class="d-none">
    <p class="win-message">"{{ winner }}" has won !!</p>
    <button @click="playAgain">Play again</button>
  </div>
</template>

<style scoped>
.row {
  display: flex;
}

#time-travel {
  margin: 1em auto;
  display: flex;
  justify-content: center;
  gap: 1em;
}
button {
  padding: 0.2em 1.5em;
}
.winning-cell {
  font-weight: bold;
  background-color: lightgreen;
}
.stop-game {
  pointer-events: none;
}
.d-none {
  display: none !important;
}
.win-message {
  font-weight: bold;
  margin-bottom: 1.5em;
}
</style>
