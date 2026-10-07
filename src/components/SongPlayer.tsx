import type { Song } from '../data/songs'

interface SongPlayerProps {
  song: Song
}

export default function SongPlayer({ song }: SongPlayerProps) {
  return (
    <div>
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
    </div>
  )
}
