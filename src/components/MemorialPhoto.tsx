import { usePhotoGallery } from './PhotoGallery'
import type { Photo } from '../data/photos'

interface MemorialPhotoProps {
  photo: Photo
  priority?: boolean
  className?: string
}

export default function MemorialPhoto({ photo, priority = false, className = '' }: MemorialPhotoProps) {
  const openGallery = usePhotoGallery()
  const image = (
    <img
      src={`/images/${photo.file}`}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  )
  return (
    <figure className={`memorial-photo ${className}`}>
      {openGallery ? (
        <button className="photo-open" type="button" onClick={() => openGallery(photo)} aria-label={`הגדלת תמונה: ${photo.caption}`} aria-haspopup="dialog">
          {image}
          <span className="photo-expand" aria-hidden="true">⤢</span>
        </button>
      ) : image}
      <figcaption>{photo.caption}</figcaption>
    </figure>
  )
}
