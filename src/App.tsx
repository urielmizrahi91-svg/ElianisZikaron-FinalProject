import SongList from './components/SongList'

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
            מקום להאזין לשירים של אליאניס, להכיר את הסיפורים שמאחוריהם
            ולשמור את המילים קרובות.
          </p>
          <a className="button" href="#songs">אל השירים</a>
        </section>

        <SongList />
      </main>

      <footer>אליאניס — זיכרון במילים</footer>
    </div>
  )
}
