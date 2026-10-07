export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <span className="site-name">אליאניס</span>
        <span>זיכרון במילים</span>
      </header>

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">למשפחה, ולכל מי שרוצה להכיר</p>
          <h1 id="intro-title">להכיר דרך השירים.</h1>
          <p className="intro-text">
            מקום לקרוא את השירים של אליאניס, להכיר את הסיפורים שמאחוריהם
            ולשמור את המילים קרובות.
          </p>
          <a className="button" href="#songs">אל השירים</a>
        </section>

        <section className="songs" id="songs" aria-labelledby="songs-title">
          <h2 id="songs-title">השירים של אליאניס</h2>
          <p>השירים יתווספו כאן בהמשך, לאחר קבלת התוכן מהמשפחה.</p>
        </section>
      </main>

      <footer>אליאניס — זיכרון במילים</footer>
    </div>
  )
}
