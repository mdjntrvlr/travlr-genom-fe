<script setup lang="ts">
import { computed, ref, watch } from "vue";

import BaseModal from "../components/BaseModal.vue";
import InfoTooltip from "../components/InfoTooltip.vue";
import { useBrandIntelligence } from "../composables/useBrandIntelligence";
import { useToast } from "../composables/useToast";
import { useUploadQueue } from "../composables/useUploadQueue";

const { toast, showToast } = useToast();

const {
  allowedFiles,
  fileInput,
  uploadError,
  uploads,
  openFilePicker,
  removeUpload,
  handleFileChange,
} = useUploadQueue();

const {
  currentStep,
  websiteUrl,
  websiteUrlError,
  submitError,
  isSubmitting,
  isColorModalOpen,
  isCoreValueModalOpen,
  isBrandToneModalOpen,
  isBrandAestheticModalOpen,
  isTargetMarketModalOpen,
  isIndustryContextModalOpen,
  isBrandNarrativeModalOpen,
  newColorHex,
  newColorError,
  newCoreValue,
  newCoreValueError,
  newBrandTone,
  newBrandToneError,
  newBrandAesthetic,
  newBrandAestheticError,
  newTargetMarket,
  newTargetMarketError,
  newIndustryContext,
  newIndustryContextError,
  brandNarrativeDraft,
  brandNarrativeError,
  reviewState,
  steps,
  validateWebsiteUrl,
  handleWebsiteInput,
  openColorModal,
  closeColorModal,
  openCoreValueModal,
  closeCoreValueModal,
  openBrandToneModal,
  closeBrandToneModal,
  openBrandAestheticModal,
  closeBrandAestheticModal,
  openTargetMarketModal,
  closeTargetMarketModal,
  openIndustryContextModal,
  closeIndustryContextModal,
  openBrandNarrativeModal,
  closeBrandNarrativeModal,
  handleColorInput,
  handleCoreValueInput,
  handleBrandToneInput,
  handleBrandAestheticInput,
  handleTargetMarketInput,
  handleIndustryContextInput,
  handleBrandNarrativeInput,
  saveCustomColor,
  saveCoreValue,
  saveBrandTone,
  saveBrandAesthetic,
  saveTargetMarket,
  saveIndustryContext,
  saveBrandNarrative,
  saveBrandReview,
  backToExtraction,
  removeColor,
  removeCoreValue,
  removeBrandTone,
  removeBrandAesthetic,
  removeTargetMarket,
  removeIndustryContext,
  copyColor,
  submitBrandExtraction,
} = useBrandIntelligence(uploads, showToast);

const activeLogoIndex = ref(0);

const logoCandidates = computed(() => reviewState.value.logoCandidates ?? []);

const activeLogoUrl = computed(
  () => logoCandidates.value[activeLogoIndex.value] ?? "",
);

