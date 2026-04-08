<template>
  <div class="py-16 px-8 max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">
        Explore Top Destinations
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Everything you need to dream, plan and book your next getaway.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Destination Card 1 -->
      <div class="relative group cursor-pointer">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Mountains" class="w-full h-64 object-cover rounded-lg">
        <div class="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
          <h3 class="text-white text-2xl font-bold text-center">Swiss Alps</h3>
        </div>
      </div>

      <!-- Destination Card 2 -->
      <div class="relative group cursor-pointer">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" alt="Beach" class="w-full h-64 object-cover rounded-lg">
        <div class="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
          <h3 class="text-white text-2xl font-bold text-center">Bali Paradise</h3>
        </div>
      </div>

      <!-- Destination Card 3 -->
      <div class="relative group cursor-pointer">
        <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop" alt="City" class="w-full h-64 object-cover rounded-lg">
        <div class="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
          <h3 class="text-white text-2xl font-bold text-center">Tokyo Nights</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Explore Top Destinations component for WanderJoy Travel
</script>