<script setup>
import { ref } from 'vue'
import GameCell from './GameCell.vue'

let history = [
  [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
]
let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const currentHistoryIndex = ref(0)
let currentSign = 'X'

const cellClick = (row, col) => {
  if (history[currentHistoryIndex.value][row][col]) {
    return
  }

  board[row][col] = currentSign
  // erase last history entries if user plays after cancel
  if (currentHistoryIndex.value !== history.length - 1) {
    history.length = currentHistoryIndex.value + 1
  }
  // map & slice return new arrays, for [history] not to stock references
  history.push(board.map((array) => array.slice()))
  moveCurrentHistoryIndexBy(1)
  checkIfPlayerWon()
}

const moveCurrentHistoryIndexBy = (offset) => {
  currentHistoryIndex.value += offset
  // map & slice return new arrays, for [board] not to stock references
  board = history[currentHistoryIndex.value].map((array) => array.slice())
  currentSign = currentSign == 'X' ? 'O' : 'X'
}

const checkIfPlayerWon = () => {
  const winningLines = {
    rows: board,
    columns: [
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]]
    ],
    diagonals: [
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]]
    ]
  }
  for (const lines in winningLines) {
    winningLines[lines].forEach((line, index) => {
      if (line[0] && line[0] === line[1] && line[0] === line[2]) {
        highlightWinningLine(lines, index)
      }
    })
  }
}

const highlightWinningLine = (lines, colId) => {
  console.log(lines + ' ' + colId)
}
</script>

<template>
  <div id="board">
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

  <div class="time-travel">
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
</template>

<style scoped>
.row {
  display: flex;
}

.time-travel {
  margin: 1em auto;
  display: flex;
  justify-content: center;
  gap: 1em;
}
.time-travel button {
  padding: 0.2em 1.5em;
}
</style>
