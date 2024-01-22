import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/components/line-chart/LineChart.vue'
import {TimeRange} from '@/models/common/domain/Constants'

HTMLCanvasElement.prototype.getContext = () => {
  return null
}

describe('LineChart component', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {range: TimeRange.day, data: {datasets: []}},
      global: {},
      mocks: {
        Line: () => null,
      },
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()

    // Elements
    const lineChart = wrapper.findByTestId('line-chart')
    expect(lineChart).toBeTruthy()
  })

  it('Works propertly', async () => {})
})
