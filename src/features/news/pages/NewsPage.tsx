import Container from '@/shared/ui/Container'
import { SearchBar } from '../ui/SearchBar'
import { CategoryBar } from '../ui/CategoryBar'
import { NewsList } from '../ui/NewsList'
import { DetailsModal } from '../ui/DetailsModal'

export default function NewsPage() {
  return (
    <Container>
      <header className="app">
        <div className="brand">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="#2563eb" strokeWidth="2" /><path d="M7 8h10M7 12h10M7 16h6" stroke="#2563eb" strokeWidth="2"/></svg>
          <h1>Новини світу</h1>
        </div>
        <div className="controls">
          <SearchBar />
          <div></div>
        </div>
      </header>
      <CategoryBar />
      <NewsList />
      <DetailsModal />
    </Container>
  )
}