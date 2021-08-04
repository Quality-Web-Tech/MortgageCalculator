import moment from 'moment'

// P[r(1+r)^n/((1+r)^n)-1)]
// p - principle
// r - interest rate /= 1200
// n - 12 * loanTerm

export default data => {
  let {
    monthlyPaymentRaw,
    paymentFrequency,
    // mortgageAmount,
    // interest: i,
    // propertyTax,
    // homeInsurance,
    // loanTerm,
    // startDate,
    // pmi,
    // hoaFees,
    // oneTime,
    // monthlyOrBiWeekly,
    // quarterly,
    // yearly,
    // downPayment,
  } = data

  // const p = Number(mortgageAmount)
  // const r = Number(i) / 100 / 12 // 12 months per year, monthly interest
  // const n = loanTerm * 12 // months to be paid

  const fixedMonthlyPayment = monthlyPaymentRaw.toFixed(2)
  paymentFrequency =
    paymentFrequency === 'Monthly'
      ? {type: paymentFrequency, amount: Number(fixedMonthlyPayment)}
      : {type: paymentFrequency, amount: Number(fixedMonthlyPayment / 2)}

  // monthlyOrBiWeekly = Number(Number(monthlyOrBiWeekly.payment).toFixed(2))
  // propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax / 12 : propertyTax / 12 / 2
  // homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance / 12 : homeInsurance / 12 / 2
  // pmi = paymentFrequency.type === 'Monthly' ? pmi / 12 : pmi / 12 / 2
  // hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : hoaFees / 2
  // const totalPayment = paymentFrequency.amount + monthlyOrBiWeekly + propertyTax + homeInsurance + pmi + hoaFees
  // const numberOfPayments = n
  // const endDate = moment(startDate).add(loanTerm, 'years')

  // const extraPaymentOnetime = oneTime.payment // total month
  // const extraPaymentMonthly = monthlyOrBiWeekly * n
  // const extraPaymentQuarterly = quarterly.payment * 4 * loanTerm // 4 quarter in a year * total year
  // const extraPaymentYear = yearly.payment * loanTerm

  // const totalExtraPayment = extraPaymentOnetime + extraPaymentMonthly + extraPaymentQuarterly + extraPaymentYear
  // const principal = p - totalExtraPayment

  // const totalMortgage = monthlyPaymentRaw * numberOfPayments
  // const totalInterest = totalMortgage - p

  // const totalTax = propertyTax * 360
  // const totalInsurance = homeInsurance * 360
  // const totalPMI = pmi * 45 // Default value is 48 months or 4 years. In the actual app the default is 45 months
  // const totalFees = totalTax + totalInsurance + totalPMI + totalExtraPayment

  // const totalAllPayments = totalFees + totalInterest + p + downPayment

  return {
    ...data,
    paymentFrequency,
    // monthlyOrBiWeeklyExtraPayment: monthlyOrBiWeekly,
    // propertyTax: propertyTax.toFixed(2),
    // homeInsurance: homeInsurance.toFixed(2),
    // pmi,
    // hoaFees,
    // totalPayment,
    // numberOfPayments,
    // endDate,
    // totalExtraPayment: totalExtraPayment.toFixed(2),
    // principal: principal.toFixed(2),
    // totalInterest: totalInterest.toFixed(2),
    // totalFees,
    // totalAllPayments: totalAllPayments.toFixed(2),
  }
}
