<template>
    <div className='flex'>
        <div className='max-w-[400px] flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
                <ChatItem v-for="(item, index) in chatItems" :key="index" :text="item" />
            </div>
            <div>
                <div>Suggestion</div>
                <div className='bg-[#F3F4F6] gap-[8px] p-[8px]'>Create a Campaign landing page</div>
                <div className='border border-color-[#E5E7EB] p-[12px] rounded-lg'>
                    <input className='' placeholder='Enter Prompt' />
                    <button className='bg-[#01B2C9] text-sm rounded-full px-4 py-2 text-white'>Generate</button>
                </div>
            </div>
        </div>
        <div className='flex-1'>
            <div>Preview</div>
            <div>
                <HeaderWlp />
                <section>
                    <h1 class="text-[26px] font-semibold tracking-tight text-slate-900">
                        Campaign Page
                    </h1>
                    <p class="mt-2 text-[18px] text-slate-600">
                        Draft campaign-ready outputs and map brand inputs into launch materials.
                    </p>
                </section>
                <FooterWlp />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderWlp from "../components/HeaderWlp.vue";
import FooterWlp from "../components/FooterWlp.vue";
import ChatItem from "../components/ChatItem.vue";

const chatItems = [
    "Let’s create something together! Describe your desired subject or use case to get started!",
    "Use AI to draft your campaign copy, visuals, or messaging in seconds.",
    "Try a different angle: brand storytelling, audience tone, or promotional hooks.",
    "Ready to generate? Enter your prompt and watch the campaign content come alive.",
];
</script>
