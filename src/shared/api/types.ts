export type Category = 'top' | 'world' | 'sport' | 'technology' | 'health'

export interface Article {
  id: string
  title: string
  url: string
  thumbnail?: string
  trailText?: string
  sectionName?: string
  publishedAt: string // ISO
  byline?: string
}

export interface Paged<T> {
  items: T[]
  page: number
  total: number
  pageSize: number
}