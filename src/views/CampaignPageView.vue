<template>
    <div class="flex flex-col bg-[#F3F4F6] p-[16px] rounded-[8px]">
        <div class="bg-white flex justify-between items-between px-[24px] py-[16px] rounded-[8px] mb-5">
            <div class="flex items-center gap-1">
                <span><svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.0003 7.41408L20.0004 5.41418H6.41421V0L0 6.41418L6.41421 12.8284V7.41418L20.0003 7.41408Z"
                            fill="#4B5563" />
                    </svg></span>
                <span>Back to Repository</span>
            </div>
            <div class="flex gap-3">
                <span class="font-semibold">Mummu travel</span>
                <span>travel.mummutravel.com</span>
            </div>
        </div>
        <div class='flex'>
            <div class='bg-white max-w-[400px] flex flex-col gap-4'>
                <!-- Header -->
                <div class="flex flex-col items-center">
                    <div class="border-b w-full">AI Assistant</div>
                    <div class="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.89349 19.7058 0.89349 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM5.79993 16H7.95399L8.55399 14.5H11.4459L12.0459 16H14.1999L10.9999 8H8.99993L5.79993 16ZM9.99993 10.8852L10.6459 12.5H9.35399L9.99993 10.8852ZM15 16V8H17V16H15ZM3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V11H20V19H4V5H14V3H3Z"
                                fill="white" />
                        </svg>
                    </div>
                    <div class="text-center">Transform your Brand DNA into high-converting landing pages through an AI-powered dialogue and
                        based on our design system.</div>
                </div>
                <div class='flex flex-col gap-4'>
                    <ChatItem v-for="(item, index) in chatItems" :key="index" :text="item" />
                </div>
                <div>
                    <div>Suggestion</div>
                    <div class='bg-[#F3F4F6] gap-[8px] p-[8px]'>Create a Campaign landing page</div>
                    <div class='border border-color-[#E5E7EB] p-[12px] rounded-lg'>
                        <input class='' placeholder='Enter Prompt' />
                        <button class='bg-[#01B2C9] text-sm rounded-full px-4 py-2 text-white'>Generate</button>
                    </div>
                </div>
            </div>
            <div class='flex-1'>
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
