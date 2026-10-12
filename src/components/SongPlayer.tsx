import type { Song } from '../data/songs'

interface SongPlayerProps {
  song: Song
}

export default function SongPlayer({ song }: SongPlayerProps) {
  const spotifyLink = song.links?.find(link => new URL(link.url).hostname === 'open.spotify.com')
  const amazonLink = song.links?.find(link => new URL(link.url).pathname.startsWith('/albums/'))
  const embeddedLink = spotifyLink ?? amazonLink
  const embedUrl = embeddedLink
    ? spotifyLink
      ? `https://open.spotify.com/embed${new URL(spotifyLink.url).pathname}`
      : `https://music.amazon.com/embed/${new URL(embeddedLink.url).pathname.split('/').pop()}`
    : undefined

  return (
    <div>
      {song.youtubeId && <>
      <iframe
        className="song-video"
        src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}`}
        title={`נגן YouTube: ${song.title}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <p className="player-note">אם הנגן לא זמין, אפשר לפתוח את הסרטון ב־YouTube בקישור הבא.</p>
      <a
        className="youtube-link"
        href={`https://www.youtube.com/watch?v=${song.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        צפייה ב־YouTube (נפתח בלשונית חדשה)
      </a>
      </>}
      {!song.youtubeId && embedUrl && (
        <div className="streaming-player">
          <h2>{embeddedLink?.label}</h2>
          <iframe
            className="song-stream"
            src={embedUrl}
            title={`נגן ${spotifyLink ? 'Spotify' : 'Amazon Music'}: ${song.title}`}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}
      {!!song.links?.length && (
        <div className="listening-links">
          <h2>האזנה</h2>
          <ul>
            {song.links.map((link) => (
              <li key={link.url}>
                <a className="youtube-link" href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label} (נפתח בלשונית חדשה)
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
