import { Link } from 'react-router-dom'
import SongCard from '../components/SongCard'
import { songs } from '../data/songs'
import MemorialPhoto from '../components/MemorialPhoto'
import { photos } from '../data/photos'

export default function HomePage() {
  return (
    <>
      <section className="intro" aria-labelledby="intro-title">
        <div className="intro-copy">
          <p className="eyebrow">מוזיקה. תורה. חיים שלמים.</p>
          <h1 id="intro-title"><span>להכיר</span>{' '}<span>דרך השירים.</span></h1>
          <p className="intro-text">
            מוזיקה, תורה וחסד — מקום להאזין לשירים של אליאניס ולהכיר את
            סיפורו, מבית ילדותו בחיפה ועד לחייו במעלות־תרשיחא.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/songs">אל השירים</Link>
            <Link className="home-about-link" to="/about">סיפורו של אליאניס</Link>
          </div>
          <p className="hero-dedication">לזכרו של רבי אליהו (אליאניס) מזרחי ז״ל</p>
        </div>
        <MemorialPhoto photo={photos.bouzouki} priority />
      </section>

      <section className="home-section" data-reveal aria-labelledby="home-songs-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / המוזיקה</p>
            <h2 id="home-songs-title">להאזין ולהיזכר</h2>
          </div>
          <Link to="/songs">לכל השירים ולחיפוש</Link>
        </div>
        <div className="song-list">
          {songs.map((song) => <SongCard key={song.id} song={song} />)}
        </div>
      </section>

      <section className="home-section music-gallery-section" data-reveal aria-labelledby="music-photos-title">
        <div className="content-container">
          <p className="eyebrow">02 / רגעים מתוך האלבום</p>
          <h2 id="music-photos-title">הבוזוקי, הבמה והניגון</h2>
          <div className="photo-gallery">
            <MemorialPhoto photo={photos.sunset} className="gallery-sunset" />
            <MemorialPhoto photo={photos.album} className="gallery-album" />
            <MemorialPhoto photo={photos.singer} className="gallery-singer" />
          </div>
        </div>
      </section>

      <section className="memory-panel" data-reveal aria-labelledby="memory-title">
        <div>
          <p className="eyebrow">03 / הסיפור שממשיך</p>
          <h2 id="memory-title">מורשת של ניגון ושל נתינה</h2>
          <p>
            מן הבמות והבוזוקי אל לימוד התורה והחיים במעלות־תרשיחא,
            סיפורו של אליאניס מחבר בין אהבת המוזיקה, המשפחה והאדם.
          </p>
          <Link to="/about">לקריאת סיפור החיים</Link>
        </div>
        <MemorialPhoto photo={photos.torah} />
      </section>

      <section className="quiz-invitation home-section" data-reveal aria-labelledby="quiz-invitation-title">
        <p className="eyebrow">להכיר קצת יותר</p>
        <h2 id="quiz-invitation-title">מאחורי כל ניגון,<br />יש סיפור.</h2>
        <p>חמש שאלות על הדרך של אליאניס. רגע קטן של היכרות.</p>
        <Link className="button" to="/quiz">לחידון המורשת</Link>
      </section>
    </>
  )
}
