<template>
    <div class="min-h-screen bg-gray-50">
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900">Prototype Builder Repository</h1>
                <p class="mt-2 text-gray-600">
                    Manage and organize your prototype building templates and components.
                </p>
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent">
                    </div>
                    <p class="mt-4 text-sm text-gray-600">Loading repository...</p>
                </div>
            </div>

            <!-- Repository items -->
            <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="item in repositoryItems" :key="item.id" 
                    class="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                    @click="navigateToPrototypeBuilder(item.clientId)"
                >
                    <div class="aspect-video">
                        <img :src="item.image" :alt="item.title" class="h-full w-full object-cover" />
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-medium text-gray-900">{{ item.title }}</h3>
                        <p class="mt-2 text-sm text-gray-600">{{ item.url }}</p>
                        <div class="mt-4 flex items-center justify-between">
                            <span class="text-xs text-gray-400">ID: {{ item.id }}</span>
                            <button
                                class="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/90">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-if="!loading && repositoryItems.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 003.586 13H4" />
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900">No repository items</h3>
                <p class="mt-2 text-sm text-gray-500">Get started by creating your first prototype template.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface RepositoryItem {
  id: string
  slug: string
  title: string
  image: string
  url: string
  clientId: string
}

const repositoryItems = ref<RepositoryItem[]>([])
const loading = ref(true)
const router = useRouter()

// Click handler to navigate to client's prototype builder
const navigateToPrototypeBuilder = (clientId: string) => {
  router.push(`/p/${clientId}/prototype-builder/home`)
}

// Dummy data - replace with API call
const dummyData: RepositoryItem[] = [
  {
    id: '1',
    slug: 'hotel-booking-template',
    title: 'Hotel Booking Template',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=200&fit=crop',
    url: '/templates/hotel-booking',
    clientId: 'client1'
  },
  {
    id: '2',
    slug: 'flight-search-component',
    title: 'Flight Search Component',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=200&fit=crop',
    url: '/templates/flight-search',
    clientId: 'client2'
  },
  {
    id: '3',
    slug: 'activity-explorer',
    title: 'Activity Explorer',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
    url: '/templates/activity-explorer',
    clientId: 'client1'
  },
  {
    id: '4',
    slug: 'car-rental-form',
    title: 'Car Rental Form',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop',
    url: '/templates/car-rental',
    clientId: 'client3'
  },
  {
    id: '5',
    slug: 'travel-offers-display',
    title: 'Travel Offers Display',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop',
    url: '/templates/travel-offers',
    clientId: 'client2'
  },
  {
    id: '6',
    slug: 'user-profile-widget',
    title: 'User Profile Widget',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop',
    url: '/templates/user-profile',
    clientId: 'client1'
  }
]

// Simulate API call
const fetchRepositoryItems = async () => {
    loading.value = true
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // TODO: Replace with actual API call
        // const response = await fetch('/api/repository/items')
        // const data = await response.json()
        // repositoryItems.value = data

        repositoryItems.value = dummyData
    } catch (error) {
        console.error('Failed to fetch repository items:', error)
        repositoryItems.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchRepositoryItems()
})
</script>