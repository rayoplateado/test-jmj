import {config} from '@vue/test-utils'

const DataTestIdPlugin = wrapper => {
  function findByTestId(selector: string) {
    const dataSelector = `[data-testid='${selector}']`
    return wrapper.find(dataSelector)
  }

  return {
    findByTestId,
  }
}

config.plugins.VueWrapper.install(DataTestIdPlugin)
config.plugins.DOMWrapper.install(DataTestIdPlugin)
