<template>
  <div class="flex-1 flex flex-col gap-3 bg-gray-200 p-4 relative">
    <div class="text-right">
      <a
        class="text-gray-600 hover:underline cursor-pointer"
        @click="startAdding"
      >Add Schedule</a>
    </div>
    <TimeGrid :timetable="timetable" />
    <!-- Modal -->
    <div
      v-if="adding"
      class="modal-box"
    >
      <div
        class="bg-white flex flex-col px-4 gap-3"
        style="min-width: 40rem"
      >
        <div class="font-bold pt-4 text-gray-600">
          Add Schedule
        </div>
        <input
          v-model="addSchedule.name"
          placeholder="Title"
        >
        <div class="flex flex-col gap-3">
          <div class="text-gray-600">
            Timings
          </div>
          <div
            v-for="(item, idx) in addSchedule.items"
            :key="idx"
            class="flex gap-3"
          >
            <div class="flex-1 text-left p-3">
              {{ item.week }}
            </div>
            <div class="flex-1 text-left p-3">
              {{ item.from }}
            </div>
            <div class="flex-1 text-left p-3">
              {{ item.to }}
            </div>
          </div>

          <div class="flex gap-3">
            <select
              v-model="addTiming.week"
              size="1"
              class="flex-1 w-1/4"
            >
              <option
                v-for="week in ['Sunday', 'Monday', 'Tuesday', 'Wednessday',
                                'Thursday', 'Friday', 'Saturday']"
                :key="week"
              >
                {{ week }}
              </option>
            </select>
            <input
              v-model="addTiming.from"
              class="flex-1 w-1/4"
              size="1"
              placeholder="Start time"
            >
            <input
              v-model="addTiming.to"
              size="1"
              class="flex-1 w-1/4"
              placeholder="End time"
            >
            <button
              :disabled="!addValid"
              class="flex-1 board-btn w-1/4"
              @click="doAddTiming"
            >
              Add
            </button>
          </div>
        </div>
        <div class="-mx-4 flex">
          <button
            class="board-btn"
            @click="cancel"
          >
            Cancel
          </button>
          <button
            :disabled="!saveValid"
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
import TimeGrid from './TimeGrid.vue'
import data from './data.js'
import { isMatch } from 'date-fns'

export default {
  components: { TimeGrid },
  data () {
    return {
      adding: false,
      addSchedule: { name: '', items: [] },
      addTiming: { week: 'Sunday', from: '', to: '' },
      timetable: []
    }
  },
  computed: {
    addValid () {
      return isMatch(this.addTiming.from, 'hh:mm a') &&
        isMatch(this.addTiming.to, 'hh:mm a')
    },
    saveValid () {
      return this.addSchedule.name.length > 0 && this.addSchedule.items.length > 0
    }
  },
  mounted () {
    this.timetable = data.loadTimetable()
  },
  methods: {
    startAdding () {
      this.adding = true
      this.addSchedule.name = ''
      this.addSchedule.items = []
      this.addTiming = { week: 'Sunday', from: '', to: '' }
    },
    doAddTiming () {
      this.addSchedule.items.push({ ...this.addTiming })
    },
    save () {
      this.adding = false
      this.timetable.push({ ...this.addSchedule })
      data.saveTimetable(this.timetable)
    },
    cancel () {
      this.adding = false
    }
  }
}

</script>
