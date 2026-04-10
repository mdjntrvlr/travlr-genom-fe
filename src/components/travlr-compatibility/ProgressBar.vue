<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  score: number
  label?: string
}>()

const animated = ref(false)

const clampedScore = computed(() => Math.min(Math.max(props.score, 0), 100))

const barColor = computed(() => {
  if (clampedScore.value >= 75) return 'bg-emerald-500'
  if (clampedScore.value >= 50) return 'bg-amber-400'
  return 'bg-rose-500'
})

onMounted(() => {
  requestAnimationFrame(() => {
    animated.value = true
  })
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-2">
      <span v-if="label" class="text-[14px] font-medium text-slate-700">{{ label }}</span>
      <span class="text-[14px] font-semibold text-slate-900">{{ clampedScore }}%</span>
    </div>
    <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        :class="['h-full rounded-full transition-all duration-700 ease-out', barColor]"
        :style="{ width: animated ? `${clampedScore}%` : '0%' }"
      ></div>
    </div>
  </div>
</template>
