import MemorialPhoto from '../components/MemorialPhoto'
import { photos } from '../data/photos'

export default function AboutPage() {
  return (
    <section className="content-panel" aria-labelledby="about-title">
      <p className="eyebrow">תורה, חסד ומוזיקה</p>
      <h1 id="about-title">רבי אליהו (אליאניס) מזרחי ז״ל</h1>
      <p className="life-dates">18 במאי 1958 – 22 באוקטובר 2025</p>
      <div className="biography-portrait"><MemorialPhoto photo={photos.rabbi} /></div>
      <h2>שורשים וצלילים</h2>
      <p>
        אליהו מזרחי, המוכר בשם הבמה „אליאניס”, גדל בחיפה בבית של מסורת
        ומוזיקה. אביו ניהל להקה טורקית, ומגיל צעיר נחשף אליהו לניגונים
        ולצלילים שליוו אותו לאורך חייו. הוא למד לנגן בגיטרה ובהמשך התמחה בבוזוקי.
      </p>
      <div className="biography-home"><MemorialPhoto photo={photos.home} /></div>
      <h2>הדרך המוזיקלית</h2>
      <p>
        בדרכו המוזיקלית הופיע בטברנות ולצד אמנים ובהם עופר לוי וזהבה בן.
        המחרוזות היווניות, ובהן „פיגה”, היו חלק מרכזי ביצירתו.
        בשנת 1984 כתב ושר את שיר האליפות הראשון של מכבי חיפה.
      </p>
      <h2>המשפחה, התורה והחסד</h2>
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
      <h2>זיכרונות שנשארים</h2>
      <div className="photo-gallery biography-gallery">
        <MemorialPhoto photo={photos.later} />
        <MemorialPhoto photo={photos.tribute} />
      </div>
      <h2>על האתר</h2>
      <p>
        האתר מוקדש לזכרו ולעילוי נשמתו של רבי אליהו בן יפה ז״ל,
        ומאפשר למשפחה ולמבקרים להכיר את שיריו ואת סיפורו.
        סיפור החיים נערך מתוך הדברים שמסרה המשפחה.
      </p>
    </section>
  )
}
