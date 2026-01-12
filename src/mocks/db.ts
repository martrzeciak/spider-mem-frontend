import memeImage from '@/assets/meme.jpg'
import type { Meme } from '@/models/meme'
import type { Comment } from '@/models/comment'
import type { Tag } from '@/models/tag'

export const tags: Tag[] = [
  { id: '1', name: 'fun' },
  { id: '2', name: 'programming' },
  { id: '3', name: 'cats' }
]

function generateComments(memeId: string): Comment[] {
  return Array.from({ length: Math.floor(Math.random() * 4) }, (_, i) => ({
    id: `${memeId}-c${i + 1}`,
    content: 'Coś tam',
    createdAt: new Date().toISOString(),
    userId: `u${i + 1}`,
    userName: `User${i + 1}`
  }))
}

export const memes: Meme[] = Array.from({ length: 36 }, (_, i) => ({
  id: String(i + 1),
  title: `Meme #${i + 1}`,
  imageUrl: memeImage,
  createdAt: new Date(Date.now() - i * 3600_000).toISOString(),
  userId: `u${i % 5}`,
  userName: `User${i % 5}`,
  tags: [tags[i % tags.length]!],
  comments: generateComments(String(i + 1)),
  likeCount: Math.floor(Math.random() * 120)
}))