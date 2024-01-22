import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/input/Input.vue'

describe('Input component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {},
      global: {},
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()

    // Elements
    const nativeInput = wrapper.findByTestId('native-input')
    expect(nativeInput).toBeTruthy()
  })
})
