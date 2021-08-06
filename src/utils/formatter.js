import moment from 'moment'

const formatDate = date => moment(date).format('MMMM DD, YYYY')
const formatNumber = num => {
  if (!num) return

  // prevent from adding comma after a perio
  // const numArr = num.split('.')
  // if (numArr.length > 2) return // too much period

  // const leftNum = numArr[0]

  return num
    .toString()
    .replaceAll(',', '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export {formatDate, formatNumber}
