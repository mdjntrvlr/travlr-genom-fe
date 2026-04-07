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
  <div class="group relative inline-flex">
    <slot>
      <span
        class="flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-slate-600 text-[11px] font-semibold text-white"
      >
        i
      </span>
    </slot>

    <div
      :class="[
        'pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-20 -translate-x-1/2 rounded-3xl bg-slate-800 px-5 py-4 text-white opacity-0 shadow-2xl transition duration-150 group-hover:opacity-100',
        widthClass,
      ]"
    >
      <div class="flex items-start gap-4">
        <span
          class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white text-[16px] font-semibold"
        >
          i
        </span>
        <p class="text-[14px] leading-7 text-slate-100">
          {{ message }}
        </p>
      </div>
      <div
        class="absolute left-1/2 top-full h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-800"
      ></div>
    </div>
  </div>
</template>
