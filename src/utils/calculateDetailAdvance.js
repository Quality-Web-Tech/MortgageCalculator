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

  const isMonthly = paymentFrequency.type === 'Monthly' ? true : false

  const monthlyOrBiWeeklyPayment = monthlyOrBiWeekly.payment
  propertyTax = isMonthly ? propertyTax / 12 : propertyTax / 26
  homeInsurance = isMonthly ? homeInsurance / 12 : homeInsurance / 26
  pmi = isMonthly ? (mortgageAmount * pmi) / 100 / 12 : (mortgageAmount * pmi) / 100 / 26
  hoaFees = isMonthly ? hoaFees : (hoaFees * 12) / 26

  const totalPaymentMonthly =
    paymentFrequency.amount + monthlyOrBiWeeklyPayment + propertyTax + homeInsurance + pmi + hoaFees
  const downPayment = homeValue - mortgageAmount
  const pmiThreshhold = homeValue - homeValue * 0.2 // downpayment and loan princiapl paid reach 20% stop pmi

  const {totalExtraPayment, months, totalInterest, pmiDuration} = calculateExtraPaymentsAndInterest(
    paymentFrequency,
    mortgageAmount,
    interest,
    loanTerm,
    oneTime,
    monthlyOrBiWeekly,
    quarterly,
    yearly,
    pmiThreshhold,
  )

  const principal = mortgageAmount - totalExtraPayment

  const endDate = moment(startDate).add(isMonthly ? months - 1 : Math.ceil((months / 26) * 12) - 2, 'months') // Subracted extra month

  const totalFessMonths = isMonthly ? 0 : 2
  const totalTax = propertyTax * (months - totalFessMonths) // - 2 is an extra month being added to the calculateExtraPaymentsAndInterest
  const totalInsurance = homeInsurance * (months - totalFessMonths)
  const totalPMI = pmi * pmiDuration // Default value is 45 months, Biweel is 73
  const totalHoaFees = hoaFees * (months - totalFessMonths)
  const totalFees = totalTax + totalInsurance + totalPMI + totalHoaFees

  const totalAllPayments = totalFees + totalInterest + mortgageAmount + downPayment

  return {
    ...data,
    paymentFrequency,
    monthlyOrBiWeeklyExtraPayment: monthlyOrBiWeeklyPayment,
    propertyTax,
    homeInsurance,
    pmi,
    hoaFees,
    totalPayment: totalPaymentMonthly,
    numberOfPayments: months, //fixed pay off date displayed use moment to get the date
    endDate,
    downPayment,
    principal,
    totalExtraPayment: totalExtraPayment,
    totalInterest: totalInterest,
    totalFees,
    totalAllPayments,
  }
}
