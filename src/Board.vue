<template>
  <div class="board-box">
    <div
      v-if="!renaming"
      class="group flex"
    >
      <div class="p-3 flex-1">
        {{ board.title }}
      </div>
      <div class="p-3 invisible group-hover:visible">
        <a
          class="text-sm text-gray-800 hover:text-red-600 hover:underline
          cursor-pointer"
          @click="$emit('delete')"
        >Del</a>
        <a
          class="text-sm text-gray-800 hover:text-black
          hover:underline cursor-pointer"
          @click="startRename"
        >Edit</a>
      </div>
    </div>
    <div
      v-else
      class="group flex flex-col"
    >
      <input
        v-model="newName"
        placeholder="Title"
        class="p-4"
      >
      <div class="flex">
        <button
          class="board-btn"
          @click="saveRename"
        >
          Save
        </button>
        <button
          class="board-btn"
          @click="cancelRename"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="divide-y border-t flex flex-col">
      <BoardItem
        v-for="(item, idx) in board.items"
        :key="item.title"
        :item="item"
        @delete="$emit('delete-item', idx)"
        @edit="$emit('edit-item', [idx, $event])"
      />
      <button
        v-if="!adding"
        class="board-btn"
        @click="startAdding"
      >
        Add Item
      </button>
      <div
        v-if="adding"
        class="flex flex-col border-t border-red-600 divide-y"
      >
        <input
          v-model="addItem.title"
          type="text"
          class="p-4"
          placeholder="Item"
        >
        <textarea
          v-model="addItem.desc"
          type="text"
          class="p-4"
          placeholder="Description"
        />
        <div class="flex divide-x">
          <button
            class="board-btn"
            @click="cancel"
          >
            Cancel
          </button>
          <button
            class="board-btn"
            @click="save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoardItem from './BoardItem.vue'
export default {
  components: { BoardItem },
  props: {
    board: Object
  },
  data: function () {
    return {
      adding: false,
      addItem: { title: '', desc: '' },
      renaming: false,
      newName: ''
    }
  },
  methods: {
    startAdding: function () {
      this.adding = true
      this.addItem.title = ''
      this.addItem.desc = ''
    },
    save: function () {
      if (this.addItem.title === '') return
      this.$emit('add-item', this.addItem)
      this.adding = false
    },
    cancel: function () {
      this.adding = false
    },
    startRename: function () {
      this.renaming = true
      this.newName = this.board.title
    },
    saveRename: function () {
      this.$emit('rename', this.newName)
      this.renaming = false
    },
    cancelRename: function () {
      this.renaming = false
    }
  }
}
</script>
