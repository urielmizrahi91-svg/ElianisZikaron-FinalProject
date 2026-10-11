import PhotoGallery from '../components/PhotoGallery'
import MemorialPhoto from '../components/MemorialPhoto'
import { photos } from '../data/photos'

export default function AboutPage() {
  return (
    <PhotoGallery photos={[photos.rabbi, photos.home, photos.couple, photos.family, photos.later, photos.tribute]}>
      <section className="content-panel biography-magazine" aria-labelledby="about-title">
        <header className="biography-heading">
          <p className="eyebrow">תורה, חסד ומוזיקה</p>
          <h1 id="about-title">רבי אליהו (אליאניס) מזרחי ז״ל</h1>
          <p className="life-dates">18 במאי 1958 – 22 באוקטובר 2025</p>
        </header>
        <div className="biography-portrait"><MemorialPhoto photo={photos.rabbi} /></div>
        <section className="life-chapter" aria-labelledby="roots-title" data-reveal>
          <div className="chapter-copy">
            <p className="eyebrow">01 / השורשים</p>
            <h2 id="roots-title">שורשים וצלילים</h2>
            <p>
              אליהו מזרחי, המוכר בשם הבמה „אליאניס”, גדל בחיפה בבית של מסורת
              ומוזיקה. אביו ניהל להקה טורקית, ומגיל צעיר נחשף אליהו לניגונים
              ולצלילים שליוו אותו לאורך חייו. הוא למד לנגן בגיטרה ובהמשך התמחה בבוזוקי.
            </p>
          </div>
          <div className="biography-home"><MemorialPhoto photo={photos.home} /></div>
        </section>
        <section className="life-chapter music-chapter" aria-labelledby="music-story-title" data-reveal>
          <p className="chapter-number" aria-hidden="true">02</p>
          <div className="chapter-copy">
            <p className="eyebrow">הבמות והבוזוקי</p>
            <h2 id="music-story-title">הדרך המוזיקלית</h2>
            <p>
              בדרכו המוזיקלית הופיע בטברנות ולצד אמנים ובהם עופר לוי וזהבה בן.
              המחרוזות היווניות, ובהן „פיגה”, היו חלק מרכזי ביצירתו.
              בשנת 1984 כתב ושר את שיר האליפות הראשון של מכבי חיפה.
            </p>
          </div>
        </section>
        <section className="family-chapter" aria-labelledby="family-story-title" data-reveal>
          <p className="eyebrow">03 / הבית והמורשת</p>
          <h2 id="family-story-title">המשפחה, התורה והחסד</h2>
          <p>
            יחד עם רעייתו שושנה הקים משפחה של חמישה בנים וארבעה־עשר נכדים.
            בגיל 34 עבר למעלות־תרשיחא וחזר בתשובה. הוא הקדיש את לילותיו ללימוד
            תורה, לימד נגינה בבוזוקי, העביר שיעורי תורה ופעל למען צדקה והשכנת שלום.
            הוא נפטר בגיל 67 והותיר אחריו מורשת של משפחה, תורה, חסד וניגון.
          </p>
          <div className="photo-gallery biography-gallery">
            <MemorialPhoto photo={photos.couple} />
            <MemorialPhoto photo={photos.family} />
          </div>
        </section>
        <section className="archive-chapter" aria-labelledby="archive-title" data-reveal>
          <p className="eyebrow">04 / האלבום האישי</p>
          <h2 id="archive-title">זיכרונות שנשארים</h2>
          <div className="photo-gallery biography-gallery">
            <MemorialPhoto photo={photos.later} />
            <MemorialPhoto photo={photos.tribute} />
          </div>
        </section>
        <section className="biography-colophon" aria-labelledby="site-story-title">
          <h2 id="site-story-title">על האתר</h2>
          <p>
            האתר מוקדש לזכרו ולעילוי נשמתו של רבי אליהו בן יפה ז״ל,
            ומאפשר למשפחה ולמבקרים להכיר את שיריו ואת סיפורו.
            סיפור החיים נערך מתוך הדברים שמסרה המשפחה.
          </p>
        </section>
      </section>
    </PhotoGallery>
  )
}
