<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VuePlyr from 'vue-plyr'
import "vue-plyr/dist/vue-plyr.css"

const video = ref(null)
const videoid = ref('3P1CnWI62Ik')
const loop = ref(1)
const width = ref(320)
const autoplay = ref(0)
onMounted(() => {
  // window.console.log(video.value)
  // const testHash = 'mbGtJg23skhvFmu9mJiePVByhfzu5rwo74MEkVDYAmF5T'
  const testHash = 'QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K'
  // const testHash = 'QmbrwEH4AEQhUN929yPy4j5B2PfQYk3JJyG8iq7HVoXbia'
  window.Hls.DefaultConfig.loader = window.HlsjsIpfsLoader
  window.Hls.DefaultConfig.debug = false
  if (window.Hls.isSupported()) {
    // const video = document.getElementById('video')
    const hls = new window.Hls()
    hls.config.ipfs = window.node
    hls.config.ipfsHash = testHash
    hls.loadSource('master.m3u8')
    hls.attachMedia(video.value)
    hls.on(window.Hls.Events.MANIFEST_PARSED, () => {})
  }
})
</script>

<template>
  <div class="flex items-center justify-center">
    <YoutubeVue3
      :videoid="videoid"
      :loop="loop"
      :width="width"
      :autoplay="autoplay"
    />
  </div>
  <div class="flex items-center justify-center">
    <vue-plyr>
      <div class="w-full" data-plyr-provider="youtube" data-plyr-embed-id="PWj5HxW5J5M"></div>
    </vue-plyr>
  </div>
  <div class="flex items-center justify-center">
    <video ref="video" controls></video>
  </div>
  <div class="flex items-center justify-center">
    <vue-plyr>
      <div class="plyr__video-embed">
        <iframe
          src="https://www.youtube.com/embed/PWj5HxW5J5M?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        ></iframe>
      </div>
    </vue-plyr>
  </div>
</template>
