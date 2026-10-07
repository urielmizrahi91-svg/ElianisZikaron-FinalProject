import { Link } from 'react-router-dom'
import SongCard from '../components/SongCard'
import { songs } from '../data/songs'

export default function HomePage() {
  return (
    <>
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

      <section className="home-section" aria-labelledby="home-songs-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">הצלילים שנשארים איתנו</p>
            <h2 id="home-songs-title">להאזין ולהיזכר</h2>
          </div>
          <Link to="/songs">לכל השירים ולחיפוש</Link>
        </div>
        <div className="song-list">
          {songs.map((song) => <SongCard key={song.id} song={song} />)}
        </div>
      </section>

      <section className="memory-panel" aria-labelledby="memory-title">
        <p className="eyebrow">משפחה, תורה וחסד</p>
        <h2 id="memory-title">מורשת של ניגון ושל נתינה</h2>
        <p>
          מן הבמות והבוזוקי אל לימוד התורה והחיים במעלות־תרשיחא,
          סיפורו של אליאניס מחבר בין אהבת המוזיקה, המשפחה והאדם.
        </p>
        <Link to="/about">לקריאת סיפור החיים</Link>
      </section>
    </>
  )
}
