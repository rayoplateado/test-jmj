import {flushPromises, mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import Component from '@/views/generator/index.vue'

describe('View Generator', () => {
  const mountComponent = async () => {
    const wrapper = mount(Component, {
      propsData: {},
      global: {
        stubs: {},
      },
    })
    await flushPromises()

    return wrapper
  }

  it('Mounts properly', async () => {
    const wrapper = await mountComponent()
    await wrapper.vm.$forceUpdate()

    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('Generator')

    // Elements
    const timestampInput = wrapper.findByTestId('timestamp')
    expect(timestampInput).toBeTruthy()

    const nameInput = wrapper.findByTestId('name')
    expect(nameInput).toBeTruthy()

    const valueInput = wrapper.findByTestId('value')
    expect(valueInput).toBeTruthy()

    const createButton = wrapper.findByTestId('sumbit-button')
    expect(createButton).toBeTruthy()
  })

  it('Works propertly', async () => {
    const wrapper = await mountComponent()
    const nameInput = wrapper.findByTestId('name')
    const valueInput = wrapper.findByTestId('value')
    const createButton = wrapper.findByTestId('sumbit-button')

    nameInput.setValue('metric1')
    valueInput.setValue(23)
    expect((nameInput.element as HTMLInputElement).value).toBe('metric1')
    expect((valueInput.element as HTMLInputElement).value).toBe('23')

    createButton.trigger('click')
    await flushPromises()

    // Check element is reseted correctly
    expect((nameInput.element as HTMLInputElement).value).toBe('')
    expect((valueInput.element as HTMLInputElement).value).toBe('0')
  })
})
