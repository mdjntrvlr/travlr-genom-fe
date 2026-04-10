<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import Accordion from './Accordion.vue'
import ProgressBar from './ProgressBar.vue'
import ScoreBadge from './ScoreBadge.vue'
import SectionCard from './SectionCard.vue'
import TagList from './TagList.vue'
import { useTravlrCompatibility } from '../../composables/useTravlrCompatibility'
import type { PartnershipType, TravlrCompatibilityData } from '../../services/travlrCompatibility.service'

const props = defineProps<{
  websiteUrl?: string
  preloadedData?: TravlrCompatibilityData | null
}>()

const { data, loading, error, fetchByUrl, setData } = useTravlrCompatibility()

const showLoading = computed(() => !props.preloadedData && loading.value)
const showError = computed(() => !props.preloadedData && !!error.value)

const potentialBadgeClass = (potential: PartnershipType['potential']) => {
  if (potential === 'High') return 'bg-emerald-100 text-emerald-700'
  if (potential === 'Medium') return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-600'
}

onMounted(() => {
  if (props.preloadedData !== undefined) {
    setData(props.preloadedData ?? null)
  } else if (props.websiteUrl) {
    fetchByUrl(props.websiteUrl)
  }
})

watch(() => props.preloadedData, (val) => {
  if (val !== undefined) setData(val ?? null)
})

watch(() => props.websiteUrl, (url) => {
  if (props.preloadedData === undefined && url) {
    fetchByUrl(url)
  }
})
</script>

