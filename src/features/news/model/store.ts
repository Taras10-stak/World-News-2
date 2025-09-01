import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Article, Category } from '@/shared/api/types'
import * as api from '@/shared/api/client'

type NewsState = {
  category: Category
  q: string
  page: number
  items: Article[]
  total: number
  loading: boolean
  error?: string
  selected?: Article
}

type Actions = {
  setCategory: (c: Category) => void
  setQuery: (q: string) => void
  open: (a: Article) => void
  close: () => void
  refresh: () => Promise<void>
  loadMore: () => Promise<void>
}

const initial: NewsState = {
  category: 'top',
  q: '',
  page: 0,
  items: [],
  total: 0,
  loading: false,
}

export const useNews = create<NewsState & Actions>()(
  immer((set, get) => ({
    ...initial,
    setCategory: (category) => {
      set((s) => {
        s.category = category
        s.page = 0
        s.items = []
        s.total = 0
        s.q = ''
        s.error = undefined
      })
      void get().refresh()
    },
    setQuery: (q) => set((s) => { s.q = q }),
    open: (a) => set((s) => { s.selected = a }),
    close: () => set((s) => { s.selected = undefined }),
    refresh: async () => {
      set((s) => { s.loading = true; s.error = undefined })
      try {
        const r = await api.fetchList(get().category, get().q, 1)
        set((s) => {
          s.items = r.items
          s.page = r.page
          s.total = r.total
        })
      } catch (e: any) {
        set((s) => { s.error = e?.message || 'Помилка завантаження' })
      } finally {
        set((s) => { s.loading = false })
      }
    },
    loadMore: async () => {
      const { loading, page, items, category, q } = get()
      if (loading) return
      set((s) => { s.loading = true; s.error = undefined })
      try {
        const r = await api.fetchList(category, q, page + 1)
        set((s) => {
          s.items = [...items, ...r.items]
          s.page = r.page
          s.total = r.total
        })
      } catch (e: any) {
        set((s) => { s.error = e?.message || 'Помилка завантаження' })
      } finally {
        set((s) => { s.loading = false })
      }
    },
  }))
)