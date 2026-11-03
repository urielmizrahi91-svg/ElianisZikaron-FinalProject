import { expect, test } from '@playwright/test'

test('memorial years link to details with loading and converted dates', async ({ page }) => {
  let releaseResponse: () => void = () => {}
  const pending = new Promise<void>(resolve => { releaseResponse = resolve })
  await page.route('https://www.hebcal.com/converter?**', async route => {
    const url = new URL(route.request().url())
    expect(url.searchParams.get('hm')).toBe('Tishrei')
    expect(url.searchParams.get('hd')).toBe('30')
    expect(url.searchParams.get('h2g')).toBe('1')
    await pending
    await route.fulfill({ json: { hy: 5786, hm: 'Tishrei', hd: 30, gy: 2025, gm: 10, gd: 22 } })
  })
  await page.goto('/memorial-dates')
  await expect(page.locator('.memorial-years a')).toHaveCount(6)
  await page.getByRole('link', { name: 'ל׳ בתשרי תשפ״ו', exact: true }).click()
  await expect(page).toHaveURL('/memorial-dates/5786')
  await expect(page.getByRole('status')).toContainText('טוען')
  releaseResponse()
  await expect(page.locator('time')).toHaveAttribute('datetime', '2025-10-22')
  await expect(page.getByRole('status')).toContainText('22 באוקטובר 2025')
  await expect(page.getByText('התאריכים המוצגים הם המרה לועזית של ל׳ בתשרי, ואינם קביעה של מועדי אזכרה לפי מנהג המשפחה.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Hebcal', exact: true })).toHaveAttribute('href', 'https://www.hebcal.com/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.reload()
  await expect(page.locator('time')).toHaveAttribute('datetime', '2025-10-22')
  await page.getByRole('link', { name: 'חזרה לתאריכים לזיכרון', exact: true }).click()
  await expect(page.locator('.memorial-years a')).toHaveCount(6)
})

test('failed conversion offers retry and recovers', async ({ page }) => {
  let requests = 0
  await page.route('https://www.hebcal.com/converter?**', route => {
    requests++
    return requests === 1
      ? route.fulfill({ status: 503, body: 'Unavailable' })
      : route.fulfill({ json: { hy: 5787, hm: 'Tishrei', hd: 30, gy: 2026, gm: 10, gd: 11 } })
  })
  await page.goto('/memorial-dates/5787')
  await expect(page.getByRole('alert')).toContainText('לא הצלחנו לטעון')
  await page.getByRole('button', { name: 'ניסיון נוסף' }).click()
  await expect(page.locator('time')).toHaveAttribute('datetime', '2026-10-11')
})

test('invalid API dates are rejected', async ({ page }) => {
  await page.route('https://www.hebcal.com/converter?**', route => route.fulfill({
    json: { hy: 5786, hm: 'Tishrei', hd: 30, gy: 2025, gm: 2, gd: 31 },
  }))
  await page.goto('/memorial-dates/5786')
  await expect(page.getByRole('alert')).toContainText('לא הצלחנו לטעון')
  await expect(page.locator('time')).toHaveCount(0)
})

test('unsupported years show a return link without requesting the API', async ({ page }) => {
  let requests = 0
  await page.route('https://www.hebcal.com/converter?**', route => { requests++; return route.abort() })
  await page.goto('/memorial-dates/invalid')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('השנה לא נמצאה')
  await page.getByRole('link', { name: 'חזרה לתאריכים לזיכרון', exact: true }).click()
  await expect(page).toHaveURL('/memorial-dates')
  expect(requests).toBe(0)
})
