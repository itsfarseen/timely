<template>
  <div class="flex-1 flex bg-gray-200 p-4">
    <!-- Grid -->
    <div
      class="flex-1 border flex divide-x divide-gray-100"
    >
      <!-- Time Column -->
      <div class="bg-white">
        <div class="p-3">
&nbsp;
        </div>
        <div class="divide-y divide-gray-100">
          <div
            v-for="hr of hrs"
            :key="hr"
            class="text-sm p-3 text-gray-500"
            :style="{height: 'calc(-1px + ' + scale_1hr_em + 'em)'}"
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
            class="p-3 text-center truncate sticky top-0 z-10 bg-white bg-opacity-50"
          >
            {{ week }}
          </div>
          <div class="bg-gray-100 flex-1 relative">
            <div
              v-for="data of weekData"
              :key="data.title"
              class="border-red-500 border"
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
      scale_1hr_em: '5',
      timetable: {
        "PPL": {
          "Monday": [{from: "02:15 PM", to: "03:15 PM"}],
          "Tuesday":[{from: "10:15 PM", to: "11:15 PM"}],
          "Thursday": [{from: "11:30 PM", to: "12:30 PM"}],
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
      let hrs = parseInt(from.split(":")[0]);
      let minutes  = from
    }
  }
}

function timeComps(timeStr) {
  let comps1 = timeStr.split(":");
  let comps2 = comps1[1].split(" ");
  let hrs = parseInt(comps1[0]);
  let mins = parseInt(comps2[0]);
  let am_pm = comps2[1];
  return {hrs, mins, am_pm};
}

</script>
