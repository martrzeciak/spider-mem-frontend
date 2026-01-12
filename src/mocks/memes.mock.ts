import { memes } from './db'
import type { Meme } from '@/models/meme'
import type { PagedList } from '@/models/pagination'

export function getMemesMock(pageNumber: number, pageSize: number): Promise<PagedList<Meme>> {

  const start = (pageNumber - 1) * pageSize
  const items = memes.slice(start, start + pageSize)

  return Promise.resolve({
    items,
    currentPage: pageNumber,
    pageSize,
    totalCount: memes.length,
    totalPages: Math.ceil(memes.length / pageSize)
  })
}
