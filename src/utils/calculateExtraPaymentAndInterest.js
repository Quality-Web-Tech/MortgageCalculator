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
  startDate,
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

  let numberOfPayments = 0
  let totalInterest = 0
  let balance = p // 255000
  let totalExtraPayment = 0
  let extraPayments = 0
  let interestPerType = r / 1200
  let pmiEndDate = 0

  oDate = moment(oDate)
  bDate = moment(bDate)
  qDate = moment(qDate)
  yDate = moment(yDate)
  startDate = moment(startDate)

  const isMonthly = type === 'Monthly' ? true : false
  const isWeeksOrMonths = isMonthly ? 'months' : 'weeks'

  const diffMonthsForOneTime = oDate.diff(startDate, isWeeksOrMonths)
  const diffMonthsForBiWeekly = bDate.diff(startDate, isWeeksOrMonths)
  const diffMonthsForQuarterly = qDate.diff(startDate, isWeeksOrMonths) // assume that the start date is Today!
  const diffMonthsForYearly = yDate.diff(startDate, isWeeksOrMonths) // assume that the start date is Today!

  const t0 = performance.now()

  const interest = isMonthly ? interestPerType : (interestPerType * 12) / 26

  if (isMonthly) {
    let n = 0
    while (balance >= 0) {
      let newInterest = balance * interest // interest based on balance
      let principal = amount - newInterest // principal that goes to balance

      // if paid principal is 20% or greater stop paying
      if (pmiThreshhold >= balance && !pmiEndDate) {
        pmiEndDate = n
      }

      if (diffMonthsForOneTime === n && oPayment) {
        totalExtraPayment += oPayment
        extraPayments += oPayment
      }

      if (diffMonthsForBiWeekly <= n && bPayment) {
        totalExtraPayment += bPayment
        extraPayments += bPayment
      }

      if (diffMonthsForQuarterly <= n && n % 3 === 0 && qPayment) {
        totalExtraPayment += qPayment
        extraPayments += qPayment
      }

      if (diffMonthsForYearly <= n && n % 12 === 0 && yPayment) {
        totalExtraPayment += yPayment
        extraPayments += yPayment
      }

      // subract any extra payments
      if (principal >= balance) {
        totalExtraPayment -= extraPayments
      }

      balance = balance - (principal + extraPayments)
      totalInterest += newInterest

      n += 1

      extraPayments = 0
      numberOfPayments += 1
    }
  } else {
    let n = loanTerm.years * 26
    let i = 0
    let k = (loanTerm.years * 20) / 4

    const oStart = Math.ceil(diffMonthsForOneTime / 2)
    const bStart = Math.ceil(diffMonthsForBiWeekly / 2)
    let qStart = Math.ceil(diffMonthsForQuarterly / 2)
    let yStart = Math.ceil(diffMonthsForYearly / 2)
    const oSignalToStop = false

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const qData = []
    const sData = []
    sData.push(startDate.format('MMM DD, YYYY'))
    let qStartMonth = qDate.month()
    const qStartDay = qDate.date()
    let qStartYear = qDate.year()
    let qYear = qStartMonth

    if (qPayment) {
      for (let j = 0; j < k; j++) {
        if (qYear > 11) {
          qStartYear += 1
          qYear = qStartMonth % 12
        }

        qData.push(`${months[qStartMonth % 12]} ${qStartDay}, ${qStartYear}`)

        qStartMonth += 3
        qYear += 3
      }

      const ll = loanTerm.years * 26
      for (let k = 0; k < ll; k++) {
        sData.push(startDate.add(2, 'weeks').format('MMM DD, YYYY'))
      }
    }

    qData.reverse()
    // If balance changed re calculate interest!!
    while (i < n && balance >= 0) {
      let newInterest = balance * interest // interest based on balance
      let principal = amount - newInterest // principal that goes to balance

      // if paid principal is 20% or greater stop paying
      if (pmiThreshhold >= balance && !pmiEndDate) {
        pmiEndDate = i
      }

      if (i === oStart && !oSignalToStop && oPayment) {
        const copyStartDate = moment(startDate)
        const copyStartString = copyStartDate.add(i * 2, 'weeks').format('MMM DD, YYYY')
        const oDateString = oDate.format('MMM DD, YYYY')

        if (copyStartString !== oDateString) {
          balance -= principal
          balance -= oPayment
          totalInterest += newInterest
          totalExtraPayment += oPayment
          oSignalToStop = true
          continue
        }

        totalExtraPayment += oPayment
        extraPayments += oPayment
      }

      if (i >= bStart && bPayment) {
        if (principal >= balance) bPayment = 0
        totalExtraPayment += bPayment
        extraPayments += bPayment
      }

      if (i >= qStart && qPayment) {
        const np = qData[qData.length - 1]
        const cb = sData[i]

        if (np === cb) {
          totalExtraPayment += qPayment
          extraPayments += qPayment
          qData.pop()
          qStart = i + 6

          continue
        }

        const cc = moment(np) //slow operation
        const mm = moment(cb) //slow operation

        if (mm.isAfter(cc)) {
          balance -= qPayment
          newInterest = balance * interest // recalculate since balance change
          principal = amount - newInterest // recalculate since balance change
          totalExtraPayment += qPayment

          qData.pop()
          qStart = i + 6
        }
      }

      if (i % 26 === 0 || (yStart === i && yPayment)) {
        const sd = moment(startDate)
          .add(i * 2, 'weeks')
          .format('MMM DD, YYYY')

        const mm = yDate.add(1, 'year').format('MMM DD, YYYY')

        if (sd === mm) {
          totalExtraPayment += yPayment
          extraPayments += yPayment
        }

        // we know that next iteration is year
        balance -= yPayment
      }

      balance -= principal + extraPayments
      totalInterest += newInterest
      extraPayments = 0

      i += 1
      numberOfPayments = i
    }
  }

  const t1 = performance.now()
  console.log(t1 - t0, 'milliseconds')
  return {totalInterest: totalInterest, totalExtraPayment, months: numberOfPayments, pmiDuration: pmiEndDate}
}

export default getExtraPaymentsAndInterest
