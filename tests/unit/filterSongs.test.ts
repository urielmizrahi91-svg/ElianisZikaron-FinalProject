import { describe, expect, it } from 'vitest'
import { songs } from '../../src/data/songs'
import type { Song } from '../../src/data/songs'
import { filterSongs } from '../../src/lib/filterSongs'

const catalog: Song[] = [
  { id: 'first', title: 'שיר געגוע', description: 'מנגינה משפחתית' },
  { id: 'second', title: 'שיר הבית', description: 'Greek melody' },
  { id: 'third', title: 'ניגון', description: 'געגוע לבית' },
]

describe('חיפוש וסינון שירים', () => {
  it('מוצא התאמה בכותרת וגם בתיאור', () => {
    expect(filterSongs(catalog, 'געגוע', false, []).map(song => song.id)).toEqual(['first', 'third'])
  })
  it('מנקה רווחים בקצוות ומתעלם מהבדלי אותיות באנגלית', () => {
    expect(filterSongs(catalog, '  gReEk  ', false, [])).toEqual([catalog[1]])
  })
  it('מחזיר את כל הרשימה בחיפוש שמכיל רווחים בלבד', () => {
    expect(filterSongs(catalog, '   ', false, [])).toEqual(catalog)
  })
  it('מחזיר רשימה ריקה כאשר אין התאמה', () => {
    expect(filterSongs(catalog, 'טקסט שאינו קיים', false, [])).toEqual([])
  })
  it('משלב חיפוש עם סינון מועדפים בלי להחזיר שירים אחרים', () => {
    expect(filterSongs(catalog, 'געגוע', true, ['third', 'second'])).toEqual([catalog[2]])
  })
  it('מחזיר רשימה ריקה בסינון מועדפים ללא מזהים מוכרים', () => {
    expect(filterSongs(catalog, '', true, [])).toEqual([])
    expect(filterSongs(catalog, '', true, ['missing'])).toEqual([])
  })
  it('אינו מסנן לפי מועדפים כשהאפשרות כבויה ואינו משנה את נתוני המקור', () => {
    const snapshot = structuredClone(catalog)
    expect(filterSongs(catalog, '', false, ['second'])).toEqual(catalog)
    filterSongs(catalog, 'שיר', true, ['second'])
    expect(catalog).toEqual(snapshot)
  })
  it('משתמש במזהים ייחודיים בקטלוג האמיתי כך שכל מועדף מבודד שיר אחד', () => {
    expect(songs.length).toBeGreaterThan(0)
    expect(new Set(songs.map(song => song.id)).size).toBe(songs.length)
    for (const song of songs) {
      expect(song.id.trim()).not.toBe('')
      expect(filterSongs(songs, song.title, true, [song.id])).toEqual([song])
    }
  })
})
