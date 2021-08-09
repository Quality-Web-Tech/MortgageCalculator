import moment from 'moment'

const formatDate = (date, defaultFormat = 'MMMM DD, YYYY') => moment(date).format(defaultFormat)

const formatNumber = num => {
  if (num === '') return '0'
  if (num[0] === '0' && num.length === 2 && num[1] !== '.') return num[1]

  const stringNum = String(num)
  const arrStringNum = stringNum.split('.')

  if (arrStringNum.length > 2) return arrStringNum[0] + '.' + arrStringNum[1]
  if (arrStringNum.length === 1) return stringNum.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return arrStringNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + arrStringNum[1]
}

const unformat = num => {
  return Number(formatNumber(num).replace(/,/g, ''))
}

export {formatDate, formatNumber, unformat}
