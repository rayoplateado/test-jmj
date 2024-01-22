import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/button/Button.vue'

describe('Button component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {},
      global: {
        stubs: {
          LineChart: true,
        },
      },
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()

    // Fields
    const nativeButton = wrapper.findByTestId('native-button')
    expect(nativeButton).toBeTruthy()
  })

  it('Works propertly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()
    const nativeButton = wrapper.findByTestId('native-button')

    // Check type prop work
    await wrapper.setProps({type: 'py-2.5 px-5 me-2 mb-2 text-sm font-medium'})
    expect(nativeButton.classes('py-2.5')).toBe(true)

    // Check active prop work
    await wrapper.setProps({active: true})
    expect(nativeButton.classes('bg-rose-700')).toBe(true)
  })
})
