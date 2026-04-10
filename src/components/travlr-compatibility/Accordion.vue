<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const open = ref(false)

const toggle = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
    <button
      type="button"
      class="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
      @click="toggle"
    >
      <span class="text-[15px] font-semibold text-slate-900">{{ title }}</span>
      <i
        :class="[
          'shrink-0 text-[20px] text-slate-400 transition-transform duration-200',
          open ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
        ]"
        aria-hidden="true"
      ></i>
    </button>

    <div
      v-if="open"
      class="border-t border-slate-100 px-5 py-5"
    >
      <slot />
    </div>
  </div>
</template>
