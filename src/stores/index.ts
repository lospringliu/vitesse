export { useStore } from "./useStore"
import { useVideoStore } from "./useVideoStore"
import { useVideoFeaturedStore } from "./useVideoFeaturedStore"
import { usePlayingStore } from "./usePlayingStore"
import { usePlayingInListStore } from "./usePlayingInListStore"
import { usePlaylistStore } from "./usePlaylistStore"
import { usePrefersStore } from "./usePrefersStore"
import { useFilteringStore } from "./useFilteringStore"

// import { createPinia, setActivePinia } from "pinia"
// const pinia = createPinia()
// setActivePinia(pinia)
// 
// const playing = usePlayingStore()
// const playingInList = usePlayingInListStore()
// const playlist = usePlaylistStore()
// const videos = useVideoStore()
// const featured = useVideoFeaturedStore()
// const prefers = usePrefersStore()
// const filtering = useFilteringStore()
// 
// 
// prefers.$subscribe((mutation, state) => {
//   // import { MutationType } from 'pinia'
//   // mutation.type // 'direct' | 'patch object' | 'patch function'
//   // mutation.storeId // 'cart'
//   // mutation.payload // patch object passed to cartStore.$patch()
//   console.log(mutation)
//   prefers.save()
// })
// export {pinia, playing, playingInList, playlist, videos, featured, prefers, filtering}
export {
  useVideoStore,
  useVideoFeaturedStore,
  usePlayingStore,
  usePlayingInListStore,
  usePrefersStore,
  useFilteringStore,
  usePlaylistStore
}
