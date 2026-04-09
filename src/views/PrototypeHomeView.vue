<template>
  <div>
    <Header />
    <HeroBanner />
    <BookingTabs />

    <StayCards @anyCardClick="handleStayCardsAnyCardClick" />
    <TravelOffers />
    <ExploreTopDestinations />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { navigateToPrototypeDetail } from '../utils/navigation';
import Header from "../components/prototypes/Header.vue";
import HeroBanner from "../components/prototypes/pages/home/HeroBanner.vue";
import BookingTabs from "../components/prototypes/pages/home/BookingTabs.vue";
import StayCards from "../components/prototypes/pages/home/StayCards.vue";
import TravelOffers from "../components/prototypes/pages/home/TravelOffers.vue";
import ExploreTopDestinations from "../components/prototypes/pages/home/ExploreTopDestinations.vue";
import Footer from "../components/prototypes/Footer.vue";

const handleStayCardsAnyCardClick = () => {
  navigateToPrototypeDetail();
}
</script>
