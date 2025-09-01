import clsx from 'clsx'
import { useNews } from '../model/store'
import type { Category } from '@/shared/api/types'

const cats: { id: Category; name: string }[] = [
  { id: 'top', name: 'Топ' },
  { id: 'world', name: 'Світ' },
  { id: 'sport', name: 'Спорт' },
  { id: 'technology', name: 'Технології' },
  { id: 'health', name: "Здоров'я" },
]

export function CategoryBar() {
  const category = useNews((s) => s.category)
  const setCategory = useNews((s) => s.setCategory)
  return (
    <div className="pillbar">
      {cats.map((c) => (
        <button key={c.id} className={clsx('pill', category === c.id && 'active')} onClick={() => setCategory(c.id)}>
          {c.name}
        </button>
      ))}
    </div>
  )
}