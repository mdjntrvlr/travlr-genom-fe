<template>
  <div>
    <Header />
    <HeroBanner :banner="resolvedBrand?.raw_data?.banner" />
    <BookingTabs />
    <StayCards @anyCardClick="handleStayCardsAnyCardClick" />
    <TravelOffers />
    <ExploreTopDestinations />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Brand } from '../services';
import { navigateToPrototypeDetail } from '../utils/navigation';
import { projectBrandContextKey } from '../utils/projectBrandContext';
import Header from "../components/prototypes/Header.vue";
import HeroBanner from "../components/prototypes/pages/home/HeroBanner.vue";
import BookingTabs from "../components/prototypes/pages/home/BookingTabs.vue";
import StayCards from "../components/prototypes/pages/home/StayCards.vue";
import TravelOffers from "../components/prototypes/pages/home/TravelOffers.vue";
import ExploreTopDestinations from "../components/prototypes/pages/home/ExploreTopDestinations.vue";
import Footer from "../components/prototypes/Footer.vue";

const props = defineProps<{
  brand?: Brand
}>();

const projectBrandContext = inject(projectBrandContextKey, null);

const resolvedBrand = computed(() => {
  return props.brand ?? projectBrandContext?.brand.value;
});

const handleStayCardsAnyCardClick = () => {
  navigateToPrototypeDetail();
}
</script>
