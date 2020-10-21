<template>
  <div class="flex-1 flex flex-col gap-3 bg-gray-200 p-4 relative">
    <div class="flex gap-3 items-baseline">
      <a
        class="text-gray-600 hover:underline cursor-pointer"
        @click="startAddSchedule"
      >Add Schedule</a>
      <a
        class="text-gray-600 hover:underline cursor-pointer"
        @click="startEditSchedule"
      >Edit Schedules</a>
      <div class="flex flex-1 justify-end gap-3">
        <input
          v-model="week"
          placeholder="Week"
          size="2"
        >
        <input
          v-model="year"
          placeholder="Year"
          size="4"
        >
      </div>
    </div>
    <TimeGrid
      :timetable="combinedSchedule"
      @edit="editItem"
    />
    <!-- Add Modal -->
    <div
      v-if="adding"
      class="modal-box"
    >
      <div class="bg-white flex flex-col">
        <div class="flex gap-3 p-3">
          <label for="thisWeekOnly">This week only</label>
          <input
            id="thisWeekOnly"
            v-model="thisWeekOnly"
            type="checkbox"
          >
          <label for="everyWeek">Every Week</label>
          <input
            id="everyWeek"
            type="checkbox"
            :checked="!thisWeekOnly"
            @click="thisWeekOnly = !$event.target.checked"
          >
        </div>
        <ScheduleForm
          :title="'Add Schedule'"
          @save="saveAddSchedule"
          @cancel="cancelAddSchedule"
        />
      </div>
    </div>
    <!-- Edit Modal -->
    <div
      v-if="editing"
      class="modal-box"
    >
      <div class="bg-white flex flex-col gap-3">
        <div class="p-3 pb-0 flex">
          <label class="flex gap-3 items-baseline"> Select Schedule
            <div class="flex gap-3">
              <label for="thisWeekOnly">This week only</label>
              <input
                id="thisWeekOnly"
                v-model="thisWeekOnly"
                type="checkbox"
              >
              <label for="everyWeek">Every Week</label>
              <input
                id="everyWeek"
                type="checkbox"
                :checked="!thisWeekOnly"
                @click="thisWeekOnly = !$event.target.checked"
              >
            </div>
            <select v-model="editIdx">
              <option
                v-for="(data, idx) in thisWeekOnly?schedule:timetable"
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
          :schedule-input="(thisWeekOnly?schedule:timetable)[editIdx]"
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
import { getWeek, getYear } from 'date-fns'

export default {
  components: { TimeGrid, ScheduleForm },
  data () {
    return {
      adding: false,
      editing: false,
      editIdx: 0,
      thisWeekOnly: false,
      timetable: [],
      schedule: [],
      week: 1,
      year: 2020
    }
  },
  computed: {
    combinedSchedule () {
      const combined = []
      let i = 0
      for (let sched of this.timetable) {
        sched = JSON.parse(JSON.stringify(sched))
        sched.category = 'timetable'
        sched.idx = i
        combined.push(sched)
        i++
      }
      i = 0
      for (let sched of this.schedule) {
        sched = JSON.parse(JSON.stringify(sched))
        sched.category = 'schedule'
        sched.idx = i
        combined.push(sched)
        i++
      }
      return combined
    }
  },
  watch: {
    week () {
      this.loadData()
    },
    year () {
      this.loadData()
    }
  },
  mounted () {
    const today = new Date()
    this.week = getWeek(today)
    this.year = getYear(today)
    this.loadData()
  },
  methods: {
    loadData () {
      this.timetable = data.loadTimetable()
      this.schedule = data.loadSchedule(this.week, this.year)
    },
    saveData () {
      data.saveTimetable(this.timetable)
      data.saveSchedule(this.week, this.year, this.schedule)
    },
    startAddSchedule () {
      this.adding = true
    },
    saveAddSchedule (schedule) {
      this.adding = false
      if (this.thisWeekOnly) {
        this.schedule.push(schedule)
      } else {
        this.timetable.push(schedule)
      }
      this.saveData()
    },
    cancelAddSchedule () {
      this.adding = false
    },
    startEditSchedule () {
      this.editing = true
    },
    saveEditSchedule (idx, schedule) {
      this.editing = false
      if (this.thisWeekOnly) {
        this.schedule.splice(idx, 1, schedule)
      } else {
        this.timetable.splice(idx, 1, schedule)
      }
      this.saveData()
    },
    cancelEditSchedule () {
      this.editing = false
    },
    deleteSchedule (idx) {
      if (this.thisWeekOnly) {
        this.schedule.splice(idx, 1)
        if (this.editIdx >= this.timetable.length) {
          this.editIdx = this.timetable.length - 1
        }
      } else {
        this.timetable.splice(idx, 1)
        if (this.editIdx >= this.schedule.length) {
          this.editIdx = this.schedule.length - 1
        }
      }
      this.saveData()
    },
    editItem ({ category, idx }) {
      this.thisWeekOnly = category === 'schedule'
      this.editIdx = idx
      this.startEditSchedule()
    }
  }
}

</script>
