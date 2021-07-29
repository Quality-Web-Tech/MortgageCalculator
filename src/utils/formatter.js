import moment from 'moment'

const formatDate = date => moment(date).format('MMMM DD, YYYY')
const formatNumber = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

export {formatDate, formatNumber}
