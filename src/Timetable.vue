<template>
  <div class="flex-1 flex bg-gray-200 p-4 relative">
    <TimeGrid :timetable="timetable" />
  </div>
</template>

<script>
import TimeGrid from './TimeGrid.vue'
import data from './data.js'

export default {
  components: { TimeGrid },
  data () {
    return {
      timetable: {}
    }
  },
  mounted () {
    this.timetable = data.loadTimetable()
  }
}

</script>
