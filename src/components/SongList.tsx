import { useState } from 'react'
import { Link } from 'react-router-dom'
import { songs } from '../data/songs'
import FavoriteButton from './FavoriteButton'
import { useFavorites } from '../context/FavoritesContext'

export default function SongList() {
  const [query, setQuery] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const { favoriteIds, storageAvailable } = useFavorites()
  const searchText = query.trim().toLocaleLowerCase('he')
  const matchingSongs = songs.filter((song) =>
    `${song.title} ${song.description}`.toLocaleLowerCase('he').includes(searchText)
      && (!favoritesOnly || favoriteIds.includes(song.id)),
  )

  return (
    <section className="songs" id="songs" aria-labelledby="songs-title">
      <h1 id="songs-title">השירים של אליאניס</h1>
      <label className="search-label" htmlFor="song-search">חיפוש בשירים</label>
      <input
        id="song-search"
        className="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="חיפוש לפי שם או תיאור"
      />

      <label className="favorites-filter">
        <input
          type="checkbox"
          checked={favoritesOnly}
          onChange={(event) => setFavoritesOnly(event.target.checked)}
        />
        רק המועדפים שלי ({favoriteIds.length})
      </label>
      <p className="favorites-note">
        {storageAvailable
          ? 'המועדפים נשמרים בדפדפן הזה, ללא צורך בחשבון.'
          : 'הדפדפן לא מאפשר לשמור מועדפים. הבחירה תישמר רק עד לרענון העמוד.'}
      </p>

      <p className="results-count" role="status">
        {matchingSongs.length === 0
          ? favoritesOnly && favoriteIds.length === 0
            ? 'עדיין אין מועדפים. בטלו את הסינון ובחרו שיר לשמירה.'
            : 'לא נמצאו שירים. נסו לשנות את החיפוש או את סינון המועדפים.'
          : `מספר השירים שנמצאו: ${matchingSongs.length}`}
      </p>

      <div className="song-list">
        {matchingSongs.map((song) => (
          <article className="song-card" key={song.id}>
            <h2>{song.title}</h2>
            <p>{song.description}</p>
            <Link className="button" to={`/songs/${song.id}`}>
              צפייה והאזנה: {song.title}
            </Link>
            <FavoriteButton song={song} />
          </article>
        ))}
      </div>
    </section>
  )
}
