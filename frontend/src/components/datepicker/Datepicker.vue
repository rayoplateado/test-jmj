<script setup lang="ts">
import {ref} from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const dateValue = defineModel<unknown>()
const props = defineProps<{
  useRange: boolean
}>()

const formatter = ref({
  date: 'DD/MM/YYYY HH:mm',
  month: 'MMM',
})
</script>

<template>
  <vue-tailwind-datepicker
    :formatter="formatter"
    v-model="dateValue"
    as-single
    separator="   to   "
    :use-range="props.useRange"
    data-testid="vueTailwindDatepicker"
  />
</template>
