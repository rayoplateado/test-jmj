import {mount} from '@vue/test-utils'
import {describe, expect, it, vi} from 'vitest'
import Component from '@/components/layouts/AppLayout.vue'
const push = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    name: () => {
      'timeline'
    },
  })),
  useRouter: vi.fn(() => ({
    push,
  })),
}))

describe('Layout component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {},
      global: {
        stubs: {
          Notifications: true,
          routerView: true,
          routerLink: true,
          Icon: true,
        },
      },
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()

    // Elements
    const timelineNavButton = wrapper.findByTestId('timeline-nav-button')
    expect(timelineNavButton).toBeTruthy()
    expect(timelineNavButton.text()).toBe('Timeline')

    const generatorNavButton = wrapper.findByTestId('generator-nav-button')
    expect(generatorNavButton).toBeTruthy()
    expect(generatorNavButton.text()).toBe('Generator')
  })

  it('Works propertly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    const generatorNavButton = wrapper.findByTestId('generator-nav-button')

    await generatorNavButton.trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      name: 'generator',
    })

    const timelineNavButton = wrapper.findByTestId('timeline-nav-button')
    await timelineNavButton.trigger('click')

    expect(push).toHaveBeenCalledTimes(2)
    expect(push).toHaveBeenCalledWith({
      name: 'timeline',
    })
  })
})
