<template>
  <Header />
  <div class="py-8 px-8 max-w-7xl mx-auto">
    <div v-if="activeBrand" class="mb-4 text-sm text-slate-600">
      Showing results for {{ activeBrand.name }}
    </div>
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
  <Footer />
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import FilterComponent from "../components/prototypes/FilterComponent.vue";
import Footer from "../components/prototypes/Footer.vue";
import Header from "../components/prototypes/Header.vue";
import List from "../components/prototypes/pages/search/List.vue";
import { projectBrandContextKey } from '../utils/projectBrandContext';

const projectBrandContext = inject(projectBrandContextKey, null);

const activeBrand = computed(() => {
  return projectBrandContext?.brand.value ?? null;
});
</script>
