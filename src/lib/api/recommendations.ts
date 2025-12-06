// src/lib/api/recommendations.ts
import { ReadingItem } from '@/lib/api/reading-list'

export type BookRecommendation = {
  id: string
  title: string
  author: string
  cover?: string
  matchScore?: number // 0-100
  reason?: string
  url?: string
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
  const response = await fetch('http://localhost:8081/api/books')
  const books: ReadingItem[] = await response.json()
  const bookReccomendations: BookRecommendation[] = []
  for (const book of books)
    bookReccomendations.push({
      id: book.id,
      title: book.title,
      author: book.authors,
    })
  return bookReccomendations
}

export type MovieRecommendation = {
  id: string
  title: string
  director: string
  year: string
  cover?: string
  matchScore?: number
  reason?: string
  url?: string
}

// mock data extins pentru testare paginare
const MOVIES_MOCK: MovieRecommendation[] = [
  {
    id: 'mv-arrival',
    title: 'Arrival',
    director: 'Denis Villeneuve',
    year: '2016',
    cover: 'https://www.themoviedb.org/t/p/w600_and_h900_face/pEzNVQfdzYDzVK0XqxERIw2x2se.jpg',
    matchScore: 94,
    reason: 'Atmospheric and intellectual sci-fi, matches the deep vibe of your playlists.',
    url: 'https://www.imdb.com/title/tt2543164/',
  },
  {
    id: 'mv-la-la-land',
    title: 'La La Land',
    director: 'Damien Chazelle',
    year: '2016',
    cover: 'https://www.themoviedb.org/t/p/w600_and_h900_face/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    matchScore: 89,
    reason: 'Melancholic jazz vibes perfectly aligned with "Midnight Jazz".',
    url: 'https://www.imdb.com/title/tt3783958/',
  },
  {
    id: 'mv-grand-budapest',
    title: 'The Grand Budapest Hotel',
    director: 'Wes Anderson',
    year: '2014',
    cover: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    matchScore: 85,
    reason: 'Quirky and energetic, fitting for your upbeat tracks.',
    url: 'https://www.imdb.com/title/tt2278388/',
  },
  {
    id: 'mv-blade-runner',
    title: 'Blade Runner 2049',
    director: 'Denis Villeneuve',
    year: '2017',
    cover: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    matchScore: 91,
    reason: 'Synth-heavy soundscapes match your electronic playlists.',
    url: 'https://www.imdb.com/title/tt1856101/',
  },
  {
    id: 'mv-interstellar',
    title: 'Interstellar',
    director: 'Christopher Nolan',
    year: '2014',
    cover: 'https://image.tmdb.org/t/p/w500/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    matchScore: 93,
    reason: 'Epic, organ-heavy score matches the dramatic intensity of your library.',
    url: 'https://www.imdb.com/title/tt0816692/',
  },
  {
    id: 'mv-whiplash',
    title: 'Whiplash',
    director: 'Damien Chazelle',
    year: '2014',
    cover: 'https://www.themoviedb.org/t/p/w600_and_h900_face/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
    matchScore: 88,
    reason: 'Intense rhythm and jazz focus, perfect for high-tempo listening.',
    url: 'https://www.imdb.com/title/tt2582802/',
  },
  {
    id: 'mv-her',
    title: 'Her',
    director: 'Spike Jonze',
    year: '2013',
    cover: 'https://image.tmdb.org/t/p/w500/yk4J4aewWYNiBhD49WD7UaBBn37.jpg',
    matchScore: 86,
    reason: 'Soft, melancholic, and futuristic—fits your Lo-Fi study beats.',
    url: 'https://www.imdb.com/title/tt1798709/',
  },
  {
    id: 'mv-drive',
    title: 'Drive',
    director: 'Nicolas Winding Refn',
    year: '2011',
    cover: 'https://www.themoviedb.org/t/p/w600_and_h900_face/602vevIURmpDfzbnv5Ubi6wIkQm.jpg',
    matchScore: 90,
    reason: 'Neon-noir aesthetic with a pulsing synthwave soundtrack.',
    url: 'https://www.imdb.com/title/tt0780504/',
  },
  {
    id: 'mv-amelie',
    title: 'Amélie',
    director: 'Jean-Pierre Jeunet',
    year: '2001',
    cover: 'https://www.themoviedb.org/t/p/w600_and_h900_face/vZ9NhNbQQ3yhtiC5sbhpy5KTXns.jpg',
    matchScore: 84,
    reason: 'Whimsical accordion and piano tracks match your acoustic favorites.',
    url: 'https://www.imdb.com/title/tt0211915/',
  },
  {
    id: 'mv-social-network',
    title: 'The Social Network',
    director: 'David Fincher',
    year: '2010',
    cover: 'https://www.themoviedb.org/t/p/w600_and_h900_face/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',
    matchScore: 87,
    reason: 'Dark ambient electronic score, ideal for focus and deep work.',
    url: 'https://www.imdb.com/title/tt1285016/',
  },
  {
    id: 'mv-inception',
    title: 'Inception',
    director: 'Christopher Nolan',
    year: '2010',
    cover: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    matchScore: 92,
    reason: 'Mind-bending narrative with a heavy, driving orchestral score.',
    url: 'https://www.imdb.com/title/tt1375666/',
  },
]

export async function generateMovieRecommendations(
  playlistIds: string[],
): Promise<MovieRecommendation[]> {
  // aici se va face apelul la backend
  // const response = await fetch('.../api/movies', ...)

  await new Promise((r) => setTimeout(r, 1500)) // simulam

  // momentan returnam mock (amestecat aleatoriu la fiecare request)
  return [...MOVIES_MOCK].sort(() => 0.5 - Math.random())
}
