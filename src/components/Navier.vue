<script setup lang="ts">
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import IconSun from '~icons/heroicons-outline/sun'
import { usePrefersStore } from '@/stores'
const prefers = usePrefersStore()
const flag_settings = ref(false)
const toggleSettings = useToggle(flag_settings)
const settings_prefers = ref(prefers)
</script>

<template>
  <nav class="text-center text-xl mt-0 mx-auto">
    <button class="mx-auto mx-4" @click="toggleSettings">
      icon_settings
    </button>
  </nav>
  <div v-if="flag_settings" class="grid grid-col place-content-center w-sm">
    <div>
      youtube access:
      <input type="checkbox" :value="settings_prefers.youtubeAccess ? 'checked' : ''">
    </div>
    <div>
      <div>
        youtube api key:
        <input v-model="settings_prefers.youtubeAppKey" type="text">
      </div>
      <div>
        play back rate:
        <input v-model="settings_prefers.playbackRate" type="number">
      </div>
      <div>
        max items per query:
        <input v-model="settings_prefers.maxResults" type="number">
      </div>
      <button class="bg-blue-600 rounded-sm" @click="() => { prefers.save(); toggleSettings() }">
        Save
      </button>
    </div>
  </div>
</template>
