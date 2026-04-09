<script setup lang="ts">
import { ref } from "vue";

import BaseModal from "../BaseModal.vue";
import { useBrandApplications } from "../../composables/useBrandApplications";

const props = defineProps<{
  backToBrandReview: () => void;
  brandUrl: string;
  logoCandidates: string[];
  showToast: (message: string, tone: "success" | "error") => void;
}>();

const {
  applicationSections,
  isBriefModalOpen,
  briefDraft,
  briefModalTitle,
  openBriefModal,
  closeBriefModal,
  generateBanner,
  shouldShowGenerateButton,
  isBrandAssetsSection,
  isGeneratingSection,
  getGenerateButtonLabel,
  shouldShowGeneratedHomepageHero,
  getSectionGeneration,
  copyGeneratedText,
  removeGeneratedImage,
  downloadAllGeneratedImages,
  brandAssetSpecs,
  downloadAllBrandAssets,
  downloadLogoAssets,
  downloadFaviconAsset,
  downloadEmailLogoAsset,
  handleBriefInput,
  saveBrief,
} = useBrandApplications(
  props.showToast,
  () => props.brandUrl,
  () => props.logoCandidates,
);

const isBrandAssetsExpanded = ref(true);

const toggleBrandAssets = () => {
  isBrandAssetsExpanded.value = !isBrandAssetsExpanded.value;
};
</script>

