import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/field/Field.vue'

describe('Field component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      global: {},
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()

    // Elements
    const fieldContent = wrapper.findByTestId('field-content')
    expect(fieldContent).toBeTruthy()
  })
})
