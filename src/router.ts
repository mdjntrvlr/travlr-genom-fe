import { createRouter, createWebHistory } from 'vue-router'

import BrandIntelligenceView from './views/BrandIntelligenceView.vue'
import BrandRepositoryView from './views/BrandRepositoryView.vue'
import PrototypeHomeView from './views/PrototypeHomeView.vue'
import PrototypeSearchView from './views/PrototypeSearchView.vue'
import PrototypeDetailView from './views/PrototypeDetailView.vue'
import PrototypeBuilder from './layouts/PrototypeBuilder.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/brand-intelligence',
    },
    {
      path: '/brand-intelligence',
      name: 'brand-intelligence',
      component: BrandIntelligenceView,
    },
    {
      path: '/brand-repository',
      name: 'brand-repository',
      component: BrandRepositoryView,
    },
    {
      path: '/prototype/home',
      name: 'prototypeHome',
      component: PrototypeHomeView,
    },
    {
      path: '/prototype/search',
      name: 'prototypeSearch',
      component: PrototypeSearchView,
    },
    {
      path: '/prototype/detail',
      name: 'prototypeDetail',
      component: PrototypeDetailView,
    },
    {
      path: '/prototype-builder',
      component: PrototypeBuilder,
      children: [
        {
          path: '',
          redirect: '/prototype-builder/home',
        },
        {
          path: 'home',
          name: 'prototypeBuilderHome',
          component: PrototypeHomeView,
        },
        {
          path: 'search',
          name: 'prototypeBuilderSearch',
          component: PrototypeSearchView,
        },
        {
          path: 'detail',
          name: 'prototypeBuilderDetail',
          component: PrototypeDetailView,
        },
      ],
    },
  ],
})

export default router
