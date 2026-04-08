<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string;
    widthClass?: string;
  }>(),
  {
    widthClass: "w-[300px]",
  },
);
</script>

<template>
  <div class="group relative inline-flex info-tooltip">
    <slot>
      <span
        class="flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-slate-600 text-[11px] font-semibold text-white"
      >
        i
      </span>
    </slot>

    <div
      :class="[
        'pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-20 -translate-x-1/2 bg-slate-800 px-3 py-2 text-white shadow-2xl transition duration-150 opacity-0 group-hover:opacity-100 rounded-lg',
        widthClass,
      ]"
      class="info-tooltip-cloud"
    >
      <div class="flex items-center gap-4">
        <span
          class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-white text-xs font-semibold rounded-full"
        >
          i
        </span>
        <p class="text-xs text-slate-100">
          {{ message }}
        </p>
      </div>
      <div
        class="absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-800"
      ></div>
    </div>
  </div>
</template>
