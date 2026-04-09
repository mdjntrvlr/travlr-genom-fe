import { createRouter, createWebHistory } from 'vue-router'

import BrandIntelligenceView from './views/BrandIntelligenceView.vue'
import BrandRepositoryView from './views/BrandRepositoryView.vue'
import BrandRepositoryDetailView from './views/BrandRepositoryDetailView.vue'
import PrototypeBuilderRepositoryView from './views/PrototypeBuilderRepositoryView.vue'
import PrototypeHomeView from './views/PrototypeHomeView.vue'
import PrototypeSearchView from './views/PrototypeSearchView.vue'
import PrototypeDetailView from './views/PrototypeDetailView.vue'
import PrototypeBuilder from './layouts/PrototypeBuilder.vue'
import ProjectBrandScope from './layouts/ProjectBrandScope.vue'
import { initializeClientTheme } from './utils/theme'

let activeProjectTheme: string | null = null

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
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
      path: '/brand-repository/:slug',
      name: 'brand-repository-detail',
      component: BrandRepositoryDetailView,
    },
    {
      path: '/prototype-builder-repository',
      name: 'prototype-builder-repository',
      component: PrototypeBuilderRepositoryView,
    },
    {
      path: '/p/:projectId',
      component: ProjectBrandScope,
      children: [
        {
          path: 'prototype',
          children: [
            {
              path: '',
              redirect: (to) => `/p/${to.params.projectId}/prototype/home`,
            },
            {
              path: 'home',
              name: 'prototypeHome',
              component: PrototypeHomeView,
            },
            {
              path: 'search',
              name: 'prototypeSearch',
              component: PrototypeSearchView,
            },
            {
              path: 'detail',
              name: 'prototypeDetail',
              component: PrototypeDetailView,
            },
          ],
        },
        {
          path: 'prototype-builder',
          component: PrototypeBuilder,
          children: [
            {
              path: '',
              redirect: (to) => `/p/${to.params.projectId}/prototype-builder/home`,
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
    },
  ],
})

router.beforeEach(async (to) => {
  const projectId = to.params.projectId

  if (typeof projectId === 'string' && to.path.startsWith('/p/') && projectId !== activeProjectTheme) {
    await initializeClientTheme(projectId)
    activeProjectTheme = projectId
  }

  return true
})

export default router
