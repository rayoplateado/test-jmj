<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  type: {type: String, required: false, default: 'primary'},
  active: {type: Boolean, required: false, default: false},
})

const classForType = computed(() => {
  switch (props.type) {
    case 'secondary': {
      return 'py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-teal-500 focus:z-10 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700'
    }
    default: {
      return 'bg-rose-600 text-white hover:bg-rose-500 focus:ring-2 focus:ring-rose-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2'
    }
  }
})
const classForActive = computed(() => {
  if (!props.active) return ''

  switch (props.type) {
    case 'secondary': {
      return 'bg-teal-500'
    }
    default: {
      return 'bg-rose-700'
    }
  }
})
</script>

<template>
  <button
    type="button"
    :class="[classForType, classForActive]"
    data-testid="native-button"
  >
    <slot></slot>
  </button>
</template>

<style>
button.active {
  background-color: var(--primary-color);
}
</style>
