import {AddNotificationActionHandler} from '../../action-handlers/notifications/AddNotificationActionHandler'
import {StateNamespace} from '../../models/common/domain/StateNamespace'
import type {Notification} from '../../models/notification/domain/Notification'
import type {NotificationState} from '../../models/notification/domain/NotificationState'
import {defineStore} from 'pinia'

const notificationState: NotificationState = {
  items: [],
}

export const useNotificationStore = defineStore(StateNamespace.notifications, {
  state: () => ({...notificationState}),
  actions: {
    addNotification(notification: Notification) {
      const addNotificationActionHandler = new AddNotificationActionHandler()
      addNotificationActionHandler.handle(notification)
    },
  },
})

export type NotificationStore = ReturnType<typeof useNotificationStore>
