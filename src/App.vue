<script setup lang="ts">
type NavItem = {
  label: string;
  active?: boolean;
};

type StepItem = {
  number: number;
  label: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: "Brand Intelligence", active: true },
  { label: "Brand Repository" },
  { label: "Campaign Page" },
];

const steps: StepItem[] = [
  { number: 1, label: "Brand Extraction", active: true },
  { number: 2, label: "Brand Review" },
  { number: 3, label: "Applications" },
];

const allowedFiles = [".png", ".jpg", ".jpeg", ".svg", ".pdf"];
</script>

<template>
  <div class="min-h-screen bg-white text-slate-700">
    <header class="border-b border-slate-200 bg-white">
      <div class="flex h-[88px] items-center justify-between px-10">
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-3">
            <span class="text-[32px] font-light tracking-[-0.08em] text-black"
              >TRVLR</span
            >
            <span
              class="rounded-2xl bg-black px-5 py-2 text-xl font-semibold tracking-tight text-white"
            >
              GENOM
            </span>
          </div>
        </div>

        <!-- <button
          type="button"
          class="flex items-center gap-3 rounded-full px-2 py-2 text-slate-700 transition hover:bg-slate-50"
        >
          <span
            class="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-xl font-semibold text-slate-400"
          >
            JT
          </span>
          <span class="text-[18px] font-medium text-slate-700">Andrew Smith</span>
          <svg
            class="h-5 w-5 text-slate-500"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="m5 7 5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button> -->
      </div>
    </header>

    <div class="grid min-h-[calc(100vh-88px)] grid-cols-[320px_minmax(0,1fr)]">
      <aside class="border-r border-slate-200 bg-white px-8 py-5">
        <nav class="space-y-3">
          <a
            v-for="item in navItems"
            :key="item.label"
            :class="[
              'flex items-center gap-3 rounded-2xl px-5 py-4 text-[18px] font-medium transition',
              item.active
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50',
            ]"
            href="/"
          >
            <span
              v-if="item.label === 'Brand Intelligence'"
              class="flex h-6 w-6 items-center justify-center rounded-md border-2 border-cyan-500 text-cyan-500"
            >
              <svg
                class="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10 2.5 12 8l5.5 2-5.5 2-2 5.5-2-5.5L2.5 10 8 8 10 2.5Z"
                />
              </svg>
            </span>

            <span
              v-else-if="item.label === 'Brand Repository'"
              class="text-slate-500"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  d="M8 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm8-2a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM9.5 12.5l5 3m-8 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm2-4 4-3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <span v-else class="text-slate-500">
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                aria-hidden="true"
              >
                <path
                  d="m8 9-4 4 4 4m8-10 4 4-4 4m-4-8 4 4-4 4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <span>{{ item.label }}</span>
          </a>
        </nav>
      </aside>

      <main class="bg-white px-16 py-8">
        <div class="mx-auto max-w-[1115px]">
          <section>
            <h1 class="text-[32px] font-semibold tracking-tight text-slate-900">
              Brand Intelligence
            </h1>
            <p class="mt-3 text-[22px] text-slate-600">
              Extract, analyze, and aggregate brand data in one place.
            </p>
          </section>

          <section class="mt-10 flex items-center gap-6">
            <template v-for="(step, index) in steps" :key="step.label">
              <div class="flex items-center gap-5">
                <span
                  :class="[
                    'flex h-[44px] w-[44px] items-center justify-center rounded-full text-[20px] font-semibold',
                    step.active
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-400 text-white',
                  ]"
                >
                  {{ step.number }}
                </span>
                <span
                  :class="[
                    'text-[22px]',
                    step.active
                      ? 'font-medium text-slate-900'
                      : 'font-normal text-slate-500',
                  ]"
                >
                  {{ step.label }}
                </span>
              </div>

              <div
                v-if="index < steps.length - 1"
                class="h-1 w-[150px] rounded-full bg-slate-300"
              ></div>
            </template>
          </section>

          <section
            class="mt-11 max-w-[1115px] rounded-2xl bg-slate-100 px-7 py-7"
          >
            <h2 class="text-[26px] font-semibold tracking-tight text-slate-900">
              Extract Brand DNA
            </h2>
            <p class="mt-2 max-w-[770px] text-[20px] leading-8 text-slate-600">
              Provide a URL or upload a file to automatically identify potential
              WLP brand's voice and style.
            </p>

            <div class="mt-8">
              <label class="block text-[20px] font-medium text-slate-900">
                Website URL
                <span class="font-normal text-slate-500">(Primary Source)</span>
              </label>

              <div
                class="mt-3 flex h-[68px] max-w-[670px] items-center gap-4 rounded-2xl border border-slate-300 bg-white px-6 shadow-sm"
              >
                <svg
                  class="h-7 w-7 text-slate-400"
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
                  placeholder="Enter primary brand website e.g mastercard.com"
                  class="w-full border-0 bg-transparent p-0 text-[20px] text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <p
                class="mt-3 max-w-[820px] text-[14px] leading-6 text-slate-500"
              >
                We'll use this to understand the core identity and voice of the
                brand before they expand into travel.
              </p>
            </div>

            <div class="mt-6">
              <p class="text-[20px] text-slate-700">
                Or upload brand guideline or support files.
              </p>

              <button
                type="button"
                class="mt-4 inline-flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-[18px] font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                <svg
                  class="h-7 w-7 text-slate-500"
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

              <p class="mt-4 text-[14px] text-slate-500">
                Supports {{ allowedFiles.join(", ") }} only. File size &lt;
                20MB.
              </p>
            </div>

            <div class="mt-7 h-px max-w-[670px] bg-slate-300"></div>

            <button
              type="button"
              class="mt-6 inline-flex items-center rounded-full bg-cyan-500 px-7 py-5 text-[18px] font-semibold text-white transition hover:bg-cyan-600"
            >
              Extract Brand
            </button>
          </section>

          <div class="mt-64 h-px bg-slate-200"></div>
        </div>
      </main>
    </div>
  </div>
</template>
