<template>
  <div class="">
    <component :is="panelComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BookingActivitiesPanel from './tabContents/BookingActivitiesPanel.vue'
import BookingCarsPanel from './tabContents/BookingCarsPanel.vue'
import BookingFlightsPanel from './tabContents/BookingFlightsPanel.vue'
import BookingHotelsPanel from './tabContents/BookingHotelsPanel.vue'
import BookingOffersPanel from './tabContents/BookingOffersPanel.vue'

const props = defineProps({
  activeTab: {
    type: String,
    required: true,
  },
})

const panels = {
  Hotels: BookingHotelsPanel,
  Flights: BookingFlightsPanel,
  Activities: BookingActivitiesPanel,
  Cars: BookingCarsPanel,
  Offers: BookingOffersPanel,
}

const panelComponent = computed(() => panels[props.activeTab] || BookingHotelsPanel)
</script>
