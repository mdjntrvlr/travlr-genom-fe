<template>
  <div class="py-16 px-8 max-w-7xl mx-auto">
    <div class="flex justify-between">
      <div class="text-left mb-12">
        <h2 class="text-[24px] font-bold text-[#111827] mb-4">
          Find Your Happy Place, Anywhere.
        </h2>
        <p class="text-[16px] text-[#374151] max-w-2xl">
          Explore handpicked stays around the world with exclusive WanderJoy Travel rates and instant points.
        </p>
      </div>
      <button
        class="mt-2 cursor-pointer rounded-full px-[16px] text-[#111827] border text-[14px] font-bold line-height-[32px] h-[32px]">See
        More</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StayCard v-for="(card, index) in stayCards" :key="index" :card="card" @card-click="handleCardClick(card)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StayCard from './StayCard.vue'
import type { StayCard as StayCardType } from './StayCard.vue'

// Stay cards component for WanderJoy Travel destinations

const stayCards: StayCardType[] = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
    title: "Bali Paradise Resort",
    stars: "★★★★★",
    rating: 4.8,
    price: "$299"
  },
  {
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    title: "Swiss Alps Chalet",
    stars: "★★★★★",
    rating: 4.9,
    price: "$450"
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop",
    title: "Santorini Villa",
    stars: "★★★★☆",
    rating: 4.7,
    price: "$380"
  },
  {
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=250&fit=crop",
    title: "Tokyo Luxury Hotel",
    stars: "★★★★☆",
    rating: 4.6,
    price: "$520"
  }
];

const emit = defineEmits<{
  anyCardClick: []
}>()

const handleCardClick = () => {
  emit('anyCardClick');
}
</script>