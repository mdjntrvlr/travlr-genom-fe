<script setup lang="ts">
defineProps<{
  tags: string[]
  variant?: 'default' | 'cyan'
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="tag in tags"
      :key="tag"
      :class="[
        'rounded-full px-3 py-1.5 text-[13px] font-medium',
        variant === 'cyan'
          ? 'bg-cyan-50 text-cyan-700'
          : 'bg-slate-100 text-slate-700',
      ]"
    >
      {{ tag }}
    </span>
  </div>
</template>
