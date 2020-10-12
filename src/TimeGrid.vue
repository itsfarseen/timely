<template>
  <!-- Grid -->
  <div
    class="flex-1 border flex divide-x divide-gray-100 bg-white"
  >
    <!-- Time Column -->
    <div class="">
      <div class="p-3">
&nbsp;
      </div>
      <div class="divide-y divide-gray-100">
        <div
          v-for="hr of hrs"
          :key="hr"
          class="text-sm p-3 text-gray-600"
          :style="{height: 'calc(-1px + ' + scale_1hr_em + 'rem)'}"
        >
          {{ hr }}
        </div>
      </div>
    </div>
    <!-- /Time Column -->
    <!-- Main Column -->
    <div class="flex-1 flex divide-x divide-gray-100">
      <div
        v-for="(weekData,week) of weekBasedTimetable"
        :key="week"
        class="flex flex-col"
        style="width: calc(100% / 7)"
      >
        <div
          class="p-3 text-center text-gray-600 truncate sticky top-0 z-10
            bg-white bg-opacity-75 border-b border-gray-100"
        >
          {{ week }}
        </div>
        <div class="flex-1 relative">
          <div
            v-for="(data,idx) of weekData"
            :key="idx"
            class="p-3 flex flex-col group"
            :class="data.category == 'timetable' ? 'bg-blue-300' : 'bg-green-300'"
            :style="weekGridStyle(data)"
          >
            <div class="flex-1">
              {{ data.title }}
            </div>
            <div class="text-sm flex gap-2 invisible group-hover:visible">
              <a
                class="text-gray-700 hover:underline cursor-pointer"
                @click="$emit('edit', {category: data.category, idx: data.idx})"
              >Edit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Main Column -->
  </div>
  <!-- /Grid -->
</template>

<script>

import { parse, intervalToDuration } from 'date-fns'

export default {
  props: {
    timetable: Array
  },
  data () {
    return {
      scale_1hr_em: '4'
    }
  },
  computed: {
    hrs () {
      const hrs = ['12:00 AM']
      for (let i = 1; i < 12; i++) {
        hrs.push(String(i).padStart(2, 0) + ':00 AM')
      }
      hrs.push('12:00 PM')
      for (let i = 1; i < 12; i++) {
        hrs.push(String(i).padStart(2, 0) + ':00 PM')
      }
      return hrs
    },
    weekBasedTimetable () {
      const weekTimetable = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednessday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      }
      for (const entry of this.timetable) {
        for (const sched of entry.items) {
          weekTimetable[sched.week].push({
            title: entry.name,
            category: entry.category,
            idx: entry.idx,
            from: sched.from,
            to: sched.to
          })
        }
      }
      return weekTimetable
    }
  },
  methods: {
    weekGridStyle ({ from, to }) {
      from = parse(from, 'hh:mm a', new Date())
      to = parse(to, 'hh:mm a', new Date())
      const midnight = parse('12:00 AM', 'hh:mm a', new Date())
      const dur = intervalToDuration({ start: from, end: to })
      const durHrs = dur.hours + dur.minutes / 60
      const offset = intervalToDuration({ start: midnight, end: from })
      const offsetHrs = offset.hours + offset.minutes / 60
      const top = offsetHrs * this.scale_1hr_em
      const height = durHrs * this.scale_1hr_em
      return {
        position: 'absolute',
        width: '100%',
        top: `${top}rem`,
        height: `${height}rem`
      }
    }
  }
}

</script>
