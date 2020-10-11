<template>
  <div class="flex-1 flex flex-col gap-3 bg-gray-200 p-4 relative">
    <div class="flex gap-3">
      <a
        class="text-gray-600 hover:underline cursor-pointer"
        @click="startAddSchedule"
      >Add Schedule</a>
      <a
        class="text-gray-600 hover:underline cursor-pointer"
        @click="startEditSchedule"
      >Edit Schedules</a>
    </div>
    <TimeGrid :timetable="timetable" />
    <!-- Add Modal -->
    <div
      v-if="adding"
      class="modal-box"
    >
      <ScheduleForm
        :title="'Add Schedule'"
        @save="saveAddSchedule"
        @cancel="cancelAddSchedule"
      />
    </div>
    <!-- Edit Modal -->
    <div
      v-if="editing"
      class="modal-box"
    >
      <div class="bg-white flex flex-col gap-3">
        <div class="p-3 pb-0 flex">
          <label class="flex gap-3 items-baseline"> Select Schedule
            <select v-model="editIdx">
              <option
                v-for="(data, idx) in timetable"
                :key="idx"
                :value="idx"
              >
                {{ data.name }}
              </option>
            </select>
          </label>
          <button
            class="board-btn"
            @click="deleteSchedule(editIdx)"
          >
            Delete
          </button>
          <button
            class="board-btn"
            @click="cancelEditSchedule"
          >
            Close
          </button>
        </div>
        <ScheduleForm
          :title="'Edit Schedule'"
          :schedule-input="timetable[editIdx]"
          @save="saveEditSchedule(editIdx, $event)"
          @cancel="cancelEditSchedule"
        />
      </div>
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
      editing: false,
      editIdx: 0,
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
    },
    startEditSchedule () {
      this.editing = true
    },
    saveEditSchedule (idx, schedule) {
      this.editing = false
      this.timetable.splice(idx, 1, schedule)
      data.saveTimetable(this.timetable)
    },
    cancelEditSchedule () {
      this.editing = false
    },
    deleteSchedule (idx) {
      this.timetable.splice(idx, 1)
      if (this.editIdx >= this.timetable.length) {
        this.editIdx = this.timetable.length - 1
      }
      data.saveTimetable(this.timetable)
    }
  }
}

</script>
