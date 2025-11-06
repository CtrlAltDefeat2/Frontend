// src/lib/api/recommendations.ts
export type BookRecommendation = {
  id: string
  title: string
  author: string
  cover?: string
  matchScore: number // 0-100
  reason: string
  url: string
}

const BOOK_BY_PLAYLIST: Record<string, BookRecommendation> = {
  '1': {
    id: 'bk-night-circus',
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    cover:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1387124618i/9361589.jpg',
    matchScore: 92,
    reason: 'Dreamy, mysterious vibe — fits the moody romance of “Daily Mix.”',
    url: 'https://www.goodreads.com/book/show/9361589-the-night-circus',
  },
  '2': {
    id: 'bk-pachinko',
    title: 'Pachinko',
    author: 'Min Jin Lee',
    cover:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1529845599i/34051011.jpg',
    matchScore: 88,
    reason: 'Emotional and reflective — aligned with the soft, nostalgic “Chill Vibes.”',
    url: 'https://www.goodreads.com/book/show/34051011-pachinko',
  },
  '3': {
    id: 'bk-project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg',
    matchScore: 90,
    reason: 'High-energy, inventive sci-fi — perfect for the upbeat “Focus Beats.”',
    url: 'https://www.goodreads.com/book/show/54493401-project-hail-mary',
  },
  '4': {
    id: 'bk-shadow-of-the-wind',
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    cover:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1628791882i/1232.jpg',
    matchScore: 87,
    reason: 'Moody, literary mystery — resonates with the indie, atmospheric “Indie Waves.”',
    url: 'https://www.goodreads.com/book/show/1232.The_Shadow_of_the_Wind',
  },
  '5': {
    id: 'bk-klara-and-the-sun',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120408.jpg',
    matchScore: 85,
    reason: 'Quiet, contemplative sci-fi — pairs with the calm focus of “Lo-Fi Study.”',
    url: 'https://www.goodreads.com/book/show/54120408-klara-and-the-sun',
  },
  '6': {
    id: 'bk-great-gatsby',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover:
      'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1738790966i/4671.jpg',
    matchScore: 89,
    reason: 'Jazz-age elegance and melancholy — the literary twin of “Midnight Jazz.”',
    url: 'https://www.goodreads.com/book/show/4671.The_Great_Gatsby',
  },
}

export async function fetchRecommendationsByPlaylists(
  playlistIds: string[],
): Promise<BookRecommendation[]> {
  await new Promise((r) => setTimeout(r, 600))
  if (!playlistIds.length) return []

  const used = new Set<string>()
  const results: BookRecommendation[] = []

  for (const pid of playlistIds) {
    const rec = BOOK_BY_PLAYLIST[pid]
    if (!rec) continue
    if (used.has(rec.id)) continue
    used.add(rec.id)
    results.push(rec)
  }

  return results
}
