<template>
    <div @click="handleClick" class="prototype-click-target bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <img :src="card.image" :alt="card.title" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="font-bold text-[20px] mb-2">{{ card.title }}</h3>
            <div class="text-gray-600 text-sm mb-2">Chiang Mai, Thailand</div>
            <div class="flex items-center mb-2">
                <div class="flex text-yellow-400">
                    {{ card.stars }}
                </div>
                <span class="text-gray-600 ml-2">({{ card.rating }})</span>
            </div>
            <p class="text-[14px] text-[#374044] mb-1">From</p>
            <p class="text-[18px] text-[#111827] font-bold mb-[2px]">{{ card.price }}/night</p>
            <div class="flex items-center gap-1">
                <span><svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.24264 6.12825L10.3709 0L11.3137 0.942807L4.24264 8.01385L0 3.77125L0.942813 2.82845L4.24264 6.12825Z"
                            fill="#10B981" />
                    </svg>
                </span>
                <span class="text-[12px] text-[#6B7280]">Taxes and fees included</span>
            </div>
            <div class="flex items-center gap-2 text-[12px] text-[#374151]">
                <svg class="text-primary" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/>
                </svg>
                <span>Earn <span class="font-bold">1,800</span> points</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
export interface StayCard {
    image: string;
    title: string;
    stars: string;
    rating: number;
    price: string;
}

const props = defineProps<{
    card: StayCard
}>()

const emit = defineEmits<{
    cardClick: []
}>()

const handleClick = () => {
    emit('cardClick');
}
</script>