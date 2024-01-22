<script setup lang="ts">
import 'chartjs-adapter-moment'
import {ref, watch} from 'vue'
import {Bar} from 'vue-chartjs'
import {TimeRange} from '../../models/common/domain/Constants'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
)

const barChart = ref(null)
const data = defineModel<any>()
const props = defineProps<{
  range?: TimeRange
}>()

const timeFormat = () => {
  return {
    unit: props?.range || TimeRange.day,
    displayFormats: {
      day: 'DD/MMM/YY',
      hour: 'DD/MM/YY - HH',
      minute: 'DD/MM/YY - HH:mm',
    },
  }
}

const chartOptions = ref<any>({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: timeFormat(),
    },
  },
})

watch(
  () => props.range,
  () => {
    chartOptions.value = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: timeFormat(),
        },
      },
    }
  },
)
</script>

<template>
  <Bar
    ref="barChart"
    :options="chartOptions"
    :data="data"
    data-testid="bar-chart"
  ></Bar>
</template>
