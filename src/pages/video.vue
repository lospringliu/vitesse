<script setup lang="ts">
</script>

<template>
  <div class="bg-black">
    <div class="min-w-xs lg:mx-12 xl:mx-24">
      <YoutubePlayer />
    </div>
  </div>
  <div class="bg-white dark:bg-gray-800 grid grid-col grid-cols-1 gap-2 min-w-xs place-content-center sm:px-2 sm:gap-4 md:px-4 md:gap-6 md:grid-cols-2 lg:gap-8 lg:grid-cols-3 xl:grid-cols-4 text-center text-gray-700 dark:text-gray-200">
    <YoutubeVideos />
  </div>
</template>

<route lang="yaml">
meta:
  layout: video
</route>
