<template>
  <div
    class="bg-white flex flex-col px-4 gap-3"
    style="min-width: 40rem"
  >
    <div class="font-bold pt-4 text-gray-600">
      Add Schedule
    </div>
    <input
      v-model="schedule.name"
      placeholder="Title"
    >
    <div class="flex flex-col gap-3">
      <div class="text-gray-600">
        Timings
      </div>
      <div
        v-for="(item, idx) in timingsSorted"
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
        <button
          class="flex-1 board-btn"
          @click="deleteTiming(idx)"
        >
          Delete
        </button>
      </div>

      <div class="flex gap-3">
        <select
          v-model="timing.week"
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
          v-model="timing.from"
          class="flex-1 w-1/4"
          size="1"
          placeholder="Start time"
        >
        <input
          v-model="timing.to"
          size="1"
          class="flex-1 w-1/4"
          placeholder="End time"
        >
        <button
          :disabled="!isAddValid"
          class="flex-1 board-btn w-1/4"
          @click="addTiming"
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
        :disabled="!isSaveValid"
        class="board-btn"
        @click="save"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { isMatch, parse, getHours, getMinutes } from 'date-fns'

export default {
  props: {
    scheduleInput: { type: Object, default: null }
  },
  data () {
    return {
      schedule: { name: '', items: [] },
      timing: { week: 'Sunday', from: '', to: '' }
    }
  },
  computed: {
    isAddValid () {
      return isMatch(this.timing.from, 'hh:mm a') &&
        isMatch(this.timing.to, 'hh:mm a')
    },
    isSaveValid () {
      return this.schedule.name.length > 0 && this.schedule.items.length > 0
    },
    timingsSorted () {
      const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday',
        'Friday', 'Saturday']
      const items = [...this.schedule.items]
      items.sort(function (a, b) {
        const aFrom = parse(a.from, 'hh:mm a', new Date())
        const aIdx = weeks.indexOf(a.week) * 1000 + getHours(aFrom) * 60 + getMinutes(aFrom)

        const bFrom = parse(b.from, 'hh:mm a', new Date())
        const bIdx = weeks.indexOf(b.week) * 1000 + getHours(bFrom) * 60 + getMinutes(bFrom)
        return aIdx - bIdx
      })
      return items
    }
  },
  mounted () {
    if (this.scheduleInput !== null) {
      this.schedule = JSON.parse(JSON.stringify(this.scheduleInput))
    }
  },

  methods: {
    startAdding () {
      this.schedule.name = ''
      this.schedule.items = []
      this.timing = { week: 'Sunday', from: '', to: '' }
    },
    addTiming () {
      this.schedule.items.push({ ...this.timing })
    },
    deleteTiming (idx) {
      this.schedule.items.splice(idx, 1)
      console.log(idx)
    },
    save () {
      this.$emit('save', { ...this.schedule })
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
