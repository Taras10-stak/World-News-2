import type { Article } from '@/shared/api/types'
import { useNews } from '../model/store'

export function ArticleCard({ a }: { a: Article }) {
  const open = useNews((s) => s.open)
  return (
    <article className="card">
      <img className="thumb" src={a.thumbnail || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80'} alt={a.title} />
      <div className="content">
        <div className="title"><a href={a.url} target="_blank" rel="noreferrer">{a.title}</a></div>
        <div className="meta">{a.sectionName} • {new Date(a.publishedAt).toLocaleString()}</div>
        {a.trailText && <div dangerouslySetInnerHTML={{ __html: a.trailText }} />}
        <div>
          <button className="btn" onClick={() => open(a)}>Детальніше</button>
        </div>
      </div>
    </article>
  )
}