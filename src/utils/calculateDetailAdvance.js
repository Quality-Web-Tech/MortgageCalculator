import calculateExtraPaymentsAndInterest from './calculateExtraPaymentAndInterest'

import moment from 'moment'

export default data => {
  let {
    homeValue,
    monthlyPaymentRaw,
    paymentFrequency,
    mortgageAmount, // 12 months per year, monthly interest
    interest,
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
  } = data

  paymentFrequency =
    paymentFrequency === 'Monthly'
      ? {type: paymentFrequency, amount: monthlyPaymentRaw}
      : {type: paymentFrequency, amount: monthlyPaymentRaw / 2}

  pmi = typeof pmi === 'object' ? pmi.true : pmi

  const monthlyOrBiWeeklyPayment = monthlyOrBiWeekly.payment
  propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax / 12 : propertyTax / 12 / 2
  homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance / 12 : homeInsurance / 12 / 2
  pmi = paymentFrequency.type === 'Monthly' ? (mortgageAmount * pmi) / 100 / 12 : (homeValue * pmi) / 100 / 12 / 2
  hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : hoaFees / 2

  const totalPaymentMonthly =
    paymentFrequency.amount + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees
  const downPayment = homeValue - mortgageAmount

  const totalExtraPaymentAndInterest = calculateExtraPaymentsAndInterest(
    paymentFrequency,
    mortgageAmount,
    interest,
    loanTerm.months,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
    monthlyPaymentRaw * loanTerm.months - mortgageAmount,
    monthlyPaymentRaw,
  )

  const principal = mortgageAmount - totalExtraPaymentAndInterest.totalExtraPayment
  const endDate = moment(startDate).add(totalExtraPaymentAndInterest.months - 1, 'months')

  const totalTax = propertyTax * totalExtraPaymentAndInterest.months
  const totalInsurance = homeInsurance * totalExtraPaymentAndInterest.months
  const totalPMI = pmi * 45 // Default value is 44 months. In the actual app the default is 44 months
  const totalHoaFees = hoaFees * totalExtraPaymentAndInterest.months
  const totalFees = totalTax + totalInsurance + totalPMI + totalHoaFees

  const totalAllPayments = totalFees + totalExtraPaymentAndInterest.totalInterest + mortgageAmount + downPayment

  return {
    ...data,
    paymentFrequency,
    monthlyOrBiWeeklyExtraPayment: monthlyOrBiWeeklyPayment,
    propertyTax,
    homeInsurance,
    pmi,
    hoaFees,
    totalPayment: totalPaymentMonthly,
    numberOfPayments: totalExtraPaymentAndInterest.months, //fixed pay off date displayed use moment to get the date
    endDate,
    downPayment,
    principal,
    totalExtraPayment: totalExtraPaymentAndInterest.totalExtraPayment,
    totalInterest: totalExtraPaymentAndInterest.totalInterest,
    totalFees,
    totalAllPayments,
  }
}
