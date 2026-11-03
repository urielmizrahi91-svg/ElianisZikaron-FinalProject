export interface ConvertedDate {
  gy: number
  gm: number
  gd: number
  hy: number
  hm: string
  hd: number
}

export function isConvertedDate(value: unknown, year: number): value is ConvertedDate {
  if (typeof value !== 'object' || value === null) return false
  const data = value as Record<string, unknown>
  if (data.hy !== year || data.hm !== 'Tishrei' || data.hd !== 30
    || typeof data.gy !== 'number' || !Number.isInteger(data.gy) || data.gy < 100 || data.gy > 9999
    || typeof data.gm !== 'number' || !Number.isInteger(data.gm) || data.gm < 1 || data.gm > 12
    || typeof data.gd !== 'number' || !Number.isInteger(data.gd) || data.gd < 1 || data.gd > 31) return false
  const date = new Date(Date.UTC(data.gy, data.gm - 1, data.gd))
  return date.getUTCFullYear() === data.gy && date.getUTCMonth() === data.gm - 1 && date.getUTCDate() === data.gd
}
