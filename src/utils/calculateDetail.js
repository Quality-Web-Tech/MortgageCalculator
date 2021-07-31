import moment from 'moment'

// P[r(1+r)^n/((1+r)^n)-1)]
// p - principle
// r - interest rate /= 1200
// n - 12 * loanTerm

export default (data, cb) => {
  const copiedData = {...data}

  let {mortgageAmount, interest: i, loanTerm, startDate, monthlyPaymentRaw} = copiedData

  let principal = Number(mortgageAmount)

  const n = loanTerm * 12 // months to be paid

  const endDate = moment(startDate).add(loanTerm, 'years')
  const monthlyPayment = monthlyPaymentRaw.toFixed(2)
  const totalPayment = (monthlyPaymentRaw * n).toFixed(2)
  const totalInterest = (totalPayment - principal).toFixed(2)

  return {
    mortgageAmount: principal,
    loanTerm: n,
    startDate,
    endDate,
    monthlyPayment,
    totalPayment,
    totalInterest,
  }
}
