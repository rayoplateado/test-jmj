import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/views/timeline/index.vue'
import {TimeRange} from '@/models/common/domain/Constants'

describe('View Timeline', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {},
      global: {
        stubs: {
          LineChart: true,
          BarChart: true,
        },
      },
    })

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('Timeline')

    // Elements
    const dateFilter = wrapper.findByTestId('date-filter')
    expect(dateFilter).toBeTruthy()

    const metricNameFilter = wrapper.findByTestId('metric-name-filter')
    expect(metricNameFilter).toBeTruthy()

    const minuteButton = wrapper.findByTestId('minute-group-by-button')
    expect(minuteButton).toBeTruthy()

    const hourButton = wrapper.findByTestId('hour-group-by-button')
    expect(hourButton).toBeTruthy()

    const dayButton = wrapper.findByTestId('day-group-by-button')
    expect(dayButton).toBeTruthy()
  })

  it('Works propertly', async () => {
    const wrapper = await mountComponent()
    const minuteButton = wrapper.find("[data-testid='minute-group-by-button']")

    minuteButton.trigger('click')
    expect((wrapper.vm as unknown as {range}).range).toBe(TimeRange.minute)

    const hourButton = wrapper.find("[data-testid='hour-group-by-button']")
    hourButton.trigger('click')
    expect((wrapper.vm as unknown as {range}).range).toBe(TimeRange.hour)
  })
})
