import getOneTimeInterest from '../utils/calculateOneTimePayment'
import getBiWeeklyInterest from '../utils/calculateBiWeeklyPayment'
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
    loanTerm,
    monthlyOrBiWeekly,
    propertyTax,
    homeInsurance,
    pmi,
    hoaFees,
    startDate,
    oneTime,
    quarterly,
    yearly,
    numberOfPayments,
  } = data

  const fixedMonthlyPayment = monthlyPaymentRaw.toFixed(2)
  paymentFrequency =
    paymentFrequency === 'Monthly'
      ? {type: paymentFrequency, amount: Number(fixedMonthlyPayment).toFixed(2)}
      : {type: paymentFrequency, amount: Number(fixedMonthlyPayment / 2).toFixed(2)}

  // toFixed is the smalll deffirence here
  r = Number(r)
  const monthlyOrBiWeeklyPayment = Number(monthlyOrBiWeekly.payment.toFixed(2))
  const oneTimePayment = Number(oneTime.payment).toFixed(2)
  const quarterlyPayment = Number(quarterly.payment).toFixed(2)
  const yearlyPayment = Number(yearly.payment).toFixed(2)
  propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax / 12 : propertyTax / 12 / 2
  homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance / 12 : homeInsurance / 12 / 2
  pmi = paymentFrequency.type === 'Monthly' ? pmi / 12 : pmi / 12 / 2
  hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : hoaFees / 2
  const endDate = moment(startDate).add(loanTerm.years, 'years')

  const totalPaymentMonthly =
    Number(paymentFrequency.amount) + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees

  const extraPaymentOnetime = Number(oneTimePayment) // total month
  const extraPaymentMonthly = Number(monthlyOrBiWeeklyPayment * loanTerm.months)
  const extraPaymentQuarterly = Number(quarterlyPayment * 4 * loanTerm.years) // 4 quarter in a year * total year
  const extraPaymentYear = Number(yearlyPayment * loanTerm.years)

  const totalExtraPayment = extraPaymentOnetime + extraPaymentMonthly + extraPaymentQuarterly + extraPaymentYear
  const principal = p - totalExtraPayment

  // numberOfPayments is undefined when form input is updated ba
  const totalMortgage = monthlyPaymentRaw * loanTerm.months
  const totalInterest = totalMortgage - p

  // console.log(typeof r)
  // const principalPerDay = Number(paymentFrequency.amount) - interestPerMonth
  // const others = monthlyOrBiWeekly + propertyTax + homeInsurance + pmi + hoaFees
  // const calculateOneTimeInterest = getOneTimeInterest(oneTime)

  const oneTimeExtraPaymentInterest = getOneTimeInterest(
    Number(paymentFrequency.amount),
    p,
    r,
    loanTerm.months,
    oneTime,
  )

  const biWeeklyExtraPaymentInterest = getBiWeeklyInterest(Number(paymentFrequency.amount), p, r, loanTerm.months, {
    ...monthlyOrBiWeekly,
    payment: 100,
  })

  // console.log(biWeeklyExtraPaymentInterest)

  const downPayment = (homeValue - p).toFixed(2)
  const totalTax = propertyTax * 360
  const totalInsurance = homeInsurance * 360
  const totalPMI = pmi * 45 // Default value is 48 months or 4 years. In the actual app the default is 45 months
  const totalFees = totalTax + totalInsurance + totalPMI + totalExtraPayment

  const totalAllPayments = totalFees + totalInterest + p + Number(downPayment)

  return {
    ...data,
    paymentFrequency,
    principalAndInterest: 0,
    monthlyOrBiWeeklyExtraPayment: monthlyOrBiWeeklyPayment,
    propertyTax: propertyTax.toFixed(2),
    homeInsurance: homeInsurance.toFixed(2),
    pmi: pmi.toFixed(2),
    hoaFees: hoaFees.toFixed(2),
    totalPayment: totalPaymentMonthly,
    numberOfPayments: loanTerm.months || numberOfPayments, // initial num payments is 360
    endDate,
    downPayment,
    totalExtraPayment: totalExtraPayment.toFixed(2),
    principal: principal.toFixed(2),
    totalInterest: oneTimeExtraPaymentInterest.toFixed(2) || totalInterest.toFixed(2),
    totalFees,
    totalAllPayments: totalAllPayments.toFixed(2),
  }
}
