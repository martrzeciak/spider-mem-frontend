import type { Tag } from './tag'
import type { Comment } from './comment'

export interface Meme{
    id: string
    title: string
    imageUrl: string
    createdAt: string
    userId: string
    userName: string
    tags: Tag[]
    comments: Comment[]
    likeCount: number
}
