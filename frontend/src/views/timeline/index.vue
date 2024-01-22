<script setup lang="ts">
import {ref, watch} from 'vue'
import Datepicker from '../../components/datepicker/Datepicker.vue'
import Button from '../../components/button/Button.vue'
import Input from '../../components/input/Input.vue'
import Field from '../../components/field/Field.vue'
import LineChart from '../../components/line-chart/LineChart.vue'
import BarChart from '../../components/bar-chart/BarChart.vue'
import {TimeRange} from '../../models/common/domain/Constants'
import {ChartColors} from '../../utils/constants'
import moment from 'moment'
import {FetchAveragesActionHandler} from '../../action-handlers/metrics/FetchAveragesActionHandler'
import {FetchAverageQuery} from '../../models/metrics/domain/FetchAverageQuery'

const date = ref({startDate: '', endDate: ''})
const range = ref<TimeRange>(TimeRange.day)
const metricName = ref<string>()

const isActive = (value: string) => {
  return range.value === value
}

const lineChartData = ref<{
  datasets: {
    label: string
    data: {x: string; y: number}[]
    borderColor: ChartColors
    backgroundColor: ChartColors
  }[]
}>({
  datasets: [],
})

const barlineChartData = ref<{
  datasets: {
    label: string
    data: {x: string; y: number}[]
    borderColor: ChartColors
    backgroundColor: ChartColors
  }[]
}>({
  datasets: [],
})

const resetFilters = (timeRange: TimeRange) => {
  switch (timeRange) {
    case TimeRange.minute: {
      date.value = {
        startDate: moment().subtract('1', 'hour').format('DD/MM/YYYY HH:mm'),
        endDate: moment().format('DD/MM/YYYY HH:mm'),
      }
      break
    }
    case TimeRange.hour: {
      date.value = {
        startDate: moment().subtract('3', 'days').format('DD/MM/YYYY HH:mm'),
        endDate: moment().format('DD/MM/YYYY HH:mm'),
      }
      break
    }
    case TimeRange.day: {
      date.value = {
        startDate: moment().subtract('30', 'days').format('DD/MM/YYYY HH:mm'),
        endDate: moment().format('DD/MM/YYYY HH:mm'),
      }
      break
    }
  }
}

const fetchData = async (fetchAveragesQuery: FetchAverageQuery) => {
  const fetchAveragesActionHandler = new FetchAveragesActionHandler()
  const averageItems = (
    await fetchAveragesActionHandler.handle(fetchAveragesQuery)
  ).data

  lineChartData.value = {
    datasets: [
      {
        data: averageItems.map(elem => {
          return {
            x: elem.date,
            y: elem.sum,
          }
        }),
        borderColor: ChartColors.blue,
        backgroundColor: ChartColors.blue,
        label: 'metrics value average',
      },
    ],
  }

  barlineChartData.value = {
    datasets: [
      {
        data: averageItems.map(elem => {
          return {
            x: elem.date,
            y: elem.count,
          }
        }),
        borderColor: ChartColors.red,
        backgroundColor: ChartColors.red,
        label: 'metrics number',
      },
    ],
  }
}

const submit = () => {
  fetchData({
    from_date: moment(date.value.startDate, 'DD/MM/YYYY HH:mm').toISOString(),
    to_date: moment(date.value.endDate, 'DD/MM/YYYY HH:mm').toISOString(),
    range: range.value,
    timezone: '+1',
    metric_name: metricName.value || '',
  })
}

watch(range, async newVal => {
  resetFilters(newVal)
})

watch(date, async () => {
  submit()
})

resetFilters(TimeRange.day)
</script>

<template>
  <div class="p-8">
    <h1 class="mb-2">Timeline</h1>
    <p>
      A timeline of metrics, you might filter by date and select the range of
      grouped data for averages.
    </p>

    <div
      class="flex flex-row mt-4 rounded-lg bg-gradient-to-b from-stone-100 via-stone-100 to-stone-300 py-8 px-4"
    >
      <Field class="basis-1/4">
        <template #label>Range</template>
        <template #input>
          <Datepicker
            v-model="date"
            data-testid="date-filter"
            :use-range="true"
          ></Datepicker>
        </template>
      </Field>
      <Field class="basis-1/4 ml-8">
        <template #label>Metric</template>
        <template #input>
          <Input
            v-model="metricName"
            @blur="submit()"
            placeholder="Empty for show all"
            data-testid="metric-name-filter"
          ></Input>
        </template>
      </Field>
      <div class="basis-3/4">
        <div class="flex flex-row-reverse mt-4">
          <Button
            type="primary"
            data-testid="minute-group-by-button"
            :active="isActive(TimeRange.minute)"
            @click="range = TimeRange.minute"
          >
            Minute
          </Button>
          <Button
            type="primary"
            data-testid="hour-group-by-button"
            :active="isActive(TimeRange.hour)"
            @click="range = TimeRange.hour"
          >
            Hour
          </Button>
          <Button
            type="primary"
            data-testid="day-group-by-button"
            :active="isActive(TimeRange.day)"
            @click="range = TimeRange.day"
          >
            Day
          </Button>
          <p class="mt-2 mr-4">Grouped by:</p>
        </div>
      </div>
    </div>
    <div class="h-96">
      <LineChart
        v-model="lineChartData"
        :range="range"
        class="m-8"
        data-testid="timelineChart"
      ></LineChart>
    </div>
    <div class="h-96">
      <BarChart
        v-model="barlineChartData"
        :range="range"
        class="m-8"
        data-testid="timelineChart"
      ></BarChart>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
