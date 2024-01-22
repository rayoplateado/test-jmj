import {createRouter, createWebHistory} from 'vue-router'
import TimelineView from '../views/timeline/index.vue'
import GeneratorView from '../views/generator/index.vue'
import {RouteNamespace} from '../models/common/domain/RouteNamespace'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: RouteNamespace.timeline,
      },
      children: [
        {
          path: 'timeline',
          name: RouteNamespace.timeline,
          component: TimelineView,
        },
        {
          path: 'generator',
          name: RouteNamespace.generator,
          component: GeneratorView,
        },
      ],
    },
  ],
})

export default router
