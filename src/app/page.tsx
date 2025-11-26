'use client'

import { initiateSpotifyLogin } from '@/lib/api/spotify-login'

export default function LandingPage() {
  const handleLogin = async () => {
    try {
      await initiateSpotifyLogin()
    } catch (error) {
      console.error('Failed to init login', error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold mb-8 text-green-500">Spotify Book Recommender</h1>

        <div className="text-center space-y-6 max-w-md">
          <p className="text-xl text-gray-300">
            Conectează-te cu Spotify pentru a descoperi cărți bazate pe gusturile tale muzicale.
          </p>

          {/* Butonul Oficial de Login */}
          <button
            onClick={handleLogin}
            className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 text-lg"
          >
            Connect with Spotify
          </button>

          {/* Buton SECRET pentru Testare Locală (Fără Backend) */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Development Mode</p>
            <button
              onClick={() => {
                // Setăm token-uri false și mergem direct la dashboard
                localStorage.setItem(
                  'app-storage',
                  JSON.stringify({
                    state: {
                      spotifyAccessToken: 'fake-token',
                      backendToken: 'fake-jwt',
                      theme: 'dark',
                    },
                    version: 0,
                  }),
                )
                window.location.href = '/dashboard'
              }}
              className="text-xs text-gray-400 hover:text-white underline border border-gray-700 px-4 py-2 rounded"
            >
              Skip Login (Mock Data Mode)
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
