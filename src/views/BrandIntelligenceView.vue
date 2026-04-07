<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

type StepItem = {
  number: number;
  label: string;
  active?: boolean;
};

type UploadItem = {
  id: number;
  name: string;
  label: string;
  progress: number;
  status: "uploading" | "complete";
};

type ReviewState = {
  brandName: string;
  domain: string;
  colors: string[];
  coreValues: string[];
};

type ToastState = {
  message: string;
  tone: "success" | "error";
};

const allowedFiles = [".png", ".jpg", ".jpeg", ".svg", ".pdf"];
const maxFileSize = 20 * 1024 * 1024;

const fileInput = ref<HTMLInputElement | null>(null);
const currentStep = ref(1);
const websiteUrl = ref("");
const websiteUrlError = ref("");
const submitError = ref("");
const isSubmitting = ref(false);
const uploadError = ref("");
const uploads = ref<UploadItem[]>([]);
const toast = ref<ToastState | null>(null);
const reviewState = ref<ReviewState>({
  brandName: "The Bali Bible",
  domain: "thebalibible.com",
  colors: ["#2DCCD3", "#FFFFFF", "#111827", "#1F2937"],
  coreValues: [
    "Authenticity",
    "Local Knowledge",
    "Trust",
    "Editorial",
    "Curation",
    "Insider",
  ],
});
const uploadTimers = new Map<number, number>();
let toastTimer: number | null = null;
let nextUploadId = 1;

const steps: StepItem[] = [
  { number: 1, label: "Brand Extraction" },
  { number: 2, label: "Brand Review" },
  { number: 3, label: "Applications" },
];

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

const normalizeWebsiteUrl = (rawValue: string) => {
  const trimmedValue = rawValue.trim();

  if (!trimmedValue) {
    return {
      isValid: false,
      value: "",
      message: "Website URL is required.",
    };
  }

  const normalizedValue = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    const parsedUrl = new URL(normalizedValue);
    const hasValidProtocol =
      parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    const hasValidHostname =
      parsedUrl.hostname.includes(".") && !parsedUrl.hostname.startsWith(".");

    if (!hasValidProtocol || !hasValidHostname) {
      return {
        isValid: false,
        value: "",
        message:
          "Enter a valid website URL, for example `https://mastercard.com`.",
      };
    }

    return {
      isValid: true,
      value: parsedUrl.toString(),
      message: "",
    };
  } catch {
    return {
      isValid: false,
      value: "",
      message:
        "Enter a valid website URL, for example `https://mastercard.com`.",
    };
  }
};

const validateWebsiteUrl = () => {
  const result = normalizeWebsiteUrl(websiteUrl.value);
  websiteUrlError.value = result.message;

  if (result.isValid) {
    websiteUrl.value = result.value;
  }

  return result;
};

const handleWebsiteInput = () => {
  websiteUrlError.value = "";
  submitError.value = "";
};

