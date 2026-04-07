<template>
  <section>
    <h1 class="text-[32px] font-semibold tracking-tight text-slate-900">
      Brand Repository
    </h1>
    <p class="mt-3 text-[22px] text-slate-600">
      Centralize source files, brand kits, and reusable reference material.
    </p>
  </section>

  <section class="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
    <article class="rounded-2xl border border-slate-200 bg-slate-50 p-7">
      <h2 class="text-[24px] font-semibold text-slate-900">Library Overview</h2>
      <p class="mt-3 max-w-2xl text-[18px] leading-8 text-slate-600">
        This placeholder area can become your asset table, filters, uploader, and approval states.
        For now it gives the route a real destination and keeps the shell navigation working.
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p class="text-sm font-medium text-slate-500">Brand Kits</p>
          <p class="mt-2 text-3xl font-semibold text-slate-900">14</p>
        </div>
        <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p class="text-sm font-medium text-slate-500">Approved Files</p>
          <p class="mt-2 text-3xl font-semibold text-slate-900">128</p>
        </div>
        <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p class="text-sm font-medium text-slate-500">Needs Review</p>
          <p class="mt-2 text-3xl font-semibold text-slate-900">9</p>
        </div>
      </div>
    </article>

    <article class="rounded-2xl border border-slate-200 bg-white p-7">
      <h2 class="text-[24px] font-semibold text-slate-900">Recent Activity</h2>
      <ul class="mt-5 space-y-4 text-[16px] text-slate-600">
        <li class="rounded-xl bg-slate-50 px-4 py-3">Master brand guide uploaded 2 hours ago</li>
        <li class="rounded-xl bg-slate-50 px-4 py-3">Logo pack approved for campaign use</li>
        <li class="rounded-xl bg-slate-50 px-4 py-3">Social voice memo added by strategy team</li>
      </ul>
    </article>
  </section>
</template>
