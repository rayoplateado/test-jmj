import type {Notification} from '../../models/notification/domain/Notification'
import {useNotificationStore} from '../../stores/notification/notificationStore'

export class AddNotificationActionHandler {
  constructor(private readonly notificationStore = useNotificationStore()) {}

  public handle(notification: Notification) {
    this.notificationStore.items.push(notification)

    setTimeout(() => {
      this.notificationStore.items.shift()
    }, 3000)
  }
}
