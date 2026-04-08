<script setup lang="ts">
type ApplicationItem = {
  label: string;
  actionLabel: string;
  statusLabel: string;
};

type ApplicationSection = {
  title: string;
  description: string;
  items: ApplicationItem[];
};

defineProps<{
  backToBrandReview: () => void;
}>();

const applicationSections: ApplicationSection[] = [
  {
    title: "WLP Supports & Product Sections",
    description:
      "Generate high-converting headlines, sub-headings, and body copy for homepage carousels and product landing pages, automatically paired with Shutterstock visual assets.",
    items: [
      {
        label: "Homepage Hero Banner",
        actionLabel: "Set Brief",
        statusLabel: "",
      },
      {
        label: "Supporting Banner",
        actionLabel: "Edit",
        statusLabel: "Brief Applied",
      },
    ],
  },
  {
    title: "Brand Assets",
    description:
      "Create structured output briefs for brand-supporting assets that stay aligned with your review inputs and visual identity.",
    items: [{ label: "Logo Specs", actionLabel: "", statusLabel: "" }],
  },
];
</script>

<template>
  <section class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6">
    <div class="rounded-[1.75rem] bg-white p-6 sm:p-9">
      <div
        v-for="section in applicationSections"
        :key="section.title"
        class="rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)]"
        :class="section === applicationSections[0] ? '' : 'mt-8'"
      >
        <div
          class="flex flex-col gap-5 border-b border-slate-200 px-6 py-6 sm:flex-row sm:items-start sm:justify-between"
        >
          <div class="max-w-[760px]">
            <h2 class="text-[18px] font-semibold tracking-tight text-slate-900">
              {{ section.title }}
            </h2>
            <p class="mt-3 text-[16px] leading-8 text-slate-600">
              {{ section.description }}
            </p>
          </div>

          <button
            type="button"
            class="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[15px] font-medium text-slate-800 transition hover:bg-slate-50"
          >
            <svg
              class="h-5 w-5 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path
                d="M4 6.5A2.5 2.5 0 0 1 6.5 4H14l6 6v7.5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 4v6h6M8 15h8M8 11h3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="m17 3 1.2 1.2M19.8 5.8 21 7" stroke-linecap="round" />
            </svg>
            Generate
          </button>
        </div>

        <div class="space-y-4 px-6 py-6">
          <div
            v-for="item in section.items"
            :key="item.label"
            class="flex flex-col gap-3 rounded-[1.15rem] border border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-[16px] font-medium text-slate-800">
              {{ item.label }}
            </p>

            <div
              v-if="item.actionLabel || item.statusLabel"
              class="flex flex-wrap items-center gap-3"
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
                class="text-[15px] font-medium text-slate-700 transition hover:text-slate-900"
              >
                {{ item.actionLabel }}
              </button>
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
    </div>
  </section>
</template>
