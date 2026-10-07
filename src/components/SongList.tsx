import { useState } from 'react'
import { songs } from '../data/songs'

export default function SongList() {
  const [query, setQuery] = useState('')
  const searchText = query.trim().toLocaleLowerCase('he')
  const matchingSongs = songs.filter((song) =>
    `${song.title} ${song.description}`.toLocaleLowerCase('he').includes(searchText),
  )

  return (
    <section className="songs" id="songs" aria-labelledby="songs-title">
      <h2 id="songs-title">השירים של אליאניס</h2>
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
            <h3>{song.title}</h3>
            <p>{song.description}</p>
            <iframe
              className="song-video"
              src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}`}
              title={`נגן YouTube: ${song.title}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <a
              className="youtube-link"
              href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              צפייה ב־YouTube (נפתח בלשונית חדשה)
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
