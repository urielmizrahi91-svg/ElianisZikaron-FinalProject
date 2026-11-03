import { Link } from 'react-router-dom'
import { memorialDateExplanation, memorialYears } from '../data/memorialYears'

export default function MemorialDatesPage() {
  return (
    <section className="content-panel">
      <h1>תאריכים לזיכרון</h1>
      <p>לזכר רבי אליהו (אליאניס) מזרחי ז״ל. תאריך הפטירה: ל׳ בתשרי תשפ״ו, 22.10.2025 — א׳ דראש חודש חשוון.</p>
      <p>{memorialDateExplanation}</p>
      <p>בחרו שנה כדי להציג את התאריך הלועזי המקביל לל׳ בתשרי.</p>
      <ul className="memorial-years">
        {memorialYears.map(({ year, label }) => (
          <li key={year}><Link to={`/memorial-dates/${year}`}>ל׳ בתשרי {label}</Link></li>
        ))}
      </ul>
      <p>המרות התאריכים באדיבות <a href="https://www.hebcal.com/">Hebcal</a>.</p>
    </section>
  )
}
