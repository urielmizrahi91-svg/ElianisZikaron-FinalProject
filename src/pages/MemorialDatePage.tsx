import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { memorialDateExplanation, memorialYears } from '../data/memorialYears'
import { isConvertedDate } from '../lib/convertedDate'
import type { ConvertedDate } from '../lib/convertedDate'

type ConversionState =
  | { status: 'loading' }
  | { status: 'success'; year: number; date: ConvertedDate }
  | { status: 'error' }

export default function MemorialDatePage() {
  const { year: yearParam } = useParams()
  const selectedYear = memorialYears.find(item => String(item.year) === yearParam)
  const year = selectedYear?.year
  const [state, setState] = useState<ConversionState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (year === undefined) return
    const controller = new AbortController()
    let active = true
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    setState({ status: 'loading' })

    async function loadDate() {
      try {
        const params = new URLSearchParams({ cfg: 'json', hy: String(year), hm: 'Tishrei', hd: '30', h2g: '1', strict: '1' })
        const response = await fetch(`https://www.hebcal.com/converter?${params}`, { signal: controller.signal })
        if (!response.ok) throw new Error('Date conversion failed')
        const data: unknown = await response.json()
        if (year === undefined || !isConvertedDate(data, year)) throw new Error('Invalid date response')
        if (active) setState({ status: 'success', year, date: data })
      } catch {
        if (active) setState({ status: 'error' })
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void loadDate()
    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [year, attempt])

  if (!selectedYear) {
    return (
      <section className="content-panel">
        <h1>השנה לא נמצאה</h1>
        <p>אפשר לבחור שנה מתוך רשימת התאריכים לזיכרון.</p>
        <Link className="back-link" to="/memorial-dates">חזרה לתאריכים לזיכרון</Link>
      </section>
    )
  }

  const currentState = state.status === 'success' && state.year !== year ? { status: 'loading' as const } : state
  return (
    <section className="content-panel">
      <Link className="back-link" to="/memorial-dates">חזרה לתאריכים לזיכרון</Link>
      <h1>ל׳ בתשרי {selectedYear.label}</h1>
      <p>{memorialDateExplanation}</p>
      {currentState.status === 'loading' && <p role="status">טוען את התאריך מ־Hebcal…</p>}
      {currentState.status === 'error' && (
        <div role="alert">
          <p>לא הצלחנו לטעון את התאריך מ־Hebcal. בדקו את החיבור לאינטרנט ונסו שוב.</p>
          <button className="button" type="button" onClick={() => setAttempt(previous => previous + 1)}>ניסיון נוסף</button>
        </div>
      )}
      {currentState.status === 'success' && (
        <p role="status">התאריך הלועזי המקביל: <time dateTime={`${currentState.date.gy}-${String(currentState.date.gm).padStart(2, '0')}-${String(currentState.date.gd).padStart(2, '0')}`}>
          {new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(currentState.date.gy, currentState.date.gm - 1, currentState.date.gd)))}
        </time></p>
      )}
      <p>המרת תאריך בלבד, ללא חישוב זמני שקיעה או הנחיות הלכתיות.</p>
      <p>מקור הנתונים: <a href="https://www.hebcal.com/">Hebcal</a>.</p>
    </section>
  )
}
