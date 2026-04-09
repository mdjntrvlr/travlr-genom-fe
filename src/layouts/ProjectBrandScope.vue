<template>
  <RouterView />
</template>

<script setup lang="ts">
import { computed, provide, readonly, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { getBrandBySlug, type Brand } from '../services'
import { projectBrandContextKey } from '../utils/projectBrandContext'

const route = useRoute()
const brand = ref<Brand | null>(null)
const isLoadingBrand = ref(false)

const projectId = computed(() => {
  const value = route.params.projectId
  return typeof value === 'string' ? value : ''
})

const refreshBrand = async () => {
  if (!projectId.value) {
    brand.value = null
    return
  }

  try {
    isLoadingBrand.value = true
    brand.value = await getBrandBySlug(projectId.value)
  } catch (error) {
    console.error('Failed to load brand:', error)
    brand.value = null
  } finally {
    isLoadingBrand.value = false
  }
}

watch(projectId, () => {
  void refreshBrand()
}, { immediate: true })

provide(projectBrandContextKey, {
  brand: readonly(brand),
  isLoadingBrand: readonly(isLoadingBrand),
  refreshBrand,
})
</script>
