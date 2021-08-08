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
  propertyTax = paymentFrequency.type === 'Monthly' ? propertyTax / 12 : propertyTax / 26
  homeInsurance = paymentFrequency.type === 'Monthly' ? homeInsurance / 12 : homeInsurance / 26
  pmi = paymentFrequency.type === 'Monthly' ? (mortgageAmount * pmi) / 100 / 12 : (mortgageAmount * pmi) / 100 / 26
  hoaFees = paymentFrequency.type === 'Monthly' ? hoaFees : (hoaFees * 12) / 26

  const totalPaymentMonthly =
    paymentFrequency.amount + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees
  const downPayment = homeValue - mortgageAmount

  const totalExtraPaymentAndInterest = calculateExtraPaymentsAndInterest(
    paymentFrequency,
    mortgageAmount,
    interest,
    loanTerm,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
    monthlyPaymentRaw,
  )

  const principal = mortgageAmount - totalExtraPaymentAndInterest.totalExtraPayment
  const endDate = moment(startDate).add(totalExtraPaymentAndInterest.months - 1, 'months')

  const totalFessMonths = paymentFrequency.type === 'Monthly' ? 0 : 2
  const totalTax = propertyTax * (totalExtraPaymentAndInterest.months - totalFessMonths) // - 2 is an extra month being added to the calculateExtraPaymentsAndInterest
  const totalInsurance = homeInsurance * (totalExtraPaymentAndInterest.months - totalFessMonths)
  const totalPMI = pmi * (paymentFrequency.type === 'Monthly' ? 45 : 73) // Default value is 45 months, Biweel is 73
  const totalHoaFees = hoaFees * (totalExtraPaymentAndInterest.months - totalFessMonths)
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
