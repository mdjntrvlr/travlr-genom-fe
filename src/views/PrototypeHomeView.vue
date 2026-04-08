<template>
  <div>
    <Header />
    <HeroBanner />
    <StayCards />
    <TravelOffers />
    <ExploreTopDestinations />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "../components/prototypes/Header.vue";
import HeroBanner from "../components/prototypes/pages/home/HeroBanner.vue";
import StayCards from "../components/prototypes/pages/home/StayCards.vue";
import TravelOffers from "../components/prototypes/pages/home/TravelOffers.vue";
import ExploreTopDestinations from "../components/prototypes/pages/home/ExploreTopDestinations.vue";
import Footer from "../components/prototypes/Footer.vue";
</script>