const toTitleCase = (value: string) => {
  return value
    .split(/[-.\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const buildReviewState = (normalizedUrl: string) => {
  const parsedUrl = new URL(normalizedUrl);
  const hostname = parsedUrl.hostname.replace(/^www\./i, "");
  const rootName = hostname.split(".")[0] ?? hostname;

  reviewState.value = {
    brandName: toTitleCase(rootName),
    domain: hostname,
    colors: ["#2DCCD3", "#FFFFFF", "#111827", "#1F2937"],
    coreValues: [
      "Authenticity",
      "Local Knowledge",
      "Trust",
      "Editorial",
      "Curation",
      "Insider",
    ],
  };
};

const removeColor = (color: string) => {
  reviewState.value.colors = reviewState.value.colors.filter(
    (item) => item !== color,
  );
};

const removeCoreValue = (value: string) => {
  reviewState.value.coreValues = reviewState.value.coreValues.filter(
    (item) => item !== value,
  );
};

const copyColor = async (color: string) => {
  try {
    await navigator.clipboard.writeText(color.toLowerCase());
    showToast(`Copied ${color.toLowerCase()} to clipboard`, "success");
  } catch {
    console.log("Unable to copy color to clipboard:", color);
    showToast("Unable to copy color", "error");
  }
};

const submitBrandExtraction = async () => {
  submitError.value = "";

  const validationResult = validateWebsiteUrl();

  if (!validationResult.isValid) {
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        websiteUrl: validationResult.value,
        uploadedFiles: uploads.value.map((upload) => ({
          name: upload.name,
          status: upload.status,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to submit brand extraction request.");
    }

    const data = await response.json();
    console.log("Extract Brand response:", data);
    buildReviewState(validationResult.value);
    currentStep.value = 2;
  } catch (error) {
    submitError.value =
      error instanceof Error
        ? error.message
        : "Something went wrong while submitting the brand extraction request.";
  } finally {
    isSubmitting.value = false;
  }
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

  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }
});
</script>

<template>
  <div class="relative">
    <div
      v-if="toast"
      :class="[
        'fixed right-6 top-6 z-[60] rounded-xl px-4 py-3 text-[13px] font-medium shadow-lg',
        toast.tone === 'success'
          ? 'bg-slate-900 text-white'
          : 'bg-rose-500 text-white',
      ]"
    >
      {{ toast.message }}
    </div>

    <section>
      <h1 class="text-[26px] font-semibold tracking-tight text-slate-900">
        Brand Intelligence
      </h1>
      <p class="mt-2 text-[18px] text-slate-600">
        Extract, analyze, and aggregate brand data in one place.
      </p>
    </section>

    <section class="mt-7 flex flex-wrap items-center gap-4">
      <template v-for="(step, index) in steps" :key="step.label">
        <div class="flex items-center gap-3">
          <span
            :class="[
              'flex h-[36px] w-[36px] items-center justify-center rounded-full text-[16px] font-semibold',
              currentStep > step.number
                ? 'bg-cyan-500 text-white'
                : currentStep === step.number
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-400 text-white',
            ]"
          >
            <svg
              v-if="currentStep > step.number"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              aria-hidden="true"
            >
              <path
                d="m4.5 10 3.5 3.5 7-7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span v-else>{{ step.number }}</span>
          </span>
          <span
            :class="[
              'text-[18px]',
              currentStep >= step.number
                ? 'font-medium text-slate-900'
                : 'font-normal text-slate-500',
            ]"
          >
            {{ step.label }}
          </span>
        </div>

        <div
          v-if="index < steps.length - 1"
          :class="[
            'hidden h-1 w-[110px] rounded-full xl:block',
            currentStep > index + 1 ? 'bg-cyan-500' : 'bg-slate-300',
          ]"
        ></div>
      </template>
    </section>

    <section
      v-if="currentStep === 1"
      class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6"
    >
      <h2 class="text-[22px] font-semibold tracking-tight text-slate-900">
        Extract Brand DNA
      </h2>
      <p class="mt-2 max-w-[770px] text-[16px] leading-7 text-slate-600">
        Provide a URL or upload a file to automatically identify potential WLP
        brand's voice and style.
      </p>

      <div class="mt-6">
        <label class="block text-[16px] font-medium text-slate-900">
          Website URL
          <span class="font-normal text-slate-500">(Primary Source)</span>
        </label>

        <div
          :class="[
            'mt-2 flex h-[56px] max-w-[670px] items-center gap-3 rounded-xl bg-white px-5 shadow-sm',
            websiteUrlError
              ? 'border border-rose-400'
              : 'border border-slate-300',
          ]"
        >
          <svg
            class="h-5 w-5 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            aria-hidden="true"
          >
            <path
              d="M10 13.5 8.5 15a4 4 0 0 1-5.5-5.8l3-3a4 4 0 0 1 5.7 0M14 10.5 15.5 9a4 4 0 0 1 5.5 5.8l-3 3a4 4 0 0 1-5.7 0M9 15l6-6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input
            type="text"
            v-model="websiteUrl"
            placeholder="Enter primary brand website e.g mastercard.com"
            class="w-full border-0 bg-transparent p-0 text-[16px] text-slate-700 outline-none placeholder:text-slate-400"
            @input="handleWebsiteInput"
            @blur="validateWebsiteUrl"
          />
        </div>

        <p
          v-if="websiteUrlError"
          class="mt-2 max-w-[820px] text-[12px] font-medium text-rose-600"
        >
          {{ websiteUrlError }}
        </p>
        <p class="mt-2 max-w-[820px] text-[12px] leading-5 text-slate-500">
          We'll use this to understand the core identity and voice of the brand
          before they expand into travel.
        </p>
      </div>

      <div class="mt-5">
        <p class="text-[16px] text-slate-700">
          Or upload brand guideline or support files.
        </p>

        <input
          ref="fileInput"
          type="file"
          accept=".png,.jpg,.jpeg,.svg,.pdf"
          multiple
          class="hidden"
          @change="handleFileChange"
        />

        <div
          v-if="uploads.length"
          class="mt-3 w-full max-w-[50%] min-w-[340px] space-y-2"
        >
          <div
            v-for="upload in uploads"
            :key="upload.id"
            class="relative overflow-hidden rounded-lg border border-slate-300 bg-white"
          >
            <div
              v-if="upload.status === 'uploading'"
              class="absolute inset-y-0 left-0 bg-cyan-50 transition-all duration-300"
              :style="{ width: `${upload.progress}%` }"
            ></div>

            <div class="relative flex items-center gap-2.5 px-2.5 py-2">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-semibold text-slate-900"
              >
                {{ upload.label }}
              </div>

              <p
                class="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-700"
              >
                {{ upload.name }}
              </p>

              <p
                v-if="upload.status === 'uploading'"
                class="shrink-0 text-[12px] font-semibold text-slate-700"
              >
                {{ upload.progress }}%
              </p>

              <button
                type="button"
                class="shrink-0 text-rose-500 transition hover:text-rose-600"
                @click="removeUpload(upload.id)"
                aria-label="Remove upload"
              >
                <svg
                  class="h-4.5 w-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path
                    d="M4 7h16M9 7V5h6v2m-7 4v6m4-6v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="openFilePicker"
          class="mt-3 inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-[15px] font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <svg
            class="h-5 w-5 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            aria-hidden="true"
          >
            <path
              d="M12 16V7m0 0-3.5 3.5M12 7l3.5 3.5M6.5 16.5A4.5 4.5 0 0 1 7 7.5h.5A5.5 5.5 0 0 1 18 9a4 4 0 1 1-.5 7.97H16"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Upload Document
        </button>

        <p
          v-if="uploadError"
          class="mt-3 text-[12px] font-medium text-rose-600"
        >
          {{ uploadError }}
        </p>
        <p class="mt-3 text-[12px] text-slate-500">
          Supports {{ allowedFiles.join(", ") }} only. File size &lt; 20MB.
        </p>
      </div>

      <div class="mt-5 h-px max-w-[670px] bg-slate-300"></div>

      <button
        type="button"
        @click="submitBrandExtraction"
        :disabled="isSubmitting"
        class="mt-5 inline-flex items-center rounded-full bg-cyan-500 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-cyan-600 cursor-pointer disabled:cursor-not-allowed disabled:bg-cyan-400"
        :class="isSubmitting ? 'cursor-not-allowed opacity-70' : ''"
      >
        Extract Brand
      </button>

      <p v-if="submitError" class="mt-3 text-[12px] font-medium text-rose-600">
        {{ submitError }}
      </p>
    </section>

    <section
      v-else
      class="mt-8 max-w-[1115px] rounded-2xl bg-slate-100 px-6 py-6"
    >
      <h2 class="text-[22px] font-semibold tracking-tight text-slate-900">
        Brand Identity Blueprint
      </h2>
      <p class="mt-2 max-w-[780px] text-[16px] leading-7 text-slate-600">
        We&apos;ve decoded your brand core identity. Review and refine these
        attributes to ensure the AI generates copy that perfectly aligns with
        your brand.
      </p>

      <div class="mt-5 rounded-2xl bg-white p-6">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-[16px] font-semibold text-slate-900">Brand name</h3>
            <span
              class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 text-[11px] font-semibold text-white"
            >
              i
            </span>
          </div>

          <div class="mt-3 flex items-center gap-4">
            <div class="h-20 w-20 rounded-xl bg-slate-800"></div>
            <div>
              <p
                class="text-[28px] font-semibold tracking-tight text-slate-900"
              >
                {{ reviewState.brandName }}
              </p>
              <p class="text-[16px] text-slate-600">{{ reviewState.domain }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <h3 class="text-[16px] font-semibold text-slate-900">Colours</h3>
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 text-[11px] font-semibold text-white"
              >
                i
              </span>
            </div>
            <button
              type="button"
              class="text-[14px] font-medium text-slate-500"
            >
              Add item
            </button>
          </div>

          <div class="mt-3 rounded-2xl bg-slate-100 p-4">
            <div class="flex flex-wrap gap-3">
              <div
                v-for="color in reviewState.colors"
                :key="color"
                class="flex items-center gap-3 rounded-full bg-white px-3 py-2"
              >
                <span
                  class="h-10 w-10 rounded-full border border-slate-200"
                  :style="{ backgroundColor: color }"
                ></span>
                <span class="text-[14px] font-medium text-slate-800">{{
                  color.toLowerCase()
                }}</span>
                <button
                  type="button"
                  class="cursor-pointer text-slate-500 transition hover:text-slate-700"
                  @click="copyColor(color)"
                  aria-label="Copy color"
                >
                  <i class="ri-file-copy-line cursor-pointer text-[18px]" aria-hidden="true"></i>
                </button>
                <span class="h-4 w-px bg-slate-200"></span>
                <button
                  type="button"
                  class="text-slate-500 transition hover:text-slate-700"
                  @click="removeColor(color)"
                  aria-label="Remove color"
                >
                  <svg
                    class="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <h3 class="text-[16px] font-semibold text-slate-900">
                Core value
              </h3>
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-600 text-[11px] font-semibold text-white"
              >
                i
              </span>
            </div>
            <button
              type="button"
              class="text-[14px] font-medium text-slate-500"
            >
              Add item
            </button>
          </div>

          <div class="mt-3 rounded-2xl bg-slate-100 p-4">
            <div class="flex flex-wrap gap-3">
              <div
                v-for="value in reviewState.coreValues"
                :key="value"
                class="flex items-center gap-2 rounded-full bg-white px-3 py-2"
              >
                <span class="text-[14px] font-medium text-slate-800">{{
                  value
                }}</span>
                <button
                  type="button"
                  class="text-slate-500 transition hover:text-slate-700"
                  @click="removeCoreValue(value)"
                  :aria-label="`Remove ${value}`"
                >
                  <svg
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6 6 18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="mt-36 h-px bg-slate-200"></div>

    <div
      v-if="isSubmitting"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-5">
        <div
          class="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-500"
        ></div>
        <p class="text-[22px] font-semibold text-slate-900">
          Reading brand values
        </p>
      </div>
    </div>
  </div>
</template>
