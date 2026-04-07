import { createRouter, createWebHistory } from 'vue-router'

import BrandIntelligenceView from './views/BrandIntelligenceView.vue'
import BrandRepositoryView from './views/BrandRepositoryView.vue'
import CampaignPageView from './views/CampaignPageView.vue'

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
  ],
})

export default router
