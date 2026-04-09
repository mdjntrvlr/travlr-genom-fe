<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex">
        <img :src="property.image" :alt="property.title" class="w-64 h-64 object-cover flex-shrink-0">
        <div class="p-6 flex-1">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold text-gray-900">{{ property.title }}</h3>
                <span v-if="property.badge" :class="property.badgeClass"
                    class="px-3 py-1 rounded-full text-sm font-medium ml-2">
                    {{ property.badge }}
                </span>
            </div>
            <p class="text-gray-600 mb-2">{{ property.location }}</p>
            <div class="flex items-center gap-2 mb-4">
                <div class="flex text-yellow-400">{{ property.stars }}</div>
                <span class="text-gray-600 text-sm">({{ property.rating }}) {{ property.reviewCount }} reviews</span>
            </div>
            <p class="text-gray-700 mb-4">{{ property.description }}</p>
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-gray-600 text-sm">From</p>
                    <p class="text-2xl font-bold text-gray-900">{{ property.price }}/night</p>
                </div>

                <button @click="handleDetailClick"
                    class="prototype-click-target bg-[#EC008C] text-white px-6 py-2 rounded-full hover:bg-[#d1007a] transition-colors">
                    View Details
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { navigateToPrototypeDetail } from '../../../../utils/navigation';

export interface Property {
    image: string;
    title: string;
    badge?: string;
    badgeClass?: string;
    location: string;
    stars: string;
    rating: number;
    reviewCount: number;
    description: string;
    price: string;
}

const props = defineProps<{
    property: Property
}>()

const handleDetailClick = () => {
    navigateToPrototypeDetail();
}
</script>