import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/icon/Icon.vue'
import {defineComponent} from 'vue'

describe('Icon component', () => {
  const SuspenseWrapper = defineComponent({
    components: {Component},
    template: '<Suspense></Suspense>',
  })

  const mountComponent = async () => {
    const wrapper = mount(SuspenseWrapper, {
      global: {},
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()

    // Elements
    const svgIcon = wrapper.findByTestId('svg-icon')
    expect(svgIcon).toBeTruthy()
  })
})
