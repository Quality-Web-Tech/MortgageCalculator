import {monthDiff, getNextYear, getNextQuaterlyMonth, weekDiff, getNextBiWeek, isSame, isAfter} from './helper'

const getExtraPaymentsAndInterest = (
  paymenFrequency,
  p,
  r,
  oneTime,
  biWeekly,
  quarterly,
  yearly,
  pmiThreshhold,
  startDate,
) => {
  let {amount, type} = paymenFrequency
  let {payment: oPayment, startDate: oDate} = oneTime
  let {payment: bPayment, startDate: bDate} = biWeekly
  let {payment: qPayment, startDate: qDate} = quarterly
  let {payment: yPayment, startDate: yDate} = yearly

  let numberOfPayments = 0
  let totalInterest = 0
  let balance = p // 255000
  let totalExtraPayment = 0
  let extraPayments = 0
  let interestPerType = r / 1200
  let pmiEndDate = 0

  const isMonthly = type === 'Monthly' ? true : false
  const interest = isMonthly ? interestPerType : (interestPerType * 12) / 26

  const calculateInterestAndPrincipal = b => {
    let newInterest = b * interest // interest based on balance
    let principal = amount - newInterest // principal that goes to balance
    return [principal, newInterest]
  }

  const addPaymentToExtra = (amount, cb = () => null) => {
    totalExtraPayment += amount
    extraPayments += amount
    cb()
  }

  if (isMonthly) {
    let n = 0

    const diffO = monthDiff(startDate, oDate)
    const diffB = monthDiff(startDate, bDate)
    const diffQ = monthDiff(startDate, qDate)
    const diffY = monthDiff(startDate, yDate)

    while (balance >= 0) {
      let [principal, newInterest] = calculateInterestAndPrincipal(balance)

      // if paid principal is 20% or greater stop paying
      if (pmiThreshhold >= balance && !pmiEndDate) {
        pmiEndDate = n
      }

      if (diffO === n && oPayment) addPaymentToExtra(oPayment)
      if (diffB <= n && bPayment) addPaymentToExtra(bPayment)
      if (diffQ === n && qPayment) addPaymentToExtra(qPayment)
      if (diffQ < n && (n - diffQ) % 3 === 0 && qPayment) addPaymentToExtra(qPayment)
      if (diffY === n && yPayment) addPaymentToExtra(yPayment)
      if (diffY < n && (n - diffY) % 12 === 0 && yPayment) addPaymentToExtra(yPayment)

      // subract any extra payments if balance is paid
      if (principal >= balance) {
        totalExtraPayment -= extraPayments
      }

      balance = balance - (principal + extraPayments)
      totalInterest += newInterest
      extraPayments = 0
      n += 1
      numberOfPayments = n
    }
  } else {
    let n = 0
    let newInterest
    let principal
    let extraPaymentCounter = 0

    const diffBWO = weekDiff(startDate, oDate)
    const diffBWB = weekDiff(startDate, bDate)
    let diffBWQ = weekDiff(startDate, qDate)
    let qNextPayment
    let diffBWY = weekDiff(startDate, yDate)
    let yNextPayment

    const recalculate = (amount, cb = () => null) => {
      balance -= amount
      totalExtraPayment += amount
      extraPaymentCounter += 1
      const [p, i] = calculateInterestAndPrincipal(balance)

      newInterest = i
      principal = p
      cb()
    }

    const setNextQuarterPayment = () => {
      qNextPayment = !qNextPayment ? new Date(qDate) : qNextPayment
      qNextPayment = getNextQuaterlyMonth(qNextPayment)
    }

    const setNextYearPayment = () => {
      yNextPayment = !yNextPayment ? new Date(yDate) : yNextPayment
      yNextPayment = getNextYear(yNextPayment)
    }

    while (balance >= 0) {
      let [p, i] = calculateInterestAndPrincipal(balance)
      principal = p
      newInterest = i

      const cbw = getNextBiWeek(startDate.getTime(), n)

      // if paid principal is 20% or greater stop paying
      if (pmiThreshhold >= balance && !pmiEndDate) {
        pmiEndDate = n
      }

      if (diffBWO === n && isSame(cbw, oDate) && oPayment) addPaymentToExtra(oPayment)
      if (diffBWO === n && !isSame(cbw, oDate) && oPayment) recalculate(oPayment)
      if (diffBWB <= n && bPayment) addPaymentToExtra(bPayment)

      if (!qNextPayment && diffBWQ === n && isSame(cbw, qDate) && qPayment)
        addPaymentToExtra(qPayment, setNextQuarterPayment)
      if (!qNextPayment && diffBWQ === n && !isSame(cbw, qDate) && qPayment)
        recalculate(qPayment, setNextQuarterPayment)

      // 2025-11-15T07:00:00.000Z 2025-11-14T08:00:00.000Z 229108.01623482723 true, one day is equal isSame(cbw, qNextPayment), it shouldnt
      if (qNextPayment && isSame(cbw, qNextPayment) && qPayment) addPaymentToExtra(qPayment, setNextQuarterPayment)
      if (qNextPayment && isAfter(cbw, qNextPayment) && qPayment) recalculate(qPayment, setNextQuarterPayment)

      if (!yNextPayment && diffBWY === n && isSame(cbw, yDate) && yPayment)
        addPaymentToExtra(yPayment, setNextYearPayment)
      if (!yNextPayment && diffBWY === n && !isSame(cbw, yDate) && yPayment) recalculate(yPayment, setNextYearPayment)

      // 2025-11-15T07:00:00.000Z 2025-11-14T08:00:00.000Z 229108.01623482723 true, one day is equal isSame(cbw, qNextPayment), it shouldnt
      if (yNextPayment && isSame(cbw, yNextPayment) && yPayment) addPaymentToExtra(yPayment, setNextYearPayment)
      if (yNextPayment && isAfter(cbw, yNextPayment) && yPayment) recalculate(yPayment, setNextYearPayment)

      // subract any extra payments if balance is paid
      if (principal >= balance) {
        totalExtraPayment -= extraPayments
      }

      balance = balance - (principal + extraPayments)
      totalInterest += newInterest
      extraPayments = 0

      n += 1
      numberOfPayments = n
    }
  }

  // TODO: Fix number of payments involving with extra payments
  pmiEndDate = isMonthly
    ? pmiEndDate
    : !isMonthly && qPayment
    ? yPayment
      ? pmiEndDate - 1
      : pmiEndDate - 2
    : pmiEndDate - 1

  return {totalInterest: totalInterest, totalExtraPayment, months: numberOfPayments, pmiDuration: pmiEndDate}
}

export default getExtraPaymentsAndInterest
