import { onBeforeUnmount, ref } from "vue";

import type { UploadItem } from "../types/brandIntelligence";

const allowedFiles = [".png", ".jpg", ".jpeg", ".svg", ".pdf"];
const maxFileSize = 20 * 1024 * 1024;

export const useUploadQueue = () => {
  const fileInput = ref<HTMLInputElement | null>(null);
  const uploadError = ref("");
  const uploads = ref<UploadItem[]>([]);
  const uploadTimers = new Map<number, number>();
  let nextUploadId = 1;

  const openFilePicker = () => {
    fileInput.value?.click();
  };

  const resetFileInput = () => {
    if (fileInput.value) {
      fileInput.value.value = "";
    }
  };

  const formatFileLabel = (fileName: string) => {
    const extension = fileName.toLowerCase().split(".").pop() ?? "";

    if (extension === "jpeg") {
      return "JPG";
    }

    return extension.toUpperCase();
  };

  const clearUploadTimer = (uploadId: number) => {
    const timerId = uploadTimers.get(uploadId);

    if (timerId) {
      window.clearInterval(timerId);
      uploadTimers.delete(uploadId);
    }
  };

  const startUploadProgress = (uploadId: number) => {
    const timerId = window.setInterval(() => {
      const upload = uploads.value.find((item) => item.id === uploadId);

      if (!upload) {
        clearUploadTimer(uploadId);
        return;
      }

      if (upload.progress >= 100) {
        upload.progress = 100;
        upload.status = "complete";
        clearUploadTimer(uploadId);
        return;
      }

      const increment = Math.min(
        upload.progress < 70 ? 12 : 7,
        100 - upload.progress,
      );
      upload.progress += increment;

      if (upload.progress >= 100) {
        upload.progress = 100;
        upload.status = "complete";
        clearUploadTimer(uploadId);
      }
    }, 320);

    uploadTimers.set(uploadId, timerId);
  };

  const removeUpload = (uploadId: number) => {
    clearUploadTimer(uploadId);
    uploads.value = uploads.value.filter((item) => item.id !== uploadId);
  };

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files ?? []);

    uploadError.value = "";

    if (!files.length) {
      return;
    }

    const errors: string[] = [];

    files.forEach((file) => {
      const fileName = file.name.toLowerCase();
      const isValidExtension = allowedFiles.some((extension) =>
        fileName.endsWith(extension),
      );

      if (!isValidExtension) {
        errors.push(`${file.name}: invalid file type.`);
        return;
      }

      if (file.size >= maxFileSize) {
        errors.push(`${file.name}: file must be smaller than 20MB.`);
        return;
      }

      const upload: UploadItem = {
        id: nextUploadId++,
        name: file.name,
        label: formatFileLabel(file.name),
        progress: 0,
        status: "uploading",
      };

      uploads.value.push(upload);
      startUploadProgress(upload.id);
    });

    if (errors.length) {
      uploadError.value = errors.join(" ");
    }

    resetFileInput();
  };

  onBeforeUnmount(() => {
    uploadTimers.forEach((timerId) => {
      window.clearInterval(timerId);
    });
    uploadTimers.clear();
  });

  return {
    allowedFiles,
    fileInput,
    uploadError,
    uploads,
    openFilePicker,
    removeUpload,
    handleFileChange,
  };
};
