<template>
  <div class="new-board-box">
    <button
      v-if="!editing"
      class="new-board-btn"
      @click="startEditing"
    >
      New Board
    </button>
    <div
      v-if="editing"
      class="flex flex-col divide-y"
    >
      <input
        v-model="boardName"
        type="text"
        class="p-4"
        placeholder="Board name"
      >
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
</template>

<script>
export default {
  props: [],
  data: function() {
    return {
      boardName: "",
      editing: false
    }
  },
  methods: {
    startEditing: function() {
      this.boardName = "";
      this.editing = true;
    },
    save: function() {
      if(this.boardName === "") return;
      this.$emit("save", this.boardName);
      this.editing = false;
    },
    cancel: function() {
      this.editing = false;
    }
  }
}
</script>
