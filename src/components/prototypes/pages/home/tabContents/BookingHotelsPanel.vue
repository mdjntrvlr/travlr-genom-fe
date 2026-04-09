<template>
  <div class="flex gap-4">
    <div>
      <input type="text" placeholder="Enter city or hotel"
        class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
    </div>

    <div>
      <input type="text" placeholder="Select check-in and check-out"
        class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
    </div>

    <div>
      <select
        class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100">
        <option>1 guest</option>
        <option>2 guests</option>
        <option>3 guests</option>
        <option>4+ guests</option>
      </select>
    </div>

    <button type="button"
      class="inline-flex w-full items-center justify-center rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90">
      Search
    </button>
  </div>
</template>
