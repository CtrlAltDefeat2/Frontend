export type BookRecommendation = {
  id: string
  title: string
  author: string
  cover?: string
  matchScore: number // 0-100
  reason: string
}

const BOOK_BY_PLAYLIST: Record<string, BookRecommendation> = {
  '1': {
    id: 'bk-night-circus',
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    cover:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=700&auto=format&fit=crop',
    matchScore: 92,
    reason: 'Dreamy, mysterious vibe — fits the moody romance of “Daily Mix.”',
  },
  '2': {
    id: 'bk-pachinko',
    title: 'Pachinko',
    author: 'Min Jin Lee',
    cover:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=700&auto=format&fit=crop',
    matchScore: 88,
    reason: 'Emotional and reflective — aligned with the soft, nostalgic “Chill Vibes.”',
  },
  '3': {
    id: 'bk-project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover:
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=700&auto=format&fit=crop',
    matchScore: 90,
    reason: 'High-energy, inventive sci-fi — perfect for the upbeat “Focus Beats.”',
  },
  '4': {
    id: 'bk-shadow-of-the-wind',
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    cover:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=700&auto=format&fit=crop',
    matchScore: 87,
    reason: 'Moody, literary mystery — resonates with the indie, atmospheric “Indie Waves.”',
  },
  '5': {
    id: 'bk-klara-and-the-sun',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover:
      'https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?q=80&w=700&auto=format&fit=crop',
    matchScore: 85,
    reason: 'Quiet, contemplative sci-fi — pairs with the calm focus of “Lo-Fi Study.”',
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
