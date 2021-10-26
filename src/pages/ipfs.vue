<script setup lang="ts">
</script>

<template>
  <div class="relative min-h-[712px] max-w-[350px] mx-auto sm:h-[712px] sm:w-[350px] sm:bg-black sm:rounded-[60px] shadow-xl overflow-hidden border-x-[1px] sm:border-[14px] border-black">
    <img src="/pic.jpg" class="absolute inset-0 h-full w-full object-cover" alt="backgroud picture" />
    <div class="invisible absolute top-0 inset-0 sm:visible">
      <div class="h-6 w-40 mx-auto bg-black rounded-b-3xl"></div>
    </div>
    <div class="invisible relative mt-2 mr-5 flex justify-end space-x-1 sm:visible">
      <carbon-dicom-overlay class="h-4 w-4" />
      <carbon-language class="h-4 w-4" />
      <carbon-scooter class="h-4 w-4" />
    </div>
    <div class="invisible relative mt-1.5 h-0.5 w-10 bg-white mr-7 ml-auto sm:visible"></div>
    <div class="relative mt-2 flex flex-col items-center">
    </div>
    <div class="absolute bottom-1 inset-x-0">
      <div class="mx-auto h-1 w-28 bg-white rounded"></div>
    </div>
  </div>
</template>
