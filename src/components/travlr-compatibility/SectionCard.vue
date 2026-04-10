<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()
</script>

<template>
  <div class="rounded-2xl bg-white p-6">
    <div class="flex items-center gap-2">
      <i v-if="icon" :class="[icon, 'text-[18px] text-slate-500']" aria-hidden="true"></i>
      <h3 class="text-[16px] font-semibold tracking-tight text-slate-900">{{ title }}</h3>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
