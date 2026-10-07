import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { songs } from '../data/songs'

export default function RouteFocus() {
  const { pathname } = useLocation()

  useEffect(() => {
    const song = songs.find((item) => pathname === `/songs/${item.id}`)
    const pageTitle = pathname === '/'
      ? 'בית'
      : pathname === '/songs'
        ? 'השירים'
        : pathname === '/about'
          ? 'סיפור החיים'
          : song?.title ?? 'העמוד לא נמצא'
    document.title = `${pageTitle} | אליאניס — זיכרון במילים`
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}
