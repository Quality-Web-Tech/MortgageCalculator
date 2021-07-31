import moment from 'moment'

const formatDate = date => moment(date).format('MMMM DD, YYYY')
const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export {formatDate, formatNumber}