<template>
  <section class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6">
    <div class="rounded-[1.75rem] bg-white px-6 py-7 sm:px-8 sm:py-8">
      <div
        v-for="(section, sectionIndex) in applicationSections"
        :key="section.title"
        class="rounded-[1.5rem] bg-white"
        :class="section === applicationSections[0] ? '' : 'mt-10'"
      >
        <div class="px-2 sm:px-4">
          <h2 class="text-[18px] font-semibold tracking-tight text-slate-900">
            {{ section.title }}
          </h2>
          <p class="mt-3 max-w-[820px] text-[16px] leading-8 text-slate-600">
            {{ section.description }}
          </p>
        </div>

        <div
          class="mt-7 overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
        >
          <div
            class="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <h3 class="text-[16px] font-semibold text-slate-900">
              {{ section.moduleTitle }}
            </h3>

            <button
              v-if="shouldShowGenerateButton(sectionIndex)"
              type="button"
              :disabled="isGeneratingSection(sectionIndex)"
              :class="[
                'inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-4 py-2 text-[14px] font-medium text-slate-800 transition hover:bg-slate-50 sm:self-auto',
                isGeneratingSection(sectionIndex)
                  ? 'cursor-not-allowed opacity-70'
                  : 'cursor-pointer',
              ]"
              @click="generateBanner(sectionIndex)"
            >
              <i
                :class="[
                  'text-sm',
                  isGeneratingSection(sectionIndex)
                    ? 'ri-loader-4-line animate-spin'
                    : 'ri-ai-generate-2',
                ]"
                aria-hidden="true"
              ></i>
              {{ getGenerateButtonLabel(sectionIndex) }}
            </button>
          </div>

          <div class="space-y-3 bg-white px-5 py-5">
            <div
              v-if="isBrandAssetsSection(sectionIndex)"
              class="rounded-[0.85rem] border border-slate-200 bg-slate-50 p-6"
            >
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-[16px] font-medium text-slate-800">Logo asset specs</p>
                <div class="inline-flex items-center gap-2">
                  <button
                    type="button"
                    class="inline-flex cursor-pointer items-center gap-2 text-[15px] font-medium text-slate-700 transition hover:text-slate-900"
                    @click="downloadAllBrandAssets"
                  >
                    Download All asset
                  </button>
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100"
                    :aria-label="isBrandAssetsExpanded ? 'Collapse brand assets' : 'Expand brand assets'"
                    @click="toggleBrandAssets"
                  >
                    <i
                      :class="[
                        'text-[18px] transition-transform',
                        isBrandAssetsExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
                      ]"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>

              <div
                v-if="isBrandAssetsExpanded"
                class="mt-5 rounded-[0.95rem] border border-slate-200 bg-white p-5 sm:p-6"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-[16px] font-medium text-slate-800">Logo</p>
                  <button
                    type="button"
                    class="cursor-pointer text-[15px] font-medium text-slate-700 transition hover:text-slate-900"
                    @click="downloadLogoAssets"
                  >
                    Download Logo Only
                  </button>
                </div>

                <div class="mt-4 grid gap-4 md:grid-cols-2">
                  <div
                    class="flex h-[160px] items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-100 p-4"
                  >
                    <img
                      v-if="brandAssetSpecs.mainLogoUrl"
                      :src="brandAssetSpecs.mainLogoUrl"
                      alt="Main logo"
                      class="h-full w-full object-contain"
                    />
                    <p v-else class="text-[20px] font-medium text-slate-900">Main Logo</p>
                  </div>

                  <div
                    class="flex h-[160px] items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-100 p-4"
                  >
                    <img
                      v-if="brandAssetSpecs.invertLogoUrl"
                      :src="brandAssetSpecs.invertLogoUrl"
                      alt="Invert logo"
                      class="h-full w-full object-contain"
                    />
                    <p v-else class="text-[20px] font-medium text-slate-900">Invert Logo</p>
                  </div>
                </div>

                <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-[16px] font-medium text-slate-800">Favicon</p>
                  <button
                    type="button"
                    class="cursor-pointer text-[15px] font-medium text-slate-700 transition hover:text-slate-900"
                    @click="downloadFaviconAsset"
                  >
                    Download favicon only
                  </button>
                </div>

                <div
                  class="mt-4 flex h-[160px] w-[170px] max-w-full items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-100 p-4"
                >
                  <img
                    v-if="brandAssetSpecs.faviconUrl"
                    :src="brandAssetSpecs.faviconUrl"
                    alt="Favicon"
                    class="h-full w-full object-contain"
                  />
                  <p v-else class="text-[20px] font-medium text-slate-900">64x64</p>
                </div>

                <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-[16px] font-medium text-slate-800">Email Logo</p>
                  <button
                    type="button"
                    class="cursor-pointer text-[15px] font-medium text-slate-700 transition hover:text-slate-900"
                    @click="downloadEmailLogoAsset"
                  >
                    Download email logo only
                  </button>
                </div>

                <div
                  class="mt-4 flex h-[160px] max-w-[420px] items-center justify-center overflow-hidden rounded-xl border border-slate-300 bg-slate-100 p-4"
                >
                  <img
                    v-if="brandAssetSpecs.emailLogoUrl"
                    :src="brandAssetSpecs.emailLogoUrl"
                    alt="Email logo"
                    class="h-full w-full object-contain"
                  />
                  <p v-else class="text-[20px] font-medium text-slate-900">Main Logo</p>
                </div>
              </div>
            </div>

            <template v-else>
              <div
                v-for="(item, itemIndex) in section.items"
                :key="item.label"
                class="flex flex-col gap-3 rounded-[0.85rem] border border-slate-200 bg-slate-50 px-5 py-5"
              >
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p class="text-[16px] font-medium text-slate-800">
                    {{ item.label }}
                  </p>

                  <button
                    v-if="shouldShowGeneratedHomepageHero(sectionIndex, item.label)"
                    type="button"
                    class="inline-flex cursor-pointer items-center gap-1 text-[15px] font-medium text-slate-700 transition hover:text-slate-900"
                    @click="openBriefModal(sectionIndex, itemIndex)"
                  >
                    {{ item.actionLabel || "Set Brief" }}
                    <i class="ri-arrow-down-s-line text-[18px]" aria-hidden="true"></i>
                  </button>

                  <div
                    v-else-if="item.actionLabel || item.statusLabel"
                    class="flex flex-wrap items-center gap-4"
                  >
                    <span
                      v-if="item.statusLabel"
                      class="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-[14px] font-medium text-slate-700"
                    >
                      <span
                        class="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-500 text-cyan-500"
                      >
                        <svg
                          class="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          aria-hidden="true"
                        >
                          <path
                            d="m4.5 10 3.5 3.5 7-7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                      {{ item.statusLabel }}
                    </span>

                    <button
                      v-if="item.actionLabel"
                      type="button"
                      class="text-[15px] font-medium text-slate-700 transition hover:text-slate-900 cursor-pointer"
                      @click="openBriefModal(sectionIndex, itemIndex)"
                    >
                      {{ item.actionLabel }}
                    </button>
                  </div>
                </div>

                <div
                  v-if="shouldShowGeneratedHomepageHero(sectionIndex, item.label)"
                  class="mt-5 rounded-[0.95rem] border border-slate-200 bg-white px-4 py-5 sm:px-7 sm:py-6"
                >
                  <div
                    v-for="(option, optionIndex) in getSectionGeneration(sectionIndex)?.copyOptions || []"
                    :key="option.id"
                    class="mt-8 first:mt-0"
                  >
                    <p class="text-[16px] font-semibold text-slate-900">
                      Option {{ optionIndex + 1 }}
                    </p>

                    <p class="mt-3 text-[18px] font-medium text-slate-800">
                      Hero heading
                    </p>
                    <div
                      class="mt-2 flex items-start justify-between gap-3 rounded-xl bg-slate-100 px-4 py-3"
                    >
                      <p class="text-[16px] leading-7 text-slate-700">
                        {{ option.heroHeading }}
                      </p>
                      <button
                        type="button"
                        class="inline-flex cursor-pointer items-center justify-center rounded-md p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                        @click="copyGeneratedText(option.heroHeading)"
                      >
                        <i class="ri-file-copy-line text-[18px]" aria-hidden="true"></i>
                      </button>
                    </div>

                    <p class="mt-4 text-[18px] font-medium text-slate-800">
                      Sub heading
                    </p>
                    <div
                      class="mt-2 flex items-start justify-between gap-3 rounded-xl bg-slate-100 px-4 py-3"
                    >
                      <p class="text-[16px] leading-7 text-slate-700">
                        {{ option.subHeading }}
                      </p>
                      <button
                        type="button"
                        class="inline-flex cursor-pointer items-center justify-center rounded-md p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                        @click="copyGeneratedText(option.subHeading)"
                      >
                        <i class="ri-file-copy-line text-[18px]" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>

                  <div class="mt-8 flex items-center justify-between gap-3">
                    <div class="inline-flex items-center gap-2 text-[15px] text-slate-700">
                      <span class="font-medium">Image Supports</span>
                      <span>({{ getSectionGeneration(sectionIndex)?.imageSizeLabel || "1440x560" }})</span>
                      <i class="ri-information-line text-[14px]" aria-hidden="true"></i>
                    </div>
                    <button
                      type="button"
                      class="cursor-pointer text-[16px] font-medium text-slate-700 transition hover:text-slate-900"
                      @click="downloadAllGeneratedImages(sectionIndex)"
                    >
                      Download all image
                    </button>
                  </div>

                  <div class="mt-4 grid gap-4 sm:grid-cols-2">
                    <div
                      v-for="image in getSectionGeneration(sectionIndex)?.imageSupports || []"
                      :key="image.id"
                      class="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <button
                        type="button"
                        class="absolute right-2 top-2 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-sm transition hover:text-slate-700"
                        @click="removeGeneratedImage(sectionIndex, image.id)"
                      >
                        <i class="ri-close-line text-[16px]" aria-hidden="true"></i>
                      </button>
                      <img
                        :src="image.url"
                        alt="Generated support"
                        class="h-[190px] w-full object-cover"
                      />
                    </div>
                  </div>

                  <p class="mt-5 text-[14px] italic text-slate-500">
                    powered by shutterstock
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="mt-8 text-[16px] font-medium text-slate-700 transition hover:text-slate-900"
      @click="backToBrandReview"
    >
      Back to Brand review
    </button>

    <BaseModal
      :open="isBriefModalOpen"
      :title="briefModalTitle"
      max-width-class="max-w-3xl"
      @close="closeBriefModal"
    >
      <p class="mt-1 text-[16px] text-slate-500">(Optional)</p>

      <p class="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        Provide specific details like target market, seasonal themes, or
        featured destinations to guide the AI generation.
      </p>

      <div
        class="mt-8 flex h-[64px] items-center rounded-[0.9rem] border border-slate-300 bg-white px-5 shadow-sm"
      >
        <input
          :value="briefDraft"
          type="text"
          class="w-full border-0 bg-transparent p-0 text-[18px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="e.g., Explore North America"
          @input="handleBriefInput"
        />
      </div>

      <div
        class="mt-4 flex items-start gap-3 text-[14px] leading-6 text-slate-500"
      >
        <svg
          class="mt-1 h-4.5 w-4.5 shrink-0 text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6M12 7h.01" stroke-linecap="round" />
        </svg>
        <p>
          Mentioning a specific country or intent (e.g. Skiing) helps the AI
          pick better Shutterstock images.
        </p>
      </div>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeBriefModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveBrief"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>
  </section>
</template>
