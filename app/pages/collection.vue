<script setup lang="ts">
const { t } = useLocale()
</script>

<template>
  <div class="flex-1 p-4 sm:p-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <NuxtLink to="/" class="text-brand-400 hover:text-white">{{ t('home') }}</NuxtLink>
        <h1 class="text-2xl font-bold">Collection</h1>
      </div>
      <div class="bg-brand-900 rounded-xl p-8 text-center">
        <p class="text-brand-400">{{ t('coming_soon') }}</p>
      </div>
    </div>
  </div>
</template>
