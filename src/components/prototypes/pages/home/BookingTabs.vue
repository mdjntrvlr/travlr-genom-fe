<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm">
      <div class="flex flex-col gap-4">
        <BookingTabList
          :tabs="tabs"
          :activeTab="activeTab"
          @update:activeTab="activeTab = $event"
        />

        <BookingTabPanel :activeTab="activeTab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BookingTabList from './BookingTabList.vue'
import BookingTabPanel from './BookingTabPanel.vue'

const tabs = [
  { title: 'Hotels' },
  { title: 'Flights' },
  { title: 'Activities' },
  { title: 'Cars' },
  { title: 'Offers' },
]

const activeTab = ref('Hotels')
</script>
