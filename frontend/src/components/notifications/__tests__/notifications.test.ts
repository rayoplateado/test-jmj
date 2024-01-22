import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/notifications/Notifications.vue'
import {NotificationType} from '@/models/notification/domain/NotificationType'
import {useNotificationStore} from '@/stores/notification/notificationStore'

const store = useNotificationStore()

store.items = [
  {
    id: '1',
    type: NotificationType.error,
    text: 'Notification with error',
  },
  {
    id: '2',
    type: NotificationType.success,
    text: 'Notification with success',
  },
  {
    id: '3',
    type: NotificationType.info,
    text: 'Notification with info',
  },
]

describe('Notifications component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      mocks: {
        useNotificationStore: store,
      },
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()

    // Elements
    const notificationContainer = wrapper.findByTestId('notification-container')
    expect(notificationContainer).toBeTruthy()

    const notificationTitleError = wrapper.findByTestId('notification-type-1')
    expect(notificationTitleError).toBeTruthy()
    expect(notificationTitleError.classes('bg-rose-500')).toBe(true)

    const notificationTextError = wrapper.findByTestId('notification-text-1')
    expect(notificationTextError).toBeTruthy()
    expect(notificationTextError.classes('bg-rose-100')).toBe(true)

    const notificationTitleSuccess = wrapper.findByTestId('notification-type-2')
    expect(notificationTitleSuccess).toBeTruthy()
    expect(notificationTitleSuccess.classes('bg-teal-500')).toBe(true)

    const notificationTextSuccess = wrapper.findByTestId('notification-text-2')
    expect(notificationTextSuccess).toBeTruthy()
    expect(notificationTextSuccess.classes('bg-teal-100')).toBe(true)

    const notificationTitleInfo = wrapper.findByTestId('notification-type-3')
    expect(notificationTitleInfo).toBeTruthy()
    expect(notificationTitleInfo.classes('bg-cyan-500')).toBe(true)

    const notificationTextInfo = wrapper.findByTestId('notification-text-3')
    expect(notificationTextInfo).toBeTruthy()
    expect(notificationTextInfo.classes('bg-cyan-100')).toBe(true)
  })

  it('Works propertly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    const notificationError = wrapper.findByTestId('notification-1')
    expect(notificationError.text()).toContain(NotificationType.error)
    expect(notificationError.text()).toContain('Notification with error')

    const notificationSuccess = wrapper.findByTestId('notification-2')
    expect(notificationSuccess.text()).toContain(NotificationType.success)
    expect(notificationSuccess.text()).toContain('Notification with success')

    const notificationInfo = wrapper.findByTestId('notification-3')
    expect(notificationInfo.text()).toContain(NotificationType.info)
    expect(notificationInfo.text()).toContain('Notification with info')
  })
})
