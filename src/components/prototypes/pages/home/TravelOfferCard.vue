<template>
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img :src="offer.image" :alt="offer.title" class="w-full h-48 object-cover">
        <div class="p-4">
            <div class="bg-[#F2F2F2] text-[#374044] text-xs font-medium px-2 py-1 rounded mb-2 inline-block">
                {{ offer.badge }}
            </div>
            <h3 class="font-bold text-[20px] mb-2">{{ offer.title }}</h3>
            <p class="mt-6 mb-2">{{ offer.location }}</p>
            <p class="text-[#374044] text-[14px] mb-1">{{ offer.details }} from</p>
            <div class="flex items-center gap-2 mb-[2px]">
                <span class="text-[18px] text-[#111827] font-bold">{{ offer.price }}</span>
                <span class="text-[#6B7280] text-[14px] text-strike">{{ offer.offerPrice }}</span>
            </div>
            <div class="flex items-center gap-1 mb-4 text-primary mb-[2px]">
                <span class="font-bold text-[18px]">{{ offer.priceWithVIP }}</span>
                <span class="text-[14px]">with</span>
                <span class="text-[20px] font-bold">VIP</span>
            </div>
            <div class="flex items-center gap-2 text-[12px] text-[#374151]">
                <svg class="text-primary" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/>
                </svg>
                <span>Earn <span class="font-bold">1,800</span> points</span>
            </div>
            <div class="flex gap-3 mt-4">
                <button
                    class="flex-1 text-accent border cursor-pointer py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                    Enquire
                </button>
                <button
                    class="cursor-pointer flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-full hover:bg-[#d1007a] transition-colors">
                    Book
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
export interface TravelOffer {
    image: string;
    badge: string;
    title: string;
    location: string;
    details: string;
    price: string;
    offerPrice: string;
    priceWithVIP: string;
}

const props = defineProps<{
    offer: TravelOffer
}>()
</script>