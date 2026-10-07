import { Link, useParams } from 'react-router-dom'
import SongPlayer from '../components/SongPlayer'
import { songs } from '../data/songs'
import FavoriteButton from '../components/FavoriteButton'
import { useFavorites } from '../context/FavoritesContext'

export default function SongPage() {
  const { songId } = useParams()
  const { storageAvailable } = useFavorites()
  const song = songs.find((item) => item.id === songId)

  if (!song) {
    return (
      <section className="content-panel">
        <h1>השיר לא נמצא</h1>
        <p>לא נמצא שיר בכתובת הזו. אפשר לחזור לרשימה ולבחור שיר.</p>
        <Link className="button" to="/songs">חזרה לשירים</Link>
      </section>
    )
  }

  return (
    <section className="content-panel" aria-labelledby="song-title">
      <Link className="back-link" to="/songs">חזרה לכל השירים</Link>
      <h1 id="song-title">{song.title}</h1>
      <p>{song.description}</p>
      <FavoriteButton song={song} />
      {!storageAvailable && (
        <p role="status">הדפדפן לא מאפשר לשמור מועדפים. הבחירה תישמר רק עד לרענון העמוד.</p>
      )}
      <SongPlayer song={song} />
    </section>
  )
}
