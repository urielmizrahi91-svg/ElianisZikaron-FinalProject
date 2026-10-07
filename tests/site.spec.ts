import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const videos = [
  { id: 'figa-medley', title: 'מחרוזת פיגה', video: 'O4NNTlaoBi8' },
  { id: 'bom-pam-oseksizim', title: 'מחרוזת בומפם, אוסקסיזים', video: 'YnhANi6wFZg' },
  { id: 'manolia-ligo-ligo', title: 'מחרוזת: מנוליה, ליגו ליגו', video: 'mPRpXih2A7o' },
]

test.beforeEach(async ({ page }) => {
  // These tests cover our interface; video playback is checked separately.
  await page.route('https://www.youtube-nocookie.com/**', (route) => route.abort())
})

test('home presents the memorial and links to songs and biography', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'he')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('להכיר דרך השירים.')
  await expect(page.locator('.song-card')).toHaveCount(3)
  await page.getByRole('link', { name: 'סיפורו של אליאניס', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('רבי אליהו (אליאניס) מזרחי ז״ל')
  await expect(page.locator('main')).toContainText('סיפור החיים נערך מתוך הדברים שמסרה המשפחה')
  expect(errors).toEqual([])
})

test('search handles names, descriptions, whitespace and no results', async ({ page }) => {
  await page.goto('/songs')
  const search = page.getByLabel('חיפוש בשירים')
  await search.fill('  ליגו  ')
  await expect(page.locator('.song-card')).toHaveCount(1)
  await expect(page.locator('.song-card')).toContainText('מנוליה')
  await search.fill('המשפחה')
  await expect(page.locator('.song-card')).toHaveCount(1)
  await expect(page.locator('.song-card')).toContainText('פיגה')
  await search.fill('איןמילהכזאת')
  await expect(page.locator('.song-card')).toHaveCount(0)
  await expect(page.getByRole('status')).toContainText('לא נמצאו שירים')
  await search.fill('')
  await expect(page.locator('.song-card')).toHaveCount(3)
})

test('each song has its own route, player and direct YouTube link', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'אל השירים', exact: true }).click()
  for (const song of videos) {
    await page.getByRole('link', { name: `צפייה והאזנה: ${song.title}`, exact: true }).click()
    await expect(page).toHaveURL(`/songs/${song.id}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(song.title)
    await expect(page.locator('iframe')).toHaveAttribute('src', `https://www.youtube-nocookie.com/embed/${song.video}`)
    await expect(page.locator('iframe')).toHaveAttribute('title', `נגן YouTube: ${song.title}`)
    await expect(page.getByRole('link', { name: /צפייה ב־YouTube/ })).toHaveAttribute('href', `https://www.youtube.com/watch?v=${song.video}`)
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(song.title)
    await expect(page).toHaveTitle(`${song.title} | אליאניס — זיכרון במילים`)
    await page.getByRole('link', { name: 'חזרה לכל השירים', exact: true }).click()
    await expect(page.locator('.song-card')).toHaveCount(3)
  }
})

test('navigation marks the current page and supports browser back', async ({ page }) => {
  await page.goto('/songs')
  await expect(page.getByRole('link', { name: 'השירים', exact: true })).toHaveAttribute('aria-current', 'page')
  await page.getByRole('link', { name: 'אודות', exact: true }).click()
  await expect(page.getByRole('link', { name: 'אודות', exact: true })).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('main')).toBeFocused()
  await page.goBack()
  await expect(page.getByLabel('חיפוש בשירים')).toBeVisible()
})

test('unknown pages and songs offer a working return link', async ({ page }) => {
  await page.goto('/missing-page')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('העמוד לא נמצא')
  await page.getByRole('link', { name: 'חזרה לדף הבית' }).click()
  await expect(page).toHaveURL('/')
  await page.goto('/songs/missing-song')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('השיר לא נמצא')
  await page.getByRole('link', { name: 'חזרה לשירים', exact: true }).click()
  await expect(page.locator('.song-card')).toHaveCount(3)
})

