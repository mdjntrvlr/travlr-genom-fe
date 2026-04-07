<template>
  <div class="flex gap-4">
    <div class="w-[32px] h-[32px] bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
      AI
    </div>
    <div class="bg-[#F3F4F6] rounded-[10px] p-5 text-left">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>
