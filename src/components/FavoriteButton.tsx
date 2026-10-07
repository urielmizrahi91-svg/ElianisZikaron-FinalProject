import { useFavorites } from '../context/FavoritesContext'
import type { Song } from '../data/songs'

export default function FavoriteButton({ song }: { song: Song }) {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const isFavorite = favoriteIds.includes(song.id)

  return (
    <button
      className="favorite-button"
      type="button"
      aria-pressed={isFavorite}
      aria-label={`${isFavorite ? 'הסרה מהמועדפים' : 'שמירה במועדפים'}: ${song.title}`}
      onClick={() => toggleFavorite(song.id)}
    >
      <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>{' '}
      {isFavorite ? 'הסרה מהמועדפים' : 'שמירה במועדפים'}
    </button>
  )
}
