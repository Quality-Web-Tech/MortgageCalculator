import moment from 'moment'

const getExtraPaymentsAndInterest = (
  paymenFrequency,
  p,
  r,
  loanTerm,
  oneTime,
  biWeekly,
  quarterly,
  yearly,
  pmiThreshhold,
) => {
  let {amount, type} = paymenFrequency
  let {payment: oPayment, startDate: oDate} = oneTime
  let {payment: bPayment, startDate: bDate} = biWeekly
  let {payment: qPayment, startDate: qDate} = quarterly
  let {payment: yPayment, startDate: yDate} = yearly

  // if (!oPayment && !bPayment && !qPayment && !yPayment)
  //   return {totalInterest: defaultTotalInterest, totalExtraPayment: 0, months}

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
  const diffMonthsForQuarterly = qDate.diff(today, 'months') // assume that the start date is Today!
  const diffMonthsForYearly = yDate.diff(today, 'months') // assume that the start date is Today!

  // 0, 7, 15, 22, 30, 7

  let n = 0
  let totalInterest = 0
  let balance = p // 255000
  let totalExtraPayment = 0
  let payments = 0
  let interestPerType = r / 1200
  let pmiEndDate = 0
  let quarterlySignal = 0

  let months = type === 'Monthly' ? loanTerm.months : loanTerm.years * 26
  const interest = type === 'Monthly' ? interestPerType : (interestPerType * 12) / 26

  while (n < months) {
    let newInterest = balance * interest // interest based on balance
    let principal = amount - newInterest // principal that goes to balance

    // break if we can pay balance
    if (principal >= balance) {
      totalInterest += newInterest
      // console.log(balance, totalInterest, newInterest)
      n += 1
      break
    }

    if (diffMonthsForOneTime === n && oPayment) {
      totalExtraPayment += oPayment
      payments = payments + oPayment
    }

    if (diffMonthsForBiWeekly <= n && bPayment) {
      totalExtraPayment += bPayment
      payments = payments + bPayment
    }

    if (diffMonthsForQuarterly <= n && n % 3 === 0 && type === 'Monthly' && qPayment) {
      totalExtraPayment += qPayment
      payments = payments + qPayment
    }

    if (type === 'Bi-Weekly' && qPayment && quarterlySignal === n) {
      totalExtraPayment += qPayment
      payments = payments + qPayment

      if (n !== diffMonthsForQuarterly) {
        principal = 0
        newInterest = 0
      }

      if (n === 0) {
        quarterlySignal += n % 2 === 0 ? 7 : 8
      } else {
        quarterlySignal += n % 3 === 1 ? 8 : 7
      }
    }

    if (diffMonthsForYearly <= n && n % 12 === 0 && yPayment) {
      totalExtraPayment += yPayment
      payments = payments + yPayment
    }

    if (diffMonthsForYearly <= n && n % 26 === 0 && yPayment && type === 'Bi-Weekly') {
      if (n === 0) {
        principal = 0
        newInterest = 0
      } else {
        totalExtraPayment += yPayment
        payments = payments + yPayment
      }
    }

    if (pmiThreshhold >= balance && !pmiEndDate) {
      pmiEndDate = n
    }

    balance = balance - (principal + payments)
    totalInterest += newInterest

    payments = 0
    n += 1
  }

  return {totalInterest: totalInterest, totalExtraPayment, months: n, pmiDuration: pmiEndDate}
}

export default getExtraPaymentsAndInterest
