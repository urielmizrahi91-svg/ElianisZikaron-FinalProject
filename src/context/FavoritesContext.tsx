import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { songs } from '../data/songs'

const storageKey = 'elianis-favorites'

interface FavoritesContextValue {
  favoriteIds: string[]
  toggleFavorite: (songId: string) => void
  storageAvailable: boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function readFavorites(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    if (!Array.isArray(saved)) return []
    return songs.filter((song) => saved.includes(song.id)).map((song) => song.id)
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(readFavorites)
  const [storageAvailable, setStorageAvailable] = useState(true)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(favoriteIds))
      setStorageAvailable(true)
    } catch {
      setStorageAvailable(false)
    }
  }, [favoriteIds])

  function toggleFavorite(songId: string) {
    setFavoriteIds((previous) =>
      previous.includes(songId)
        ? previous.filter((id) => id !== songId)
        : [...previous, songId],
    )
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, storageAvailable }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites requires FavoritesProvider')
  return context
}
