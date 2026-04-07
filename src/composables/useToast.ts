import { onBeforeUnmount, ref } from "vue";

import type { ToastState } from "../types/brandIntelligence";

export const useToast = () => {
  const toast = ref<ToastState | null>(null);
  let toastTimer: number | null = null;

  const showToast = (message: string, tone: ToastState["tone"]) => {
    toast.value = { message, tone };

    if (toastTimer) {
      window.clearTimeout(toastTimer);
    }

    toastTimer = window.setTimeout(() => {
      toast.value = null;
      toastTimer = null;
    }, 2200);
  };

  onBeforeUnmount(() => {
    if (toastTimer) {
      window.clearTimeout(toastTimer);
    }
  });

  return {
    toast,
    showToast,
  };
};
