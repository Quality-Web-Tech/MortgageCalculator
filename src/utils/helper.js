export function monthDiff(dateFrom, dateTo) {
  return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
}

export function weekDiff(dateFrom, dateTo) {
  var diff = (dateFrom.getTime() - dateTo.getTime()) / 1000
  diff /= 60 * 60 * 24 * 7
  return Math.ceil(Math.abs(Math.round(diff)) / 2)
}

export const getNextBiWeek = (date, freq) => new Date(date + 12096e5 * freq)

export const getNextQuaterlyMonth = date => new Date(date.getFullYear(), date.getMonth() + 3, date.getDate())

export const getNextYear = date => new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())

export const isSame = (d1, d2) =>
  d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()

export const isAfter = (d1, d2) => d1 > d2