const brandInitials = computed(() =>
  reviewState.value.brandName
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
  <div class="relative">
    <div
      v-if="toast"
      :class="[
        'fixed right-6 top-6 z-[60] rounded-xl px-4 py-3 text-[13px] font-medium shadow-lg',
        toast.tone === 'success'
          ? 'bg-slate-900 text-white'
          : 'bg-rose-500 text-white',
      ]"
    >
      {{ toast.message }}
    </div>

    <section>
      <h1 class="text-[26px] font-semibold tracking-tight text-slate-900">
        Brand Intelligence
      </h1>
      <p class="mt-2 text-[18px] text-slate-600">
        Extract, analyze, and aggregate brand data in one place.
      </p>
    </section>

    <section class="mt-7 flex flex-wrap items-center gap-4">
      <template v-for="(step, index) in steps" :key="step.label">
        <div class="flex items-center gap-3">
          <span
            :class="[
              'flex h-[36px] w-[36px] items-center justify-center rounded-full text-[16px] font-semibold',
              currentStep > step.number
                ? 'bg-cyan-500 text-white'
                : currentStep === step.number
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-400 text-white',
            ]"
          >
            <svg
              v-if="currentStep > step.number"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              aria-hidden="true"
            >
              <path
                d="m4.5 10 3.5 3.5 7-7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span v-else>{{ step.number }}</span>
          </span>
          <span
            :class="[
              'text-[18px]',
              currentStep >= step.number
                ? 'font-medium text-slate-900'
                : 'font-normal text-slate-500',
            ]"
          >
            {{ step.label }}
          </span>
        </div>

        <div
          v-if="index < steps.length - 1"
          :class="[
            'hidden h-1 w-[110px] rounded-full xl:block',
            currentStep > index + 1 ? 'bg-cyan-500' : 'bg-slate-300',
          ]"
        ></div>
      </template>
    </section>

    <section
      v-if="currentStep === 1"
      class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6"
    >
      <h2 class="text-[22px] font-semibold tracking-tight text-slate-900">
        Extract Brand DNA
      </h2>
      <p class="mt-2 max-w-[770px] text-[16px] leading-7 text-slate-600">
        Provide a URL or upload a file to automatically identify potential WLP
        brand's voice and style.
      </p>

      <div class="mt-6">
        <label class="block text-[16px] font-medium text-slate-900">
          Website URL
          <span class="font-normal text-slate-500">(Primary Source)</span>
        </label>

        <div
          :class="[
            'mt-2 flex h-[56px] max-w-[670px] items-center gap-3 rounded-xl bg-white px-5 shadow-sm',
            websiteUrlError
              ? 'border border-rose-400'
              : 'border border-slate-300',
          ]"
        >
          <svg
            class="h-5 w-5 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            aria-hidden="true"
          >
            <path
              d="M10 13.5 8.5 15a4 4 0 0 1-5.5-5.8l3-3a4 4 0 0 1 5.7 0M14 10.5 15.5 9a4 4 0 0 1 5.5 5.8l-3 3a4 4 0 0 1-5.7 0M9 15l6-6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            type="text"
            v-model="websiteUrl"
            placeholder="Enter primary brand website e.g mastercard.com"
            class="w-full border-0 bg-transparent p-0 text-[16px] text-slate-700 outline-none placeholder:text-slate-400"
            @input="handleWebsiteInput"
            @blur="validateWebsiteUrl"
          />
        </div>

        <p
          v-if="websiteUrlError"
          class="mt-2 max-w-[820px] text-[12px] font-medium text-rose-600"
        >
          {{ websiteUrlError }}
        </p>
        <p class="mt-2 max-w-[820px] text-[12px] leading-5 text-slate-500">
          We'll use this to understand the core identity and voice of the brand
          before they expand into travel.
        </p>
      </div>

      <div class="mt-5">
        <p class="text-[16px] text-slate-700">
          Or upload brand guideline or support files.
        </p>

        <input
          ref="fileInput"
          type="file"
          accept=".png,.jpg,.jpeg,.svg,.pdf"
          multiple
          class="hidden"
          @change="handleFileChange"
        />

        <div
          v-if="uploads.length"
          class="mt-3 w-full max-w-[50%] min-w-[340px] space-y-2"
        >
          <div
            v-for="upload in uploads"
            :key="upload.id"
            class="relative overflow-hidden rounded-lg border border-slate-300 bg-white"
          >
            <div
              v-if="upload.status === 'uploading'"
              class="absolute inset-y-0 left-0 bg-cyan-50 transition-all duration-300"
              :style="{ width: `${upload.progress}%` }"
            ></div>

            <div class="relative flex items-center gap-2.5 px-2.5 py-2">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-semibold text-slate-900"
              >
                {{ upload.label }}
              </div>

              <p
                class="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-700"
              >
                {{ upload.name }}
              </p>

              <p
                v-if="upload.status === 'uploading'"
                class="shrink-0 text-[12px] font-semibold text-slate-700"
              >
                {{ upload.progress }}%
              </p>

              <button
                type="button"
                class="shrink-0 text-rose-500 transition hover:text-rose-600 cursor-pointer"
                @click="removeUpload(upload.id)"
                aria-label="Remove upload"
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
                    d="M4 7h16M9 7V5h6v2m-7 4v6m4-6v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="openFilePicker"
          class="mt-3 inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-[15px] font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <svg
            class="h-5 w-5 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            aria-hidden="true"
          >
            <path
              d="M12 16V7m0 0-3.5 3.5M12 7l3.5 3.5M6.5 16.5A4.5 4.5 0 0 1 7 7.5h.5A5.5 5.5 0 0 1 18 9a4 4 0 1 1-.5 7.97H16"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Upload Document
        </button>

        <p
          v-if="uploadError"
          class="mt-3 text-[12px] font-medium text-rose-600"
        >
          {{ uploadError }}
        </p>
        <p class="mt-3 text-[12px] text-slate-500">
          Supports {{ allowedFiles.join(", ") }} only. File size &lt; 20MB.
        </p>
      </div>

      <div class="mt-5 h-px max-w-[670px] bg-slate-300"></div>

      <button
        type="button"
        @click="submitBrandExtraction"
        :disabled="isSubmitting"
        class="mt-5 inline-flex items-center rounded-full bg-cyan-500 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-cyan-600 cursor-pointer disabled:cursor-not-allowed disabled:bg-cyan-400"
        :class="isSubmitting ? 'cursor-not-allowed opacity-70' : ''"
      >
        Extract Brand
      </button>

      <p v-if="submitError" class="mt-3 text-[12px] font-medium text-rose-600">
        {{ submitError }}
      </p>
    </section>

    <section
      v-else
      class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6"
    >
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
              <p
                class="text-[28px] font-semibold tracking-tight text-slate-900"
              >
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
              class="text-[14px] font-medium text-slate-500 cursor-pointer"
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
                  @click="copyColor(color)"
                  aria-label="Copy color"
                >
                  <i
                    class="ri-file-copy-line cursor-pointer text-[18px]"
                    aria-hidden="true"
                  ></i>
                </button>
                <span class="h-4 w-px bg-slate-200"></span>
                <button
                  type="button"
                  class="text-slate-500 transition hover:text-slate-700 cursor-pointer"
                  @click="removeColor(color)"
                  aria-label="Remove color"
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
              <h3 class="text-[16px] font-semibold text-slate-900">
                Core value
              </h3>
              <InfoTooltip
                message="Fundamental beliefs that drive the brand's message and focus."
              />
            </div>
            <button
              type="button"
              class="text-[14px] font-medium text-slate-500 cursor-pointer"
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
                  class="text-slate-500 transition hover:text-slate-700 cursor-pointer"
                  @click="removeCoreValue(value)"
                  :aria-label="`Remove ${value}`"
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
              class="text-[14px] font-medium text-slate-500 cursor-pointer"
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
                  class="text-slate-500 transition hover:text-slate-700 cursor-pointer"
                  @click="removeBrandTone(value)"
                  :aria-label="`Remove ${value}`"
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
              class="text-[14px] font-medium text-slate-500 cursor-pointer"
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
                  class="text-slate-500 transition hover:text-slate-700 cursor-pointer"
                  @click="removeBrandAesthetic(value)"
                  :aria-label="`Remove ${value}`"
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
              class="text-[14px] font-medium text-slate-500 cursor-pointer"
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
                  class="text-slate-500 transition hover:text-slate-700 cursor-pointer"
                  @click="removeTargetMarket(value)"
                  :aria-label="`Remove ${value}`"
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
              class="text-[14px] font-medium text-slate-500 cursor-pointer"
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
                  class="text-slate-500 transition hover:text-slate-700 cursor-pointer"
                  @click="removeIndustryContext(value)"
                  :aria-label="`Remove ${value}`"
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
              class="text-[14px] font-medium text-slate-500 cursor-pointer"
              @click="openBrandNarrativeModal"
            >
              Edit Narrative
            </button>
          </div>

          <div class="mt-3 rounded-2xl">
            <p class="text-[14px] leading-7 whitespace-pre-line text-slate-700">
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
          class="inline-flex w-auto items-center justify-center rounded-full bg-cyan-500 py-4 px-5 text-base font-semibold text-white transition hover:bg-cyan-600 cursor-pointer"
          @click="saveBrandReview"
        >
          Continue and Save
        </button>

        <button
          type="button"
          class="text-left text-sm font-medium text-slate-700 transition hover:text-slate-900 sm:text-right cursor-pointer"
          @click="backToExtraction"
        >
          Back to Extraction
        </button>
      </div>
    </section>

    <footer
      v-if="currentStep !== 1"
      class="mt-10 flex flex-col gap-5 text-slate-400"
    >
      <div class="h-px bg-slate-200"></div>
      <div
        class="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:text-[16px]"
      >
        <p>&copy; 2026 TRAVLR Pty Ltd. All Rights Reserved.</p>
        <p>V 1.0</p>
      </div>
    </footer>

    <BaseModal
      :open="isColorModalOpen"
      title="Add Brand Color"
      max-width-class="max-w-3xl"
      @close="closeColorModal"
    >
      <p class="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        Provide a HEX code to define your brand&apos;s visual palette. This
        helps the AI suggest relevant image themes and aesthetics.
      </p>

      <div class="mt-8 flex items-center gap-3">
        <div
          class="h-[64px] w-[64px] shrink-0 rounded-[0.9rem] border border-slate-200 shadow-sm"
          :style="{
            backgroundColor: /^#[0-9A-F]{6}$/i.test(newColorHex)
              ? newColorHex
              : '#FFFFFF',
          }"
        ></div>

        <div
          :class="[
            'flex h-[64px] flex-1 items-center rounded-[0.9rem] border bg-white px-5 shadow-sm',
            newColorError ? 'border-rose-400' : 'border-slate-300',
          ]"
        >
          <span class="text-[18px] text-slate-500">#</span>
          <input
            :value="newColorHex.replace(/^#/, '')"
            type="text"
            inputmode="text"
            maxlength="6"
            class="ml-3 w-full border-0 bg-transparent p-0 text-[18px] font-medium uppercase text-slate-900 outline-none placeholder:text-slate-400"
            placeholder="01B2C9"
            @input="handleColorInput"
          />
        </div>
      </div>

      <p
        v-if="newColorError"
        class="mt-3 text-[12px] font-medium text-rose-600"
      >
        {{ newColorError }}
      </p>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeColorModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveCustomColor"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      :open="isCoreValueModalOpen"
      title="Add New Attribute"
      max-width-class="max-w-3xl"
      @close="closeCoreValueModal"
    >
      <p class="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        Provide additional keywords to sharpen the AI understanding of your
        brand identity.
      </p>

      <div
        :class="[
          'mt-8 flex h-[64px] items-center rounded-[0.9rem] border bg-white px-5 shadow-sm',
          newCoreValueError ? 'border-rose-400' : 'border-slate-300',
        ]"
      >
        <input
          :value="newCoreValue"
          type="text"
          class="w-full border-0 bg-transparent p-0 text-[18px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="e.g., Adventure-seeker or Minimalist"
          @input="handleCoreValueInput"
          @keydown.enter.prevent="saveCoreValue"
        />
      </div>

      <p
        v-if="newCoreValueError"
        class="mt-3 text-[12px] font-medium text-rose-600"
      >
        {{ newCoreValueError }}
      </p>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeCoreValueModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveCoreValue"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      :open="isBrandToneModalOpen"
      title="Add New Attribute"
      max-width-class="max-w-3xl"
      @close="closeBrandToneModal"
    >
      <p class="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        Provide additional keywords to sharpen the AI understanding of your
        brand identity.
      </p>

      <div
        :class="[
          'mt-8 flex h-[64px] items-center rounded-[0.9rem] border bg-white px-5 shadow-sm',
          newBrandToneError ? 'border-rose-400' : 'border-slate-300',
        ]"
      >
        <input
          :value="newBrandTone"
          type="text"
          class="w-full border-0 bg-transparent p-0 text-[18px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="e.g., Friendly or Bold"
          @input="handleBrandToneInput"
          @keydown.enter.prevent="saveBrandTone"
        />
      </div>

      <p
        v-if="newBrandToneError"
        class="mt-3 text-[12px] font-medium text-rose-600"
      >
        {{ newBrandToneError }}
      </p>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeBrandToneModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveBrandTone"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      :open="isBrandAestheticModalOpen"
      title="Add New Attribute"
      max-width-class="max-w-3xl"
      @close="closeBrandAestheticModal"
    >
      <p class="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        Provide additional keywords to sharpen the AI understanding of your
        brand indentiy.
      </p>

      <div
        :class="[
          'mt-8 flex h-[64px] items-center rounded-[0.9rem] border bg-white px-5 shadow-sm',
          newBrandAestheticError ? 'border-rose-400' : 'border-slate-300',
        ]"
      >
        <input
          :value="newBrandAesthetic"
          type="text"
          class="w-full border-0 bg-transparent p-0 text-[18px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="e.g., Adventure-seeker or Luxury"
          @input="handleBrandAestheticInput"
          @keydown.enter.prevent="saveBrandAesthetic"
        />
      </div>

      <p
        v-if="newBrandAestheticError"
        class="mt-3 text-[12px] font-medium text-rose-600"
      >
        {{ newBrandAestheticError }}
      </p>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeBrandAestheticModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveBrandAesthetic"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      :open="isTargetMarketModalOpen"
      title="Add New Attribute"
      max-width-class="max-w-3xl"
      @close="closeTargetMarketModal"
    >
      <p class="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        Provide additional keywords to sharpen the AI understanding of your
        brand identity.
      </p>

      <div
        :class="[
          'mt-8 flex h-[64px] items-center rounded-[0.9rem] border bg-white px-5 shadow-sm',
          newTargetMarketError ? 'border-rose-400' : 'border-slate-300',
        ]"
      >
        <input
          :value="newTargetMarket"
          type="text"
          class="w-full border-0 bg-transparent p-0 text-[18px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="e.g., Families or Business Travelers"
          @input="handleTargetMarketInput"
          @keydown.enter.prevent="saveTargetMarket"
        />
      </div>

      <p
        v-if="newTargetMarketError"
        class="mt-3 text-[12px] font-medium text-rose-600"
      >
        {{ newTargetMarketError }}
      </p>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeTargetMarketModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveTargetMarket"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      :open="isIndustryContextModalOpen"
      title="Add New Attribute"
      max-width-class="max-w-3xl"
      @close="closeIndustryContextModal"
    >
      <p class="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        Provide additional keywords to sharpen the AI understanding of your
        brand industry landscape.
      </p>

      <div
        :class="[
          'mt-8 flex h-[64px] items-center rounded-[0.9rem] border bg-white px-5 shadow-sm',
          newIndustryContextError ? 'border-rose-400' : 'border-slate-300',
        ]"
      >
        <input
          :value="newIndustryContext"
          type="text"
          class="w-full border-0 bg-transparent p-0 text-[18px] font-medium text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="e.g., Luxury Hospitality or Adventure Travel"
          @input="handleIndustryContextInput"
          @keydown.enter.prevent="saveIndustryContext"
        />
      </div>

      <p
        v-if="newIndustryContextError"
        class="mt-3 text-[12px] font-medium text-rose-600"
      >
        {{ newIndustryContextError }}
      </p>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeIndustryContextModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveIndustryContext"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>

    <BaseModal
      :open="isBrandNarrativeModalOpen"
      title="Edit Brand Narrative"
      max-width-class="max-w-4xl"
      @close="closeBrandNarrativeModal"
    >
      <p class="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600">
        Refine the longer-form story that describes your brand voice, purpose,
        and point of view.
      </p>

      <div
        :class="[
          'mt-8 rounded-[1.15rem] border bg-white p-5 shadow-sm',
          brandNarrativeError ? 'border-rose-400' : 'border-slate-300',
        ]"
      >
        <textarea
          :value="brandNarrativeDraft"
          rows="8"
          class="min-h-[220px] w-full resize-none border-0 bg-transparent p-0 text-[16px] leading-7 text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="Describe the brand story, positioning, and perspective..."
          @input="handleBrandNarrativeInput"
        ></textarea>
      </div>

      <p
        v-if="brandNarrativeError"
        class="mt-3 text-[12px] font-medium text-rose-600"
      >
        {{ brandNarrativeError }}
      </p>

      <template #footer>
        <div class="flex items-center gap-4">
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-[16px] font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="closeBrandNarrativeModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="inline-flex min-w-[160px] items-center justify-center rounded-full bg-cyan-500 px-7 py-3 text-[16px] font-semibold text-white transition hover:bg-cyan-600"
            @click="saveBrandNarrative"
          >
            Save
          </button>
        </div>
      </template>
    </BaseModal>

    <div
      v-if="isSubmitting"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-5">
        <div
          class="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500"
        ></div>
        <p class="text-[22px] font-semibold text-slate-900">
          Reading brand values
        </p>
      </div>
    </div>
  </div>
</template>
