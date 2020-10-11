<template>
  <div class="flex-1 flex bg-gray-200 p-4 relative">
    <TimeGrid :timetable="timetable" />
  </div>
</template>

<script>
import {parse, intervalToDuration} from 'date-fns';
import TimeGrid from './TimeGrid.vue';

export default {
  components: {TimeGrid},
  data() {
    return {
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
  },
  methods: {
  }
}


</script>
