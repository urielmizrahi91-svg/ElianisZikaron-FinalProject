import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Song } from '../data/songs'
import FavoriteButton from './FavoriteButton'

export default function SongCard({ song }: { song: Song }) {
  const [thumbnailUnavailable, setThumbnailUnavailable] = useState(false)
  return (
    <article className="song-card">
      <div className="song-artwork">
        <img
          src={thumbnailUnavailable || !song.youtubeId ? '/images/album-cover.png' : `https://i.ytimg.com/vi/${song.youtubeId}/hqdefault.jpg`}
          alt=""
          width={480}
          height={360}
          loading="lazy"
          onError={() => { if (!thumbnailUnavailable) setThumbnailUnavailable(true) }}
        />
        <span className="artwork-play" aria-hidden="true">▶</span>
      </div>
      <p className="card-eyebrow">{song.title.includes('מחרוזת') ? 'מחרוזת יוונית' : 'שיר של אליאניס'}</p>
      <h2>{song.title}</h2>
      <p className="card-description">{song.description}</p>
      <div className="card-actions">
        <Link className="button" aria-label={`${song.youtubeId ? 'האזנה למחרוזת' : 'האזנה לשיר'}: ${song.title}`} to={`/songs/${song.id}`}>
          {song.youtubeId ? 'האזנה למחרוזת' : 'האזנה לשיר'}
        </Link>
        <FavoriteButton song={song} />
      </div>
    </article>
  )
}
