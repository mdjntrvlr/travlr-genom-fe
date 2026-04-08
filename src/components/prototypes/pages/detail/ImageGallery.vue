<template>
  <div class="flex gap-4">
    <!-- Left: Large Image -->
    <div class="flex-shrink-0 w-1/2">
      <img 
        :src="mainImage" 
        alt="Main property image" 
        class="w-full h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
        @click="selectMainImage(mainImage)"
      >
    </div>

    <!-- Right: Grid of 4 Images -->
    <div class="flex-1">
      <div class="grid grid-cols-2 gap-4">
        <div 
          v-for="(image, index) in thumbnailImages" 
          :key="index"
          class="cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
          @click="selectMainImage(image)"
        >
          <img 
            :src="image" 
            :alt="`Property image ${index + 1}`" 
            class="w-full h-40 object-cover"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mainImage = ref("https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop")

const thumbnailImages = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
]

const selectMainImage = (image: string) => {
  mainImage.value = image
}
</script>