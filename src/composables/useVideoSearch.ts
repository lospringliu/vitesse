import { ref, computed } from 'vue'
import { IVideo } from "@/types"
import { useVideoStore, useFilteringStore } from "@/stores"
const videos = useVideoStore()
const filtering = useFilteringStore()

export default function useVideoSearch() {
  const searchQuery = ref(filtering)
  const videosMatchingSearchQuery = computed(() => {
    if (filtering.channel) {
      return videos.videos.filter((video: IVideo) => video.channel.name.includes(filtering.channel)).slice(0, searchQuery.value.limit)
    } else if (filtering.keyword) {
      return videos.videos.filter((video: IVideo) => video.channel.name.includes(filtering.keyword)).slice(0, searchQuery.value.limit)
    } else {
      return videos.videos.slice(0, searchQuery.value.limit)
    }
  })
    // videos.videos.filter(video => JSON.stringify(video).includes(searchQuery.value.keyword))


  return {
    searchQuery,
    videosMatchingSearchQuery
  }
}