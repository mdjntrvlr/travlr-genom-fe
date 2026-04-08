<template>
  <div class="py-8 px-8 max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Left Column: Filter -->
      <div class="lg:col-span-1">
        <FilterComponent />
      </div>

      <!-- Right Column: Property Cards -->
      <div class="lg:col-span-3">
        <List />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterComponent from "../components/prototypes/FilterComponent.vue";
import List from "../components/prototypes/pages/search/List.vue";
</script>
