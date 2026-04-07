<script setup lang="ts">
import travlrLogo from "./assets/travlr-logo.png";
import iconMenu1 from "./assets/menu-1.svg";
import iconMenu2 from "./assets/menu-2.svg";
import iconMenu3 from "./assets/menu-3.svg";

type NavItem = {
  label: string;
  to: string;
  icon: "menu-1" | "menu-2" | "menu-3";
};

const navItems: NavItem[] = [
  { label: "Brand Intelligence", to: "/brand-intelligence", icon: "menu-1" },
  { label: "Brand Repository", to: "/brand-repository", icon: "menu-2" },
  { label: "Campaign Page", to: "/campaign-page", icon: "menu-3" },
];

const iconMap = {
  "menu-1": iconMenu1,
  "menu-2": iconMenu2,
  "menu-3": iconMenu3,
};
</script>

<template>
  <div class="min-h-screen bg-white text-slate-700">
    <header class="border-b border-slate-200 bg-white">
      <div class="flex h-16 items-center justify-between px-10">
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-3">
            <img :src="travlrLogo" alt="Travlr logo" class="h-8 w-auto" />
            <span
              class="rounded-2xl bg-black px-3 py-1 text-xl font-semibold tracking-tight text-white"
            >
              GENOM
            </span>
          </div>
        </div>
      </div>
    </header>

    <div class="grid min-h-[calc(100vh-64px)] grid-cols-[320px_minmax(0,1fr)]">
      <aside class="bg-white px-8 py-5">
        <nav class="space-y-3">
          <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <a
              :href="href"
              @click="navigate"
              :class="[
                'flex items-center gap-3 rounded-2xl px-3 py-2 text-[18px] transition hover:bg-slate-50',
                isActive ? 'bg-slate-100 font-bold text-slate-900' : 'font-medium text-slate-600',
              ]"
            >
              <span
                class="h-6 w-6 shrink-0"
                :class="isActive ? 'bg-[#01B2C9]' : 'bg-slate-500'"
                :style="{
                  WebkitMaskImage: `url(${iconMap[item.icon]})`,
                  maskImage: `url(${iconMap[item.icon]})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }"
              ></span>

              <span :class="isActive ? 'font-bold' : 'font-medium'">{{ item.label }}</span>
            </a>
          </RouterLink>
        </nav>
      </aside>

      <main class="bg-white px-16 py-8">
        <div class="mx-auto max-w-[1115px]">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
