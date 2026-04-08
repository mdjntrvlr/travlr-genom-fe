<template>
  <Header />
  <div class="py-8 px-8 max-w-7xl mx-auto">
    <div class="mb-12">
      <ImageGallery />
    </div>
    <TabComponent />
    <OverviewTab />
  </div>
  <Footer />
</template>

<script setup lang="ts">
import ImageGallery from "../components/prototypes/pages/detail/ImageGallery.vue";
import TabComponent from "../components/prototypes/pages/detail/TabComponent.vue";
import OverviewTab from "../components/prototypes/pages/detail/OverviewTab.vue";
import Header from "../components/prototypes/Header.vue";
import Footer from "../components/prototypes/Footer.vue";
</script>
