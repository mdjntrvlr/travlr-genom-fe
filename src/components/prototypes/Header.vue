<template>
  <header class="z-50 bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-8 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <div @click="handleLogoClicked" class="cursor-pointer">
            <Logo class="mr-8" />
          </div>

          <!-- Left Menu -->
          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Hotels</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Flights</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Activities</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Cars</a>
            <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Offers</a>
          </nav>
        </div>

        <!-- Right Menu -->
        <div class="flex items-center space-x-6">
          <!-- Get Extension -->
          <a href="#" class="text-gray-700 hover:text-blue-600 font-medium transition-colors hidden md:block">
            Get Extension
          </a>

          <!-- Currency Dropdown -->
          <div class="relative">
            <button class="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
              <span class="mr-1">USD</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>

          <!-- Shopping Cart -->
          <div class="relative">
            <button class="text-gray-700 hover:text-blue-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3"></path>
              </svg>
              <span
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          <!-- User Login -->
          <button class="text-gray-700 hover:text-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { navigateToPrototypeHome } from '../../utils/navigation';
import Logo from './pages/home/Logo.vue'

const handleLogoClicked = () => {
  navigateToPrototypeHome()
}
</script>