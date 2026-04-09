<template>
  <div class="space-y-6">
    <PropertyCard
      v-for="(property, index) in properties"
      :key="index"
      :property="property"
    />
  </div>
</template>

<script setup lang="ts">
import PropertyCard from './PropertyCard.vue'
import type { Property } from './PropertyCard.vue'

const properties: Property[] = [
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    title: "Luxury Beach Resort",
    badge: "Featured",
    badgeClass: "bg-primary hover:bg-primary/90 text-white",
    location: "Bali, Indonesia",
    stars: "★★★★★",
    rating: 4.8,
    reviewCount: 128,
    description: "Beautiful beachfront property with stunning ocean views and world-class amenities.",
    price: "$299"
  },
  {
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    title: "Mountain Chalet",
    badge: "Popular",
    badgeClass: "bg-gray-200 text-gray-700",
    location: "Swiss Alps, Switzerland",
    stars: "★★★★★",
    rating: 4.9,
    reviewCount: 94,
    description: "Cozy alpine chalet with panoramic mountain views and modern luxury amenities.",
    price: "$450"
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    title: "Santorini Villa",
    location: "Santorini, Greece",
    stars: "★★★★☆",
    rating: 4.7,
    reviewCount: 156,
    description: "Elegant white-washed villa with caldera views and private infinity pool.",
    price: "$380"
  }
];
</script>