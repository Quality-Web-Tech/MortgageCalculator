import moment from 'moment'

// P[r(1+r)^n/((1+r)^n)-1)]
// p - principle
// r - interest rate /= 1200
// n - 12 * loanTerm

export default data => {
  const copiedData = {...data}

  let {mortgageAmount: principal, interest, loanTerm, startDate} = copiedData
  principal = Number(principal)
  interest = Number(interest)

  const p = principal
  const r = (interest /= 1200) // 12 months per year, monthly interest
  const n = loanTerm * 12 // months to be paid
  const endDate = moment(startDate).add(loanTerm, 'years')
  const monthlyPaymentRaw = (p * r) / (1 - Math.pow(1 + r, n * -1))
  const monthlyPayment = monthlyPaymentRaw.toFixed(2)
  const totalPayment = (monthlyPaymentRaw * n).toFixed(2)
  const totalInterest = (totalPayment - p).toFixed(2)

  return {
    ...data,
    endDate,
    monthlyPayment,
    totalPayment,
    totalInterest,
  }
}
