<script setup lang="ts">
import { computed, ref } from "vue";

import BaseModal from "../BaseModal.vue";

type ApplicationItem = {
  label: string;
  actionLabel: string;
  statusLabel: string;
  brief: string;
  isBriefEnabled: boolean;
};

type ApplicationSection = {
  title: string;
  description: string;
  moduleTitle: string;
  items: ApplicationItem[];
};

defineProps<{
  backToBrandReview: () => void;
}>();

const applicationSections = ref<ApplicationSection[]>([
  {
    title: "WLP Supports & Product Sections",
    description:
      "Generate high-converting headlines, sub-headings, and body copy for homepage carousels and product landing pages, automatically paired with Shutterstock visual assets.",
    moduleTitle: "Homepage Section",
    items: [
      {
        label: "Homepage Hero Banner",
        actionLabel: "Set Brief",
        statusLabel: "",
        brief: "",
        isBriefEnabled: true,
      },
      {
        label: "Supporting Banner",
        actionLabel: "Edit",
        statusLabel: "Brief Applied",
        brief:
          "Use playful, conversion-focused copy with a confident editorial tone and destination-led value props.",
        isBriefEnabled: true,
      },
    ],
  },
  {
    title: "",
    description: "",
    moduleTitle: "Brand Assets",
    items: [
      {
        label: "Logo Specs",
        actionLabel: "",
        statusLabel: "",
        brief: "",
        isBriefEnabled: false,
      },
    ],
  },
]);

type ActiveItemPosition = {
  sectionIndex: number;
  itemIndex: number;
};

const isBriefModalOpen = ref(false);
const briefDraft = ref("");
const activeItemPosition = ref<ActiveItemPosition | null>(null);

const getActiveItem = () => {
  const position = activeItemPosition.value;

  if (!position) {
    return null;
  }

  return (
    applicationSections.value[position.sectionIndex]?.items[
      position.itemIndex
    ] ?? null
  );
};

const briefModalTitle = computed(() => {
  const item = getActiveItem();

  if (item?.actionLabel === "Edit") {
    return "Edit Brief";
  }

  return "Set Brief";
});

const openBriefModal = (sectionIndex: number, itemIndex: number) => {
  const item = applicationSections.value[sectionIndex]?.items[itemIndex];

  if (!item || !item.isBriefEnabled) {
    return;
  }

  activeItemPosition.value = { sectionIndex, itemIndex };
  briefDraft.value = item.brief;
  isBriefModalOpen.value = true;
};

const closeBriefModal = () => {
  isBriefModalOpen.value = false;
  activeItemPosition.value = null;
  briefDraft.value = "";
};

const handleBriefInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  briefDraft.value = target.value;
};

const saveBrief = () => {
  const normalizedBrief = briefDraft.value.trim();
  const item = getActiveItem();

  if (!item) {
    closeBriefModal();
    return;
  }

  item.brief = normalizedBrief;
  item.statusLabel = normalizedBrief ? "Brief Applied" : "";
  item.actionLabel = normalizedBrief ? "Edit" : "Set Brief";
  closeBriefModal();
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
              type="button"
              class="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-4 py-2 text-[14px] font-medium text-slate-800 transition hover:bg-slate-50 sm:self-auto cursor-not-allowed cursor-pointer"
            >
              <i class="ri-ai-generate-2 text-sm" aria-hidden="true"></i>
              Generate
            </button>
          </div>

          <div class="space-y-3 bg-white px-5 py-5">
            <div
              v-for="(item, itemIndex) in section.items"
              :key="item.label"
              class="flex flex-col gap-3 rounded-[0.85rem] border border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <p class="text-[16px] font-medium text-slate-800">
                {{ item.label }}
              </p>

              <div
                v-if="item.actionLabel || item.statusLabel"
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
