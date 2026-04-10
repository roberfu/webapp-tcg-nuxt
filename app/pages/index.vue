<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-12">TCG collage</h1>
      
      <div class="flex gap-16 justify-center items-start">
        <div class="flex flex-col items-center border-2 border-white rounded-xl p-6">
          <NuxtLink to="/collage-magic" class="w-48 h-48 mb-4">
            <img src="/magic-logo.png" alt="Magic" class="w-full h-full object-contain" />
          </NuxtLink>
          <div class="flex flex-col gap-2">
            <NuxtLink to="/collage-magic" class="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 border border-white">Collage</NuxtLink>
            <!-- <NuxtLink to="/database" class="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 border border-white">Database</NuxtLink> -->
            <!-- <NuxtLink to="/collection" class="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 border border-white">Collection</NuxtLink> -->
          </div>
        </div>

        <div class="flex flex-col items-center border-2 border-white rounded-xl p-6">
          <NuxtLink to="/collage-pokemon" class="w-48 h-48 mb-4">
            <img src="/pokemon-logo.png" alt="Pokémon" class="w-full h-full object-contain" />
          </NuxtLink>
          <div class="flex flex-col gap-2">
            <NuxtLink to="/collage-pokemon" class="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 border border-white">Collage</NuxtLink>
            <!-- <NuxtLink to="/database" class="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 border border-white">Database</NuxtLink> -->
            <!-- <NuxtLink to="/collection" class="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 border border-white">Collection</NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="fixed bottom-0 left-0 right-0 bg-gray-800 text-gray-400 text-center py-2 text-sm">
    webapp-tcg-nuxt v{{ pkg.version }}
  </footer>
</template>

<script setup lang="ts">
const pkg = usePackage()
</script>