<script setup lang="ts">
import BaseModal from "../components/BaseModal.vue";
import BrandApplicationsStep from "../components/brand-intelligence/BrandApplicationsStep.vue";
import BrandExtractionStep from "../components/brand-intelligence/BrandExtractionStep.vue";
import BrandReviewStep from "../components/brand-intelligence/BrandReviewStep.vue";
import TravlrCompatibility from "../components/travlr-compatibility/TravlrCompatibility.vue";
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
  backToBrandReview,
  removeColor,
  removeCoreValue,
  removeBrandTone,
  removeBrandAesthetic,
  removeTargetMarket,
  removeIndustryContext,
  copyColor,
  submitBrandExtraction,
} = useBrandIntelligence(uploads, showToast);

const setFileInput = (element: HTMLInputElement | null) => {
  fileInput.value = element;
};
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

    <BrandExtractionStep
      v-if="currentStep === 1"
      :allowed-files="allowedFiles"
      :set-file-input="setFileInput"
      :upload-error="uploadError"
      :uploads="uploads"
      :website-url="websiteUrl"
      :website-url-error="websiteUrlError"
      :submit-error="submitError"
      :is-submitting="isSubmitting"
      :open-file-picker="openFilePicker"
      :remove-upload="removeUpload"
      :handle-file-change="handleFileChange"
      :validate-website-url="validateWebsiteUrl"
      :handle-website-input="handleWebsiteInput"
      :submit-brand-extraction="submitBrandExtraction"
      @update:website-url="websiteUrl = $event"
    />

    <BrandReviewStep
      v-else-if="currentStep === 2"
      :review-state="reviewState"
      :open-color-modal="openColorModal"
      :open-core-value-modal="openCoreValueModal"
      :open-brand-tone-modal="openBrandToneModal"
      :open-brand-aesthetic-modal="openBrandAestheticModal"
      :open-target-market-modal="openTargetMarketModal"
      :open-industry-context-modal="openIndustryContextModal"
      :open-brand-narrative-modal="openBrandNarrativeModal"
      :remove-color="removeColor"
      :remove-core-value="removeCoreValue"
      :remove-brand-tone="removeBrandTone"
      :remove-brand-aesthetic="removeBrandAesthetic"
      :remove-target-market="removeTargetMarket"
      :remove-industry-context="removeIndustryContext"
      :copy-color="copyColor"
      :save-brand-review="saveBrandReview"
      :back-to-extraction="backToExtraction"
    />

    <template v-else>
      <TravlrCompatibility :website-url="reviewState.slug" />
      
      <BrandApplicationsStep
        :back-to-brand-review="backToBrandReview"
        :brand-url="websiteUrl"
        :logo-candidates="reviewState.logoCandidates"
        :show-toast="showToast"
      />
    </template>

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
