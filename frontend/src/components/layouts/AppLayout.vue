<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import Button from '../../components/button/Button.vue'
import Notifications from '../../components/notifications/Notifications.vue'
import {RouteNamespace} from '../../models/common/domain/RouteNamespace'
import Icon from '@/components/icon/Icon.vue'

const router = useRouter()
const route = useRoute()

const goToTimelineView = () => {
  router.push({
    name: RouteNamespace.timeline,
  })
}

const goToGeneratorView = () => {
  router.push({
    name: RouteNamespace.generator,
  })
}

const isActive = (currentRoute: RouteNamespace) => {
  return route.name === currentRoute
}
</script>

<template>
  <header>
    <!-- Navigation bar -->
    <nav
      class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600"
    >
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <!-- Navigation links -->
        <div class="items-center lg:!flex lg:basis-auto">
          <Icon name="logo" height="50" width="50" class="ml-4 mr-4"></Icon>
          <h2><b>Metrics analyzer</b></h2>
          <ul class="ml-8 mr-auto mt-2 flex flex-col lg:flex-row text-left">
            <li class="mb-4 lg:mb-0 lg:pr-2">
              <Button
                class="block lg:p-2 cursor-pointer"
                data-testid="timeline-nav-button"
                :type="'secondary'"
                :active="isActive(RouteNamespace.timeline)"
                @click="goToTimelineView()"
                >Timeline
              </Button>
            </li>
            <li class="mb-4 lg:mb-0 lg:pr-2">
              <Button
                class="block lg:p-2 cursor-pointer"
                data-testid="generator-nav-button"
                :type="'secondary'"
                :active="isActive(RouteNamespace.generator)"
                @click="goToGeneratorView()"
              >
                Generator
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <Notifications></Notifications>
    </nav>

    <!-- Other views -->
    <div class="m-16 bg-white rounded-lg">
      <router-view />
    </div>
  </header>
</template>

<style scoped></style>
