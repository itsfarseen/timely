<template>
  <div class="board-box">
    <div class="p-3">
      {{ board.title }}
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
        @click="startEditing"
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
import BoardItem from './BoardItem.vue';
const FOO = 123;
export default {
  components: {BoardItem},
  props: {
    board: Object
  },
  data: function() {
    return {
      adding: false,
      addItem: {title: "", desc: ""}
    }
  },
  methods: {
    startEditing: function() {
      this.adding = true;
      this.addItem.title= "";
      this.addItem.desc= "";
    },
    save: function() {
      if(this.addItem.title === "") return;
      this.$emit("add-item", this.addItem);
      this.adding = false;
    },
    cancel: function() {
      this.adding = false;
    },
  }
}
</script>
