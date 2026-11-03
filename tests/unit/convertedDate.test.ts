import { describe, expect, it } from 'vitest'
import { isConvertedDate } from '../../src/lib/convertedDate'

const validDate = { hy: 5786, hm: 'Tishrei', hd: 30, gy: 2025, gm: 10, gd: 22 }

describe('אימות נתוני המרה מ־Hebcal', () => {
  it('מקבל תאריך תקין עבור השנה העברית שנבחרה', () => {
    expect(isConvertedDate(validDate, 5786)).toBe(true)
  })
  it('דוחה תשובה השייכת לשנה אחרת או ליום עברי אחר', () => {
    expect(isConvertedDate(validDate, 5787)).toBe(false)
    expect(isConvertedDate({ ...validDate, hm: 'Cheshvan' }, 5786)).toBe(false)
    expect(isConvertedDate({ ...validDate, hd: 29 }, 5786)).toBe(false)
  })
  it('דוחה תוכן חסר או ערכים שאינם אובייקט תאריך', () => {
    for (const value of [null, undefined, [], {}, '2025-10-22', 2025]) {
      expect(isConvertedDate(value, 5786)).toBe(false)
    }
  })
  it('דוחה שדות מספריים שהתקבלו כמחרוזת או כמספר לא שלם', () => {
    expect(isConvertedDate({ ...validDate, gy: '2025' }, 5786)).toBe(false)
    expect(isConvertedDate({ ...validDate, gd: 22.5 }, 5786)).toBe(false)
    expect(isConvertedDate({ ...validDate, gm: NaN }, 5786)).toBe(false)
  })
  it('דוחה תאריך שאינו קיים במקום לתת ל־Date לגלוש לחודש הבא', () => {
    expect(isConvertedDate({ ...validDate, gm: 2, gd: 31 }, 5786)).toBe(false)
    expect(isConvertedDate({ ...validDate, gm: 13 }, 5786)).toBe(false)
    expect(isConvertedDate({ ...validDate, gd: 0 }, 5786)).toBe(false)
  })
  it('מבחין בין 29 בפברואר בשנה מעוברת ובשנה רגילה', () => {
    expect(isConvertedDate({ ...validDate, gy: 2024, gm: 2, gd: 29 }, 5786)).toBe(true)
    expect(isConvertedDate({ ...validDate, gy: 2025, gm: 2, gd: 29 }, 5786)).toBe(false)
  })
})
