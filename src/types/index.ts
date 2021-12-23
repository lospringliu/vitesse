export interface IChannel {
  id: string
  name?: string
  title?: string
}

export interface IVideo {
  videoId: string
  videoPublishedAt: string
  currentTime?: number
  channel?: IChannel
}import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void
