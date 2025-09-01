import { useEffect } from 'react'
import { useNews } from '../model/store'
import { ArticleCard } from './ArticleCard'

export function NewsList() {
  const { items, loading, error, refresh, loadMore } = useNews()
  useEffect(() => { if (items.length === 0) void refresh() }, [])

  if (error) return <div className="center error">{error}</div>
  if (!loading && items.length === 0) return <div className="center">Немає новин.</div>

  return (
    <>
      <div className="grid">
        {items.map((a) => (<ArticleCard key={a.id} a={a} />))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <button className="btn" onClick={() => void loadMore()}>Показати ще</button>
      </div>
      {loading && <div className="center">Завантаження…</div>}
    </>
  )
}