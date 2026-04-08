<script setup lang="ts">
import { computed, ref, watch } from "vue";

import InfoTooltip from "../InfoTooltip.vue";
import type { ReviewState } from "../../types/brandIntelligence";

const props = defineProps<{
  reviewState: ReviewState;
  openColorModal: () => void;
  openCoreValueModal: () => void;
  openBrandToneModal: () => void;
  openBrandAestheticModal: () => void;
  openTargetMarketModal: () => void;
  openIndustryContextModal: () => void;
  openBrandNarrativeModal: () => void;
  removeColor: (color: string) => void;
  removeCoreValue: (value: string) => void;
  removeBrandTone: (value: string) => void;
  removeBrandAesthetic: (value: string) => void;
  removeTargetMarket: (value: string) => void;
  removeIndustryContext: (value: string) => void;
  copyColor: (color: string) => void;
  saveBrandReview: () => void;
  backToExtraction: () => void;
}>();

const activeLogoIndex = ref(0);

const logoCandidates = computed(() => props.reviewState.logoCandidates ?? []);

const activeLogoUrl = computed(
  () => logoCandidates.value[activeLogoIndex.value] ?? "",
);

const brandInitials = computed(() =>
  props.reviewState.brandName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join(""),
);

const handleBrandLogoError = () => {
  if (activeLogoIndex.value < logoCandidates.value.length - 1) {
    activeLogoIndex.value += 1;
    return;
  }

  activeLogoIndex.value = logoCandidates.value.length;
};

watch(
  logoCandidates,
  () => {
    activeLogoIndex.value = 0;
  },
  { immediate: true },
);
</script>

