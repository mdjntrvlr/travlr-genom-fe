<template>



  <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
    <div class="flex gap-3">
      <div class="relative flex-1">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <input type="text" placeholder="Search by Destination or Activity"
          class="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
      </div>
      <button @click="handleSearchClick" type="button"
        class="prototype-click-target inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-6 py-3 text-sm font-semibold text-white shadow-sm transition">
        Search
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { navigateToPrototypeSearch } from '../../../../../utils/navigation';

const handleSearchClick = () => {
  navigateToPrototypeSearch();
}
</script>
