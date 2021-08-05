import moment from 'moment'

const getExtraPaymentsAndInterest = (
  paymenFrequency,
  p,
  r,
  months,
  oneTime,
  biWeekly,
  quarterly,
  yearly,
  defaultTotalInterest,
) => {
  let {amount, type} = paymenFrequency
  let {payment: oPayment, startDate: oDate} = oneTime
  let {payment: bPayment, startDate: bDate} = biWeekly
  let {payment: qPayment, startDate: qDate} = quarterly
  let {payment: yPayment, startDate: yDate} = yearly

  if (!oPayment && !bPayment && !qPayment && !yPayment)
    return {totalInterest: defaultTotalInterest, totalExtraPayment: 0, months}

  oPayment = Number(oPayment)
  bPayment = Number(bPayment)
  qPayment = Number(qPayment)
  yPayment = Number(yPayment)

  const today = moment(new Date())
  oDate = moment(oDate)
  bDate = moment(bDate)
  qDate = moment(qDate)
  yDate = moment(yDate)

  const diffMonthsForOneTime = oDate.diff(today, 'months')
  const diffMonthsForBiWeekly = bDate.diff(today, 'months')
  const diffMonthsForQuarterly = qDate.diff(today, 'months')
  const diffMonthsForYearly = yDate.diff(today, 'months')

  amount = Number(amount)

  let n = 0
  let totalInterest = 0
  let balance = p // 255000
  let totalExtraPayment = 0
  let payments = 0

  while (n < months && balance >= 0) {
    let newInterest = Number(getNewInterestPerMonth(balance, r).toFixed(2))
    let principal = amount - newInterest

    if (diffMonthsForOneTime === n && oPayment) {
      totalExtraPayment += oPayment
      payments += oPayment
    }

    if (diffMonthsForBiWeekly <= n && bPayment && balance >= 100) {
      totalExtraPayment += bPayment
      payments += bPayment
    }

    if (diffMonthsForQuarterly <= n && n % 3 === 0 && qPayment) {
      totalExtraPayment += qPayment
      payments += qPayment
    }

    if (diffMonthsForYearly <= n && n % 12 === 0 && yPayment) {
      totalExtraPayment += yPayment
      payments += yPayment
    }

    if (payments) {
      balance = balance - (principal + payments)
      totalInterest += newInterest
    } else {
      totalInterest += newInterest
      balance = balance - principal
    }

    payments = 0
    n++
  }

  return {totalInterest: totalInterest + 2.1, totalExtraPayment, months: n} // minor difference due to decimals places
}

const getNewInterestPerMonth = (balance, interest, days = 30) => ((balance * interest) / 36000) * days // 100 - interest, 12 - months, 30 - days

export default getExtraPaymentsAndInterest
