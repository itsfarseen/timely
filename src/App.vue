<template>
  <div class="bg-white min-h-screen">
    <nav class="p-2 flex space-x-4">
      <div v-for="tab in tabs"
           class="border-b border-gray-100"
           :class="tab_active == tab?'border-red-500':'hover:border-red-300'"
           @click="tab_active=tab">
        {{tab}}
      </div>
    </nav>
    <main>
      <Tasks v-if="tab_active == 'Tasks'"/>
      <Soon v-if="tab_active != 'Tasks'"/>
    </main>
  </div>
</template>

<script>
import Tasks from './Tasks.vue'
import Soon from './Soon.vue'

export default {
  components: {
    Soon,
    Tasks
  },
  data: function () {
    return {
      tabs: ["Tasks", "Timetable", "Schedule", "Timetrack"],
      tab_active: "Tasks"
    }
  }
}
</script>
