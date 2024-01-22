<script setup lang="ts">
const model = defineModel<string | number>()
</script>

<template>
  <input
    v-model="model"
    class="block w-full rounded-md border-1 border-gray-600 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-rose-400 focus:rose-200 focus:ring-rose-200 sm:text-sm sm:leading-6"
    data-testid="native-input"
  />
</template>

<style></style>
