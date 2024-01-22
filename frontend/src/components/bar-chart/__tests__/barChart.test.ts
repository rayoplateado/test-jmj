import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/bar-chart/BarChart.vue'
import {TimeRange} from '@/models/common/domain/Constants'

HTMLCanvasElement.prototype.getContext = () => {
  return null
}

describe('barChart component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {range: TimeRange.day, data: {datasets: []}},
      global: {
        stubs: {
          Bar: true,
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
    const barChart = wrapper.findByTestId('bar-chart')
    expect(barChart).toBeTruthy()
  })

  it('Works propertly', async () => {})
})
