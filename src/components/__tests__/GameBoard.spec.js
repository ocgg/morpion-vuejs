import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GameBoard from '../GameBoard.vue'


describe('GameBoard.vue: basic click behavior', () => {
  const wrapper = mount(GameBoard);
  wrapper.vm.currentSign = 'X'
  const firstCell = wrapper.find('#board > .row > .cell')

  it('Player sign should change on cell click', async () => {
    await firstCell.trigger('click')
    expect(wrapper.vm.board[0][0]).toBe('X')
    expect(wrapper.vm.currentSign).toBe('O')
  })
  
  it('Nothing should happen if click on non-empty cell', async () => {
    await firstCell.trigger('click')
    expect(wrapper.vm.board[0][0]).toBe('X')
    expect(wrapper.vm.currentSign).toBe('O')
  })
})


describe('GameBoard.vue: cancel & redo buttons', () => {
  const wrapper = mount(GameBoard);
  wrapper.vm.currentSign = 'X'
  wrapper.vm.cellClick(0, 0)
  const cancelBtn = wrapper.find('.time-travel>button')
  const redoBtn   = wrapper.find('.time-travel>button:last-child')

  it('Player sign should change on cancel & redo click', async () => {
    await cancelBtn.trigger('click')
    expect(wrapper.vm.currentSign).toBe('X')
    expect(wrapper.vm.board[0][0]).toBe('')
    await redoBtn.trigger('click')
    expect(wrapper.vm.board[0][0]).toBe('X')
    expect(wrapper.vm.currentSign).toBe('O')
  })
})