<template>
  <section class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6">
    <h2 class="text-[22px] font-semibold tracking-tight text-slate-900">
      Brand Identity Blueprint
    </h2>
    <p class="mt-2 max-w-[780px] text-[16px] leading-7 text-slate-600">
      We&apos;ve decoded your brand core identity. Review and refine these
      attributes to ensure the AI generates copy that perfectly aligns with
      your brand.
    </p>

    <div class="mt-5 rounded-2xl bg-white p-6">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-[16px] font-semibold text-slate-900">Brand name</h3>
          <InfoTooltip
            message="The primary identity and web source used for DNA extraction."
          />
        </div>

        <div class="mt-3 flex items-center gap-4">
          <div
            class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-800"
          >
            <img
              v-if="activeLogoUrl"
              :src="activeLogoUrl"
              :alt="`${reviewState.brandName} logo`"
              class="h-full w-full object-contain bg-white"
              @error="handleBrandLogoError"
            />
            <span
              v-else
              class="text-[22px] font-semibold tracking-[0.08em] text-white"
            >
              {{ brandInitials || "BI" }}
            </span>
          </div>
          <div>
            <p class="text-[28px] font-semibold tracking-tight text-slate-900">
              {{ reviewState.brandName }}
            </p>
            <p class="text-[16px] text-slate-600">{{ reviewState.domain }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">Colours</h3>
            <InfoTooltip
              message="Primary pallete identified from the source. These guide the visual theme of generated assets."
            />
          </div>
          <button
            type="button"
            class="cursor-pointer text-[14px] font-medium text-slate-500"
            @click="openColorModal"
          >
            Add item
          </button>
        </div>

        <div class="mt-3 rounded-2xl bg-slate-100 p-4">
          <div class="flex flex-wrap gap-3">
            <div
              v-for="color in reviewState.colors"
              :key="color"
              class="flex items-center gap-3 rounded-full bg-white px-3 py-2"
            >
              <span
                class="h-10 w-10 rounded-full border border-slate-200"
                :style="{ backgroundColor: color }"
              ></span>
              <span class="text-[14px] font-medium text-slate-800">{{
                color.toLowerCase()
              }}</span>
              <button
                type="button"
                class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                aria-label="Copy color"
                @click="copyColor(color)"
              >
                <i
                  class="ri-file-copy-line cursor-pointer text-[18px]"
                  aria-hidden="true"
                ></i>
              </button>
              <span class="h-4 w-px bg-slate-200"></span>
              <button
                type="button"
                class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                aria-label="Remove color"
                @click="removeColor(color)"
              >
                <svg
                  class="h-4.5 w-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">Core value</h3>
            <InfoTooltip
              message="Fundamental beliefs that drive the brand's message and focus."
            />
          </div>
          <button
            type="button"
            class="cursor-pointer text-[14px] font-medium text-slate-500"
            @click="openCoreValueModal"
          >
            Add item
          </button>
        </div>

        <div class="mt-3 rounded-2xl bg-slate-100 p-4">
          <div class="flex flex-wrap gap-3">
            <div
              v-for="value in reviewState.coreValues"
              :key="value"
              class="flex items-center gap-2 rounded-full bg-white px-3 py-2"
            >
              <span class="text-[14px] font-medium text-slate-800">{{
                value
              }}</span>
              <button
                type="button"
                class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                :aria-label="`Remove ${value}`"
                @click="removeCoreValue(value)"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">
              Brand tone
            </h3>
            <InfoTooltip
              message="The emotional quality and personality of the brand's communication style."
            />
          </div>
          <button
            type="button"
            class="cursor-pointer text-[14px] font-medium text-slate-500"
            @click="openBrandToneModal"
          >
            Add item
          </button>
        </div>

        <div class="mt-3 rounded-2xl bg-slate-100 p-4">
          <div class="flex flex-wrap gap-3">
            <div
              v-for="value in reviewState.brandTones"
              :key="value"
              class="flex items-center gap-2 rounded-full bg-white px-3 py-2"
            >
              <span class="text-[14px] font-medium text-slate-800">{{
                value
              }}</span>
              <button
                type="button"
                class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                :aria-label="`Remove ${value}`"
                @click="removeBrandTone(value)"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">
              Brand Aesthetic
            </h3>
            <InfoTooltip
              message="The visual aesthetic used to filter relevant image assets from Shutterstock, ensuring generated visuals align with the brand's style."
            />
          </div>
          <button
            type="button"
            class="cursor-pointer text-[14px] font-medium text-slate-500"
            @click="openBrandAestheticModal"
          >
            Add item
          </button>
        </div>

        <div class="mt-3 rounded-2xl bg-slate-100 p-4">
          <div class="flex flex-wrap gap-3">
            <div
              v-for="value in reviewState.brandAesthetics"
              :key="value"
              class="flex items-center gap-2 rounded-full bg-white px-3 py-2"
            >
              <span class="text-[14px] font-medium text-slate-800">{{
                value
              }}</span>
              <button
                type="button"
                class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                :aria-label="`Remove ${value}`"
                @click="removeBrandAesthetic(value)"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">
              Target Market
            </h3>
            <InfoTooltip
              message="The audience segments and customer groups the brand is best positioned to serve."
            />
          </div>
          <button
            type="button"
            class="cursor-pointer text-[14px] font-medium text-slate-500"
            @click="openTargetMarketModal"
          >
            Add item
          </button>
        </div>

        <div class="mt-3 rounded-2xl bg-slate-100 p-4">
          <div class="flex flex-wrap gap-3">
            <div
              v-for="value in reviewState.targetMarkets"
              :key="value"
              class="flex items-center gap-2 rounded-full bg-white px-3 py-2"
            >
              <span class="text-[14px] font-medium text-slate-800">{{
                value
              }}</span>
              <button
                type="button"
                class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                :aria-label="`Remove ${value}`"
                @click="removeTargetMarket(value)"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">
              Industry Context
            </h3>
            <InfoTooltip
              message="The broader industry space, category signals, and market environment that shape the brand."
            />
          </div>
          <button
            type="button"
            class="cursor-pointer text-[14px] font-medium text-slate-500"
            @click="openIndustryContextModal"
          >
            Add item
          </button>
        </div>

        <div class="mt-3 rounded-2xl bg-slate-100 p-4">
          <div class="flex flex-wrap gap-3">
            <div
              v-for="value in reviewState.industryContexts"
              :key="value"
              class="flex items-center gap-2 rounded-full bg-white px-3 py-2"
            >
              <span class="text-[14px] font-medium text-slate-800">{{
                value
              }}</span>
              <button
                type="button"
                class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                :aria-label="`Remove ${value}`"
                @click="removeIndustryContext(value)"
              >
                <svg
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">
              Brand Narrative
            </h3>
            <InfoTooltip
              message="The longer-form story that captures what the brand stands for, how it speaks, and why it matters."
            />
          </div>
          <button
            type="button"
            class="cursor-pointer text-[14px] font-medium text-slate-500"
            @click="openBrandNarrativeModal"
          >
            Edit Narrative
          </button>
        </div>

        <div class="mt-3 rounded-2xl">
          <p class="whitespace-pre-line text-[14px] leading-7 text-slate-700">
            {{ reviewState.brandNarrative }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-4 rounded-[1.5rem] bg-slate-100 py-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <button
        type="button"
        class="inline-flex w-auto cursor-pointer items-center justify-center rounded-full bg-cyan-500 px-5 py-4 text-base font-semibold text-white transition hover:bg-cyan-600"
        @click="saveBrandReview"
      >
        Continue and Save
      </button>

      <button
        type="button"
        class="cursor-pointer text-left text-sm font-medium text-slate-700 transition hover:text-slate-900 sm:text-right"
        @click="backToExtraction"
      >
        Back to Extraction
      </button>
    </div>
  </section>
</template>
