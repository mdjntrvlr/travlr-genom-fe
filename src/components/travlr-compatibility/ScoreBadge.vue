<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  score: number
  label: string
}>()

const radius = 42
const circumference = 2 * Math.PI * radius
const animated = ref(false)

const clampedScore = computed(() => Math.min(Math.max(props.score, 0), 100))

const strokeDashoffset = computed(() => {
  const pct = animated.value ? clampedScore.value / 100 : 0
  return circumference * (1 - pct)
})

const strokeColor = computed(() => {
  if (clampedScore.value >= 75) return '#22c55e'
  if (clampedScore.value >= 50) return '#f59e0b'
  return '#ef4444'
})

const labelClass = computed(() => {
  if (clampedScore.value >= 75) return 'bg-emerald-100 text-emerald-700'
  if (clampedScore.value >= 50) return 'bg-amber-100 text-amber-700'
  return 'bg-rose-100 text-rose-700'
})

onMounted(() => {
  requestAnimationFrame(() => {
    animated.value = true
  })
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="relative h-32 w-32">
      <svg class="h-full w-full -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
        <circle
          cx="48" cy="48" :r="radius"
          fill="none" stroke="#e2e8f0" stroke-width="8"
        />
        <circle
          cx="48" cy="48" :r="radius"
          fill="none"
          :stroke="strokeColor"
          stroke-width="8"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          class="transition-all duration-700 ease-out"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-[34px] font-bold leading-none tracking-tight text-slate-900">
          {{ clampedScore }}
        </span>
        <span class="mt-0.5 text-[11px] font-medium text-slate-400">/ 100</span>
      </div>
    </div>
    <span :class="['rounded-full px-4 py-1.5 text-[13px] font-semibold', labelClass]">
      {{ label }}
    </span>
  </div>
</template>
