<template>
  <div class="py-16 px-8 max-w-7xl mx-auto">
    <div class="flex justify-between">
      <div class="text-left mb-12">
        <h2 class="text-[24px] font-bold text-[#111827] mb-4">
          More Joy in Every Journey.
        </h2>
        <p class="text-[16px] text-[#374151] max-w-2xl">
          Grab our latest international offers and maximize your savings with the world's first cross-border telco
          rewards program.
        </p>
      </div>
      <button
        class="mt-2 cursor-pointer rounded-full px-[16px] text-[#111827] border text-[14px] font-bold line-height-[32px] h-[32px]">See
        More</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TravelOfferCard v-for="(offer, index) in travelOffers" :key="index" :offer="offer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TravelOfferCard from './TravelOfferCard.vue'
import type { TravelOffer } from './TravelOfferCard.vue'

// Travel offers component for WanderJoy Travel special deals

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const formatAud = (value: number) => {
  return `AU$${value.toLocaleString('en-AU')}`
}

const makeRandomPrices = () => {
  const basePrice = randomInt(1200, 5200)
  const discount = randomInt(150, 900)
  const vipDelta = randomInt(40, 220)

  return {
    offerPrice: formatAud(basePrice),
    price: formatAud(basePrice + discount),
    priceWithVIP: formatAud(basePrice + vipDelta),
  }
}

const travelOffers: TravelOffer[] = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
    badge: "3 x daily cocktails per adult",
    title: "Anantara Uluwatu Bali Resort",
    location: "Aksari Villa Seminyak",
    details: "3 nights, 2 adults from",
    ...makeRandomPrices(),
  },
  {
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    badge: "Free airport transfer",
    title: "Swiss Mountain Lodge",
    location: "Grindelwald, Switzerland",
    details: "4 nights, 2 adults from",
    ...makeRandomPrices(),
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop",
    badge: "Spa package included",
    title: "Santorini Luxury Villa",
    location: "Oia, Santorini",
    details: "5 nights, 2 adults from",
    ...makeRandomPrices(),
  }
];
</script>