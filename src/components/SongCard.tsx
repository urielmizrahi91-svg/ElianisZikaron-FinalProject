import { Link } from 'react-router-dom'
import type { Song } from '../data/songs'
import FavoriteButton from './FavoriteButton'

export default function SongCard({ song }: { song: Song }) {
  return (
    <article className="song-card">
      <span className="music-icon" aria-hidden="true">♫</span>
      <p className="card-eyebrow">מחרוזת יוונית</p>
      <h2>{song.title}</h2>
      <p className="card-description">{song.description}</p>
      <div className="card-actions">
        <Link className="button" aria-label={`האזנה למחרוזת: ${song.title}`} to={`/songs/${song.id}`}>
          האזנה למחרוזת
        </Link>
        <FavoriteButton song={song} />
      </div>
    </article>
  )
}
