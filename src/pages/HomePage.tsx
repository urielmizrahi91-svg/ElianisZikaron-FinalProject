import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="eyebrow">לזכרו של רבי אליהו (אליאניס) מזרחי ז״ל</p>
      <h1 id="intro-title">להכיר דרך השירים.</h1>
      <p className="intro-text">
        מוזיקה, תורה וחסד — מקום להאזין לשירים של אליאניס ולהכיר את
        סיפורו, מבית ילדותו בחיפה ועד לחייו במעלות־תרשיחא.
      </p>
      <Link className="button" to="/songs">אל השירים</Link>
      <Link className="home-about-link" to="/about">סיפורו של אליאניס</Link>
    </section>
  )
}
