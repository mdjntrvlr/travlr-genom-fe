<template>
  <div class="h-[100vh] p-3 bg-[#F3F4F6]">
    <div class="flex flex-col rounded-[8px] h-full gap-3">
      <div class="bg-white flex justify-between items-between px-[24px] py-[16px] rounded-[8px]">
        <RouterLink to="/prototype-builder-repository"
          class="flex items-center gap-1 cursor-pointer hover:opacity-70 transition">
          <span><svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.0003 7.41408L20.0004 5.41418H6.41421V0L0 6.41418L6.41421 12.8284V7.41418L20.0003 7.41408Z"
                fill="#4B5563" />
            </svg></span>
          <span>Back to Repository</span>
        </RouterLink>

        <div class="flex gap-3">
          <span class="font-semibold">{{ activeBrand?.name || 'Brand name' }}</span>
          <span>{{ activeBrand?.url || 'brand.url' }}</span>
        </div>
      </div>
      <div class='flex gap-3 flex-1 overflow-hidden'>
        <div class='bg-white max-w-[400px] flex flex-col gap-5 border border-[#E5E7EB] rounded-[10px]'>
          <!-- Header -->
          <div class="flex flex-col items-center px-5">
            <div class="w-full text-center text-[#6B7280] text-[12px] leading-[40px]">AI Assistant</div>
            <div class="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center mt-4 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.4668 8.69379L20.7134 8.12811C21.1529 7.11947 21.9445 6.31641 22.9323 5.87708L23.6919 5.53922C24.1027 5.35653 24.1027 4.75881 23.6919 4.57612L22.9748 4.25714C21.9616 3.80651 21.1558 2.97373 20.7238 1.93083L20.4706 1.31953C20.2942 0.89349 19.7058 0.89349 19.5293 1.31953L19.2761 1.93083C18.8442 2.97373 18.0384 3.80651 17.0252 4.25714L16.308 4.57612C15.8973 4.75881 15.8973 5.35653 16.308 5.53922L17.0677 5.87708C18.0555 6.31641 18.8471 7.11947 19.2866 8.12811L19.5331 8.69379C19.7136 9.10792 20.2864 9.10792 20.4668 8.69379ZM5.79993 16H7.95399L8.55399 14.5H11.4459L12.0459 16H14.1999L10.9999 8H8.99993L5.79993 16ZM9.99993 10.8852L10.6459 12.5H9.35399L9.99993 10.8852ZM15 16V8H17V16H15ZM3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V11H20V19H4V5H14V3H3Z"
                  fill="white" />
              </svg>
            </div>
            <div class="text-center text-[14px] color-[#374151]">Transform your Brand DNA into
              high-converting
              landing pages through an
              AI-powered dialogue and
              based on our design system.</div>
          </div>
          <div class='flex flex-col gap-4 px-5 overflow-y-auto flex-1'>
            <ChatItem v-for="(item, index) in chatItems" :key="index" :text="item" />
          </div>
          <!-- footer -->
          <div class="px-5 pb-4">
            <div class="text-[12px] text-[#6B7280] mb-1">Suggestion</div>
            <div class='bg-[#F3F4F6] gap-[8px] p-[8px] text-[14px] mb-2 rounded-full inline-block px-4'>
              Create a
              Campaign landing page</div>
            <div class='border border-[#E5E7EB] p-[12px] rounded-[12px] flex items-center gap-2'>
              <textarea v-model="promptText" @keyup.enter.exact.prevent="handleGenerate" @input="autoResize"
                ref="textareaRef" rows="1" class='flex-1 px-2 outline-none resize-none overflow-y-auto leading-5'
                style="max-height: calc(3 * 1.25rem + 0px)" placeholder='Enter Prompt' />
              <button :disabled="isGenerating" @click="handleGenerate"
                class='bg-[#01B2C9] text-sm rounded-full px-4 py-2 text-white disabled:opacity-60 disabled:cursor-not-allowed'>
                {{ isGenerating ? 'Generating...' : 'Generate' }}
              </button>
            </div>
          </div>
        </div>
        <div class='flex-1 b-full flex flex-col border border-[#E5E7EB] bg-white rounded-[10px]'>
          <div class="flex items-center justify-between h-[68px] px-5 border-b border-[#E5E7EB]">
            <div class="text-lg font-semibold">Preview your Prototype page</div>
            <div ref="exportDropdownRef" class="relative inline-block text-left">
              <button @click="isExportDropdownOpen = !isExportDropdownOpen"
                class="inline-flex gap-2 items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                Export <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.30326 4.12477L9.42809 0L10.6066 1.17851L5.30326 6.48185L0 1.17851L1.17851 0L5.30326 4.12477Z"
                    fill="#4B5563" />
                </svg>
              </button>
              <div v-if="isExportDropdownOpen"
                class="absolute right-0 z-10 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-lg">
                <RouterLink :to="prototypeHomeUrl" target="_blank"
                  class="inline-flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
                  <span>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.33333 16.6667C3.73096 16.6667 0 12.9357 0 8.33333C0 3.73096 3.73096 0 8.33333 0C12.9357 0 16.6667 3.73096 16.6667 8.33333C16.6667 12.9357 12.9357 16.6667 8.33333 16.6667ZM6.42502 14.7228C5.62286 13.0216 5.1311 11.1452 5.02276 9.16667H1.71824C2.04833 11.8137 3.93033 13.9789 6.42502 14.7228ZM6.69225 9.16667C6.81758 11.199 7.39817 13.1081 8.33333 14.7933C9.2685 13.1081 9.84908 11.199 9.97442 9.16667H6.69225ZM14.9484 9.16667H11.6439C11.5356 11.1452 11.0438 13.0216 10.2417 14.7228C12.7363 13.9789 14.6183 11.8137 14.9484 9.16667ZM1.71824 7.5H5.02276C5.1311 5.52147 5.62286 3.64506 6.42502 1.9438C3.93033 2.68777 2.04833 4.85292 1.71824 7.5ZM6.69225 7.5H9.97442C9.84908 5.46768 9.2685 3.55854 8.33333 1.87333C7.39817 3.55854 6.81758 5.46768 6.69225 7.5ZM10.2417 1.9438C11.0438 3.64506 11.5356 5.52147 11.6439 7.5H14.9484C14.6183 4.85292 12.7363 2.68777 10.2417 1.9438Z"
                        fill="#4B5563" />
                    </svg>
                  </span><span>See full prototype</span>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="overflow-y-auto flex-1">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, inject, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import ChatItem from '../components/ChatItem.vue';
