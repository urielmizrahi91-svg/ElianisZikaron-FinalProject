import type { Photo } from '../data/photos'

interface MemorialPhotoProps {
  photo: Photo
  priority?: boolean
  className?: string
}

export default function MemorialPhoto({ photo, priority = false, className = '' }: MemorialPhotoProps) {
  return (
    <figure className={`memorial-photo ${className}`}>
      <img
        src={`/images/${photo.file}`}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  )
}
