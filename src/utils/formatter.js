import moment from 'moment'

const formatDate = date => moment(date).format('MMMM DD, YYYY')
const formatNumber = num => {
  if (num === undefined) return ''
  if (num === '') return ''

  // prevent from adding comma after a perio
  // const numArr = num.split('.')
  // if (numArr.length > 2) return // too much period

  // const leftNum = numArr[0]
  num = num.toString()
  // if (num.length === 1) return num + '.00'

  return num.replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export {formatDate, formatNumber}
