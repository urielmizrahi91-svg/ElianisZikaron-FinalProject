import { useState } from 'react'
import { Link } from 'react-router-dom'
import { songs } from '../data/songs'

export default function SongList() {
  const [query, setQuery] = useState('')
  const searchText = query.trim().toLocaleLowerCase('he')
  const matchingSongs = songs.filter((song) =>
    `${song.title} ${song.description}`.toLocaleLowerCase('he').includes(searchText),
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

      <p className="results-count" role="status">
        {matchingSongs.length === 0
          ? 'לא נמצאו שירים. נסו לחפש מילים אחרות.'
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
          </article>
        ))}
      </div>
    </section>
  )
}
