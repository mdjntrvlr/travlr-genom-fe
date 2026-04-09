<template>
  <div class="flex flex-col gap-4">
    <div>
      <fieldset>
        <legend class="text-sm font-medium text-slate-700">Trip Type</legend>
        <div class="mt-2 flex gap-6">
          <label class="flex items-center">
            <input type="radio" name="tripType" value="return" checked
              class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-600" />
            <span class="ml-2 text-sm text-slate-700">Return</span>
          </label>
          <label class="flex items-center">
            <input type="radio" name="tripType" value="oneWay"
              class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-600" />
            <span class="ml-2 text-sm text-slate-700">One Way</span>
          </label>
        </div>
      </fieldset>
    </div>

    <div class="flex gap-4">
      <div>
        <input type="text" placeholder="From city or Airport"
          class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
      </div>

      <div>
        <input type="date"
          class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
      </div>

      <div>
        <select
          class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100">
          <option>1 passenger</option>
          <option>2 passengers</option>
          <option>3 passengers</option>
          <option>4+ passengers</option>
        </select>
      </div>

      <button type="button" @click="handleSearchClick"
        class="prototype-click-target inline-flex w-full items-center justify-center rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90">
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
