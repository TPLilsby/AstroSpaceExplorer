
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

const FAVORITES_KEY = 'astro_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY)
    if (stored) setFavorites(JSON.parse(stored))
  }

  const saveFavorites = async (updated: string[]) => {
    setFavorites(updated)
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  }

  const toggleFavorite = async (id: string) => {
    const isFav = favorites.includes(id)
    const updated = isFav
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id]
    await saveFavorites(updated)
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return { favorites, toggleFavorite, isFavorite }
}