test('favorites share state across pages, persist and can be removed', async ({ page }) => {
  await page.goto('/')
  const saveName = 'שמירה במועדפים: מחרוזת פיגה'
  const removeName = 'הסרה מהמועדפים: מחרוזת פיגה'
  await page.getByRole('button', { name: saveName, exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: removeName, exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('link', { name: 'אל השירים', exact: true }).click()
  await page.getByRole('checkbox', { name: /רק המועדפים/ }).check()
  await expect(page.locator('.song-card')).toHaveCount(1)
  await page.getByLabel('חיפוש בשירים').fill('בומפם')
  await expect(page.getByRole('status')).toContainText('לא נמצאו שירים')
  await page.getByLabel('חיפוש בשירים').fill('')
  await page.getByRole('link', { name: 'צפייה והאזנה: מחרוזת פיגה', exact: true }).click()
  await page.reload()
  await expect(page.getByRole('button', { name: removeName, exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: removeName, exact: true }).click()
  await page.getByRole('link', { name: 'חזרה לכל השירים', exact: true }).click()
  await page.getByRole('checkbox', { name: /רק המועדפים/ }).check()
  await expect(page.getByRole('status')).toContainText('עדיין אין מועדפים')
})

test('corrupt stored favorites do not break the application', async ({ page }) => {
  await page.goto('/songs')
  await page.evaluate(() => localStorage.setItem('elianis-favorites', 'invalid-json'))
  await page.reload()
  await expect(page.getByRole('button', { name: /שמירה במועדפים/ })).toHaveCount(3)
  await page.evaluate(() => localStorage.setItem('elianis-favorites', JSON.stringify(['unknown', null, 'figa-medley', 'figa-medley'])))
  await page.reload()
  await expect(page.getByRole('checkbox', { name: /רק המועדפים/ })).toHaveAccessibleName('רק המועדפים שלי (1)')
})

test('blocked storage keeps favorites usable and explains the limitation', async ({ page }) => {
  await page.addInitScript(() => {
    for (const name of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, name, {
        value() { throw new DOMException('Storage blocked', 'SecurityError') },
      })
    }
  })
  await page.goto('/songs')
  await expect(page.getByText('הדפדפן לא מאפשר לשמור מועדפים. הבחירה תישמר רק עד לרענון העמוד.', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'שמירה במועדפים: מחרוזת פיגה', exact: true }).click()
  await page.getByRole('link', { name: 'צפייה והאזנה: מחרוזת פיגה', exact: true }).click()
  await expect(page.getByRole('button', { name: 'הסרה מהמועדפים: מחרוזת פיגה', exact: true })).toHaveAttribute('aria-pressed', 'true')
})

test('keyboard navigation reaches the skip link and content', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'דילוג לתוכן' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
})

test('all main pages fit the viewport and pass automated accessibility checks', async ({ page }) => {
  for (const route of ['/', '/songs', '/songs/figa-medley', '/about', '/quiz']) {
    await page.goto(route)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(result.violations).toEqual([])
  }
})

test('quiz counts correct answers once and restarts cleanly', async ({ page }) => {
  await page.goto('/quiz')
  await expect(page.getByRole('button', { name: 'לשאלה הבאה' })).toBeDisabled()
  const answers = ['חיפה', 'בוזוקי', 'מכבי חיפה', 'מעלות־תרשיחא', 'לימוד תורה']
  for (const [index, answer] of answers.entries()) {
    await page.getByRole('button', { name: answer, exact: true }).click()
    await expect(page.getByRole('status')).toContainText('תשובה נכונה!')
    await expect(page.getByRole('button', { name: answer, exact: true })).toBeDisabled()
    await page.getByRole('button', { name: index === 4 ? 'לסיכום' : 'לשאלה הבאה' }).click()
  }
  await expect(page.getByRole('heading', { name: 'החידון הסתיים' })).toBeFocused()
  await expect(page.locator('.quiz-score')).toHaveText('הניקוד שלכם: 5 מתוך 5')
  await page.getByRole('button', { name: 'התחלה מחדש' }).click()
  await expect(page.getByRole('heading', { name: 'באיזו עיר גדל אליאניס?' })).toBeFocused()
  await expect(page.locator('.quiz-panel')).toContainText('שאלה 1 מתוך 5 · ניקוד: 0')
  await expect(page.getByRole('button', { name: 'חיפה', exact: true })).toBeEnabled()
})

test('quiz gives feedback for wrong answers and works by keyboard', async ({ page }) => {
  await page.goto('/quiz')
  const answers = ['ירושלים', 'פסנתר', 'מכבי חיפה', 'מעלות־תרשיחא', 'לימוד תורה']
  for (const [index, answer] of answers.entries()) {
    await page.getByRole('button', { name: answer, exact: true }).focus()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('status')).toContainText(index < 2 ? 'התשובה הנכונה:' : 'תשובה נכונה!')
    await page.getByRole('button', { name: index === 4 ? 'לסיכום' : 'לשאלה הבאה' }).click()
  }
  await expect(page.locator('.quiz-score')).toHaveText('הניקוד שלכם: 3 מתוך 5')
  await page.getByRole('link', { name: 'לסיפור החיים', exact: true }).click()
  await expect(page).toHaveURL('/about')
})

test('all family photos load with descriptions and retain their proportions', async ({ page }) => {
  for (const [route, count] of [['/', 5], ['/about', 6]] as const) {
    await page.goto(route)
    const pictures = page.locator('.memorial-photo img')
    await expect(pictures).toHaveCount(count)
    for (const picture of await pictures.all()) {
      await picture.scrollIntoViewIfNeeded()
      await expect(picture).toHaveAttribute('alt', /.+/)
      await picture.evaluate(async (image: HTMLImageElement) => {
        await image.decode()
        if (!image.naturalWidth) throw new Error('Photo did not load')
      })
      const difference = await picture.evaluate((image: HTMLImageElement) => {
        const box = image.getBoundingClientRect()
        return Math.abs(box.width / box.height - image.naturalWidth / image.naturalHeight)
      })
      expect(difference).toBeLessThan(0.01)
    }
  }
})
