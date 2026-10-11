import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { Photo } from '../data/photos'

const GalleryContext = createContext<((photo: Photo) => void) | null>(null)
export const usePhotoGallery = () => useContext(GalleryContext)

export default function PhotoGallery({ photos, children }: { photos: Photo[]; children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const isOpen = index !== null
  const photo = index === null ? null : photos[index]

  useEffect(() => {
    if (!isOpen) return
    const modal = dialog.current!
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modal.showModal()
    return () => {
      modal.close()
      document.body.style.overflow = previousOverflow
      trigger.current?.focus({ preventScroll: true })
    }
  }, [isOpen])

  function move(direction: number) {
    setIndex(current => current === null ? null : (current + direction + photos.length) % photos.length)
  }

  return (
    <GalleryContext.Provider value={selected => {
      trigger.current = document.activeElement as HTMLElement
      setIndex(photos.indexOf(selected))
    }}>
      {children}
      <dialog
        ref={dialog}
        className="photo-lightbox"
        aria-label="גלריית תמונות"
        onCancel={() => setIndex(null)}
        onClick={event => { if (event.target === event.currentTarget) setIndex(null) }}
        onKeyDown={event => {
          if (event.key === 'Tab') {
            const controls = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button')]
            const first = controls[0]
            const last = controls[controls.length - 1]
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault()
              last?.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault()
              first?.focus()
            }
          }
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(-1) }
        }}
      >
        {photo && (
          <div className="lightbox-content">
            <div className="lightbox-toolbar">
              <p role="status" aria-atomic="true">תמונה {index! + 1} מתוך {photos.length} — {photo.caption}</p>
              <button type="button" autoFocus onClick={() => setIndex(null)} aria-label="סגירת הגלריה">סגירה ×</button>
            </div>
            <img className="lightbox-image" src={`/images/${photo.file}`} alt={photo.alt} width={photo.width} height={photo.height} />
            <div className="lightbox-navigation">
              <button type="button" onClick={() => move(-1)}>→ התמונה הקודמת</button>
              <button type="button" onClick={() => move(1)}>התמונה הבאה ←</button>
            </div>
            <p className="lightbox-hint">אפשר לעבור עם מקשי החצים ולסגור עם Escape.</p>
          </div>
        )}
      </dialog>
    </GalleryContext.Provider>
  )
}
