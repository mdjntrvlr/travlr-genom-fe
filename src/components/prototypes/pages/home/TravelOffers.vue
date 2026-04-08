<template>
  <div class="py-16 px-8 max-w-7xl mx-auto">
    <div class="text-left mb-12">
      <h2 class="text-[24px] font-bold text-gray-900 mb-4">
        More Joy in Every Journey.
      </h2>
      <p class="text-[16px] text-[#374151] max-w-2xl">
        Grab our latest international offers and maximize your savings with the world's first cross-border telco rewards program.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TravelOfferCard
        v-for="(offer, index) in travelOffers"
        :key="index"
        :offer="offer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TravelOfferCard from './TravelOfferCard.vue'
import type { TravelOffer } from './TravelOfferCard.vue'

// Travel offers component for WanderJoy Travel special deals

const travelOffers: TravelOffer[] = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
    badge: "3 x daily cocktails per adult",
    title: "Anantara Uluwatu Bali Resort",
    details: "3 nights, 2 adults from",
    price: "$1,299"
  },
  {
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    badge: "Free airport transfer",
    title: "Swiss Mountain Lodge",
    details: "4 nights, 2 adults from",
    price: "$2,450"
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop",
    badge: "Spa package included",
    title: "Santorini Luxury Villa",
    details: "5 nights, 2 adults from",
    price: "$3,200"
  }
];
</script>