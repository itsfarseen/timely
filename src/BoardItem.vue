<template>
  <div class="p-3 group">
    <div v-if="!editing">
      <div class="flex space-x-2 group">
        <div class="flex-1">
          {{ item.title }}
        </div>
        <div class="flex space-x-2 invisible group-hover:visible">
          <a
            class="text-sm text-gray-800 hover:text-red-600 hover:underline
          cursor-pointer"
            @click="$emit('delete')"
          >Del</a>
          <a
            class="text-sm text-gray-800 hover:text-black
          hover:underline cursor-pointer"
            @click="startEditing"
          >Edit</a>
        </div>
      </div>
      <div class="whitespace-pre-line text-sm">
        {{ item.desc }}
      </div>
    </div>
    <div
      v-else
      class="flex flex-col"
    >
      <input
        v-model="editItem.title"
        placeholder="Title"
      >
      <textarea
        v-model="editItem.desc"
        placeholder="Description"
        class="text-sm"
      />
      <div class="flex">
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
  props: {
    item: Object
  },
  data: function() {
    return {
      editing: false,
      editItem: {title: "", desc: ""}
    }
  },
  methods: {
    startEditing: function() {
      this.editing = true;
      this.editItem.title = this.item.title;
      this.editItem.desc = this.item.desc;
    },
    cancel: function() {
      this.editing = false; 
    },
    save: function() {
      this.editing = false; 
      this.$emit("edit", this.editItem);
    }
  }
}
</script>
