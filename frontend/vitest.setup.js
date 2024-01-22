import {config} from '@vue/test-utils'

import {createTestingPinia} from '@pinia/testing'
import {afterAll, beforeAll, vi} from 'vitest'
import {setupServer} from 'msw/node'
import {MetricsHandlers} from '@/utils/tests/metricsHandlers'

// Mock Pinia Store and Router
const pinia = createTestingPinia({
  stubActions: false,
  plugins: [() => ({})],
})

Object.assign(config.global, {
  mocks: {
    $router: {
      push: vi.fn(),
    },
    $route: {
      query: {},
    },
  },
  components: {},
  stubs: {},
  plugins: [pinia],
})

// Mock url requests
const server = setupServer(...MetricsHandlers)
beforeAll(() => server.listen({onUnhandledRequest: 'warn'}))
afterAll(() => server.close())
