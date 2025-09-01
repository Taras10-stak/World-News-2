import { PropsWithChildren } from 'react'

export function Modal({ title, onClose, children }: PropsWithChildren<{ title: string; onClose: () => void }>) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <strong>{title}</strong>
          <button className="btn" onClick={onClose}>Закрити</button>
        </header>
        <div className="body">{children}</div>
      </div>
    </div>
  )
}