import { type Brand, updateBrandPrototype } from '../services/brand.service';
import { projectBrandContextKey } from '../utils/projectBrandContext';
import { setThemeColors } from '../utils/theme';

const route = useRoute();
const projectBrandContext = inject(projectBrandContextKey, null);
const isExportDropdownOpen = ref(false);
const exportDropdownRef = ref<HTMLElement | null>(null);
const promptText = ref('');
const isGenerating = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const autoResize = () => {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = 'auto';
  const lineHeight = 20;
  const maxHeight = lineHeight * 3;
  el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
};

const activeBrand = computed(() => projectBrandContext?.brand.value ?? null);

// Computed property for the prototype home URL
const prototypeHomeUrl = computed(() => {
  const projectId = route.params.projectId as string;
  return `/p/${projectId}/prototype/home`;
});

const handleClickOutside = (event: MouseEvent) => {
  if (exportDropdownRef.value && !exportDropdownRef.value.contains(event.target as Node)) {
    isExportDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const chatItems = ref<string[]>([]);

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const extractBrandFromUpdateResponse = (response: unknown): Partial<Brand> | null => {
  if (!isRecord(response)) {
    return null;
  }

  if (isRecord(response.brand)) {
    return response.brand as Partial<Brand>;
  }

  if (isRecord(response.data) && isRecord(response.data.brand)) {
    return response.data.brand as Partial<Brand>;
  }

  if ('id' in response || 'slug' in response || 'name' in response || 'raw_data' in response) {
    return response as Partial<Brand>;
  }

  return null;
};

const handleGenerate = async () => {
  const text = promptText.value.trim();
  if (!text || isGenerating.value) {
    return;
  }

  try {
    isGenerating.value = true;
    const projectId = route.params.projectId as string;
    const response = await updateBrandPrototype<unknown>(projectId, { brief: text });

    if (projectBrandContext) {
      const nextBrandPatch = extractBrandFromUpdateResponse(response);

      if (nextBrandPatch) {
        projectBrandContext.patchBrand(nextBrandPatch);
      } else {
        await projectBrandContext.refreshBrand();
      }

      const themeSource = nextBrandPatch ?? projectBrandContext.brand.value;
      const colorPalette = themeSource?.raw_data?.color_palette;

      if (colorPalette) {
        setThemeColors({
          primary: colorPalette.primary,
          secondary: colorPalette.secondary,
          accent: colorPalette.tertiary,
        });
      }
    }

    chatItems.value.push(text);
    promptText.value = '';
    await nextTick();
    if (textareaRef.value) textareaRef.value.style.height = 'auto';
  } catch (error) {
    console.error('Failed to update prototype:', error);
  } finally {
    isGenerating.value = false;
  }
};
</script>
