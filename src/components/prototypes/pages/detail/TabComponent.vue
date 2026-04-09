<template>
  <div class="border-b border-gray-200">
    <div class="flex gap-8">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index"
        :class="[
          'px-4 py-3 font-medium text-sm transition-colors border-b-2',
          index === 0
            ? 'text-secondary border-accent'
            : 'text-gray-600 border-transparent hover:text-gray-900'
        ]"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = ["Overview", "Rooms", "Location", "Amenities", "Policies", "Reviews"]
</script>