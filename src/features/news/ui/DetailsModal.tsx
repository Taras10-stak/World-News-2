import { useEffect, useState } from 'react'
import { useNews } from '../model/store'
import { Modal } from '@/shared/ui/Modal'
import * as api from '@/shared/api/client'

export function DetailsModal() {
  const selected = useNews((s) => s.selected)
  const close = useNews((s) => s.close)
  const [html, setHtml] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!selected) return
    setHtml(undefined)
    setError(undefined)
    api.fetchById(selected.id)
      .then((r) => setHtml(r.html))
      .catch((e) => setError(e?.message || 'Помилка'))
  }, [selected])

  if (!selected) return null

  return (
    <Modal title={selected.title} onClose={close}>
      {error && <div className="error">{error}</div>}
      {!error && (
        <div>
          {selected.byline && <p style={{ color: '#6b7280' }}>{selected.byline}</p>}
          {selected.thumbnail && <img src={selected.thumbnail} alt="" style={{ width: '100%', borderRadius: 12, margin: '8px 0' }} />}
          {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <div>Завантаження…</div>}
        </div>
      )}
    </Modal>
  )
}