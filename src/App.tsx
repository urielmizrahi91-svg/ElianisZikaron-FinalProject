import SongList from './components/SongList'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SongPage from './pages/SongPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import RouteFocus from './components/RouteFocus'
import { FavoritesProvider } from './context/FavoritesContext'

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <RouteFocus />
        <div className="page">
          <a className="skip-link" href="#main-content">דילוג לתוכן</a>
          <header className="site-header">
            <Link className="site-name" to="/">אליאניס</Link>
            <nav className="site-nav" aria-label="ניווט ראשי">
              <NavLink to="/" end>בית</NavLink>
              <NavLink to="/songs">השירים</NavLink>
              <NavLink to="/about">אודות</NavLink>
            </nav>
          </header>

          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/songs" element={<SongList />} />
              <Route path="/songs/:songId" element={<SongPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <footer className="site-footer">
            <strong>אליאניס — זיכרון במילים</strong>
            <p>לזכרו ולעילוי נשמתו של רבי אליהו (אליאניס) מזרחי ז״ל בן יפה</p>
            <p>מוקדש באהבה על ידי המשפחה</p>
          </footer>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  )
}
