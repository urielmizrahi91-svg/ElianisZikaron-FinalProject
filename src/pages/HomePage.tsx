import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="eyebrow">למשפחה, ולכל מי שרוצה להכיר</p>
      <h1 id="intro-title">להכיר דרך השירים.</h1>
      <p className="intro-text">
        מקום להאזין לשירים של אליאניס, להכיר את הסיפורים שמאחוריהם
        ולשמור את המילים קרובות.
      </p>
      <Link className="button" to="/songs">אל השירים</Link>
    </section>
  )
}
