<template>
  <div class="flex bg-gray-200 flex-1 p-4 space-x-4">
    <!-- Task -->
    <div v-for="task in tasks" class="bg-white border border-gray-300 w-64 flex flex-col">
      <div class="p-3">{{task.title}}</div>
      <div class="divide-y border-t">
        <div class="p-3" v-for="item in task.items">
          <div class="">{{item.title}}</div>
          <div class="whitespace-pre-line text-sm">{{item.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from './data.js'

export default {
  data : function() {
    return {
      tasks: []
    }
  },
  mounted: function() {
    let tasks = data.loadTasks();
    this.tasks = tasks;
  }
}
</script>
