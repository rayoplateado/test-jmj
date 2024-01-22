<script setup lang="ts">
import {useNotificationStore} from '../../stores/notification/notificationStore'
import {NotificationType} from '../../models/notification/domain/NotificationType'

const titleClass = (notificationType: NotificationType) => {
  switch (notificationType) {
    case NotificationType.error: {
      return 'bg-rose-500'
    }
    case NotificationType.info: {
      return 'bg-cyan-500'
    }
    case NotificationType.success: {
      return 'bg-teal-500'
    }
  }
}

const textClass = (notificationType: NotificationType) => {
  switch (notificationType) {
    case NotificationType.error: {
      return 'border border-t-0 border-rose-400 rounded-b bg-rose-100 px-4 py-3 text-rose-700'
    }
    case NotificationType.info: {
      return 'border border-t-0 border-cyan-400 rounded-b bg-cyan-100 px-4 py-3 text-cyan-700'
    }
    case NotificationType.success: {
      return 'border border-t-0 border-teal-400 rounded-b bg-teal-100 px-4 py-3 text-teal-700'
    }
  }
}
</script>
<template>
  <div
    data-testid="notification-container"
    class="fixed inset-x-0 top-0 flex items-end justify-right justify-end"
  >
    <div
      v-for="notification in useNotificationStore().items"
      class="max-w-sm w-full shadow-lg rounded rounded relative mr-8 mt-8"
      role="alert"
      :key="notification.id"
      :data-testid="`notification-${notification.id}`"
    >
      <div
        class="text-white font-bold rounded-t px-4 py-2"
        :class="titleClass(notification.type)"
        :data-testid="`notification-type-${notification.id}`"
      >
        {{ notification.type }}
      </div>
      <div
        :class="textClass(notification.type)"
        :data-testid="`notification-text-${notification.id}`"
      >
        <p>{{ notification.text }}.</p>
      </div>
    </div>
  </div>
</template>
