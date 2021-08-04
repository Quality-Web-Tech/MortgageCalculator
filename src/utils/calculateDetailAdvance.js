import moment from 'moment'

// P[r(1+r)^n/((1+r)^n)-1)]
// p - principle
// r - interest rate /= 1200
// n - 12 * loanTerm

export default data => {
  let {
    homeValue,
    monthlyPaymentRaw,
    paymentFrequency,
    mortgageAmount: p, // 12 months per year, monthly interest
    interest: r,
    loanTerm: n, // FIXED THIS DAMN LOAN PUT IT BACK, FIRST FIX THE INPUT
    monthlyOrBiWeekly,
    propertyTax,
    homeInsurance,
    pmi,
    hoaFees,
    startDate,
    downPayment,
    oneTime,
    quarterly,
    yearly,
  } = data

  const fixedMonthlyPayment = monthlyPaymentRaw.toFixed(2)
  paymentFrequency =
    paymentFrequency === 'Monthly'
      ? {type: paymentFrequency, amount: Number(fixedMonthlyPayment).toFixed(2)}
      : {type: paymentFrequency, amount: Number(fixedMonthlyPayment / 2).toFixed(2)}

  // console.log('inside CalcAdvance', paymentFrequency)
  monthlyOrBiWeekly = Number(monthlyOrBiWeekly.payment.toFixed(2))
  propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax / 12 : propertyTax / 12 / 2
  homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance / 12 : homeInsurance / 12 / 2
  pmi = paymentFrequency.type === 'Monthly' ? pmi / 12 : pmi / 12 / 2
  hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : hoaFees / 2
  const totalPayment = Number(paymentFrequency.amount) + monthlyOrBiWeekly + propertyTax + homeInsurance + pmi + hoaFees
  // const numberOfPayments = n
  const endDate = moment(startDate).add(n / 12, 'years')

  const extraPaymentOnetime = oneTime // total month
  const extraPaymentMonthly = monthlyOrBiWeekly * n
  const extraPaymentQuarterly = quarterly * 4 * n // 4 quarter in a year * total year
  const extraPaymentYear = yearly * n

  console.log(extraPaymentOnetime, extraPaymentMonthly, extraPaymentQuarterly, extraPaymentYear)

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
    monthlyOrBiWeeklyExtraPayment: monthlyOrBiWeekly,
    propertyTax: propertyTax.toFixed(2),
    homeInsurance: homeInsurance.toFixed(2),
    pmi,
    hoaFees,
    totalPayment,
    numberOfPayments: n,
    endDate,
    loanTerm: n,
    downPayment: homeValue - p,
    // totalExtraPayment: totalExtraPayment.toFixed(2),
    // principal: principal.toFixed(2),
    // totalInterest: totalInterest.toFixed(2),
    // totalFees,
    // totalAllPayments: totalAllPayments.toFixed(2),
  }
}
