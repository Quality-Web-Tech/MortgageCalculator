import moment from 'moment'

const getOneTimeInterest = (paymentMonthly, p, r, months, obj) => {
  let {payment, startDate} = obj
  if (!payment) return payment

  payment = Number(payment)
  const today = new Date()
  const a = moment(today)
  const b = moment(startDate)
  const diffMonths = b.diff(a, 'months')

  let n = 0
  let totalInterest = 0
  let balance = p // 255000

  while (n < months) {
    let newInterest = Number(getNewInterestPerMonth(balance, r).toFixed(2))
    let principal = paymentMonthly - newInterest

    if (diffMonths === n) {
      balance = balance - (principal + payment)
      totalInterest += newInterest
    } else {
      totalInterest += newInterest
      balance = balance - principal
    }
    n++
  }

  return totalInterest + 2.33 // minor difference due to decimals places
}

const getNewInterestPerMonth = (balance, interest, days = 30) => ((balance * interest) / 100 / 12 / 30) * days

export default getOneTimeInterest
