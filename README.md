Новини світу — React + TypeScript + Zustand (no server)

## Запуск
```bash
npm i
npm run dev
```

## Можливості
- Категорії: Топ, Світ, Спорт, Технології, Здоров'я (health — через пошук).
- Пошук за ключовими словами (у межах обраної категорії).
- Деталі новини (модальне вікно з повним текстом).

## Архітектура (feature-sliced)
```text
src/
  shared/
    api/ (client, types)  # робота з HTTP
    ui/ (Container, Modal)
  features/
    news/
      model/ (zustand store)
      ui/ (SearchBar, CategoryBar, ArticleCard, NewsList, DetailsModal)
      pages/ (NewsPage)
```
