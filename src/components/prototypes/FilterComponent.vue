<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
    
    <!-- Price Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
      <input type="range" min="0" max="5000" class="w-full" />
      <div class="flex justify-between text-sm text-gray-600 mt-2">
        <span>$0</span>
        <span>$5000+</span>
      </div>
    </div>

    <!-- Rating Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
      <div class="space-y-2">
        <label class="flex items-center">
          <input type="checkbox" class="rounded mr-2" />
          <span class="text-sm text-gray-700">5 Stars</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" class="rounded mr-2" />
          <span class="text-sm text-gray-700">4+ Stars</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" class="rounded mr-2" />
          <span class="text-sm text-gray-700">3+ Stars</span>
        </label>
      </div>
    </div>

    <!-- Location Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
      <input type="text" placeholder="Search location" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
    </div>

    <!-- Amenities Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
      <div class="space-y-2">
        <label class="flex items-center">
          <input type="checkbox" class="rounded mr-2" />
          <span class="text-sm text-gray-700">WiFi</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" class="rounded mr-2" />
          <span class="text-sm text-gray-700">Pool</span>
        </label>
        <label class="flex items-center">
          <input type="checkbox" class="rounded mr-2" />
          <span class="text-sm text-gray-700">Spa</span>
        </label>
      </div>
    </div>

    <!-- Apply Filters Button -->
    <button class="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg font-medium hover:bg-[#d1007a] transition-colors">
      Apply Filters
    </button>
  </div>
</template>

<script setup lang="ts">
// Filter component for property search
</script>