<template>
  <section class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6">
    <h2 class="text-[22px] font-semibold tracking-tight text-slate-900">
      Travlr Compatibility
    </h2>
    <p class="mt-2 max-w-[680px] text-[16px] leading-7 text-slate-600">
      An AI-driven analysis of how well this brand aligns with Travlr's audience,
      platform, and partnership opportunities.
    </p>

    <!-- Loading skeleton -->
    <div v-if="showLoading" class="mt-6 space-y-4">
      <div
        v-for="n in 4"
        :key="n"
        class="h-24 animate-pulse rounded-2xl bg-slate-200"
      ></div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="showError"
      class="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-6"
    >
      <p class="text-[15px] text-rose-600">{{ error }}</p>
      <button
        type="button"
        class="mt-3 text-[14px] font-medium text-rose-700 underline transition hover:text-rose-900"
        @click="websiteUrl && fetchByUrl(websiteUrl)"
      >
        Try again
      </button>
    </div>

    <!-- Data -->
    <template v-else-if="data">
      <!-- Hero -->
      <div class="mt-6 rounded-2xl bg-white p-6">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
          <ScoreBadge
            :score="data.compatibility_score"
            :label="data.compatibility_label"
          />
          <div class="flex-1">
            <p class="text-[13px] font-semibold uppercase tracking-widest text-cyan-600">
              {{ data.travel_relevance }}
            </p>
            <p class="mt-3 text-[16px] leading-7 text-slate-700">
              {{ data.summary }}
            </p>
          </div>
        </div>
      </div>

      <!-- Strengths vs Challenges -->
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <SectionCard title="Strengths" icon="ri-thumb-up-line">
          <ul class="space-y-2">
            <li
              v-for="item in data.strengths"
              :key="item"
              class="flex items-start gap-2.5 text-[14px] leading-6 text-slate-700"
            >
              <i class="ri-checkbox-circle-fill mt-0.5 shrink-0 text-[16px] text-emerald-500" aria-hidden="true"></i>
              {{ item }}
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Challenges" icon="ri-error-warning-line">
          <ul class="space-y-2">
            <li
              v-for="item in data.challenges"
              :key="item"
              class="flex items-start gap-2.5 text-[14px] leading-6 text-slate-700"
            >
              <i class="ri-close-circle-fill mt-0.5 shrink-0 text-[16px] text-rose-400" aria-hidden="true"></i>
              {{ item }}
            </li>
          </ul>
        </SectionCard>
      </div>

      <!-- Audience Overlap -->
      <div class="mt-4">
        <SectionCard title="Audience Overlap" icon="ri-group-line">
          <ProgressBar :score="data.audience_overlap.score" label="Overlap score" />
          <p class="mt-4 text-[14px] leading-6 text-slate-600">
            {{ data.audience_overlap.description }}
          </p>
          <div class="mt-4">
            <p class="mb-2 text-[13px] font-medium text-slate-500">Shared segments</p>
            <TagList :tags="data.audience_overlap.shared_segments" variant="cyan" />
          </div>
        </SectionCard>
      </div>

      <!-- Partnership Types -->
      <div class="mt-4">
        <SectionCard title="Partnership Types" icon="ri-shake-hands-line">
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="partnership in data.partnership_types"
              :key="partnership.type"
              class="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200 hover:bg-white"
            >
              <div class="flex items-start justify-between gap-2">
                <p class="text-[14px] font-semibold text-slate-900">{{ partnership.type }}</p>
                <span
                  :class="[
                    'shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold',
                    potentialBadgeClass(partnership.potential),
                  ]"
                >
                  {{ partnership.potential }}
                </span>
              </div>
              <p class="mt-2 text-[13px] leading-5 text-slate-600">
                {{ partnership.description }}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <!-- Campaign Ideas -->
      <div class="mt-4">
        <SectionCard title="Campaign Ideas" icon="ri-lightbulb-line">
          <div class="space-y-2">
            <Accordion
              v-for="campaign in data.campaign_ideas"
              :key="campaign.title"
              :title="campaign.title"
            >
              <div class="space-y-3 text-[14px] leading-6 text-slate-700">
                <p>{{ campaign.concept }}</p>
                <div class="grid gap-2 sm:grid-cols-3">
                  <div class="rounded-lg bg-slate-50 px-3 py-2">
                    <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Format</p>
                    <p class="mt-0.5 font-medium text-slate-800">{{ campaign.format }}</p>
                  </div>
                  <div class="rounded-lg bg-slate-50 px-3 py-2">
                    <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Audience</p>
                    <p class="mt-0.5 font-medium text-slate-800">{{ campaign.target_audience }}</p>
                  </div>
                  <div class="rounded-lg bg-slate-50 px-3 py-2">
                    <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Outcome</p>
                    <p class="mt-0.5 font-medium text-slate-800">{{ campaign.expected_outcome }}</p>
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        </SectionCard>
      </div>

      <!-- Destination Opportunities -->
      <div class="mt-4">
        <SectionCard title="Destination Opportunities" icon="ri-map-pin-line">
          <TagList :tags="data.destination_opportunities" variant="cyan" />
        </SectionCard>
      </div>

      <!-- Business Sections -->
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <SectionCard title="Revenue Models" icon="ri-money-dollar-circle-line">
          <ul class="space-y-2">
            <li
              v-for="item in data.revenue_models"
              :key="item"
              class="flex items-start gap-2 text-[14px] leading-6 text-slate-700"
            >
              <i class="ri-arrow-right-s-line mt-0.5 shrink-0 text-[16px] text-slate-400" aria-hidden="true"></i>
              {{ item }}
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Quick Wins" icon="ri-flashlight-line">
          <ul class="space-y-2">
            <li
              v-for="item in data.quick_wins"
              :key="item"
              class="flex items-start gap-2 text-[14px] leading-6 text-slate-700"
            >
              <i class="ri-arrow-right-s-line mt-0.5 shrink-0 text-[16px] text-cyan-500" aria-hidden="true"></i>
              {{ item }}
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Long Term Plays" icon="ri-line-chart-line">
          <ul class="space-y-2">
            <li
              v-for="item in data.long_term_plays"
              :key="item"
              class="flex items-start gap-2 text-[14px] leading-6 text-slate-700"
            >
              <i class="ri-arrow-right-s-line mt-0.5 shrink-0 text-[16px] text-slate-400" aria-hidden="true"></i>
              {{ item }}
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Risk Factors" icon="ri-shield-check-line">
          <ul class="space-y-2">
            <li
              v-for="item in data.risk_factors"
              :key="item"
              class="flex items-start gap-2 text-[14px] leading-6 text-slate-700"
            >
              <i class="ri-error-warning-line mt-0.5 shrink-0 text-[16px] text-amber-400" aria-hidden="true"></i>
              {{ item }}
            </li>
          </ul>
        </SectionCard>
      </div>

      <!-- Final Recommendation -->
      <div class="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 px-6 py-5">
        <div class="flex items-start gap-3">
          <i class="ri-star-line mt-0.5 shrink-0 text-[20px] text-cyan-600" aria-hidden="true"></i>
          <div>
            <p class="text-[14px] font-semibold uppercase tracking-wide text-cyan-700">
              Recommendation
            </p>
            <p class="mt-2 text-[15px] leading-7 text-slate-800">
              {{ data.recommendation }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>
