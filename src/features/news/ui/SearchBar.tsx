import { useEffect, useRef, useState } from 'react'
import { useNews } from '../model/store'

export function SearchBar() {
  const qStore = useNews((s) => s.q)
  const setQuery = useNews((s) => s.setQuery)
  const refresh = useNews((s) => s.refresh)
  const [q, setQ] = useState(qStore)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setQuery(q)
      void refresh()
    }, 300)
    return () => { if (timer.current) window.clearTimeout(timer.current) }
  }, [q, setQuery, refresh])

  return <input className="search" placeholder="Пошук новин…" value={q} onChange={(e) => setQ(e.target.value)} />
}