import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/datepicker/Datepicker.vue'

describe('Datepicker component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {useRange: false},
      global: {
        stubs: {
          VueTailwindDatepicker: true,
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
    const vueTailwindDatepicker = wrapper.findByTestId(
      'vueTailwindDatepicker-button',
    )
    expect(vueTailwindDatepicker).toBeTruthy()
  })
})
