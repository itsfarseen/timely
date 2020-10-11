<template>
  <div class="flex-1 flex flex-col gap-3 bg-gray-200 p-4 relative">
    <div class="text-right">
      <a
        class="text-gray-600 hover:underline cursor-pointer"
        @click="startAddSchedule"
      >Add Schedule</a>
    </div>
    <TimeGrid :timetable="timetable" />
    <!-- Modal -->
    <div
      v-if="adding"
      class="modal-box"
    >
      <ScheduleForm
        @save="saveAddSchedule"
        @cancel="cancelAddSchedule"
      />
    </div>
  </div>
</template>

<script>
import TimeGrid from './TimeGrid.vue'
import ScheduleForm from './ScheduleForm.vue'
import data from './data.js'

export default {
  components: { TimeGrid, ScheduleForm },
  data () {
    return {
      adding: false,
      timetable: []
    }
  },
  mounted () {
    this.timetable = data.loadTimetable()
  },
  methods: {
    startAddSchedule () {
      this.adding = true
    },
    saveAddSchedule (schedule) {
      this.adding = false
      this.timetable.push(schedule)
      data.saveTimetable(this.timetable)
    },
    cancelAddSchedule () {
      this.adding = false
    }
  }
}

</script>
