<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import BrandApplicationsStep from "../components/brand-intelligence/BrandApplicationsStep.vue";
import { useToast } from "../composables/useToast";
import { getBrandBySlug, type Brand } from "../services/brand.service";

type UnknownRecord = Record<string, unknown>;

const route = useRoute();
const router = useRouter();
const { toast, showToast } = useToast();

const brand = ref<Brand | null>(null);
const loading = ref(true);
const errorMessage = ref("");

const brandSlug = computed(() => {
  const rawValue = route.params.slug;
  return typeof rawValue === "string" ? rawValue : "";
});

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeKey = (value: string) =>
  value.replace(/[^a-z0-9]/gi, "").toLowerCase();

const findValuesByAliases = (payload: unknown, aliases: string[]) => {
  const normalizedAliases = new Set(aliases.map(normalizeKey));
  const queue: unknown[] = [payload];
  const visited = new Set<object>();
  const matches: unknown[] = [];

  while (queue.length) {
    const currentValue = queue.shift();

    if (Array.isArray(currentValue)) {
      queue.push(...currentValue);
      continue;
    }

    if (!isRecord(currentValue)) {
      continue;
    }

    if (visited.has(currentValue)) {
      continue;
    }

    visited.add(currentValue);

    for (const [key, value] of Object.entries(currentValue)) {
      if (normalizedAliases.has(normalizeKey(key)) && value != null) {
        matches.push(value);
      }
    }

    queue.push(...Object.values(currentValue));
  }

  return matches;
};

const toStringList = (value: unknown): string[] => {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue ? [trimmedValue] : [];
  }

  if (typeof value === "number") {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => toStringList(item));
  }

  if (isRecord(value)) {
    return Object.values(value).flatMap((item) => toStringList(item));
  }

  return [];
};

const uniqueNonEmptyStrings = (values: string[]) => {
  const seen = new Set<string>();

  return values.filter((value) => {
    const normalizedValue = value.trim();

    if (!normalizedValue) {
      return false;
    }

    const normalizedKey = normalizedValue.toLowerCase();

    if (seen.has(normalizedKey)) {
      return false;
    }

    seen.add(normalizedKey);
    return true;
  });
};

const logoCandidates = computed(() => {
  const selectedBrand = brand.value;

  if (!selectedBrand) {
    return [];
  }

  const aliasMatches = findValuesByAliases(selectedBrand.raw_data ?? {}, [
    "logo",
    "mainLogo",
    "main_logo",
    "primaryLogo",
    "primary_logo",
    "invertLogo",
    "invert_logo",
    "inverseLogo",
    "inverse_logo",
    "favicon",
    "favIcon",
    "icon",
    "emailLogo",
    "email_logo",
    "siteIcon",
    "site_icon",
    "url",
    "src",
  ]).flatMap((value) => toStringList(value));

  return uniqueNonEmptyStrings([selectedBrand.logo, ...aliasMatches]);
});

const fetchBrand = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const slug = brandSlug.value.trim();

    if (!slug) {
      throw new Error("Brand slug is missing.");
    }

    brand.value = await getBrandBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch brand repository detail", error);
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "Unable to load brand details right now.";
    brand.value = null;
  } finally {
    loading.value = false;
  }
};

const backToRepository = () => {
  router.push({ name: "brand-repository" });
};

onMounted(() => {
  fetchBrand();
});

watch(brandSlug, () => {
  fetchBrand();
});
</script>

<template>
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

  <section v-if="loading" class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8">
    <p class="text-[16px] text-slate-500">Loading brand details...</p>
  </section>

  <section
    v-else-if="errorMessage"
    class="mt-8 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-8"
  >
    <p class="text-[16px] text-rose-600">{{ errorMessage }}</p>
    <button
      type="button"
      class="mt-4 text-[15px] font-medium text-rose-700 underline"
      @click="backToRepository"
    >
      Back to Brand repository
    </button>
  </section>

  <template v-else-if="brand">
    <section>
      <h1 class="text-[26px] font-semibold tracking-tight text-slate-900">
        {{ brand.name }}
      </h1>
      <p class="mt-2 text-[18px] text-slate-600">
        Generate and download applications for this brand using verified brand
        assets and URL context.
      </p>
    </section>

    <BrandApplicationsStep
      :back-to-brand-review="backToRepository"
      back-button-label="Back to Brand repository"
      :brand-url="brand.url"
      :logo-candidates="logoCandidates"
      :show-toast="showToast"
    />
  </template>
</template>
