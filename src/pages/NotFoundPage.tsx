import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="content-panel">
      <h1>העמוד לא נמצא</h1>
      <p>הכתובת אינה מובילה לעמוד באתר.</p>
      <Link className="button" to="/">חזרה לדף הבית</Link>
    </section>
  )
}
