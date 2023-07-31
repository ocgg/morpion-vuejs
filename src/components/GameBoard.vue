<script setup>
import { ref } from 'vue'
import GameCell from './GameCell.vue'

let history = [
  [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
]
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const currentHistoryIndex = ref(0)
let currentSign = 'X'

const cellClick = (row, col) => {
  if (history[currentHistoryIndex.value][row][col]) {
    return
  }

  board[row][col] = currentSign

  // erase last history entries if user play after cancel
  if (currentHistoryIndex.value !== history.length - 1) {
    history.length = currentHistoryIndex.value + 1
  }
  // map & slice return new arrays, for [history] not to stock references
  history.push(board.map((array) => array.slice()))
  updateCurrentHistoryIndex(1)
}

const updateCurrentHistoryIndex = (indexChange) => {
  currentHistoryIndex.value += indexChange
  // map & slice return new arrays, for [board] not to stock references
  board = history[currentHistoryIndex.value].map((array) => array.slice())
  currentSign = currentSign == 'X' ? 'O' : 'X'
}
</script>

<template>
  <div id="board">
    <div class="row">
      <GameCell @click="cellClick(0, 0)" :content="board[0][0]" />
      <GameCell @click="cellClick(0, 1)" :content="board[0][1]" />
      <GameCell @click="cellClick(0, 2)" :content="board[0][2]" />
    </div>
    <div class="row">
      <GameCell @click="cellClick(1, 0)" :content="board[1][0]" />
      <GameCell @click="cellClick(1, 1)" :content="board[1][1]" />
      <GameCell @click="cellClick(1, 2)" :content="board[1][2]" />
    </div>
    <div class="row">
      <GameCell @click="cellClick(2, 0)" :content="board[2][0]" />
      <GameCell @click="cellClick(2, 1)" :content="board[2][1]" />
      <GameCell @click="cellClick(2, 2)" :content="board[2][2]" />
    </div>
  </div>

  <div class="time-travel">
    <button
      :disabled="currentHistoryIndex === 0"
      @click="updateCurrentHistoryIndex(-1)"
    >
      &larr;
    </button>
    <button
      :disabled="currentHistoryIndex === history.length - 1"
      @click="updateCurrentHistoryIndex(1)"
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
