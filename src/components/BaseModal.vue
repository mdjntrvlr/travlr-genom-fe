<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    maxWidthClass?: string;
    panelClass?: string;
    contentClass?: string;
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
  }>(),
  {
    title: "",
    maxWidthClass: "max-w-3xl",
    panelClass: "",
    contentClass: "",
    closeOnBackdrop: true,
    showCloseButton: true,
  },
);

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit("close");
  }
};
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[55] flex items-center justify-center bg-slate-900/45 px-6 backdrop-blur-[1px]"
    @click="handleBackdropClick"
  >
    <div
      :class="[
        'relative w-full rounded-[1.6rem] bg-white shadow-2xl',
        maxWidthClass,
        panelClass,
      ]"
      @click.stop
    >
      <button
        v-if="showCloseButton"
        type="button"
        class="absolute right-6 top-6 text-slate-400 transition hover:text-slate-600"
        @click="$emit('close')"
        aria-label="Close modal"
      >
        <i class="ri-close-line text-[28px]" aria-hidden="true"></i>
      </button>

      <div :class="['px-8 py-7', contentClass]">
        <h3 v-if="title" class="text-[22px] font-semibold tracking-tight text-slate-900">
          {{ title }}
        </h3>

        <slot />

        <div v-if="$slots.footer" class="mt-8">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
