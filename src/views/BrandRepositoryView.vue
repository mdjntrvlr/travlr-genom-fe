<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { getBrands, type Brand } from "../services/brand.service";

const brands = ref<Brand[]>([]);
const loading = ref(true);
const errorMessage = ref("");
const brokenLogoIds = ref<Set<string | number>>(new Set());
const router = useRouter();

const normalizeDomain = (rawUrl: string) => {
  const trimmedUrl = rawUrl.trim();

  if (!trimmedUrl) {
    return "";
  }

  try {
    const parsedUrl = new URL(
      /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`,
    );
    return parsedUrl.hostname.replace(/^www\./i, "");
  } catch {
    return trimmedUrl
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .split("/")[0]
      .trim();
  }
};

const getDomainLabel = (brand: Brand) => normalizeDomain(brand.url || "");

const hasValidLogo = (brand: Brand) =>
  Boolean(brand.logo) && !brokenLogoIds.value.has(brand.id);

const handleLogoError = (brandId: string | number) => {
  brokenLogoIds.value.add(brandId);
};

const openBrandDetail = (brand: Brand) => {
  const brandSlug = brand.slug?.trim();

  if (!brandSlug) {
    return;
  }

  router.push({
    name: "brand-repository-detail",
    params: { slug: brandSlug },
  });
};

const fetchBrands = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const result = await getBrands();
    brands.value = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Failed to fetch brands for repository page", error);
    errorMessage.value = "Unable to load brands right now.";
    brands.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBrands();
});
</script>

<template>
  <section>
    <h1 class="text-[26px] font-semibold tracking-tight text-slate-900">
      Brand Repository
    </h1>
    <p class="mt-2 text-[18px] text-slate-600">
      Manage and access your library of verified Brand DNAs. Revisit existing
      identities to generate new assets or update campaign briefs instantly.
    </p>
  </section>

  <section class="mt-8">
    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-[16px] text-slate-500"
    >
      Loading brands...
    </div>

    <div
      v-else-if="errorMessage"
      class="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-8 text-[16px] text-rose-600"
    >
      {{ errorMessage }}
    </div>

    <div
      v-else-if="!brands.length"
      class="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-[16px] text-slate-500"
    >
      No brands available.
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="brand in brands" :key="brand.id">
        <button
          type="button"
          :disabled="!brand.slug"
          :class="[
            'group block w-full text-left',
            brand.slug ? 'cursor-pointer' : 'cursor-not-allowed opacity-70',
          ]"
          @click="openBrandDetail(brand)"
        >
          <div
            class="flex h-[210px] items-center justify-center overflow-hidden rounded-2xl bg-slate-100 p-6 transition group-hover:bg-slate-200"
          >
            <img
              v-if="hasValidLogo(brand)"
              :src="brand.logo"
              :alt="`${brand.name} logo`"
              class="h-full w-full object-contain"
              @error="handleLogoError(brand.id)"
            />
            <p
              v-else
              class="text-[16px] font-semibold tracking-tight text-slate-900"
            >
              Logo
            </p>
          </div>

          <p
            class="mt-4 text-[18px] font-semibold tracking-tight text-slate-900 transition group-hover:text-slate-700"
          >
            {{ brand.name }}
          </p>
          <p class="mt-1 text-[14px] text-slate-500">
            {{ getDomainLabel(brand) || "-" }}
          </p>
        </button>
      </article>
    </div>
  </section>
</template>
