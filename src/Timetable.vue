<template>
  <div class="flex-1 flex bg-gray-200 p-4 relative">
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
              v-for="data of weekData"
              :key="data.title"
              class="p-3 bg-blue-300"
              :style="weekGridStyle(data)"
            >
              {{ data.title }}
            </div>
          </div>
        </div>
      </div>
      <!-- /Main Column -->
    </div>
    <!-- /Grid -->
  </div>
</template>

<script>

import {parse, intervalToDuration} from 'date-fns';

export default {
  data() {
    return {
      scale_1hr_em: '4',
      timetable: {
        "PPL": {
          "Monday": [{from: "02:15 PM", to: "03:15 PM"}],
          "Tuesday":[{from: "10:15 AM", to: "11:15 AM"}],
          "Thursday": [{from: "11:30 AM", to: "12:30 PM"}],
          "Friday": [{from: "8:00 AM", to: "9:00 AM"}],
        },
      }
    }
  },
  computed: {
    hrs() {
      let hrs = ['12:00 AM'];
      for(let i = 1; i<12; i++) {
        hrs.push(String(i).padStart(2,0) + ":00 AM");
      }
      hrs.push('12:00 PM');
      for(let i = 1; i<12; i++) {
        hrs.push(String(i).padStart(2,0) + ":00 PM");
      }
      return hrs;
    },
    weekBasedTimetable() {
      let weekTimetable = {
        "Sunday": [],
        "Monday": [],
        "Tuesday": [],
        "Wednessday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": [],
      };
      for(let subject in this.timetable) {
        let subjectData = this.timetable[subject];
        for(let week in subjectData) {
          for(let entry of subjectData[week]) {
            weekTimetable[week].push({title: subject, from: entry.from, to: entry.to})
          }
        }
      }
      return weekTimetable;
    }
  },
  methods: {
    weekGridStyle({from, to}) {
      from = parse(from, 'hh:mm a', new Date());
      to = parse(to, 'hh:mm a', new Date());
      let midnight = parse('12:00 AM', 'hh:mm a', new Date());
      let dur = intervalToDuration({start: from, end:to});
      let durHrs = dur.hours + dur.minutes/60;
      let offset = intervalToDuration({start: midnight, end:from});
      let offsetHrs = offset.hours + offset.minutes/60;
      let top = offsetHrs * this.scale_1hr_em;
      let height = durHrs * this.scale_1hr_em;
      return {
        position: 'absolute',
        width: '100%',
        top: `${top}rem`,
        height: `${height}rem`,
      }
    }
  }
}


</script>
