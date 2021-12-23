<script setup lang="ts">
import { ref, watch } from 'vue'
import YID from 'get-youtube-id'
import {
  useVideoFeaturedStore,
  usePlayingStore,
  usePlayingInListStore,
  usePrefersStore,
  usePlaylistStore,
} from '../stores'
import Youtube from './Youtube.vue'
const playing = usePlayingStore()
const playingInList = usePlayingInListStore()
const playlist = usePlaylistStore()
const featured = useVideoFeaturedStore()
const prefers = usePrefersStore()

const youtube = ref(null)
const playingVideo = ref(null)
const play = () => {
  youtube.value.playVideo()
  youtube.value.setPlaybackRate(prefers.playbackRate)
}
watch(playlist.playlist, async(value, old_value) => {
  // console.log(youtube.value)
  let index = -1; let currentTime = 0
  const playlistVideos = value.map(video => video.videoId)
  try {
    const videoId = YID(youtube.value.getVideoUrl())
    if (videoId) {
      const currentVideo = value.find(v => v.videoId === videoId)
      if (currentVideo)
        playingInList.playing = JSON.parse(JSON.stringify(currentVideo))

      else
        playingInList.playing = JSON.parse(JSON.stringify(value[0]))

      currentTime = Math.floor(youtube.value.getCurrentTime())
      playingInList.playing.currentTime = Math.floor(currentTime)
    }
  }
  catch (e) {}
  if (playing.playing.hasOwnProperty('videoId')) {
    index = value.findIndex(v => v.videoId === playing.playing.videoId)
    currentTime = 0
  }
  else if (playingInList.playing.hasOwnProperty('videoId')) {
    index = value.findIndex(v => v.videoId === playingInList.playing.videoId)
  }
  else {}
  if (index !== -1)
    youtube.value.loadPlaylist(playlistVideos.join(','), index, currentTime)

  else
    youtube.value.loadPlaylist(playlistVideos.join(','))

  youtube.value.setPlaybackRate(prefers.playbackRate)
})
playingVideo.value = featured.playing
</script>

<template>
  <Youtube
    ref="youtube"
    :src="`https://www.youtube.com/watch?v=${playingVideo.videoId}`"
    @ready="play"
  />
</template>
