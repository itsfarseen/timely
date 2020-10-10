<template>
  <div class="flex flex-wrap bg-gray-200 flex-1 p-4 gap-4 items-start content-start">
    <Board v-for="(board, idx) in boards" :board="board" :key="board.file"
           @add-item='newBoardItem(idx, $event)'
           @edit-item='editItem(idx, $event)'
           @delete-item='deleteItem(idx, $event)'/>
    <NewBoard @save='newBoard'/>
  </div>
</template>

<script>
import Board from './Board.vue'
import NewBoard from './NewBoard.vue'
import data from './data.js'

export default {
  components: {Board, NewBoard},
  data : function() {
    return {
      boards: []
    }
  },
  mounted: function() {
    let boards = data.loadBoards();
    this.boards = boards;
  },
  methods: {
    newBoard: function(boardName) {
      this.boards.push({title: boardName, items: []});
      data.saveBoards(this.boards);
    },
    newBoardItem: function(idx, {title, desc}) {
      this.boards[idx].items.push({title, desc});
      data.saveBoards(this.boards);
    },
    editItem: function(boardIdx, [idx, newItem]) {
      this.boards[boardIdx].items.splice(idx, 1, newItem);
      data.saveBoards(this.boards);
    },
    deleteItem: function(boardIdx, idx) {
      this.boards[boardIdx].items.splice(idx, 1)
      data.saveBoards(this.boards);
    }
  }
}
</script> 
