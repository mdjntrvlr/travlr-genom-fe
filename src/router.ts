import { createRouter, createWebHistory } from 'vue-router'

import BrandIntelligenceView from './views/BrandIntelligenceView.vue'
import BrandRepositoryView from './views/BrandRepositoryView.vue'
import CampaignPageView from './views/CampaignPageView.vue'
import PrototypeHomeView from './views/PrototypeHomeView.vue'
import PrototypeSearchView from './views/PrototypeSearchView.vue'
import PrototypeDetailView from './views/PrototypeDetailView.vue'

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
      path: '/campaign-page',
      name: 'campaign-page',
      component: CampaignPageView,
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
  ],
})

export default router
