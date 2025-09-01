import type { Article, Category, Paged } from './types'

const API = 'https://content.guardianapis.com'
// 'test' ключ працює для демо. За потреби заміни через VITE_GUARDIAN_API_KEY
const KEY = import.meta.env.VITE_GUARDIAN_API_KEY || 'test'

type SearchParams = Record<string, string | number | boolean | undefined>

function qs(params: SearchParams): string {
  const e = encodeURIComponent
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${e(k)}=${e(String(v))}`)
    .join('&')
}

function normalize(r: any): Article {
  const f = r.fields || {}
  return {
    id: r.id,
    title: f.headline || r.webTitle,
    url: r.webUrl,
    thumbnail: f.thumbnail,
    trailText: f.trailText,
    sectionName: r.sectionName,
    publishedAt: r.webPublicationDate,
    byline: f.byline,
  }
}

const sectionMap: Record<Category, string | undefined> = {
  top: undefined,
  world: 'world',
  sport: 'sport',
  technology: 'technology',
  health: undefined, // для "здоров'я" використаємо пошук за ключовим словом
}

export async function fetchList(category: Category, q = '', page = 1, pageSize = 20): Promise<Paged<Article>> {
  const section = sectionMap[category]
  const params: SearchParams = {
    'order-by': 'newest',
    'page': page,
    'page-size': pageSize,
    'show-fields': 'headline,trailText,thumbnail,byline',
    'api-key': KEY,
    'q': q || (category === 'health' ? 'health' : undefined),
    'section': section,
  }
  const url = `${API}/search?${qs(params)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const results = data.response.results as any[]
  return {
    items: results.map(normalize),
    page: data.response.currentPage,
    total: data.response.total,
    pageSize: data.response.pageSize,
  }
}

export async function fetchById(id: string): Promise<{ article: Article; html?: string }> {
  const params: SearchParams = {
    'show-fields': 'headline,trailText,thumbnail,byline,body',
    'api-key': KEY,
  }
  const url = `${API}/${id}?${qs(params)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const c = data.response.content
  const article = normalize(c)
  const html = c.fields?.body as string | undefined
  return { article, html }
}