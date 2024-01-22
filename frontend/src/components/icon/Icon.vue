<script setup lang="ts">
import {defineAsyncComponent} from 'vue'

const props = defineProps<{name: string}>()

const icon = defineAsyncComponent(
  () => import(`./../../assets/images/${props.name}.svg`),
)
</script>

<template>
  <component :is="icon" class="fill-current" data-testid="svg-icon" />
</template>
