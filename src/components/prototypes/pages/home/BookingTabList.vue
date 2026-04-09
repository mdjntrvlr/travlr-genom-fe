<template>
    <div class="overflow-x-auto">
        <nav class="flex gap-3 whitespace-nowrap px-1" aria-label="Booking tabs">
            <button v-for="tab in tabs" :key="tab.title" type="button" @click="$emit('update:activeTab', tab.title)"
                :class="[
                    'flex min-w-[220px] items-center justify-between rounded-3xl border px-4 py-3 text-left transition duration-200',
                    activeTab === tab.title
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                ]">
                <div class="font-semibold text-sm md:text-base">
                    {{ tab.title }}
                </div>
            </button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
    tabs: {
        type: Array as PropType<Array<{ title: string }>>,
        required: true,
    },
    activeTab: {
        type: String,
        required: true,
    },
})

const emit = defineEmits<{
    (e: 'update:activeTab', value: string): void
}>()
</script>
